import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        password,
        email,
        role,
        address,
        country,
        state,
        postalCode,
        phone,
        city
      } = await req.json();
      const response = await fetch(`${process.env.URLB}/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,
          password,
          email,
          role,
          address,
          country,
          state,
          postalCode,
          phone,
        city}),
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
  return NextResponse.json({ message: 'Error creating Code' }, { status: 500 });
}
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}