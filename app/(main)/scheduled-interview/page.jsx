'use client'
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ScheduledInterview() {

    const {user} = useUser();
    const [interviewList, setInterviewList] = useState();

    useEffect(() => {
        user && GetInterviewList();
      },[user]);

    const GetInterviewList=async()=>{
        const result = await supabase
        .from('interviews')
        .select('jobPosition,Duration,interview_id,interview-feedback(userEmail)')
        .eq('userEmail', user?.email)
        .order('id', { ascending: false });

        console.log(result);
        setInterviewList(result.data);
    }

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl '>Interview List with Candidate Feedback</h2>
        
      {interviewList?.length == 0 && 
    <div className='p-5 flex flex-col items-center gap-3 mt-5' >
       <Video className='h-10 w-10 text-primary'/>
       <h2>You dont have any interviews created!</h2>

       <Link href={'/dashboard/all-interview'}>
       <Button>+ Create New Interview</Button>
       </Link>
    </div>
    } 

    {interviewList&&
      <div className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5'>
        {interviewList?.map((interview, index) => (
        <InterviewCard interview={interview} key={index} 
        viewDetail={true}
        />
          ))}
      </div>
    }

    </div>
  )
}

export default ScheduledInterview
