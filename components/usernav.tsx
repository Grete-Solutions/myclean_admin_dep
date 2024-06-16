import React, { useState, useEffect, useCallback } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface PriviledgeData {
  id: string;
  name: string;
}

export function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const [privilegeName, setPrivilegeName] = useState<string>('');

  const fetchPrivilegeName = useCallback(async () => {
    try {
      if (session && session.user && session.user.role) {
        const role = session.user.role;
        const response = await fetch(`/lib/GET/Priveledges/getPrivilegeName?id=${role}`);
        if (!response.ok) {
          throw new Error('Failed to fetch privilege name');
        }
        const data = await response.json();
        setPrivilegeName(data.name || 'Super Admin');
      }
    } catch (error) {
      console.error('Error fetching privilege name:', error);
    }
  }, [session]);

  useEffect(() => {
    fetchPrivilegeName();
  }, [fetchPrivilegeName]);

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
            {/* Display privilege name fetched asynchronously */}
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
          <Link href="">
            <button onClick={(e) => {
              e.preventDefault();
              signOut();
              router.push('/login');
            }}>
              Log out
            </button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
