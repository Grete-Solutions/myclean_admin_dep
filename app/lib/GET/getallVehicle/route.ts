export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const res = await fetch(`${process.env.URL}/vehicleMake/getAll`, {
      headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
      },
  });

  const product = await res.json();
  console.log(product);

  return Response.json({ product });
}
