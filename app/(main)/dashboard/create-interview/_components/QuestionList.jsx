import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Questions from './Questions';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({formData, onCreateLink }) {
   
     const [loading, setLoading] = useState(true);
     const [questionList, setQuestionList] = useState();
     const {user}=useUser();
     const [saveLoading, setSaveLoading] = useState(false);

    useEffect(() => {
        if(formData){
            GenerateQuestionList();
        }
    },[formData])
    
    

    const GenerateQuestionList = async() => {
        setLoading(true);
        try {
            // Log the form data being sent
            console.log("Sending form data:", formData);
            
            const result = await axios.post('/api/ai-model', {
                ...formData
            });
            
            // Log the raw response to see its structure
            console.log("Raw API Response:", result);
            
            // Check if we have any data
            if (!result.data) {
                throw new Error('Empty response from server');
            }
            
            console.log("Response data type:", typeof result.data);
            console.log("Response data:", result.data);
            
            // Handle different response formats
            if (result.data.content) {
                // If the response has a content property
                const content = result.data.content;
                
                if (typeof content === 'string') {
                    // The content might be a JSON string or contain markdown
                    let jsonData;
                    
                    try {
                        // First try direct JSON parsing
                        jsonData = JSON.parse(content);
                    } catch(parseError) {
                        // If that fails, try removing markdown code blocks
                        try {
                            const cleanedContent = content
                                .replace(/```json|```/g, '')
                                .trim();
                            jsonData = JSON.parse(cleanedContent);
                        } catch (err) {
                            console.error("Failed to parse content after cleaning:", err);
                            throw new Error("Could not parse response content");
                        }
                    }
                    
                    setQuestionList(jsonData);
                } else if (typeof content === 'object') {
                    // If content is already an object
                    setQuestionList(content);
                }
            } else if (typeof result.data === 'string') {
                // The whole response might be a string
                try {
                    const jsonData = JSON.parse(result.data);
                    setQuestionList(jsonData);
                } catch (err) {
                    // Try cleaning the string first
                    try {
                        const cleaned = result.data
                            .replace(/```json|```/g, '')
                            .trim();
                        setQuestionList(JSON.parse(cleaned));
                    } catch (cleanErr) {
                        console.error("Failed to parse response as JSON:", cleanErr);
                        throw new Error("Invalid response format");
                    }
                }
            } else if (typeof result.data === 'object') {
                // The response is already an object
                setQuestionList(result.data);
            }
            
            setLoading(false);
        } catch(e) {
            console.error('Error generating questions:', e);
            toast('Server Error, Try Again!')
            setLoading(false);
        }
    }


    const onFinish = async() => {
        setSaveLoading(true);
        const interview_id=uuidv4();
        const { data, error } = await supabase
        .from('interviews')
        .insert([
          { 
            ...formData,
            questionList:questionList,
            userEmail: user?.email,
            interview_id:interview_id

           },
        ])
        .select()
         setSaveLoading(false);
        if (error) {
            console.error('Error inserting data:', error);
        } 

        onCreateLink(interview_id);
    }
  return (
    
    <div>
      {loading&& <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
        <Loader className='animate-spin' />
        <div>
            <h2 className='font-medium'>Generating Interview Questions</h2>
            <p className='text-primary'>Our AI is crafting personalized questions based in your job role </p>
        </div>
        </div>
      }
       { questionList?.interviewQuestions?.length > 0 && 
       <div>
        <Questions questionList={questionList} />
        </div>
      }

       <div className='flex justify-end mt-10'>
        <Button onClick={()=>onFinish()} disabled={saveLoading}>
            {saveLoading && <Loader2 className='animate-spin' />}
            create Interview Link and Finish</Button>
       </div>
      </div>
      
  )
}

export default QuestionList;