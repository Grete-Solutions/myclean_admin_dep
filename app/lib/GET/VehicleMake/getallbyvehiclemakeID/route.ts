
export async function GET(request: Request) {
  const url = new URL_BACKEND(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) {
    throw new Error('ID parameter is missing');
  }

  const res = await fetch(`${process.env.URL_BACKEND}/vehicleMake/getById/${id}`, {
    cache: 'no-cache',  
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const product = await res.json();

return Response.json({ product });
}
