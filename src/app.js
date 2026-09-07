const express = require('express');

const app = express(); //instance of express js application //new appn of express
//creating new web server using express



//Server is known as request handler

// app.use("/user",(req,res)=>{
//     res.send("HAHAHHAH");
// })

app.patch("/user",(req,res)=>{
    res.send("Data patched successfully");
});

app.get("/user",(req,res)=>{
    res.send({
        firstName: "Gungun",
        lastName: "Saini"
    });
});

app.post("/user",(req,res)=>{
    console.log("Save Data to the database");
    res.send("Data Successfully saved to database");
});

app.delete("/user",(req,res)=>{
    res.send("Deleted");
});

app.use("/test",(req,res)=>{
    res.send("Testing girly pop (❁´◡`❁)");
});





app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});

//callback function will only run if listening to port is successful