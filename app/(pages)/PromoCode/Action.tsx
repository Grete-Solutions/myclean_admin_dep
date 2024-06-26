import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PenBox, Trash } from "lucide-react"; 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
    id: string; 
    status: number; 
    onDelete: number;
    refreshData: () => void; 
}

export function Actionbutton({ id, status, onDelete, refreshData }: ActionButtonProps) {
   const { toast } = useToast();
   const router = useRouter();
   const [isAuthorized, setIsAuthorized] = useState(false);
   const [isdeleteAuthorized, setIsDeleteAuthorized] = useState(false); 
   const {data:session}= useSession()
 
   const fetchPermission = async () => {
     if (!session) return; 
     const id = session.user.role;
     const field_name = 'add_promocode';
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
    const field_name = 'delete_roles';
    try {
      const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setIsDeleteAuthorized(session?.user.role === 'Super Admin'|| session?.user.role === 'Super Admin'|| result.product === 1  );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
   useEffect(() => {
    fetchDeletePermission()
     fetchPermission();
   }, [session]); 

    const handleEdit = () => {
        router.push(`PromoCode/edit?id=${id}`);
    };

    const handleChangeStatus = async () => {
        try {
            const response = await fetch(`/lib/PUT/PromoCode/updateStatusByID?id=${id}`, {
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
            const response = await fetch(`/lib/DELETE/PromoCode/deleteByID?id=${id}`, {
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

    const otherStatusLabel = status === 1 ? 'Inactive' : 'Active';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <PenBox className="hover:cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
                               {isAuthorized && (
 <DropdownMenuItem className="hover:cursor-pointer hover:bg-gray-50" onClick={handleEdit}>
          <div>
                                 Edit
          </div>
                            </DropdownMenuItem>  )} 
                <DropdownMenuItem onClick={handleChangeStatus} className="hover:cursor-pointer hover:bg-gray-50">
                    Set to {otherStatusLabel}
                </DropdownMenuItem>
                             {isdeleteAuthorized && (
   <DropdownMenuItem onClick={handleDelete} className="text-red-600 hover:bg-gray-50 hover:cursor-pointer font-semibold">
          <div>
                                 Delete
          </div>
                       </DropdownMenuItem>)}  
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
