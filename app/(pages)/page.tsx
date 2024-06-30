'use client'
import React, { useEffect } from 'react';
import Home from './Dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
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
