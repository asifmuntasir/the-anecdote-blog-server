const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const connect = require("./config/db")
const router = require("./routes/userRoutes");
const postRoutes = require('./routes/postRoutes')

// body-parse
app.use(bodyParser.json());

// use cors
app.use(cors());

// connect mongodb database
connect();

require('dotenv').config();

const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send('Assalamu Alaikum');
//     // res.send('Walaikum Assalam');
// })

app.use("/", router);
app.use("/", postRoutes)

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
})