export async function GET(request: Request) {
  const { searchParams } = new URL_BACKEND(request.url);
  const id = searchParams.get('id');

  const res = await fetch(`${process.env.URL_BACKEND}/booking/getByStatus/completed`, {
    cache: 'no-cache',  
    headers: {
          'Content-Type': 'application/json',
  
      },
  });

  const product = await res.json();

  return Response.json({ product });
}
