import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetFooter, SheetClose, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {}

function VehicleMakeSheet({}: Props) {
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // State to hold selected status value

// Function to handle status selection
const handleStatusChange = (value: string) => {
  setSelectedStatus(value);
};
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    capacity: '',
    description: '',
    status: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/lib/POST/postVehicleMake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, status: selectedStatus }), // Include selected status in form data
      });
      // Handle success
      console.log
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Sheet>
        <SheetTrigger className='flex items-center'><Button className=' text-[12px] bg-[#0A8791] py-2 h-fit'><PlusCircle className='mr-1' size={12}/>Add </Button></SheetTrigger>
    <form onSubmit={handleSubmit}>
  <SheetContent className='z-[9999]'>
            <SheetHeader>
              <SheetTitle >Add </SheetTitle>
              <SheetDescription>
                 Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="make" className="text-left">
                Vehicle Make
              </Label>
              <Input
                id="make"
                name="make"
                placeholder="Enter vehicle make"
                value={formData.make}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="model" className="text-left">
                Vehicle Model
              </Label>
              <Input
                id="model"
                name="model"
                placeholder="Enter vehicle model"
                value={formData.model}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="year" className="text-left">
                Year
              </Label>
              <Input
                id="year"
                name="year"
                placeholder="Enter year"
                value={formData.year}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="capacity" className="text-left">
                Capacity
              </Label>
              <Input
                id="capacity"
                name="capacity"
                type="number"
                placeholder="Enter capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="status" className="text-left">
                Status
              </Label>
              <Select>
  <SelectTrigger className="w-full">
  <SelectValue placeholder="Select Status" />
  </SelectTrigger>
  <SelectContent className='z-[999999]'>
  <SelectItem value="Active" onClick={() => handleStatusChange("Active")}>Active</SelectItem>
<SelectItem value="Inactive" onClick={() => handleStatusChange("Inactive")}>Inactive</SelectItem>
 </SelectContent>
</Select>  
            </div>
          </div>
       
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> </SheetContent>
      </form>
    </Sheet>
  );
}

export default VehicleMakeSheet;