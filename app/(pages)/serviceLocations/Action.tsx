import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PenBox, Trash } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
    id: string; 
    status: boolean; 
    onDelete: number;
    refreshData: () => void; 
}

export function Actionbutton({ id, status, onDelete, refreshData }: ActionButtonProps) {
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
        setIsAuthorized(session?.user.role === 'Super Admin'|| result.product === 1 );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchDeletePermission = async () => {
        if (!session) return; 
        const id = session.user.role;
        const field_name = 'delete_vehicle_make';
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
      const fetchTogglePermission = async () => {
        if (!session) return; 
        const id = session.user.role;
        const field_name = 'toggle_service_location';
        try {
          const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setIsToggleAuthorized(session?.user.role === 'Super Admin'|| result.product === 1 );
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
        router.push(`serviceLocations/edit?id=${id}`);
    };

    const handleChangeStatus = async () => {
        try {
            const response = await fetch(`/lib/PUT/serviceLocation/updateStatusByID?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            toast({ title: "Success",variant:'success', description: "Status changed successfully" });
            refreshData(); 
        } catch (error) {
            console.error('Failed to change status:', error);
            toast({title: "Error",variant: "destructive", description: "Failed to change status" });
        }
    };

    const handleDelete = async () => {
        try {
            const newDel = onDelete === 0 ? 1 : 0;
            const response = await fetch(`/lib/DELETE/serviceLocation/deleteByID?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status: newDel }), 
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            toast({ title: "Success",variant:'success', description: "Item deleted successfully" });
            refreshData(); 
        } catch (error) {
            console.error('Failed to delete item:', error);
            toast({title: "Error",variant: "destructive", description: "Failed to delete item" });
        }
    };

    const otherStatusLabel = status === true || 1 ? 'Inactive' : 'Active';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PenBox className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                      {isAuthorized && (  <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleEdit}>
        
          <div>
                                 Edit
          </div>
               </DropdownMenuItem>   )}    
           {isToggleAuthorized && (    
             <DropdownMenuItem onClick={handleChangeStatus} className="hover:cursor-pointer hover:bg-gray-50">
          <div>
                                                     Set to {otherStatusLabel}

          </div>
                       </DropdownMenuItem>)} 
           {isdeleteAuthorized && (      
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 hover:bg-gray-50 hover:cursor-pointer font-semibold">
             
          <div>
                                 Delete
          </div>
                    </DropdownMenuItem>     )} 
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
