'use client';

import React, { Suspense, useEffect, useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

type FormData = {
  make: string;
  model: string;
  year: string;
  capacity: string;
  description: string;
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
  const [formData, setFormData] = useState<FormData>({
    make: '',
    model: '',
    year: '',
    capacity: '',
    description: '',
  });
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;

  useEffect(() => {
    const getVehicleById = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/lib/GET/VehicleMake/getallbyvehiclemakeID?id=${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }

        const data = await response.json();
        setFormData(data.product);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
        toast({title: "Error",variant: "destructive", description: error.message });
      }
    };

    getVehicleById();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/lib/PUT/VehicleMake/updateByID?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, id }),
      });

      if (!response.ok) {
        throw new Error('Failed to update vehicle data');
      }

      toast({ title: "Success",variant:'success', description: "Vehicle data updated successfully" });
      router.push('/MasterData/VehicleMake');
    } catch (error: any) {
      setError(error.message);
      toast({title: "Error",variant: "destructive", description: error.message });
    } finally {
      setLoading(false);
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

  if (!formData) {
    return <div>No data found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h2 className='text-[#0A8791] font-semibold mb-8'>Edit Vehicle Make</h2>
      <form className='grid grid-cols-1 items-center gap-8' onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="make" className="text-left">
            Vehicle Make Name
          </Label>
          <Input id="make" value={formData.make || ''} onChange={handleChange} placeholder='Name' className="col-span-3" />
        </div>

        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="model" className="text-left">
            Vehicle Model
          </Label>
          <Input id="model" value={formData.model || ''} onChange={handleChange} placeholder='Enter Model' className="col-span-3" />
        </div>

        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="year" className="text-left">
            Year
          </Label>
          <Input id="year" value={formData.year?.toString() || ''} onChange={handleChange} placeholder='Enter Year' className="col-span-3" />
        </div>

        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="capacity" className="text-left">
            Capacity
          </Label>
          <Input type='number' id="capacity" value={formData.capacity?.toString() || ''} onChange={handleChange} placeholder='Enter Capacity' className="col-span-3" />
        </div>

        <div className="grid grid-cols-1 items-center gap-4">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Input id="description" value={formData.description?.toString() || ''} onChange={handleChange} placeholder='Enter Description' className="col-span-3" />
        </div>

        <div>
          <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit">Save</Button>
        </div>
      </form>
    </Suspense>
  );
}
