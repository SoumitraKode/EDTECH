const mongoose = require("mongoose") ;

const CourseProgressScheema = new mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        completedVidoes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"SubSection",
            }
        ]
    }
);

// {
//     "courseId":"67b2cab7a82e359b842bcb3b",
//     "userId":"67af96fe5b875ae4574f3e3b",
//     "completedVidoes":[]

// }

module.exports = mongoose.model("CourseProgress",CourseProgressScheema) ;