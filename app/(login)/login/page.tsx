'use client'
import React, { useState } from 'react'
import { LoginLogo } from './LoginLogo'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

type Props = {}

function Login({}: Props) {
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')

  const router= useRouter()


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  try {
    const response = await fetch('/lib/POST/postlogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email,password})
      
    });
    // Check if the response is not okay (status 2xx)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();   
     router.push(`login/OTP?email=${email}`,)

    console.log('Data received:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginLogo/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6">
              Email address
            </label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
  
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
              <div className="text-sm">
                <Link href="/" className="font-semibold text-[#08898D] hover:text-[#08898d9e]">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value) }
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#08898D] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#08898dab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08898d9d]"
            >
              Sign in
            </button>
          </div>
        </form>

      
      </div>
    </div>
  </>
  )
}

export default Login