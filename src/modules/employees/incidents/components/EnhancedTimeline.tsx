/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Marcaje, TipoMarcaje, Employee } from '../interface/types';
import MarcajeDetailModal from './MarcajeDetailModal';
import ExtraHoursApprovalModal from '../components/ExtraHoursApprovalModal'; // Nuevo componente

const biometricIcons = {
  rostro: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" fill="white"/>
      <path d="M4 20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V20Z" fill="white"/>
    </svg>
  ),
  huella: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/>
    </svg>
  ),
  tarjeta: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
  ),
  pin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  )
};

// Colores para los diferentes tipos de marcaje
const MARCAJE_COLORS = {
  [TipoMarcaje.ENTRADA]: '#22c55e',       // verde
  [TipoMarcaje.SALIDA]: '#ef4444',        // rojo
  [TipoMarcaje.BREAK_INICIO]: '#3b82f6',  // azul
  [TipoMarcaje.BREAK_FIN]: '#eab308',     // amarillo
  [TipoMarcaje.OTRO]: '#6b7280',          // gris
};

interface EnhancedTimelineProps {
  marcajes: Marcaje[];
  employee: Employee | null;
  onMarkerClick?: (marcaje: Marcaje) => void;
  selectedMarcajeId?: string | null;
  startHour?: number;
  endHour?: number;
  onAddMarcaje?: () => void;
}

