// Import dependencies
const crypto = require("crypto")

function generateHash(text, salt=crypto.randomBytes(32).toString("hex")){
    try{
        const generatedHash = crypto.pbkdf2Sync(text, salt, 1000, 64, "sha512").toString("hex")
        return{ salt, hash: generatedHash}
    }catch(err){
        console.log("Error", err)
        return {};
    }
}
function validateHash(text,hash, salt){
    try{
       console.log("Its is called")
        const { hash: generatedHash } = generateHash(text,salt)
   
        const isHashValid = generatedHash === hash
        return isHashValid
    }catch(err){
        console.log("Error:" , err)
        return false
    }

}
module.exports = {
    generateHash,
    validateHash
}