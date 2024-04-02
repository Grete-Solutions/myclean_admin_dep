'use client'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Plus, PlusCircle } from 'lucide-react'
 
type Props = {}

function VehicleMakeSheet({}: Props) {
  return (
<Sheet>
  <SheetTrigger className='flex items-center'><Button className=' text-[12px] bg-[#0A8791] py-2 h-fit'><PlusCircle className='mr-1' size={12}/>Add </Button></SheetTrigger>
  <SheetContent className='z-[9999999]'>
            <SheetHeader>
              <SheetTitle >Add </SheetTitle>
              <SheetDescription>
                 Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Vehicle Make Name
                </Label>
                <Input id="name" placeholder=' Name' className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="VehicleMakeFor" className="text-left">
                  Vehicle Make For
                </Label>
                <Input id="VehicleMakeFor" placeholder="VehicleMake" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
</Sheet>
  )
}

export default VehicleMakeSheet  