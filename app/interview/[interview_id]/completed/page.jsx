import React from "react";
import { CheckCircle, Send } from "lucide-react";

function InterviewCompleted() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10 text-center">
      {/* Logo & Title */}
      <div className="flex items-center space-x-2 mb-6">
        
        
      </div>

      {/* Confirmation Message */}
      <div className="flex flex-col items-center mb-6">
        <CheckCircle className="text-green-500 w-16 h-16 mb-3" />
        <h2 className="text-3xl font-bold text-gray-900">Interview Complete!</h2>
        <p className="text-gray-600 mt-2 max-w-md">
          Thank you for participating in the AI-driven interview with Alcruiter.
        </p>
      </div>

      {/* Illustration */}
      <div className="w-full max-w-xl shadow-lg rounded-2xl overflow-hidden mb-10">
        <img
          src="/end.png"
          alt="Interview Illustration"
          className="w-full h-auto rounded-xl"
        />
      </div>

      {/* What's Next Section */}
      <div className="w-full max-w-xl p-6 mt-4 shadow-md rounded-2xl bg-gray-50 flex flex-col items-center">
        <Send className="text-blue-600 w-8 h-8 mb-3" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">What's Next?</h3>
        <p className="text-gray-600 text-sm max-w-md">
          The recruiter will review your interview responses and get in touch
          with you regarding the next steps. Stay tuned!
        </p>
      </div>
    </div>
  );
}

export default InterviewCompleted;
