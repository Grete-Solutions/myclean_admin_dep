'use client'
import React, { useEffect } from 'react';
import Home from './Dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return      <div className="flex justify-center items-center h-64">
    <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  </div>;
  }
  if (!session?.user){
    router.replace('/login');
    return null; }
  if ( session?.user) {
    return (
      <div>
        <Home />
      </div>
    );
  }

  return null;
}
