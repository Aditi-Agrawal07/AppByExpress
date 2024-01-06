const passport = require('passport');
const crypto = require('./crypto.utils')
require('dotenv').config()
const { Student, Recruiter, Teacher } = require('../Models');

// local stratergy import
const LocalStratergy = require('passport-local').Strategy

// jwt statergy import
const JWtStratergy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt



passport.serializeUser((user, done) => {

  console.log("Serialize fucntion called")
  done(null, { id: user.id, userRole: user.userRole })

})

passport.deserializeUser(async (data, done) => {
  console.log("It called")
  try {
    let user;
    if (data.userRole === 'Student') {
      user = await Student.findById(data.id);
    } else if (data.userRole === 'Recruiter') {
      user = await Recruiter.findById(data.id);
    } else if (data.userRole === 'Teacher') {
      user = await Teacher.findById(data.id);
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

async function verifyPassword(password, user) {

  return crypto.validateHash(user.password.hash, user.password.salt)
}

passport.use('local', new LocalStratergy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      let user;

      user = await Student.findOne({ email })

      if (user && verifyPassword(password, user)) {

        user.userRole = "Student"
        return done(null, user)
      }

      user = await Recruiter.findOne({ email })
      if (user && verifyPassword(password, user)) {

        user.userRole = "Recruiter"
        return done(null, user)
      }

      user = await Teacher.findOne({ email })
      if (user && verifyPassword(password, user)) {

        user.userRole = "Teacher"

        return done(null, user)

      }


      if (!user) {
        return (done(null, false))
      }
      return done(null, false, { message: "Incorrect Password" })
    } catch (err) {
      return done(err)

    }
  }
))


// ************** PASSPORT WITH JWT *****************//

const options =  {
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,


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





