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
});

app.get('/', (req, res) => {
    res.send('It works!');
});

app.get('/api/employees', (req, res) => {
    connection.query(`SELECT * FROM employees`, (error, result) => {

        res.json(result);
        
    })
});

app.get('/api/employee/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);

    connection.query(`SELECT * FROM employees WHERE employeeNumber = ?`, [id], (error, result) => {
        
        if (error) {
            res.json({
                status: 'error',
                description: 'error, try again later'
            });
        }

        res.json(result);

    });
});

app.get('/api/office/:id', (req, res) => {

    const id = req.params.id;
    console.log(id);

    connection.query(`SELECT * FROM offices WHERE officeCode = ?`, [id], (error, result) => {
        
        if (error) {
            res.json({
                status: 'error',
                description: 'error, try again later'
            });
        }

        res.json(result);

    });
});

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});