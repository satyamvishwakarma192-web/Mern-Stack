const path = require("path");
const foodModel = require("../models/food.models");
const userModel = require("../models/users.model");

const storageService = require("../services/storage.services");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a video file." });
    }

    const { name, description, price, imageUrl } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    const extension = path.extname(req.file.originalname) || ".mp4";
    const fileName = `${uuid()}${extension}`;
    const fileUploadResult = await storageService.uploadFile(req.file.buffer.toString("base64"), fileName);

    const foodItem = await foodModel.create({
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("createFood error:", error);
    res.status(500).json({ message: "Unable to create food item." });
  }
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({ foodPartner: req.foodPartner._id });
  res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

async function deleteFoodItem(req, res) {
  try {
    const foodItem = await foodModel.findOne({
      _id: req.params.id,
      foodPartner: req.foodPartner._id,
    });

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found." });
    }

    await foodItem.deleteOne();

    res.status(200).json({ message: "Food item deleted successfully." });
  } catch (error) {
    console.error("deleteFoodItem error:", error);
    res.status(500).json({ message: "Unable to delete food item." });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  deleteFoodItem,
};