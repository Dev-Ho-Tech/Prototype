import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize, Plus, Minus, Layers, Search, X, MapPin, Users, Map as MapIcon, RefreshCw } from 'lucide-react';
import { MapViewProps, Sede } from '../../interface/map';
import { SEDES_MOCK } from '../../temp/sedes_temp';

// Componente de búsqueda mejorado
interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectSede: (sede: Sede) => void;
  filteredSedes: Sede[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, onSearchChange, onSelectSede, filteredSedes }) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  // Manejar clics fuera del componente para cerrar resultados
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar sede o ciudad..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="pl-9 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm text-black"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Resultados de búsqueda */}
      {isFocused && searchTerm && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {filteredSedes.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">No se encontraron resultados</div>
          ) : (
            <ul>
              {filteredSedes.map((sede) => (
                <li
                  key={sede.id}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm"
                  onClick={() => {
                    onSelectSede(sede);
                    setIsFocused(false);
                  }}
                >
                  <div className="font-medium">{sede.nombre}</div>
                  <div className="text-xs text-gray-500">{sede.ciudad}, {sede.pais}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const MapView: React.FC<MapViewProps> = ({ 
  onClose, 
  isFullscreen = false,
  onToggleFullscreen
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSedes, setFilteredSedes] = useState<Sede[]>(SEDES_MOCK);
  const [activeMapType, setActiveMapType] = useState<'map' | 'satellite'>('map');
  const [selectedSede, setSelectedSede] = useState<Sede | null>(null);
  const [currentZoom, setCurrentZoom] = useState(8);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 18.9012, lng: -70.1626 }); // República Dominicana
  const [showSidePanel, setShowSidePanel] = useState(true);
  
  // Estado para controlar el arrastre del mapa - Versión mejorada
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mapCenterAtDragStartRef = useRef(mapCenter);
  
  // Para monitorear si el mapa debe refrescarse
  const shouldRefreshRef = useRef(true);
  
  // Referencia para guardar las dimensiones del mapa
  const mapDimensionsRef = useRef({ width: 0, height: 0 });

  // Actualizar dimensiones del mapa cuando cambie su tamaño
  useEffect(() => {
    if (mapContainerRef.current) {
      const updateDimensions = () => {
        if (mapContainerRef.current) {
          mapDimensionsRef.current = {
            width: mapContainerRef.current.clientWidth,
            height: mapContainerRef.current.clientHeight
          };
        }
      };
      
      // Actualizar dimensiones inicialmente
      updateDimensions();
      
      // Actualizar dimensiones cuando cambie el tamaño de la ventana
      window.addEventListener('resize', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);

  // Seleccionar la primera sede por defecto al cargar
  useEffect(() => {
    if (SEDES_MOCK.length > 0 && !selectedSede) {
      centerOnSede(SEDES_MOCK[0]);
    }
  }, []);

  // Filtrar sedes basado en el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSedes(SEDES_MOCK);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = SEDES_MOCK.filter(
        sede => 
          sede.nombre.toLowerCase().includes(term) ||
          sede.ciudad.toLowerCase().includes(term) ||
          sede.direccion.toLowerCase().includes(term)
      );
      setFilteredSedes(filtered);
    }
  }, [searchTerm]);

  // Cambiar a pantalla completa
  const toggleFullscreen = () => {
    if (onToggleFullscreen) {
      onToggleFullscreen();
    }
  };

  // Zoom in
  const handleZoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 1, 18));
    shouldRefreshRef.current = true;
  };

  // Zoom out
  const handleZoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 1, 3));
    shouldRefreshRef.current = true;
  };

  // Cambiar tipo de mapa
  const toggleMapType = () => {
    setActiveMapType(activeMapType === 'map' ? 'satellite' : 'map');
  };

  // Centrar en una sede específica
  const centerOnSede = (sede: Sede) => {
    setSelectedSede(sede);
    const newCenter = { lat: sede.lat, lng: sede.lng };
    setMapCenter(newCenter);
    mapCenterAtDragStartRef.current = newCenter;
    setCurrentZoom(15);
    shouldRefreshRef.current = true;
  };

  // Función para centrar el mapa en la ubicación actual (simulada)
  const centerOnCurrentLocation = () => {
    // En una implementación real, usaríamos la API de geolocalización
    // Por ahora simplemente centramos en un punto predefinido
    const currentLocation = { lat: 18.9012, lng: -70.1626 };
    setMapCenter(currentLocation);
    mapCenterAtDragStartRef.current = currentLocation;
    setCurrentZoom(8);
    shouldRefreshRef.current = true;
  };

  // Convertir píxeles a coordenadas geográficas - MEJORADO para movimiento en todas direcciones
  const pixelsToGeo = (deltaX: number, deltaY: number, zoom: number) => {
    // Calcular factor de escala basado en el zoom
    const scale = Math.pow(2, zoom);
    
    // Una aproximación de píxeles por grado a este nivel de zoom
    const pixelsPerLngDegree = (256 * scale) / 360;
    const pixelsPerLatRadian = (256 * scale) / (2 * Math.PI);
    
    // Convertir cambio en píxeles a cambio en coordenadas
    const lngChange = deltaX / pixelsPerLngDegree;
    
    // Para latitud, necesitamos ajustar según la posición actual
    // porque la proyección de Mercator no es lineal con la latitud
    const latRad = mapCenter.lat * Math.PI / 180;
    const latChange = -deltaY / (pixelsPerLatRadian * Math.cos(latRad));
    
    return { lngChange, latChange };
  };

  // Manejadores para el arrastre del mapa - MEJORADO para movimiento bidireccional
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevenir selección de texto durante el arrastre
    setIsDragging(true);
    lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    mapCenterAtDragStartRef.current = mapCenter;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    // Calcular cuánto se ha movido el ratón desde la última posición
    const deltaX = e.clientX - lastMousePositionRef.current.x;
    const deltaY = e.clientY - lastMousePositionRef.current.y;
    
    // Si el movimiento es muy pequeño, no hacer nada para evitar micro-ajustes
    if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
      return;
    }
    
    // Convertir el movimiento de píxeles a cambio en coordenadas (corregido)
    const { lngChange, latChange } = pixelsToGeo(deltaX, deltaY, currentZoom);
    
    // Actualizar el centro del mapa en tiempo real
    const newCenter = {
      lng: mapCenterAtDragStartRef.current.lng - lngChange,
      lat: mapCenterAtDragStartRef.current.lat - latChange
    };
    
    // Verificar que las nuevas coordenadas son válidas
    if (isFinite(newCenter.lat) && isFinite(newCenter.lng) &&
        Math.abs(newCenter.lat) <= 85 && Math.abs(newCenter.lng) <= 180) {
      setMapCenter(newCenter);
    }
    
    // Actualizar la última posición del ratón
    lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    shouldRefreshRef.current = true;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    shouldRefreshRef.current = true;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      shouldRefreshRef.current = true;
    }
  };

  // Generar mosaicos para el área visible
  const generateTiles = () => {
    const tiles = [];
    const tilesPerSide = Math.pow(2, currentZoom);
    const tileSize = 256;
    
    // Calcular el centro del mapa en coordenadas de tile
    const centerX = (mapCenter.lng + 180) / 360 * tilesPerSide;
    const centerY = (1 - Math.log(Math.tan(mapCenter.lat * Math.PI / 180) + 1 / Math.cos(mapCenter.lat * Math.PI / 180)) / Math.PI) / 2 * tilesPerSide;
    
    // Determinar cuántos tiles mostrar en cada dirección
    // Utilizar las dimensiones reales del contenedor del mapa
    const containerWidth = mapDimensionsRef.current.width || window.innerWidth;
    const containerHeight = mapDimensionsRef.current.height || window.innerHeight;
    
    const tilesX = Math.ceil(containerWidth / tileSize / 2) + 1; // +1 para cubrir bordes
    const tilesY = Math.ceil(containerHeight / tileSize / 2) + 1;
    
    for (let x = Math.floor(centerX) - tilesX; x <= Math.floor(centerX) + tilesX; x++) {
      for (let y = Math.floor(centerY) - tilesY; y <= Math.floor(centerY) + tilesY; y++) {
        if (x >= 0 && x < tilesPerSide && y >= 0 && y < tilesPerSide) {
          // Construir URL para este tile
          const url = `https://a.tile.openstreetmap.org/${currentZoom}/${x}/${y}.png`;
          
          // Posición relativa al centro
          const left = (x - centerX) * tileSize;
          const top = (y - centerY) * tileSize;
          
          tiles.push(
            <img 
              key={`${x}-${y}`}
              src={url}
              alt=""
              style={{
                position: 'absolute',
                left: `calc(50% + ${left}px)`,
                top: `calc(50% + ${top}px)`,
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
            />
          );
        }
      }
    }
    
    // Indicar que el mapa ha sido refrescado
    shouldRefreshRef.current = false;
    
    return tiles;
  };

  // Calcular posición en el mapa para una sede
  const calculateMarkerPosition = (lat: number, lng: number) => {
    // Mejorar la precisión de la proyección de Mercator
    const tilesPerSide = Math.pow(2, currentZoom);
    const tileSize = 256;
    
    // Transformación de coordenadas geográficas a píxeles
    const worldSize = tileSize * tilesPerSide;
    const lngRad = lng * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const centerLngRad = mapCenter.lng * Math.PI / 180;
    const centerLatRad = mapCenter.lat * Math.PI / 180;
    
    // Proyección de Mercator (x)
    const x = (lngRad - centerLngRad) * worldSize / (2 * Math.PI);
    
    // Proyección de Mercator (y)
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    const mercCenterN = Math.log(Math.tan((Math.PI / 4) + (centerLatRad / 2)));
    const y = (mercCenterN - mercN) * worldSize / (2 * Math.PI);
    
    return { x, y };
  };

  // Generar marcadores para las sedes
  const generateMarkers = () => {
    return filteredSedes.map(sede => {
      // Determinar tamaño del marcador según la cantidad de empleados
      let size = 20;
      let color = '#3B82F6'; // Color base azul (Tailwind blue-500)
      
      if (sede.cantidadEmpleados > 150) {
        size = 30;
        color = '#2563EB'; // Azul más oscuro (Tailwind blue-600)
      } else if (sede.cantidadEmpleados > 100) {
        size = 25;
        color = '#3B82F6'; // Azul estándar (Tailwind blue-500)
      }
      
      // Calcular posición relativa al centro
      const position = calculateMarkerPosition(sede.lat, sede.lng);
      
      // Determinar si este marcador está seleccionado
      const isSelected = selectedSede?.id === sede.id;
      
      return (
        <div 
          key={sede.id}
          style={{
            position: 'absolute',
            left: `calc(50% + ${position.x}px)`,
            top: `calc(50% + ${position.y}px)`,
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            cursor: 'pointer'
          }}
          onClick={() => centerOnSede(sede)}
        >
          {/* Marcador */}
          <div 
            style={{
              backgroundColor: color,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: `${size/2}px`,
              border: isSelected ? '3px solid white' : 'none',
              boxShadow: '0 3px 10px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s ease-in-out',
              transform: isSelected ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            {sede.cantidadEmpleados}
          </div>
          
          {/* Información al seleccionar */}
          {isSelected && (
            <div 
              className="bg-white rounded-lg shadow-lg p-3 absolute z-10"
              style={{
                top: `${size + 5}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                pointerEvents: 'none',
                borderLeft: '4px solid #3B82F6'
              }}
            >
              <div className="font-semibold text-gray-900">{sede.nombre}</div>
              <div className="text-sm text-gray-600 mt-1">{sede.direccion}</div>
              <div className="text-sm text-gray-600">{sede.ciudad}, {sede.pais}</div>
              <div className="flex items-center mt-2 text-blue-600">
                <Users className="w-4 h-4 mr-1" />
                <span className="font-semibold">{sede.cantidadEmpleados} empleados</span>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  // Determinar clases CSS según si está en modo fullscreen o no
  const containerClasses = isFullscreen
    ? "fixed inset-0 bg-white z-50 flex flex-col"
    : "flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Header con controles principales */}
      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <h2 className="text-xl font-semibold flex items-center">
          <MapIcon className="w-6 h-6 mr-2" />
          Mapa de Distribución de Personal
        </h2>
        
        <div className="flex items-center space-x-3">
          {/* Componente de búsqueda */}
          <div className="bg-blue-700/30 rounded-lg p-1">
            <SearchBox
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSelectSede={centerOnSede}
              filteredSedes={filteredSedes}
            />
          </div>
          
          {/* Botones de control */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowSidePanel(!showSidePanel)}
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              title={showSidePanel ? "Ocultar panel lateral" : "Mostrar panel lateral"}
            >
              <Layers className="w-5 h-5" />
            </button>
            {/* <button
              onClick={toggleMapType}
              className={`p-2 rounded-lg ${activeMapType === 'satellite' ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
              title={activeMapType === 'map' ? 'Cambiar a satélite' : 'Cambiar a mapa'}
            >
              <MapIcon className="w-5 h-5" />
            </button> */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              title="Cerrar mapa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Panel lateral de sedes - Colapsable */}
        {showSidePanel && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 text-lg">Sedes</h3>
                <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {filteredSedes.length} sedes
                </div>
              </div>
              
              {/* Lista de sedes */}
              {filteredSedes.length === 0 ? (
                <div className="text-center py-6 px-4">
                  <Search className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">No se encontraron sedes con estos criterios</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-3 text-blue-500 text-sm hover:text-blue-700"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredSedes.map((sede) => (
                    <div 
                      key={sede.id}
                      className={`p-3 rounded-lg transition-all cursor-pointer flex ${
                        selectedSede?.id === sede.id 
                          ? 'bg-blue-100 border-l-4 border-blue-500'
                          : 'bg-white hover:bg-blue-50 border-l-4 border-transparent'
                      }`}
                      onClick={() => centerOnSede(sede)}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          selectedSede?.id === sede.id 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{sede.nombre}</div>
                        <div className="text-xs text-gray-500 truncate">{sede.direccion}</div>
                        <div className="text-xs text-gray-500">{sede.ciudad}, {sede.pais}</div>
                        <div className={`text-xs font-medium mt-1 flex items-center ${
                          selectedSede?.id === sede.id ? 'text-blue-600' : 'text-blue-500'
                        }`}>
                          <Users className="w-3 h-3 mr-1" />
                          {sede.cantidadEmpleados} empleados
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contenedor del mapa */}
        <div className="flex-1 relative">
          <div 
            ref={mapContainerRef} 
            className="w-full h-full bg-gray-100 relative overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* Capa de mapa OpenStreetMap o Satélite */}
            <div className="absolute inset-0 bg-gray-100">
              {activeMapType === 'map' ? (
                // Mapa estándar OpenStreetMap
                generateTiles()
              ) : (
                // Versión estilizada para satélite
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    backgroundColor: '#1E293B', // Slate-800
                    backgroundImage: 'radial-gradient(rgba(30, 41, 59, 0.7) 2px, transparent 0)',
                    backgroundSize: '30px 30px',
                    opacity: 0.95
                  }}
                />
              )}
            </div>
            
            {/* Marcadores en el mapa */}
            {generateMarkers()}
          </div>
          
          {/* Panel de controles flotante - Ubicado en la parte inferior izquierda */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Controles de zoom */}
            <div className="border-b border-gray-200">
              <button
                onClick={handleZoomIn}
                className="p-2 block w-full hover:bg-gray-50 text-gray-700 transition-colors"
                title="Acercar"
              >
                <Plus className="w-5 h-5 mx-auto" />
              </button>
              <div className="px-2 py-1 font-medium text-sm text-center text-gray-700 border-t border-b border-gray-200">
                {currentZoom}
              </div>
              <button
                onClick={handleZoomOut}
                className="p-2 block w-full hover:bg-gray-50 text-gray-700 transition-colors"
                title="Alejar"
              >
                <Minus className="w-5 h-5 mx-auto" />
              </button>
            </div>
            
            {/* Centrar en ubicación actual */}
            <button
              onClick={centerOnCurrentLocation}
              className="p-2 block w-full hover:bg-gray-50 text-gray-700 transition-colors"
              title="Centrar en mi ubicación"
            >
              <RefreshCw className="w-5 h-5 mx-auto" />
            </button>
          </div>
          
          {/* Información de ubicación - Abajo a la derecha */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 text-xs text-gray-600">
            {selectedSede ? (
              <>
                <div className="font-medium">{selectedSede.nombre}</div>
                <div className="text-gray-500">
                  {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
                </div>
              </>
            ) : (
              <div>
                {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;