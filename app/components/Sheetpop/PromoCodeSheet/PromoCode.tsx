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
import { CirclePlusIcon, PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PromoCalendarForm } from './Calendar';
import { useSession } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

interface Promocode {
  coupon_type: string,
  user_type: number,
  value: number,
  count: number,
  expired_at: string
}

function PromoCodeSheet({ onAddSuccess }: { onAddSuccess: () => void }) {
  const [userType, setUserType] = React.useState('');
  const [couponType, setCouponType] = React.useState('');
  const [value, setValue] = React.useState('');
  const [count, setCountNumber] = React.useState('');
  const [expiredAt, setExpiredAt] = React.useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const {data:session}= useSession()
  const {toast}= useToast()

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ( !userType || !couponType || !count || !expiredAt) {
      setError('All fields are required.');
      return;
    }
    if (!isAuthorized) {
      toast({title: "Error",variant: "destructive", description: "You are Not Authorized " });
      return;
    }
    let userTypeValue: number;
    if (userType === 'User') {
      userTypeValue = 1;
    } else if (userType === 'Driver') {
      userTypeValue = 2;
    } else if (userType === 'All'){
      userTypeValue = 0;
      return;
    }else{
      throw new Error('Invalid user type');
    }
  

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/lib/POST/postPromoCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coupon_type: couponType,
          user_type: userTypeValue,
          value: parseFloat(value),
          count: parseInt(count, 10),
          expired_at: expiredAt.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onAddSuccess();
      alert('Promo Code added successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add promo code.');
    } finally {
      setIsSubmitting(false);
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
        <ScrollArea className="h-full w-[350px]">
          <SheetHeader>
            <SheetTitle>Add Promo Code</SheetTitle>
            <SheetDescription>
              Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Pcode" className="text-left">Code</Label>
                             <h6 className='text-[12px]'>will be auto generated</h6>
                <Input
                  id="Pcode"
                  placeholder=' Code'
                  disabled
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="userType" className="text-left">User Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select User Type" />
                  </SelectTrigger>
                  <SelectContent className='z-[99999]'>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Driver">Driver</SelectItem>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="couponType" className="text-left">Coupon Type</Label>
                <Select value={couponType} onValueChange={setCouponType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Coupon Type" />
                  </SelectTrigger>
                  <SelectContent className='z-[99999]'>
                    <SelectItem value="Percentage">Percentage</SelectItem>
                    <SelectItem value="Numeric">Numeric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="count" className="text-left">Count Number</Label>
                <Input
                  type='number'
                  min={0}
                  id="count"
                  placeholder='Enter Count Number'
                  className="col-span-3"
                  value={count}
                  onChange={(e) => setCountNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="value" className="text-left">Value</Label>
                <Input
                  type='number'
                  min={0}
                  id="value"
                  placeholder='Enter Value'
                  className="col-span-3"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <PromoCalendarForm onDateChange={setExpiredAt} />
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <SheetFooter>
              <SheetClose asChild>
                <div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add'}
                  </Button>
                </div>
              </SheetClose>
            </SheetFooter>
          </form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default PromoCodeSheet;
