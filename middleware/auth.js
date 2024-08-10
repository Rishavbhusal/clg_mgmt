const jwt = require("jsonwebtoken")
const user = require("../models/user")


const auth = async(req,res,next)=>{

    try{
const token = req.cookies.jwt
const verifyUser = jwt.verify(token,process.env.JWT_TOKEN)
console.log(verifyUser)
const User =await user.findOne()
console.log(User)
next()
    }catch(err){
        res.status(401).send(err)
    }
}

module.exports = auth