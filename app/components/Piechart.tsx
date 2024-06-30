'use client'
import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DataItem {
  name: string;
  value: number;
  color: string;
}

const PieChartBox: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/lib/GET/Dashboard/getTodaysBookingCounts'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        
        const transformedData: DataItem[] = [
          { name: "Completed", value: result.product.completed, color: "#0088FE" },
          { name: "Cancelled", value: result.product.cancelled, color: "#FFBB28" },
          { name: "Pending", value: result.product.pending, color: "#FF8042" },
          { name: "Ongoing", value: result.product.ongoing, color: "#00C49F" },
          { name: "Declined", value: result.product.declined, color: "#FF0000" },
          { name: "Expired", value: result.product.expired, color: "#AAAAAA" },
        ];
        
        setData(transformedData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return      <div className="flex justify-center items-center h-64">
    <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  </div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="flex items-center">
      <div className="chart">
        <ResponsiveContainer width={250} height={250}>
          <PieChart className="pt-0">
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              className="p-2 w-full"
              data={data}
              innerRadius={"40%"}
              outerRadius={"90%"}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((item: DataItem) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item: DataItem) => (
          <div className="text-center" key={item.name}>
            <div>
              <div
                className="w-full h-3"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="bg-gradient-to-l font-semibold from-blue-500 to-red-500 text-transparent bg-clip-text">
                {item.name}
              </span>
            </div>
            <span className="font-bold text-gray-400">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
