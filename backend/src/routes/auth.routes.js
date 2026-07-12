
// created authn routes for user
const express = require("express") //import the express then router//
// requiring the authControllers 
const authController = require("../controllers/auth.controllers")

// router is created for using api <<---
const router = express.Router();
 //api created with name  < /register > //usr register
router.post('/user/register', authController.registerUser)
router.post('/foodPartner/register', authController.registerFoodPartner)

//api created with name  < /login  > //usr login
router.post('/user/login', authController.loginUser)
router.post('/foodPartner/login', authController.loginFoodPartner)
//api 
router.get('/user/logout',authController.logoutUser)
router.get('/foodPartner/logout',authController.logoutFoodPartner)
 
module.exports = router;
 // authentication 