const foodModel = require("../models/food.models");
const storageService = require("../services/storage.services");
const{ v4: uuid} = require("uuid");

async function createFood(req,res){
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)
    const fileUploadResult = await storageService.uploadFile(req.file.buffer.toString("base64"), uuid())
    console.log(fileUploadResult)
    
    res.send("food item created")

}
module.exports = {
    createFood
}