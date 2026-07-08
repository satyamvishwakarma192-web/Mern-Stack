const mongoose = require('mongoose');
const { error } = require('node:console');

function  connectDB(){// our server is connect when this func will work connectDB()
    //connecting monodb to food-view db
    mongoose.connect("mongodb://localhost:27017/food-view")// mongoose.connect func is called
    .then(()=>//when our db connect .then() callback
    {
        console.log("MongoDB connected");

    })
    .catch((err)=>{// when db is disconnected by any reason then it .catch error

        console.log("MongoDB  connection error",err);
    })

 

}
module.exports = connectDB; // export this func to the server .js
