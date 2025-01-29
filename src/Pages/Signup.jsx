import React from 'react'
import SignupImg from "../assets/Images/signup.webp"
import Template from "../components/core/LoginSignup/Template"

const Signup = () => {
    const title = "Join the millions learning to code with StudyNotion for free" ;
    const desc = "Build skills for today, tomorrow, and beyond."
    
    return (
    <div>
      <Template title={title} desc={desc} img={SignupImg} formtype={"signup"}>
        
      </Template>
    
    </div>
  )
}
export default Signup;
