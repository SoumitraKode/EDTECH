import React, { useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
import {AiFillEyeInvisible,AiFillEye } from "react-icons/ai"


const UpdatePassword = () => {
    const dispatch = useDispatch() ;
    const [showpassword,setShowPassword] = useState(false) ;
    const [showconfirmpassword,setShowConfirmPassword] = useState(false)  ;
    const navigate = useNavigate() ;
    const{loading} = useSelector((state)=>state.auth) ;
    const location = useLocation() ;
    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    }) ;

    const {password,confirmPassword} = formData ;

    const handelOnChange = (e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name] : e.target.value ,
        })) ;
    }

    const onSubmitHandeler = (e)=>{
        e.preventDefault() ;
        const token = location.pathname.split('/').at(-1) ;
        console.log("token : ",token) ;
        dispatch(resetPassword(password,confirmPassword,token,navigate)) ;
    }
return (

    
    <div className='text-white'>
      {
        !loading && <div>
            <h1>Choose New Password</h1>
      <p>Almost done. Enter your new password and youre all set.</p>

      <form onSubmit={onSubmitHandeler}>
        <label >
            <p>New Password*</p>
            <input type={
                !showpassword ? "password" : "text"
            } 
            name='password'
            value={password}
            onChange={handelOnChange}
            placeholder='Password'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span onClick={()=>(setShowPassword(!showpassword))}>
                {
                    showpassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                }
            </span>
        </label>

        <label >
            <p>Confirm Password*</p>
            <input type={
                !showconfirmpassword ? "password" : "text"
            } 
            name='confirmPassword'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={handelOnChange}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span onClick={()=>(setShowConfirmPassword(!showconfirmpassword))}>
                {
                    showconfirmpassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                }
            </span>
        </label>
        <button type='submit'>Reset Password</button>
      </form>
        </div> 
      }
    </div>
  )
}

export default UpdatePassword
