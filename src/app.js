const express = require('express');

const app = express();

// app.use("/user",
//     (req,res,next)=>{
//     //route handler 1 
//     console.log("handling the route user ");
//     // res.send("Response"); 
//     //if next was not used it would not work and an infinite loop would have started .
//     next();
// },
//     (req,res)=>{
//         console.log("handling the route user 2 ");
//         res.send("2nd response");
//     }
// );


app.use("/",(req,res,next)=>{
    res.send("response from use ");
    next();
})


app.get("/user", 
    (req,res,next)=>{
        console.log("handlng /user route ");
        next();
    },
    (req,res,next)=>{
        next();
    },
    (req,res,next)=>{
        // res.send("2nd route handler");
    }
);


app.listen(3333,()=>{
    console.log("app listening at 3333");
})