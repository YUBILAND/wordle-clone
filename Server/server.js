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

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO USERS (`id`, `username`, `email`, `password`) Values (?)";
    const values = [
        req.body.id,
        req.body.username,
        req.body.email,
        req.body.password,
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })


})

app.listen(8081, () => {
    console.log('listening');
})