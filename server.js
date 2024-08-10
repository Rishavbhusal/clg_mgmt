const express = require ("express")
const http = require("http")

const cookieParser = require("cookie-parser")
const router = require("./Routes/user_routes")

var bodyParser = require('body-parser')
require('dotenv').config() 
const user = require("./models/user")
const port=process.env.PORT
const app = express()
// const webController = require("./controller/web_controller")
// const cors =require("cors")
const path = require ("path")
const webRoutes = require("./Routes/web_routes")
const homeRoute = require("./Routes/home_routes")
const expressHbs = require('express-handlebars')
const auth = require("./middleware/auth")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"/public")))

app.use("/",router)
app.use("/web",webRoutes)
app.use("/home",homeRoute)
// app.use(cors())
// app.use("crocs")
const hbs =expressHbs.create({
    extname:"hbs",
    defaultLayout:"default",
   layoutsDir:__dirname+"/views/layout",
    partialsDir:__dirname+"/views/partials",
    helpers:{}
})

app.engine("hbs",hbs.engine)
app.set("views",path.join(__dirname,"views"))
app.set("view engine","hbs")

// app.get("/contact",(req,res)=>{
//     res.render("contact")
// })

const server =http.createServer(app)


server.listen(port,()=>{console.log("server is runnig at port : " + port)
})
