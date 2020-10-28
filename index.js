require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('It works!');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`)
});