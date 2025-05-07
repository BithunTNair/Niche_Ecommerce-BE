const express = require('express');

const cors = require('cors');
require('dotenv').config();
const DB = require('./config/db')

const app = express();
DB();
const PORT = process.env.PORT
const authRouter= require('./routes/auth')

app.use(express.json());
app.use(cors());
app.use('/auth',authRouter);



app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);

})