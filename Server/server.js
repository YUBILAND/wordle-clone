require('dotenv').config()



const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs')
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wordle'
})

const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the file name
    },
  });

const upload = multer({ storage });








const authenticateToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken; // Retrieve the auth cookie
    if (accessToken == null) return res.json({ auth: false , message : "Unauthorized" })

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' })
        req.user = user;
        next()
    })
};

app.get('/authorized', authenticateToken, (req, res) => {
    return res.json({ auth : true , message :"Authorized" });
    
})

app.get('/check-auth', (req, res) => {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken) {
        if (!refreshToken) {

            return res.status(401).json({ message: 'No access token provided' });
        }
        else jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });

            const now = Math.floor(Date.now() / 1000);
            // console.log(user)
            const payload = { username: user.username, iat: now, id: user.id}

            const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
            const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

            const sql = 'UPDATE users SET token = ? WHERE username = ?';
                const values = [
                    newRefreshToken,
                    user.username
                ]
                db.query(sql, values, (err, data) => {
                    if (err) return res.json(err);
                })

            res.cookie('accessToken', newAccessToken, { maxAge: 15 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
            res.cookie('refreshToken', newRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });


            // Proceed with the request
            res.json({ message: 'Access token refreshed', accessToken: newAccessToken, user: user, id: user.id});
        })
    } else {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid access token' });

    res.json({ authenticated: true, user: user, id: user.id });
    })
    }
})

app.get('/highestStreak', (req, res) => {
    const sortHighestStreak = 'SELECT * FROM stats WHERE id != 0 ORDER BY highest DESC';
    db.query(sortHighestStreak, (err, result) => {
        if (err) return res.json(err);
        if (result.length > 0) {
            const ids =  result.map(entry => entry.id)
            const findUserName = 'SELECT id, username FROM users WHERE id IN (?)'
            db.query(findUserName, [ids], (err, user) => {
                if (err) return res.json(err);
                const userMap = new Map(user.map(user => [user.id, user.username]));
                const statsWithUsernames = result.map(result => ({
                    ...result,
                    username: userMap.get(result.id) || null, // Use null if username not found
                }));

                return res.json(statsWithUsernames)
            })
        }
    })
})

