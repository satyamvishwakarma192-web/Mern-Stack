// server start 
const app = require('./src/app');
const connectDB = require("./src/db/db"); // importing the db 

connectDB();
app.listen(3000,() =>{

console.log("server is running on the port 3000")
});