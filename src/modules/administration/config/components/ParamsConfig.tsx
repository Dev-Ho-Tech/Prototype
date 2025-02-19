import React from 'react';

export function ParamsConfig() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Parametrización</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tiempo mínimo entre marcajes (minutos)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              defaultValue="1"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tolerancia para tardanzas (minutos)
            </label>
            <input
              type="number"
              min="0"
              max="30"
              defaultValue="5"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Redondeo de tiempos
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="1">1 minuto</option>
              <option value="5">5 minutos</option>
              <option value="10">10 minutos</option>
              <option value="15">15 minutos</option>
              <option value="30">30 minutos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de redondeo
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="nearest">Al más cercano</option>
              <option value="up">Hacia arriba</option>
              <option value="down">Hacia abajo</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">Cálculo de horas extras</h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">
                Calcular automáticamente
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mínimo de horas extras (minutos)
            </label>
            <input
              type="number"
              min="15"
              max="60"
              defaultValue="30"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Máximo de horas extras por día
            </label>
            <input
              type="number"
              min="1"
              max="8"
              defaultValue="4"
              className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Requerir aprobación para
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="all">Todas las horas extras</option>
              <option value="over2">Más de 2 horas</option>
              <option value="over4">Más de 4 horas</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}