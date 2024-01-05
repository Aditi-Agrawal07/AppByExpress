const mongoose = require("mongoose");
const validator = require("validator")

// Schema for Recruiter
const recruiterSchema = new mongoose.Schema({
    name: {
        type:String,
        require: [true, "This is required Field"]
    },
    email:{
        type:String,
        lowercase: true,
        validate: [validator.isEmail , "Please enter a valid email Address"]
    },
    company_name: {
        type: String,
        require: [true, "Please Enter your company name"]
    },
    password: {
        hash:{
            type:String
        },
        salt:{
            type:String
        }
    },
    photo: {
        type:String
    }
})

// Model for recruiter
const Recruiter  = mongoose.model("Recruiter", recruiterSchema)


module.exports = Recruiter