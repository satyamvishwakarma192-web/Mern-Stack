// logic fr -- user.models.js _->> for creating user we have to create model ,and also for interact with userdb

const monogoose = require("mongoose"); // mongoose import
const { timeStamp } = require("node:console");

const userSchema = new monogoose.Schema( //user shcema 
    {

        FullName:{              //mango user data names and properties
            type:String ,
            required:true,
        },
        Email:{
            type:String,
            required:true,
            unique: true,
        },
        password:{
            type:String,

        },
        PhoneNumber:{
            type:String,
            required:true },
        Address:{
            type:String,
            required:true
        } 
    },
    {
        timestamps:true   // timestamps is  Ntb when a user data 
        // is developed at what time it maintain time of updates and changes

    }
)
const userModel = monogoose.model("user",userSchema);
module.exports = userModel;