import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export function VipsConfig() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Integración VIPS 3.0</h3>
        
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <span className="text-green-700">Conexión establecida correctamente</span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL de conexión
            </label>
            <input
              type="text"
              defaultValue="https://vips.example.com/api/v3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              API Key
            </label>
            <input
              type="password"
              defaultValue="••••••••••••••••"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Intervalo de sincronización (minutos)
            </label>
            <input
              type="number"
              min="5"
              max="60"
              defaultValue="15"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Timeout de conexión (segundos)
            </label>
            <input
              type="number"
              min="5"
              max="30"
              defaultValue="10"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Mapeo de datos</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estructura organizacional
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="departments">Departamentos</option>
              <option value="cost_centers">Centros de costo</option>
              <option value="both">Ambos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Códigos de empleados
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="internal">Código interno</option>
              <option value="vips">Código VIPS</option>
              <option value="both">Mantener ambos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipos de horas
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Horas normales
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Horas extras
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Horas nocturnas
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-700">
                  Feriados
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}