import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...requestBody } = data;

    if (!id) {
      console.error('ID parameter is missing');
      return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
    }

    console.log(`Received request to update promo code data for ID ${id}`);

    const response = await fetch(`${process.env.URL_BACKEND}/coupons/updateCoupon/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Failed to update data:', text);
      return NextResponse.json({ message: `Failed to update data: ${text}` }, { status: response.status });
    }

    let updatedProduct;
    try {
      updatedProduct = JSON.parse(text);
    } catch (error) {
      console.error('Failed to parse response JSON:', text);
      return NextResponse.json({ message: 'Failed to parse response JSON' }, { status: 500 });
    }

    console.log(`Successfully updated promo code data for ID ${id}`);
    return NextResponse.json({ product: updatedProduct });
  } catch (error: any) {
    console.error('Error updating data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
