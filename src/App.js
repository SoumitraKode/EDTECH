import "./App.css";
import {Route,Routes} from "react-router-dom" ;
import Home from "./Pages/Home" ;
import NavBar from "./components/common/NavBar" ;
import Footer from "./components/common/Footer" ;
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import OpenRoute from "./components/core/Auth/OpenRoute"
import VerifyEmail from "./Pages/VerifyEmail";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar>

      </NavBar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="signup" element={<OpenRoute><Signup></Signup></OpenRoute>}></Route>
        <Route path="login" element={<OpenRoute><Login></Login></OpenRoute>}></Route>
        <Route path="verify-email" element={<OpenRoute><VerifyEmail></VerifyEmail></OpenRoute>}></Route>
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword></ForgotPassword></OpenRoute>}></Route>
        <Route path="update-password" element={<OpenRoute><UpdatePassword></UpdatePassword></OpenRoute>} ></Route>
        <Route path="update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>}/>  
        <Route path="about" element={<OpenRoute><About /></OpenRoute>}/>  
        <Route path="contact" element={<OpenRoute><Contact /></OpenRoute>}/>  
      </Routes>
      
      <Footer>
 
      </Footer>

    </div>
  );
}

export default App;
