import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
 
    const {conversation}=await req.json();

    const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation));

    
        try {
            const openai = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env.OPENROUTER_API_KEY,
            });
    
            const completion = await openai.chat.completions.create({
                model: "openai/gpt-4o-mini",
                messages: [
                    { role: "user", content: FINAL_PROMPT }
                ],
                     //check wether this line needed to be added or not
            });
             
    
    
            // In your API route
            // console.log("API completion result:", completion.choices[0].message);
            // const responseToSend = completion.choices[0].message;
            // console.log("Sending back:", responseToSend);
            // return NextResponse.json(responseToSend);
    
            //console.log(completion.choices[0].message);
            //return NextResponse.json(completion.choices[0].message);
    
            if (completion && completion.choices && completion.choices.length > 0) {
               // console.log("API completion result:", completion.choices[0].message);
                const responseToSend = completion.choices[0].message;
               // console.log("Sending back:", responseToSend);       //need to remove later
                return NextResponse.json(responseToSend);
            } else {
                console.log("Incomplete API response:", completion);
                return NextResponse.json({ error: "Incomplete response from AI model" }, { status: 500 });
            }
               
            }catch (e) {
            console.log("Error occurred:", e);
            return NextResponse.json(e);
        }
}