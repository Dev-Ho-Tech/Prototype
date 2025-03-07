import React, { useState } from 'react';
import { X, Clock, CheckCircle, XCircle, User } from 'lucide-react';
import { Employee } from '../interface/types';
import { marcajes, segmentos } from '../temp/line_time';
import { Marcaje, Segmento, ActiveItem } from '../interface/timeline';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee;
}

// Icono Facial - componente separado para simplicidad
const FaceIcon = ({ color }: { color: string }) => {
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: color }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        {/* Cabeza */}
        <path 
          d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" 
          fill="currentColor"
        />
        {/* Cuerpo */}
        <path 
          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
  if (!isOpen) return null;

  // Función para mostrar tooltip con posición calculada
  const showMarcajeTooltip = (id: string, event: React.MouseEvent) => {
    // Calcular posición basada en el evento
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top - 35, // Modificado: 5px más abajo que el valor original (-80)
      left: rect.left
    };
    
    setTooltipPosition(position);
    setActiveTooltip(`marcaje-${id}`);
  };

  // Función para mostrar tooltip de segmentos
  const showSegmentoTooltip = (id: string, event: React.MouseEvent) => {
    // Calcular posición basada en el evento
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top - 15, // Modificado: 5px más abajo que el valor original (-20)
      left: rect.left + (rect.width / 2) // Centrado horizontalmente
    };
    
    setTooltipPosition(position);
    setActiveTooltip(`segmento-${id}`);
  };

  // Función para ocultar tooltip
  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  // Obtener el marcaje o segmento activo
  const getActiveItem = (): ActiveItem | null => {
    if (!activeTooltip) return null;
    
    if (activeTooltip.startsWith('marcaje-')) {
      const marcajeId = activeTooltip.replace('marcaje-', '');
      return { 
        tipo: 'marcaje', 
        data: marcajes.find(m => m.id === marcajeId) as Marcaje | undefined
      };
    } else if (activeTooltip.startsWith('segmento-')) {
      const segmentoId = activeTooltip.replace('segmento-', '');
      return { 
        tipo: 'segmento', 
        data: segmentos.find(s => s.id === segmentoId) as Segmento | undefined
      };
    }
    
    return null;
  };

  const activeItem = getActiveItem();

  // Calcular horas trabajadas totales
  const horasTrabajadasTotales = "8 horas regulares + 3 horas extras";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 overflow-hidden relative">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Línea de tiempo</h2>
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Tooltip para marcajes y segmentos - Se ajustó la propiedad transform para bajar 5px */}
        {activeItem && activeItem.data && (
          <div 
            className="fixed bg-white border border-gray-200 shadow-lg rounded-md p-3 z-50"
            style={{ 
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              minWidth: activeItem.tipo === 'segmento' ? '280px' : '220px',
              transform: 'translate(-50%, -95%)', // Modificado: cambiado de -100% a -95% para bajar 5px el tooltip
              zIndex: 9999
            }}
          >
            {activeItem.tipo === 'marcaje' && (
              <>
                <div className="font-semibold text-gray-800 mb-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {activeItem.data.type}
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div className="text-gray-500">Hora:</div>
                  <div className="text-gray-700 font-medium">{activeItem.data.time}</div>
                  
                  <div className="text-gray-500">Dispositivo:</div>
                  <div className="text-gray-700">{activeItem.data.device}</div>
                  
                  <div className="text-gray-500">Método:</div>
                  <div className="text-gray-700">{activeItem.data.method}</div>
                </div>
              </>
            )}
            
            {activeItem.tipo === 'segmento' && (
              <>
                <div className="font-semibold text-gray-800 mb-2 flex items-center border-b pb-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {activeItem.data.tipo === 'trabajo' ? 'Tiempo Trabajado' : 
                  activeItem.data.tipo === 'descanso' ? 'Descanso/Almuerzo' : 'Horas Extras'}
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <div className="text-gray-500">Entrada:</div>
                  <div className="text-gray-700 font-medium">{activeItem.data.entrada}</div>
                  
                  <div className="text-gray-500">Salida:</div>
                  <div className="text-gray-700 font-medium">{activeItem.data.salida}</div>
                  
                  <div className="text-gray-500">Horas:</div>
                  <div className="text-gray-700 font-medium">{activeItem.data.horasTrabajadas}</div>
                  
                  {activeItem.data.esHoraExtra && (
                    <>
                      <div className="text-gray-500">Estado:</div>
                      <div className="flex items-center">
                        {activeItem.data.estadoHoraExtra === "aprobado" ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600">Aprobado</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500 mr-1" />
                            <span className="text-red-600">Rechazado</span>
                          </>
                        )}
                      </div>
                      
                      {activeItem.data.aprobadoPor && (
                        <>
                          <div className="text-gray-500">Aprobado por:</div>
                          <div className="text-gray-700 flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {activeItem.data.aprobadoPor}
                          </div>
                        </>
                      )}
                      
                      {activeItem.data.fechaAprobacion && (
                        <>
                          <div className="text-gray-500">Fecha:</div>
                          <div className="text-gray-700">{activeItem.data.fechaAprobacion}</div>
                        </>
                      )}
                      
                      {activeItem.data.comentarios && (
                        <div className="col-span-2 mt-1">
                          <div className="text-gray-500">Comentarios:</div>
                          <div className="text-gray-700 bg-gray-50 p-1 rounded mt-1 text-xs">
                            {activeItem.data.comentarios}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
            
            {/* Flecha de tooltip */}
            <div className="absolute w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45" style={{ bottom: '-7px', left: '50%', marginLeft: '-7px' }}></div>
          </div>
        )}
        
        <div className="p-6">
          <div className="mb-8">
            {/* Información básica del empleado */}
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Juan Carlos Pérez</h3>
                <p className="text-sm text-gray-600">Fecha: 15 de marzo, 2025</p>
              </div>
              <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 font-medium text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" /> 
                Total: {horasTrabajadasTotales}
              </div>
            </div>
            
            {/* Línea de tiempo con horas */}
            <div className="border border-gray-200 rounded-lg p-4 relative">
              {/* Marcadores con conectores  */}
              {marcajes.map((marcaje) => (
                <div 
                  key={marcaje.id}
                  className="absolute"
                  style={{ 
                    left: marcaje.position,
                    top: '20px', // Posicionado en la parte superior para dar más espacio al conector
                    transform: 'translate(-50%, 0)',
                    zIndex: 20
                  }}
                >
                  {/* Icono con conector más largo */}
                  <div 
                    className="relative flex flex-col items-center cursor-pointer"
                    onMouseEnter={(e) => showMarcajeTooltip(marcaje.id, e)}
                    onMouseLeave={hideTooltip}
                  >
                    <FaceIcon color={marcaje.color} />
                    <div 
                      className="w-0.5" 
                      style={{ 
                        backgroundColor: marcaje.color,
                        height: '50px' // Hacemos el palito más largo
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="relative h-40 mt-12">
                {/* Escala de horas */}
                <div className="absolute top-0 left-0 right-0 flex">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const hour = i + 5; // Empezamos en 5:00 am
                    const ampm = hour >= 12 ? 'pm' : 'am';
                    const displayHour = hour > 12 ? hour - 12 : hour;
                    
                    return (
                      <div key={i} className="flex-1 text-center">
                        <div className="text-xs text-gray-500">{`${displayHour}:00 ${ampm}`}</div>
                        <div className="h-3 border-l border-gray-200 mx-auto"></div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Línea de hora actual */}
                <div 
                  className="absolute top-6 bottom-0 w-0.5 bg-red-400 z-10" 
                  style={{ left: '62%' }} // 1:00 pm
                ></div>
                
                {/* Horario planificado (azul) - ahora más arriba */}
                <div 
                  className="absolute h-6 rounded-md bg-blue-400"
                  style={{ left: '16.67%', width: '66.66%', top: '38px' }} // 7am - 5pm
                ></div>
                
                {/* Contenedor para barras de horario */}
                <div className="absolute left-0 right-0 top-14">
                  {/* Segmentos de tiempo */}
                  {segmentos.map((segmento) => (
                    <div 
                      key={segmento.id}
                      className={`absolute h-6 rounded-md ${segmento.color} cursor-pointer transition hover:brightness-95`}
                      style={{ 
                        left: segmento.inicio, 
                        width: segmento.ancho
                      }}
                      onClick={(e) => showSegmentoTooltip(segmento.id, e)}
                      onMouseLeave={hideTooltip}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Leyenda mejorada */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Horario planificado</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Tiempo trabajado</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-striped-green rounded mr-2"></div>
              <span className="text-sm text-gray-600">Horas extras</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-300 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Descanso/Almuerzo</span>
            </div>
            <div className="flex items-center">
              <div className="w-0.5 h-4 bg-red-400 rounded mr-2"></div>
              <span className="text-sm text-gray-600">Hora actual</span>
            </div>
          </div>
          
          {/* Estilos CSS para patrones y animaciones */}
          <style>{`
            .bg-striped-green {
              background-color: #4ade80;
              background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.5) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.5) 75%, transparent 75%, transparent);
              background-size: 10px 10px;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default TimelineModal;