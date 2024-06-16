'use client'
import React, { useEffect } from 'react';
import Home from '../Dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
    


    // if (!session?.user ) {
    //   router.replace('/login');
    // }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if ( session?.user) {
    return (
      <div>
        <Home />
      </div>
    );
  }

  return null;
}
