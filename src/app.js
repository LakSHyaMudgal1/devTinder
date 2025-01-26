const express = require('express');

const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors  = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/users');


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB().then(()=>{
    console.log("database connected successfully.");
    app.listen(5001,()=>{
    console.log("listening to 5001");
        });
}).catch(err=>{
    console.log("failed to connect with DB.")
})
