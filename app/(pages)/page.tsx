import React, { useEffect } from 'react';
import Home from '../Dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '../lib/auth';

export default async function Page() {
  // const { data: session, status } =  useSession();
  const session = await getServerSession(authOptions)
  // useEffect(() => {
  //   console.log('Session status:', status);
  //   console.log('Session data:', session);

  //   if (status === 'unauthenticated') {
  //     router.replace('/login');
  //   }

  //   if (status === 'authenticated' && session?.user?.role !== 'authenticated') {
  //     router.replace('/login');
  //   }
  // }, [status, session, router]);

  if (!session?.user) {
    return <div>Loading...</div>;
  }

  if (session?.user) {
    return (
      <div>
        <Home />
      </div>
    );
  }

  return null;
}
