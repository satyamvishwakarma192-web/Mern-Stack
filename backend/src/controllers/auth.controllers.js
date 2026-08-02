 
 //logic -- controller is created for callback req and res 
const bcrypt = require("bcryptjs");
 //import bcrypt
const jwt = require("jsonwebtoken"); 
// import jwt
const foodPartnerModel = require("../models/foodpartner.models");
//import foodpartner models

//import usermodel
 const userModel = require("../models/users.model");

const mongoose = require('mongoose');

// helper to create JWT with expiry
function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };
}

function dbReady(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ message: 'Database unavailable. Please try again later.' });
    return false;
  }
  return true;
}

async function registerUser(req,res){  // async functions of registeruser
  try {
    if (!dbReady(res)) return;

    const { FullName,Email,password,PhoneNumber,Address } = req.body;   // get user data from req.body

    // ensure required fields are present
    if(!FullName || !Email || !password || !PhoneNumber || !Address){
      return res.status(400).json({ message: "Missing required fields" });
    }

    const isUserAlreadyExists = await userModel.findOne({Email}) // for checking that used email is already exit or not 
    
    if(isUserAlreadyExists){ // if it exist then status will be 400 !! 
        return res.status(400).json({
            message:" User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10); // password hashing thru bcrypt
    const user = await userModel.create({
        FullName,
        Email,
        password: hashedPassword,
        PhoneNumber,
        Address,
    })// finally userr registerd


    const token = createToken(user._id);
    
    res.cookie('token', token, cookieOptions());
    res.status(201).json({
        message:"user registered successfully",
        user:{
        _id: user._id,
        Email: user.Email,
        FullName: user.FullName,
        PhoneNumber: user.PhoneNumber,
        Address: user.Address

        }
        
     })
  } catch (err) {
    console.error('registerUser error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
}


async function loginUser(req, res){
  try {
    if (!dbReady(res)) return;

    const{Email,password} = req.body;
    const user = await userModel.findOne({Email})
    if(!user){ // if it  not exist then status will be 400 !! 
       return res.status(400).json({
           message:" Invalid email or password"
       })
   }
   const ispasswordValid = await bcrypt.compare(password,user.password)
   if(!ispasswordValid){ // if password is not then status will be 400 !! 
       return res.status(400).json({
           message:" Invalid email or password"
       })
   }
   const token = createToken(user._id);
   res.cookie('token', token, cookieOptions());
   res.status(201).json({
       message:"user login successfully",
       user:{
       _id: user._id,
       Email: user.Email,
       FullName: user.FullName,
       PhoneNumber: user.PhoneNumber,
       Address: user.Address
      
       }
   });
  } catch (err) {
    console.error('loginUser error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
}

function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message :"User LoggedOUT SuccessFully"
    });
}// LogoutUser

async function registerFoodPartner(req,res){
  try {
    if (!dbReady(res)) return;
    const{ Name, OwnerName, Email, password, PhoneNumber, Location } = req.body;
     if(!Name || !OwnerName || !Email || !password || !PhoneNumber || !Location){
       return res.status(400).json({ message: "Missing required fields" });
     }
     const isAccountAlreayExists = await foodPartnerModel.findOne({
       Email
     })
     if(isAccountAlreayExists){
       return res.status(400).json({
           message:"Food Partner account already exists"
       })
     }
     const hashedPassword = await bcrypt.hash(password,10);
     const foodPartner = await foodPartnerModel.create({
       Name,
       OwnerName,
       Email,
       password: hashedPassword,
       PhoneNumber,
       Location,
     })
     
     const token = createToken(foodPartner._id);

     res.cookie('token', token, cookieOptions());
       res.status(201).json({
           message:"food partner registered successfully",
           foodPartner: {
           _id: foodPartner._id,
           Email: foodPartner.Email,
           Name: foodPartner.Name,
           OwnerName: foodPartner.OwnerName,
           PhoneNumber: foodPartner.PhoneNumber,
           Location: foodPartner.Location

           }
           
        })
  } catch (err) {
    console.error('registerFoodPartner error:', err);
    res.status(500).json({ message: 'Registration failed' });
  }
}

async function loginFoodPartner(req,res){
  try {
    if (!dbReady(res)) return;
    const{Email,password} = req.body;
    const foodPartner = await foodPartnerModel.findOne({
        Email
    })
    if(!foodPartner){
      return  res.status(400).json({
            message:"Invalid Email and Password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,foodPartner.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invaild Email and Password"
        })
    }
   const token = createToken(foodPartner._id);
    
    res.cookie('token', token, cookieOptions());
    res.status(201).json({
        message:"food partner logged successfully",
        foodPartner:{
        _id: foodPartner._id,
        Email: foodPartner.Email,
        Name: foodPartner.Name
        

        }}) 
  } catch (err) {
    console.error('loginFoodPartner error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message :"Food Partner is logged out successfully"
    });}





module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};
/* by creating Object exporting bhot user controllers   */
