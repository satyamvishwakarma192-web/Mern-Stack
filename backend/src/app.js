// create server 
const express = require('express');
// cookie-parser 
const cookieParser = require("cookie-parser");//  for saving tokens of user
const app = express();



app.use(express.json());// middle ware
app.use(cookieParser())   // cookie parser is created in middleware
app.get("/",(req,res) =>  //api created here <<---
{
    res.send("Hello world")
})
module.exports = app;
