import React from 'react';
import { ArrowLeft, Edit, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { ContractDetailProps, ContractType } from '../interfaces/types';

export const ContractDetail: React.FC<ContractDetailProps> = ({
  contract,
  onEdit,
  onBack
}) => {
  const getTypeColor = (type: ContractType) => {
    switch (type) {
      case ContractType.FIXED:
        return 'bg-blue-100 text-blue-800';
      case ContractType.TEMPORARY:
        return 'bg-amber-100 text-amber-800';
      case ContractType.INTERNSHIP:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: ContractType) => {
    switch (type) {
      case ContractType.FIXED:
        return 'Fijo';
      case ContractType.TEMPORARY:
        return 'Temporal';
      case ContractType.INTERNSHIP:
        return 'Pasantía';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-3 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium text-gray-900">
            Detalles del Contrato: {contract.name}
          </h2>
        </div>
        <button
          onClick={onEdit}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </button>
      </div>

      <div className="p-6">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Código</p>
              <p className="text-lg font-medium text-gray-900">{contract.code}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(contract.type)}`}>
              {getTypeLabel(contract.type)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1: Información general */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Información General</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium text-gray-900">{contract.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Duración</p>
                <p className="font-medium text-gray-900">{contract.duration || 'Indefinido'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Grupo de asignación de turno</p>
                <p className="font-medium text-gray-900">{contract.workingHours.scheduleLimitGroup || 'No especificado'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Día de inicio</p>
                <p className="font-medium text-gray-900">{contract.workingHours.startDay || 'No especificado'}</p>
              </div>

              {contract.employeeCount !== undefined && (
                <div>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                    Empleados asignados
                  </p>
                  <p className="font-medium text-gray-900">{contract.employeeCount}</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna 2: Configuración de horas */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Configuración de Horas</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" />
                  Horas semanales
                </p>
                <p className="font-medium text-gray-900">{contract.workingHours.perWeek} horas</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Máx. horas diarias</p>
                <p className="font-medium text-gray-900">{contract.workingHours.maxDailyHours || 'No especificado'}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Recargo nocturno</p>
                <p className="font-medium text-gray-900">
                  {contract.workingHours.nightShiftStart && contract.workingHours.nightShiftEnd 
                    ? `${contract.workingHours.nightShiftStart} - ${contract.workingHours.nightShiftEnd}`
                    : 'No especificado'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Horas extras</p>
                <div className="flex items-center mt-1">
                  {contract.overtimeAllowed ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span>Permitidas</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <XCircle className="w-4 h-4 mr-1" />
                      <span>No permitidas</span>
                    </div>
                  )}
                </div>
                {contract.overtimeAllowed && (
                  <div className="mt-2">
                    <div className="flex">
                      <span className="text-sm text-gray-500 w-24">Mínimas:</span>
                      <span className="text-sm font-medium">{contract.workingHours.minOvertimeHours || 0} horas</span>
                    </div>
                    <div className="flex mt-1">
                      <span className="text-sm text-gray-500 w-24">Máximas:</span>
                      <span className="text-sm font-medium">{contract.workingHours.maxOvertimeHours || 0} horas</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Configuraciones adicionales */}
        <div className="mt-8">
          <h3 className="text-base font-medium text-gray-900 mb-4">Configuraciones Adicionales</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">¿Cruzar días?</p>
              <div className="mt-1 flex items-center">
                {contract.crossDays ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {contract.crossDays ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">¿Auto aprobar?</p>
              <div className="mt-1 flex items-center">
                {contract.autoApprove ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {contract.autoApprove ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Ignorar ausencias</p>
              <div className="mt-1 flex items-center">
                {contract.ignoreAbsences ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {contract.ignoreAbsences ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">¿Primer y último marcaje?</p>
              <div className="mt-1 flex items-center">
                {contract.firstLastCheck ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {contract.firstLastCheck ? 'Sí' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};