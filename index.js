const express = require('express');
const app = express();
const connect = require("./config/db")


// connect mongodb database
connect();

require('dotenv').config();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Assalamu Alaikum');
    // res.send('Walaikum Assalam');
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
})