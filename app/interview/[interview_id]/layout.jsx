'use client'
import React, { useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function Interviewlayout({children}) {

  const [interviewInfo, setInterviewInfo] = useState();
  return (

    <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}} >
    <div className='bg-white '>
         <InterviewHeader />
      {children}
    </div>
    </InterviewDataContext.Provider >
  )
}

export default Interviewlayout
