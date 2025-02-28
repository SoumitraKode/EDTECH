// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  // verifySignature,
  // enrollStudents,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controller/Payments") ; 
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
)
// router.post("/enrollStudent",auth,isStudent,enrollStudents) ;
// router.post("/verifySignature", verifySignature)

module.exports = router
