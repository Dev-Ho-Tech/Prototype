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

// Interfaz para las tarjetas de novedades individuales
interface NovedadCard {
  id: string;
  count: number;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  borderColor: string;
}

interface StatisticsPanelsProps {
  estadoDelDiaData: DataEntry[];
  tiemposData: DataEntry[];
  novedadesTiempoData?: NovedadesTiempoEntry[];
  novedadesCards?: NovedadCard[];
}

const StatisticsPanels: React.FC<StatisticsPanelsProps> = ({ 
  estadoDelDiaData, 
  tiemposData,
  novedadesTiempoData = [
    { name: 'Tardanzas', value: 30, color: '#10b981', details: '0h 32m' },
    { name: 'Intempestivas', value: 15, color: '#3b82f6', details: '1h 27m' },
    { name: 'Permisos', value: 20, color: '#f59e0b', details: '47h 58m' },
    { name: 'Ausencias', value: 25, color: '#ef4444', details: '84h 0m' },
  ],
  novedadesCards = [
    { 
      id: 'tardanzas', 
      count: 1, 
      label: 'Tardanzas', 
      color: '#f4a72c', 
      bgColor: '#fff9e6', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#f4a72c'
    },
    { 
      id: 'permisos', 
      count: 2, 
      label: 'Permisos', 
      color: '#5c6cfa', 
      bgColor: '#eef0ff', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#5c6cfa'
    },
    { 
      id: 'salidas', 
      count: 2, 
      label: 'Salidas Intemp.', 
      color: '#5c6cfa', 
      bgColor: '#eef0ff', 
      icon: <Users className="w-5 h-5" />,
      borderColor: '#5c6cfa'
    },
    { 
      id: 'ausencias', 
      count: 9, 
      label: 'Ausencias', 
      color: '#fa5c5c', 
      bgColor: '#ffeef0', 
      icon: <AlertTriangle className="w-5 h-5" />,
      borderColor: '#fa5c5c'
    },
    { 
      id: 'sin-horario', 
      count: 0, 
      label: 'Sin Horario', 
      color: '#9333ea', 
      bgColor: '#f5eeff', 
      icon: <AlertTriangle className="w-5 h-5" />,
      borderColor: '#9333ea'
    },
    { 
      id: 'horas-extras', 
      count: 0, 
      label: 'Horas Extras', 
      color: '#d946ef', 
      bgColor: '#fceeff', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#d946ef'
    },
  ]
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  return (
    <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {novedadesCards.map((card) => (
          <div 
            key={card.id}
            className="bg-white rounded-lg shadow relative overflow-hidden"
            style={{ backgroundColor: card.bgColor }}
          >
            {/* Barra inferior de color */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ backgroundColor: card.borderColor }}
            ></div>
            
            {/* Contenido de la tarjeta */}
            <div className="p-3">
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold" style={{ color: card.color }}>
                  {card.count}
                </div>
                <div style={{ color: card.color }}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-1" style={{ color: card.color }}>
                <span className="text-sm">{card.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Primera fila con 3 paneles principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Novedades de tiempos */}
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
      
      {/* Segunda fila con tarjetas individuales de novedades */}

      {/* Espacio de 5px para separación */}
      <div className="h-[4px]"></div>
    </div>
  );
};

export default StatisticsPanels;