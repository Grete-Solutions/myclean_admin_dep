'use client'
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
import ServiceLocationsSheet from '@/app/components/Sheetpop/serviceLocations/serviceLocationsSheet';

const ServiceLocations = () => {
    interface Data {
        srNodata: string;
        countryISOCode: string;
        price: number;
        city: string;
        description: string;
        status: Number;
        action: ReactNode;
    }

    const [Location, setLocation] = useState<Data[]>([]);
    
    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await fetch('/lib/GET/getallcities');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);
                setLocation(data.product);
            } catch (error) {
                console.error('Error fetching data:', error);            }
        };
        getLocation();
    }, []);

    return (
        <div>
            <ServiceLocationsSheet />
            <Table>
                <TableCaption>A list of your ServiceLocations.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {[
                            { label: 'Sr No', className: 'w-[100px]' },
                            { label: 'Country' },
                            { label: 'City' },
                            { label: 'Price' },
                            { label: 'Description' },
                            { label: 'Status', className: 'text-left' },
                            { label: 'Action' }
                        ].map((header, index) => (
                            <TableHead key={index} className={header.className}>{header.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                {Location.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.countryISOCode}</TableCell>
                        <TableCell className="text-left">{data.city}</TableCell>
                        <TableCell className="text-left">{data.description}</TableCell>
                        <TableCell>{data.price}</TableCell>
                        <TableCell>{data.status === 1 ? 'Active' : 'Inactive'}</TableCell>                        <TableCell className='text-center  text-[#0A8791]'>{data.action}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ServiceLocations;
