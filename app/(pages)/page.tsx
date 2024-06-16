'use client'
import React from 'react';
import Home from '../Dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  console.log(session)
  const router = useRouter()
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Home />
    </div>
  );
}
