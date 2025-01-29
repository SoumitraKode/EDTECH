import React from 'react'
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import frameImg from "../../../assets/Images/frame.png" ;

export default function Template({title,desc,img,formtype}) {
    
    return (
    <div className='w-10/12 mx-auto bg-richblack-900 flex flex-row justify-between m-[100px]'>
        {/* ------------------------------Left-Part----------------------------------- */}
        <div className='flex flex-col gap-2 p-[50px] '>
            <div className='text-3xl leading-[38px] text-richblack-5 font-semibold'>
                <h2>{title}</h2>
            </div>
            <div className='font-normal text-base leading-[26px] text-richblack-300'><p>{desc}<span className='text-base font-edu-sa text-blue-200 font-bold'>Education to future proof your career.</span></p></div>
            

            <div>
                {formtype === "login" ? <LoginForm/>: <SignupForm/> }
            </div>
        </div>
        {/* ------------------------------Right-Part---------------------------------- */}
        <div className='relative'>
            <img className='absolute z-10' src={img} alt="Image"/>
            
            <img className='translate-x-[15px] translate-y-[15px]' src={frameImg} alt="" />
        </div>
    </div>
  )
}
