import React from 'react';
import { User, Building2, Clock, KeyRound, Edit, XCircle, Eye } from 'lucide-react';
import { VisitorCardProps, getStatusColor, getStatusLabel } from '../interfaces/types'; 

const VisitorCard: React.FC<VisitorCardProps> = ({
  visitor,
  onEdit,
  onFinish
}) => {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Cabecera con foto y datos básicos */}
      <div className="p-4 bg-blue-50 border-b flex justify-between items-start">
        <div className="flex items-start">
          <img
            src={visitor.photo}
            alt={`${visitor.firstName} ${visitor.lastName}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              {visitor.firstName} {visitor.lastName}
            </h3>
            <p className="text-sm text-gray-600">{visitor.company}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          getStatusColor(visitor.status)
        }`}>
          {getStatusLabel(visitor.status)}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {/* Propósito de visita */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Visita:</p>
            <p className="text-sm font-medium">{visitor.visit.reason}</p>
          </div>

          {/* Anfitrión */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Anfitrión:</p>
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">{visitor.visit.host}</span>
            </div>
            <div className="flex items-center mt-1">
              <Building2 className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">{visitor.visit.hostDepartment}</span>
            </div>
          </div>

          {/* Horario */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Horario:</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">
                {formatTime(visitor.visit.startTime)} - {formatTime(visitor.visit.endTime)}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Duración: {visitor.visit.duration}</p>
          </div>

          {/* Credenciales */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Credenciales:</p>
            <div className="flex items-center">
              <KeyRound className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-sm font-medium">
                {visitor.credentials.type === 'card' ? 'Tarjeta' :
                 visitor.credentials.type === 'pin' ? 'PIN' :
                 'Tarjeta + PIN'}
              </span>
            </div>
            {visitor.credentials.requiresEscort && (
              <p className="text-xs text-amber-600 mt-1">Requiere acompañante</p>
            )}
          </div>

          {/* Documento */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Documento:</p>
            <p className="text-sm font-medium">
              {visitor.documentType === 'cedula' ? 'Cédula' : 
               visitor.documentType === 'passport' ? 'Pasaporte' : 
               'Licencia'}: {visitor.documentNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-4 py-3 bg-gray-50 border-t flex justify-end space-x-2">
        <button
          onClick={() => window.alert('Ver detalles')}
          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50"
          title="Ver detalles"
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={() => onEdit(visitor)}
          className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50"
          title="Editar"
        >
          <Edit className="h-5 w-5" />
        </button>
        {visitor.status === 'active' && onFinish && (
          <button
            onClick={() => onFinish(visitor.id)}
            className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
            title="Finalizar visita"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default VisitorCard;