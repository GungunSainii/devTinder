const express = require('express');
const {connectDB}= require("./config/database");
const app = express(); //instance of express js application //new appn of express
//creating new web server using express
const cookieParser = require("cookie-parser");
const User = require("./models/user");




//Middleware
app.use(express.json());
app.use(cookieParser());


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB().then(async ()=>{
    await User.createIndexes();
    console.log("Database is established");

    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});
}).catch((err)=>{
    console.log("DB not connected");
    console.log(err);
})



//callback function will only run if listening to port is successful