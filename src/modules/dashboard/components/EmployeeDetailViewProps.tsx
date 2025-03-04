import React, { useState } from 'react';
import { ChevronLeft, Calendar, Clock, ArrowRightCircle, MapPin, Smartphone, Computer, AlignVerticalJustifyCenter } from 'lucide-react';
import { Employee, Marcaje } from '../interface/types';
import TimelineModal from './TimelineModal';

// Definición de los iconos biométricos
const biometricIcons = {
  rostro: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z" fill="currentColor"/>
      <path d="M13 10C13 9.44772 13.4477 9 14 9H14.01C14.5623 9 15.01 9.44772 15.01 10C15.01 10.5523 14.5623 11 14.01 11H14C13.4477 11 13 10.5523 13 10Z" fill="currentColor"/>
      <path d="M9 15C9 13.8954 9.89543 13 11 13H13C14.1046 13 15 13.8954 15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15H11C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8ZM8 5C6.34315 5 5 6.34315 5 8V16C5 17.6569 6.34315 19 8 19H16C17.6569 19 19 17.6569 19 16V8C19 6.34315 17.6569 5 16 5H8Z" fill="currentColor"/>
    </svg>
  ),
  huella: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/>
    </svg>
  ),
  tarjeta: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
  ),
  pin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  )
};

interface EmployeeDetailViewProps {
  employee: Employee;
  onBack: () => void;
}

