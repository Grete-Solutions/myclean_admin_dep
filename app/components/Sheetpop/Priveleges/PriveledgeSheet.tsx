'use client'
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
import { ComboboxForm } from '@/app/(pages)/Configurations/priveleges/Comoboxcountry';
import { CountryDataType } from '@/app/components/countryConstants';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

type Props = {};

function PriveledgeSheet({ onAddSuccess }: { onAddSuccess: () => void }) {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState<CountryDataType | null>(null);
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const {data:session}= useSession()
const {toast}= useToast()
  const fetchPermission = async () => {
    if (!session) return; 
    const id = session.user.role;
    const field_name = 'create_role';
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!slug || !name || !description || !country || !city) {
      setError('All fields are required.');
      return;
    }
    if (!isAuthorized) {
      toast({title: "Error",variant: "destructive", description: "You are Not Authorized ",variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/lib/POST/postPriveledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, name, description, country: country.Name, city }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      

      const data = await response.json();
      onAddSuccess();
      alert('Privilege added successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add privilege.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet>
    {!isAuthorized && (
      <SheetTrigger className='flex items-center'>
        <Button className='text-[12px] bg-[#0A8791] py-2 h-fit'>
          <PlusCircle className='mr-1' size={12}/> Add
        </Button>
      </SheetTrigger>
    )}
      <SheetContent className='z-[999]'>
        <SheetHeader>
          <SheetTitle>Add Privilege</SheetTitle>
          <SheetDescription>Click save when you&apos;re done.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Slug" className="text-left">
                Slug
              </Label>
              <Input
                id="Slug"
                placeholder='Slug'
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Name" className="text-left">
                Name
              </Label>
              <Input
                id="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Description" className="text-left">
                Description
              </Label>
              <Input
                id="Description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Country" className="text-left">
                Country
              </Label>
              <ComboboxForm selectedCountry={country} setSelectedCountry={setCountry} />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="City" className="text-left">
                City
              </Label>
              <Input
                id="City"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Save changes'}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default PriveledgeSheet;
