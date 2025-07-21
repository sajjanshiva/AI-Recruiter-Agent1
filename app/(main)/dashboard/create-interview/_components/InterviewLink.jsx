import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, Copy, List, Mail, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewLink({ interview_id, formData}) {
    
    const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id
    const GetInterviewUrl=()=>{
        return url;
  }

  const onCopyLink=async()=>{
    await navigator.clipboard.writeText(url);
    toast('Copied to clipboard');

  }

  return (
    <div className='flex flex-col items-center justify-between mt-10'>
      <Image src={'/right.png'} alt='right '
      height={200}
      width={200}
      className='w-[50px] h-[50px]'
      />
      <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
      <p className='mt-3'>Share this link with the candidate to start the interview process</p>

      <div className='w-full p-7 mt-6 rounded-lg bg-white'>
       
       <div className='flex justify-between items-center'>
        <h2 className='font-bold'>Interview Link</h2>
        <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-lg'>Valid for 30 Days</h2>

       </div>

       <div className='mt-3'>
            <Input defaultValue={GetInterviewUrl()} disabled={true} />
            <Button className='mt-3' onClick={()=>onCopyLink()}> <Copy />  Copy Link</Button>
       </div>

       <hr className='my-5' />

       <div className='flex gap-7'>
        <h2 className='text-sm text-gray-500 flex gap-2 items-center'>30Mins<Clock className='w-4 h-4' />{formData?.Duration}</h2>
        <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='w-4 h-4' /> 10 Questions</h2>
        
       </div>

      </div>

      <div className='mt-7 bg-white p-5 rounded-lg w-full'>
        <h2 className='font-bold'>Share via</h2>
        <div className='flex justify-between'>
        <Button variant={'outline'} className=''><Mail /> Email </Button>
        <Button variant={'outline'} className=''><Mail /> Slack </Button>
        <Button variant={'outline'} className=''><Mail /> Whatsapp </Button>
         
        </div>
      </div>
   
      <div className='flex  w-full gap-5 justify-between mt-6'>
        <Link href={'/dashboard'}>
        <Button variant={'outline'}> <ArrowLeft /> Back to Dashboard</Button>
        </Link>

        <Link href={'/dashboard'}>
        <Button> <Plus /> Create New Interview</Button>
        </Link>

      </div>

    </div>
  )
}

export default InterviewLink
