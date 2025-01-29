import React, { useEffect } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import { useState } from 'react';
import HighlighText from './HighlighText';
import CourseCard from './CourseCard';

const tabsName = [
  'Free',
  'New to coding',
  'Most popular',
  'Skills paths',
  'Career paths',
];


const Explore = () => {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);



  const setMyCards = (value)=>{
    setCurrentTab(value);
    const result = HomePageExplore.filter((element)=> element.tag === value) ;
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
    console.log(`Current_Card id is : ${currentCard}`);
  }
  return (  
    <div>
      <div className='text-center'>
        <h2 className='text-4xl py-2'>Unlock the <HighlighText text={"Power of Code"} /></h2>
        <p className='text-sm py-1 pb-10 text-richblack-300'>Learn to Build Anything You Can Imagine</p>
      </div>
      <div className='flex gap-2 bg-richblack-800 rounded-full px-1 py-1 m-4 max-w-fit mx-auto'>
        {
          tabsName.map((ele,index)=>{
            return (
              <div
                className={`text-[16px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900
                hover:text-richblack-5 px-7 py-1
                ${currentTab === ele ? "bg-richblack-900 text-richblack-5 font-medium" :
                  "text-richblack-200"
                }`} key={index} onClick={()=>(setMyCards(ele))}>
                
                {ele}
              
              </div>
            )
          })
        }
      </div>
      
      <div className='flex gap-9 mx-auto relative'>
        {
          courses.map( (ele,index)=> {
            return (
              <div className='transition-all duration-200 translate-y-[40px]' onClick={()=>(setCurrentCard(ele.heading))}>
                <CourseCard course={ele} currentCard={currentCard} key={index} />
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Explore