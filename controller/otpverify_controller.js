
const model = require("../models/user");
const jwt = require ("jsonwebtoken")

const verifyOtp = async (req,res)=>{
    const {E_mail,otp} = req.body;

    try{
        const result =await model.User.findOne({E_mail:E_mail})
        if(!result){
            return res.status(400).json({message:"Invalid email or otp"})
        }
        if(result.otp !== otp || Date.now()>result.otpExpiry){
            return res.status(400).json({message:"Invalid or expired otp"});
          }


        //   otp verified successfully

        result.otp = null;
        result.otpExpiry = null;
        await result.save()
       
        const token = jwt.sign(
            { id: result.id, E_mail: result.E_mail },
            process.env.JWT_TOKEN,
            { expiresIn: "2d" }
        );

        res.cookie("jwt", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 600000),
        });

        res.status(200).json({ message: "Login successful", token: token, data: result });
        
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(err);
    }
    
    }
    


    module.exports = {
        verifyOtp:verifyOtp
    }   