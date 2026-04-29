'use client'
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Vapi from "@vapi-ai/web";
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

function StartInterview() {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const [activeUser, setActiveUser] = useState(false);
    const { interview_id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // useRef so GenerateFeedback always gets latest conversation value
    const conversationRef = useRef(null);

    useEffect(() => {
        if (interviewInfo?.interviewData?.questionList?.interviewQuestions?.length) {
            startCall();
        }
    }, [interviewInfo]);

    useEffect(() => {
        const handleMessage = (message) => {
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                conversationRef.current = convoString; // update ref directly
            }
        };

        vapi.on("message", handleMessage);
        vapi.on("call-start", () => toast('Call Connected...'));
        vapi.on("speech-start", () => setActiveUser(false));
        vapi.on("speech-end", () => setActiveUser(true));
        vapi.on("call-end", () => {
            toast('Interview Ended... please wait...');
            GenerateFeedback(); // trigger here, AFTER call actually ends
        });

        return () => {
            vapi.off("message", handleMessage);
        };
    }, []);

    const startCall = () => {
        try {
            const questions = interviewInfo?.interviewData?.questionList?.interviewQuestions;
            if (!questions || !Array.isArray(questions)) {
                throw new Error("Invalid or missing question list.");
            }

            const questionList = questions.map(q => q?.question).filter(Boolean).join(", ");

            const assistantOptions = {
                name: "AI Recruiter",
                firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
                transcriber: {
                    provider: "deepgram",
                    model: "nova-2",
                    language: "en-US",
                },
                voice: {
                    provider: "cartesia",
                    voiceId: "79a125e8-cd45-4c13-8a67-188112f4dd22",
                },
                model: {
                    provider: "openai",
                    model: "gpt-4",
                    messages: [
                        {
                            role: "system",
                            content: `
You are an AI voice assistant conducting interviews.
Ask one question at a time and wait for the candidate's response.
Questions: ${questionList}
Be friendly, engaging, and provide brief encouraging feedback after each answer.
After all questions, wrap up and thank the candidate.
                            `.trim(),
                        },
                    ],
                },
            };

            vapi.start(assistantOptions);
        } catch (error) {
            console.error("Failed to start call:", error.message);
        }
    };

    const stopInterview = () => {
        vapi.stop(); // this triggers call-end event, which calls GenerateFeedback
    };

    const GenerateFeedback = async () => {
        try {
            setLoading(true);
            const conversation = conversationRef.current;

            if (!conversation) {
                console.warn("No conversation data found.");
                setLoading(false);
                return;
            }

            const result = await axios.post('/api/ai-feedback', { conversation });
            const content = result?.data?.content;
            const cleanContent = content.replace('```json', '').replace('```', '').trim();
            const parsedContent = JSON.parse(cleanContent);

            const { data, error } = await supabase
                .from('interview-feedback')
                .insert([{
                    userName: interviewInfo?.userName,
                    userEmail: interviewInfo?.userEmail,
                    interview_id: interview_id,
                    feedback: parsedContent,
                    recommended: false
                }])
                .select();

            if (error) {
                console.error("Supabase error:", error);
                toast.error("Failed to save feedback");
            } else {
                console.log("Saved feedback:", data);
                router.push('/interview/' + interview_id + '/completed');
            }
        } catch (error) {
            console.error("Feedback error:", error);
            toast.error("Failed to process feedback");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-20 lg:px-48 xl:px-56'>
            <h2 className='font-bold text-xl'>AI Interview Session</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
                        <Image src={'/ai.png'} alt='AI' width={100} height={100}
                            className='w-[70px] h-[70px] rounded-full object-cover' />
                    </div>
                    <h2>AI Recruiter</h2>
                </div>

                <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
                        <h2 className='w-16 h-16 flex items-center justify-center pb-1.5 text-4xl bg-blue-500 text-white rounded-full'>
                            {interviewInfo?.userName[0]}
                        </h2>
                    </div>
                    <h2>{interviewInfo?.userName}</h2>
                </div>
            </div>

            <div className='justify-center flex gap-5 mt-5'>
                <Mic className='w-12 h-12 p-3 bg-gray-500 cursor-pointer text-white rounded-full' />
                {!loading ? (
                    <Phone
                        className='w-12 h-12 p-3 bg-red-500 cursor-pointer text-white rounded-full'
                        onClick={stopInterview}
                    />
                ) : (
                    <Loader2Icon className='animate-spin' />
                )}
            </div>

            <h2 className='text-sm text-gray-500 mt-5 text-center'>Interview in Progress...</h2>
        </div>
    );
}

export default StartInterview;