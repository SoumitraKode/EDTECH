import React from 'react'
import { HiMiniUsers } from "react-icons/hi2";
import {fi} from "../../../App.css" ;

const CourseCard = ({course,currentCard}) => {
  return (
    <div>
        <div className={`${course.heading === currentCard ? "z-0 absolute w-[340px] h-[300px] bg-yellow-50 translate-x-[10px] translate-y-[10px]":
            ""
        }`}/>                  
        {/* Parent DIV */}
        <div className={`z-10 flex flex-col divide-y-2 divide-richblack-50   divide-dotted  w-[340px] h-[300px] justify-between
            ${currentCard === course.heading ? "bg-pure-greys-5 relative " :
                "bg-richblack-800 hover:bg-richblack-700 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
            }`}>
            <div className='flex flex-col gap-3 items-start '>
                {/* Top */}
                <h2 
                    className={`mt-6 ml-6 text-xl leading-7
                        ${currentCard === course.heading ? "text-richblack-800" :
                            "text-richblack-25"
                        }`}
                >{course.heading}</h2>
                <div
                    className={`text-base font-normal leading-6 ml-6 mr-6
                        ${currentCard === course.heading ? "text-richblack-500" :
                            "text-richblack-400"
                        }`}
                    >
                    {course.description}
                </div>
                <div className=''>
                    {/* Adjust */}
                </div>
            </div>
            <div className={`flex justify-between px-[24px] py-[16px] font-medium text-base leading-6
                ${ currentCard === course.heading ? "text-blue-500":
                    "text-richblack-300"
                }`}>
                {/* Bottom */}
                <div className='flex justify-center items-center gap-2'>
                    <HiMiniUsers/>
                    <p>{course.level}</p>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <i className="fi fi-sr-chart-tree"/>
                    <p>{course.lessionNumber} Lessons</p>
                </div>
            </div>
            
            
        </div>
        
        
        
        
    </div>
  )
}

export default CourseCard
