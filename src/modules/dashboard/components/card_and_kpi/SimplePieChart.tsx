import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  details?: string;
  additionalInfo?: string;
}

interface SimplePieChartProps {
  data: ChartDataItem[];
  centerLabel: string;
  sectionId: string;
}

const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, centerLabel, sectionId }) => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Calcular el total para los porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Configuración del gráfico
  const size = 140;
  const radius = size / 2;
  const innerRadius = radius * 0.6;
  
  // Crear los segmentos
  let startAngle = 0;
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * Math.PI * 2;
    
    // Coordenadas para el arco exterior
    const x1 = radius + Math.cos(startAngle) * radius;
    const y1 = radius + Math.sin(startAngle) * radius;
    const x2 = radius + Math.cos(startAngle + angle) * radius;
    const y2 = radius + Math.sin(startAngle + angle) * radius;
    
    // Coordenadas para el arco interior
    const x3 = radius + Math.cos(startAngle + angle) * innerRadius;
    const y3 = radius + Math.sin(startAngle + angle) * innerRadius;
    const x4 = radius + Math.cos(startAngle) * innerRadius;
    const y4 = radius + Math.sin(startAngle) * innerRadius;
    
    // Determinar si es un arco mayor (> 180 grados)
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    
    // Crear el path
    const path = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');
    
    // Actualizar ángulo inicial para el siguiente segmento
    const currentStartAngle = startAngle;
    startAngle += angle;
    
    return {
      ...item,
      percentage,
      path,
      startAngle: currentStartAngle,
      endAngle: startAngle
    };
  });
  
  // Manejar clic en un segmento
  const handleSegmentClick = (index: number, event: React.MouseEvent) => {
    if (activeSegment === index) {
      setActiveSegment(null);
      setTooltipVisible(false);
    } else {
      setActiveSegment(index);
      
      // Posición del tooltip
      const rect = event.currentTarget.getBoundingClientRect();
      const midAngle = segments[index].startAngle + (segments[index].endAngle - segments[index].startAngle) / 2;
      
      setTooltipPosition({
        x: rect.left + radius + Math.cos(midAngle) * (radius * 0.8),
        y: rect.top + radius + Math.sin(midAngle) * (radius * 0.8)
      });
      
      setTooltipVisible(true);
    }
  };
  
  return (
    <div style={{ position: 'relative' }}>
      {/* SVG para el gráfico */}
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {segments.map((segment, index) => (
          <path
            key={`${sectionId}-segment-${index}`}
            d={segment.path}
            fill={segment.color}
            stroke="#fff"
            strokeWidth={1}
            style={{
              cursor: 'pointer',
              opacity: activeSegment === index ? 0.8 : 1,
              filter: activeSegment === index ? 'drop-shadow(0px 2px 3px rgba(0,0,0,0.2))' : 'none',
              transition: 'all 0.3s ease'
            }}
            onClick={(e) => handleSegmentClick(index, e)}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.filter = 'drop-shadow(0px 2px 3px rgba(0,0,0,0.2))';
            }}
            onMouseLeave={(e) => {
              if (activeSegment !== index) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.filter = 'none';
              }
            }}
          />
        ))}
        
        {/* Círculo central */}
        <circle cx={radius} cy={radius} r={innerRadius} fill="white" stroke="#f0f0f0" />
      </svg>
      
      {/* Etiqueta central */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size / 7}px`,
        fontWeight: 'bold',
        color: '#374151'
      }}>
        {centerLabel}
      </div>
      
      {/* Tooltip */}
      {tooltipVisible && activeSegment !== null && (
        <div style={{
          position: 'fixed',
          top: tooltipPosition.y - 80,
          left: tooltipPosition.x,
          transform: 'translate(-50%, 0)',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          padding: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 50,
          minWidth: '200px'
        }}>
          {/* Cabecera */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '8px',
            marginBottom: '8px',
            fontWeight: 600
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: segments[activeSegment].color,
                marginRight: '8px' 
              }}></div>
              {segments[activeSegment].name}
            </div>
            <button 
              onClick={() => { setActiveSegment(null); setTooltipVisible(false); }}
              style={{ 
                border: 'none', 
                background: 'none', 
                cursor: 'pointer', 
                padding: '4px'
              }}
            >
              <X size={16} color="#9ca3af" />
            </button>
          </div>
          
          {/* Contenido */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
            <div style={{ color: '#6b7280' }}>Porcentaje:</div>
            <div style={{ color: '#374151', fontWeight: 500 }}>
              {segments[activeSegment].percentage.toFixed(1)}%
            </div>
            
            <div style={{ color: '#6b7280' }}>Valor:</div>
            <div style={{ color: '#374151', fontWeight: 500 }}>
              {segments[activeSegment].value}
            </div>
            
            {segments[activeSegment].details && (
              <>
                <div style={{ color: '#6b7280' }}>Detalles:</div>
                <div style={{ color: '#374151', fontWeight: 500 }}>
                  {segments[activeSegment].details}
                </div>
              </>
            )}
            
            {segments[activeSegment].additionalInfo && (
              <div style={{ 
                gridColumn: 'span 2', 
                backgroundColor: '#eff6ff', 
                padding: '8px', 
                borderRadius: '4px',
                color: '#3b82f6',
                fontSize: '12px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <Info size={12} style={{ marginRight: '4px', marginTop: '2px' }} />
                <span>{segments[activeSegment].additionalInfo}</span>
              </div>
            )}
          </div>
          
          {/* Flecha del tooltip */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            marginLeft: '-6px',
            width: '12px',
            height: '12px',
            backgroundColor: 'white',
            border: '0 solid #e5e7eb',
            borderRight: '1px solid #e5e7eb',
            borderBottom: '1px solid #e5e7eb',
            transform: 'rotate(45deg)'
          }}></div>
        </div>
      )}
    </div>
  );
};

export default SimplePieChart;