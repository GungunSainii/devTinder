const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");



const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{

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

    
});


authRouter.post("/login", async (req,res)=>{
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
            res.send(user)

        } else {
            throw new Error("Pass word is not correct !!")
        }

    } catch (err) {
        res.status(400).send("ERROR : "+ err.message);
    }
})


authRouter.post("/logout", async (req,res)=>{
    res
    .cookie("token", null , {
        expires: new Date(Date.now()),
    })
    .send();
})

module.exports = authRouter;