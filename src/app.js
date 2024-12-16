const express = require('express');

const app = express();

const {adminAuth}=require('./Middlewares/auth')

app.use("/admin", adminAuth);

app.get("/admin/getData",(req,res,next)=>{
    res.send("all data sent ");
});


app.listen(3333,()=>{
console.log("listening to 3333");
});