app.post('/uploadPfp', upload.single('file'), (req, res) => {
    const userId = req.body.id; // Get user ID from the request
    const imgPath = req.file.filename; // Get the file path
    
    const uploadPfp = 'UPDATE pfp SET img = ? WHERE id = ?';
    db.query(uploadPfp, [imgPath, userId] ,(err, result) => {
        if (err) return res.json(err);
        return res.json({ message : 'Uploaded pfp', img : imgPath})
        
    })
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/uploads/:id', (req, res) => {
    const imageId = req.params.id;
    // console.log(imageId)
    const imgPath = path.join(__dirname, 'uploads', imageId);

    res.sendFile(imgPath, (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
})

app.get('/getPfp', (req, res) => {
    // console.log(req.query.id)
    const getPfp = 'SELECT img FROM pfp WHERE id = ?';
    db.query(getPfp, [req.query.id] ,(err, result) => {
        if (err) return res.json(err);
        if (result.length == 0) return res.json({ message : 'No pfp' })
        if (result[0].img) return res.json({ message : 'Retrieved pfp', pfp : result[0].img})
    })
})


app.post('/login', (req, res) => {
    const checkSql = "SELECT id, password FROM users WHERE username = ?";

    db.query(checkSql, [req.body.username], async (err, result) => {
        if (err) return res.json(err);
        if (result.length > 0) {
            const storedPass = result[0].password;

            try {

                const match = await bcrypt.compare(req.body.password[0], storedPass)
                if (match) {
                    //  User exists so log in
                    const userID = result[0].id;
                        // payload
                    const now = Math.floor(Date.now() / 1000);
                    // console.log(res.insertId)
                    const payload = { username: req.body.username, iat: now, id: userID}

                    // Generate tokens
                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
                    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

                    // Store refresh token in database
                    const sql = 'UPDATE users SET token = ? WHERE username = ?';
                    const values = [
                        refreshToken,
                        req.body.username
                    ]
                    db.query(sql, values, (err, data) => {
                        if (err) return res.json(err);
                        // console.log("HI")
                        
                        // Send cookies to client
                        res.cookie('accessToken', accessToken, { maxAge: 15 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
                        res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
                        
                        return res.json({ message: 'Logged In Successfully!', id: userID})
                    })
                
                // accessToken =  generateAccessToken(user)
                } else res.json({message: "Username or password is incorrect"});

            } catch (compareErr) {
                return res.json(compareErr)
            }
            // return res.json({ message: "Logged in", accessToken: accessToken });
        } else
        return res.json({message: "Username or password is incorrect"});
    })
})

app.post('/signup', (req, res) => {

    // Check if credentials are already in database
    const checkSql = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(checkSql, [req.body.username, req.body.email], (err, result) => {
        if (err) return res.json(err);
        if (result.length > 0) {
            console.log(result)
            //Found credentials so user already exists, can't sign up
            return res.json({ message: "Username or Email already exists" });
        }
        // Insert user into database
        const salt = bcrypt.genSaltSync(10);

        const hashedPassword = bcrypt.hashSync(req.body.password[0], salt);
        console.log(hashedPassword)
        const insertUser = "INSERT INTO users ( `username`, `email`, `password`) Values (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword
        ]

        let userID = '';

        db.query(insertUser, [values], (err, data) => {
            if (err) return res.json(err);
            userID = data.insertId;
        
            // payload
            const user = { username: req.body.username, id: userID }
            // Generate tokens
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })

            // Store refresh token in database

            const insertToken = "UPDATE users SET token = ? WHERE id = ?";

            db.query(insertToken, [refreshToken, userID], (err, data) => {
                if (err) return res.json(err);

                // Send cookies to client
                res.cookie('accessToken', accessToken, { maxAge: 15 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
                res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });

                // console.log(insertedID)

                const sql = "INSERT INTO stats (id, played, wins, streak, highest, guess1, guess2, guess3, guess4, guess5, guess6) VALUES (?, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
                
                db.query(sql, userID, (err, data) => {
                    if (err) return res.json(err);

                    const insertPfp = "INSERT INTO pfp (id, img) VALUES (?,'')";
                    db.query(insertPfp, userID, (err, data) => {
                        if (err) return res.json(err);
                        return res.json({ message: 'Registered Successfully!', id: userID })

                    })
                })
                
            })
        })
    })
})

app.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: "Logged out"});
})

app.get('/getStats', (req, res) => {
    const sql = "SELECT * FROM STATS WHERE id = ?";
    db.query(sql, [req.query.id], (err, data) => {
        if (err) return res.json(err);
        if (data.length == 1) {
            // If result is not empty, the username or email already exists
            return res.json(data[0]);
        }
    })
})

app.post('/updateStats', (req, res) => {
    if (req.body.win){
        // console.log(req.body.id)
        const getHighest = 'SELECT streak, highest FROM stats WHERE id = ?'
        db.query(getHighest, req.body.id, (err, data) => {
            if (err) return res.json(err);
            const maxStreak = Math.max(data[0].streak + 1, data[0].highest);
            const sql = `UPDATE stats SET ${req.body.guessWon} = ${req.body.guessWon} + 1, wins = wins + 1, played = played + 1, streak = streak + 1, highest = ? WHERE id = ?`;
            // const sql = "SELECT * FROM STATS WHERE id = ?";
            db.query(sql, [maxStreak, req.body.id], (err, data) => {
                if (err) return res.json(err);
                return res.json({message: "Updated successfully"});
            })
        })
    } else {
        
        const sql = `UPDATE stats SET played = played + 1, streak = 0 WHERE id = ?`;
        // const sql = "SELECT * FROM STATS WHERE id = ?";
        db.query(sql, [req.body.id], (err, data) => {
            if (err) return res.json(err);
            return res.json({message: "nice successfully"});
        })
    }
})

app.post('/eraseGuestData', (req, res) => {
    const sql = `UPDATE stats SET guess1 = 0, guess2 = 0, guess3 = 0, guess4 = 0, guess5 = 0, guess6 = 0, played = 0, wins = 0, streak = 0, highest = 0 WHERE id = ?`;
    // const sql = "SELECT * FROM STATS WHERE id = ?";
    db.query(sql, [req.body.id], (err, data) => {
        if (err) return res.json(err);
        return res.json({message: "Erased guest data successfully"});
    })
    
})


app.listen(8081, () => {
    console.log('listening');
})