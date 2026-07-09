// server start 
const app = require('./src/app');
const connectDB = require("./src/db/db.js"); // importing the db 
//connecting database from monogodb

connectDB();
app.listen(3000,() =>{

console.log("server is running on the port 3000")
});