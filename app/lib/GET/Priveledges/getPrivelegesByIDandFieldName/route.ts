export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
    const field_name  = url.searchParams.get('field_name');

  try {
    const res = await fetch(`${process.env.URLB}/privileges/getPrivConditions/${id}/${field_name}`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const product = await res.json();

    return new Response(JSON.stringify({ product }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
