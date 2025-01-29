import React from 'react'
import InstructorImage from "../../../assets/Images/Instructor.png" ;
import HighlighText from './HighlighText';
import CTAButton from './CTAButton';
import { GoArrowRight } from 'react-icons/go';

const InstructorSection = () => {
  return (
    <div className='flex  items-center my-16'>
      <div className='realtive w-[50%]'>
        <div className='z-10 pl-36'>
            <img src={InstructorImage} alt="InstructorImage" />
        </div>
      </div>
      <div className='flex flex-col gap-3 justify-start w-[50%] p-28  '>
        <div className='text-4xl'>
            <h2 className='text-richblack-5' >Become an</h2>
            <HighlighText text={"instructor"}/>    
        </div>

        <div>
            <p className='text-richblack-300 text-base'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        </div>    

        <div className='py-16 w-[50%]'>
            <CTAButton link={"/signup"} active={true}>
                <div className='flex justify-center items-center'>
                    Start Teaching Today  <GoArrowRight />
                </div>
            </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
