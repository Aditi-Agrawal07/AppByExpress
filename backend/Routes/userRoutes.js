// Import Router 
const router = require("express").Router()

// Import Controller
const { userController } = require("../Controller")

// Import Middleware
const { multer, protectRoutes } = require("../Middleware")

const passport = require('passport')

router.use(passport.initialize())
router.use(passport.session())


// ROUTES: SignUp
router.post("/signup",multer.uploader.single("file"),userController.registerUser)

// ROUTES: Login by passport session
router.post("/login", userController.loginUser)


// ROUTES: Get users by role
router.get("/get-users-by-role/:role", userController.getUsersByRole)

module.exports = router