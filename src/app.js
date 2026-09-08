const express = require('express');
const {connectDB}= require("./config/database");
const User = require("./models/user");
const app = express(); //instance of express js application //new appn of express
//creating new web server using express



app.post("/signup",async (req,res)=>{
    const obj = {
        firstName: "Naruto",
        lastName: "Uzumaki",
        email: "datebayo.com",
        password: "hinata01"
    }

    try{
        const user = new User(obj);

    await user.save();

    res.send("User added successfully");

    }catch{(err)=>{
        res.status(400).send("Error" + err.message);
    }}

    
})



connectDB().then(()=>{
    console.log("Databse is established");
    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});
}).catch((err)=>{
    console.log("DB not connected");
})



//callback function will only run if listening to port is successful