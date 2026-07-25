const mongoose = require("mongoose");


const foodPartnerSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true

    },
    Email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{ type:String,
        required:true,
        unique:true


    }
})

const foodPartnerModel = mongoose.model("foodpartner",foodPartnerSchema)
    

module.exports = foodPartnerModel;