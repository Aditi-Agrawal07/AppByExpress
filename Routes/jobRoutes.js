// Import Router 
const router = require("express").Router()

// Import Controller
const { jobsController } = require("../Controller")

// Import Middleware
const { protectRoutes, authen } = require("../Middleware")

const passport = require('passport')

router.use(passport.initialize())

// Routes: save jobs
router.post("/save", passport.authenticate('jwt', {session: false}), protectRoutes.protectRoutes, jobsController.saveJobs)

// Routes: get All jobs
router.get("/getAll", jobsController.getJobs);

// Routes:  Apply for job
router.post("/apply/:jobId", jobsController.applyJob)
module.exports = router