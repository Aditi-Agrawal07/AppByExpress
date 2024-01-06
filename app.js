// Import packages
const express = require("express")
const morgan = require("morgan")

// Swagger 
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui")
const passport = require("passport")

const options = {
    definations: {
        openapi :' 3.0.0',
        info: {
            title: "Job Portal Api",
            version: '1.0.0'
        },
        servers: {
            api : 'https://job-portal-dy0q.onrender.com',
            local_api: 'http://localhost:8000/'
        }
    },
    apis: ['./app.js']
}

const swaggerSpec = swaggerJsDoc(options)


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))



// Mongo session setup 
// app.use(session({
//     secret:process.env.JWT_SECRET,
//     resave: false,
//     saveUninitialized:true,
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI,
//         collection: session
//     }),
//     cookie: { 
//         maxAge:1000 *60 * 60 * 24
//     }
// }))
// app.use(passport.initialize())
// app.use(passport.session())

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