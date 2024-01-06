const mongoose = require("mongoose")
const validator =  require("validator")

// Schema for Teacher
const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        require: [true, "Please Enter your name"]
    },
    email:{
        type:String,
        lowercase: true,
        validate: [validator.isEmail,"Please Enter your valid email" ]
    },
    password:{
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

// Model for teacher
const Teacher = mongoose.model("Teacher", teacherSchema)

module.exports = Teacher