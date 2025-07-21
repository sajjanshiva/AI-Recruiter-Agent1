import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({ candidateList }) {
  return (
    <div className='p-5'>
        <h2 className='font-bold my-5'>Candidates({candidateList?.length})</h2>
      {candidateList?.map((candidate, index) => (
        <div key={index} className='p-5 flex gap-3 items-center justify-between bg-white rounded-lg'>

     <div>
        <h2 className='bg-primary w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-xl'>
         {candidate.userName[0]}
        </h2>

          <div className='flex items-center gap-5'>
            <h2 className='font-bold'>{candidate?.userName}</h2>
            <h2 className='text-sm text-gray-700'>completed On: {moment(candidate?.created_at).format('MMM DD YYYY')}</h2>
          </div>
          </div>

          <div className='flex gap-3 items-center'>
            <h2 className='text-green-500'></h2>
            <CandidateFeedbackDialog candidate={candidate} />
          </div>


        </div>
      ))}
    </div>
  )
}

export default CandidateList
