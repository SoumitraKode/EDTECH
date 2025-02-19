import "./App.css";
import {Route,Routes} from "react-router-dom" ;
import Home from "./Pages/Home" ;
import NavBar from "../src/components/common/NavBar" ;
import Footer from "../src/components/common/Footer";
import Signup from "../src/Pages/Signup";
import Login from "../src/Pages/Login";
import OpenRoute from "../src/components/core/Auth/OpenRoute"
import VerifyEmail from "../src/Pages/VerifyEmail";
import ForgotPassword from "../src/Pages/ForgotPassword";
import UpdatePassword from "../src/Pages/UpdatePassword";
import About from "../src/Pages/About";
import Contact from "../src/Pages/Contact";
import Dashboard from "../src/Pages/Dashboard";
import MyProfile from "../src/components/core/Dashboard/MyProfile";
import PrivateRoute from "../src/components/core/Auth/PrivateRoute" ;
import Settings from "../src/components/core/Dashboard/Settings";
import AddCourse from "../src/components/core/Dashboard/AddCourse/index";
import CourseDetails from "../src/Pages/CourseDetails";
import Catalog from "../src/Pages/Catalog";
import Instructor from "../src/components/core/Dashboard/Instructor";
import MyCourses from "../src/components/core/Dashboard/MyCourses";
// import AddCourse from "./components/core/Dashboard/AddCourse/index";
import ViewCourse from "../src/Pages/ViewCourse";
import VideoDetails from "../src/components/core/ViewCourse/VideoDetails";
import { useDispatch,useSelector} from "react-redux" 
import { useNavigate } from "react-router-dom"
import { ACCOUNT_TYPE } from "./utils/constants"
import EditCourse from "./components/core/Dashboard/EditCourse"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import Cart from "./components/core/Dashboard/Cart"
import Error from "../src/Pages/Error"

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar>

      </NavBar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="signup" element={<OpenRoute><Signup></Signup></OpenRoute>}></Route>
        <Route path="login" element={<OpenRoute><Login></Login></OpenRoute>}></Route>
        <Route path="verify-email" element={<OpenRoute><VerifyEmail></VerifyEmail></OpenRoute>}></Route>
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword></ForgotPassword></OpenRoute>}></Route>
        <Route path="update-password" element={<OpenRoute><UpdatePassword></UpdatePassword></OpenRoute>} ></Route>
        <Route path="update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>}/>  
        <Route path="about" element={<OpenRoute><About /></OpenRoute>}/>  
        <Route path="contact" element={<OpenRoute><Contact /></OpenRoute>}/>  
        {/* <Route path="dashboard/my-profile" element={<MyProfile/>}/> */}
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path="dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="dashboard/Settings" element={<Settings />} />
            <Route path="dashboard/add-course" element={<AddCourse/>} />

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          )}
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      
      </Routes>
      
      <Footer/>

    </div>
  );
}

export default App;
