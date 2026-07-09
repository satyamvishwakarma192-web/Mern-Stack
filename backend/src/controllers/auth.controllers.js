 
 //logic -- controller is created for callback req and res 
const bcrypt = require("bcryptjs");
 //import bcrypt
const jwt = require("jsonwebtoken"); 
// import jwt
//import usermodel
 const userModel = require("../models/users.model");

async function registerUser(req,res){  // async functions
    const { FullName,Email,password} = req.body;   // get user data from req.body

    // but the data will be not getting from ,cause when express default server is created bydef that server cant read data from req.body
    // & heres its solnn >--middle ware [ for get data and send to req.body and it make it readable for server]
    // ML of middleware in >> ./app.js

    const isUserAlreadyExists = await userModel.findOne({Email}) // for checking that used email is already exit or not 
    
    if(isUserAlreadyExists){ // if it exist then status will be 400 !! 
        return res.status(400).json({
            message:" User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10); // password hashing thru bcrypt
    const user = await userModel.create({
        FullName,Email,password: hashedPassword
    })// finally userr registerd
    const token = jwt.sign({
        id:user._id,},"de08efc2e1b2b31077bdc64e43ea4a2161adc4cba869b3449bc94fab3c814dec")
    
    
    res.cookie("token",token)
    res.status(201).json({
        message:"user  registered successfully",
        user:{
        _id: user._id,
        Email: user.Email,
        FullName: user.FullName
        

        }
        
     })

}

async function loginUser(req,res){}//login user 

module.exports = {
    registerUser,
    loginUser
} // by creating Object exporting bhot user controllers