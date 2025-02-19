import React from 'react';
import { X, Clock, MapPin, Building2, Calendar, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import type { Employee } from '../../../../types';

interface EmployeeDetailsProps {
  employee: Employee;
  onClose: () => void;
}

export function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Detalles del empleado</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={employee.photo}
            alt={employee.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="text-lg font-medium text-gray-900">{employee.name}</h4>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Información del turno</h5>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Horario</span>
                </div>
                <span className="text-sm font-medium">
                  {employee.schedule[0].startTime} - {employee.schedule[0].endTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Turno</span>
                </div>
                <span className="text-sm font-medium">{employee.schedule[0].shift}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>Ubicación</span>
                </div>
                <span className="text-sm font-medium">{employee.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Marcajes del día</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-900">Entrada</span>
                </div>
                <span className="text-sm font-medium">{employee.schedule[0].startTime}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-900">Salida</span>
                </div>
                <span className="text-sm font-medium">Pendiente</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Resumen de horas</h5>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Horas programadas</span>
                <span className="text-sm font-medium">8:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Horas trabajadas</span>
                <span className="text-sm font-medium">4:30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Horas restantes</span>
                <span className="text-sm font-medium">3:30</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-900 mb-2">Novedades</h5>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 p-3 bg-amber-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Tardanza</p>
                  <p className="text-sm text-gray-500">5 minutos de retraso en la entrada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Registrar marcaje manual
        </button>
      </div>
    </div>
  );
}