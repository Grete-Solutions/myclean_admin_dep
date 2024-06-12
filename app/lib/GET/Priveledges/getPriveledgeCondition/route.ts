export async function GET(request: Request) {
  const data = await request.json();
  const {id,field_name}= data

  const res = await fetch(`${process.env.URLB}/privileges/getPrivConditions/${id}/${field_name}`, {
    cache: 'no-cache',  
    headers: {
          'Content-Type': 'application/json',
  
      },
  });

  const product = await res.json();

  return Response.json({ product });
}
