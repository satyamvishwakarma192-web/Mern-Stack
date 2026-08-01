const express = require("express");
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middlewares");
const router = express.Router();
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),



})
router.post('/',authMiddleware.authFoodPartnerMiddlewares,
upload.single("video"),
foodController.createFood
)/* POST /api/food/ (protected)*/

router.delete('/:id', authMiddleware.authFoodPartnerMiddlewares, foodController.deleteFoodItem)

/* GET /api/food/ [protected] */
router.get('/',
    authMiddleware.authFoodPartnerMiddlewares,
    foodController.getFoodItems)





 module.exports = router;