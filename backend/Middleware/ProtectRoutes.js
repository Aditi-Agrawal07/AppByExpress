// Import Controller
const { userController } = require("../Controller")

const authentication_user = async(req,res,next)=>{
    try{
        const token = req.headers.authorization
if(token){
        const user = await verifyJwtToken(token)
        if(user){
            req.user = user
            next()
        }else{
            return res.status(401).send({
                hasError: true,
                message: "Invalid token"
            })
        }
    }
    else{
        res.status(401).send({
            hasError: true,
            message: "Unauthorizes"
        })
    }
}catch(err){
    res.status(400).send({
        hasError: true,
        message: err
    })
}


}
const protectRoutes = async(req, res, next)=>{
    const user = req.user
    console.log(user.userRole)
    if(user.userRole == "Recruiter"){
        next()
    }
    else{
        return res.status(401).send({
            hasError: true,
            messsage: "unauthorized"
        })
    }
}



const isStudent = (req, res, next) => {
    try {
        // Assuming you have a field like 'role' in your form data
        const role = req.body.role;

        req.isStudent = (role === "student");

        if (req.isStudent) {
            console.log("User is a student");
            next();
        } else {
            console.log("User is not a student");
         
  
        }
    } catch (err) {
        console.error("Error in isStudent middleware:", err);
        return res.status(400).send({
            hasError: true,
            message: err.message
        });
    }
};


module.exports = {
    protectRoutes,
    authentication_user,
    isStudent
}