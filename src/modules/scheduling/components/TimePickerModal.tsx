import React, { useState, useEffect } from 'react';

interface TimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
  title: string;
  initialTime?: string;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialTime = '08:00'
}) => {
  const [selectedHour, setSelectedHour] = useState<number>(
    initialTime ? parseInt(initialTime.split(':')[0]) : 8
  );
  const [selectedMinute, setSelectedMinute] = useState<number>(
    initialTime ? parseInt(initialTime.split(':')[1]) : 0
  );

  // Generar opciones de horas (5-23)
  const hours = Array.from({ length: 19 }, (_, i) => i + 5);
  
  // Generar opciones de minutos (0, 15, 30, 45)
  const minutes = [0, 15, 30, 45];

  // Restablecer el tiempo cuando se abre el modal
  useEffect(() => {
    if (isOpen && initialTime) {
      const parts = initialTime.split(':');
      setSelectedHour(parseInt(parts[0]));
      setSelectedMinute(parseInt(parts[1]) || 0);
    }
  }, [isOpen, initialTime]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const formattedHour = selectedHour.toString().padStart(2, '0');
    const formattedMinute = selectedMinute.toString().padStart(2, '0');
    onConfirm(`${formattedHour}:${formattedMinute}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 max-w-full">
        <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <div className="text-3xl font-medium text-gray-900">
              {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
            <div className="grid grid-cols-6 gap-1">
              {hours.map((hour) => (
                <button
                  key={hour}
                  className={`py-1 text-sm rounded ${
                    selectedHour === hour
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Minuto</label>
            <div className="grid grid-cols-4 gap-2">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  className={`py-1 text-sm rounded ${
                    selectedMinute === minute
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;