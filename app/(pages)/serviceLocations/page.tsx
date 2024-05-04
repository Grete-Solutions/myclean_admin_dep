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
import ServiceLocationsSheet from '@/app/components/Sheetpop/serviceLocations/serviceLocationsSheet';

const ServiceLocations = () => {
    interface Data {
        srNodata: string;
        Country: string;
        Price: number;
        City: string;
        Status: string;
        action: ReactNode;
    }

    const tabledata: Data[] = [
     
    ];

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
                            { label: 'Status', className: 'text-left' },
                            { label: 'Action' }
                        ].map((header, index) => (
                            <TableHead key={index} className={header.className}>{header.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tabledata.length === 0 ? (
                        <TableRow>
                            <TableCell className='text-[]' align='center' colSpan={7}>
                                
                                No data found.</TableCell>
                        </TableRow>
                    ) : (
                        tabledata.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell>{data.srNodata}</TableCell>
                                <TableCell>{data.Country}</TableCell>
                                <TableCell className="text-left">{data.City}</TableCell>
                                <TableCell>{data.Price}</TableCell>
                                <TableCell>{data.Status}</TableCell>
                                <TableCell className='text-center text-[#0A8791]'>{data.action}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ServiceLocations;
