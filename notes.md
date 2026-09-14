
const {adminAuth} = require("./middlewares/auth.js");

//Handler Auth middleware for all requests
app.use("/user", adminAuth);

app.get("/user",(req,res,next)=>{
    // throw new Error("Alallal");
    res.send("All data sent");
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong ");
    }
})




// app.use(
//     "/user",
//     (req,res,next)=>{
//         next();
//         res.send("1st route handler");

        

// },(req, res)=>{
//         res.send("2nd route handler");
// });




//Server is known as request handler

// app.use("/user",(req,res)=>{
//     res.send("HAHAHHAH");
// })

// app.patch("/user",(req,res)=>{
//     res.send("Data patched successfully");
// });

// app.get("/user",(req,res)=>{
//     console.log(req.query);
//     res.send({
//         firstName: "Gungun",
//         lastName: "Saini"
//     });
// });

// app.post("/user",(req,res)=>{
//     console.log("Save Data to the database");
//     res.send("Data Successfully saved to database");
// });

// app.delete("/user",(req,res)=>{
//     res.send("Deleted");
// });

// app.use("/test",(req,res)=>{
//     res.send("Testing girly pop (❁´◡`❁)");
// });



//EP-10 | AUTHENTICATION,JWT & COOKIES

/GET user by lastname
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
