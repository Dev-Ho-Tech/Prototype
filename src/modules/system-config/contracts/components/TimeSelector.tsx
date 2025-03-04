/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeSelectorProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const [view, setView] = useState<'list' | 'clock'>('list');
  const [clockView, setClockView] = useState<'hour' | 'minute'>('hour');
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<'am' | 'pm'>('am');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parsear el valor actual en hora, minutos y AM/PM
  useEffect(() => {
    if (value) {
      setDisplayValue(value);
      
      // Extraer componentes del valor para el modo reloj
      try {
        // Formato esperado: "09:00 pm"
        const [timePart, periodPart] = value.split(' ');
        const [hourStr, minuteStr] = timePart.split(':');
        
        let hour = parseInt(hourStr);
        if (hour === 12 && periodPart.toLowerCase() === 'am') hour = 0;
        if (hour !== 12 && periodPart.toLowerCase() === 'pm') hour += 12;
        
        setSelectedHour(hour % 12 === 0 ? 12 : hour % 12);
        setSelectedMinute(parseInt(minuteStr));
        setSelectedPeriod(periodPart.toLowerCase() as 'am' | 'pm');
      } catch (e) {
        // Si hay un error de parseo, usar valores predeterminados
        setSelectedHour(9);
        setSelectedMinute(0);
        setSelectedPeriod('pm');
      }
    }
  }, [value]);

  // Generar opciones de horas (formato 12 horas)
  const hours = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));
  
  // Generar opciones de minutos (0, 15, 30, 45)
  const minutes = [0, 15, 30, 45];
  
  // Crear eventos sintéticos para onChange
  const createChangeEvent = (newValue: string): React.ChangeEvent<HTMLInputElement> => {
    const event = {
      target: {
        name,
        value: newValue,
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    return event;
  };

  // Manejar la selección de tiempo desde la lista
  const handleTimeSelect = (hour: number, minute: number, period: 'am' | 'pm') => {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const newValue = `${formattedHour}:${formattedMinute} ${period}`;
    
    setDisplayValue(newValue);
    onChange(createChangeEvent(newValue));
    setIsOpen(false);
  };

  // Manejar cambio de hora en el reloj
  const handleClockHourChange = (hour: number) => {
    setSelectedHour(hour);
    // Después de seleccionar la hora, cambiamos a la vista de minutos
    setClockView('minute');
  };

  // Manejar cambio de minutos en el reloj
  const handleClockMinuteChange = (minute: number) => {
    setSelectedMinute(minute);
  };

  // Aplicar tiempo del reloj
  const applyClockTime = () => {
    const formattedHour = selectedHour.toString().padStart(2, '0');
    const formattedMinute = selectedMinute.toString().padStart(2, '0');
    const newValue = `${formattedHour}:${formattedMinute} ${selectedPeriod}`;
    
    setDisplayValue(newValue);
    onChange(createChangeEvent(newValue));
    setIsOpen(false);
  };

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generar marcadores de reloj para horas
  const renderClockHours = () => {
    const items = [];
    const radius = 80; // Radio del círculo del reloj
    const centerX = 100; // Centro X del reloj
    const centerY = 100; // Centro Y del reloj
    
    for (let i = 1; i <= 12; i++) {
      // Calcular posición usando trigonometría
      // Convertir hora a ángulo (12 horas = 360 grados, comenzando desde arriba)
      const angle = ((i * 30) - 90) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      items.push(
        <button
          key={`hour-${i}`}
          type="button"
          className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
            selectedHour === i ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
          }`}
          style={{
            left: `${x - 20}px`,
            top: `${y - 20}px`,
          }}
          onClick={() => handleClockHourChange(i)}
        >
          {i}
        </button>
      );
    }
    
    return items;
  };

  // Generar marcadores de reloj para minutos
  const renderClockMinutes = () => {
    const items = [];
    const radius = 80; // Radio del círculo del reloj
    const centerX = 100; // Centro X del reloj
    const centerY = 100; // Centro Y del reloj
    
    // Crear marcadores cada 5 minutos
    for (let i = 0; i < 60; i += 5) {
      // Calcular posición usando trigonometría
      // Convertir minutos a ángulo (60 minutos = 360 grados, comenzando desde arriba)
      const angle = ((i * 6) - 90) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      const isQuarter = i % 15 === 0; // Destacar cada cuarto (0, 15, 30, 45)
      const displayValue = i === 0 ? '00' : i.toString();
      
      items.push(
        <button
          key={`minute-${i}`}
          type="button"
          className={`absolute rounded-full flex items-center justify-center text-sm transition-all ${
            selectedMinute === i ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
          } ${isQuarter ? 'w-10 h-10 font-semibold' : 'w-8 h-8'}`}
          style={{
            left: `${x - (isQuarter ? 20 : 16)}px`,
            top: `${y - (isQuarter ? 20 : 16)}px`,
          }}
          onClick={() => handleClockMinuteChange(i)}
        >
          {displayValue}
        </button>
      );
    }
    
    return items;
  };

  // Renderizar la manecilla del reloj
  const renderClockHand = () => {
    if (clockView === 'hour') {
      // Calcular ángulo para la manecilla de hora
      const hourAngle = ((selectedHour % 12) * 30 - 90) * (Math.PI / 180);
      const hourHandLength = 60; // Longitud más corta para la manecilla de hora
      const hourX = 100 + hourHandLength * Math.cos(hourAngle);
      const hourY = 100 + hourHandLength * Math.sin(hourAngle);
      
      return (
        <line
          x1="100"
          y1="100"
          x2={hourX}
          y2={hourY}
          stroke="#3b82f6"
          strokeWidth="2"
        />
      );
    } else {
      // Calcular ángulo para la manecilla de minutos
      const minuteAngle = (selectedMinute * 6 - 90) * (Math.PI / 180);
      const minuteHandLength = 70; // Longitud más larga para la manecilla de minutos
      const minuteX = 100 + minuteHandLength * Math.cos(minuteAngle);
      const minuteY = 100 + minuteHandLength * Math.sin(minuteAngle);
      
      return (
        <line
          x1="100"
          y1="100"
          x2={minuteX}
          y2={minuteY}
          stroke="#3b82f6"
          strokeWidth="2"
        />
      );
    }
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type="text"
          id={id}
          value={displayValue}
          onChange={(e) => onChange(createChangeEvent(e.target.value))}
          onClick={() => setIsOpen(true)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          readOnly
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 mt-1 bg-white shadow-lg rounded-md border border-gray-200 p-4"
          style={{ width: view === 'list' ? '18rem' : '16rem' }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              {view === 'list' 
                ? 'Seleccionar hora' 
                : clockView === 'hour' 
                  ? 'Seleccionar hora' 
                  : 'Seleccionar minutos'}
            </h3>
            <div className="flex border border-gray-200 rounded-md">
              <button
                type="button"
                className={`px-3 py-1 text-xs rounded-l-md ${view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setView('list')}
              >
                Lista
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-xs rounded-r-md ${view === 'clock' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => {
                  setView('clock');
                  setClockView('hour'); // Reiniciar a la vista de hora
                }}
              >
                Reloj
              </button>
            </div>
          </div>
          
          {view === 'list' ? (
            // Vista de lista
            <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
              {hours.map((hour) => (
                <div key={`hour-${hour}`} className="text-center">
                  {minutes.map((minute) => (
                    <button
                      key={`${hour}-${minute}-am`}
                      type="button"
                      className="w-full py-1 px-2 text-sm rounded hover:bg-blue-100 mb-1"
                      onClick={() => handleTimeSelect(hour, minute, 'am')}
                    >
                      {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')} am
                    </button>
                  ))}
                  {minutes.map((minute) => (
                    <button
                      key={`${hour}-${minute}-pm`}
                      type="button"
                      className="w-full py-1 px-2 text-sm rounded hover:bg-blue-100 mb-1"
                      onClick={() => handleTimeSelect(hour, minute, 'pm')}
                    >
                      {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')} pm
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            // Vista de reloj
            <div>
              <div className="relative w-52 h-52 mx-auto mb-3">
                {/* Círculo del reloj */}
                <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
                
                {/* SVG para la manecilla del reloj */}
                <svg className="absolute inset-0 w-full h-full">
                  {renderClockHand()}
                </svg>
                
                {/* Centro del reloj */}
                <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                
                {/* Marcadores según el modo activo */}
                {clockView === 'hour' ? renderClockHours() : renderClockMinutes()}
              </div>
              
              <div className="flex justify-center items-center mb-4 space-x-2">
                {clockView === 'hour' ? (
                  <p className="text-sm text-gray-500">Selecciona la hora</p>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      type="button" 
                      className="px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600"
                      onClick={() => setClockView('hour')}
                    >
                      Volver a horas
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center items-center mb-4 space-x-2">
                <div className="text-lg font-medium text-gray-800">
                  {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
                </div>
                <div className="flex border border-gray-200 rounded-md">
                  <button
                    type="button"
                    className={`px-3 py-1 text-xs rounded-l-md ${selectedPeriod === 'am' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => setSelectedPeriod('am')}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 text-xs rounded-r-md ${selectedPeriod === 'pm' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    onClick={() => setSelectedPeriod('pm')}
                  >
                    PM
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  onClick={applyClockTime}
                >
                  Aceptar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSelector;