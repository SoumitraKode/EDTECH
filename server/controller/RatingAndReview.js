const RatingAndReviews = require("../models/RatingAndReview") ;
const Course = require("../models/Course");

// Create Rating And Review
const mongoose = require("mongoose"); // Ensure ObjectId conversion

exports.createRatingAndReview = async (req, res) => {
    try {
        console.log("Inside Create Rating and Review Controller Backend");

        // Fetch Data
        const { courseId, rating, review } = req.body;
        const UserId = req.user.id;
        console.log("User ID:", UserId);

        // Validate Request Body
        if (!review || !rating || !courseId || !UserId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Convert UserId to ObjectId to match database format
        const userObjectId = new mongoose.Types.ObjectId(UserId);

        // Check if user is enrolled in the course
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $in: [UserId] }, // ✅ Use $in for array check
        });

        console.log("Course Details:", courseDetails);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            });
        }

        // Check if user already reviewed the course
        const existingReview = await RatingAndReviews.findOne({
            user: userObjectId,
            course: courseId,
        });

        if (existingReview) {
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed",
            });
        }

        // Create a new rating and review
        const newRatingAndReview = await RatingAndReviews.create({
            rating,
            review,
            user: userObjectId,
            course: courseId,
        });

        // Push the new rating into course
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: { ratingAndReviews: newRatingAndReview._id } },
            { new: true }
        );

        console.log("Updated Course Details:", updatedCourseDetails);

        return res.status(200).json({
            success: true,
            message: "Rating and Review posted successfully",
        });

    } catch (error) {
        console.log("Unable to Rate OR Review");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while posting the review",
        });
    }
};



//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
            //get course ID
            const courseId = req.body.courseId;
            //calculate avg rating

            const result = await RatingAndReview.aggregate([
                {
                    $match:{
                        course: new mongoose.Types.ObjectId(courseId),
                    },
                },
                {
                    $group:{
                        _id:null,
                        averageRating: { $avg: "$rating"},
                    }
                }
            ])

            //return rating
            if(result.length > 0) {

                return res.status(200).json({
                    success:true,
                    averageRating: result[0].averageRating,
                })

            }
            
            //if no rating/Review exist
            return res.status(200).json({
                success:true,
                message:'Average Rating is 0, no ratings given till now',
                averageRating:0,
            })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReviews.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"FirstName LastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}