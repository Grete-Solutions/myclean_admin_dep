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
        status: string;
        action: ReactNode;
    }

    const [Location, setLocation] = useState<Data[]>([]);
    
        const getLocation = async () => {
            try {
                const response = await fetch('/lib/GET/serviceLocation/getallcities');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setLocation(data.product);
            } catch (error) {
                console.error('Error fetching data:', error);            }
        };
       
    React.useEffect(() => {
       getLocation() ;
    }, []);

    const handleAddSuccess = () => {
        getLocation();
    };
    

    return (
        <div>
            <ServiceLocationsSheet onAddSuccess={handleAddSuccess}/>
            <Table>
                <TableCaption>A list of your ServiceLocations.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {[
                            { label: 'Sr No', className: 'w-[100px]' },
                            { label: 'Country' },
                            { label: 'City' },
                            { label: 'Price' },
                            { label: 'Status', className: 'text-left' },
                            { label: 'Action' }
                        ].map((header, index) => (
                            <TableHead key={index} className={header.className}>{header.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Location.length === 0 ? (
                        <TableRow>
                            <TableCell className='text-[]' align='center' colSpan={7}>
                                
                                No data found.</TableCell>
                        </TableRow>
                    ) : (
                        Location.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{data.countryISOCode}</TableCell>
                                <TableCell className="text-left">{data.city}</TableCell>
                                <TableCell>{data.price}</TableCell>
                                <TableCell>{data.status}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ServiceLocations;
