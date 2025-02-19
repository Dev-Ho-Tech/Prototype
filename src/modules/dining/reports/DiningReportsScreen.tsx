import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, Clock, Users, Coffee, BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, Mail } from 'lucide-react';
import { CustomPieChart } from '../../../components/common/PieChart';

export function DiningReportsScreen() {
  const [dateRange, setDateRange] = useState('week');
  const [selectedDiningRoom, setSelectedDiningRoom] = useState('all');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['usage', 'time', 'capacity']);

  const usageData = [
    { name: 'Desayuno', value: 250, color: '#4F46E5' },
    { name: 'Almuerzo', value: 450, color: '#10B981' },
    { name: 'Cena', value: 200, color: '#F59E0B' }
  ];

  const departmentData = [
    { name: 'Front Desk', value: 180, color: '#EF4444' },
    { name: 'Housekeeping', value: 320, color: '#F59E0B' },
    { name: 'Cocina', value: 250, color: '#10B981' },
    { name: 'Mantenimiento', value: 150, color: '#3B82F6' }
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Reportes de Uso</h1>
            <p className="mt-1 text-sm text-gray-500">
              Análisis detallado del uso de comedores
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Programar envío</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Uso diario promedio</p>
                <p className="text-2xl font-semibold text-gray-900">895</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+5.2% vs semana anterior</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tiempo promedio</p>
                <p className="text-2xl font-semibold text-gray-900">32 min</p>
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  <span>-2.1% vs semana anterior</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pico de ocupación</p>
                <p className="text-2xl font-semibold text-amber-600">85%</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>12:30 PM</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-amber-400" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Satisfacción</p>
                <p className="text-2xl font-semibold text-green-600">4.5/5.0</p>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>+0.3 vs mes anterior</span>
                </div>
              </div>
              <BarChart2 className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="day">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="custom">Personalizado</option>
              </select>
              <select
                value={selectedDiningRoom}
                onChange={(e) => setSelectedDiningRoom(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los comedores</option>
                <option value="main">Comedor Principal</option>
                <option value="executive">Comedor Ejecutivo</option>
              </select>
              <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <CustomPieChart
            data={usageData}
            title="Distribución por tipo de comida"
          />
          <CustomPieChart
            data={departmentData}
            title="Distribución por departamento"
          />
        </div>

        {/* Detailed Reports */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Análisis Detallado</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Usage Patterns */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Patrones de Uso</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Hora pico</span>
                    <span className="text-sm font-medium">12:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Día más ocupado</span>
                    <span className="text-sm font-medium">Miércoles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Turno preferido</span>
                    <span className="text-sm font-medium">Almuerzo</span>
                  </div>
                </div>
              </div>

              {/* Efficiency Metrics */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Métricas de Eficiencia</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Tiempo promedio</span>
                    <span className="text-sm font-medium">32 minutos</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Ocupación promedio</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Rotación</span>
                    <span className="text-sm font-medium">1.8x</span>
                  </div>
                </div>
              </div>

              {/* Incidents */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-900">Incidencias</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Accesos denegados</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Excesos de tiempo</span>
                    <span className="text-sm font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Conflictos</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}