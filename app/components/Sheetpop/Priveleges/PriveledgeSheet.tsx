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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CountryDataType,Countrydata } from '../../countryConstants'
import { ComboboxForm } from '@/app/(pages)/Configurations/priveleges/Comoboxcountry'
 
type Props = {}

function PriveledgeSheet({}: Props) {
  return (
<Sheet>
  <SheetTrigger className='flex items-center'><Button className=' text-[12px] bg-[#0A8791] py-2 h-fit'><PlusCircle className='mr-1' size={12}/>Add </Button></SheetTrigger>
  <SheetContent className='z-[999]'>
            <SheetHeader>
              <SheetTitle >Add </SheetTitle>
              <SheetDescription>
                 Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Slug" className="text-left">
                Slug
                </Label>
                <Input id="Slug" placeholder=' Slug' className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Name" className="text-left">
                  Name
                </Label>
                <Input id="Name" placeholder="Name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Description" className="text-left">
                  Description
                </Label>
                <Input id="Description" placeholder="Description" className="col-span-3" />
              </div>
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
                <Input id="City" placeholder="City" className="col-span-3" />

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

export default PriveledgeSheet  