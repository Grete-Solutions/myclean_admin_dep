'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from 'lucide-react';
import { ComboboxForm } from '@/app/(pages)/serviceLocations/Comoboxcountry';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

interface NewVehicle {
  countryISOCode: string;
  city: string;
  price: number;
}

function ServiceLocation({ onAddSuccess }: { onAddSuccess: () => void }) {
  const [countryISOCode, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const {data:session}= useSession()
  const {toast} = useToast()
  const [commission, setCommission] = React.useState('');

  const fetchPermission = async () => {
    if (!session) return; 
    const id = session.user.role;
    const field_name = 'add_vehicle_make';
    try {
      const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setIsAuthorized(session?.user.role === 'Super Admin'|| result.product === 1 );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPermission();
  }, [session]); 
  const handleCountrySelect = (countryISOCode: string) => {
    setCountry(countryISOCode); 
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/lib/POST/postserviceLocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          countryISOCode,
          city,
          price: parseFloat(price), 
          commission: parseFloat(commission)
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (!isAuthorized) {
        toast({title: "Error",variant: "destructive", description: "You are Not Authorized ", });
        return;
      }

      const data = await response.json();
      onAddSuccess();
      alert('Service location added successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Sheet>
    {isAuthorized && (
      <SheetTrigger className='flex items-center'>
        <Button className='text-[12px] bg-[#0A8791] py-2 h-fit'>
          <PlusCircle className='mr-1' size={12}/> Add
        </Button>
      </SheetTrigger>
    )}
      <SheetContent className='z-[9999]'>
        <SheetHeader>
          <SheetTitle>Add</SheetTitle>
          <SheetDescription>
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left">Country</Label>
              <ComboboxForm onCountrySelect={handleCountrySelect} />         
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="City" className="text-left">City</Label>
              <Input id="City" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Price" className="text-left">Price</Label>
              <Input type='number' id="Price" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="commission" className="text-left">Commission</Label>
              <Input type='number' id="commission" value={price} onChange={(e)=>setCommission(e.target.value)} placeholder="Enter Commission" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <div>
                <Button type="submit">Add</Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default ServiceLocation;
