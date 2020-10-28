require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();

const port = process.env.PORT;

const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

app.get('/', (req, res) => {
    res.send('It works!');
});

app.get('/dbtest', (req, res) => {
    connection.query(`SELECT * FROM offices`, (error, result) => {
        res.json(result);
    })
});

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});