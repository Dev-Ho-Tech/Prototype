/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState,  useEffect } from 'react';
import { Clock, Users, AlertTriangle } from 'lucide-react';
import { NovedadCard, StatisticsPanelsProps } from '../interface/statistic';
import InteractivePieChart from '../panels/CustomTooltip';
import ClickTooltip from '../panels/ClickTooltip';

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

// Componente para una tarjeta de gráfico circular
const ChartCard = ({ title, chartData, centerLabel, id, onChartClick}: any) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-gray-700 mb-3">{title}</h2>
      <div className="flex items-center justify-center">
        <InteractivePieChart 
          data={chartData} 
          centerLabel={centerLabel} 
          sectionId={id}
          onSegmentClick={onChartClick}
        />
        <div className="space-y-2 ml-4">
          {chartData.map((item: any, index: number) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-1"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm">{item.details ? `${item.name}: ${item.details}` : item.name}</span>
            </div>
          ))}
          {id === 'estado' && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-sm">Planificados: 15</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-sm">Sin planificación: 0</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

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
  const [clickedSegment, setClickedSegment] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
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
  
  // Función para manejar el clic en un segmento del gráfico
  const handleChartClick = (data: any, position: { x: number, y: number }) => {
    // Si ya está seleccionado, lo cerramos
    if (clickedSegment && clickedSegment.name === data.name) {
      setClickedSegment(null);
    } else {
      // Si es nuevo o diferente, lo seleccionamos
      setClickedSegment(data);
      setTooltipPosition(position);
    }
  };

  // Detectar clics fuera para cerrar el tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si el clic no fue en un tooltip, cerramos el tooltip
      if (!(event.target as HTMLElement).closest('.tooltip-click')) {
        setClickedSegment(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <ChartCard 
          title="Estado del día"
          chartData={enhancedEstadoDelDiaData}
          centerLabel="3"
          id="estado"
          onChartClick={handleChartClick}
          selectedItem={clickedSegment}
        />

        {/* Tiempos */}
        <ChartCard 
          title="Tiempos"
          chartData={enhancedTiemposData}
          centerLabel="139hs"
          id="tiempo"
          onChartClick={handleChartClick}
          selectedItem={clickedSegment}
        />

        {/* Novedades de tiempos */}
        <ChartCard 
          title="Novedades de tiempos"
          chartData={novedadesTiempoData}
          centerLabel="149hs"
          id="novedad"
          onChartClick={handleChartClick}
          selectedItem={clickedSegment}
        />
      </div>
      
      {/* Espacio adicional */}
      <div className="h-[4px]"></div>
    </div>
  );
};

export default StatisticsPanels;