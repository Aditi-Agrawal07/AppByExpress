// Import model

const { User, Student, Recruiter, Teacher } = require('../Models')
const mongoose = require("mongoose")

// Import utils
const { crypto, cloudinary, logger} = require("../utils")


// Function : Register User
async function registerUser(payload, filePath) {
    try {
        let user;
        console.log("path of the file: ", filePath)
        payload.password = crypto.generateHash(payload.password)
        
   
        if (payload.role === "Student") {
            user = new Student(payload)
            user.resume = filePath.url
            console.log(user)
            logger.info("Successfully registered")
           
        } else if (payload.role === "Recruiter") {
            user = new Recruiter(payload)
            user.photo = filePath.url
        }
        else if (payload.role === "Teacher") {
            user = new Teacher(payload)
            user.photo = filePath.url
        }
        await user.save();

        return user

    } catch (err) {
        console.log("Error", err)
        return false
    }
}

// Function : Login User
async function getUserByEmail(email, role) {
    try {

        let user;
         user = await Student.find({ email })
      
         if(user){
            user.role = "Student"
            return user
         }

         user = await Recruiter.find({ email })
         if(user){
            user.role = "Recuriter"
            return user
         }

         user = await Teacher.find({ email })
         if(user){
            user.role = "Teacher"
            return user
         }



    } catch (err) {
        console.log("Error", err)
        return false;
    }

}

// Function: Check Email Exist
async function checkEmailExist(email, role) {
    try {
        const roleData = role
        console.log(roleData)

        const UserModel = mongoose.model(roleData)
        let emailExist = false
        const user = await UserModel.findOne({ email });
        if (user) emailExist = true;

        return emailExist
    } catch (err) {
        console.log(err)
        return false
    }

}

// Function : Get User of that role
async function findUserByRole(role) {
    try {
        const user = await User.find({ role })

        return user
    } catch (err) {
        console.log("Error : ", err)
        return false
    }

}

module.exports = {
    checkEmailExist,
    registerUser,
    getUserByEmail,
    findUserByRole

}
