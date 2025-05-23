import React from 'react'

const HighlighText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>
        {" "}
        {text}
    </span>
  )
}

export default HighlighText
