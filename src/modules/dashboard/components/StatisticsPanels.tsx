/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { Clock, Users, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
  tooltip?: string; // Tooltip adicional para mostrar información extra
}

// Componente personalizado para el tooltip de hover
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 shadow-lg rounded border border-gray-200 text-xs">
        <p className="font-semibold">{data.name}</p>
        <p>{data.details || `${data.value}%`}</p>
        {data.additionalInfo && <p>{data.additionalInfo}</p>}
      </div>
    );
  }
  return null;
};

// Tooltip que se muestra al hacer clic en un segmento
const ClickTooltip = ({ visible, data, position, onClick }: any) => {
  if (!visible || !data) return null;
  
  return (
    <div 
      className="fixed bg-black bg-opacity-80 text-white px-3 py-2 rounded text-sm z-50 shadow-lg border border-gray-600"
      style={{ 
        top: position.y, 
        left: position.x,
        transform: 'translate(-50%, -120%)',
      }}
      onClick={onClick}
    >
      <p className="font-bold text-center">{data.name}</p>
      <p className="text-center font-semibold text-lg">{data.value}%</p>
      {data.details && <p className="text-center">{data.details}</p>}
      {data.additionalInfo && <p className="text-xs text-gray-300 text-center">{data.additionalInfo}</p>}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-black border-r border-b border-gray-600"></div>
    </div>
  );
};

