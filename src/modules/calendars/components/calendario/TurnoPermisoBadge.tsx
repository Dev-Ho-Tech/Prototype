import React from 'react';
import { Turno } from '../../interfaces/Turno';
import { Permiso } from '../../interfaces/Permiso';
import { cn } from '../ui/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface TurnoPermisoBadgeProps {
  item: Turno | Permiso;
  horaInicio?: string;
  horaFin?: string;
  onClick?: () => void;
}

export const TurnoPermisoBadge: React.FC<TurnoPermisoBadgeProps> = ({
  item,
  horaInicio,
  horaFin,
  onClick
}) => {
  // Usamos las horas del item si no se especifican otras
  const inicio = horaInicio || ('horaInicio' in item ? item.horaInicio : undefined);
  const fin = horaFin || ('horaFin' in item ? item.horaFin : undefined);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "px-2 py-1 rounded text-sm font-medium inline-flex items-center",
              item.color,
              onClick && "cursor-pointer hover:opacity-90"
            )}
            onClick={onClick}
          >
            <span className="font-semibold mr-1">{item.codigo}</span>
            {inicio && fin && (
              <span className="text-xs">{inicio} - {fin}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <p className="font-medium">{item.nombre}</p>
            {item.descripcion && <p className="text-xs text-gray-500">{item.descripcion}</p>}
            {inicio && fin && <p className="text-xs mt-1">{inicio} - {fin}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};