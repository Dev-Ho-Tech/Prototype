import React from 'react';
import { Button } from '../ui/button';
import { CalendarDays, List, LayoutGrid } from 'lucide-react';

type TipoVista = 'calendario' | 'lista' | 'tarjetas';

interface VistaSelectorProps {
  vistaActual: TipoVista;
  onVistaChange: (vista: TipoVista) => void;
}

export const VistaSelector: React.FC<VistaSelectorProps> = ({
  vistaActual,
  onVistaChange
}) => {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <Button
        variant="ghost"
        className={`px-4 py-2 rounded-none ${vistaActual === 'calendario' ? 'bg-blue-50 text-blue-600' : ''}`}
        onClick={() => onVistaChange('calendario')}
      >
        <CalendarDays className="h-4 w-4 mr-2" />
        Calendario
      </Button>
      <Button
        variant="ghost"
        className={`px-4 py-2 rounded-none ${vistaActual === 'lista' ? 'bg-blue-50 text-blue-600' : ''}`}
        onClick={() => onVistaChange('lista')}
      >
        <List className="h-4 w-4 mr-2" />
        Lista
      </Button>
      <Button
        variant="ghost"
        className={`px-4 py-2 rounded-none ${vistaActual === 'tarjetas' ? 'bg-blue-50 text-blue-600' : ''}`}
        onClick={() => onVistaChange('tarjetas')}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Tarjetas
      </Button>
    </div>
  );
};