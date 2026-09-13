const express = require('express');
const {connectDB}= require("./config/database");
const User = require("./models/user");
const app = express(); //instance of express js application //new appn of express
//creating new web server using express
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

//Middleware
app.use(express.json());

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
        const isPasswordValid = await bcrypt.compare(password, user.password);

        console.log(isPasswordValid);

        if(isPasswordValid){
            res.send("Login Successful!!!")
        } else {
            throw new Error("Pass word is not correct !!")
        }

    } catch (err) {
        res.status(400).send("ERROR : "+ err.message);
    }
})

//GET user by lastname
app.get("/user",async (req,res)=>{
    const lastName = req.body.lastName;

    try {
        const user = await User.find({ lastName: lastName});
        if(user.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

//Feed API - GET /feed - get all the users from the database
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }

})

//Delete aPi
app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
    try{
        // const user = await User.findByIdAndDelete({_id:userId});
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfullly");

    } catch (err){
        res.status(400).send("Something went wrong");
    }
})

// 
app.patch("/hw",async (req,res)=>{
    const lastNamee = req.body.lastName;
    const data = req.body;
    try {
        await User.findOneAndUpdate({lastName: lastNamee},data);
        res.send("user patched ");
    } catch (err) {
        res.status(400).send("SMTHG FISHY");
    }
})


//Api to update 
app.patch("/user/:userId",async (req,res)=>{

    const userId = req.params?.userId;
    const data = req.body;

    

    try{
        const user = await User.findByIdAndUpdate({_id:userId}, data,{
            returnDocument: "before",
            runValidators: true,
        });
        console.log(user);

        const ALLOWED_UPDATES = [
        "lastName","age","gender","password"
    ]

        const isUpdateAllowed = Object.keys(data).every((k)=>{
        ALLOWED_UPDATES.includes(k);
        });

        if (!isUpdateAllowed) {
        throw new Error("Update not allowed");
        }

        if(data?.lastName.length > 20 ){
            throw new Error("Update not allowed");
        }

        res.send("User updated successfully");
        } catch (err){
        res.status(400).send(err.message);
        }
})


connectDB().then(async ()=>{
    await User.createIndexes();
    console.log("Databse is established");

    app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});
}).catch((err)=>{
    console.log("DB not connected");
    console.log(err);
})



//callback function will only run if listening to port is successful