const EnhancedTimeline: React.FC<EnhancedTimelineProps> = ({
  marcajes,
  employee,
  onMarkerClick,
  selectedMarcajeId,
  startHour = 5,
  endHour = 20,
  // onAddMarcaje
}) => {
  // Estados para manejar los modales
  const [showMarcajeModal, setShowMarcajeModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedMarcaje, setSelectedMarcaje] = useState<Marcaje | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<any | null>(null);

  // Si no hay marcajes o empleado, muestra un mensaje
  if (!marcajes.length || !employee) {
    return (
      <div className="rounded-lg border border-gray-200 p-4 text-center text-gray-500 bg-white">
        No hay marcajes disponibles para este empleado en la fecha seleccionada.
      </div>
    );
  }

  // Calcular posición horizontal basada en la hora
  const calculatePosition = (timeString: string): number => {
    // Extraer hora y minutos, considerar AM/PM
    const parts = timeString.split(' ');
    const timePart = parts[0];
    const isPM = parts[1] === 'PM';
    
    const [hoursStr, minutesStr] = timePart.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    
    // Convertir a formato 24 horas si es PM
    if (isPM && hours < 12) {
      hours += 12;
    }
    // Convertir 12 AM a 0 horas
    if (!isPM && hours === 12) {
      hours = 0;
    }
    
    // Calcular posición como porcentaje del ancho total
    const totalHours = endHour - startHour;
    const hourDecimal = hours + (minutes / 60);
    const position = ((hourDecimal - startHour) / totalHours) * 100;
    
    // Limitar posición entre 0% y 100%
    return Math.max(0, Math.min(100, position));
  };

  // Ordenar marcajes por hora
  const sortedMarcajes = [...marcajes].sort((a, b) => {
    const posA = calculatePosition(a.hora);
    const posB = calculatePosition(b.hora);
    return posA - posB;
  });

  // Determinar segmentos de tiempo
  const timeSegments = [];
  let isWorkingTime = false;
  let isBreakTime = false;
  // let isOvertime = false;

  // Asumimos que el horario regular es de 7am a 3pm (arbitrario, podría ajustarse)
  // const regularStartPosition = calculatePosition('07:00 AM');
  const regularEndPosition = calculatePosition('05:00 PM');

  // Generar segmentos basados en los marcajes
  for (let i = 0; i < sortedMarcajes.length; i++) {
    const marcaje = sortedMarcajes[i];
    const position = calculatePosition(marcaje.hora);

    if (marcaje.tipoMarcaje === TipoMarcaje.ENTRADA) {
      isWorkingTime = true;
      if (i === 0) {
        // Primer marcaje del día
        timeSegments.push({
          id: `segment-${i}`,
          start: position,
          end: -1, // Se actualizará cuando encontremos un marcaje de salida
          tipo: position > regularEndPosition ? 'overtime' : 'work',
          color: position > regularEndPosition ? 'bg-striped-green' : 'bg-green-400',
          marcajeInicio: marcaje,
          marcajeFin: null
        });
      } else if (isBreakTime) {
        // Retorno de un descanso
        isBreakTime = false;
        // const lastSegment = timeSegments[timeSegments.length - 1];
        timeSegments.push({
          id: `segment-${i}`,
          start: position,
          end: -1,
          tipo: position > regularEndPosition ? 'overtime' : 'work',
          color: position > regularEndPosition ? 'bg-striped-green' : 'bg-green-400',
          marcajeInicio: marcaje,
          marcajeFin: null
        });
      }
    } else if (marcaje.tipoMarcaje === TipoMarcaje.SALIDA) {
      if (isWorkingTime) {
        // Actualizar el último segmento de trabajo
        const lastIndex = timeSegments.findIndex(s => s.end === -1);
        if (lastIndex !== -1) {
          timeSegments[lastIndex].end = position;
          timeSegments[lastIndex].marcajeFin = marcaje;
          
          // Determinar si es tiempo regular u hora extra
          if (position > regularEndPosition) {
            const overtimeStart = Math.max(regularEndPosition, timeSegments[lastIndex].start);
            
            // Dividir el segmento en tiempo regular y tiempo extra si es necesario
            if (overtimeStart > timeSegments[lastIndex].start) {
              // Ajustar el segmento regular
              timeSegments[lastIndex].end = overtimeStart;
              
              // Crear segmento de horas extras
              timeSegments.push({
                id: `segment-overtime-${i}`,
                start: overtimeStart,
                end: position,
                tipo: 'overtime',
                color: 'bg-striped-green',
                marcajeInicio: timeSegments[lastIndex].marcajeInicio,
                marcajeFin: marcaje,
                horasExtras: true,
                aprobado: marcaje.observaciones?.includes("aprobado") || false
              });
            }
          }
        }
        isWorkingTime = false;
      }
    } else if (marcaje.tipoMarcaje === TipoMarcaje.BREAK_INICIO) {
      if (isWorkingTime) {
        // Finalizar el segmento de trabajo actual
        const lastIndex = timeSegments.findIndex(s => s.end === -1);
        if (lastIndex !== -1) {
          timeSegments[lastIndex].end = position;
          timeSegments[lastIndex].marcajeFin = marcaje;
        }
        
        // Iniciar un segmento de descanso
        timeSegments.push({
          id: `segment-break-${i}`,
          start: position,
          end: -1,
          tipo: 'break',
          color: 'bg-orange-300',
          marcajeInicio: marcaje,
          marcajeFin: null
        });
        
        isBreakTime = true;
        isWorkingTime = false;
      }
    } else if (marcaje.tipoMarcaje === TipoMarcaje.BREAK_FIN) {
      if (isBreakTime) {
        // Finalizar el segmento de descanso
        const lastIndex = timeSegments.findIndex(s => s.end === -1);
        if (lastIndex !== -1) {
          timeSegments[lastIndex].end = position;
          timeSegments[lastIndex].marcajeFin = marcaje;
        }
        
        // Reiniciar tiempo de trabajo
        timeSegments.push({
          id: `segment-${i}`,
          start: position,
          end: -1,
          tipo: position > regularEndPosition ? 'overtime' : 'work',
          color: position > regularEndPosition ? 'bg-striped-green' : 'bg-green-400',
          marcajeInicio: marcaje,
          marcajeFin: null
        });
        
        isBreakTime = false;
        isWorkingTime = true;
      }
    }
  }

  // Si el último segmento quedó abierto, cerrarlo en la posición actual
  const openSegmentIndex = timeSegments.findIndex(s => s.end === -1);
  if (openSegmentIndex !== -1) {
    // Si estamos en horario, asumimos que aún está trabajando hasta la hora actual
    // Para este ejemplo, lo cerraremos en 100% para visualización
    timeSegments[openSegmentIndex].end = 100;
  }

  // Si no tenemos suficientes marcajes para determinar los segmentos,
  // crear segmentos de ejemplo basados en un horario estándar
  if (timeSegments.length === 0 && sortedMarcajes.length > 0) {
    // Ejemplo: Un marcaje de entrada sin salida
    const entryPosition = calculatePosition(sortedMarcajes[0].hora);
    
    timeSegments.push({
      id: 'segment-estimated',
      start: entryPosition,
      end: regularEndPosition,
      tipo: 'work',
      color: 'bg-green-400 opacity-60', // Más transparente para indicar que es estimado
      marcajeInicio: sortedMarcajes[0],
      marcajeFin: null
    });
  }

  // Calcular horario planeado (por ejemplo, 8am a 5pm)
  const horarioPlaneadoStart = calculatePosition('08:00 AM');
  const horarioPlaneadoEnd = calculatePosition('05:00 PM');

  // Calcular hora actual
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const currentTimePosition = calculatePosition(currentTimeStr);

  // Determinar si la hora actual está dentro del rango visible
  const isCurrentTimeVisible = currentTimePosition >= 0 && currentTimePosition <= 100;

  // Manejar clic en marcador
  const handleMarkerClick = (marcaje: Marcaje) => {
    // Llamar al manejador proporcionado por la prop
    if (onMarkerClick) {
      onMarkerClick(marcaje);
    }
    
    // Abrir el modal de detalle
    setSelectedMarcaje(marcaje);
    setShowMarcajeModal(true);
  };

  // Manejar clic en segmento de horas extras
  const handleExtraHoursClick = (segment: any) => {
    setSelectedSegment(segment);
    setShowApprovalModal(true);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="relative flex flex-col">
        {/* Nombre del empleado y fecha */}
        <div className="flex justify-between items-center mb-3">
          
          {/* Contador de horas trabajadas */}
          <div className="text-sm px-3 py-1 bg-blue-50 rounded-full text-blue-700">
            Total: {timeSegments.reduce((total, segment) => {
              // Calcular la duración de cada segmento (excluyendo descansos)
              if (segment.tipo !== 'break' && segment.end !== -1) {
                const segmentWidth = segment.end - segment.start;
                const segmentHours = (segmentWidth / 100) * (endHour - startHour);
                return total + segmentHours;
              }
              return total;
            }, 0).toFixed(1)} horas
          </div>
        </div>
        <div className="h-[10px] w-full"></div>
        {/* Escala de tiempo */}
        <div className="grid grid-cols-16 mb-1">
          {Array.from({ length: (endHour - startHour) + 1 }).map((_, i) => {
            const hour = startHour + i;
            const ampm = hour >= 12 ? 'pm' : 'am';
            const displayHour = hour > 12 ? hour - 12 : hour;
            return (
              <div key={i} className="text-xs text-center text-gray-500">
                {displayHour}:00 {ampm}
              </div>
            );
          })}
        </div>
        <div className="h-[70px] w-full"></div>
        
        {/* Contenedor para la línea de tiempo */}
        <div className="h-24 relative mb-1">
          {/* Línea base */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200"></div>
          
          {/* Marcas de horas */}
          <div className="absolute top-10 left-0 right-0 flex">
            {Array.from({ length: (endHour - startHour) + 1 }).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 border-l border-gray-300 h-4"
                style={{ marginLeft: i === 0 ? '0' : '-1px' }}
              ></div>
            ))}
          </div>
          
          {/* Horario planeado */}
          <div 
            className="absolute h-6 bg-blue-400 rounded-md"
            style={{ 
              left: `${horarioPlaneadoStart}%`, 
              width: `${horarioPlaneadoEnd - horarioPlaneadoStart}%`,
              top: '0px',
              opacity: 0.6
            }}
          ></div>
          
          {/* Segmentos de tiempo */}
          {timeSegments.map(segment => {
            const width = segment.end - segment.start;
            const isOvertimeSegment = segment.tipo === 'overtime';
            
            return (
              <div 
                key={segment.id}
                className={`absolute h-6 ${segment.color} rounded-md 
                  ${isOvertimeSegment ? 'cursor-pointer hover:brightness-90' : ''}`}
                style={{ 
                  left: `${segment.start}%`, 
                  width: `${width}%`,
                  top: '16px'
                }}
                onClick={isOvertimeSegment ? () => handleExtraHoursClick(segment) : undefined}
                title={isOvertimeSegment ? "Haga clic para aprobar horas extras" : undefined}
              >
                {/* Indicador de estado para horas extras */}
                {isOvertimeSegment && segment.aprobado && (
                  <div className="absolute top-0 right-1 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Hora actual */}
          {isCurrentTimeVisible && (
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
              style={{ left: `${currentTimePosition}%` }}
            ></div>
          )}
          
          {/* Marcadores de eventos */}
          {sortedMarcajes.map(marcaje => {
            const position = calculatePosition(marcaje.hora);
            const isSelected = marcaje.id === selectedMarcajeId;
            
            return (
              <div 
                key={marcaje.id}
                className={`absolute cursor-pointer transition-transform ${isSelected ? 'z-20' : 'z-10'}`}
                style={{ 
                  left: `${position}%`, 
                  top: '4px',
                  transform: `translateX(-50%) ${isSelected ? 'scale(1.2)' : 'scale(1)'}`
                }}
                onClick={() => handleMarkerClick(marcaje)}
              >
                
                <div className="-mt-12 flex flex-col items-center">
                    {/* Marcador */}
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isSelected ? 'ring-2 ring-blue-300 ring-offset-2' : ''}`}
                      style={{ backgroundColor: MARCAJE_COLORS[marcaje.tipoMarcaje] || MARCAJE_COLORS[TipoMarcaje.OTRO] }}
                    >
                      {marcaje.tipoVerificacion && marcaje.tipoVerificacion.toLowerCase() in biometricIcons 
                        ? biometricIcons[marcaje.tipoVerificacion.toLowerCase() as keyof typeof biometricIcons]
                        : (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="12" cy="8" r="4" fill="white"/>
                                  <path d="M4 20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V20Z" fill="white"/>
                          </svg>
                        )
                      }
                    </div>

                    {/* Conector más largo (25px -> 40px) */}
                    <div className="h-10 w-0.5 mx-auto bg-gray-300"></div>
                  </div>

                <div className="absolute top-13 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700">
                  {marcaje.hora}
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-[10px] w-full"></div>
        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 mt-3 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-sm mr-1 opacity-60"></div>
            <span className="text-gray-600">Horario planeado</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-sm mr-1"></div>
            <span className="text-gray-600">Tiempo trabajado</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-300 rounded-sm mr-1"></div>
            <span className="text-gray-600">Descanso</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-striped-green rounded-sm mr-1"></div>
            <span className="text-gray-600">Horas extras</span>
          </div>
          <div className="flex items-center">
            <div className="w-0.5 h-3 bg-red-500 mr-1"></div>
            <span className="text-gray-600">Hora actual</span>
          </div>
        </div>
      </div>
      
      {/* Modal de detalle de marcaje */}
      <MarcajeDetailModal 
        isOpen={showMarcajeModal}
        onClose={() => setShowMarcajeModal(false)}
        marcaje={selectedMarcaje}
        employee={employee}
      />
      
      {/* Modal de aprobación de horas extras */}
      <ExtraHoursApprovalModal 
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        segment={selectedSegment}
        employee={employee}
      />
      
      {/* Estilos para franjas diagonales (horas extras) */}
      <style>{`
        .bg-striped-green {
          background-color: #4ade80;
          background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.5) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.5) 75%, transparent 75%, transparent);
          background-size: 10px 10px;
        }
        
        .grid-cols-16 {
          grid-template-columns: repeat(16, 1fr);
        }
      `}</style>
    </div>
  );
};

export default EnhancedTimeline;