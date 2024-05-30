export async function GET(request: Request) {
    const { searchParams } = new Url(request.url)
    const id = searchParams.get('id')
    const res = await fetch(`${process.env.Url}/user/getSuspended`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const product = await res.json()
   
    return Response.json({ product })
  }