import React from 'react';
import { X, Laptop, Smartphone, Bell } from 'lucide-react';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Línea de tiempo</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="timeline-container overflow-x-auto pb-4">
            <div className="min-w-max relative">
              {/* Iconos superiores con líneas verticales */}
              <div className="flex absolute" style={{ left: '12.5%', top: '-41px' }}>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <Laptop className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="h-6 w-px bg-green-400"></div>
                </div>
              </div>

              <div className="flex absolute" style={{ left: '40%', top: '-41px' }}>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="h-6 w-px bg-blue-400"></div>
                </div>
              </div>

              <div className="flex absolute" style={{ left: '49%', top: '-41px' }}>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                    <Bell className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="h-6 w-px bg-yellow-400"></div>
                </div>
              </div>
              
              {/* Contenedor de la línea de tiempo */}
              <div className="relative h-32 border border-gray-200 rounded-lg mt-10">
                {/* Horas */}
                <div className="flex absolute w-full">
                  {Array.from({ length: 16 }).map((_, index) => {
                    const hour = (index + 5);
                    const isPM = hour >= 12;
                    const displayHour = hour > 12 ? hour - 12 : hour;
                    const ampm = isPM ? 'pm' : 'am';
                    
                    return (
                      <div key={index} className="flex-1 text-xs text-gray-500 text-center">
                        <div className="mt-1">{`${displayHour}:00 ${ampm}`}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Líneas de horas (verticales) */}
                <div className="absolute top-6 bottom-0 w-full flex">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div key={index} className="flex-1">
                      <div className="h-full w-px mx-auto bg-gray-200"></div>
                    </div>
                  ))}
                </div>
                
                {/* Línea vertical de hora actual (11:00 am) */}
                <div className="absolute top-0 bottom-0 w-px bg-gray-500" style={{ left: '40%' }}></div>
                
                {/* Barras de horario */}
                {/* Barra de horario verde (patrón rayas) */}
                <div className="absolute" style={{ left: '12.5%', width: '18.75%', top: '35%', height: '15px' }}>
                  <div className="h-full w-full bg-green-300 rounded bg-striped"></div>
                </div>
                <div className="absolute" style={{ left: '40%', width: '6.25%', top: '35%', height: '15px' }}>
                  <div className="h-full w-full bg-green-300 rounded bg-striped"></div>
                </div>
                
                {/* Barra de horario azul (continua) */}
                <div className="absolute" style={{ left: '12.5%', right: '12.5%', top: '55%', height: '15px' }}>
                  <div className="h-full bg-blue-400 rounded"></div>
                </div>
                
                {/* Barra de descanso naranja */}
                <div className="absolute" style={{ left: '46.25%', width: '6.25%', top: '35%', height: '35px' }}>
                  <div className="h-full bg-orange-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CSS para el patrón de rayas diagonales */}
          <style>{`
            .bg-striped {
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