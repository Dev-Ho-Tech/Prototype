/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartItem {
  name: string;
  value: number;
  color: string;
  details?: string;
  additionalInfo?: string;
}

interface InteractivePieChartProps {
  data: ChartItem[];
  centerLabel: string | number;
  sectionId: string;
  onSegmentClick: (data: ChartItem, position: { x: number, y: number }) => void;
}

// Componente personalizado para el tooltip en hover
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

const InteractivePieChart: React.FC<InteractivePieChartProps> = ({
  data,
  centerLabel,
  sectionId,
  onSegmentClick
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const handlePieClick = (pieData: any, _index: number, event: any) => {
    // Detener la propagación del evento para evitar que se cierre el tooltip inmediatamente
    event.stopPropagation();
    
    // Calcular posición para el tooltip
    let tooltipX = 0;
    let tooltipY = 0;
    
    // Si es un evento de Recharts
    if (event && event.chartX && event.chartY) {
      tooltipX = event.chartX;
      tooltipY = event.chartY - 20; // Un poco arriba del clic
    } 
    // Si es un evento DOM normal
    else if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      tooltipX = rect.left + rect.width / 2;
      tooltipY = rect.top;
    }
    // Si tenemos datos de evento pero no chartX/chartY
    else if (event && event.clientX && event.clientY) {
      tooltipX = event.clientX;
      tooltipY = event.clientY - 20;
    }
    // Si no tenemos datos del evento, usar posición del elemento svg
    else {
      const svg = document.querySelector(`#${sectionId} svg`);
      if (svg) {
        const rect = svg.getBoundingClientRect();
        tooltipX = rect.left + rect.width / 2;
        tooltipY = rect.top;
      }
    }
    
    onSegmentClick(pieData, { x: tooltipX, y: tooltipY });
  };

  return (
    <div id={sectionId} className="h-32 w-32 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
            onClick={handlePieClick}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${sectionId}-${index}`} 
                fill={entry.color} 
                stroke="none"
                style={{
                  transform: hoveredSegment === `${sectionId}_${index}` ? 'scale(1.08) translateY(-3px)' : 'none',
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.2s ease-out',
                  filter: hoveredSegment === `${sectionId}_${index}` ? 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))' : 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredSegment(`${sectionId}_${index}`)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-lg font-bold text-gray-800">{centerLabel}</div>
      </div>
    </div>
  );
}

export default InteractivePieChart;