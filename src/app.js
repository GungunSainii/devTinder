const express = require('express');

const app = express(); //instance of express js application //new appn of express
//creating new web server using express



//Server is known as request handler

// app.use((req,res)=>{
//     res.send("Hello from the server");
// });
app.use("/test",(req,res)=>{
    res.send("Test Test Test");
});
app.use("/helo",(req,res)=>{
    res.send("HULLA HULLA HU HU");
});
app.use("/",(req,res)=>{
    res.send("HI CUTIE PIE OwO");
});



app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});

//callback function will only run if listening to port is successful