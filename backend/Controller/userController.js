// Import Service
const { userService } = require("../Service")

// Import Utilites
const {crypto, jwt, cloudinary, logger} = require("../utils")

// Import config 
const {responseMessage } = require("../config")
const { response } = require("express")

// Controller : register User
const registerUser = async(req, res) =>{
    try{
   
        console.log("Its called")
        const requestData = req.body

        console.log("Requested data:", requestData)

     
      const filePath = await cloudinary.uploadFile(req.file.path)
    //   req.body.resume = filePath.url
      
        if(await userService.checkEmailExist(requestData.email, requestData.role)){
           logger.error("Email already Exist")
            return res.status(200).send({
                hasError:true,
                message: responseMessage.EMAIL_EXISTS
            })

        }
        const user = await userService.registerUser(requestData,filePath);
        console.log("User object: ", user)

        if(user){
        const jwtToken = jwt.generateJwtToken({email: user.email, role: requestData.role})
        return res.status(200).send({
            hasError: false,
            data: user,
            jwtToken
        })
    }
    }catch(err){
        console.log("Error", err)
        res.status(500).send({
            hasError: true,
            message: responseMessage.INTERNAL_SERVER_ERROR
        })

    }

}

// Controller: Login User
const loginUser = async(req,res)=>{
    try{
        const userCredential = req.body;
        const user = await userService.getUserByEmail(userCredential.email)
        if(!user){
            console.log("User Not Found !")
            return res.status(404).send({
                hasError: true,
                data:responseMessage.USER_NOT_FOUND
            })
        
        }
       

        // Validate Hash
     
        console.log(user.role)
        
        const isHashValid = crypto.validateHash(userCredential.password, user[0].password.hash, user[0].password.salt)
        if(!isHashValid){
            console.log("Incorrect Password")
            res.status(400).send({
                hasError: true,
                data: responseMessage.INCORRECT_PASSWORD
            })
        }
        const jwtToken = jwt.generateJwtToken({email: userCredential.email, role: user.role })
      
        console.log("You Logged In !")
        return res.status(200).send({
            hasError: false,
            data: {
                token: jwtToken,
                user
            }
        })
    }catch(err){
        console.log("Error", err)
        return res.status(500).send({
            hasError: true,
            message: responseMessage.INTERNAL_SERVER_ERROR,
         
        })
    }
}
// Controller : Get User By role
const getUsersByRole = async(req,res)=>{
  try{
    const role = req.params.role
    
    const users = await userService.findUserByRole(role)

    if(!users){
        console.log("User Not Found !")
        return res.status(404).send({
            hasError: true,
            message: responseMessage.USER_NOT_FOUND
        })
    }
    return res.status(200).send({
        hasError: false,
        count: users.length,
        data: {
            users
        }
    })
  }catch(err){
    console.log("Error", err)
    res.status(500).send({
        hasError:true,
        message: responseMessage.INTERNAL_SERVER_ERROR
    })
  }

}

module.exports = {
    registerUser,
    loginUser,
    getUsersByRole
}