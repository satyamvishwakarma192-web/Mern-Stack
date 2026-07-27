const foodPartnerModel = require("../models/foodpartner.models")


const jwt = require("jsonwebtoken");
async function authFoodPartnerMiddlewares(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"please login First"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;
        next()

    }
    catch(err){
         return res.status(401).json({
            message:"Invalid Token"
         })
    }
}
async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

module.exports = {authFoodPartnerMiddlewares,
authUserMiddleware
}

