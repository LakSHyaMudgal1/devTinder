const mongoose = require('mongoose');

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
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data not valid");
            }
        }
    },
    photoURL:{
        type: String
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


const userModel = mongoose.model("User",userSchema);

module.exports = userModel;