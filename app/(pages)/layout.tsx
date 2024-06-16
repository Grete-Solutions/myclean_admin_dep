import { Karla } from 'next/font/google';
import './globals.css';
import { SideBar } from '@/components/sidebar';
import Header from '@/components/header';
import PageWrapper from '@/components/pagewrapper';
import { ThemeProvider } from '@/components/theme-provider';
import { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import Provider from '../context/Provider';
import React from 'react';

const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin'],
  variable: "--font-karla"
});

export const metadata: Metadata = {
  title: "Clean App Admin dashboard",
  description: "admindashboard",
  icons: {
    icon: '/g1.png',
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        themes={['dark', 'custom', 'light']}
        defaultTheme='light'
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        <Provider>
          <body className={`${karla.className} h-screen overflow-hidden`}>
            <SideBar />
            <div className="flex flex-col h-full w-full">
              <Header />
              <Toaster />
              <PageWrapper>{children}</PageWrapper>
            </div>
          </body>
        </Provider>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
