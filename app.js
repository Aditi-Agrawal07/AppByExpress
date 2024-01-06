// Import packages
const express = require("express")
const morgan = require("morgan")

// Swagger 
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json');
const passport = require("passport")




const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


// Import Utilities
const  { database } = require("./utils") 

// Initialize database connection
database.mongooseConnection();

// Start Routes
const { userRouter,jobRouter,studentRouter  } = require("./Routes")



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/user", userRouter)
app.use("/jobs", jobRouter)
app.use("/student",studentRouter)

module.exports = { app }