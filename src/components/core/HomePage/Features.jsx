import React from 'react'
import HighlighText from './HighlighText'
import KnowYourProgress from "../../../assets/Images/Know_your_progress.png"
import CompareWithOthers from "../../../assets/Images/Compare_with_others.png" ;
import PlanYourLessons from "../../../assets/Images/Plan_your_lessons.png" ;
import CTAButton from './CTAButton';
const Features = () => {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <h2 className='font-bold leading-10 text-4xl my-5'>Your swiss knife for <HighlighText text={"learning any language"}/></h2>
        <div className='font-medium leading-6 text-base text-center'>
          <p>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,</p>
          <p>progress tracking, custom schedule and more.</p>
        </div>

        <div className='flex translate-x-[40px] py-10'>

          <div className='translate-x-[120px]'><img src={KnowYourProgress} alt="KnowYourProgress" /></div>
          <div className='z-10'><img src={CompareWithOthers} alt="KnowYourProgress" /></div>
          <div className='translate-x-[-140px]'><img src={PlanYourLessons} alt="KnowYourProgress" /></div>
     
        </div>
        <div>
          <CTAButton children={"Learn more"} active={true} tolink={"/signup"} />
        </div>
      </div>
    </div>
  )
}

export default Features
