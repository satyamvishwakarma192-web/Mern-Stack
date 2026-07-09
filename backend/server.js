// server start 
const app = require('./src/app');
const connectDB = require("./src/db/db.js"); // importing the db and function is called
//connecting database from monogodb

connectDB();
//call

app.listen(3000,() =>{

console.log("server is running on the port 3000")
});
// server will start by nodemon server.js CMD and then MonogoDb is Connected successfully...