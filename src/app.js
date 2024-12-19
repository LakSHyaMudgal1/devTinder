const express = require('express');

const app = express();
const User = require("./models/user")
const connectDB = require("./config/database");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");


app.use(express.json());
// to add users by converting json to js objects 

app.post("/signup", async (req,res)=>{

    // console.log(req.body);

    const user = new User(req.body);
    try{

        validateSignUpData(req);
        const {password}=req.body;
        const HashPassowrd= await bcrypt.hash(password,10);
        console.log(HashPassowrd);

        await user.save();
        res.send("user added successfully!!!");
    }catch(err){
        res.status(401).send("Error sending message:" + err.message);
    }

});


// find by a field of document .
app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
        if(user.length===0){
            res.send("user not found ");
        }
            else{
                res.send(user);

            }
        
    }
    catch(err){
        res.status(400).send("something went wrong . ");
    }
})



// to show all users available 
app.get("/feed",async (req,res)=>{
    const user = await User.find();
    try{
        res.send(user);
    }
    catch(err){
        res.status(400).send("no users found");
    }

})


//delete data
app.delete("/user",async (req,res)=>{
    const userId = User.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id: userId}); 
        res.send("user deleted successfully ."); 
    } 
    catch(err){
        res.status(400).send("no user found with such id .")
    }
})

// update data 
app.patch("/user/:userId", async (req,res)=>{
    
    const data = req.body;
    const userId = req.params?.userId;

   

    try{

        const ALLOWED_UPDATES=[
            "userId",
            "photoURL",
            "gender",
            "age",
            "about",
            "skills"
            ];
            const isUpdateAllowed = Object.keys(data).every((k)=>
                ALLOWED_UPDATES.includes(k)
            );
            if(!isUpdateAllowed){
                throw new Error("Update not allowed .")
            }


        const user = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators: true
        });
        res.send("data updated successfully .")
    } 
    catch(err){
        res.status(400).send("UPDATE FAILED "+err.message);
    }
})

connectDB().then(()=>{
    console.log("database connected successfully.");
    app.listen(3000,()=>{
    console.log("listening to 3000");
        });
}).catch(err=>{
    console.log("failed to connect with DB.")
})
