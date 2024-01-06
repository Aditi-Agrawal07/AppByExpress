// Import packages
const express = require("express")
const morgan = require("morgan")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require("passport")
// require('dotenv').config()

// const elastic = require("elasticsearch")

// const elasticClient =  new elastic.Client({
//     hosts:"localhost:9200"
// })

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




app.use("/user", userRouter)
app.use("/jobs", jobRouter)
app.use("/student",studentRouter)

module.exports = { app }