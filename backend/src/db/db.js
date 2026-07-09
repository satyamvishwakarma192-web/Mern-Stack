const mongoose = require('mongoose');
// logic -- how to connect server to our DB

// function for connecting to db
function connectDB() { 
    mongoose.connect("mongodb://atlas-sql-6a4ea616d6dc363bc5cc1a6a-u48czw.a.query.mongodb.net/food-view?ssl=true&authSource=admin") //url of cluster1 for connection to db cluster1.m7t9ojd.mongodb.net
        .then(() => {
            console.log("MongoDB connected"); //callback when our db is connected successfully
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err); 
        })// by default any error or cause happen err console 
}

module.exports = connectDB; // exporting db 