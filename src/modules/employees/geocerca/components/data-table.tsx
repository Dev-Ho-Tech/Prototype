import { useState, useEffect, memo } from "react"
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
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "./ui/dropdown"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchQuery?: string
  searchField?: string
}

export const DataTable = memo(function DataTable<TData, TValue>({ 
  columns, 
  data, 
  searchQuery = "", 
  searchField = "nombre" 
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [appliedFilters, setAppliedFilters] = useState<ColumnFiltersState>([])
  const [pageSize, setPageSize] = useState(10)

  // Opciones de tamaño de página
  const pageSizeOptions = [10, 15, 25, 50, 100]

  // Manejar los filtros de manera separada para evitar ciclos
  useEffect(() => {
    const newFilters = [...columnFilters];
    if (searchQuery && searchField) {
      const existingFilterIndex = newFilters.findIndex(filter => filter.id === searchField);
      
      if (existingFilterIndex >= 0) {
        newFilters[existingFilterIndex] = {
          id: searchField,
          value: searchQuery,
        };
      } else {
        newFilters.push({
          id: searchField,
          value: searchQuery,
        });
      }
    } else {
      // Si no hay consulta, eliminar el filtro si existe
      const existingFilterIndex = newFilters.findIndex(filter => filter.id === searchField);
      if (existingFilterIndex >= 0) {
        newFilters.splice(existingFilterIndex, 1);
      }
    }
    
    setAppliedFilters(newFilters);
  }, [searchQuery, searchField, columnFilters]);

  // Función para cambiar el número de filas por página
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    table.setPageSize(size);
  };

  // Memoizar la tabla para evitar recreaciones innecesarias
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
        pageSize: pageSize,
      },
    },
  })

  // Limpiar los recursos al desmontar el componente
  useEffect(() => {
    return () => {
      // Limpieza explícita para evitar fugas de memoria
      setSorting([]);
      setColumnFilters([]);
      setAppliedFilters([]);
    };
  }, []);

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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-8 px-2 min-w-[70px] flex items-center justify-between"
                >
                  {pageSize}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {pageSizeOptions.map((size) => (
                  <DropdownMenuItem 
                    key={size} 
                    onClick={() => handlePageSizeChange(size)}
                    className={pageSize === size ? "bg-gray-100" : ""}
                  >
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
});