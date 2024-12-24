const express = require('express');
const requestRouter = express.Router();
const User = require("../models/user")
const {userAuth} = require("../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });


        
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"User not found ."});
        };  
        
        
        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus){
            return res.status(400).send("Invalid Status Type :"+status);
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId:fromUserId , toUserId:toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).json({message:"Connection Request already exists!!"});
        }




        const data = await connectionRequest.save();
        res.json({
            message:"Connection Request Sent Successfully .",
            data,
        })


    }catch(err){
        res.status(400).send("ERROR "+err.message);
    }
    
})

module.exports = requestRouter;