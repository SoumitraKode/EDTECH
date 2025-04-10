const Razorpay = require("razorpay");
const dotenv = require("dotenv") ;

exports.instance = new Razorpay({
    key_id: 'rzp_test_Td0LKIEJby5SR8',
    key_secret: 'GhFaRjtbaHzM26Hg4NVwiX4e',
});