const express = require('express');
const {connectDB}= require("./config/database");
const User = require("./models/user");
const app = express(); //instance of express js application //new appn of express
//creating new web server using express
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/auth");


//Middleware
app.use(express.json());
app.use(cookieParser());


app.post("/signup",async (req,res)=>{

    
    // console.log(req.body);


    // const obj = {
    //     firstName: "Naruto",
    //     lastName: "Uzumaki",
    //     email: "datebayo.com",
    //     password: "hinata01"
    // }

    try{
        //Validate the data 
        validateSignUpData(req);

        //Encrypt the password 
        const {firstName, lastName, emailId, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);






        //creating a new instance of user model
        const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password: passwordHash,
        });

        await user.save();

        res.send("User added successfully");

    }   catch (err) {
        res.status(400).send("Error " + err.message);
    }

    
})


app.post("/login", async (req,res)=>{
    try {
        const {emailId, password} = req.body;

        console.log(emailId);
        console.log(password);


        const user = await User.findOne({emailId: emailId});

        console.log(user);

        if(!user){
            throw new Error("EmailId is not present in DB");
        }
        const isPasswordValid = await user.validatePassword(password);

        console.log(isPasswordValid);

        if(isPasswordValid){

            //Create a JWT Token
            const token = await user.getJWT();

            //Add the token to cookie and send the response back to the user
            res.cookie("token",token, {
                expires: new Date(Date.now() + 8*3600000),
            });
            res.send("Login Successful!!!")

        } else {
            throw new Error("Pass word is not correct !!")
        }

    } catch (err) {
        res.status(400).send("ERROR : "+ err.message);
    }
})


//Profile api 
app.get("/profile", userAuth , async (req,res)=>{

    try {
    
    const user = req.user;
    res.send(user)
    } catch (err) {
        res.status(400).send("Error :" + err.message);
    }
    

})


app.post("/sendConnectionRequest", userAuth , (req,res)=>{
    const user = req.user;
    console.log("Sending connection request");

    res.send(user.firstName + "   sent the connect request");
})


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