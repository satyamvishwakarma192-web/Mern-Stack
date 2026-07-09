const mongoose = require('mongoose');
// logic -- how to connect server to our DB

// function for connecting to db
function connectDB() { 
    mongoose.connect("mongodb://food-view:food-view@ac-fde87y1-shard-00-00.m7t9ojd.mongodb.net:27017,ac-fde87y1-shard-00-01.m7t9ojd.mongodb.net:27017,ac-fde87y1-shard-00-02.m7t9ojd.mongodb.net:27017/?ssl=true&replicaSet=atlas-zez7mx-shard-0&authSource=admin&appName=Cluster1") //url of cluster1 for connection to db cluster1.m7t9ojd.mongodb.net
        .then(() => {
            console.log("MongoDB connected"); //callback when our db is connected successfully
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err); 
        })// by default any error or cause happen err console 
}

module.exports = connectDB; // exporting db 
// function is called in server.js file