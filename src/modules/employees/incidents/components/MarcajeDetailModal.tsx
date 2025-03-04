/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Marcaje, Employee, Coordenadas } from '../interface/types';
import { X, Maximize } from 'lucide-react';

interface MarcajeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  marcaje: Marcaje | null;
  employee: Employee | null;
}

const MarcajeDetailModal: React.FC<MarcajeDetailModalProps> = ({
  isOpen,
  onClose,
  marcaje,
  employee,
}) => {
  if (!isOpen || !marcaje || !employee) return null;

  // Simular coordenadas para el marcaje (en una aplicación real, vendrían del backend)
  // Estas coordenadas serían parte del objeto Marcaje en una implementación real
  const coordenadas: Coordenadas = marcaje.coordenadas || {
    latitud: 18.476651,  // Coordenadas de ejemplo (República Dominicana)
    longitud: -69.893957,
    descripcion: marcaje.dispositivo || "Ocean El Faro"
  };

  // Estado para controlar si el mapa está en pantalla completa
  const [fullScreen, setFullScreen] = useState(false);
  const [mapView, setMapView] = useState<'map' | 'satellite'>('satellite');

  // Función para alternar pantalla completa del mapa
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  // La clase del modal cambia según si está en pantalla completa o no
  const modalClass = fullScreen 
    ? "fixed inset-0 z-50 bg-white overflow-auto"
    : "fixed inset-0 z-50 flex items-center justify-center";

  // La clase del contenido cambia según si está en pantalla completa o no
  const contentClass = fullScreen
    ? "w-full h-full"
    : "bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto";

  // Obtener resultado verificación con estilo
  const getResultadoStyle = () => {
    // Utilizamos el resultado de marcaje o asumimos "Verificado" como valor predeterminado
    const resultado = marcaje.resultado || "Verificado";
    
    if (resultado === "Verificado") {
      return <span className="text-green-600 font-medium">{resultado}</span>;
    } else if (resultado === "No Verificado") {
      return <span className="text-red-600 font-medium">{resultado}</span>;
    } else {
      return <span className="text-amber-600 font-medium">{resultado}</span>;
    }
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      {/* Modal */}
      <div className={modalClass}>
        <div className={contentClass}>
          {/* Encabezado */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-medium">Marcaje</h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-blue-700 rounded-full p-1"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Cuerpo del modal */}
          <div className="p-5">
            {/* Datos del marcaje */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Datos del marcaje</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Fecha</p>
                  <p className="font-medium">{marcaje.fecha}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hora</p>
                  <p className="font-medium">{marcaje.hora}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo De Verificación</p>
                  <p className="font-medium">{marcaje.tipoVerificacion}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Marcaje</p>
                  <p className="font-medium">{marcaje.tipoMarcaje}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resultado</p>
                  <p>{getResultadoStyle()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ubicación Estructural</p>
                  <p className="font-medium">{employee.location || coordenadas.descripcion}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Detalles</p>
                  <p className="font-medium">{marcaje.observaciones || "--"}</p>
                </div>
              </div>
            </div>
            
            {/* Datos de la persona */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Datos de la persona</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Núm. Documento</p>
                  <p className="font-medium">{employee.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nombres</p>
                  <p className="font-medium">{employee.nombre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Apellidos</p>
                  <p className="font-medium">{employee.apellidos}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo De Persona</p>
                  <p className="font-medium">Empleado</p>
                </div>
              </div>
            </div>
            
            {/* Mapa */}
            <div className="relative border border-gray-200 rounded-md overflow-hidden">
              <div className="absolute top-2 left-2 z-10">
                <div className="bg-white rounded-md shadow-md overflow-hidden">
                  <button 
                    className={`px-3 py-1 text-sm transition-colors ${mapView === 'map' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setMapView('map')}
                  >
                    Mapa
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm transition-colors ${mapView === 'satellite' ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setMapView('satellite')}
                  >
                    Satélite
                  </button>
                </div>
              </div>
              
              <div className="absolute top-2 right-2 z-10">
                <button 
                  onClick={toggleFullScreen}
                  className="bg-white p-1 rounded-md shadow-md hover:bg-gray-100"
                  aria-label="Alternar pantalla completa"
                >
                  <Maximize size={20} />
                </button>
              </div>
              
              <div className="w-full h-64 bg-green-100 flex items-center justify-center relative">
                {/* Aquí iría la integración real con Google Maps */}
                {/* Por ahora mostramos un placeholder con color dependiendo del tipo de vista */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center opacity-60 ${
                    mapView === 'map' ? 'bg-blue-50' : 'bg-green-100'
                  }`}
                ></div>
                
                {/* Simulación de mapa de Google */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {mapView === 'satellite' && (
                    <div className="w-full h-full bg-[url('/api/placeholder/800/300')] bg-cover bg-center opacity-80"></div>
                  )}
                </div>
                
                {/* Marcador en el mapa */}
                <div className="relative z-10">
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                
                {/* Datos de copyright que aparecen en Google Maps */}
                <div className="absolute bottom-1 left-1 right-1 flex justify-between items-center">
                  <div>
                    <div className="h-5 w-16 bg-white opacity-80 rounded text-xs flex items-center justify-center">
                      Google
                    </div>
                  </div>
                  <div className="text-xs text-gray-700 flex space-x-2">
                    <span>Combinaciones de teclas</span>
                    <span>Datos del mapa ©2025</span>
                    <span>Condiciones</span>
                    <span>Informar un error en el mapa</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botón de cerrar en la parte inferior */}
            <div className="mt-5 text-right">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarcajeDetailModal;