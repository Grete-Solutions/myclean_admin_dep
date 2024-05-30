import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  if (req.method === 'PUT') {
    try {
      const data = await req.json();
      const { id, ...formData } = data;

      if (!id) {
        console.error('ID parameter is missing');
        return NextResponse.json({ message: 'ID parameter is missing' }, { status: 400 });
      }

      console.log(`Received request to update vehicle data for ID ${id}`);

      const response = await fetch(`${process.env.URL_BACKEND}/vehicleMake/setVehicleById/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Failed to update data:', text);
        return NextResponse.json({ message: `Failed to update data: ${text}` }, { status: response.status });
      }

      const updatedProduct = await response.json();
      console.log(`Successfully updated vehicle data for ID ${id}`);
      return NextResponse.json({ product: updatedProduct });
    } catch (error) {
      console.error('Error updating data:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}
