export async function PATCH(request: Request) {
    try {
      const data = await request.json();
      const { id, value, privilege } = data;
  
      // if ( !value ) {
      //   console.error('ID, privilege, or value parameter is missing');
      //   return new Response('ID, privilege, or value parameter is missing', { status: 400 });
      // }
  
      // Ensure that the value value is either 0 or 1
      if (value !== 0 && value !== 1) {
        console.error(`Invalid value value. Must be either 0 or 1: ${value}`);
        return new Response('Invalid value value. Must be either 0 or 1', { status: 400 });
      }
  
  
      console.log(`Sending request to ${process.env.URLB}/privileges/updateOnePriv/${id}`);
      
      const res = await fetch(`${process.env.URLB}/privileges/updateOnePriv/${id}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ privilege, value,id}),
      });
  
      
      const responseBody = await res.json();
  
      if (!res.ok) {
        console.error(`Failed to update data with status ${res.status}: ${JSON.stringify(responseBody)}`);
        return new Response(`Failed to update data: ${JSON.stringify(responseBody)}`, { status: res.status });
      }
  
      return new Response(JSON.stringify(responseBody), {
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
  