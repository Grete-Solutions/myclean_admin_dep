// Actionbutton.tsx

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PenBox } from "lucide-react";
import { useRouter } from 'next/navigation';
import React from "react";

interface ActionButtonProps {
    id: string; 
}

export function Actionbutton({ id }: ActionButtonProps) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/Edit?id=${id}`); 
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PenBox className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit ">
                <DropdownMenuItem onClick={handleEdit}>
                    Edit
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
