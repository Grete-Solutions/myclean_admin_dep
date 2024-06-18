export async function DELETE(request: Request) {
    try {
        const data = await request.json();
        const { id, onDelete } = data; 

        if (!id) {
            console.error('ID parameter is missing');
            return new Response('ID parameter is missing', { status: 400 });
        }


        const newOnDelete = onDelete === 0 ? 1 : 0;

        const res = await fetch(`${process.env.URLB}/privileges/deletePrivilege/${id}`, {
            cache: 'reload',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, onDelete: newOnDelete }), 
        });

        if (!res.ok) {
            console.error('Failed to delete data');
            return new Response('Failed to delete data', { status: res.status });
        }

        return new Response('Item deleted successfully', {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}
