export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const res = await fetch(`${process.env.URLB}/coupons/getAll`, {
      cache: 'no-cache',  
    headers: {
          'Content-Type': 'application/json',
  
      },
  });
    const product = await res.json()
   
    return Response.json({ product })
  }
  // const fetchNotificationPermission = async () => {
//   try {
//     const response = await fetch('/lib/GET/Priveledges/getPrivelegesByIDandFieldName');
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     const result = await response.json();
//     setData(Array.isArray(result.product) ? result.product : []);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };