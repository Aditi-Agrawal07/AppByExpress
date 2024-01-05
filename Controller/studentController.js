// Import Model
const { Student } = require("../Models")

// Import Services 
const { studentService } = require("../Service")
const { responseMessage } = require("../config")

const { jwt, logger } = require("../utils")

// Controller: Get All student
const getStudents = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')

        const decodedToken = jwt.decodeJwtToken(token[1])
        console.log("Token user role: ", decodedToken.role)
        if (decodedToken.role == "Teacher") {
            const student = await Student.find()

            return res.status(200).send({
                hasError: false,
                count: student.length,
                data: {
                    student
                }
            })
        }
        else if (decodedToken.role == "Recruiter") {
            const student = await Student.find({ isApproved: true })

            return res.status(200).send({
                hasError: false,
                count: student.length,
                data: {
                    student
                }
            })
        }
        else {
            return res.status(401).send({
                hasError: true,
                message: "unauthorized"
            })
        }


    } catch (err) {
        return res.status(400).send({
            hasError: false,
            message: err
        })
    }
}

// Controller: Upadate Student
const upadteStudentDetail = async (req, res) => {
    try {
        const studentID = req.params.studentId

        const updateStudentInfo = await studentService.updateStudentInfo(studentID, req.body)

        return res.status(200).send({
            hasError: false,
            data: {
                updateStudentInfo
            }
        })



    } catch (err) {
        return res.status(400).send({
            hasError: false,
            message: err
        })
    }

}

// Controller: Get Student By ID
const getStudent = async (req, res) => {
    try {
    const studentID = req.params.studentId
        const student = await studentService.getStudentById(studentID)
        logger.info("Sucessfully get the student ")
        if (student) {
            return res.status(200).send({
                hasError: false,
                data: {
                    student
                }
            })
        }
        else {
            return res.status(404).send({
                hasError: false,
                message: responseMessage.USER_NOT_FOUND
            })
        }


    } catch (err) {

        return res.status(500).send({
            hasError: true,
            message: responseMessage.INTERNAL_SERVER_ERROR
        })
    }
}
module.exports = {
    getStudents,
    getStudent,
    upadteStudentDetail
}