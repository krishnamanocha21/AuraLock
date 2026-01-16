import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  ArrowLeft } from 'lucide-react';
import { TbLockFilled } from "react-icons/tb";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1); 
  const goHome = () => navigate('/'); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-200 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center border border-gray-200">
        
        
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <TbLockFilled size={64} className="text-blue-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">403 Forbidden</h1>
        <p className="text-gray-500 mb-8">
          Stop right there! You do not have the necessary permissions to view this page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={goBack}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
          
          <button 
            onClick={goHome}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Return to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Unauthorized;