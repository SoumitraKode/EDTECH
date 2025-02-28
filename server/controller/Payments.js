const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const crypto = require("crypto");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
// import paymentSuccessEmail from "../mail/templates/paymentSuccessEmail";
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const mailSender = require("../utils/mailSender") ;
const courseProgress = require("../models/CourseProgress") ;



// };
// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  console.log("REquest Body : ",req.body) ;
  const {courses}  = req.body ;
  console.log("Capture Payment courses : ",courses) ;
  const userId = req.user.id
  console.log("Capture Payment userId : ",userId) ;
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course ;
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      
      if (course.studentsEnrolled.includes(userId)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log("Error in for loop of courses : ") ;
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }
  console.log("Total Amout : ",total_amount) ;

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }
  console.log("Options :",options) ;

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log("Payment Response : ",paymentResponse) ;
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
} 

// };
// verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
  
    const userId = req.user.id
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courses ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

exports.sendPaymentSuccessEmail = async (req,res) =>{
    try {
        const email = req.body.email ;
        const response = await mailSender(email,"Payment SUccessfull",paymentSuccessEmail) ;
        console.log("Payment success sent successfully") ;
    } catch (error) {
        console.log("Error in sending Paymnet status mail" );
        console.log("Error : ",error ) ;
        console.log(error.message) ;
    }
} ;
/*
  "courseId":"67b47e4fa1979c7dcf019168",
  "userId":"67af96fe5b875ae4574f3e3b",
  completedVidoes

 */

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)//done
  
        const NewcourseProgress = await courseProgress.create({
          courseId: courseId,//spelling mistake hoti
          userId: userId,
          completedVideos: [],
        })//done
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: NewcourseProgress._id,
            },
          },
          { new: true }
        ).exec() ;
        //done
        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.FirstName} ${enrolledStudent.LastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }