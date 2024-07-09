export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('id');
  if (!userId) {
    throw new Error('No user ID provided');
  }

  const res = await fetch(`${process.env.URLB}/booking/getBookingsByUserId/${userId}/bookings`, {
    cache: 'no-cache',  
    headers: {
          'Content-Type': 'application/json',
  
      },
  });

  const product = await res.json();

  return Response.json({ product });
}
