const express = require('express');

const app = express();
const User = require("./models/user")
const connectDB = require("./config/database");
app.use(express.json());

app.post("/signup", async (req,res)=>{


    console.log(req.body);

    const user = new User(req.body);

    // const user = new User({
    //     firstName: "Mehul",
    //     lastName:"mudgal",
    //     emailId:"Mehul34mudgalinr@gmail.com",
    //     password:"mannuBhai@1504"
    // });
    try{
        await user.save();
        res.send("user added successfully!!!");
    }catch(err){
        res.status(401).send("Error sending message:" + err.message);
    }

});


connectDB().then(()=>{
    console.log("database connected successfully.");
    app.listen(3000,()=>{
    console.log("listening to 3000");
        });
}).catch(err=>{
    console.log("failed to connect with DB.")
})
