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
import { Label } from 'recharts';


const PromoCode = () => {
    interface Data {
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
    }

    const [couponList, setCouponList] = useState<Data[]>([]);

    const getCoupon = async () => {
        try {
            const response = await fetch('/lib/GET/PromoCode/getallCoupon');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data.product);
            setCouponList(data.product);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, e.g., set a default state or show an error message
        }
    };
    
    React.useEffect(() => {
        getCoupon();
    }, []);

    const handleAddSuccess = () => {
        getCoupon();
        alert('Promo code added successfully!');
    };
    
    return (
        <div>
            <PromoCodeSheet onAddSuccess={handleAddSuccess} />
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
                            { label: 'Expires At' },
                            { label: 'Status' },
                            { label: 'Action' }
                        ].map((header, index) => (
                            <TableHead key={index} className={header.className}>{header.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {couponList.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{data.code}</TableCell>
                            <TableCell>{data.user_type}</TableCell>
                            <TableCell className="text-left">{data.coupon_type}</TableCell>
                            <TableCell>{data.count}</TableCell>
                            <TableCell>{new Date(data.expired_at._seconds * 1000).toLocaleString()}</TableCell>
                            <TableCell>{data.status === 1 ? 'Active' : 'Inactive'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PromoCode;
