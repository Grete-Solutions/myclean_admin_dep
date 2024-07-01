'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { useToast } from '@/components/ui/use-toast';

const RichTextEditor = dynamic(() => import('react-quill'), { ssr: false });

interface Users {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

function NotificationPage() {
  const [registrationToken, setRegistrationToken] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = React.useState<Users[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ value: string; label: string }[]>([]);

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

        if (!Array.isArray(usersData.product) || !Array.isArray(driversData.product)) {
          throw new Error('Failed to fetch users or drivers');
        }
        setUsers(usersData.product);
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

  const selectAllUsers = () => {
    const userOptions = users.map(user => ({ value: user.email, label: `${user.firstname} ${user.lastname}` }));
    setSelectedUsers(userOptions);
  };

  const deselectAllUsers = () => {
    setSelectedUsers([]);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !message || selectedUsers.length === 0) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // const sanitizedMessage = message.replace(/<\/?[^>]+(>|$)/g, "");

      for (const user of selectedUsers) {
        const response = await fetch('/lib/POST/postUserNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            message,
            email: user.value, 
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        toast({ title: "Success",variant:'success', description: `Notification sent to ${user.label} successfully` });
      }
    } catch (error) {
      console.error('Error submitting notification:', error);
      setError('Failed to send notification.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const userOptions = users.map(user => ({ value: user.email, label: `${user.firstname} ${user.lastname}` }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Push Notification</h1>
      <form onSubmit={handleSave}>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Button className='bg-transparent text-[#0A8791] p-0' type="button" onClick={selectAllUsers}>Select All Users</Button>
            <Button className='bg-transparent text-[#0A8791] p-0' type="button" onClick={deselectAllUsers}>Deselect All Users</Button>
          </div>
          <Select
            isMulti
            options={userOptions}
            onChange={handleUsersChange}
            value={selectedUsers}
            className="w-full"
          />
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="title" className="text-left"> Title</Label>
            <input
              id="title"
              placeholder='Enter Title'
              className="border border-gray-300 p-2 rounded-md w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="message" className="text-left">Message</Label>
            <RichTextEditor
              value={message}
              onChange={setMessage}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NotificationPage;
