import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PenBox, Trash } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface ActionButtonProps {
    id: string; 
}

export function Actionbutton({ id, }: ActionButtonProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isToggleAuthorized, setIsToggleAuthorized] = useState(false);
    const [isdeleteAuthorized, setIsdeleteAuthorized] = useState(false);
    const {data:session}= useSession()
    const handleView = () => {
      router.push(`ApprovedUsers/View?id=${id}`);
  };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PenBox className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                      {isAuthorized && (  <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleView}>
        
          <div>
                                 View
          </div>
               </DropdownMenuItem>   )}    
        
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
