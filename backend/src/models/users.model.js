const monogoose = require("mongoose");
const { timeStamp } = require("node:console");

const userSchema = new monogoose.Schema(
    {
        FullName:{
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

        }
    
    },
    {
        timestamps:true

    }
)
const userModel = monogoose.model("user",userSchema);
module.exports = userModel;