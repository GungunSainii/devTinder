const mongoose = require("mongoose");

const connectDB= async () =>{
    await mongoose.connect("mongodb+srv://sainigungun01_db_user:9Il4LgfOPRqJL30T@namastenode.lu7b7ik.mongodb.net/?appName=NamasteNode/devTinder");
}

module.exports = {
    connectDB,

}

