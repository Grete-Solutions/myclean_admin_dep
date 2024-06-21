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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PriveledgeSheet from '@/app/components/Sheetpop/Priveleges/PriveledgeSheet';
import { Actionbutton } from './Action';
import { useSession } from 'next-auth/react';
import Custom404 from '../../Custom404/page';

interface Data {
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

export function Priveleges() {
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = useState<Data[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPriveledges = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/lib/GET/Priveledges/getallPriveledges');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setData(Array.isArray(data.product) ? data.product : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPermission = useCallback(async () => {
    if (!session) return;
    const id = session.user.role;
    const field_name = 'get_all_roles';
    try {
      const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setIsAuthorized( session?.user.role === 'Super Admin' || session?.user.role === 'Super Admin'|| result.product === 1  );
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch permissions. Please try again later.');
    }
  }, [session]);

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchPermission();
    }
  }, [sessionStatus, fetchPermission]);

  useEffect(() => {
    if (isAuthorized) {
      getPriveledges();
    }
  }, [isAuthorized, getPriveledges]);

  const handleAddSuccess = () => {
    getPriveledges();
  };

  const columns: ColumnDef<Data>[] = [
    {
      accessorKey: "Sno",
      header: "Sr No",
      cell: ({ row }) => <div>{row.index + 1}</div>, 
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => <div>{row.getValue("slug")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className={`${row.getValue("status") === 1 ? 'text-green-500' : 'text-red-500 file'} font-semibold`}>
          {row.getValue("status") === 1 ? 'Active' : 'InActive'}</div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <Actionbutton onDelete={row.original.isDelete} status={row.original.status} id={row.original.id} refreshData={getPriveledges} />, 
    },
  ];

  const table = useReactTable({
    data,
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
    <div>
      {isAuthorized ? (
         <div>
         <PriveledgeSheet onAddSuccess={handleAddSuccess} />
         <div className="w-full">
           <div className="flex items-center py-4">
             <Input
               placeholder="Filter Name..."
               value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
               onChange={(event) =>
                 table.getColumn("name")?.setFilterValue(event.target.value)
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
               <TableCaption>A list of your privileges.</TableCaption>
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
                 {loading ? (
                   <TableRow>
                     <TableCell colSpan={columns.length} className="h-24 text-center">
                       Loading...
                     </TableCell>
                   </TableRow>
                 ) : error ? (
                   <TableRow>
                     <TableCell colSpan={columns.length} className="h-24 text-center">
                       {error}
                     </TableCell>
                   </TableRow>
                 ) : table.getRowModel().rows.length ? (
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
       </div>
      ) : (
        <Custom404/>

      )}
    </div>
  );
}

export default Priveleges;
