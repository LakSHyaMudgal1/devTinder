const express=require("express");

const app=express();


app.get("/user",(req,res)=>{
    res.send({firstname:"lakshya",
                secondname:"mudgal",
                age:"can't tell",
    });
});

app.post("/user",(req,res)=>{
    
    res.send("data saved to database successfully")
});

app.delete("/user",(req,res)=>{
       res.send("data deleted")
});

app.use("/test",(req,res)=>{
    res.send("hello from test")
});


app.listen(3000,()=>{
    console.log("server is listening ")
});
