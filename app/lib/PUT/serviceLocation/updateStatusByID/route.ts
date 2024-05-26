export async function PATCH(request: Request) {
  try {
      const data = await request.json();
      const { id, status } = data;

      if (!id) {
          console.error('ID parameter is missing');
          return new Response('ID parameter is missing', { status: 400 });
      }

      console.log(`Received request to update status for ID ${id} to ${status}`);

      const res = await fetch(`${process.env.URL}/setPrice/updateStatus/${id}`, {
        cache: 'reload',  
        method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
      });

      const text = await res.text();

      if (!res.ok) {
          console.error('Failed to update data:', text);
          return new Response(`Failed to update data: ${text}`, { status: res.status });
      }

 


      console.log(`Successfully updated status for ID ${id} to ${status}`);
      return new Response(JSON.stringify({ product: text }), {
          status: 200,
          headers: {
              'Content-Type': 'application/json',
          },
      });
  } catch (error) {
      console.error('Error updating data:', error);
      return new Response('Internal Server Error', { status: 500 });
  }
}
