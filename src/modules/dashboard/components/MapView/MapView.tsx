import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize, Plus, Minus, Layers } from 'lucide-react';
import { MapViewProps, Sede } from '../../interface/map';
import { SEDES_MOCK } from '../../temp/sedes_temp';
import SearchBox from './SearchBox';

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
  
  // Estado para controlar el arrastre del mapa - Versión simplificada
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

  // Convertir píxeles a coordenadas geográficas
  const pixelsToGeo = (deltaX: number, deltaY: number, zoom: number) => {
    // Calcular factor de escala basado en el zoom
    const scale = Math.pow(2, zoom);
    
    // Una aproximación de píxeles por grado a este nivel de zoom
    const pixelsPerLngDegree = (256 * scale) / 360;
    const pixelsPerLatRadian = (256 * scale) / (2 * Math.PI);
    
    // Convertir cambio en píxeles a cambio en coordenadas
    const lngChange = -deltaX / pixelsPerLngDegree;
    
    // Para latitud, necesitamos ajustar según la posición actual
    // porque la proyección de Mercator no es lineal con la latitud
    const latRad = mapCenter.lat * Math.PI / 180;
    const latChange = deltaY / (pixelsPerLatRadian * Math.cos(latRad));
    
    return { lngChange, latChange };
  };

  // Manejadores para el arrastre del mapa - Versión simplificada
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
    
    // Convertir el movimiento de píxeles a cambio en coordenadas
    const { lngChange, latChange } = pixelsToGeo(deltaX, deltaY, currentZoom);
    
    // Actualizar el centro del mapa en tiempo real
    const newCenter = {
      lng: mapCenter.lng + lngChange,
      lat: mapCenter.lat + latChange
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
      let color = '#3388ff';
      
      if (sede.cantidadEmpleados > 150) {
        size = 30;
        color = '#2c6fbb'; // Azul más oscuro para sedes grandes
      } else if (sede.cantidadEmpleados > 100) {
        size = 25;
        color = '#4e9af1'; // Azul medio para sedes medianas
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
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            {sede.cantidadEmpleados}
          </div>
          
          {/* Información al seleccionar */}
          {isSelected && (
            <div 
              style={{
                position: 'absolute',
                top: `${size + 5}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '8px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 1001,
                width: '180px',
                pointerEvents: 'none'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{sede.nombre}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{sede.direccion}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{sede.ciudad}</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#3366cc', marginTop: '4px' }}>
                {sede.cantidadEmpleados} empleados
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
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-800">Mapa de Sedes</h2>
        
        <div className="flex items-center space-x-4">
          {/* Componente de búsqueda */}
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSelectSede={centerOnSede}
            filteredSedes={filteredSedes}
          />
          
          {/* Botones de control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMapType}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              title={activeMapType === 'map' ? 'Cambiar a satélite' : 'Cambiar a mapa'}
            >
              <Layers className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
              title="Cerrar mapa"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Panel lateral de sedes */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-3">
            <h3 className="font-medium text-gray-700 mb-2">Sedes</h3>
            <div className="text-xs text-gray-500 mb-3">
              Total: {filteredSedes.length} sedes / {filteredSedes.reduce((sum, sede) => sum + sede.cantidadEmpleados, 0)} empleados
            </div>
            {filteredSedes.length === 0 ? (
              <p className="text-sm text-gray-500">No se encontraron sedes</p>
            ) : (
              <ul className="space-y-2">
                {filteredSedes.map((sede) => (
                  <li 
                    key={sede.id}
                    className={`p-2 bg-white rounded-lg border transition-colors cursor-pointer
                      ${selectedSede?.id === sede.id 
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-blue-50'
                      }`}
                    onClick={() => centerOnSede(sede)}
                  >
                    <div className="font-medium text-gray-800">{sede.nombre}</div>
                    <div className="text-xs text-gray-500">{sede.direccion}</div>
                    <div className="text-xs text-gray-500">{sede.ciudad}, {sede.pais}</div>
                    <div className="text-xs font-medium text-blue-600 mt-1">
                      {sede.cantidadEmpleados} empleados
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

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
                // Versión simplificada para satélite (en producción usarías tiles de satélite)
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    backgroundColor: '#264653',
                    backgroundImage: 'linear-gradient(30deg, #1a535c 12%, transparent 12.5%, transparent 87%, #1a535c 87.5%, #1a535c), linear-gradient(150deg, #1a535c 12%, transparent 12.5%, transparent 87%, #1a535c 87.5%, #1a535c), linear-gradient(30deg, #1a535c 12%, transparent 12.5%, transparent 87%, #1a535c 87.5%, #1a535c), linear-gradient(150deg, #1a535c 12%, transparent 12.5%, transparent 87%, #1a535c 87.5%, #1a535c), linear-gradient(60deg, #1a535c77 25%, transparent 25.5%, transparent 75%, #1a535c77 75%, #1a535c77), linear-gradient(60deg, #1a535c77 25%, transparent 25.5%, transparent 75%, #1a535c77 75%, #1a535c77)',
                    backgroundSize: '60px 105px',
                    backgroundPosition: '0 0, 0 0, 30px 53px, 30px 53px, 0 0, 30px 53px',
                    opacity: 0.8
                  }}
                />
              )}
            </div>
            
            {/* Marcadores en el mapa */}
            {generateMarkers()}
            
            {/* Marcadores de posición */}
            {selectedSede && (
              <div 
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(255,0,0,0.5)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1001,
                  pointerEvents: 'none'
                }}
              />
            )}
          </div>
          
          {/* Controles de zoom */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
            <button
              onClick={handleZoomIn}
              className="p-2 block border-b border-gray-200 text-gray-700 hover:bg-gray-50"
              title="Acercar"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 block text-gray-700 hover:bg-gray-50"
              title="Alejar"
            >
              <Minus className="w-5 h-5" />
            </button>
          </div>

          {/* Leyenda del mapa */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
            <h4 className="font-medium text-gray-800 mb-2">Leyenda</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Menos de 100 empleados</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-blue-600 rounded-full mr-2"></div>
                <span className="text-sm">100-150 empleados</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-700 rounded-full mr-2"></div>
                <span className="text-sm">Más de 150 empleados</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                El tamaño del punto indica la cantidad de empleados
              </div>
            </div>
          </div>

          {/* Controles para mapa */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md">
            <div className="text-xs font-medium text-gray-700 p-2 border-b border-gray-200">
              Zoom: {currentZoom}
            </div>
            <div className="text-xs text-gray-500 p-2">
              Centro: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;