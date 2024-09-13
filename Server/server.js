const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wordle'
})

app.get('/',  (re, res) => {
    return res.json("From backend")
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM USERS";
    db.query(sql, (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/login', (req, res) => {
    const checkSql = "SELECT * FROM USERS WHERE username = ? AND password = ?";
    db.query(checkSql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json(err);
        if (result.length > 0) {
            // If result is not empty, the username or email already exists
            return res.json({ message: "Logged in" });
        }
        return res.json({message: "Username or password is incorrect"});
    })
})


app.post('/signup', (req, res) => {
    const checkSql = "SELECT * FROM USERS WHERE username = ? OR email = ?";
    db.query(checkSql, [req.body.username, req.body.email], (err, result) => {
        if (err) return res.json(err);
        if (result.length == 1) {
            // If result is not empty, the username or email already exists
            return res.json({ message: "Username or Email already exists" });
        }
        const sql = "INSERT INTO USERS ( `username`, `email`, `password`) Values (?)";
        const values = [
            req.body.username,
            req.body.email,
            req.body.password,
        ]
        db.query(sql, [values], (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        })
    })
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
        const sql = `UPDATE stats SET ${req.body.guessWon} = ${req.body.guessWon} + 1, wins = wins + 1, played = played + 1 WHERE id = ?`;
        // const sql = "SELECT * FROM STATS WHERE id = ?";
        db.query(sql, [req.body.id], (err, data) => {
            if (err) return res.json(err);
            return res.json({message: "Updated successfully"});
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