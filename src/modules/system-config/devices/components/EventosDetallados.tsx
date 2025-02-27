import  { useState } from 'react';
import { X, Search,  Download, ArrowUpRight, ArrowDownLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import {  devicesData, eventosDetallados } from '../data';


interface EventosDetalladosProps {
  deviceId: string;
  deviceName: string;
  onClose: () => void;
}

export function EventosDetallados({ deviceId, deviceName, onClose }: EventosDetalladosProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [filtroVerificacion, setFiltroVerificacion] = useState('TODOS');

  // Filtrar eventos según los criterios y según el dispositivo específico
  const eventosFiltrados = eventosDetallados.filter(evento => {
    // Filtro por dispositivo
    const matchesDevice = evento.deviceId === deviceId;
    
    // Filtro por búsqueda (nombre o ID de empleado)
    const matchesSearch = searchTerm === '' || 
      evento.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por tipo de evento
    const matchesEventType = filtroTipo === 'TODOS' || evento.eventType === filtroTipo;
    
    // Filtro por verificación
    const matchesVerification = filtroVerificacion === 'TODOS' || evento.verificationType === filtroVerificacion;
    
    // Filtro por fechas
    let matchesDates = true;
    if (startDate !== '') {
      const eventDate = new Date(evento.timestamp);
      const startFilterDate = new Date(startDate);
      startFilterDate.setHours(0, 0, 0, 0);
      
      if (eventDate < startFilterDate) {
        matchesDates = false;
      }
    }
    
    if (endDate !== '') {
      const eventDate = new Date(evento.timestamp);
      const endFilterDate = new Date(endDate);
      endFilterDate.setHours(23, 59, 59, 999);
      
      if (eventDate > endFilterDate) {
        matchesDates = false;
      }
    }
    
    return matchesDevice && matchesSearch && matchesEventType && matchesVerification && matchesDates;
  });

  const getEventTypeStyle = (eventType: string) => {
    switch (eventType) {
      case 'ENTRADA':
        return 'bg-green-100 text-green-800';
      case 'SALIDA':
        return 'bg-blue-100 text-blue-800';
      case 'COMEDOR':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationTypeStyle = (verificationType: string) => {
    switch (verificationType) {
      case 'VERIFICADO':
        return 'bg-green-100 text-green-800';
      case 'NO_VERIFICADO':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationIcon = (verificationMethod: string) => {
    switch (verificationMethod) {
      case 'HUELLA_DIGITAL':
        return <span className="text-blue-600">👆</span>;
      case 'ROSTRO':
        return <span className="text-purple-600">👤</span>;
      case 'TARJETA':
        return <span className="text-orange-600">💳</span>;
      case 'PIN':
        return <span className="text-gray-600">🔢</span>;
      default:
        return <span className="text-gray-600">❓</span>;
    }
  };

  const handleExport = () => {
    // Función para exportar los datos a CSV o Excel
    alert('Exportando datos...');
  };

  // Buscar el dispositivo actual para obtener detalles
  const currentDevice = devicesData.find(device => device.id === deviceId);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Eventos detallados - {deviceName}
              </h2>
              {currentDevice && (
                <p className="text-sm text-gray-500 mt-1">
                  Ubicación: {currentDevice.location} | Último sincronizado: {currentDevice.lastSync ? new Date(currentDevice.lastSync).toLocaleString() : 'N/A'}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Estadísticas rápidas */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="text-sm font-medium text-gray-700">Eventos hoy</h3>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">24</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <ArrowDownLeft className="w-5 h-5 text-green-500" />
                <h3 className="text-sm font-medium text-gray-700">Entradas</h3>
              </div>
              <p className="mt-2 text-2xl font-semibold text-green-600">15</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-5 h-5 text-blue-500" />
                <h3 className="text-sm font-medium text-gray-700">Salidas</h3>
              </div>
              <p className="mt-2 text-2xl font-semibold text-blue-600">9</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <h3 className="text-sm font-medium text-gray-700">Alertas</h3>
              </div>
              <p className="mt-2 text-2xl font-semibold text-yellow-600">2</p>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por empleado o ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button 
                onClick={handleExport}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Exportar</span>
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha inicial
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha final
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de evento
                </label>
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="TODOS">Todos</option>
                  <option value="ENTRADA">Entrada</option>
                  <option value="SALIDA">Salida</option>
                  <option value="COMEDOR">Comedor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verificación
                </label>
                <select
                  value={filtroVerificacion}
                  onChange={(e) => setFiltroVerificacion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="TODOS">Todos</option>
                  <option value="VERIFICADO">Verificado</option>
                  <option value="NO_VERIFICADO">No verificado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de eventos */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha y hora
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Empleado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verificación
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Método
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detalles
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {eventosFiltrados.map((evento) => (
                    <tr key={evento.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(evento.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{evento.employeeName}</div>
                        <div className="text-sm text-gray-500">{evento.employeeId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeStyle(evento.eventType)}`}>
                          {evento.eventType === 'ENTRADA' ? (
                            <ArrowDownLeft className="w-3 h-3 mr-1" />
                          ) : evento.eventType === 'SALIDA' ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {evento.eventType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVerificationTypeStyle(evento.verificationType)}`}>
                          {evento.verificationType === 'VERIFICADO' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {evento.verificationType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {getVerificationIcon(evento.verificationMethod)}
                          <span className="ml-1">{evento.verificationMethod.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {evento.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {eventosFiltrados.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500">No se encontraron eventos con los filtros seleccionados.</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Mostrando {eventosFiltrados.length} de {eventosDetallados.filter(ev => ev.deviceId === deviceId).length} eventos
            </p>
            
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700">
                Anterior
              </button>
              <button className="px-3 py-1 bg-blue-50 border border-blue-300 rounded-lg text-sm text-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}