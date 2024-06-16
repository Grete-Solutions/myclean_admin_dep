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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

// Define interface for Props and data
interface Props {
  id: string;
  country: string;
  city: string;
  name: string;
}
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
  city:string;
}

// Define AddAdminSheet component
function AddAdminSheet (){
  const [adminpriv, setAdminPriv] = React.useState<Props[]>([]);
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRoles] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [city, setCity]= React.useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const {data:session}= useSession()
  const {toast}=useToast()

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
      setIsAuthorized(result.product === 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPermission();
  }, [session]); 

  // Fetch admin privileges data on component mount
  React.useEffect(() => {
    async function fetchData() {
      const priveledgeData = await fetch('/lib/GET/Priveledges/getallPriveledges');
      const priveledge = await priveledgeData.json(); 
      setAdminPriv(priveledge.product);
    }

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data: Data = {
        name,
        password,
        email,
        role,
        address,
        country,
        state,
        postalCode,
        phone,
        city
      };

      const response = await fetch('/lib/POST/postAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (!isAuthorized) {
        toast({ title: "Error", description: "You are Not Authorized ",variant: "destructive" });
        return;
      }

      const responseData = await response.json();
      console.log('Data received:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Render AddAdminSheet component
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
        <ScrollArea className='h-full'>
        <SheetHeader>
          <SheetTitle>Add</SheetTitle>
          <SheetDescription>
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name" className="text-left"> Name</Label>
              <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Password" className="text-left"></Label>
              <Input id="Password" type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Email" className="text-left">Email</Label>
              <Input id="Email" type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Role" className="text-left">Role</Label>
              <Select value={role} onValueChange={setRoles}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className='z-[99999]'>
                  <SelectItem value='Super Admin'>Super Admin</SelectItem>
                  {adminpriv.map((item:any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Address" className="text-left">Address</Label>
              <Input id="Address" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Country" className="text-left">Country</Label>
              <Input id="Country" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Country" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="State" className="text-left">State</Label>
              <Input id="State" value={state} onChange={(e)=>setState(e.target.value)} placeholder="State" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="PostalCode" className="text-left">Postal Code</Label>
              <Input id="PostalCode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} placeholder="Postal Code" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="Phone" className="text-left">Phone</Label>
              <Input id="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" className="col-span-3" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="City" className="text-left">City</Label>
              <Input id="City" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <div>
                <Button type="submit">Add</Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </form></ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default AddAdminSheet;
