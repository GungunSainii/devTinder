const express = require('express');

const {adminAuth} = require("./middlewares/auth.js");

const app = express(); //instance of express js application //new appn of express
//creating new web server using express


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




app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});

//callback function will only run if listening to port is successful