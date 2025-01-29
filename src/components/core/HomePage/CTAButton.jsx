import React from 'react'
import { Link } from 'react-router-dom';

const CTAButton = ({children,active,tolink}) => {
  return (
    <Link to={tolink}>
        <div className={`text-center text-[16px] rounded-md  leading-3 
         ${active?"bg-yellow-50 text-richblack-900":"text-richblack-5 bg-richblack-800"}
           px-8 py-3 
           tarnsition-all duration-200 hover:scale-95 shadow-inner boxShadow`}>
            <div>
                {children}
            </div>
        </div>
    </Link>
  )
}
export default CTAButton ;