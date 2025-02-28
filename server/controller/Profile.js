const { populate } = require("../models/Course");
const Profile = require("../models/Profile") ;
const User = require("../models/User") ;
const uploadImageToCloudinary = require("../utils/imageUploader") ;
const dotenv = require("dotenv").config() ;
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course") ;
const { convertSecondsToDuration } = require("../utils/secToDuration");
exports.updateProfile = async(req,res) =>{
    try {

        //Fetch Profile Data
        const {gender,dateofBirth,about,contactNo,firstName,lastName} = req.body ;

        //we have user id in Request body ==> Appended in Middlewares
        const UserId = req.user.id ;

        //Now get the Profile id by using UserId
        const prev_User = await User.findById(UserId) ;

        const ProfileId = prev_User.additionalDetails ;
        //####SIR NE ALAG TYPE SE UPDATE KIYA HAI TOH THIS  CODE MIGHT BR ERRORED

        //Get the Profile by using ProfileId and update it 
        const IsProfile = await Profile.findById(ProfileId);
        console.log("IS Profile",IsProfile) ;
        if(!IsProfile){
            return res.status(404).json({
                success:false,
                message:"Profile Not Found",
            });
        }
        const UpdatedProfile = await Profile.findByIdAndUpdate(ProfileId,
                                                                {
                                                                    gender,dateofBirth,about,contactNo,
                                                                },
                                                                {new:true},
        );

        //we dont need to update anything in User as it stores the refernece of the Profile.
        UpdatedProfile.image = prev_User.image ;
        if(firstName){
            const UpdatedUserFirstName = await User.findByIdAndUpdate((UserId),
            {
                FirstName:firstName ,
            })
        }
        if(lastName){
            const UpdatedUserLastName = await User.findByIdAndUpdate((UserId),
            {
                LastName:lastName ,
            })
        }
        const UpdatedUser = await User.findById(UserId) ;
        // Return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            UpdatedProfile:UpdatedProfile,
            UpdateUser:UpdatedUser,
        }) ;


    } catch (error) {
        console.log("Unable to Update Profile") ;
        console.error(error) ;
        return res.status(500).json({
            success:false,
            message:"Error in Updating Profile",
        })
    }
}

//deleteaccount
exports.deleteAccount = async (req,res)=>{
    try {
        //get user ID :
        const UserId = req.user.id ;
        console.log("user Id : ",UserId) ;
        
        //Get the user from db
        const ExistingUser = await User.findById(UserId) ; 

        //Validate User Id
        if(!ExistingUser){
            console.log("Invalid user ID") ;
            return res.status(500).json({
                success:false,
                message:"Invalid User Id",
            })
        }

        //Delete the Profile of user ==> Get the Profile ID
        const ProfileId = ExistingUser.additionalDetails ;

        //delete the profile by using Profile ID
        const DeletedProfileRes = await Profile.findByIdAndDelete(ProfileId) ;//SIR ==> _id:ProfileId

        //Delete the User
        const DeletedUserRes = await User.findByIdAndDelete(UserId) ;//SIR ==> _id:UserId

        //Return respose
        return res.status(200).json({
            success:true ,
            message:"User Deleted Successfully",
        })


    } catch (error) {
        console.log("Error in Deleting Account");
        console.error(error) ;

        return res.status(500).json({
            success:false,
            message:"Unable to Delete Account" ,
            error:error.message,
        })
    }
}

exports.getAllUserDetails = async(req,res)=>{
    try {
        //get id
        const UserId = req.user.id ;
        //DB call
        const UserDetails = await User.findById(UserId).populate("additionalDetails").exec() ;

        //return res
        res.status(200).json({
            success:true,
            message:"User Details Fetched Successfully",
            UserDetails:UserDetails,
        })
    } catch (error) {
        console.log("Unable to fetch all User Details") ;
        console.error(error) ;
        return res.status(500).json({
            success:false,
            message:"Error",
        })
    }
}

exports.updateDisplayPicture = async (req,res) =>{
    try {
        ///collect the profile picture from req body file
        console.log("Into Update Function") ;
        const profile_image = req.files.Profile_Image ;
        if(!profile_image){
            return res.status(500).json({
                success:false,
                message:"Upload Valid Image" ,
            });
        }
        //Get the user from the request
        const UserId = req.user.id ; 

        //upload the image to cloudinary
        console.log("Uploading Image : ");
        const uploadResponse = await uploadImageToCloudinary(profile_image, process.env.FOLDER_NAME ,1000,1000) ;
        if(!uploadResponse){
            console.log("Error in Uploading Image") ;
            return res.status(500).json({
                success:false,
                message:"Unable to upload image",
                error:message.error ,
            });
        }
        //get the user using the id
        const updated_User = await User.findByIdAndUpdate({_id:UserId},
            {
                image:uploadResponse.secure_url ,
            },
            {new:true} ,
        );

        return res.status(200).json({
            success:true,
            message:"Profile Picture Updated Successfully",
            User_Scheema:updated_User,
            updated_image:uploadResponse.secure_url,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error to Update Profile Picture",
            error:message.error ,
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        // Fetch the user ID from req
        const UserId = req.user.id;

        // Get the user
        let userDetails = await User.findById(UserId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${UserId}`,
            });
        }

        userDetails = userDetails.toObject();
        let SubsectionLength = 0;

        for (let i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;

            for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration),
                    0
                );

                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                );

                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: UserId,
            });

            courseProgressCount = courseProgressCount?.completedVidoes.length || 0;

            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            } else {
                // To make it up to 2 decimal points
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage =
                    Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) /
                    multiplier;
            }
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        console.log("Error to fetch Enrolled Courses:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.instructorDashboard = async (req, res) => {
    try {
        console.log("UserId in instructor Dashboard:",req.user.id) ;
        const InstrcutorID = req.user.id ;
      const courseDetails = await Course.find({ Instructor: InstrcutorID}) ;
        console.log("Course Details :",courseDetails) ;
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error);

      res.status(500).json({ 
        success:false,
        message: 
        error.message
     })
    }
  }
  