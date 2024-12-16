const express = require('express');

const app = express();

app.get("/admin/getData",(req,res,next)=>{
const token="xyz";
const isAdminAuthorized = token ==="xyz";
if(isAdminAuthorized){
    res.send("authorized user");
    console.log("working");
}
else{
    res.status(401);
    console.log("unauthorized user");
}
});

app.listen(3333,()=>{
console.log("listening to 3333");
});