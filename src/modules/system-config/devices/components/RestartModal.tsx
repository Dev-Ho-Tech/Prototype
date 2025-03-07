import { useState, useEffect } from 'react';
import { RefreshCw, X, CheckCircle } from 'lucide-react';

interface RestartModalProps {
  deviceName: string;
  onClose: () => void;
}

export function RestartModal({ deviceName, onClose }: RestartModalProps) {
  const [restarting, setRestarting] = useState(true);

  useEffect(() => {
    // Simular el reinicio después de 2 segundos
    const timer = setTimeout(() => {
      setRestarting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {restarting ? (
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-orange-600 animate-spin" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900">
                {restarting ? 'Reiniciando dispositivo' : 'Dispositivo reiniciado'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            {restarting 
              ? `El dispositivo "${deviceName}" se está reiniciando. Por favor, espere...` 
              : `El dispositivo "${deviceName}" se ha reiniciado con éxito.`}
          </p>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${restarting 
                  ? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500' 
                  : 'border border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
            >
              {restarting ? 'Cerrar' : 'Aceptar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}