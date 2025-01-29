import React from 'react'
import CTAButton from './CTAButton'
import HighlighText from './HighlighText'
import { TypeAnimation } from 'react-type-animation';
import { VscWhitespace } from 'react-icons/vsc';
import { GoArrowRight } from "react-icons/go";

const CodeBlocks = ({position,heading,SubHeading,btn1,btn2,bgGradient,codeblock,codeColour}) => {
  return (
    <div className={`flex ${position} my-20 justify-center `}>
      {/* Section One */}
      <div className='flex flex-col ml-10  gap-8 w-[50%]'>
        <div>{heading}</div>
        <div className='text-richblack-300 text-bold'>{SubHeading}</div>
        <div className='flex flex-row  gap-7 mt-7'>
        <CTAButton active={btn1.active} tolink={btn1.tolink}>
          <div className='flex gap-1 items-center'>{btn1.children}<GoArrowRight /></div>
          </CTAButton>
          <CTAButton active={btn2.active} tolink={btn2.tolink}>{btn2.children}</CTAButton>
        </div>
      </div>

      {/* Section Two */}
      <div className='relative border-1 border-white'>
        <div className=' flex flex-row w-[100%] mx-auto text-[10px] py-4 lg:w-[500px] '>
          <div className='w-[10%] flex flex-col  text-richblack-400 font-bold items-center font-inter'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>
          <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColour} pr-2 h-64 w-full`}>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              codeblock,2000,""
            ]}
            cursor={true}
            repeat={Infinity}
            style={
              {
                whiteSpace:"pre-line",
                display:"block"
              }
            }
            omitDeletionAnimation={true}
          />
          </div>

        </div>
        <div className={`w-[50%] bg-${bgGradient} blur-[115px] h-[50%] z-10 absolute translate-y-[-200%] translate-x-[-10%]`} ></div>
      </div>
        
    </div> 
  )
}

export default CodeBlocks
