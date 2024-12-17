const express = require('express');

const app = express();
const User = require("./models/user")
const connectDB = require("./config/database");

app.post("/signup", async (req,res)=>{

    const user = new User({
        firstName: "Mehul",
        lastName:"mudgal",
        emailId:"Mehul34mudgalinr@gmail.com",
        password:"mannuBhai@1504"
    });

    await user.save();
    res.send("user added successfully!!!");
});


connectDB().then(()=>{
    console.log("database connected successfully.");
    app.listen(3000,()=>{
    console.log("listening to 3000");
        });
}).catch(err=>{
    console.log("failed to connect with DB.")
})
