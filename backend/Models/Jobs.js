const mongoose = require("mongoose")

// Import Model
const student = require("../Models/Student")

const JobsSchema = mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Recruiter",
        require: true
    },
    location :{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    skills: {
        type: [String]
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }]
})

const Jobs = mongoose.model("Jobs", JobsSchema)

module.exports = Jobs