const Course = require("../models/Course") ; 
const Category = require("../models/Category");
const User = require("../models/User");
const RatingAndReview = require("../models/RatingAndReview"); // Adjust path as needed
const Section = require("../models/Section")
const SubSection = require("../models/SubSection") ;
const CourseProgress = require("../models/CourseProgress");
const uploadImageToCloudinary = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration")


exports.createCourse = async (req,res)=>{
    try {
        //As you are cerating a Course So you have logged in =>Now we can access the payload As Pre middleware is executed
        //Fetch Data
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category,status,instructions} = req.body ;
        const thumbnail = req.files.thumbnailImage ; 

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category || !status || !instructions){
            return res.status(400).json({
                success:false,
                message:"All Fields are required",
            });
        }

        //check for instructor
        const userId = req.user.id ;
        const InstructorDetails = await User.findById(userId,
            {accountType:"Instructor",}
        ) ;
        // console.log("Istructor Details",InstructorDetails) ;

        if(!InstructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details Not Found",
            })
        }

        const CategoryDetails = await Category.findById(category);
        if(!CategoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Deatils Not Found",
            });
        }

        //upload To Cloudinary
        const thumbnail_res = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME) ;
        //create entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            Instructor:InstructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category:CategoryDetails._id,
            thumbNail:thumbnail_res.secure_url ,
            tag:tag,
            status:status,
            instructions:instructions,
        });
        //add new course to the user scheema of instructor
        await User.findByIdAndUpdate(
            {_id:InstructorDetails._id},
            {
                $push:{
                    courses:newCourse._id ,
                }
            },
            {new:true},
        
        )

        // Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newCourse,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Create Course",
            error:error.message ,
        });
    }
}

exports.showAllCourses = async(req,res)=>{
    try {
        const AllCourses = await Course.find({},{
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,
        }) 
        .populate("Instructor")
        .exec();

        return res.status(200).json({
             success:true,
             message:"Data for all courses Fetched SuccessFully",
             data:AllCourses,
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Cannot Fetch Course Data",
            error:error.message,    
        })
    }
}

//Get  course details
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "Instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbNail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "Instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  // Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
     let userDetails = await User.findById(instructorId)
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
                message: `Could not find user with id: ${instructorId}`,
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

        }

  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }
  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "Instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVidoes?.length > 0
            ? courseProgressCount?.completedVidoes
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }