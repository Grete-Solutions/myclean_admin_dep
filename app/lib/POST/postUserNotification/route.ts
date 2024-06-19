// POST.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // users
  if (req.method === 'POST') {
    try {
      const { title, message, email,  } = await req.json();
      console.log(title, message, email,)
      const response = await fetch(`${process.env.URLB}/notification/sendNotificationToUsers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          email,
        }),
      });

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error:any) {
      console.error('Error:', error);
      // Log additional error details
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
      return NextResponse.json({ message: 'Error sending notification' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}
