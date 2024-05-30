export async function GET(request: Request) {
  const { searchParams } = new Url(request.url);
  const id = searchParams.get('id');

  const res = await fetch(`${process.env.Url}/dashboard/getMonthlyUserCounts`, {
    cache: 'no-cache',  
    headers: {
          'Content-Type': 'application/json',
  
      },
  });

  const product = await res.json();
  console.log(product);

  return Response.json({ product });
}
