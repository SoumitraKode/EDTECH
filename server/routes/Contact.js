const express = require("express")
const router = express.Router()
const { contactUsController } = require("../controller/ContactUs") ;

router.post("/contactinfo", contactUsController)

module.exports = router
