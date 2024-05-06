'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Actionbutton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                   <PenBox className="hover:cursor-pointer"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit ">
                <Link href='/Edit'><DropdownMenuItem>
                    Edit
                </DropdownMenuItem></Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}