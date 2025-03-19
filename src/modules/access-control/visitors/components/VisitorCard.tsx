import React from 'react';
import { User, Building2, Clock, KeyRound, Edit, XCircle, Eye, Calendar, FileText } from 'lucide-react';
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-blue-50">
      {/* Cabecera con foto y datos básicos */}
      <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100 flex justify-between items-start">
        <div className="flex items-start">
          <div className="relative">
            <img
              src={visitor.photo}
              alt={`${visitor.firstName} ${visitor.lastName}`}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-sm">
              <FileText className="h-3.5 w-3.5 text-blue-500" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {visitor.firstName} {visitor.lastName}
            </h3>
            <p className="text-sm text-blue-600 flex items-center">
              <Building2 className="h-3.5 w-3.5 mr-1" />
              {visitor.company}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${
          getStatusColor(visitor.status)
        }`}>
          {getStatusLabel(visitor.status)}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-4">
          {/* Propósito de visita y anfitrión */}
          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/60">
            <p className="text-sm font-medium text-blue-800 mb-2 flex items-center">
              <User className="h-4 w-4 mr-1.5 text-blue-600" />
              Visita: {visitor.visit.reason}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 md:col-span-1">
                <p className="text-xs text-gray-500 mb-0.5">Anfitrión:</p>
                <p className="text-sm font-medium text-gray-700">{visitor.visit.host}</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-xs text-gray-500 mb-0.5">Departamento:</p>
                <p className="text-sm font-medium text-gray-700">{visitor.visit.hostDepartment}</p>
              </div>
            </div>
          </div>

          {/* Horario y Credenciales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Horario */}
            <div className="bg-white rounded-lg p-3 border border-blue-100/80 shadow-sm">
              <p className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1.5 text-blue-600" />
                Horario
              </p>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Inicio:</p>
                  <p className="text-sm font-medium text-gray-700">{formatTime(visitor.visit.startTime)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Fin:</p>
                  <p className="text-sm font-medium text-gray-700">{formatTime(visitor.visit.endTime)}</p>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-blue-50">
                  <p className="text-xs text-gray-500">Duración:</p>
                  <p className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    {visitor.visit.duration}
                  </p>
                </div>
              </div>
            </div>

            {/* Documento y Credenciales */}
            <div className="bg-white rounded-lg p-3 border border-blue-100/80 shadow-sm">
              <p className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                <KeyRound className="h-4 w-4 mr-1.5 text-blue-600" />
                Acceso
              </p>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Documento:</p>
                  <p className="text-sm font-medium text-gray-700">
                    {visitor.documentType === 'cedula' ? 'Cédula' : 
                     visitor.documentType === 'passport' ? 'Pasaporte' : 
                     'Licencia'}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Número:</p>
                  <p className="text-sm font-medium text-gray-700">{visitor.documentNumber}</p>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-blue-50">
                  <p className="text-xs text-gray-500">Credencial:</p>
                  <p className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    {visitor.credentials.type === 'card' ? 'Tarjeta' :
                     visitor.credentials.type === 'pin' ? 'PIN' :
                     'Tarjeta + PIN'}
                  </p>
                </div>
                {visitor.credentials.requiresEscort && (
                  <div className="mt-1 bg-amber-50 p-1 rounded border border-amber-100 flex items-center justify-center">
                    <p className="text-xs font-medium text-amber-600">Requiere acompañante</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="px-5 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-100 flex justify-end space-x-3">
        <button
          onClick={() => window.alert('Ver detalles')}
          className="p-2 text-blue-600 hover:text-blue-800 transition-colors rounded-md hover:bg-blue-200/50"
          title="Ver detalles"
        >
          <Eye className="h-5 w-5" />
        </button>
        <button
          onClick={() => onEdit(visitor)}
          className="p-2 text-blue-600 hover:text-blue-800 transition-colors rounded-md hover:bg-blue-200/50"
          title="Editar"
        >
          <Edit className="h-5 w-5" />
        </button>
        {visitor.status === 'active' && onFinish && (
          <button
            onClick={() => onFinish(visitor.id)}
            className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-md hover:bg-red-100"
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