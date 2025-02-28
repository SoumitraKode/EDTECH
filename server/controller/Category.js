const Category = require("../models/Category");
const Course = require("../models/Course") ;
const RatingAndReview = require("../models/RatingAndReview") ;
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
exports.createCategory = async (req,res)=>{
    try {
        const{name,description} = req.body ;

        if(!name){
            return res.status(500).json({
                success:false,
                message:"All Fields are Cumpolsory",
            });
        }

        const newCategory = await Category.create({
            name,description,
        });
        console.log(newCategory) ;
        return res.status(200).json(
            {
                success:true,
                message:"Category Created Successfully",
            }
        );  

    } catch (error) {
        console.log("Error in Creating Category") ;
        console.error(error) ;
        return res.status(500).json({
            success:false,
            message:error.message,

        })
    }
}

exports.getAllCategories = async (req,res)=>{
    try {
        const getAllCategories = await Category.find({},
            {name:true,description:true},
        );
        
        return res.status(200).json({
            success:true,
            message:"All Category Fetched Successfully",
            data:getAllCategories,
            
        })
    } catch (error) {
        console.log("Unable to Fetch all Category");
        console.error(error) ;

        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
        // Get categoryId from request body
        const { categoryId } = req.body;

        // Fetch the selected category and populate its courses
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                populate: [
                    { path: "ratingAndReviews" },  // Correctly populating ratingAndReviews
                    { path: "Instructor" }         // Correctly populating Instructor
                ]
            })
            .exec();

        console.log("SELECTED COURSE", selectedCategory);

        // Validation: Category not found
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        // Fetch all other categories excluding the selected one
        const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });

        // Select a random category for recommendation
        let differentCategory = await Category.findById(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]?._id
        )
            .populate({
                path: "courses",
                populate: [
                    { path: "ratingAndReviews" },
                    { path: "Instructor" }
                ],
                match: { status: "Published" }
            })
            .exec();

        console.log("Different Category : ", differentCategory);

        // Get top 10 selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: [
                    { path: "ratingAndReviews" },
                    { path: "Instructor" }
                ]
            })
            .exec();

        const allCourses = allCategories.flatMap(category => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);

        // Return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses
            },
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
