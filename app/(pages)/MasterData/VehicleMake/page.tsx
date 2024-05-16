'use client'
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
import VehicleMakeSheet from '@/app/components/Sheetpop/MasterDataPop/VehicleMakeSheet';

const Priveleges = () => {
    const [vehicle, setVehicle] = React.useState<Data[]>([]);

    const getVehicle = async () => {
        try {
            const response = await fetch('/lib/GET/getallVehicle');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setVehicle(data.product);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    React.useEffect(() => {
        getVehicle();
    }, []);

    const handleAddSuccess = () => {
        getVehicle();
    };
    


    interface Data {
        srNodata: number;
        make: string;
        model: string;
        year: number;
        description:string;
        status: number;
        capacity: number;
        action: ReactNode;
    }

    return (
        <div>
            <VehicleMakeSheet onAddSuccess={handleAddSuccess} />
            <Table>
                <TableCaption>A list of your privileges.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {[
                            { label: 'Sr No', className: 'w-[100px]' },
                            { label: 'Vehicle Make Name' },
                            { label: 'Vehicle Model' },
                            { label: 'Year' },
                            { label: 'Capacity' },
                            { label: 'Status', className: 'text-left' },
                            { label: 'Action' }
                        ].map((header, index) => (
                            <TableHead key={index} className={header.className}>{header.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicle.map((data: Data, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell> 
                            <TableCell>{data.make}</TableCell>
                            <TableCell>{data.model}</TableCell>
                            <TableCell>{data.year}</TableCell>
                            <TableCell>{data.capacity}</TableCell>
                            <TableCell className="text-left">{data.description}</TableCell>
                            <TableCell>{data.status === 1 ? 'Active' : 'Inactive'}</TableCell>                            <TableCell className="text-center text-[#0A8791]">
                                {data.action}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Priveleges;
