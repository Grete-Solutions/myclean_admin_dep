import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PenBox, Trash } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import React from "react";
import { useToast } from "@/components/ui/use-toast";

interface ActionButtonProps {
    id: string; 
    status: number; 
    onDelete: number;
    refreshData: () => void; 
}

export function Actionbutton({ id, status, onDelete, refreshData }: ActionButtonProps) {
    const { toast } = useToast();
    const router = useRouter();

    const handleEdit = () => {
        router.push(`priveleges/edit?id=${id}`);
    };

    const handleChangeStatus = async () => {
        try {
            const response = await fetch(`/lib/PUT/Priveledge/updateStatusByID?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(`Successfully changed status for ID ${id}`);
            toast({ title: "Success", description: "Status changed successfully" });
            refreshData(); 
        } catch (error) {
            console.error('Failed to change status:', error);
            toast({ title: "Error", description: "Failed to change status" });
        }
    };

    const handleDelete = async () => {
        try {
            const newDel = onDelete === 0 ? 1 : 0;
            const response = await fetch(`/lib/DELETE/Priveledge/deleteByID?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status: newDel }), 
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(`Successfully deleted item with ID ${id}`);
            toast({ title: "Success", description: "Item deleted successfully" });
            refreshData(); 
        } catch (error) {
            console.error('Failed to delete item:', error);
            toast({ title: "Error", description: "Failed to delete item" });
        }
    };

    const otherStatusLabel = status === 1 ? 'Inactive' : 'Active';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PenBox className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleEdit}>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleChangeStatus} className="hover:cursor-pointer hover:bg-gray-50">
                    Set to {otherStatusLabel}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 hover:bg-gray-50 hover:cursor-pointer font-semibold">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
