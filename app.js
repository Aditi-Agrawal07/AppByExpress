// Import packages
const express = require("express")
const morgan = require("morgan")

// Swagger 
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const passport = require("passport")

const options = {
    definition: {
      
        info: {
            title: "Job Portal Api",
            version: '1.0.0'
        },
        servers: {
            url : 'https://job-portal-dy0q.onrender.com',
            url: 'http://localhost:8000/'
        }
    },
    apis: ['./app.js']
}

const swaggerSpec = swaggerJsDoc(options)


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



app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use("/user", userRouter)
app.use("/jobs", jobRouter)
app.use("/student",studentRouter)

module.exports = { app }