const auth = require("../middleware/auth")
const { getHomeItems } = require("./home_services");


const Homepage = async (req,res)=>{
    const result = await getHomeItems();

//    var result = {title:"Nepathya College123",description:"<h1>Hello</h1>",video:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"};

    res.render("home",{data: result})

}

const contact =(req,res)=>{
    res.render("contact"
        // ,yesari aauta aauta route lai style sheet dina milxa
        // {style:"contact.css"}
    )
}

const About =(req,res)=>{
    res.render("about")
}
const Bca =(req,res)=>{
    res.render("Bca")
}
const Cs_it =(req,res)=>{
    res.render("Cs_it")
}
const Faqs = (req,res)=>{
    res.render("FAQ")
}
const SignIn = (req,res)=>{
    res.render("SignIn")
}
const login = (req,res)=>{
    res.render("login")
}
const verifyOtp =(req,res)=>{
    
    res.render("otpVerify")
}
const remove = (req,res)=>{
    res.render("delete")
}

const Admin = (req,res)=>{
    res.render("Admin")
}




module.exports={
    Homepage : Homepage,
    contact:contact,
    About :About,
    Bca : Bca,
    Cs_it:Cs_it,
    Faqs : Faqs,
    SignIn:SignIn,
    login:login,
remove:remove,
Admin : Admin  ,
verifyOtp:verifyOtp 

    // secreat:secreat
    
}