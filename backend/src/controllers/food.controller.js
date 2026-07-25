const foodModel = require("../models/food.models")

async function createFood(req,res){
    console.log(req.foodPartner)
    res.send("food item created")
    console.log(req.body)
    console.log(req.file)
    

}
module.exports = {
    createFood
}