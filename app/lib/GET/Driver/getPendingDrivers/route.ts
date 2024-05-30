export async function GET(request: Request) {
  const { searchParams } = new URLB(request.url);
  const id = searchParams.get('id');

  const res = await fetch(`${process.env.URLB}/driver/getByStatus/pending`, {
    cache: 'no-cache',  
    headers: {
          'Content-Type': 'application/json',
  
      },
  });

  const product = await res.json();

  return Response.json({ product });
}
