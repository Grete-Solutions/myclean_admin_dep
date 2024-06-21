'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface Data {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
  city: string;
}

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPageContent />
    </Suspense>
  );
}

const EditPageContent = () => {
  const [adminpriv, setAdminPriv] = useState<any[]>([]);
  const [adminData, setAdminData] = useState<Data | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRoles] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;
  const { toast } = useToast();

  useEffect(() => {
    const getAdminById = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/lib/GET/Admin/getAdminById?id=${id}`);
        if (!response.ok) throw new Error('Failed to fetch admin data');

        const data = await response.json();
        setAdminData(Array.isArray(data.product) ? data.product : []);
        setName(data.product.name);
        setEmail(data.product.email);
        setRoles(data.product.role);
        setAddress(data.product.address);
        setCountry(data.product.country);
        setState(data.product.state);
        setPostalCode(data.product.postalCode);
        setPhone(data.product.phone);
        setCity(data.product.city);
      } catch (error: any) {
        setError(error.message);
        toast({title: "Error",variant: "destructive", description: error.message });
      } finally {
        setLoading(false);
      }
    };

    getAdminById();
  }, [id]);
  React.useEffect(() => {
    async function fetchData() {
      const priveledgeData = await fetch('/lib/GET/Priveledges/getActivePriveledges');
      const priveledge = await priveledgeData.json(); 
      setAdminPriv(priveledge.product);
    }

    fetchData();
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      name,
      email,
      role,
      address,
      country,
      state,
      postalCode,
      phone,
      city,
    };

    try {
      const response = await fetch(`/lib/PUT/Admin/updateAdminByID?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...requestBody,id}),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      await response.json();
      toast({ title: "Success",variant:'success', description: "Admin data updated successfully!" });
      router.push('/Admin');
    } catch (error: any) {
      setError('Failed to update admin data.product.');
      toast({title: "Error",variant: "destructive", description: "Failed to update admin data.product." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!adminData) {
    return <div>No data found</div>;
  }

  return (
    <>
      <h2 className='text-[#0A8791] font-semibold mb-8'>Edit Admin</h2>
      <form className='grid grid-cols-1 items-center gap-8' onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="name" className="text-left"> Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="Password" className="text-left">Password</Label>
            <Input id="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="Email" className="text-left">Email</Label>
            <Input id="Email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="Role" className="text-left">Role</Label>
            <Select value={role} onValueChange={setRoles}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent className='z-[99999]'>
                <SelectItem value='Super Admin'>Super Admin</SelectItem>
                {adminpriv.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="Address" className="text-left">Address</Label>
            <Input id="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="Country" className="text-left">Country</Label>
            <Input id="Country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="State" className="text-left">State</Label>
            <Input id="State" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="PostalCode" className="text-left">Postal Code</Label>
            <Input id="PostalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal Code" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="Phone" className="text-left">Phone</Label>
            <Input id="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="City" className="text-left">City</Label>
            <Input id="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="col-span-3" />
          </div>
        </div>
        <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </>
  );
};
