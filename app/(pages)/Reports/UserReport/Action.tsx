import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import React from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
    id: string; 
}

export function Actionbutton({ id }: ActionButtonProps) {
    const router = useRouter();

    const handleView = () => {
        router.push(`Reports/view?id=${id}`);
    };

    const handleDownload = () => {
        // Assuming there's an endpoint for downloading the report
        router.push(`Reports/download?id=${id}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-[#0A8791]">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleView}>
                    <div>View Report</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleDownload}>
                    <div>Download Report</div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
