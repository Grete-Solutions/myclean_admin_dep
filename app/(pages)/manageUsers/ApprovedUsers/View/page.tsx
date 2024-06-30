"use client"

import * as React from "react"

type ApprovedData = {
  firstName: string;
  lastName: string;
  phone: string;
  userType: number;
  email: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  deactivated: number;
  suspended: number;
  status: string;
};

export default function ApproveUsersDataPage() {
  const [data, setData] = React.useState<ApprovedData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/lib/GET/User/getallUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (Array.isArray(data.product)) {
          setData(data.product);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="py-4">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold">Sno:</p>
                  <p>{index + 1}</p>
                  
                  <p className="font-semibold">First Name:</p>
                  <p>{item.firstName}</p>
                  
                  <p className="font-semibold">Last Name:</p>
                  <p>{item.lastName}</p>
                  
                  <p className="font-semibold">Phone:</p>
                  <p>{item.phone}</p>
                  
                  <p className="font-semibold">User Type:</p>
                  <p>{item.userType}</p>
                  
                  <p className="font-semibold">Email:</p>
                  <p>{item.email}</p>
{/*                   
                  <p className="font-semibold">Created At:</p>
                  <p>{new Date(item.createdAt._seconds * 1000).toLocaleString()}</p>
                  
                  <p className="font-semibold">Updated At:</p>
                  <p>{new Date(item.updatedAt._seconds * 1000).toLocaleString()}</p>
                   */}
                  <p className="font-semibold">Deactivated:</p>
                  <p>{item.deactivated}</p>
                  
                  <p className="font-semibold">Suspended:</p>
                  <p>{item.suspended}</p>
                  
                  <p className="font-semibold">Status:</p>
                  <p className={item.status === "1" ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                    {item.status === "1" ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No approved users found.</p>
        )}
      </div>
    </div>
  )
}
