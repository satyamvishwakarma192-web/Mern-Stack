// create server 
const express = require('express');
// cookie-parser 
const cookieParser = require('cookie-parser');//  for saving tokens of user
const authRoutes = require('./routes/auth.routes');

const app = express();


app.use(express.json());// middle ware

app.use(cookieParser())   // cookie parser is created in middleware
app.use('/api/auth',authRoutes)

app.get("/",(req,res) =>  //api created here <<---
{
    res.send("Hello world")
})

module.exports = app;
