import React, { useState } from 'react';
import { Clock, Users, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Componente para los paneles de estadísticas
interface DataEntry {
  value: number;
  color: string;
  name: string;
  details?: string;
}

interface NovedadesTiempoEntry {
  name: string;
  value: number;
  color: string;
  details: string;
}

interface StatisticsPanelsProps {
  estadoDelDiaData: DataEntry[];
  tiemposData: DataEntry[];
  novedadesTiempoData?: NovedadesTiempoEntry[];
}



const StatisticsPanels: React.FC<StatisticsPanelsProps> = ({ 
  estadoDelDiaData, 
  tiemposData,
  novedadesTiempoData = [
    { name: 'Tardanzas', value: 30, color: '#10b981', details: '0h 32m' },
    { name: 'Intempestivas', value: 15, color: '#3b82f6', details: '1h 27m' },
    { name: 'Permisos', value: 20, color: '#f59e0b', details: '47h 58m' },
    { name: 'Ausencias', value: 25, color: '#ef4444', details: '84h 0m' },
  ]
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {/* Panel de personas con novedades */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-gray-700 mb-3">Personas con novedades</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
              <Clock className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <div className="font-bold text-lg">1</div>
              <div className="text-xs text-gray-500">Tardanzas</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
              <Users className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="font-bold text-lg">2</div>
              <div className="text-xs text-gray-500">Permisos</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-lg">2</div>
              <div className="text-xs text-gray-500">Salidas Intemp...</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <div className="font-bold text-lg">9</div>
              <div className="text-xs text-gray-500">Ausencias</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="font-bold text-lg">0</div>
              <div className="text-xs text-gray-500">Sin Horario</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center">
              <Clock className="w-4 h-4 text-pink-600" />
            </div>
            <div>
              <div className="font-bold text-lg">0</div>
              <div className="text-xs text-gray-500">Horas Extras</div>
            </div>
          </div>
        </div>
      </div>

      {/* Estado del día */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-gray-700 mb-3">Estado del día</h2>
        <div className="flex items-center justify-between">
          <div className="h-32 w-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estadoDelDiaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={(_, index) => setHoveredSegment(`estado_${index}`)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  {estadoDelDiaData.map((entry, index) => (
                    <Cell 
                      key={`cell-estado-${index}`} 
                      fill={entry.color} 
                      stroke={hoveredSegment === `estado_${index}` ? '#333' : 'none'}
                      strokeWidth={hoveredSegment === `estado_${index}` ? 2 : 0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-xl font-bold text-gray-800">3</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm">Trabajando</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm">Trabajaron</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-sm">Planificados: 15</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-sm">Sin planificación: 0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tiempos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-gray-700 mb-3">Tiempos</h2>
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tiemposData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={(_, index) => setHoveredSegment(`tiempo_${index}`)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  {tiemposData.map((entry, index) => (
                    <Cell 
                      key={`cell-tiempo-${index}`} 
                      fill={entry.color} 
                      stroke={hoveredSegment === `tiempo_${index}` ? '#333' : 'none'}
                      strokeWidth={hoveredSegment === `tiempo_${index}` ? 2 : 0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg font-bold text-gray-800">139hs</div>
            </div>
          </div>
          <div className="space-y-2 ml-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm">Trabajadas: 7h 11m</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm">Planificadas: 132h 15m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Novedades de tiempos (Nuevo panel) */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-bold text-gray-700 mb-3">Novedades de tiempos</h2>
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={novedadesTiempoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={(_, index) => setHoveredSegment(`novedad_${index}`)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  {novedadesTiempoData.map((entry, index) => (
                    <Cell 
                      key={`cell-novedad-${index}`} 
                      fill={entry.color} 
                      stroke={hoveredSegment === `novedad_${index}` ? '#333' : 'none'}
                      strokeWidth={hoveredSegment === `novedad_${index}` ? 2 : 0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-lg font-bold text-gray-800">149hs</div>
            </div>
          </div>
          <div className="space-y-2 ml-4 max-h-32 overflow-y-auto">
            {novedadesTiempoData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{`${item.name}: ${item.details}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanels;