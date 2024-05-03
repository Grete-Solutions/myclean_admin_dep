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
import CancellationSheet from '@/app/components/Sheetpop/Cancellation/CancellationSheet';

const Cancellation = () => {
    interface Data {
        srNodata: string;
        Reason: string;
        PaymentType: string;
        UserType: string;
        ArrivalStatus: string;
        Status: string;
        action: ReactNode;
    }

    const tabledata: Data[] = [
     
    ];

    return (
        <div>
            <CancellationSheet />
            <Table>
                <TableCaption>A list of your Cancellation.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {[
                            { label: 'Sr No', className: 'w-[100px]' },
                            { label: 'Push Title' },
                            { label: 'PaymentType' },
                            { label: 'User Type', className: 'text-left' },
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
                                <TableCell>{data.Reason}</TableCell>
                                <TableCell className="text-left">{data.UserType}</TableCell>
                                <TableCell>{data.PaymentType}</TableCell>
                                <TableCell>{data.ArrivalStatus}</TableCell>
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

export default Cancellation;
