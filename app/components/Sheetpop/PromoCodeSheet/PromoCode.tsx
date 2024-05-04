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
import { CirclePlusIcon, MessageCircle, MessageCirclePlusIcon, Plus, PlusCircle } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckboxReactHookFormMultipleDriver } from '../Notification/FormselectDriver'
import { CheckboxReactHookFormMultipleUser } from '../Notification/FormSelect'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PromoCalendarForm } from '@/app/(pages)/PromoCode/Calendar'
 
type Props = {}

function PromoCodeSheet({}: Props) {
  return (
<Sheet>
  <SheetTrigger className='flex items-center'><Button className=' 
  text-[12px] bg-[#0A8791] py-2 h-fit'>
    <CirclePlusIcon className='mr-1' size={12}/>
  Add Code
  </Button>
  </SheetTrigger>
  <SheetContent className='z-[9999]'>
  <ScrollArea className="h-full w-[350px] ">
            <SheetHeader>
              <SheetTitle >Add Promo Code </SheetTitle>
              <SheetDescription>
                 Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Pcode" className="text-left">
                  Code
                </Label>
                <Input id="Pcode" placeholder='Enter Code' className="col-span-3" />
              </div>

              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="ModelName" className="text-left">
                  User Type
                </Label>
                <Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select User Type" />
  </SelectTrigger>
  <SelectContent className='z-[99999]'>
  <SelectItem value="User">User</SelectItem>
  <SelectItem value="Driver">Driver</SelectItem>
  <SelectItem value="All">All</SelectItem>
  </SelectContent>
</Select>
              </div> 
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="ModelName" className="text-left">
                  Coupon Type
                </Label>
                <Select>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Select Coupon Type" />
  </SelectTrigger>
  <SelectContent className='z-[99999]'>
  <SelectItem value="Percentage">Percentage</SelectItem>
  <SelectItem value="Numeric">Numeric</SelectItem>
  </SelectContent>
</Select>
              </div> 
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="CountNum" className="text-left">
                  Count Number
                </Label>
                <Input type='number' min={0} id="CountNum" placeholder='Enter Count Number' className="col-span-3" />
              </div>

              <div className="grid grid-cols-1 items-center gap-4">
                <PromoCalendarForm/>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
            </ScrollArea>
          </SheetContent>
</Sheet>
  )
}

export default PromoCodeSheet  