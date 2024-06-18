'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

const Custom404: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-w-screen min-h-screen flex items-center p-5 lg:p-20 overflow-hidden relative">
      <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
          <div className="mb-10 lg:mb-20">
           
          </div>
          <h1 className="font-black uppercase text-3xl lg:text-5xl text-gray-700 mb-10">Sorry, this page isn&apos;t available</h1>
          <p className="text-lg text-gray-700 mb-10">
            You do not have permission to access this page. Contact your administrator.</p>
          <button
            onClick={handleGoBack}
            className="bg-blue-500 text-white rounded-full py-3 px-8 hover:bg-blue-600 focus:outline-none"
          >
            Go Back
          </button>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <div className="relative">
            <div className="absolute w-80 h-80 bg-gradient-to-b from-blue-200 to-blue-100 rounded-full top-0 right-0 -mr-40 mt-32 hidden md:block"></div>
            <img src="https://t4.ftcdn.net/jpg/01/35/75/99/360_F_135759975_8jLV7hjXaNd9OAXqQdUQ3dj0LgxXPHqO.jpg" className="w-full max-w-sm mx-auto md:max-w-full relative z-10" alt="Error Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
