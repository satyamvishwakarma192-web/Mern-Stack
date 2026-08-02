const express = require("express");
const foodController = require("../controllers/food.controller")
const authMiddleware = require("../middlewares/auth.middlewares");
const router = express.Router();
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype && file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed.'));
        }
    }
})
router.post('/',authMiddleware.authFoodPartnerMiddlewares,
upload.single("video"),
foodController.createFood
)/* POST /api/food/ (protected)*/

// public feed endpoint
router.get('/public', foodController.getPublicFoodItems);

router.delete('/:id', authMiddleware.authFoodPartnerMiddlewares, foodController.deleteFoodItem)

/* GET /api/food/ [protected] */
router.get('/',
    authMiddleware.authFoodPartnerMiddlewares,
    foodController.getFoodItems)





 module.exports = router;