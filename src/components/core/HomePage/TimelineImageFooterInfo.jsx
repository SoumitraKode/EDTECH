import React from 'react'

const TimelineImageFooterInfo = () => {
    return (
        
            <div className='flex justify-evenly font-inter bg-caribbeangreen-700  
                divide-x-[2px] divide-caribbeangreen-500 divide-opacity-60 gap-5 h-[128px]
                '>

                <div className='flex w-[50%] justify-evenly items-center '>
                    <div className='text-white font-extrabold leading-[44px] text-4xl '>10</div>
                    <div className='uppercase text-caribbeangreen-300 text-sm font-semibold tracking-wider leading-4    '>
                        <p>Years</p>
                        <p> Experiences</p>
                    </div>
                </div>

                <div className='flex w-[50%] justify-evenly items-center'>
                    <div className='text-white font-extrabold leading-[44px] text-4xl'>250</div>
                    <div className='uppercase text-caribbeangreen-300 text-sm font-semibold tracking-wider leading-4'>
                        <p>Types of</p>
                        <p>Courses</p>
                    </div>
                </div>
            </div>
        

    )
}

export default TimelineImageFooterInfo
