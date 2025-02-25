import React from 'react';
import { MapPin, Clock, Calendar, ArrowRightCircle, Smartphone, Laptop } from 'lucide-react';
import type { Employee } from '../interface/types';

interface EmployeeDetailProps {
  empleado: Employee;
  onClose: () => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ empleado, onClose }) => {
  const getEstadoClase = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'bg-green-100 text-green-800';
      case 'permiso':
        return 'bg-orange-100 text-orange-800';
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

  // const getDispositivoIcon = (dispositivo: string | null) => {
  //   if (!dispositivo) return null;
    
  //   return dispositivo === 'computadora' 
  //     ? <Laptop className="w-4 h-4 text-gray-600" /> 
  //     : <Smartphone className="w-4 h-4 text-gray-600" />;
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Cabecera */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Información</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-blue-200"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Información del empleado */}
        <div className="p-6">
          <div className="flex items-start mb-6">
            <div className="mr-4">
              {empleado.foto ? (
                <img 
                  src={empleado.foto} 
                  alt={empleado.nombre} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl text-gray-400">
                    {empleado.nombre.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {empleado.nombre}
              </h3>
              <div className="text-gray-600 flex items-center mb-1">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mr-2">
                  Analista De Soporte
                </span>
                <span className="text-gray-500 text-sm">Soporte</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{empleado.pais}</span>
              </div>
            </div>
          </div>

          {/* Planificación */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-blue-600">Planificación</h4>
            </div>
            
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Turno</p>
                <p className="font-medium">Administrativo Sede2 (08:00 Am - 05:00 Pm)</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Planificadas</p>
                <p className="font-medium">9 Hrs 0 Min</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Descansos</p>
                <p className="font-medium">1 Hrs 0 Min</p>
              </div>
              
              <div className="col-span-3">
                <p className="text-sm text-gray-500">Estatus</p>
                <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getEstadoClase(empleado.estado)}`}>
                  {getEstadoTexto(empleado.estado)}
                </span>
              </div>
            </div>
          </div>

          {/* Tiempos */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-blue-600">Tiempos</h4>
            </div>
            
            <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Trabajadas</p>
                <p className="font-medium">3 Hrs 25 Min</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Extras</p>
                <p className="font-medium">0 Hrs 0 Min</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Ausencias</p>
                <p className="font-medium">0 Hrs 0 Min</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Permiso</p>
                <p className="font-medium">--</p>
              </div>
            </div>
          </div>

          {/* Marcajes */}
          <div>
            <div className="flex items-center mb-2">
              <ArrowRightCircle className="w-5 h-5 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-blue-600">Marcajes</h4>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden">
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
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <img 
                          src={empleado.foto || "https://via.placeholder.com/40"} 
                          alt="" 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>2 Agosto 2024</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">11:35 am</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Entrada</span>
                    </td>
                    <td className="px-4 py-3">
                      <Smartphone className="w-5 h-5 text-gray-500" />
                    </td>
                    <td className="px-4 py-3">
                      <img src="/api/placeholder/20/20" alt="facial" className="w-5 h-5" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>{empleado.pais}</span>
                        <MapPin className="w-4 h-4 ml-1 text-blue-500" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                          <span>C</span>
                        </div>
                        <span>2 Agosto 2024</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">11:00 am</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Salida</span>
                    </td>
                    <td className="px-4 py-3">
                      <Smartphone className="w-5 h-5 text-gray-500" />
                    </td>
                    <td className="px-4 py-3">
                      <Smartphone className="w-5 h-5 text-gray-500" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>{empleado.pais}</span>
                        <MapPin className="w-4 h-4 ml-1 text-blue-500" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                          <span>C</span>
                        </div>
                        <span>2 Agosto 2024</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">07:00 am</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Entrada</span>
                    </td>
                    <td className="px-4 py-3">
                      <Smartphone className="w-5 h-5 text-gray-500" />
                    </td>
                    <td className="px-4 py-3">
                      <Laptop className="w-5 h-5 text-gray-500" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <span>{empleado.pais}</span>
                        <MapPin className="w-4 h-4 ml-1 text-blue-500" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;