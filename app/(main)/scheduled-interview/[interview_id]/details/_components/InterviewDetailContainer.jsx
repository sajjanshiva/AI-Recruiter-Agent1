import { CalendarDays, Clock, Puzzle,  } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className='p-5 bg-white rounded-lg mt-5'>
      <h2>{interviewDetail?.jobPosition}</h2>

      <div className='mt-4 flex items-center justify-between lg:pr-52'>
        <div>
            <h2 className='text-sm  text-gray-800'>Duration</h2>
            <h2 className='flex text-sm font-bold items-center mt-1 gap-3'><Clock className='h-4 w-4'/>{interviewDetail?.Duration}</h2>
        </div>

        <div>
            <h2 className='text-sm  text-gray-800'>reated On</h2>
            <h2 className='flex text-sm font-bold items-center mt-1 gap-2'><CalendarDays className='h-4 w-4'/>{moment(interviewDetail?.created_at).format('MMM DD YYYY')}</h2>
        </div>

        <div>
            <h2 className='text-sm  text-gray-800'>Type</h2>
            <h2 className='flex text-sm font-bold items-center mt-1 gap-3'><Puzzle className='h-4 w-4'/>{interviewDetail?.type}</h2>
        </div>
      </div>

      <div className='mt-5'>
        <h2 className='font-bold'>Job Description</h2>
        <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
      </div>

      <div className='mt-5'>
      <h2 className='font-bold'>Interview Questions</h2>
      <div className='grid grid-cols-2 gap-5 mt-3'>
      {interviewDetail?.questionList?.interviewQuestions?.map((item, index) => (
      <h2 key={index} className='text-sm'>
        {index + 1}. {item?.question}
      </h2>
      ))}
      </div>

      </div>
    </div>
  )
}

export default InterviewDetailContainer
