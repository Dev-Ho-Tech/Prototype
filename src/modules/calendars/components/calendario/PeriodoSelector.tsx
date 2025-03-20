import React from 'react';
import { PeriodoTipo } from '../../interfaces/Calendario';
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '../ui/select';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '../ui/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

interface PeriodoSelectorProps {
  periodoSeleccionado: PeriodoTipo;
  onPeriodoChange: (periodo: PeriodoTipo) => void;
  mes: Date;
  onMesChange: (mes: Date) => void;
  fecha: Date;
  onFechaChange: (fecha: Date) => void;
}

export const PeriodoSelector: React.FC<PeriodoSelectorProps> = ({
  periodoSeleccionado,
  onPeriodoChange,
  mes,
  onMesChange,
  fecha,
  onFechaChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col w-36">
        <label className="text-xs text-gray-500 mb-1">Periodo</label>
        <Select value={periodoSeleccionado} onValueChange={(v) => onPeriodoChange(v as PeriodoTipo)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diario">Diario</SelectItem>
            <SelectItem value="semanal">Semanal</SelectItem>
            <SelectItem value="quincenal">Quincenal</SelectItem>
            <SelectItem value="mensual">Mensual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {periodoSeleccionado === 'mensual' && (
        <div className="flex flex-col w-48">
          <label className="text-xs text-gray-500 mb-1">Mes</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !mes && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {mes ? format(mes, 'MMMM yyyy', { locale: es }) : <span>Seleccionar mes</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
              mode="single"
              selected={mes}
              onSelect={(newDate: Date | undefined) => newDate && onMesChange(newDate)}
              initialFocus
              locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {(periodoSeleccionado === 'diario' || periodoSeleccionado === 'semanal' || periodoSeleccionado === 'quincenal') && (
        <div className="flex flex-col w-48">
          <label className="text-xs text-gray-500 mb-1">Fecha</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !fecha && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fecha ? format(fecha, 'dd/MM/yyyy', { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fecha}
                onSelect={(newDate) => newDate && onFechaChange(newDate)}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="ml-2">
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
          Hoy
        </Button>
      </div>
    </div>
  );
};