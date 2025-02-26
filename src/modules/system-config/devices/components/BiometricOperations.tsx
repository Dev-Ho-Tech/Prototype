import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  FileDown, 
  Activity, 
  Trash2, 
  Clock, 
  Calendar, 
  RefreshCw, 
  UserMinus, 
  Users, 
  Download, 
  Upload, 
  Check
} from 'lucide-react';

interface BiometricOperationsProps {
  deviceId: string | number;
  deviceName: string;
  onClose: () => void;
}

export const BiometricOperations: React.FC<BiometricOperationsProps> = ({ 
  deviceId, 
  deviceName, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'time' | 'advanced'>('general');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [operationStatus, setOperationStatus] = useState<{
    isLoading: boolean;
    message: string;
    success?: boolean;
  }>({
    isLoading: false,
    message: ''
  });

  // Función para simular operaciones
  const handleOperation = (operation: string, extraInfo?: string) => {
    setOperationStatus({
      isLoading: true,
      message: `Ejecutando ${operation}...`
    });

    // Simulación de operación asíncrona
    setTimeout(() => {
      setOperationStatus({
        isLoading: false,
        message: `Operación ${operation} completada.`,
        success: true
      });

      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setOperationStatus({
          isLoading: false,
          message: ''
        });
      }, 3000);
    }, 2000);

    console.log(`Operación: ${operation}`, extraInfo || '');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Operaciones Biométricas - {deviceName}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Información del dispositivo */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Información del dispositivo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID</p>
                <p className="font-medium">{deviceId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{deviceName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estado</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Online</span>
              </div>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Operaciones Generales
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gestión de Personas
              </button>
              <button
                onClick={() => setActiveTab('time')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'time'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Horarios y Tiempo
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'advanced'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Operaciones Avanzadas
              </button>
            </div>
          </div>

          {/* Status/Feedback Message */}
          {operationStatus.message && (
            <div className={`mb-6 p-4 rounded-lg ${operationStatus.success ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'}`}>
              <div className="flex items-center">
                {operationStatus.isLoading ? (
                  <div className="animate-spin mr-2">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                ) : operationStatus.success ? (
                  <Check className="h-5 w-5 mr-2" />
                ) : null}
                <p>{operationStatus.message}</p>
              </div>
            </div>
          )}

          {/* Contenido del Tab */}
          <div className="space-y-6">
            {/* Operaciones Generales */}
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('sincronizar usuarios')}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sincronizar usuarios</span>
                </button>
                
                <button 
                  className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('obtener logs')}
                >
                  <FileDown className="w-5 h-5" />
                  <span>Obtener logs</span>
                </button>
                
                <button 
                  className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('verificar conexión')}
                >
                  <Activity className="w-5 h-5" />
                  <span>Verificar conexión</span>
                </button>
                
                <button 
                  className="p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('reiniciar dispositivo')}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Reiniciar dispositivo</span>
                </button>
              </div>
            )}

            {/* Gestión de Personas */}
            {activeTab === 'users' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleOperation('reenviar personas')}
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Reenviar personas</span>
                  </button>
                  
                  <button 
                    className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleOperation('eliminar personas')}
                  >
                    <UserMinus className="w-5 h-5" />
                    <span>Eliminar personas</span>
                  </button>
                  
                  <button 
                    className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleOperation('limpiar personas')}
                  >
                    <Trash2 className="w-5 h-5" />
                    <span>Limpiar personas</span>
                  </button>
                  
                  <button 
                    className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleOperation('sincronizar permisos')}
                  >
                    <Users className="w-5 h-5" />
                    <span>Sincronizar permisos</span>
                  </button>
                </div>
              </div>
            )}

            {/* Horarios y Tiempo */}
            {activeTab === 'time' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Actualizar hora del dispositivo</h3>
                  <button 
                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    onClick={() => handleOperation('actualizar hora')}
                  >
                    <Clock className="w-5 h-5" />
                    <span>Sincronizar con hora del servidor</span>
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Reenviar horarios de acceso</h3>
                  <button 
                    className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 mb-4"
                    onClick={() => handleOperation('reenviar horarios')}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Reenviar todos los horarios</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Solicitar marcajes por período</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  </div>
                  <button 
                    className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
                    onClick={() => handleOperation('solicitar marcajes', `desde ${startDate} hasta ${endDate}`)}
                    disabled={!startDate || !endDate}
                  >
                    <Download className="w-5 h-5" />
                    <span>Solicitar marcajes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Operaciones Avanzadas */}
            {activeTab === 'advanced' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('borrar todos los datos')}
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Borrar todos los datos</span>
                </button>
                
                <button 
                  className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('restaurar valores de fábrica')}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Restaurar valores de fábrica</span>
                </button>
                
                <button 
                  className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('actualizar firmware')}
                >
                  <Upload className="w-5 h-5" />
                  <span>Actualizar firmware</span>
                </button>
                
                <button 
                  className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
                  onClick={() => handleOperation('obtener información técnica')}
                >
                  <FileDown className="w-5 h-5" />
                  <span>Obtener información técnica</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricOperations;