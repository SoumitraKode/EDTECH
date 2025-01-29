import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';


const VerifyEmail = () => {
  const {loading,signupData} = useSelector((state)=>state.auth) ;
  const [otp,setOtp] = useState("") ;
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  const submitHandeler = (e)=>{
    e.preventDefault() ;
    const{
      accountType,
      FirstName,
      LastName,
      email,
      password,
      confirmPassword,
    } = signupData ;
    
    dispatch(signUp(
      accountType,
      FirstName,
      LastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate
    )) ;
  }
  useEffect(()=>{
    if(!signupData){
      navigate("/signup") ;
    }
  })
  return (

    <div className='text-white'>
      {
        loading ? "Loading . . . " :
        (<div>
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={submitHandeler}>
            <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props}/>} 
            className='text-richblack-800'
            />
            <button type='submit'>Verify Email</button>
          </form>
        </div>)
      }
    </div>
  )
}


export default VerifyEmail
