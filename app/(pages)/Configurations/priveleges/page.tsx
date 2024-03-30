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



const Priveleges = () => {
interface Data{
    srNodata:string
    slugdata:string
    namedata:string
    description:string
    action: ReactNode

}
const tabledata:Data[]=[
    {
        srNodata:'001',
        slugdata:'admin',
        namedata:'Admin',
        description:'Admin group with restricted access',
        action:             <Actionbutton/>


    }
]
    return (
        <Table>
            <TableCaption>A list of your priveleges.</TableCaption>
            <TableHeader>
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
                {tabledata.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell>{data.srNodata}</TableCell>
                        <TableCell>{data.slugdata}</TableCell>
                        <TableCell>{data.namedata}</TableCell>
                        <TableCell className="text-left">{data.description}</TableCell>
                        <TableCell className='text-center  text-[#0A8791]'>{data.action}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default Priveleges;