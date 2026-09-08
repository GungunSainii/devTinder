const adminAuth = (req,res,next)=>{
    const token = "qwerty";
    const isAdminAuthorized = token === "qwerty";
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request");
    } else {
        next();
    }
};

module.exports = {
    adminAuth,
};