'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast, useToast } from '@/components/ui/use-toast';

type Timestamp = {
  _seconds: number;
  _nanoseconds: number;
};

type Data = {
  id: string;
  name: string;
  toggle_vehicle_make: number;
  edit_drivers: number;
  driver_payment_history: number;
  finance_report: number;
  view_requests: number;
  edit_complaint_title: number;
  cancellation_rides: number;
  driver_document_edit: number;
  add_complaint_title: number;
  driver_withdrawal_request_view: number;
  manage_driver_needed_document: number;
  view_driver_withdrawal_requests: number;
  driver_document: number;
  get_all_perm: number;
  driver_document_upload: number;
  view_driver_profile: number;
  delete_service_location: number;
  updatedAt: Timestamp;
  delete_admin: number;
  get_all_roles: number;
  negative_driver_view: number;
  delete_notification: number;
  edit_user: number;
  edit_vehicle_make: number;
  toggle_complaint_title: number;
  driver_document_toggle: number;
  scheduled_rides: number;
  user_report: number;
  toggle_drivers: number;
  delete_complaint_title: number;
  edit_roles: number;
  add_drivers: number;
  driver_document_view: number;
  view_system_set: number;
  driver_document_view_image: number;
  view_request_list: number;
  drivers_menu: number;
  view_driver_ratings: number;
  view_rides: number;
  notifications: number;
  get_all_users: number;
  add_vehicle_make: number;
  driver_duties_report: number;
  view_all_settings: number;
  add_admin: number;
  toggle_admin_status: number;
  view_vehicle_types: number;
  manage_vehicle_make: number;
  edit_service_location: number;
  view_approval_pending_drivers: number;
  create_role: number;
  delete_driver_needed_document: number;
  edit_driver_needed_document: number;
  edit_vehicle_types: number;
  view_drivers: number;
  toggle_user: number;
  view_negative_balance_drivers: number;
  toggle_vehicle_types: number;
  view_notifications: number;
  driver_report: number;
  toggle_service_location: number;
  update_drivers: number;
  edit_admin: number;
  send_push_notifications: number;
  add_vehicle_types: number;
  delete_vehicle_make: number;
  user_payment_history: number;
  delete_vehicle_types: number;
  view_user_request_list: number;
  add_driver_needed_document: number;
  view_trans: number;
  toggle_driver_needed_document: number;
  manage_country: number;
  delete_drivers: number;
  view_driver_rating: number;
  delete_user: number;
  add_service_location: number;
  add_users: number;
};

  interface AccordionItemData {
    value: string;
    triggerText: string;
    content: JSX.Element;
  }export default function EditPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <EditPageContent />
      </Suspense>
    );
  }
  
  const EditPageContent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [privilegedData, setPrivilegedData] = useState<Data | undefined>(undefined);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const privilegeId = searchParams.get('id') as string;
  
    useEffect(() => {
      const getPrivilegesById = async () => {
        if (!privilegeId) return;
  
        try {
          const response = await fetch(`/lib/GET/Priveledges/getByPriveledgeID?id=${privilegeId}`);
  
          if (!response.ok) {
            throw new Error('Failed to fetch privilege data');
          }
  
          const data = await response.json();
          setPrivilegedData(data.product);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      getPrivilegesById();
    }, [privilegeId]);
  
    const handleToggle = async (privilegeKey: keyof Data) => {
      if (!privilegeId) return;
  
      const updatedPrivilege = privilegedData ? (privilegedData[privilegeKey] === 1 ? 0 : 1) : 1;
  
      try {
        const response = await fetch(`/lib/PUT/Priveledge/updatePrivilegeByID?id=${privilegeId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: privilegeId,
            value: updatedPrivilege,
            privilege: privilegeKey,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update privilege data');
        }
  
        const updatedData = await response.json();
        setPrivilegedData(prevData => prevData && ({
          ...prevData,
          [privilegeKey]: updatedPrivilege,
        }));
        toast({ title: "Success", description: "Privilege changed successfully" });
  
      } catch (error: any) {
        setError(error.message);
      }
    };
   const accordionItems: AccordionItemData[] = [
    {
        value: 'item-1',
        triggerText: 'Dashboard',
        content: (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Access Dashboard
            </label>
          </div>
        ),
      },
      {
        value: 'item-2',
        triggerText: 'Configurations',
        content: (
          <div className='flex flex-col space-y-2'>
            <div className="flex items-center space-x-2">
              <Checkbox id="Get-All-Roles" checked={privilegedData?.get_all_roles === 1} onCheckedChange={() => handleToggle('get_all_roles')} />
              <label
                htmlFor="Get-All-Roles"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Get All Roles
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edit-roles" checked={privilegedData?.edit_roles === 1} onCheckedChange={() => handleToggle('edit_roles')} />
              <label
                htmlFor="edit-roles"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Edit Roles
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="create-roles" checked={privilegedData?.create_role === 1} onCheckedChange={() => handleToggle('create_role')} />
              <label
                htmlFor="create-roles"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Create Roles
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="Get-All-Permissions" checked={privilegedData?.get_all_perm === 1} onCheckedChange={() => handleToggle('get_all_perm')} />
              <label
                htmlFor="Get-All-Permissions"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Get All Permissions
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="view-all-settings" checked={privilegedData?.view_all_settings === 1} onCheckedChange={() => handleToggle('view_all_settings')} />
              <label
                htmlFor="view-all-settings"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                View All Settings
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="view-system-settings" checked={privilegedData?.view_system_set === 1} onCheckedChange={() => handleToggle('view_system_set')} />
              <label
                htmlFor="view-system-settings"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                View System Settings
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="view-translations" checked={privilegedData?.view_trans === 1} onCheckedChange={() => handleToggle('view_trans')} />
              <label
                htmlFor="view-translations"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                View Translations
              </label>
            </div>
          </div>
        ),
      },
      {
        value: 'item-3',
        triggerText: 'Master Data',
        content: (
          <div className='flex flex-col space-y-2'>
            <div className="flex items-center space-x-2">
              <Checkbox id="master-data" checked={privilegedData?.view_trans === 1} onCheckedChange={() => handleToggle('view_trans')} />
              <label
                htmlFor="master-data"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Master Data
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="manage-carmake" checked={privilegedData?.manage_vehicle_make === 1} onCheckedChange={() => handleToggle('manage_vehicle_make')} />
              <label
                htmlFor="manage-carmake"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Manage Car Make
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="add-carmake" checked={privilegedData?.add_vehicle_make === 1} onCheckedChange={() => handleToggle('add_vehicle_make')} />
              <label
                htmlFor="add-carmake"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add Car Make
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edit-carmake" checked={privilegedData?.edit_vehicle_make === 1} onCheckedChange={() => handleToggle('edit_vehicle_make')} />
              <label
                htmlFor="edit-carmake"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Edit Car Make
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="delete-carmake" checked={privilegedData?.delete_vehicle_make === 1} onCheckedChange={() => handleToggle('delete_vehicle_make')} />
              <label
                htmlFor="delete-carmake"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Delete Car Make
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="toggle-carmake" checked={privilegedData?.toggle_vehicle_make === 1} onCheckedChange={() => handleToggle('toggle_vehicle_make')} />
              <label
                htmlFor="toggle-carmake"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Toggle Car Make
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="manage-driver-needed-document" checked={privilegedData?.manage_driver_needed_document === 1} onCheckedChange={() => handleToggle('manage_driver_needed_document')} />
              <label
                htmlFor="manage-driver-needed-document"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Manage Driver-Needed Document
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="add-driver-needed-document" checked={privilegedData?.add_driver_needed_document === 1} onCheckedChange={() => handleToggle('add_driver_needed_document')} />
              <label
                htmlFor="add-driver-needed-document"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add Driver-Needed Document
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edit-driver-needed-document" checked={privilegedData?.edit_driver_needed_document === 1} onCheckedChange={() => handleToggle('edit_driver_needed_document')} />
              <label
                htmlFor="edit-driver-needed-document"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Edit Driver-Needed Document
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="delete-driver-needed-document" checked={privilegedData?.delete_driver_needed_document === 1} onCheckedChange={() => handleToggle('delete_driver_needed_document')} />
              <label
                htmlFor="delete-driver-needed-document"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Delete Driver-Needed Document
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="toggle-driver-needed-document" checked={privilegedData?.toggle_driver_needed_document === 1} onCheckedChange={() => handleToggle('toggle_driver_needed_document')} />
              <label
                htmlFor="toggle-driver-needed-document"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Toggle Driver-Needed Document
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="manage-country" checked={privilegedData?.manage_country === 1} onCheckedChange={() => handleToggle('manage_country')} />
              <label
                htmlFor="manage-country"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Manage Country
              </label>
            </div>
          </div>
      )
  },
  
 {
    value: "item-4",
    triggerText: "Service Locations",
    content: (
        <div className='flex flex-col space-y-2'>
            <div className="flex items-center space-x-2">
                <Checkbox id="add_service_location" checked={privilegedData?.add_service_location === 1} onCheckedChange={() => handleToggle('add_service_location')} />
                <label
                    htmlFor="add_service_location"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Add Service Location
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="edit_service_location" checked={privilegedData?.edit_service_location === 1} onCheckedChange={() => handleToggle('edit_service_location')} />
                <label
                    htmlFor="edit_service_location"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Edit Service Location
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="delete_service_location" checked={privilegedData?.delete_service_location === 1} onCheckedChange={() => handleToggle('delete_service_location')} />
                <label
                    htmlFor="delete_service_location"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Delete Service Location
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="toggle_service_location" checked={privilegedData?.toggle_service_location === 1} onCheckedChange={() => handleToggle('toggle_service_location')} />
                <label
                    htmlFor="toggle_service_location"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Toggle Service Location
                </label>
            </div>
        </div>
    ),
},

{
    value: "item-5",
    triggerText: "Admins",
    content: (
        <div className='flex flex-col space-y-2'>
            <div className="flex items-center space-x-2">
                <Checkbox id="add-admin" checked={privilegedData?.add_admin === 1} onCheckedChange={() => handleToggle('add_admin')} />
                <label
                    htmlFor="add-admin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Add Admin
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="edit-admin" checked={privilegedData?.edit_admin === 1} onCheckedChange={() => handleToggle('edit_admin')} />
                <label
                    htmlFor="edit-admin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Edit Admin
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="delete-admin" checked={privilegedData?.delete_admin === 1} onCheckedChange={() => handleToggle('delete_admin')} />
                <label
                    htmlFor="delete-admin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Delete Admin
                </label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="toggle-admin-status" checked={privilegedData?.toggle_admin_status === 1} onCheckedChange={() => handleToggle('toggle_admin_status')} />
                <label
                    htmlFor="toggle-admin-status"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Toggle Admin Status
                </label>
            </div>
        </div>
    ),
},

{
    value: "item-6",
    triggerText: "Pickup Requests",
    content: (
        <div className='flex flex-col space-y-2'>
            <div className="flex items-center space-x-2">
                <Checkbox id="view-requests" checked={privilegedData?.view_requests === 1} onCheckedChange={() => handleToggle('view_requests')} />
                <label
                    htmlFor="view-requests"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    View Requests
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="view-rides" checked={privilegedData?.view_rides === 1} onCheckedChange={() => handleToggle('view_rides')} />
                <label
                    htmlFor="view-rides"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    View Rides
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="scheduled-rides" checked={privilegedData?.scheduled_rides === 1} onCheckedChange={() => handleToggle('scheduled_rides')} />
                <label
                    htmlFor="scheduled-rides"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Scheduled Rides
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="cancellation-rides" checked={privilegedData?.cancellation_rides === 1} onCheckedChange={() => handleToggle('cancellation_rides')} />
                <label
                    htmlFor="cancellation-rides"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Cancellation Rides
                </label>
            </div>
        </div>
    ),
},

{
    value: "item-7",
    triggerText: "Vehicle Types",
    content: (
        <div className='flex flex-col space-y-2'>
            <div className="flex items-center space-x-2">
                <Checkbox id="view-vehicle-types" checked={privilegedData?.view_vehicle_types === 1} onCheckedChange={() => handleToggle('view_vehicle_types')} />
                <label
                    htmlFor="view-vehicle-types"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    View Vehicle Types
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="add-vehicle-types" checked={privilegedData?.add_vehicle_types === 1} onCheckedChange={() => handleToggle('add_vehicle_types')} />
                <label
                    htmlFor="add-vehicle-types"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Add Vehicle Types
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="edit-vehicle-types" checked={privilegedData?.edit_vehicle_types === 1} onCheckedChange={() => handleToggle('edit_vehicle_types')} />
                <label
                    htmlFor="edit-vehicle-types"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Edit Vehicle Types
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="delete-vehicle-types" checked={privilegedData?.delete_vehicle_types === 1} onCheckedChange={() => handleToggle('delete_vehicle_types')} />
                <label
                    htmlFor="delete-vehicle-types"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Delete Vehicle Types
                </label>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="toggle-vehicle-types" checked={privilegedData?.toggle_vehicle_types === 1} onCheckedChange={() => handleToggle('toggle_vehicle_types')} />
                <label
                    htmlFor="toggle-vehicle-types"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Toggle Vehicle Types
                </label>
            </div>
        </div>
  ),
},

{
    value: "item-8",
    triggerText: "Manage Drivers",
    content: (
        <div className='flex flex-col space-y-2'>
            {/* drivers-menu */}
            <div className="flex items-center space-x-2">
                <Checkbox id="drivers-menu" checked={privilegedData?.drivers_menu === 1} onCheckedChange={() => handleToggle('drivers_menu')} />
                <label
                    htmlFor="drivers-menu"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    drivers-menu
                </label>
            </div>

            {/* view-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-drivers" checked={privilegedData?.view_drivers === 1} onCheckedChange={() => handleToggle('view_drivers')} />
                <label
                    htmlFor="view-drivers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-drivers
                </label>
            </div>

            {/* view-approval-pending-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-approval-pending-drivers" checked={privilegedData?.view_approval_pending_drivers === 1} onCheckedChange={() => handleToggle('view_approval_pending_drivers')} />
                <label
                    htmlFor="view-approval-pending-drivers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-approval-pending-drivers
                </label>
            </div>

            {/* view-driver-ratings */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-driver-ratings" checked={privilegedData?.view_driver_ratings === 1} onCheckedChange={() => handleToggle('view_driver_ratings')} />
                <label
                    htmlFor="view-driver-ratings"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-driver-ratings
                </label>
            </div>

            {/* view-driver-withdrawal-requests */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-driver-withdrawal-requests" checked={privilegedData?.view_driver_withdrawal_requests === 1} onCheckedChange={() => handleToggle('view_driver_withdrawal_requests')} />
                <label
                    htmlFor="view-driver-withdrawal-requests"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-driver-withdrawal-requests
                </label>
            </div>

            {/* view-negative-balance-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-negative-balance-drivers" checked={privilegedData?.view_negative_balance_drivers === 1} onCheckedChange={() => handleToggle('view_negative_balance_drivers')} />
                <label
                    htmlFor="view-negative-balance-drivers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-negative-balance-drivers
                </label>
            </div>

            {/* edit-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="edit-drivers" checked={privilegedData?.edit_drivers === 1} onCheckedChange={() => handleToggle('edit_drivers')} />
                <label
                    htmlFor="edit-drivers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    edit-drivers
                </label>
            </div>

            {/* toggle-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="toggle-drivers" checked={privilegedData?.toggle_drivers === 1} onCheckedChange={() => handleToggle('toggle_drivers')} />
                <label
                    htmlFor="toggle-drivers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    toggle-drivers
                </label>
            </div>

            {/* view-request-list */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-request-list" checked={privilegedData?.view_request_list === 1} onCheckedChange={() => handleToggle('view_request_list')} />
                <label
                    htmlFor="view-request-list"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-request-list
                </label>
            </div>

            {/* driver-payment-history */}
            <div className="flex items-center space-x-2">
                <Checkbox id="driver-payment-history" checked={privilegedData?.driver_payment_history === 1} onCheckedChange={() => handleToggle('driver_payment_history')} />
                <label
                    htmlFor="driver-payment-history"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    driver-payment-history
                </label>
            </div>

            {/* view-driver-profile */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-driver-profile" checked={privilegedData?.view_driver_profile === 1} onCheckedChange={() => handleToggle('view_driver_profile')} />
                <label
                    htmlFor="view-driver-profile"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-driver-profile
                </label>
            </div>

            {/* add-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="add-drivers" checked={privilegedData?.add_drivers === 1} onCheckedChange={() => handleToggle('add_drivers')} />
                <label
                    htmlFor="add-drivers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    add-drivers
                </label>
            </div>

            {/* update-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="update-drivers" checked={privilegedData?.update_drivers === 1} onCheckedChange={() => handleToggle('update_drivers')} />
                <label
                    htmlFor="update-drivers"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    update-drivers
                </label>
            </div>

            {/* delete-drivers */}
            <div className="flex items-center space-x-2">
                <Checkbox id="delete-drivers" checked={privilegedData?.delete_drivers === 1} onCheckedChange={() => handleToggle('delete_drivers')} />
                <label
                    htmlFor="delete-drivers"
                    className="  text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    delete-drivers
                </label>
            </div>
          
            {/* driver-document-view */}
            <div className="flex items-center space-x-2">
                <Checkbox id="driver-document-view" checked={privilegedData?.driver_document_view === 1} onCheckedChange={() => handleToggle('driver_document_view')} />
                <label
                    htmlFor="driver-document-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    driver-document-view
                </label>
            </div>

            {/* driver-document-view-image */}
            <div className="flex items-center space-x-2">
                <Checkbox id="driver-document-view-image" checked={privilegedData?.driver_document_view_image === 1} onCheckedChange={() => handleToggle('driver_document_view_image')} />
                <label
                    htmlFor="driver-document-view-image"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    driver-document-view-image
                </label>
            </div>

            {/* driver-document-edit */}
            <div className="flex items-center space-x-2">
                <Checkbox id="driver-document-edit" checked={privilegedData?.driver_document_edit === 1} onCheckedChange={() => handleToggle('driver_document_edit')} />
                <label
                    htmlFor="driver-document-edit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    driver-document-edit
                </label>
            </div>

            {/* driver-document-upload */}
            <div className="flex items-center space-x-2">
                <Checkbox id="driver-document-upload" checked={privilegedData?.driver_document_upload === 1} onCheckedChange={() => handleToggle('driver_document_upload')} />
                <label
                    htmlFor="driver-document-upload"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    driver-document-upload
                </label>
            </div>

            {/* driver-document-toggle */}
            <div className="flex items-center space-x-2">
                <Checkbox id="driver-document-toggle" checked={privilegedData?.driver_document_toggle === 1} onCheckedChange={() => handleToggle('driver_document_toggle')} />
                <label
                    htmlFor="driver-document-toggle"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    driver-document-toggle
                </label>
            </div>

            {/* view-driver-rating */}
            <div className="flex items-center space-x-2">
                <Checkbox id="view-driver-rating" checked={privilegedData?.view_driver_rating === 1} onCheckedChange={() => handleToggle('view_driver_rating')} />
                <label
                    htmlFor="view-driver-rating"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    view-driver-rating
                </label>
            </div>

            {/* driver-withdrawal-request-view */}
            <div className="flex items-center space-x-2">
                <Checkbox id="driver-withdrawal-request-view" checked={privilegedData?.driver_withdrawal_request_view === 1} onCheckedChange={() => handleToggle('driver_withdrawal_request_view')} />
                <label
                    htmlFor="driver-withdrawal-request-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    driver-withdrawal-request-view
                </label>
            </div>

            {/* negative-driver-view */}
            <div className="flex items-center space-x-2">
                <Checkbox id="negative-driver-view" checked={privilegedData?.negative_driver_view === 1} onCheckedChange={() => handleToggle('negative_driver_view')} />
                <label
                    htmlFor="negative-driver-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    negative-driver-view
                </label>
            </div>
        </div>
        ),
    },
    {
        value: "item-9",
        triggerText: "Manage Users",
        content: (
            <div className='flex flex-col space-y-2'>
                {/* Get All Users */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="Get-All-users" checked={privilegedData?.get_all_users === 1} onCheckedChange={() => handleToggle('get_all_users')} />
                    <label
                        htmlFor="Get-All-users"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Get All Users
                    </label>
                </div>
      
                {/* Add Users */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="add-users" checked={privilegedData?.add_users === 1} onCheckedChange={() => handleToggle('add_users')} />
                    <label
                        htmlFor="add-users"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Add Users
                    </label>
                </div>
      
                {/* Edit User */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="edit-user" checked={privilegedData?.edit_user === 1} onCheckedChange={() => handleToggle('edit_user')} />
                    <label
                        htmlFor="edit-user"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Edit User
                    </label>
                </div>
      
                {/* Delete User */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="delete-user" checked={privilegedData?.delete_user === 1} onCheckedChange={() => handleToggle('delete_user')} />
                    <label
                        htmlFor="delete-user"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Delete User
                    </label>
                </div>
      
                {/* Toggle User */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="toggle-user" checked={privilegedData?.toggle_user === 1} onCheckedChange={() => handleToggle('toggle_user')} />
                    <label
                        htmlFor="toggle-user"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Toggle User
                    </label>
                </div>
      
                {/* View User Request List */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="view-user-request-list" checked={privilegedData?.view_user_request_list === 1} onCheckedChange={() => handleToggle('view_user_request_list')} />
                    <label
                        htmlFor="view-user-request-list"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        View User Request List
                    </label>
                </div>
      
                {/* User Payment History */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="user-payment-history" checked={privilegedData?.user_payment_history === 1} onCheckedChange={() => handleToggle('user_payment_history')} />
                    <label
                        htmlFor="user-payment-history"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        User Payment History
                    </label>
                </div>
            </div>
        ),
    },
    {
        value: "item-10",
        triggerText: "Chat",
        content: <div />,
    },
    {
        value: "item-11",
        triggerText: "Notification",
        content: (
            <div className='flex flex-col space-y-2'>
                {/* Notifications */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="notifications" checked={privilegedData?.notifications === 1} onCheckedChange={() => handleToggle('notifications')} />
                    <label
                        htmlFor="notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Notifications
                    </label>
                </div>
                  
                {/* View Notifications */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="view-notifications" checked={privilegedData?.view_notifications === 1} onCheckedChange={() => handleToggle('view_notifications')} />
                    <label
                        htmlFor="view-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        View Notifications
                    </label>
                </div>
                  
                {/* Send Push Notifications */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="send-push" checked={privilegedData?.send_push_notifications === 1} onCheckedChange={() => handleToggle('send_push_notifications')} />
                    <label
                        htmlFor="send-push"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Send Push Notifications
                    </label>
                </div>
                  
                {/* Delete Notification */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="delete-notification" checked={privilegedData?.delete_notification === 1} onCheckedChange={() => handleToggle('delete_notification')} />
                    <label
                        htmlFor="delete-notification"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Delete Notification
                    </label>
                </div>
            </div>
      )
  }
,  
    // {
    //     value: "item-12",
    //     triggerText: "Promo Code",
    //     content: <div />,
    // },
    {
        value: "item-13",
        triggerText: "Complaints",
        content: (
            <div className='flex flex-col space-y-2'>
                <div className="flex flex-col space-y-2">
                    {/* Add Complaint Title */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="add-complaint-title" checked={privilegedData?.add_complaint_title === 1} onCheckedChange={() => handleToggle('add_complaint_title')} />
                        <label
                            htmlFor="add-complaint-title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Add Complaint Title
                        </label>
                    </div>
                    
                    {/* Edit Complaint Title */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="edit-complaint-title" checked={privilegedData?.edit_complaint_title === 1} onCheckedChange={() => handleToggle('edit_complaint_title')} />
                        <label
                            htmlFor="edit-complaint-title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Edit Complaint Title
                        </label>
                    </div>
                    
                    {/* Delete Complaint Title */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="delete-complaint-title" checked={privilegedData?.delete_complaint_title === 1} onCheckedChange={() => handleToggle('delete_complaint_title')} />
                        <label
                            htmlFor="delete-complaint-title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Delete Complaint Title
                        </label>
                    </div>
                    
                    {/* Toggle Complaint Title */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="toggle-complaint-title" checked={privilegedData?.toggle_complaint_title === 1} onCheckedChange={() => handleToggle('toggle_complaint_title')} />
                        <label
                            htmlFor="toggle-complaint-title"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Toggle Complaint Title
                        </label>
                    </div>
                </div>
            </div>
        )
    },
    {
        value: "item-14",
        triggerText: "Reports",
        content: (
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-col space-y-2'>
                    {/* User Report */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="user-report" checked={privilegedData?.user_report === 1} onCheckedChange={() => handleToggle('user_report')} />
                        <label
                            htmlFor="user-report"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            User Report
                        </label>
                    </div>
    
                    {/* Driver Report */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="driver-report" checked={privilegedData?.driver_report === 1} onCheckedChange={() => handleToggle('driver_report')} />
                        <label
                            htmlFor="driver-report"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Driver Report
                        </label>
                    </div>
    
                    {/* Finance Report */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="finance-report" checked={privilegedData?.finance_report === 1} onCheckedChange={() => handleToggle('finance_report')} />
                        <label
                            htmlFor="finance-report"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Finance Report
                        </label>
                    </div>
    
                    {/* Driver Duties Report */}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="driver-duties-report" checked={privilegedData?.driver_duties_report === 1} onCheckedChange={() => handleToggle('driver_duties_report')} />
                        <label
                            htmlFor="driver-duties-report"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Driver Duties Report
                        </label>
                    </div>
                </div>
            </div>
  )
}

  
  ];
  


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!privilegedData) {
    return <div>No data found</div>;
  }
    return (
        <Suspense fallback={<div>Loading...</div>}>
       <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="Name" className="text-left">
                Name
                </Label>
                <Input id="Name" value={privilegedData.name} placeholder=' Name' className="col-span-3" />
              </div>
        <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item: AccordionItemData) => (
                <AccordionItem key={item.value} value={item.value}>
                    <AccordionTrigger>{item.triggerText}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
        </Suspense>
    );
}

