import React from 'react';
import { Empleado } from '../../interfaces/Empleado';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { cn } from '../ui/utils';

interface EmpleadosListProps {
  empleados: Empleado[];
  onEmpleadoClick?: (empleado: Empleado) => void;
  empleadosSeleccionados?: string[];
}

export const EmpleadosList: React.FC<EmpleadosListProps> = ({ 
  empleados, 
  onEmpleadoClick,
  empleadosSeleccionados = [] 
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const empleadosFiltrados = empleados.filter(emp => 
    `${emp.nombre} ${emp.apellidos}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="search"
          placeholder="Buscar..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative overflow-auto flex-grow">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Empleados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {empleadosFiltrados.map((empleado) => (
              <TableRow 
                key={empleado.id}
                className={cn(
                  "hover:bg-gray-50 cursor-pointer",
                  empleadosSeleccionados.includes(empleado.id) && "bg-blue-50"
                )}
                onClick={() => onEmpleadoClick && onEmpleadoClick(empleado)}
              >
                <TableCell className="py-2 text-center">{empleado.id}</TableCell>
                <TableCell className="py-2">
                  <div className="font-medium">{empleado.nombre} {empleado.apellidos}</div>
                  {empleado.cargo && (
                    <div className="text-xs text-gray-500">{empleado.cargo}</div>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {empleadosFiltrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                  No se encontraron empleados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};