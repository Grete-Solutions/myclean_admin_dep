export async function POST() {
    try {
        const res = await fetch(`${process.env.URL}/setPrice/createCity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ time: new Date().toISOString() }),
        });

        if (!res.ok) {
            throw new Error('Failed to create city');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error creating city:', error);
        throw error; 
    }
}
