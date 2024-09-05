"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons"
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
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ApprovedDriversSheet from "../../../components/Sheetpop/ManageDRIVERS/ApprovedDriverSheet"
import { useSession } from 'next-auth/react'
import Custom404 from "../../Custom404/page"
import { Actionbutton } from "./Action"

type ApprovedData = {
  id:string
  firstname: string;
  lastname: string;
  phone: string;
  userType: number;
  balance: number
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
  action:React.ReactNode
};


const columns: ColumnDef<ApprovedData>[] = [
  {
    accessorKey: "Sno",
    header: "Sno",
    cell: ({ row }) => <div>{row.index + 1}</div>, 
  },
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue("firstname")}</div>
    ),
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastname")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Mobile",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "balance",
    header: "Wallet Balance",
    cell: ({ row }) => <div className="text-center"
    >GH₵{row.getValue("balance")}</div>,
  },
  
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="text-center text-[#0A8791]">
        <Actionbutton id={row.original.id} />
      </div>
    ),
  },];

export function NegativeBalanceDriversDataTable() {
  const { data: session, status: sessionStatus } = useSession();
  const [data, setData] = React.useState<ApprovedData[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getNegativeBalanceDrivers = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/lib/GET/Driver/getallNegativeBalanceDrivers');
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

  const fetchPermission = React.useCallback(async () => {
    if (!session) return;
    const id = session.user.role;
    const field_name = 'negative_driver_view';
    try {
      const response = await fetch(`/lib/GET/Priveledges/getPrivelegesByIDandFieldName?id=${id}&field_name=${field_name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setIsAuthorized(session?.user.role === 'Super Admin'|| session?.user.role === 'Super Admin'|| result.product === 1  );
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch permissions. Please try again later.');
    }
  }, [session]);

  React.useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchPermission();
    }
  }, [sessionStatus, fetchPermission]);

  React.useEffect(() => {
    if (isAuthorized) {
      getNegativeBalanceDrivers();
    }
  }, [isAuthorized, getNegativeBalanceDrivers]);

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
      {!isAuthorized ? (
        <Custom404/>
      ) : (
        <div>
          <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter Name..."
                value={(table.getColumn("firstname")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("firstname")?.setFilterValue(event.target.value)
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
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="text-center">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                {loading ? (
              <div className="flex justify-center items-center h-64">
                <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              </div>
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
                          <TableCell key={cell.id} className="text-center">
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
      )}
    </div>
  );
}
