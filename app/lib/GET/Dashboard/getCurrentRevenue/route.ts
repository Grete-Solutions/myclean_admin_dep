export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const res = await fetch(`${process.env.URLB}/dashboard/getCurrentRev`, {
    cache: 'no-cache',  
    headers: {
          'Content-Type': 'application/json',
  
      },
  });

  const product = await res.json();

  return Response.json({ product });
}
