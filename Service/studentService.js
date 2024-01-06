// Import model
const { Student } = require("../Models")


// Import Config
const { responseMessage } = require("../config")

// Function to update Student
const updateStudentInfo = async (studentId, data) => {
    try {

        const updatedStudent = Student.findByIdAndUpdate(studentId, data, { new: true })

        if (!updatedStudent) {
            return res.status(400).send({
                hasError: true,
                message: responseMessage.USER_NOT_FOUND
            })
        }
        return updatedStudent

    } catch (err) {
        return res.status(400).send({
            hasError: true,
            message: err
        })
    }

}

// Fucntion student find by id
const getStudentById = async(studentId)=> {
    try{
        console.log("Student Id in service:", studentId)
       const student = await Student.findById(studentId)

        if(student) return student
    }catch(err){
        return false
    }
}
module.exports = {
    updateStudentInfo,
    getStudentById
}