'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ComboboxForm } from './Comoboxcountry';
import { CountriesIsoData } from '../countryisocode';
import { useToast } from '@/components/ui/use-toast'; // Import useToast

type Data = {
  id: string;
  countryISOCode: string;
  price: number;
  city: string;
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
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;
  const { toast } = useToast(); // Initialize toast

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
      } catch (error: any) {
        console.error('Error fetching vehicle data:', error);
        setError(error.message);
        toast({ title: 'Error', description: error.message }); // Display error toast
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
      
      console.log('Request Body:', { city, price, countryISOCode });
      toast({ title: 'Success', description: 'Location updated successfully!' }); // Display success toast
      router.push('/serviceLocations');
    } catch (error: any) {
      console.error('Error updating vehicle data:', error);
      setError(error.message);
      toast({ title: 'Error', description: error.message }); // Display error toast
    }
  };

  const getCountryName = (isoCode: string) => {
    const country = CountriesIsoData.find((c) => c.code === isoCode);
    return country ? country.name : 'Unknown Country';
  };

  if (loading) {
    return <div>Loading...</div>;
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
            <div>{getCountryName(countryISOCode)}</div>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="city" className="text-left">City</Label>
            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="price" className="text-left">Price</Label>
            <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="col-span-3" />
          </div>
        </div>
        <div>
          <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};
