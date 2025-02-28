const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user")
const {userAuth} = require("../Middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view",userAuth,async (req,res)=>{

    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
    
})

profileRouter.put("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateEditProfileData){
            throw new Error("Invalid Edit Request.")
        }

        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        await loggedInUser.save();
        console.log(loggedInUser);
        res.send("profile Updated Successfully .")
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

module.exports= profileRouter;