import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  if (req.method === 'PUT') {
    try {
      const id = await req.json();
      console.log(id);
      const response = await fetch(`${process.env.URL}/privileges/updatePriv/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });

      const data = await response.json();
      console.log(data);
      return NextResponse.json(data);
    } catch (error: any) {
      console.error('Error:', error);
      // Log additional error details
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
      return NextResponse.json({ message: 'Error updating Coupon' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}
