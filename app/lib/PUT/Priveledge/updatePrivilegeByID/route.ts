export async function PATCH(request: Request) {
    try {
      const data = await request.json();
      const { id, status, key } = data;
  
      if (!id || !key || status === undefined) {
        console.error('ID, key, or status parameter is missing');
        return new Response('ID, key, or status parameter is missing', { status: 400 });
      }
  
      console.log(`Received request to update ${key} for ID ${id} to ${status}`);
  
      console.log(`Sending request to ${process.env.URLB}/privileges/updatePriv/${id}`);
      
      const res = await fetch(`${process.env.URLB}/privileges/updatePriv/${id}`, { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key,id,status }), 
      });
  
      console.log(`Request sent. Awaiting response...`);
      
      const text = await res.text();
      console.log(`Response received: ${text}`);
  
      if (!res.ok) {
        console.error(`Failed to update data with status ${res.status}: ${text}`);
        return new Response(`Failed to update data: ${text}`, { status: res.status });
      }
  
      let updatedProduct;
      try {
        updatedProduct = JSON.parse(text);
      } catch (error) {
        console.error('Failed to parse response JSON:', text);
        return new Response('Failed to parse response JSON', { status: 500 });
      }
  
      console.log(`Result: ${updatedProduct}`);
      return new Response(JSON.stringify({ product: updatedProduct }), {
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
  