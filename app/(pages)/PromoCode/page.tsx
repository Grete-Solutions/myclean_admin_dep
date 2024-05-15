"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Actionbutton } from '@/app/components/Action';
import { Button } from '@/components/ui/button';
import PromoCodeSheet from '@/app/components/Sheetpop/PromoCodeSheet/PromoCode';



const PromoCode = () => {
interface Data{
    srNodata:string
    code:string
    user_type:string
    coupon_type:string
    count:number
    status:Number

}
const [Coupon, setCoupon] = useState<Data[]>([]);
    
useEffect(() => {
    const getCoupon = async () => {
        try {
            const response = await fetch('/lib/GET/getallCoupon');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data.product);
            setCoupon(data.product);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, e.g., set a default state or show an error message
        }
    };
    getCoupon();
}, []);
    return (
        <div>
           <PromoCodeSheet/>
        <Table>
            <TableCaption>A list of your PromoCode.</TableCaption>
            <TableHeader>
                <TableRow>
                    {[
                        { label: 'Sr No', className: 'w-[100px]' },
                        { label: 'Code' },
                        { label: 'User Type' },
                        { label: 'Coupon Type' },
                        { label: 'Count Number' },
                        { label: 'Status' },
                        {label:'Action'}
                    ].map((header, index) => (
                        <TableHead key={index} className={header.className}>{header.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {Coupon.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.code}</TableCell>
                        <TableCell>{data.user_type}</TableCell>
                        <TableCell className="text-left">{data.coupon_type}</TableCell>
                        <TableCell>{data.count}</TableCell>
                        <TableCell>{data.status === 1 ? 'Active' : 'Inactive'}</TableCell>  
                    </TableRow>
                ))}
            </TableBody>
        </Table></div>
    );
};

export default PromoCode;