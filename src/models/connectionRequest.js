const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type: String,
        enum:{
            values:['ignore','interested','accepted','rejected'],
            message:`{VALUE} is incorrect value type `
        }
    }
},{
    timestamps:true
});


connectionRequestSchema.pre("save",function (next){
    const connectionRequest = this ;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send Connection Request to yourself !! ");
    }
    next();
})


const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequestModel;