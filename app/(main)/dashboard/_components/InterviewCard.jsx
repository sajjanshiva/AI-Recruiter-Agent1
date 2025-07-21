import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview, viewDetail=false }) {

    const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id

    const  copyLink=()=>{
          navigator.clipboard.writeText(url);
          toast('Copied to clipboard');
        }

        const onSend=()=>{
            window.location.href="mailto:accounts@bshivamani8496.com?subject=AIRecruiter Interview Link &body:"+url
        }

  return (
    <div className='p-5 bg-white rounded-lg border border-gray-200'>
      <div className='flex items-center justify-between'>
        <div className='h-[40px] w-[40px] bg-primary rounded-full'></div>
        <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM YYYY')}</h2>
      </div>

      <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
      <h2 className='text-sm mt-2 text-gray-700 flex justify-between'>{interview?.Duration}
        <span className='text-green-700 font-medium'>{interview['interview-feedback']?.length } Candidates</span>
      </h2>

      {/* Add spacing before buttons */}
    {!viewDetail ?  <div className="flex gap-3 w-full mt-4">
        <Button variant="outline" className="flex-1" onClick={copyLink}>
          <Copy className="mr-2 h-4 w-4"  /> Copy Link
        </Button>

        <Button className="flex-1" onClick={onSend}>
          <Send className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>
      :
      <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
      <Button className="mt-5 w-full " variant='outline' >View Details</Button>
      </Link>
    }
    </div>
  )
}

export default InterviewCard
