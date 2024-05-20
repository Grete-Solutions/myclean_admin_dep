
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PenBox } from "lucide-react";
import { useRouter } from 'next/navigation';
import React from "react";

interface ActionButtonProps {
    id: string; 
    status: string;
}

export function Actionbutton({ id,status }: ActionButtonProps) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`serviceLocations/edit?id=${id}`); 
    };
    // const handleChangeStatus = async () => {
    //     try {
    //         const response = await fetch(`/api/updateStatus`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ status }),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         console.log(`Successfully changed status for ID ${id} to ${status}`);
    //     } catch (error) {
    //         console.error('Failed to change status:', error);
    //     }
    // };

    const otherStatus = status === 'Active' ? 'Inactive' : 'Active';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PenBox className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit ">
                <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleEdit}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" >
                    Set to {otherStatus}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 hover:bg-gray-50 hover:cursor-pointer font-semibold ">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
