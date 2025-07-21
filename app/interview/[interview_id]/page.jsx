"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'

import { InterviewDataContext } from '@/context/InterviewDataContext'


function Interview() {
    const {interview_id}=useParams();
    console.log(interview_id);
    const [interviewData,setInterviewData]=useState();
    const [userName,setUserName]=useState();
    const [userEmail,setUserEmail]=useState();
    const [loading,setLoading]=useState(false);
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const router=useRouter();
    

   useEffect(() => {
    interview_id && GetInterviewDetails();
   }, [interview_id]);

    const GetInterviewDetails=async()=>{
      setLoading(true);
      try {
      let { data: interviews, error } = await supabase
      .from('interviews')
       .select("jobPosition, jobDescription, Duration, type")
       .eq('interview_id', interview_id);
       setInterviewData(interviews[0]);
       setLoading(false);

       if(interviews?.length == 0){
        toast('Incorrect Interview Link');
        return;
       }

      }catch(e){
        setLoading(false);
        toast('Incorrect Interview Link');
      }
       
}

const onJoinInterview=async()=>{
  setLoading(true);
  let { data: interviews, error } = await supabase
  .from('interviews')
  .select('*')
  .eq('interview_id', interview_id);
  console.log(interviews[0]);

  setInterviewInfo({
    userName: userName,
    userEmail: userEmail,
    interviewData:interviews[0]
  });
  router.push('/interview/'+interview_id+'/start');
  setLoading(false);
}

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16  '>
     <div className='flex flex-col items-center justify-center border rounded-lg p-7 bg-white
     lg:px-33 xl:px-52 mb-20
     '>
        <Image src={'/logo3.png'} alt='logo' width ={100} height={100}
              className='w-[130px] ' />
    
      <h2 className='mt-3 text-xl'>AI-Powered Interview Platform</h2>

      <Image src={'/login.png'} alt='login' width={500} height={500} 
      className='w-[380px] h-[280px] my-3'
      />

      <h2 className='font-bold text-2xl'>{interviewData?.jobPosition}</h2>
      <h2 className='flex items-center gap-2 text-gray-500 mt-3'><Clock  className='w-4 h-4'/> {interviewData?.Duration}</h2>

      <div className='w-full mt-5'>
        <h2>Enter your full name</h2>
        <Input placeholder='e.g. John Doe'  onChange={(e)=>setUserName(e.target.value)}/>
      </div>

      <div className='w-full mt-5'>
        <h2>Enter your Email</h2>
        <Input placeholder='e.g. jhon@gmail.com'  onChange={(e)=>setUserEmail(e.target.value)}/>
      </div>


     <div className="p-4 bg-blue-100 rounded-2xl mt-7 space-y-4">
          <div className="flex items-center gap-2">
             <Info className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold text-primary">Before You Begin</h2>
         </div>
        <ul className="list-disc list-inside pl-2 space-y-1">
                <li className="text-sm text-primary">Test your camera and microphone</li>
                 <li className="text-sm text-primary">Ensure you have a stable internet connection</li>
                <li className="text-sm text-primary">Find a quiet place for the interview</li>
        </ul>
    </div>

      <Button className={'mt-5 w-full font-bold' } 
      disabled={loading || !userName}
      onClick={()=>onJoinInterview()}
      ><Video />  {loading&&<Loader2Icon/>} Join Interview </Button>
     </div>
    </div>
  )
}

export default Interview
