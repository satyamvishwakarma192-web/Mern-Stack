const mongoose = require("mongoose");
const { type } = require("node:os");

const foodPartnerSchema = new.mongoose.Schema({
    Name:{
        type:String,
        required:true

    },
    Email:{
        type:String,
        required:true,
        unique:true
    }
})

const foodPartnerSchema = mongoose.Model("FoodPartner",foosPartnerSchema)
    

module.exports =foodPartnerSchema;