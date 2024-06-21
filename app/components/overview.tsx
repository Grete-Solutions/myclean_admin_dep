import React, { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface DataItem {
  monthYear: string;
  userCount: number;
}

export function Overview() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/lib/GET/Dashboard/getMonthlyUserCounts'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json(); 
        
        // Extract the product array from the result
        const productData: DataItem[] = result.product;
        
        // Transform the data to match the expected format
        const transformedData = productData.map(item => ({
          monthYear: item.monthYear,
          userCount: item.userCount
        }));
        
        setData(transformedData);
      } catch (error: any) {
        setError(error.message); // Assign error message to setError
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return      
      <div className="flex justify-center items-center h-64">
        <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      </div>
  }

  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }

  const monthNumberToName = (month: number) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[month - 1];
  };

  return (
    <ResponsiveContainer width="100%" className='overflow-x-scroll' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="monthYear" // Correctly reference the monthYear key
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: string) => {
            const [month, year] = value.split('/');
            return `${monthNumberToName(Number(month))} ${year}`;
          }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="userCount" 
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
