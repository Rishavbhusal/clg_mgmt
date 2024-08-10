const express = require ("express")
const router = express.Router()
const {
    Home,
    Register,Login,User,getUserById,userUpdate,userDelete,} = require("../controller/user_controller")
const tokenVerify = require ("../middleware/verifyToken")
router

.get("/homee",Home)
.post("/register",Register)
.post("/login",Login)
.get("/user",User)
.get("/user/:id",getUserById)

.patch("/updateUser/:id",tokenVerify.verifyToken, userUpdate)
.delete("/deleteUser/:id",tokenVerify.verifyToken,userDelete)

// .post('/otp',otp)
module.exports = router