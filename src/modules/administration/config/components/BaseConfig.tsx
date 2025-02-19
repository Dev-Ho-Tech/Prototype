import React from 'react';

export function BaseConfig() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración Base</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zona horaria
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="America/Santo_Domingo">America/Santo_Domingo (GMT-4)</option>
              <option value="America/New_York">America/New_York (GMT-5)</option>
              <option value="America/Chicago">America/Chicago (GMT-6)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (GMT-8)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idioma predeterminado
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Formato de fecha
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Formato de hora
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="12">12 horas (AM/PM)</option>
              <option value="24">24 horas</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Políticas de contraseñas</h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                Requerir mayúsculas y minúsculas
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                Requerir números
              </span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                Requerir caracteres especiales
              </span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Longitud mínima
            </label>
            <input
              type="number"
              min="8"
              max="32"
              defaultValue="8"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Tiempo de sesión</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tiempo de inactividad (minutos)
            </label>
            <input
              type="number"
              min="5"
              max="120"
              defaultValue="30"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duración máxima de sesión (horas)
            </label>
            <input
              type="number"
              min="1"
              max="24"
              defaultValue="8"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}