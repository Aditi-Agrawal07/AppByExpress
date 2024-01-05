// Import dependencies
const jwt = require("jsonwebtoken")

// Function for generate json Web token
function generateJwtToken(payload) {
    try {
        console.log("payload", payload)
        const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, { expiresIn: "1d" })
        return token
    } catch (err) {
        console.log("Error : ", err)
        return false
    }
}

function decodeJwtToken(token) {
    try {
        console.log("verify token called")
        console.log(token)
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      
        return decodedToken.user

    } catch (err) {
        return res.status(401).send({
            hasError: true,
            message: "Invalid token"
        })
    }
}

module.exports = {
    generateJwtToken,
    decodeJwtToken
}