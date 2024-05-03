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
  <SheetContent className='z-[9999999]'>
  <ScrollArea className="h-full w-[350px] ">
            <SheetHeader>
              <SheetTitle >Add Promo Code </SheetTitle>
              <SheetDescription>
                 Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
 <Label htmlFor="pushTitle" className="text-left">
 Select Area
                </Label>
    <ScrollArea className="h-fit max-h-[200px] w-[350px] rounded-md border p-1">
  <CheckboxReactHookFormMultipleUser/>
  </ScrollArea>
              </div>
          
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Pcode" className="text-left">
                  Code
                </Label>
                <Input id="Pcode" placeholder='Enter Code' className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Minimum Trade Amount" className="text-left">
                  Minimum Trade Amount
                </Label>
                <Input id="Minimum Trade Amount" placeholder="Enter your Minimum Trade Amount" className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="MaximumTradeAmount" className="text-left">
                  Maximum Trade Amount
                </Label>
                <Input id="MaximumTradeAmount" placeholder="Enter your Maximum Trade Amount" className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="DiscountPercentage" className="text-left">
                  Discount Percentage
                </Label>
                <Input id="DiscountPercentage" placeholder="Enter your Discount Percentage" className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="From" className="text-left">
                  From
                </Label>
                <Input id="From" placeholder="From" className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="To" className="text-left">
                  To
                </Label>
                <Input id="To" placeholder="To" className="col-span-3" />
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