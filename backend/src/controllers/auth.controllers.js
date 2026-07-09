 
 //logic -- controller is created for callback req and res 
const bcrypt
 //
 //iport usermodel
 const userModel = require("../models/users.model")

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
}