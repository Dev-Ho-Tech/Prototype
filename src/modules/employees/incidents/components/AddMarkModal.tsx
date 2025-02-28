import React, { useState } from 'react';
import { MarcajeFormData, TipoVerificacion, TipoMarcaje } from '../interface/types';
import ActionButton from './ActionButton';
import { X } from 'lucide-react';

interface AddMarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MarcajeFormData) => void;
  empleadoNombre: string;
  dispositivos: { id: string; nombre: string }[];
}

const AddMarkModal: React.FC<AddMarkModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  empleadoNombre,
  dispositivos
}) => {
  const [formData, setFormData] = useState<MarcajeFormData>({
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    dispositivo: dispositivos[0]?.id || '',
    tipoVerificacion: TipoVerificacion.MANUAL,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    observaciones: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Agregar Marcaje Manual</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Empleado
            </label>
            <input
              type="text"
              value={empleadoNombre}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-700"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora
            </label>
            <input
              type="text"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              placeholder="08:00 AM"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dispositivo
            </label>
            <select
              name="dispositivo"
              value={formData.dispositivo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {dispositivos.map(dispositivo => (
                <option key={dispositivo.id} value={dispositivo.id}>
                  {dispositivo.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Verificación
            </label>
            <select
              name="tipoVerificacion"
              value={formData.tipoVerificacion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {Object.values(TipoVerificacion).map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Marcaje
            </label>
            <select
              name="tipoMarcaje"
              value={formData.tipoMarcaje}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {Object.values(TipoMarcaje).map(tipo => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <ActionButton
              label="Cancelar"
              onClick={onClose}
              variant="secondary"
            />
            <ActionButton
              label="Guardar Marcaje"
              onClick={handleSubmit}
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMarkModal;