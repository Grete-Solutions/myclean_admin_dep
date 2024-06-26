import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  if (req.method !== 'PATCH') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  try {
    const data = await req.json();
    const { id, countryISOCode, city, price } = data;

    if (!id) {
      console.error('ID parameter is missing');
      return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
    }


    const response = await fetch(`${process.env.URLB}/setPrice/updateCity/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ countryISOCode, city, price }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Failed to update data:', text);
      return NextResponse.json({ message: `Failed to update data: ${text}` }, { status: response.status });
    }

    const updatedProduct = await response.json();
    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error('Error updating data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
