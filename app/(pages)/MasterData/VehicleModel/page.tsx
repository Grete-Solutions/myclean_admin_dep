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
import VehicleModelSheet from '@/app/components/Sheetpop/MasterDataPop/VehicleModelSheet';



const Priveleges = () => {
interface Data{
    srNodata:string
    VehicleMakedata:string
    VehicleMakeNamedata:string
    Status:string
    action: ReactNode

}
const tabledata:Data[]=[
    {
        srNodata:'001',
        VehicleMakedata:'Acura',
        VehicleMakeNamedata:'CL',
        Status:'Active',
        action:             <Actionbutton/>


    }
]
    return (
        <>
        <VehicleModelSheet/>
        <Table>
            <TableCaption>A list of your priveleges.</TableCaption>
            <TableHeader>
                <TableRow>
                    {[
                        { label: 'Sr No', className: 'w-[100px]' },
                        { label: 'Vehicle Make Name	' },
                        { label: 'Vehicle Make For' },
                        { label: 'Status', className: 'text-left' },
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
                        <TableCell>{data.VehicleMakedata}</TableCell>
                        <TableCell>{data.VehicleMakeNamedata}</TableCell>
                        <TableCell className="text-left">{data.Status}</TableCell>
                        <TableCell className='text-center  text-[#0A8791]'>{data.action}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table></>
    );
};

export default Priveleges;