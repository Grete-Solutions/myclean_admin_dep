export async function GET(request: Request) {
  try {

    const res = await fetch(`${process.env.URLB}/dashboard/getCurrentUsers`, {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      // Handle non-200 responses
      const errorText = await res.text();
      console.error('Error response from server:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to fetch data from server', details: errorText }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const product = await res.json();

    return new Response(JSON.stringify({ product }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error:any) {
    console.error('Error occurred while fetching data:', error);
    return new Response(JSON.stringify({ error: 'Unexpected error occurred', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
