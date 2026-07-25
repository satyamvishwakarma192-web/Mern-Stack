const foodPartnerModel = require("../models/foodpartner.models")


const jwt = require("jsonwebtoken");
async function authFoodPartnerMiddlewares(req,res,next){
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({
            message:"please login First"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

         const foodPartner = await foodPartnerModel.FindById(decoded.id);

          req.foodPartner = foodPartner;
           next()

    }
    catch(err){
         return res.status(401).json({
            message:"Invalid Token"
         })
    }
}
module.exports = authFoodPartnerMiddlewares;


