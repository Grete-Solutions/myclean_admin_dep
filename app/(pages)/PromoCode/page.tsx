"use client"
import React, { ReactNode } from 'react';
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
    Code:string
    UserType:string
    CouponType:string
    CountNum:number
    Status:string
    action: ReactNode

}
const tabledata:Data[]=[
    {
        srNodata:'001',
        Code:'greeting',
        UserType:'hello',
        CouponType:'Driver',
        CountNum:2,
        Status:'Active',
        action:  <Actionbutton/>


    }
]
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
                {tabledata.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>{data.srNodata}</TableCell>
                        <TableCell>{data.Code}</TableCell>
                        <TableCell>{data.UserType}</TableCell>
                        <TableCell className="text-left">{data.CouponType}</TableCell>
                        <TableCell>{data.CountNum}</TableCell>
 <TableCell className="text-left">{data.Status}</TableCell>
                        <TableCell className='text-center  text-[#0A8791]'>{data.action}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table></div>
    );
};

export default PromoCode;