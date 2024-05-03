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
import NotificationSheet from '@/app/components/Sheetpop/Notification/Notification';



const Notification = () => {
interface Data{
    srNodata:string
    PushTitle:string
    Message:string
    UserType:string
    action: ReactNode

}
const tabledata:Data[]=[
    {
        srNodata:'001',
        PushTitle:'greeting',
        Message:'hello',
        UserType:'Driver',
        action:             <Actionbutton/>


    }
]
    return (
        <div>
           <NotificationSheet/>
        <Table>
            <TableCaption>A list of your Notification.</TableCaption>
            <TableHeader>
                <TableRow>
                    {[
                        { label: 'Sr No', className: 'w-[100px]' },
                        { label: 'Push Title	' },
                        { label: 'Message' },
                        { label: 'User Type', className: 'text-left' },
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
                        <TableCell>{data.PushTitle}</TableCell>
                        <TableCell>{data.Message}</TableCell>
                        <TableCell className="text-left">{data.UserType}</TableCell>
                        <TableCell className='text-center  text-[#0A8791]'>{data.action}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table></div>
    );
};

export default Notification;