import React from 'react';
import { Marcaje, TipoMarcaje, TipoVerificacion } from '../interface/types';
import { Clock, CreditCard, User, Check, AlertTriangle } from 'lucide-react';

interface IncidenciaItemProps {
  marcaje: Marcaje;
  onDelete: (id: string) => void;
}

const IncidenciaItem: React.FC<IncidenciaItemProps> = ({ marcaje, onDelete }) => {
  // Iconos para tipo de verificación
  const getVerificationIcon = () => {
    switch (marcaje.tipoVerificacion) {
      case TipoVerificacion.HUELLA:
        return <div className="w-4 h-4 text-blue-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M6.5 14.5V6.5C6.5 4 8.5 2 11 2a4.5 4.5 0 0 1 4.5 4.5v10" />
            <path d="M4 15.5v-2a2.5 2.5 0 0 1 2.5-2.5h11" />
            <path d="M9 12.5v-1a2.5 2.5 0 0 1 2.5-2.5h3" />
            <path d="M13.5 20.5V19a2.5 2.5 0 0 0-2.5-2.5h-1" />
          </svg>
        </div>;
      case TipoVerificacion.ROSTRO:
        return <User className="w-4 h-4 text-green-500" />;
      case TipoVerificacion.TARJETA:
        return <CreditCard className="w-4 h-4 text-purple-500" />;
      default:
        return <Check className="w-4 h-4 text-gray-500" />;
    }
  };

  // Clase para tipo de marcaje (entrada/salida)
  const getMarcajeClass = () => {
    switch (marcaje.tipoMarcaje) {
      case TipoMarcaje.ENTRADA:
        return 'bg-green-100 text-green-800';
      case TipoMarcaje.SALIDA:
        return 'bg-blue-100 text-blue-800';
      case TipoMarcaje.BREAK_INICIO:
        return 'bg-amber-100 text-amber-800';
      case TipoMarcaje.BREAK_FIN:
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-50">
      <div className="mr-3">
        <div className="text-xs text-gray-500 mb-1">Fecha:</div>
        <div className="text-sm font-medium">{marcaje.fecha}</div>
      </div>
      
      <div className="mr-3">
        <div className="text-xs text-gray-500 mb-1">Hora:</div>
        <div className="flex items-center text-sm font-medium">
          <Clock className="inline-block w-3 h-3 mr-1 text-gray-500" />
          {marcaje.hora}
        </div>
      </div>
      
      <div className="mr-3">
        <div className="text-xs text-gray-500 mb-1">Dispositivo:</div>
        <div className="text-sm font-medium">{marcaje.dispositivo}</div>
      </div>
      
      <div className="mr-3">
        <div className="text-xs text-gray-500 mb-1">Tipo:</div>
        <div className="flex items-center space-x-1">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getMarcajeClass()}`}>
            {marcaje.tipoMarcaje}
          </span>
        </div>
      </div>
      
      <div className="mr-3">
        <div className="text-xs text-gray-500 mb-1">Verificación:</div>
        <div className="flex items-center">
          {getVerificationIcon()}
          <span className="ml-1 text-sm">{marcaje.tipoVerificacion}</span>
        </div>
      </div>
      
      {marcaje.esManual && (
        <div className="mr-3 flex items-center">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Manual
          </span>
        </div>
      )}
      
      <div className="ml-auto">
        <button 
          onClick={() => onDelete(marcaje.id)}
          className="text-red-600 hover:text-red-800 p-1"
          aria-label="Eliminar marcaje"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IncidenciaItem;