

export async function POST(request: Request) {
    try {
      const res = await fetch(`${process.env.URL}/vehicleMake/createVehicle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to create vehicle make');
      }
  
      const responseData = await res.json();
      console.log(responseData)
      const {selectedStatus,...formData} =responseData
    } catch (error) {
      console.error('Error creating vehicle make:', error);
      throw error;
    }
  }
  