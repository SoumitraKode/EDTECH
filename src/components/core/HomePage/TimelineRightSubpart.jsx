import React from 'react'
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import TimelineImageFooterInfo from './TimelineImageFooterInfo';

const TimelineRightSubpart = () => {
  return (
    <div className='relative'>
      <div className='w-[750px] h-[545px] rounded-full absolute  translate-x-[-5%]
        blur-[50px] bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] '/>
      <div>
      <img src={TimeLineImage} alt='timelineimage' className='shadow-white object-cover h-fit' />
      </div>
      <div className='absolute w-[75%] translate-x-[15%] translate-y-[-50%] '><TimelineImageFooterInfo/></div>
    </div>
  )
}

export default TimelineRightSubpart
// -gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]