const passport = require('passport');
const crypto = require('./crypto.utils')


const { Student, Recruiter, Teacher } = require('../Models');


// jwt statergy import
const JWtStratergy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt






// ************** PASSPORT WITH JWT *****************//

const options =  {
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "rrjrjfkjfoeruyiuriri23",


}

passport.use(new JWtStratergy(options, async(payload, done)=>{

  try {
    let user;
    const email = payload.user.email 
  

    user = await Student.findOne({ email })

    if (user) {

     
      
      return done(null, user)
    }

    user = await Recruiter.findOne({ email })
    if (user) {

      return done(null, user)
    }

    user = await Teacher.findOne({ email })
    if (user ) {


      return done(null, user)

    }


    if (!user) {
      return (done(null, false))
    }
    return done(null, false, { message: "Incorrect Password" })
  } catch (err) {
    console.log("An error happend")
    return done(err)

  }


}))





