// Import Router
const router =  require("express").Router()

// Import controller
const  { studentController } =  require("../Controller")

const passport = require("passport")

// Routes: Get All Student
router.get("/getAll", passport.authenticate('jwt', {session: false}), studentController.getStudents)

// Routes: Update Student information
router.patch("/updateStudentInfo/:studentId", studentController.upadteStudentDetail)

// Route: Get Student
router.get("/getStudent/:studentId", passport.authenticate('jwt', {session: false}), studentController.getStudent)


module.exports = router

