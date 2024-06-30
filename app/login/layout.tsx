import { Karla } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"


const karla = Karla({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ['latin'],
  variable: "--font-karla"
})
export const metadata: Metadata = {
  title: "Clean App Admin dashboard",
  description: "admindashboard",
  icons:{
    icon:'/g1.png',
  }
}

;


export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={karla.className + ' h-screen justify-center w-full overflow-hidden'}>

          <>
            <div className="flex flex-col h-full w-full">
              <Toaster />
              {children}
            </div>
          </>
      </body>
    </html>
  )
}
