import React from 'react'

const Skills = ({SkillsImg,SkillsHeading,SkillsSubHeading,position}) => {
  return (
    <div className='flex flex-col items-start justify-start '>

      <div className='flex gap-6 px-[16px] py-[12px] items-center'>
          <div className=' bg-[#FFFFFF] gap-px rounded-full px-5 py-5 mx-5 my-5'><img src={`${SkillsImg}`} alt='Image'/></div>
          <div className='felx flex-col  items-center gap-0.5 px-[4px] py-[4px]'>
            <div className='font-bold leading-6 text-lg text-richblack-800'>{SkillsHeading}</div>
            <div className='text-sm font-normal leading-6 text-richblack-700'>{SkillsSubHeading}</div>
          </div>
      </div>
{/*       
      <div>
        <div className='h-10 border-l-2  translate-x-[26px] border-richblack-100 border-dotted'></div>
      </div> */}
      
    </div>
  )
}

export default Skills
