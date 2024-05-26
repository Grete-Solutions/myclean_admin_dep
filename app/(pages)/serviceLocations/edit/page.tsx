'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ComboboxForm } from './Comoboxcountry';

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
  const [vehicleData, setLocationData] = useState<Data | undefined>(undefined);
  const [formData, setFormData] = useState({
    countryISOCode: '',
    city: '',
    price: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;

  const handleCountrySelect = (countryISOCode: string) => {
    setFormData((prevData) => ({ ...prevData, countryISOCode }));
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
        setLocationData(data.product);
        setFormData({
          countryISOCode: data.product.countryISOCode,
          city: data.product.city,
          price: data.product.price.toString(),
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getLocationById();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!vehicleData) return;

    console.log('Request Body:', formData);
    try {
      const response = await fetch(`/lib/PUT/serviceLocation/updateByID?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          ...formData,
          price: parseFloat(formData.price),
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

      router.push('/serviceLocations'); 
    } catch (error: any) {
      setError(error.message);
    }
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
            <ComboboxForm onCountrySelect={handleCountrySelect} selectedCountryISOCode={formData.countryISOCode} />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="city" className="text-left">City</Label>
            <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="City" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="price" className="text-left">Price</Label>
            <Input type="number" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price" className="col-span-3" />
          </div>
        </div>
        <div>
          <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};
