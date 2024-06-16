'use client'
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const session: Session | null = null;

  return (
    <SessionProvider session={session} baseUrl={process.env.NEXTAUTH_URL}>
      {children}
    </SessionProvider>
  );
}

