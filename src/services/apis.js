// require("dotenv").config() ;
const BASE_URL = process.env.REACT_APP_BASE_URL

export const categoryEndpoints = {
    CREATE_CATEGORY_API : BASE_URL + "/course/createCategory",
    SHOW_ALLCATEGORIES_API : BASE_URL + "/course/showAllCategories",
    GET_CATEGORYPAGEDETAILS_API : BASE_URL + "/course/getCategoryPageDetails",
}

export const userEndpoints = {
    SIGN_UP_API : BASE_URL + "/auth/signup",
    SIGN_IN_API : BASE_URL + "/auth/login",
    SEND_OTP_API : BASE_URL + "/auth/sendotp",
    CHANGE_PASS_API : BASE_URL + "/auth/changepassword",
    RESET_PASS_TKN_API : BASE_URL + "/auth/reset-password-token",
    RESET_PASS_API : BASE_URL + "/auth/reset-password",
}

export const profileEndpoints = {
    DEL_ACC_API : BASE_URL + "/profile/deleteAccount",
    UPDATE_PROF_API : BASE_URL + "/profile/updateProfile",
    GET_ALL_USER_DETAILS_API : BASE_URL + "/profile/getAllUserDetails",
    UPDATE_PROFPIC_API : BASE_URL + "/profile/updateProfilePicture",
    GET_ENROLEED_COURSE_API : BASE_URL + "/profile/enrolledCourses",
}

export const courseEndpoints = {
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    ADD_SECTION_API : BASE_URL + "/course/addSection",
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
    DEL_SECTION_API : BASE_URL + "/course/deleteSection",
    UPDATE_SUBSEC_API : BASE_URL + "/course/updateSubSection",
    DEL_SUBSEC_API : BASE_URL + "/course/deleteSubSection",
    ADD_SUBSEC_API : BASE_URL + "/course/addSubSection",
    GET_ALL_COURSES_API : BASE_URL + "/course/getAllCourses",
    GET_COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",
}

export const ratingandreviewEndpoints = {
    CREATE_RATING_API : BASE_URL + "/course/createRating",
    GET_AVG_RATING_API : BASE_URL + "/course/getAverageRating",
    GET_REVIEW_API : BASE_URL + "/course/createRating",
}