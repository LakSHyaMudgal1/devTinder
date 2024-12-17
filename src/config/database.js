const mongoose = require('mongoose');



const connectDB = async ()=>{
await mongoose.connect("mongodb+srv://lakshya_Project_1:lakshyaQY123456@devtinder.39t99.mongodb.net/");
};


module.exports=connectDB;

connectDB().then(()=>{
    console.log("database connected successfully.")
}).catch(err=>{
    console.log("failed to connect with DB.")
})