/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
import { Marcaje, Employee, Coordenadas } from '../interface/types';
import { X, Maximize, Minimize2, Plus, Minus, Map as MapIcon, Image, User, Calendar, Clock, Fingerprint, Check } from 'lucide-react';

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
  const coordenadas: Coordenadas = marcaje.coordenadas || {
    latitud: 18.476651,  // Coordenadas de ejemplo (República Dominicana)
    longitud: -69.893957,
    descripcion: marcaje.dispositivo || "Ocean El Faro"
  };

  // Estados para el mapa
  const [fullScreen, setFullScreen] = useState(false);
  const [mapView, setMapView] = useState<'map' | 'satellite'>('map');
  const [zoom, setZoom] = useState(16);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  // Inicializar el mapa cuando el componente se monta
  useEffect(() => {
    if (!isOpen || !mapRef.current) return;
    
    // Cargar OpenStreetMap solo si no existe una instancia
    if (!mapInstanceRef.current) {
      // Asegurar que leaflet está disponible (en una app real, lo importarías con npm)
      if (typeof window !== 'undefined' && !window.L) {
        // Cargar CSS de Leaflet
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
        document.head.appendChild(leafletCSS);
        
        // Cargar JS de Leaflet
        const leafletScript = document.createElement('script');
        leafletScript.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
        leafletScript.onload = initializeMap;
        document.head.appendChild(leafletScript);
      } else {
        // Si leaflet ya está cargado, inicializar el mapa
        initializeMap();
      }
    } else {
      // Si ya tenemos una instancia, actualizar su tamaño
      mapInstanceRef.current.invalidateSize();
    }
    
    return () => {
      // Limpiar el mapa cuando el componente se desmonta
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, fullScreen]);
  
  // Cambiar la vista del mapa
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    // Cambiar entre diferentes capas de mapas
    if (mapView === 'map') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    } else {
      // Para vista satelital, usamos ESRI World Imagery
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(mapInstanceRef.current);
    }
  }, [mapView]);
  
  // Actualizar el zoom del mapa
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(zoom);
  }, [zoom]);

  // Función para inicializar el mapa
  const initializeMap = () => {
    if (!mapRef.current || !window.L) return;
    
    // Crear instancia del mapa
    const map = L.map(mapRef.current).setView([coordenadas.latitud, coordenadas.longitud], zoom);
    
    // Añadir capa base OSM
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Añadir marcador
    const marker = L.marker([coordenadas.latitud, coordenadas.longitud])
      .addTo(map)
      .bindPopup(coordenadas.descripcion || 'Ubicación del marcaje');
    
    // Guardar referencias
    mapInstanceRef.current = map;
    markerRef.current = marker;
  };

  // Función para alternar pantalla completa del mapa
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  // Ajustar el zoom
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 19));
  };
  
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 5));
  };

  // La clase del modal cambia según si está en pantalla completa o no
  const modalClass = fullScreen 
    ? "fixed inset-0 z-50 bg-white overflow-auto"
    : "fixed inset-0 z-50 flex items-center justify-center";

  // La clase del contenido cambia según si está en pantalla completa o no
  const contentClass = fullScreen
    ? "w-full h-full"
    : "bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-auto";

  // Obtener resultado verificación con estilo
  const getResultadoStyle = () => {
    // Utilizamos el resultado de marcaje o asumimos "Verificado" como valor predeterminado
    const resultado = marcaje.resultado || "Verificado";
    
    if (resultado === "Verificado") {
      return (
        <span className="inline-flex items-center text-green-600 font-medium">
          <Check className="w-4 h-4 mr-1" />
          {resultado}
        </span>
      );
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
            <h2 className="text-xl font-medium flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Detalle de Marcaje
            </h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-blue-700 rounded-full p-1"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Cuerpo del modal */}
          <div className="flex flex-col md:flex-row">
            {/* Panel izquierdo con datos */}
            <div className="p-5 md:w-1/2">
              {/* Badge de estado */}
              <div className="mb-6 inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
                {marcaje.tipoMarcaje}
              </div>
              
              {/* Datos del marcaje */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-blue-500 mr-2" />
                  Datos del marcaje
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Fecha</p>
                        <p className="font-medium">{marcaje.fecha}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-4 h-4 text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Hora</p>
                        <p className="font-medium">{marcaje.hora}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Fingerprint className="w-4 h-4 text-gray-400 mt-1 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Tipo De Verificación</p>
                        <p className="font-medium">{marcaje.tipoVerificacion}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Resultado</p>
                      <p>{getResultadoStyle()}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Ubicación Estructural</p>
                      <p className="font-medium">{employee.location || coordenadas.descripcion}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Detalles</p>
                      <p className="font-medium">{marcaje.observaciones || "--"}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Datos de la persona */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <User className="w-5 h-5 text-blue-500 mr-2" />
                  Datos de la persona
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Núm. Documento</p>
                      <p className="font-medium">{employee.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tipo De Persona</p>
                      <p className="font-medium">Empleado</p>
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
                      <p className="text-sm text-gray-500">Cargo</p>
                      <p className="font-medium">{employee.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Departamento</p>
                      <p className="font-medium">{employee.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Panel derecho con mapa */}
            <div className="p-5 md:w-1/2 flex flex-col">
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <MapIcon className="w-5 h-5 text-blue-500 mr-2" />
                Ubicación del Marcaje
              </h3>
              
              {/* Mapa */}
              <div className="relative border border-gray-200 rounded-lg overflow-hidden flex-grow">
                {/* Controles del mapa */}
                <div className="absolute top-2 left-2 z-10 flex flex-col space-y-2">
                  {/* Selector de vista */}
                  <div className="bg-white rounded-md shadow-md overflow-hidden">
                    <button 
                      className={`px-3 py-1 text-sm transition-colors flex items-center ${mapView === 'map' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                      onClick={() => setMapView('map')}
                    >
                      <MapIcon className="w-3 h-3 mr-1" />
                      Mapa
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm transition-colors flex items-center ${mapView === 'satellite' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
                      onClick={() => setMapView('satellite')}
                    >
                      <Image className="w-3 h-3 mr-1" />
                      Satélite
                    </button>
                  </div>
                  
                  {/* Controles de zoom */}
                  <div className="bg-white rounded-md shadow-md overflow-hidden">
                    <button 
                      className="p-1 hover:bg-gray-100 block"
                      onClick={handleZoomIn}
                      aria-label="Acercar"
                    >
                      <Plus size={18} />
                    </button>
                    <div className="h-px bg-gray-200"></div>
                    <button 
                      className="p-1 hover:bg-gray-100 block"
                      onClick={handleZoomOut}
                      aria-label="Alejar"
                    >
                      <Minus size={18} />
                    </button>
                  </div>
                </div>
                
                {/* Botón de pantalla completa */}
                <div className="absolute top-2 right-2 z-10">
                  <button 
                    onClick={toggleFullScreen}
                    className="bg-white p-1 rounded-md shadow-md hover:bg-gray-100"
                    aria-label="Alternar pantalla completa"
                  >
                    {fullScreen ? <Minimize2 size={18} /> : <Maximize size={18} />}
                  </button>
                </div>
                
                {/* Contenedor del mapa */}
                <div 
                  ref={mapRef}
                  className="w-full h-full"
                  style={{ height: fullScreen ? 'calc(100vh - 130px)' : '520px' }}
                >
                  {/* El mapa se renderizará aquí con el useEffect */}
                </div>
              </div>
              
              {/* Coordenadas */}
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex justify-between items-center mb-1">
                  <span>Latitud:</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{coordenadas.latitud.toFixed(6)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Longitud:</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">{coordenadas.longitud.toFixed(6)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 p-4 flex justify-end border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarcajeDetailModal;