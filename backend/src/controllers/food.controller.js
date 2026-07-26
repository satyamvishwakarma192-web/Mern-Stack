const foodModel = require("../models/food.models");
const storageService = require("../services/storage.services");
const{ v4: uuid} = require("uuid");

async function createFood(req,res){

    const fileUploadResult = await storageService.uploadFile(req.file.buffer.toString("base64"), uuid())
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "food created successfully",
        food: foodItem
    })

}
module.exports = {
    createFood
}