// create server 
const express = require('express');

const app = express();
app.get("/",(req,res) =>  //api created here <<---
{
    res.send("Hello world")
})
module.exports = app;
