const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest")

userRouter.get("/user/requests/recieved",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName about ");
        const data = connectionRequest;
        res.json({messgage:"Request Data Fetched ",data});  



    }catch(err){
        res.json({message:"ERROR : "+err.message});
    }
})


module.exports = userRouter;