'use client';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageCirclePlusIcon } from 'lucide-react';
import { Select as UISelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

const RichTextEditor = dynamic(() => import('react-quill'), { ssr: false });

interface Users {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  userType: number;
  fcmToken: string;
  email: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  deactivated: number;
  suspended: number;
  status: string;
}

interface Drivers {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  userType: number;
  fcmToken: string;
  email: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  deactivated: number;
  suspended: number;
  status: string;
}

function NotificationSheet({ onAddSuccess }: { onAddSuccess: () => void }) {
  const [registrationToken, setRegistrationToken] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = React.useState<Users[]>([]);
  const [drivers, setDrivers] = React.useState<Drivers[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ value: string; label: string }[]>([]);
  const [selectedDrivers, setSelectedDrivers] = useState<{ value: string; label: string }[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const fetchUsersAndDrivers = async () => {
      try {
        const [usersResponse, driversResponse] = await Promise.all([
          fetch('/lib/GET/User/getallUsers'),
          fetch('/lib/GET/Driver/getallDrivers'),
        ]);
        if (!usersResponse.ok || !driversResponse.ok) {
          throw new Error('Failed to fetch users or drivers');
        }
        const [usersData, driversData] = await Promise.all([
          usersResponse.json(),
          driversResponse.json(),
        ]);
        console.log('Fetched users:', usersData.product);
        console.log('Fetched drivers:', driversData.product);
        if (!Array.isArray(usersData.product) || !Array.isArray(driversData.product)) {
          throw new Error('Failed to fetch users or drivers');
        }
        setUsers(usersData.product);
        setDrivers(driversData.product);
      } catch (error) {
        console.error('Error fetching users or drivers:', error);
      }
    };

    fetchUsersAndDrivers();
  }, []);

  const handleUsersChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setSelectedUsers(newValue as { value: string; label: string }[]);
  };

  const handleDriversChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setSelectedDrivers(newValue as { value: string; label: string }[]);
  };

  const selectAllUsers = () => {
    const userOptions = users.map(user => ({ value: user.fcmToken, label: `${user.firstname} ${user.lastname}` }));
    setSelectedUsers(userOptions);
  };

  const deselectAllUsers = () => {
    setSelectedUsers([]);
  };

  const selectAllDrivers = () => {
    const driverOptions = drivers.map(driver => ({ value: driver.fcmToken, label: `${driver.firstname} ${driver.lastname}` }));
    setSelectedDrivers(driverOptions);
  };

  const deselectAllDrivers = () => {
    setSelectedDrivers([]);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !priority || !body || (selectedUsers.length === 0 && selectedDrivers.length === 0)) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/lib/POST/postNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationToken,
          title,
          body,
          priority,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onAddSuccess();
      toast({ title: "Success", variant: 'success', description: "Notification Sent successfully" });
    } catch (error) {
      console.error('Error submitting notification:', error);
      setError('Failed to send notification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = users.map(user => ({ value: user.fcmToken, label: `${user.firstname} ${user.lastname}` }));
  const driverOptions = drivers.map(driver => ({ value: driver.fcmToken, label: `${driver.firstname} ${driver.lastname}` }));

  return (
    <Sheet>
      <SheetTrigger className='flex items-center'>
        <Button className='text-[12px] bg-[#0A8791] py-2 h-fit'>
          <MessageCirclePlusIcon className='mr-1' size={12} /> Push
        </Button>
      </SheetTrigger>
      <SheetContent className='z-[999]'>
        <ScrollArea className='h-full'>
          <SheetHeader>
            <SheetTitle>Push Notification</SheetTitle>
            <SheetDescription>Click save when you&apos;re done.</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSave}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center ">
                <Label htmlFor="users" className="text-left">Users</Label>
                <div className="flex gap-2">
                  <Button className='bg-transparent outline-none hover:bg-transparent hover:text-[#0a88914e]  text-[#0A8791] p-0 ' type="button" onClick={selectAllUsers}>Select All Users</Button>
                  <Button className='bg-transparent outline-none hover:bg-transparent hover:text-[#0a88914e]  text-[#0A8791] p-0 ' type="button" onClick={deselectAllUsers}>Deselect All Users</Button>
                </div>
                <Select
                  isMulti
                  options={userOptions}
                  onChange={handleUsersChange}
                  value={selectedUsers}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 items-center ">
                <Label htmlFor="drivers" className="text-left">Drivers</Label>
                <div className="flex gap-2">
                  <Button className='bg-transparent outline-none hover:bg-transparent hover:text-[#0a88914e] text-[#0A8791] p-0 ' type="button" onClick={selectAllDrivers}>Select All Drivers</Button>
                  <Button className='bg-transparent outline-none hover:bg-transparent hover:text-[#0a88914e]  text-[#0A8791] p-0 ' type="button" onClick={deselectAllDrivers}>Deselect All Drivers</Button>
                </div>
                <Select
                  isMulti
                  options={driverOptions}
                  onChange={handleDriversChange}
                  value={selectedDrivers}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="pushTitle" className="text-left">Push Title</Label>
                <Input
                  id="pushTitle"
                  placeholder='Title'
                  className="col-span-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="priority" className="text-left">Priority</Label>
                <UISelect onValueChange={setPriority}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent className='z-[9999]'>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="normal">Low</SelectItem>
                  </SelectContent>
                </UISelect>
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="body" className="text-left">Body</Label>
                <RichTextEditor theme="snow" value={body} onChange={setBody} />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className='bg-[#0A8791]'>
                  {isSubmitting ? 'Sending...' : 'Send Notification'}
                </Button>
              </SheetClose>
            </SheetFooter>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationSheet;
