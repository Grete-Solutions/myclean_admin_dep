import React, { useState, useEffect, useCallback } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar,  AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



interface PriviledgeData {
    id: string;
    country: string;
    city: string;
    isDelete: number;
    name: string;
    description: string;
    slug: string;
    status: number;
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
  }

export function UserNav() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [privilege, setPrivilege]=useState<PriviledgeData[]>([])
    const [privilegeMap, setPrivilegeMap] = useState(new Map());
    const [privilegeName, setPrivilegeName] = useState('');

    const fetchPrivilegeData = useCallback(async () => {
        try {
            const response = await fetch('/lib/GET/Priveledges/getallPriveledges');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPrivilege(Array.isArray(data.product) ? data.product : []);
        } catch (error) {
            console.error('Error fetching privilege data:', error);
        }
    }, []);

    useEffect(() => {
        fetchPrivilegeData();
    }, [fetchPrivilegeData]);

    useEffect(() => {
        const privilegeMap = new Map(privilege.map(priv => [priv.id, priv.name]));
        setPrivilegeMap(privilegeMap);
    }, [privilege]);

    useEffect(() => {
        if (session && session.user && session.user.role) {
            const role = session.user.role;
            const privilegeName = privilegeMap.get(role) || 'Super Admin';
            setPrivilegeName(privilegeName);
        }
    }, [session, privilegeMap]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/02.png" alt="" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-[99998]">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session?.user.email}
                        </p>
                        {/* Display privilege name fetched from the API */}
                        <p className="text-xs leading-none text-muted-foreground">
                            {privilegeName}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href='/profile'>
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href='/settings'>
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                        <button onClick={(e) => {
                            e.preventDefault();
                            signOut();
                            router.push('/login');
                        }}>
                            Log out
                        </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
