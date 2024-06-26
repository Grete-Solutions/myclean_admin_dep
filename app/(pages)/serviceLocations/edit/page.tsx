'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ComboboxForm } from './Comoboxcountry';
import { useToast } from '@/components/ui/use-toast';

type Data = {
  id: string;
  countryISOCode: string;
  price: number;
  city: string;
  commission:number;
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
  const [vehicleData, setVehicleData] = useState<Data | undefined>(undefined);
  const [countryISOCode, setCountryISOCode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [commission, setCommission] = useState<string>('');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;
  const { toast } = useToast();

  const handleCountrySelect = (selectedCountryISOCode: string) => {
    setCountryISOCode(selectedCountryISOCode);
  };

  useEffect(() => {
    const getLocationById = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/lib/GET/serviceLocation/getCityById?id=${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }

        const data = await response.json();
        setVehicleData(data.product);
        setCountryISOCode(data.product.countryISOCode);
        setCity(data.product.city);
        setPrice(data.product.price.toString());
        setCommission(data.product.commission.toString());
      } catch (error: any) {
        console.error('Error fetching vehicle data:', error);
        setError(error.message);
        toast({ title: 'Error', description: error.message });
      } finally {
        setLoading(false);
      }
    };
    
    getLocationById();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!vehicleData) return;

    try {
      const response = await fetch(`/lib/PUT/serviceLocation/updateByLocationID?id=${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          countryISOCode,
          city,
          price: parseFloat(price),
          commission: parseFloat(commission),
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update vehicle data');
        } else {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to update vehicle data');
        }
      }
      
      toast({ title: 'Success', description: 'Location updated successfully!' });
      router.push('/serviceLocations');
    } catch (error: any) {
      console.error('Error updating vehicle data:', error);
      setError(error.message);
      toast({ title: 'Error', description: error.message });
    }
  };

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

  if (!vehicleData) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <h2 className='text-[#0A8791] font-semibold mb-8'>Edit Location Make</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="country" className="text-left">Country</Label>
            <ComboboxForm onCountrySelect={handleCountrySelect} selectedCountryISOCode={countryISOCode} />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="city" className="text-left">City</Label>
            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="price" className="text-left">Price</Label>
            <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="commission" className="text-left">Price</Label>
            <Input type="number" id="commission" value={commission} onChange={(e) => setCommission(e.target.value)} placeholder="Enter Commission" className="col-span-3" />
          </div>
        </div>
        <div>
          <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};
