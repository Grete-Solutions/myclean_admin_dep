import React from 'react';
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

interface Props {
  id: string;
  country: string;
  city: string;
  name: string;
}
interface data{
  name: string;
  email: string;
  password: string;
  role: string;
}

function AddAdminDoc (){
const [adminpriv, setAdminPriv] = React.useState<Props[]>([])
const [name, setName] = React.useState('')
const [password, setPassword] = React.useState('')
const [email, setEmail] = React.useState('')
const [role, setRoles] = React.useState('')
React.useEffect(() => {
    async function fetchData() {
  const priveledgeData= await fetch('/lib/GET/Priveledges/getallPriveledges')
  const priveledge= await priveledgeData.json() 
  setAdminPriv(priveledge.product)
}

fetchData();
}, []);
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const response = await fetch('/lib/POST/postAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, password, email, role})
    });

    // Check if the response is not okay (status 2xx)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Data received:', data);
    // onAddSuccess();
    // alert('Vehicle added successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};
  
  return (
    <Sheet>
      <SheetTrigger className='flex items-center'>
        <Button className='text-[12px] bg-[#0A8791] py-2 h-fit'>
          <PlusCircle className='mr-1' size={12}/> Add
        </Button>
      </SheetTrigger>
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
                <Label htmlFor="ModelName" className="text-left">
                  Role
                </Label>
                <Select value={role} onValueChange={setRoles}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select Role" />
  </SelectTrigger>
  <SelectContent className='z-[99999]'>
     <SelectItem value='Super Admin' >
 Super Admin
                </SelectItem>
  {adminpriv.map((item:any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
            ))}
            </SelectContent>
            </Select>
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

export default AddAdminDoc;
