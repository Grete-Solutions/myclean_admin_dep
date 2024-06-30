import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'h-screen justify-center w-full overflow-hidden'}>
        <div className="flex flex-col h-full w-full">
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  );
}
