const express = require("express")
const router = express.Router()
const {showHome} = require("../controller/home_controller")
router.get("/showHome",showHome)

module.exports = router