"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddAdminSheet from '@/app/components/Sheetpop/Configuration/AddAdminSheet';
import { Actionbutton } from './Action';

interface AdminData {
  id: string;
  country: string;
  address: string;
  isSuspended: number;
  city: string;
  displayName: string;
  postalCode: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  isDeactivated: number;
  phone: string;
  name: string;
  state: string;
  email: string;
  role: string;
  otp: string;
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

interface PrivilegeData {
  id: string;
  country: string;
  city: string;
  isDelete: number;
  name: string;
  description: string;
  slug: string;
  status: number;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export function AdminDataTable() {
  const [data, setData] = useState<AdminData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [privilege, setPrivilege] = useState<PrivilegeData[]>([]);
  const [sortedData, setSortedData] = useState<(AdminData & { privilegeName: string })[]>([]);

  const fetchAdminData = useCallback(async () => {
    try {
      const response = await fetch('/lib/GET/Admin/getallAdmins');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(Array.isArray(data.product) ? data.product : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const fetchPrivilegeData = useCallback(async () => {
    try {
      const response = await fetch('/lib/GET/Priveledges/getallPriveledges');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPrivilege(Array.isArray(data.product) ? data.product : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
    fetchPrivilegeData();
  }, [fetchAdminData, fetchPrivilegeData]);

  useEffect(() => {
    const privilegeMap = new Map(privilege.map(priv => [priv.id, priv.name]));
    const newSortedData = data.map(admin => ({
      ...admin,
      privilegeName: privilegeMap.get(admin.role) || 'Super Admin',
    }));
    setSortedData(newSortedData);
  }, [data, privilege]);

  const columns: ColumnDef<(AdminData & { privilegeName: string })>[] = [
    {
      accessorKey: "Sno",
      header: "Sno",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "privilegeName",
      header: "Role",
      cell: ({ row }) => <div>{row.getValue("privilegeName")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        
        const isSuspended = row.getValue("isSuspended") === 1;
        const isDeactivated = row.getValue("isDeactivated") === 1;
        const status = isSuspended ? "Suspended" : (isDeactivated ? "Deactivated" : "Active");
        const textColor = isSuspended || isDeactivated ? "text-red-500" : "text-green-500";
        
        try{
          
        return (
          <div className={`font-semibold ${textColor}`}>
            {status}
          </div>
        );
        }
        catch(error){
          console.error('Error fetching status:', error);
          return "Error fetching status";
        }
      }
    },
    {
      header: "Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const isSuspended = row.getValue("isSuspended") === 1;
        const isDeactivated = row.getValue("isDeactivated") === 1;
        const status = isSuspended ? 1 : (isDeactivated ? 1 : 1);
        return <Actionbutton onDelete={row.original.isDeactivated} status={status} id={row.original.id} refreshData={fetchAdminData} />;
      },
    },
  ];

  const table = useReactTable({
    data: sortedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <AddAdminSheet />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Display Name..."
          value={(table.getColumn("displayName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("displayName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of your users.</TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminDataTable;
