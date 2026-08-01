// create server 
const express = require('express');
// cookie-parser 
const cookieParser = require('cookie-parser');//  for saving tokens of user
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',    
    credentials: true // Replace
})); 
// cross origin resource sharing is used for frontend and backend communication

app.use(express.json());// middle ware

app.use(cookieParser());   // cookie parser is created in middleware
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);




app.get("/",(req,res) =>  //api created here <<---
{
    res.send("Hello world");
})

module.exports = app;
