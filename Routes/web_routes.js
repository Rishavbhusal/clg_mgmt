const express = require ("express")
const auth = require("../middleware/auth")


const router= express.Router()
const{Homepage,contact,About,Bca,Cs_it,Faqs,SignIn,login,remove,Admin,verifyOtp} = require("../controller/web_controller")



router.get("/home",Homepage)
.get("/contact",contact)
.get("/about",About)
.get("/bca",Bca)
.get("/cs-it",Cs_it)
.get("/faq",Faqs)
.get("/SignIn",SignIn)
.get("/login",login)
.get("/otpVerify",verifyOtp)
.get("/remove",remove)
.get("/admin", Admin)
.get("/secreat",auth,(req,res)=>{
    res.render("secreat")
})
module.exports =router;