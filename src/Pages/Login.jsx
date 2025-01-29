import React from 'react'
import LoginImg from "../assets/Images/login.webp"
import Template from "../components/core/LoginSignup/Template" 

export default function Login() {
    const title = "Welcome Back" ;
    const desc = "Build skills for today, tomorrow, and beyond."
    
    return (
    <div>
      <Template title={title} desc={desc}  img={LoginImg} formtype={"login"}>
        
      </Template>
    </div>
  )
}
