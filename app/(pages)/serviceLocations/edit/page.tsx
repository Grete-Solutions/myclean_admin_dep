'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



type Data = {
  id: string;
  srNodata: string;
  countryISOCode: string;
  price: number;
  city: string;
  status: number;
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
        const response = await fetch(`/lib/GET/serviceLocation/getCityById?id=${vehicleId}`);

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
                <Label htmlFor="Country" className="text-left">
                Country
                </Label>
                <Input id="Country" value={vehicledData.countryISOCode} placeholder=' Country' className="col-span-3" />
              </div>

              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="City" className="text-left">
                  City
                </Label>
                <Input id="City" value={vehicledData.city} placeholder=' Enter City' className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Year" className="text-left">
                Price
                </Label>
                <Input id="Price" value={vehicledData.price} placeholder='Enter Price' className="col-span-3" />
              </div>
              <div>
                <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit">Save</Button>
              </div>
</form>

        </Suspense>
    );
}

