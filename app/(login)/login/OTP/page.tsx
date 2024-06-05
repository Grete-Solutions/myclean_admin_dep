'use client';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import React, { useRef, useCallback, useState, useEffect } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  const [Otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const param = useSearchParams();
  const emailFromParams = param.get('email');
  
  useEffect(() => {
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [emailFromParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/lib/POST/postVerifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp: Otp.join('') })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data received:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = useCallback(
    (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (/^\d*$/.test(value)) {
        const newOtp = [...Otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value.length === 1 && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }
    },
    [Otp]
  );

  const handleKeyDown = useCallback(
    (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace' && Otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }
    },
    [Otp]
  );

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <Input value={email} className="hidden" type="text" readOnly />
                <div className="flex flex-row items-center justify-between mx-auto space-x-3 w-full">
                  {[0, 1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="w-full h-16">
                      <input
                        ref={(el) => {
                          if (el) {
                            inputRefs.current[index] = el;
                          }
                        }}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#0A8791]"
                        type="text"
                        maxLength={1}
                        value={Otp[index]}
                        onChange={(event) => handleInputChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#0A8791] border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <a
                      className="flex flex-row items-center text-[#0A8791]"
                      href="#"
                      onClick={() => { /* handle resend code logic here */ }}
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
