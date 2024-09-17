"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the type for the driver report data
type DriverReportData = {
  reportId: string;
  driverName: string;
  vehicleType: string;
  startLocation: string;
  endLocation: string;
  reportDescription: string;
};

const columns: ColumnDef<DriverReportData>[] = [
  {
    accessorKey: "reportId",
    header: "Report ID",
    cell: ({ row }) => <div>{row.getValue("reportId")}</div>,
  },
  {
    accessorKey: "driverName",
    header: "Driver Name",
    cell: ({ row }) => <div>{row.getValue("driverName")}</div>,
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
    cell: ({ row }) => <div>{row.getValue("vehicleType")}</div>,
  },
  {
    accessorKey: "startLocation",
    header: "Start Location",
    cell: ({ row }) => <div>{row.getValue("startLocation")}</div>,
  },
  {
    accessorKey: "endLocation",
    header: "End Location",
    cell: ({ row }) => <div>{row.getValue("endLocation")}</div>,
  },
  {
    accessorKey: "reportDescription",
    header: "Report Description",
    cell: ({ row }) => (
      <div className="whitespace-pre-wrap">{row.getValue("reportDescription")}</div>
    ),
  },
];

export function DriverReportDataTable() {
  const [data, setData] = React.useState<DriverReportData[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/lib/GET/Driver/getDriverReports");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (Array.isArray(data.reports)) {
          setData(data.reports);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by Driver Name..."
          value={(table.getColumn("driverName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("driverName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
