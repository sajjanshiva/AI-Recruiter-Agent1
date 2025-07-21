import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({ candidate }) {

    const feedback = candidate?.feedback?.feedback
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Feedback Report</DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="mt-1">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="bg-primary w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-xl">
                  {candidate.userName?.charAt(0)}
                </div>

                {/* Name & Email */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{candidate?.userName}</h2>
                  <p className="text-sm text-gray-500">{candidate?.userEmail}</p>
                </div>
              </div>

              {/* Score */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary">
                { feedback?.rating?.technicalSkills + feedback?.rating?.communication + feedback?.rating?.problemSolving + feedback?.rating?.experience }/40
                </h2>
                <p className="text-sm text-gray-500">Overall Score</p>
              </div>
            </div>

            <div className='mt-5'>
              <h2 className='font-bold'>Skills Assesment</h2>

              <div className='mt-3 grid grid-cols-2 gap-8'>
                <div>
                  <h2 className='flex justify-between'>Technical Skills<span>{feedback?.rating?.technicalSkills}/10</span></h2>
                  <Progress value={feedback?.rating?.technicalSkills * 10} className="mt-1" />
                </div>

                <div>
                  <h2 className='flex justify-between'>Communication<span>{feedback?.rating?.communication}/10</span></h2>
                  <Progress value={feedback?.rating?.communication * 10} className="mt-1" />
                </div>

                <div>
                  <h2 className='flex justify-between'>Problem Solving<span>{feedback?.rating?.problemSolving}/10</span></h2>
                  <Progress value={feedback?.rating?.problemSolving * 10} className="mt-1" />
                </div>

                <div>
                  <h2 className='flex justify-between'>Experience<span>{feedback?.rating?.experience}/10</span></h2>
                  <Progress value={feedback?.rating?.experience * 10} className="mt-1" />
                </div>
              </div>

               <div className='mt-8 border-t pt-5'>
            <h2 className='text-lg font-semibold text-gray-800 mb-2'>Performance Summary</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
           {feedback?.summary}
            </p>

                 
            
<div className='mt-2 flex items-center gap-2'>
  <span className="text-gray-800 text-lg font-semibold">Recommendation: </span>
  <div className={`px-3 py-1 rounded-full font-medium ${feedback?.Recommendation === "NO" || "Not recommended for hire" ? " text-black" : " text-black"}`}>
    {feedback?.Recommendation}
  </div>
    </div>

    <div className=" mt-2">
        <p className='font-semibold text-lg text-gray-800'>Recommendation message: </p>
       <p className='text-gray-700 mt-2'>{feedback?.RecommendationMsg}</p>
     </div>

            </div>

             


            </div>

          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog
