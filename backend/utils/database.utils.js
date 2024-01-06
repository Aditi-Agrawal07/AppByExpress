const mongoose = require("mongoose")
require("dotenv").config()

function mongooseConnection() {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Succesfull Connected with DB")
    })
    .catch((err)=>{
        console.log("Something went wrong", err)
    })
}

module.exports = { mongooseConnection };