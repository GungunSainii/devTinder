const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/coonectionRequestSchema");
const User = require("../models/user.js");


const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth , async (req,res)=>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];
        if(!allowedStatus.includes(status)){
            throw new Error("Status is Invalid " + status);
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                { fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send("Connection Request already sent !")
        }

        const connectionRequest = new ConnectionRequest({ fromUserId,
            toUserId, status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + "is " + status + "in " + toUser.firstName,
            data,
        });

    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }

    // res.send(req.user.firstName + "   sent the connect request");
})


module.exports = requestRouter;