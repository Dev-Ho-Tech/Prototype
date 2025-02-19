import React, { useState } from 'react';
import { Send } from 'lucide-react';

export function EmailConfig() {
  const [isTesting, setIsTesting] = useState(false);

  const handleTestEmail = async () => {
    setIsTesting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Aquí iría la lógica real de prueba
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de Correo</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Servidor SMTP
            </label>
            <input
              type="text"
              defaultValue="smtp.office365.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Puerto
            </label>
            <input
              type="number"
              defaultValue="587"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="email"
              defaultValue="notificaciones@empresa.com"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre para mostrar
            </label>
            <input
              type="text"
              defaultValue="Sistema de Control de Asistencia"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de encriptación
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
              <option value="none">Ninguno</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Prueba de correo</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo de prueba
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="email"
                placeholder="ejemplo@empresa.com"
                className="flex-1 rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={handleTestEmail}
                disabled={isTesting}
                className={`
                  inline-flex items-center px-4 py-2 border border-transparent rounded-r-md
                  text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${isTesting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <Send className="w-4 h-4 mr-2" />
                {isTesting ? 'Enviando...' : 'Enviar prueba'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}