const express = require("express");
const foodController = require("../controllers/food.controller")

const authMiddleware = require("../middlewares/auth.middlewares");

const router = express.Router();



router.post('/', authMiddleware.authFoodPartnerMiddlewares, foodController.createFood)/* POST /api/food/ (protected)*/





 module.exports = router;