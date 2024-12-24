const express = require("express");
const authRouter = express.Router();
const User = require("../models/user")
const {validateSignUpData} = require("../utils/validation")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

authRouter.post("/signup", async (req,res)=>{

        try{

        validateSignUpData(req);
        const {password, firstName, lastName , emailId}=req.body;
        const HashPassowrd= await bcrypt.hash(password,10);
        // console.log(HashPassowrd);

        const user = new User({
            firstName,
            lastName,
            password:HashPassowrd,
            emailId,
            
        });
        await user.save();
        res.send("user added successfully!!!");
    }catch(err){
        res.status(401).send("Error sending message:" + err.message);
    }

});

authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId , password}= req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("user not found .")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){

            const token = await user.getJWT();
            // console.log(token);

            res.cookie("token",token)
            res.send("login successful!!! ");
        }
        else{
            throw new Error("wrong password .")
        }


    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

authRouter.post("/logout",async (req,res)=>{
res.cookie( "token",null,{
    expires: new Date(Date.now()),
});
res.send("logout Successful");
}) 

module.exports = authRouter;