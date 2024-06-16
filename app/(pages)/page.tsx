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

  useEffect(() => {
    if (status === 'authenticated' && session.user.role !== 'authenticated') {
      router.replace('/login');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated' && session.user.role === 'authenticated') {
    return (
      <div>
        <Home />
      </div>
    );
  }

  return null;
}
