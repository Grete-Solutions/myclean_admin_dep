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

import PriveledgeSheet from '@/app/components/Sheetpop/Priveleges/PriveledgeSheet';
import { Actionbutton } from './Action';



const Priveleges = () => {
    
interface Data{
    srNodata:string
    slug:string
    name:string
    description:string
    action: ReactNode

}
const [Priveledge, setPriveledge] = useState<Data[]>([]);
    
useEffect(() => {
    const getPriveledge = async () => {
        try {
            const response = await fetch('/lib/GET/getallPriveledges');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log(data.product);
            setPriveledge(data.product);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error, e.g., set a default state or show an error message
        }
    };
    getPriveledge();
}, []);
    return (
        <Table>
            <TableCaption>A list of your priveleges.</TableCaption>
            <TableHeader>
                <PriveledgeSheet/>
                <TableRow>
                    {[
                        { label: 'Sr No', className: 'w-[100px]' },
                        { label: 'Slug' },
                        { label: 'Name' },
                        { label: 'Description', className: 'text-left' },
                        {label:'Action'}
                    ].map((header, index) => (
                        <TableHead key={index} className={header.className}>{header.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {Priveledge.map((data: Data, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell> {/* Increment counter */}
                            <TableCell>{data.slug}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell className="text-left">{data.description}</TableCell>
                        <TableCell className='text-center  text-[#0A8791]'>{data.action}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default Priveleges;