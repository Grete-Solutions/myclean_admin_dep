'use client'
import React, { useEffect } from 'react';
import Home from '../Dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return (
      <div>
        <Home />
      </div>
    );
  }


}
