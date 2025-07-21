'use client'
import { supabase } from '@/services/supabaseClient';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/app/provider';

function AllInterview() {
  
    const [interviewList , setInterViewList] = useState([]);
    const {user}=useUser();
    
    useEffect(() => {
      user && GetInterviewList();
    },[user]);

    const GetInterviewList =async()=>{
      let { data: interviews, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })
      

      console.log(interviews);
      setInterViewList(interviews);
      
    }


  return (
    <div className='my-5 '>
      <h2 className='font-bold text-2xl'>All previously Created interviews</h2>

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
        {interviewList.map((interview, index) => (
        <InterviewCard interview={interview} key={index} />
          ))}
      </div>
    }

    </div>
  )


}

export default AllInterview