// Componente de tarjeta individual con tooltip
const NovedadCardItem = ({ card }: { card: NovedadCard }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-white rounded-lg shadow relative overflow-hidden transition-all duration-200 cursor-pointer ${
        isHovered ? 'transform scale-105 shadow-md' : ''
      }`}
      style={{ backgroundColor: card.bgColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      {isHovered && card.tooltip && (
        <div className="absolute z-10 -top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {card.tooltip}
        </div>
      )}
      
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
  );
};

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
      borderColor: '#f4a72c',
      tooltip: 'Empleados que llegaron tarde: 1'
    },
    { 
      id: 'permisos', 
      count: 2, 
      label: 'Permisos', 
      color: '#5c6cfa', 
      bgColor: '#eef0ff', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#5c6cfa',
      tooltip: 'Permisos aprobados: 2'
    },
    { 
      id: 'salidas', 
      count: 2, 
      label: 'Salidas Intemp.', 
      color: '#5c6cfa', 
      bgColor: '#eef0ff', 
      icon: <Users className="w-5 h-5" />,
      borderColor: '#5c6cfa',
      tooltip: 'Salidas intempestivas: 2'
    },
    { 
      id: 'ausencias', 
      count: 9, 
      label: 'Ausencias', 
      color: '#fa5c5c', 
      bgColor: '#ffeef0', 
      icon: <AlertTriangle className="w-5 h-5" />,
      borderColor: '#fa5c5c',
      tooltip: 'Total de ausencias: 9'
    },
    { 
      id: 'sin-horario', 
      count: 0, 
      label: 'Sin Horario', 
      color: '#9333ea', 
      bgColor: '#f5eeff', 
      icon: <AlertTriangle className="w-5 h-5" />,
      borderColor: '#9333ea',
      tooltip: 'Empleados sin horario asignado: 0'
    },
    { 
      id: 'horas-extras', 
      count: 0, 
      label: 'Horas Extras', 
      color: '#d946ef', 
      bgColor: '#fceeff', 
      icon: <Clock className="w-5 h-5" />,
      borderColor: '#d946ef',
      tooltip: 'Total de horas extras: 0'
    },
  ]
}) => {
  const chartRefs = {
    estado: useRef<HTMLDivElement>(null),
    tiempo: useRef<HTMLDivElement>(null),
    novedad: useRef<HTMLDivElement>(null)
  };
  
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [, setActiveTooltip] = useState<string | null>(null);
  const [clickedSegment, setClickedSegment] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Detecta clicks fuera de los gráficos para cerrar el tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideCharts = 
        chartRefs.estado.current && !chartRefs.estado.current.contains(event.target as Node) &&
        chartRefs.tiempo.current && !chartRefs.tiempo.current.contains(event.target as Node) &&
        chartRefs.novedad.current && !chartRefs.novedad.current.contains(event.target as Node);
      
      // Si el clic no fue en un tooltip y no fue en uno de los gráficos, cerramos el tooltip
      if (isOutsideCharts && !(event.target as HTMLElement).closest('.tooltip-click')) {
        setClickedSegment(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Preparar datos con información adicional para los tooltips
  const enhancedEstadoDelDiaData = estadoDelDiaData.map(entry => ({
    ...entry,
    additionalInfo: entry.name === 'Trabajando' ? 'En su puesto de trabajo' : 
                  entry.name === 'Trabajaron' ? 'Ya terminaron su jornada' :
                  'Sin información adicional'
  }));

  const enhancedTiemposData = tiemposData.map(entry => ({
    ...entry,
    additionalInfo: entry.name === 'Trabajadas' ? 'Horas efectivamente laboradas' : 
                  entry.name === 'Planificadas' ? 'Horas según horario establecido' :
                  'Sin información adicional'
  }));
  
  // Función para actualizar el estado de hover cuando se hace click en la leyenda
  const handleLegendClick = (sectionPrefix: string, index: number, data: any, event?: React.MouseEvent) => {
    const segmentId = `${sectionPrefix}_${index}`;
    
    // Si es el mismo segmento, cerramos el tooltip
    if (hoveredSegment === segmentId && clickedSegment?.name === data.name) {
      setHoveredSegment(null);
      setActiveTooltip(null);
      setClickedSegment(null);
      return;
    }
    
    // Si hay un evento, usamos su posición, de lo contrario usamos una posición predeterminada
    if (event) {
      const chartRef = chartRefs[sectionPrefix as keyof typeof chartRefs].current;
      if (chartRef) {
        const rect = chartRef.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top;
        setTooltipPosition({ x, y });
      } else {
        // Si no podemos obtener la referencia del gráfico, usamos la posición del evento
        setTooltipPosition({ 
          x: event.clientX, 
          y: event.clientY - 10  // Ajustamos un poco para que no quede encima del cursor
        });
      }
    }
    
    setHoveredSegment(segmentId);
    setActiveTooltip(segmentId);
    setClickedSegment(data);
  };
  
  // Función para manejar el clic en un segmento del gráfico
  const handlePieClick = (data: any, index: number, sectionPrefix: string, event: any) => {
    event.stopPropagation();
    
    // Obtener la posición del click para ubicar el tooltip
    let tooltipX = 0;
    let tooltipY = 0;
    
    // Si es un evento de Recharts, tiene chartX y chartY
    if (event && event.chartX && event.chartY) {
      tooltipX = event.chartX;
      tooltipY = event.chartY;
    } 
    // Si es un evento de React, usamos clientX y clientY
    else if (event && event.clientX && event.clientY) {
      tooltipX = event.clientX;
      tooltipY = event.clientY;
    }
    // Si es un evento DOM normal, intentamos obtener la posición del elemento
    else if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      tooltipX = rect.left + rect.width / 2;
      tooltipY = rect.top;
    }
    
    // Actualizar posición del tooltip
    setTooltipPosition({ x: tooltipX, y: tooltipY });
    
    // Actualizar el segmento activo
    const segmentId = `${sectionPrefix}_${index}`;
    if (clickedSegment && clickedSegment.name === data.name) {
      // Si ya está seleccionado, lo cerramos
      setClickedSegment(null);
      setHoveredSegment(null);
    } else {
      // Si es nuevo o diferente, lo seleccionamos
      setClickedSegment(data);
      setHoveredSegment(segmentId);
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Tooltip para los segmentos clickeados */}
      {clickedSegment && (
        <ClickTooltip 
          visible={!!clickedSegment} 
          data={clickedSegment} 
          position={tooltipPosition} 
          onClick={() => setClickedSegment(null)}
        />
      )}
      
      {/* Fila de tarjetas KPI con hover effect */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {novedadesCards.map((card) => (
          <NovedadCardItem key={card.id} card={card} />
        ))}
      </div>

      {/* Primera fila con 3 paneles principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Estado del día */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-gray-700 mb-3">Estado del día</h2>
          <div className="flex items-center justify-between">
            <div ref={chartRefs.estado} className="h-32 w-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={(e) => console.log('chart clicked', e)}>
                  <Pie
                    data={enhancedEstadoDelDiaData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(data, index, e) => {
                      e.stopPropagation();
                      handlePieClick(data, index, 'estado', e);
                    }}
                  >
                    {enhancedEstadoDelDiaData.map((entry, index) => (
                      <Cell 
                        key={`cell-estado-${index}`} 
                        fill={entry.color} 
                        stroke="none"
                        style={{
                          transform: (hoveredSegment === `estado_${index}` || clickedSegment?.name === entry.name) ? 'scale(1.08) translateY(-3px)' : 'none',
                          transformOrigin: '50% 50%',
                          transition: 'transform 0.2s ease-out',
                          zIndex: (hoveredSegment === `estado_${index}` || clickedSegment?.name === entry.name) ? 10 : 1,
                          filter: (hoveredSegment === `estado_${index}` || clickedSegment?.name === entry.name) ? 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))' : 'none',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={() => {
                          setHoveredSegment(`estado_${index}`);
                          setActiveTooltip(`estado_${index}`);
                        }}
                        onMouseLeave={() => {
                          if (clickedSegment?.name !== entry.name) {
                            setHoveredSegment(null);
                            setActiveTooltip(null);
                          }
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-xl font-bold text-gray-800">3</div>
              </div>
            </div>
            <div className="space-y-2">
              {enhancedEstadoDelDiaData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 p-1 rounded transition-all duration-200 cursor-pointer ${
                    hoveredSegment === `estado_${index}` || clickedSegment?.name === item.name ? 'bg-gray-100 transform scale-105 shadow-sm' : ''
                  }`}
                  onMouseEnter={() => {
                    setHoveredSegment(`estado_${index}`);
                    setActiveTooltip(`estado_${index}`);
                  }}
                  onMouseLeave={() => {
                    if (clickedSegment?.name !== item.name) {
                      setHoveredSegment(null);
                      setActiveTooltip(null);
                    }
                  }}
                  onClick={(e) => handleLegendClick('estado', index, item, e)}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                  {(hoveredSegment === `estado_${index}` || clickedSegment?.name === item.name) && (
                    <span className="text-xs text-gray-500 ml-1">{item.value}%</span>
                  )}
                </div>
              ))}
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
            <div ref={chartRefs.tiempo} className="h-32 w-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={enhancedTiemposData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(data, index, e) => {
                      e.stopPropagation();
                      handlePieClick(data, index, 'tiempo', e);
                    }}
                  >
                    {enhancedTiemposData.map((entry, index) => (
                      <Cell 
                        key={`cell-tiempo-${index}`} 
                        fill={entry.color} 
                        stroke="none"
                        style={{
                          transform: (hoveredSegment === `tiempo_${index}` || clickedSegment?.name === entry.name) ? 'scale(1.08) translateY(-3px)' : 'none',
                          transformOrigin: '50% 50%',
                          transition: 'transform 0.2s ease-out',
                          zIndex: (hoveredSegment === `tiempo_${index}` || clickedSegment?.name === entry.name) ? 10 : 1,
                          filter: (hoveredSegment === `tiempo_${index}` || clickedSegment?.name === entry.name) ? 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))' : 'none',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={() => {
                          setHoveredSegment(`tiempo_${index}`);
                          setActiveTooltip(`tiempo_${index}`);
                        }}
                        onMouseLeave={() => {
                          if (clickedSegment?.name !== entry.name) {
                            setHoveredSegment(null);
                            setActiveTooltip(null);
                          }
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-lg font-bold text-gray-800">139hs</div>
              </div>
            </div>
            <div className="space-y-2 ml-4">
              {enhancedTiemposData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 p-1 rounded transition-all duration-200 cursor-pointer ${
                    hoveredSegment === `tiempo_${index}` || clickedSegment?.name === item.name ? 'bg-gray-100 transform scale-105 shadow-sm' : ''
                  }`}
                  onMouseEnter={() => {
                    setHoveredSegment(`tiempo_${index}`);
                    setActiveTooltip(`tiempo_${index}`);
                  }}
                  onMouseLeave={() => {
                    if (clickedSegment?.name !== item.name) {
                      setHoveredSegment(null);
                      setActiveTooltip(null);
                    }
                  }}
                  onClick={(e) => handleLegendClick('tiempo', index, item, e)}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.details || item.name}</span>
                  {(hoveredSegment === `tiempo_${index}` || clickedSegment?.name === item.name) && (
                    <span className="text-xs text-gray-500 ml-1">{item.value}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Novedades de tiempos */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold text-gray-700 mb-3">Novedades de tiempos</h2>
          <div className="flex items-center justify-center">
            <div ref={chartRefs.novedad} className="h-32 w-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={novedadesTiempoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={43}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(data, index, e) => {
                      e.stopPropagation();
                      handlePieClick(data, index, 'novedad', e);
                    }}
                  >
                    {novedadesTiempoData.map((entry, index) => (
                      <Cell 
                        key={`cell-novedad-${index}`} 
                        fill={entry.color} 
                        stroke="none"
                        style={{
                          transform: (hoveredSegment === `novedad_${index}` || clickedSegment?.name === entry.name) ? 'scale(1.08) translateY(-3px)' : 'none',
                          transformOrigin: '50% 50%',
                          transition: 'transform 0.2s ease-out',
                          zIndex: (hoveredSegment === `novedad_${index}` || clickedSegment?.name === entry.name) ? 10 : 1,
                          filter: (hoveredSegment === `novedad_${index}` || clickedSegment?.name === entry.name) ? 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))' : 'none',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={() => {
                          setHoveredSegment(`novedad_${index}`);
                          setActiveTooltip(`novedad_${index}`);
                        }}
                        onMouseLeave={() => {
                          if (clickedSegment?.name !== entry.name) {
                            setHoveredSegment(null);
                            setActiveTooltip(null);
                          }
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-lg font-bold text-gray-800">149hs</div>
              </div>
            </div>
            <div className="space-y-2 ml-4 max-h-32 overflow-y-auto">
              {novedadesTiempoData.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-2 p-1 rounded transition-all duration-200 cursor-pointer ${
                    hoveredSegment === `novedad_${index}` || clickedSegment?.name === item.name ? 'bg-gray-100 transform scale-105 shadow-sm' : ''
                  }`}
                  onMouseEnter={() => {
                    setHoveredSegment(`novedad_${index}`);
                    setActiveTooltip(`novedad_${index}`);
                  }}
                  onMouseLeave={() => {
                    if (clickedSegment?.name !== item.name) {
                      setHoveredSegment(null);
                      setActiveTooltip(null);
                    }
                  }}
                  onClick={(e) => handleLegendClick('novedad', index, item, e)}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{`${item.name}: ${item.details}`}</span>
                  {(hoveredSegment === `novedad_${index}` || clickedSegment?.name === item.name) && (
                    <span className="text-xs text-gray-500 ml-1">{item.value}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Espacio adicional */}
      <div className="h-[4px]"></div>
    </div>
  );
};

export default StatisticsPanels;