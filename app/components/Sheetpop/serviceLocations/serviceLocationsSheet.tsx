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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ComboboxForm } from '@/app/(pages)/serviceLocations/Comoboxcountry'

type Props = {}

function ServiceLocationsSheet({}: Props) {
  return (
<Sheet>
  <SheetTrigger className='flex items-center'><Button className=' text-[12px] bg-[#0A8791] py-2 h-fit'><PlusCircle className='mr-1' size={12}/>Add </Button></SheetTrigger>
  <SheetContent className='z-[99998] h-full'>
            <SheetHeader>
              <SheetTitle >Add </SheetTitle>
              <SheetDescription>
                 Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-10 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Country" className="text-left">
                  Country
                </Label>
                <ComboboxForm/>

              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="City" className="text-left">
                  City
                </Label>
                <Input id="City" placeholder='Enter City' className="col-span-3" />

              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Price" className="text-left">
                  Price
                </Label>
                <Input id="Price" placeholder='Enter Price' className="col-span-3" />
              </div>

              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="City" className="text-left">
                  Status
                </Label>
                <Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Status" />
  </SelectTrigger>
  <SelectContent className='z-[99999]'>
  <SelectItem value="Select Status">Select Status</SelectItem>
  <SelectItem value="Active">Active</SelectItem>
  <SelectItem value="Inactive">Inactive</SelectItem>


  </SelectContent>
</Select>
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

export default ServiceLocationsSheet  