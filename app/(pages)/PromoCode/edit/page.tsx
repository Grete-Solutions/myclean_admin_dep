'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PromoCalendarForm } from '../Calendar';

type Data = {
  id: string;
  code: string;
  user_type: string;
  coupon_type: string;
  count: number;
  expired_at: {
    _seconds: number;
    _nanoseconds: number;
  };
  value: number;
  status: number;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updateAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  isDelete: number;
};

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPageContent />
    </Suspense>
  );
}

const EditPageContent = () => {
  const [userType, setUserType] = useState('');
  const [couponType, setCouponType] = useState('');
  const [count, setCountNumber] = useState('');
  const [expiredAt, setExpiredAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const PromoCodeId = searchParams.get('id') as string;
  const [promoData, setPromoData] = useState<Data | undefined>(undefined);

  useEffect(() => {
    const getPromoCodeById = async () => {
      if (!PromoCodeId) return;

      try {
        const response = await fetch(`/lib/GET/PromoCode/getCouponID?id=${PromoCodeId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch promo code data');
        }

        const data = await response.json();
        setPromoData(data.product);
        setUserType(data.product.user_type.toString());
        setCouponType(data.product.coupon_type.toString());
        setCountNumber(data.product.count.toString());
        setExpiredAt(new Date(data.product.expired_at._seconds * 1000));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPromoCodeById();
  }, [PromoCodeId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!promoData) {
    return <div>No data found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h2 className='text-[#0A8791] font-semibold mb-8'>Edit Promo Code</h2>
      <form className='grid grid-cols-1 items-center gap-8'>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="Pcode" className="text-left">Code</Label>
            <h6 className='text-[12px]'>will be auto generated</h6>
            <Input
              id="Pcode"
              placeholder=' Code'
              disabled
              className="col-span-3"
              value={promoData.code}
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
            <Label htmlFor="countNumber" className="text-left">Count Number</Label>
            <Input
              type='number'
              min={0}
              id="countNumber"
              placeholder='Enter Count Number'
              className="col-span-3"
              value={count}
              onChange={(e) => setCountNumber(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <PromoCalendarForm onDateChange={setExpiredAt} />
          </div>
        </div>
        <div>
          <Button className='bg-[#0A8791] hover:bg-[#0a8891b1]' type="submit">Save</Button>
        </div>
      </form>
    </Suspense>
  );
}
