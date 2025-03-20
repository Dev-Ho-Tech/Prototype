import React from 'react';
import { PeriodoTipo } from '../../interfaces/Calendario';
import { Turno } from '../../interfaces/Turno';
import { Permiso } from '../../interfaces/Permiso';
import { PeriodoSelector } from './PeriodoSelector';
import { Input } from '../ui/input';
import { Search, Copy, Plus, Filter, ChevronDown, Download, Upload, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface CalendarioHeaderProps {
  periodoSeleccionado: PeriodoTipo;
  onPeriodoChange: (periodo: PeriodoTipo) => void;
  mes: Date;
  onMesChange: (mes: Date) => void;
  fecha: Date;
  onFechaChange: (fecha: Date) => void;
  onSearch: (query: string) => void;
  onCopiar: () => void;
  onPegar: () => void;
  turnos: Turno[];
  permisos: Permiso[];
}

export const CalendarioHeader: React.FC<CalendarioHeaderProps> = ({
  periodoSeleccionado,
  onPeriodoChange,
  mes,
  onMesChange,
  fecha,
  onFechaChange,
  onSearch,
  onCopiar,
  onPegar,
  turnos,
  permisos
}) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Buscar empleados..."
              className="pl-10 w-64"
              onChange={e => onSearch(e.target.value)}
            />
          </div>
          
          <Button variant="ghost" className="ml-2" onClick={onCopiar}>
            <Copy className="h-4 w-4 mr-2" />
            Copiar
          </Button>
          
          <Button variant="ghost" onClick={onPegar}>
            Pegar
          </Button>
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Turnos</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {turnos.map(turno => (
                  <DropdownMenuItem key={turno.id}>
                    <div className="flex items-center w-full">
                      <span className={`w-3 h-3 rounded-full mr-2 ${turno.color.split(' ')[0]}`}></span>
                      <span>{turno.codigo} - {turno.nombre}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Permisos</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {permisos.map(permiso => (
                  <DropdownMenuItem key={permiso.id}>
                    <div className="flex items-center w-full">
                      <span className={`w-3 h-3 rounded-full mr-2 ${permiso.color.split(' ')[0]}`}></span>
                      <span>{permiso.codigo} - {permiso.nombre}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Importar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo empleado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex items-center">
        <PeriodoSelector 
          periodoSeleccionado={periodoSeleccionado}
          onPeriodoChange={onPeriodoChange}
          mes={mes}
          onMesChange={onMesChange}
          fecha={fecha}
          onFechaChange={onFechaChange}
        />
      </div>
    </div>
  );
};