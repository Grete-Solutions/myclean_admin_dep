'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};
type Data = {
    id: string;
    srNodata: number;
    make: string;
    model: string;
    year: number;
    description: string;
    status: number;
    capacity: number;
};

export default function EditPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <EditPageContent />
      </Suspense>
    );
  }

  const EditPageContent = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('id') as string;
  const [vehicledData, setVehicleData] = useState<Data | undefined>(undefined);




  useEffect(() => {
    const getVehicleById = async () => {
      if (!vehicleId) return;

      try {
        const response = await fetch(`/lib/GET/VehicleMake/getallbyvehiclemakeID?id=${vehicleId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }

        const data = await response.json();
        console.log(data)
        setVehicleData(data.product);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getVehicleById();
  }, [vehicleId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vehicledData) {
    return <div>No data found</div>;
  }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <h2 className='text-[#0A8791] font-semibold mb-8'>Edit Vehicle Make</h2>
       <form className='grid grid-cols-1 items-center gap-8'>
        <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Name" className="text-left">
                Vehicle Make Name
                </Label>
                <Input id="Name" value={vehicledData.make} placeholder=' Name' className="col-span-3" />
              </div>

              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Name" className="text-left">
                Vehicle  Model
                </Label>
                <Input id="Model" value={vehicledData.model} placeholder=' Enter Model' className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Year" className="text-left">
                Year
                </Label>
                <Input id="Year" value={vehicledData.year} placeholder='Enter Year' className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Capacity" className="text-left">
                Capacity
                </Label>
                <Input type='number' id="Capacity" value={vehicledData.capacity} placeholder='Enter Capacity' className="col-span-3" />
              </div>

              <div>
                <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit">Save</Button>
              </div>
</form>

        </Suspense>
    );
}

