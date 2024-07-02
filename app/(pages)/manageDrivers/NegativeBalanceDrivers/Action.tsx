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

export function Actionbutton({ id}: ActionButtonProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isToggleAuthorized, setIsToggleAuthorized] = useState(false);
    const [isdeleteAuthorized, setIsdeleteAuthorized] = useState(false);
    const {data:session}= useSession()
  
    const fetchPermission = async () => {
      if (!session) return; 
      const id = session.user.role;
      const field_name = 'edit_vehicle_make';
      try {
        const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setIsAuthorized(session?.user.role === 'Super Admin'|| result.product === 1  || result.product === 'Super Admin');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchDeletePermission = async () => {
        if (!session) return; 
        const id = session.user.role;
        const field_name = 'delete_priviledge';
        try {
          const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setIsToggleAuthorized(session?.user.role === 'Super Admin'|| session?.user.role === 'Super Admin'|| result.product === 1  );
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      const fetchTogglePermission = async () => {
        if (!session) return; 
        const id = session.user.role;
        const field_name = 'toggle_vehicle_make';
        try {
          const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setIsdeleteAuthorized(session?.user.role === 'Super Admin'|| result.product === 1 );
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
  
    useEffect(() => {
      fetchPermission();
      fetchTogglePermission()
      fetchDeletePermission();
    }, [session]); 
    const handleEdit = () => {
        router.push(`Admin/edit?id=${id}`);
    };




    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PenBox className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                   <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleEdit}>
        
          <div>
                                 Send Reminder
          </div>
               </DropdownMenuItem>   
             <DropdownMenuItem  className="hover:cursor-pointer hover:bg-gray-50">
          <div>
            Send Voucher

          </div>
                       </DropdownMenuItem>
  
          <DropdownMenuItem>
        {!isAuthorized&& !isToggleAuthorized && !isToggleAuthorized&&(
            <button disabled className="text-red-600 font-semibold">
           No Permission Allowed
            </button>
        )}
      </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
