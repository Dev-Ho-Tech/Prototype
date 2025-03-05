/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { X, Clock, CheckCircle, AlertCircle, Calendar, User } from 'lucide-react';
import { Employee } from '../interface/types';

interface ExtraHoursApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  segment: any;
  employee: Employee | null;
}

const ExtraHoursApprovalModal: React.FC<ExtraHoursApprovalModalProps> = ({
  isOpen,
  onClose,
  segment,
  employee
}) => {
  // Estados para el formulario de aprobación
  const [tipoAprobacion, setTipoAprobacion] = useState('flotante');
  const [tipoConcepto, setTipoConcepto] = useState('horas-fuera-horario');
  const [observaciones, setObservaciones] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  if (!isOpen || !segment || !employee) return null;

  // Extraer las horas de los marcajes
  const horaInicio = segment.marcajeInicio?.hora || '--:--';
  const horaFin = segment.marcajeFin?.hora || '--:--';
  
  // Calcular duración
  const calcularDuracion = () => {
    if (!segment.marcajeInicio || !segment.marcajeFin) return '0 horas';
    
    // Función para convertir hora en formato "HH:MM AM/PM" a minutos totales desde medianoche
    const convertirAMinutos = (horaStr: string) => {
      const [hora, periodo] = horaStr.split(' ');
      // eslint-disable-next-line prefer-const
      let [horas, minutos] = hora.split(':').map(Number);
      
      // Ajustar para PM
      if (periodo === 'PM' && horas < 12) horas += 12;
      if (periodo === 'AM' && horas === 12) horas = 0;
      
      return horas * 60 + minutos;
    };
    
    const minutosInicio = convertirAMinutos(segment.marcajeInicio.hora);
    const minutosFin = convertirAMinutos(segment.marcajeFin.hora);
    
    // Calcular diferencia en minutos
    let diferencia = minutosFin - minutosInicio;
    
    // Ajustar si es negativo (cruce de día)
    if (diferencia < 0) diferencia += 24 * 60;
    
    // Convertir a formato de horas y minutos
    const horas = Math.floor(diferencia / 60);
    const minutos = diferencia % 60;
    
    return `${horas} h ${minutos} min`;
  };

  // Manejar aprobación
  const handleApprove = () => {
    // Aquí iría la lógica de aprobación (en una app real, haríamos una llamada a API)
    setIsApproved(true);
    
    // Simular una breve espera para mostrar el mensaje de éxito
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4 shadow-xl">
        {/* Encabezado */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-medium flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Aprobación de Horas Extras
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:bg-blue-700 rounded-full p-1"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cuerpo del modal */}
        {isApproved ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-green-600 mb-2">¡Aprobación Exitosa!</h3>
            <p className="text-gray-600 mb-6">Las horas extras han sido aprobadas correctamente.</p>
          </div>
        ) : (
          <div className="p-5">
            {/* Datos básicos */}
            <div className="mb-5 bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Información de horas extras</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1 flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    Empleado
                  </div>
                  <div className="font-medium">{employee.nombre} {employee.apellidos}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Fecha
                  </div>
                  <div className="font-medium">{segment.marcajeInicio?.fecha || 'N/A'}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Hora de inicio</div>
                  <div className="font-medium">{horaInicio}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Hora de fin</div>
                  <div className="font-medium">{horaFin}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Duración</div>
                  <div className="font-medium">{calcularDuracion()}</div>
                </div>
              </div>
            </div>
            
            {/* Formulario de aprobación */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de aprobación
              </label>
              <select
                value={tipoAprobacion}
                onChange={(e) => setTipoAprobacion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="flotante">Flotante</option>
                <option value="licencia">Licencia</option>
                <option value="compensacion">Compensación</option>
                <option value="permanente">Permanente</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de concepto
              </label>
              <select
                value={tipoConcepto}
                onChange={(e) => setTipoConcepto(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="horas-fuera-horario">Horas fuera de horario</option>
                <option value="horas-fuera-horario-nocturna">Horas fuera de horario nocturnas</option>
                <option value="horas-feriado">Horas en día feriado</option>
                <option value="horas-especiales">Horas especiales</option>
              </select>
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observaciones
              </label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingrese las observaciones para la aprobación..."
              ></textarea>
            </div>
            
            {/* Mensaje de advertencia */}
            <div className="mb-5 p-3 bg-yellow-50 border border-yellow-100 rounded-md flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-700">
                Las horas extras deben ser aprobadas por un supervisor. Este registro quedará en el historial de aprobaciones.
              </div>
            </div>
          </div>
        )}
        
        {/* Footer con acciones */}
        <div className="bg-gray-50 px-5 py-4 rounded-b-lg flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          
          {!isApproved && (
            <button
              type="button"
              onClick={handleApprove}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Aprobar horas extras
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtraHoursApprovalModal;