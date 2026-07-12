const express = require("express");
const foodController = require("../controllers/food.controller")
const  authFoodPartnerMiddlewares = require("../middlewares/auth.middlewares")

const router = express.Router();



router.post('/',authmiddleware.authFoodPartnerMiddlewares, foodController.createFood)/* POST /api/food/ (protected)*/





 modeule.exports = router;