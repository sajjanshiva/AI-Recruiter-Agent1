'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Vapi from "@vapi-ai/web";
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';




function StartInterview() {
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
   // const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

   const vapi = new Vapi("a78cfb2a-8a41-405e-9d61-f29b97eac0f5");

    console.log(vapi);

    const [activeUser , setActiveUser] = useState(false);
    const [conversation, setConversation] = useState();
    const {interview_id}=useParams();
    const router=useRouter();
    const [loading, setLoading] = useState(false);
    const [callEnd, setCallEnd] = useState(false);

    useEffect(() => {
      if (interviewInfo?.interviewData?.questionList?.interviewQuestions?.length) {
        startCall();
      } else {
        console.warn("Waiting for valid interviewInfo to load...");
      }
    }, [interviewInfo]);

    const startCall = () => {
      try {
        if (!interviewInfo) {
          throw new Error("interviewInfo is not available.");
        }
    
        const questions = interviewInfo?.interviewData?.questionList?.interviewQuestions;
        if (!questions || !Array.isArray(questions)) {
          throw new Error("Invalid or missing question list in interviewInfo.");
        }
    
        let questionList = questions.map(q => q?.question).filter(Boolean).join(", ");
    
        const assistantOptions = {
          name: "AI Recruiter",
          firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
          transcriber: {
            provider: "deepgram",
            model: "nova-2",
            language: "en-US",
          },
          voice: {
            provider: "playht",
            voiceId: "jennifer",
          },
          model: {
            provider: "openai",
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: `
    You are an AI voice assistant conducting interviews.
    Your job is to ask candidates provided interview questions, assess their responses.
    Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
    "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview, Let’s get started with a few questions!"
    Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
    Questions: ${questionList}
    If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
    "Need a hint? Think about how React tracks component updates!"
    Provide brief, encouraging feedback after each answer. Example:
    "Nice! That’s a solid answer."
    "Hmm, not quite! Want to try again?"
    Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
    After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
    "That was great! You handled some tough questions well. Keep sharpening your skills!"
    End on a positive note:
    "Thanks for chatting! Hope to see you crushing projects soon!"
    Key Guidelines:
    ✅ Be friendly, engaging, and witty ✍️
    ✅ Keep responses short and natural, like a real conversation
    ✅ Adapt based on the candidate’s confidence level
    ✅ Ensure the interview remains focused on React
                `.trim(),
              },
            ],
          },
        };
    
        vapi.start(assistantOptions);
      } catch (error) {
        console.error("❌ Failed to start interview call:", error.message);
        console.error("📄 interviewInfo:", interviewInfo);
      }
    };
    
    
    const stopInterview = () => {
      vapi.stop();
      console.log("Call has stopped.");
      setCallEnd(true);
      GenerateFeedback();
    }

   

    // Various assistant messages can come back (like function calls, transcripts, etc)
    // vapi.on("message", (message) => {
    // console.log(message?.conversation);
     //setConversation(message?.conversation);
   // });

   useEffect(() => {
    const handleMessage = (message) => {
      if (message?.conversation) {
        const convoString = JSON.stringify(message?.conversation);
        setConversation(convoString);
    }
   };

    vapi.on("message", handleMessage);

    vapi.on("call-start", () => {
      console.log("Call has started.");
      toast('Call Connected...');
    });
    

    vapi.on("speech-start", () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    });
    
    vapi.on("speech-end", () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    });
    
    vapi.on("call-end", () => {
      console.log("Call has ended.");
      toast('Interview Ended...please wait...');
    });

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", () => console.log("END"));
      vapi.off("speech-start", () => console.log("END")); 
      vapi.off("speech-end", () => console.log("END"));
      vapi.off("call-end", () => console.log("END"));

      



    };
  }, []);



    const GenerateFeedback = async() => {
      try {
        setLoading(true);

      console.log("Conversation:", conversation);

      if(!conversation) {
        return;
      }

        const result = await axios.post('/api/ai-feedback', {
          conversation: conversation
        });
        
        // Get the content from the API response
        const content = result?.data?.content;
        
        // Clean up the content by removing markdown code blocks
        const cleanContent = content.replace('```json', '').replace('```', '').trim();
        
        // Parse the JSON string into an object
        const parsedContent = JSON.parse(cleanContent);
        
        console.log("Parsed feedback:", parsedContent);
        
        // Now use parsedContent directly in your Supabase insert
        const { data, error } = await supabase
          .from('interview-feedback')
          .insert([
            { 
              userName: interviewInfo?.userName, 
              userEmail: interviewInfo?.userEmail,
              interview_id: interview_id,
              feedback: parsedContent,  // Use parsedContent instead of JSON.parse(FINAL_CONTENT)
              recommended: false
            },
          ])
          .select();
          
        if (error) {
          console.error("Supabase error:", error);
          toast.error("Failed to save feedback");
        } else {
          console.log("Saved data:", data);
          router.push('/interview/'+interview_id+'/completed');
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to process feedback");
      } finally {
        setLoading(false);
      }
    };
    


  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Sesstion

        <span className='flex items-center gap-2'>
          {/* <Timer /> 
            <Timer />
            00:00:00
          */}
        </span>

      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>

       <div className='bg-white h-[400px]  rounded-lg border flex flex-col gap-3 items-center justify-center'>
        <div className='relative'>
       { !activeUser  && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' /> }
        <Image src={'/ai.png'} alt='logo' width ={100} height={100}
       className='w-[70px] h-[70px] rounded-full object-cover'  />

        </div>
       <h2>AI Recruiter</h2>

       </div>

       <div className='bg-white h-[400px]  rounded-lg border flex  flex-col gap-3  items-center justify-center'>

         <div className='relative'>
         { activeUser  && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' /> }
        <h2 className='w-16 h-16 flex items-center justify-center pb-1.5 text-4xl bg-blue-500 text-white rounded-full'>
          {interviewInfo?.userName[0]}</h2>
          </div>

          <h2>{interviewInfo?.userName}</h2>

       </div>
       </div>

       <div className='justify-center flex gap-5 mt-5'>
      <Mic className='w-12 h-12 p-3 bg-gray-500 cursor-pointer text-white rounded-full' />

       {!loading ? (
        <Phone
       className='w-12 h-12 p-3 bg-red-500 cursor-pointer text-white rounded-full'
        onClick={() => stopInterview()}
       />
      ) : (
        <Loader2Icon className='animate-spin' />
    )}
    </div>

      <h2 className='text-sm text-gray-500 mt-5 text-center'>Interview in Progress...</h2>

    </div>
  )
}

export default StartInterview
