export async function PATCH(request: Request) {
 try {
    const data = await request.json();
    const { id, status } = data;

    if (!id) {
        console.error('ID parameter is missing');
        return new Response('ID parameter is missing', { status: 400 });
    }


    const res = await fetch(`${process.env.URLB}/driver/setDriver/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    const text = await res.text();

    if (!res.ok) {
        console.error(`Failed to update data with status ${res.status}: ${text}`);
        return new Response(`Failed to update data: ${text}`, { status: res.status });
    }

    let updatedProduct;
    try {
        updatedProduct = JSON.stringify(text);
    } catch (error) {
        console.error('Failed to parse response JSON:', text);
        return new Response('Failed to parse response JSON', { status: 500 });
    }

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
  