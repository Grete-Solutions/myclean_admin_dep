export async function GET(request: Request) {

  try {
    const res = await fetch(`${process.env.URLB}/dashboard/getMonthlyRevenues`, {
      cache: 'no-cache',  
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is OK
    if (!res.ok) {
      // If the response is not OK, throw an error with the status text
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    // Attempt to parse the response as JSON
    const product = await res.json();

    return new Response(JSON.stringify({ product }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error:any) {
    // Catch any errors that occurred during the fetch or parsing
    console.error('Fetch error:', error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
