// db.js
const mongoose = require('mongoose');
// logic -- how to connect server to our DB

// function for connecting to db
function connectDB() { 
    const uri = process.env.MONGO_URI || "mongodb://userdb:99db@ac-rkauej5-shard-00-00.6gznirh.mongodb.net:27017,ac-rkauej5-shard-00-01.6gznirh.mongodb.net:27017,ac-rkauej5-shard-00-02.6gznirh.mongodb.net:27017/?ssl=true&replicaSet=atlas-ibrn8n-shard-0&authSource=admin&appName=MYDB";
    mongoose.connect(uri)
        .then(() => {
            console.log("MongoDB connected"); //callback when our db is connected successfully
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err); 
        })// by default any error or cause happen err console 
}
module.exports = connectDB; // exporting db
