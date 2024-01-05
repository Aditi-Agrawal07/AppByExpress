const mongoose = require("mongoose")
const validator = require("validator")

// import Model
const Job = require("../Models/Jobs")

// Schema For Student
const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Please provde your name"]
    },
    age: {
        type:String
    },
    email: {
        type:String,
        require: [true, "Please enter your email"],
        lowercase: true,
        validate:  [validator.isEmail, "Please Enter valid email address"]

    },
    photo: {
        type: String
    },
    password: {
        hash: { 
            type:String
        },
        salt: {
            type:String
        }
    },
    confirmPassword: {
        type: String,
        require: [true, "Please Enter confirm Password"],
        validate: {
            validator: function(val){
                return val == this.password 
            },
            message: "Password and Confirm Password doen't match"
        }
    },
    resume: {
        type:String
    },
    isApproved: {
        type: Boolean
    },
    appliedJobs: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
})

// Model for student
const Student = mongoose.model("Student", studentSchema)

module.exports = Student