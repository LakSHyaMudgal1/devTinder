const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,

    },
    lastName:{
        type:String,        

    },
    emailId:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true,
        trim: true,
        unique: true,


    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is not a valid type .`
        },
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data not valid");
            }
        }
    },
    photoURL:{
        type: String,
        default:"https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:"nothing is written in about section."
    }

},{
    timestamps: true,
});

userSchema.methods.getJWT = async function () {
    const user = this ;
    const token = await jwt.sign({_id:user._id},"hellllluuuuuuuu",{
        expiresIn:"7d",
    });
    return token;
};   






const userModel = mongoose.model("User",userSchema);
module.exports = userModel;