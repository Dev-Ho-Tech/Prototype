import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchQuery?: string
  searchField?: string
}

export function DataTable<TData, TValue>({ 
  columns, 
  data, 
  searchQuery = "", 
  searchField = "nombre" 
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  // Aplicar la consulta de búsqueda al campo especificado
  const appliedFilters = [...columnFilters];
  if (searchQuery && searchField) {
    // Añadir el filtro solo si no existe ya uno para ese campo
    if (!appliedFilters.some(filter => filter.id === searchField)) {
      appliedFilters.push({
        id: searchField,
        value: searchQuery,
      });
    } else {
      // Actualizar el filtro existente
      const index = appliedFilters.findIndex(filter => filter.id === searchField);
      appliedFilters[index] = {
        id: searchField,
        value: searchQuery,
      };
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters: appliedFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  // Convertir pageSize a string para evitar errores de tipo
  // const pageSizeString = String(table.getState().pagination.pageSize);

  return (
    <div>
      <div className="h-[15px]"></div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">
            Mostrando
            <span className="px-1">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>
            a
            <span className="px-1">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}
            </span>
            de
            <span className="px-1">{table.getFilteredRowModel().rows.length}</span>
            resultados
          </p>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Filas por página</p>
            <div className="h-8 w-[70px] flex items-center justify-center border border-gray-300 rounded-md">
              <span className="text-sm">10</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la primera página</span>
              <span>{"<<"}</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir a la página anterior</span>
              <span>{"<"}</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la página siguiente</span>
              <span>{">"}</span>
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir a la última página</span>
              <span>{">>"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}