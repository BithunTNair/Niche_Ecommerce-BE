const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DB = require('./config/db');
const passport = require('passport');
require('./config/passport'); // Ensure Google strategy is registered

const app = express();
DB();
const PORT = process.env.PORT;
const authRouter = require('./routes/auth');
const adminRouter= require('./routes/admin');
const artisanRouter = require('./routes/artisan');
const userRouter = require('./routes/users')

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(passport.initialize());
app.use('/auth', authRouter);
app.use('/admin',adminRouter)
app.use('/artisan', artisanRouter);
app.use('/user', userRouter)



app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);

})