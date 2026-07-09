const mongoose = require('mongoose');



function connectDB() {
    mongoose.connect("mongodb://atlas-sql-6a4ea616d6dc363bc5cc1a6a-u48czw.a.query.mongodb.net/food-view?ssl=true&authSource=admin")
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err);
        })
}

module.exports = connectDB;