const EmployeeDetailView: React.FC<EmployeeDetailViewProps> = ({ employee, onBack }) => {
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  
  // Función para obtener clase CSS basada en estado
  const getEstadoClase = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'bg-green-100 text-green-800';
      case 'permiso':
        return 'bg-blue-100 text-blue-800';
      case 'ausencia':
        return 'bg-red-100 text-red-800';
      case 'planificado':
        return 'bg-blue-100 text-blue-800';
      case 'trabajó':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el texto del estado
  const getEstadoTexto = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'Trabajando';
      case 'permiso':
        return 'Permiso';
      case 'ausencia':
        return 'Ausencia';
      case 'planificado':
        return 'Planificado';
      case 'trabajó':
        return 'Trabajó';
      default:
        return estado;
    }
  };

  // Función para obtener el icono del método biométrico
  const getBiometricIcon = (metodo: string) => {
    const methodMap: Record<string, keyof typeof biometricIcons> = {
      'facial': 'rostro',
      'huella': 'huella',
      'huella_digital': 'huella',
      'smartphone': 'huella', // Asumimos smartphone como huella
      'manual': 'pin',
      'tarjeta': 'tarjeta',
      'computadora': 'huella', // Asumimos computadora como huella
      'pin': 'pin'
    };
    
    const iconKey = methodMap[metodo.toLowerCase()] || 'huella';
    return biometricIcons[iconKey];
  };

  // Función para obtener icono de dispositivo
  const getDeviceIcon = (dispositivo: string) => {
    return dispositivo === 'computadora' ? 
      <Computer className="w-5 h-5 text-gray-500" /> : 
      <Smartphone className="w-5 h-5 text-gray-500" />;
  };

  // Función para formatear la fecha
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Obtener marcajes del empleado, si existen
  const marcajes: Marcaje[] = employee.marcajes || [];
  
  // Si no hay marcajes pero hay ultimaAccion, crear marcajes simulados
  if (marcajes.length === 0 && employee.ultimaAccion) {
    const today = new Date().toISOString().split('T')[0];
    
    if (employee.ultimaAccion) {
      marcajes.push({
        fecha: today,
        hora: employee.ultimaAccion,
        tipo: 'entrada',
        dispositivo: employee.dispositivo || 'smartphone',
        metodo: 'facial',
        localizacion: employee.pais
      });
    }
    
    if (employee.ultimaAccion2) {
      marcajes.push({
        fecha: today,
        hora: employee.ultimaAccion2,
        tipo: 'salida',
        dispositivo: employee.dispositivo2 || 'smartphone',
        metodo: 'facial',
        localizacion: employee.pais
      });
    }
  }

  // Ordenar marcajes por fecha y hora
  const sortedMarcajes = [...marcajes].sort((a, b) => {
    const dateA = new Date(`${a.fecha} ${a.hora}`);
    const dateB = new Date(`${b.fecha} ${b.hora}`);
    return dateB.getTime() - dateA.getTime(); // Ordenar del más reciente al más antiguo
  });

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4">
        {/* Cabecera con botón de regreso */}
        <div className="flex items-center mb-4 bg-white p-3 rounded-lg shadow">
          <button 
            onClick={onBack}
            className="p-2 mr-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
            title="Volver al dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xl font-bold text-gray-800">
            Información del Empleado
          </div>
        </div>

        {/* Información del empleado */}
        <div className="bg-white rounded-lg shadow mb-4 p-6">
          <div className="flex items-start mb-6">
            <div className="mr-4">
              {employee.foto ? (
                <img 
                  src={employee.foto} 
                  alt={employee.nombre} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl text-gray-400">
                    {employee.nombre.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {employee.nombre}
              </h3>
              <div className="text-gray-600 flex items-center mb-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mr-2">
                  {employee.cargo || "Analista De Soporte"}
                </span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {employee.departamento || "Marketing"}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{employee.pais}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Planificación */}
        <div className="bg-white rounded-lg shadow mb-4 p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-blue-600">Planificación</h4>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Turno</p>
              <p className="font-medium">
                {employee.departamento ? `${employee.departamento} (08:00 - 17:00)` : "Administrativo Sede2 (08:00 Am - 05:00 Pm)"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Planificadas</p>
              <p className="font-medium">
                {employee.estado === 'ausencia' || employee.estado === 'permiso' ? 
                  '0 Hrs 0 Min' : '8 Hrs 0 Min'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Descansos</p>
              <p className="font-medium">1 Hrs 0 Min</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Estatus</p>
              <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getEstadoClase(employee.estado)}`}>
                {getEstadoTexto(employee.estado)}
              </span>
            </div>

            {/* Ícono al final */}
            <button
              onClick={() => setIsTimelineModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors ml-4"
            >
              <AlignVerticalJustifyCenter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tiempos */}
        <div className="bg-white rounded-lg shadow mb-4 p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-blue-600">Tiempos</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Trabajadas</p>
              <p className="font-medium">{employee.horas}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Extras</p>
              <p className="font-medium">
                {employee.horas && employee.horas.startsWith('0') ? '0 Hrs 0 Min' : 
                 (parseInt(employee.horas.split(' ')[0]) > 8 ? 
                  `${parseInt(employee.horas.split(' ')[0]) - 8} Hrs ${employee.horas.split(' ')[2] || '0'} Min` : 
                  '0 Hrs 0 Min')}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Ausencias</p>
              <p className="font-medium">
                {employee.estado === 'ausencia' ? employee.horas : '0 Hrs 0 Min'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Permiso</p>
              <p className="font-medium">
                {employee.estado === 'permiso' ? employee.horas : '--'}
              </p>
            </div>
          </div>
        </div>

        {/* Marcajes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <ArrowRightCircle className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-blue-600">Marcajes</h4>
          </div>
          
          <div className="overflow-x-auto bg-gray-50 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Día</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo de marcaje</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dispositivo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Método</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Localización</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedMarcajes.length > 0 ? (
                  sortedMarcajes.map((marcaje, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          {employee.foto ? (
                            <img 
                              src={employee.foto} 
                              alt="" 
                              className="w-8 h-8 rounded-full mr-2"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                              <span>{employee.nombre.charAt(0)}</span>
                            </div>
                          )}
                          <span>{formatDate(marcaje.fecha)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{marcaje.hora}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 ${marcaje.tipo === 'entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-full text-xs`}>
                          {marcaje.tipo === 'entrada' ? 'Entrada' : 'Salida'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {getDeviceIcon(marcaje.dispositivo)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500">
                          {getBiometricIcon(marcaje.metodo)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span>{marcaje.localizacion}</span>
                          <MapPin className="w-4 h-4 ml-1 text-blue-500" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                      No hay marcajes registrados para este empleado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TimelineModal 
        isOpen={isTimelineModalOpen} 
        onClose={() => setIsTimelineModalOpen(false)} 
      />
    </div>

  );
};

export default EmployeeDetailView;