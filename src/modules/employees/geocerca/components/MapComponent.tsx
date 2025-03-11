/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Coordenadas } from '../interfaces/Geocerca';

interface MapComponentProps {
  mapType: "mapa" | "satelite";
  radius: number;
  onLocationSelect: (location: Coordenadas) => void;
  initialLocation: Coordenadas;
  readOnly?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  mapType,
  radius,
  onLocationSelect,
  initialLocation,
  readOnly = false
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar scripts de Leaflet dinámicamente (si no están ya cargados)
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.L) {
      // Cargar CSS de Leaflet
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      document.head.appendChild(linkElement);
      
      // Cargar JS de Leaflet
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
      script.onload = () => {
        setMapLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  // Inicializar el mapa cuando se cargue Leaflet
  useEffect(() => {
    if (!mapLoaded || !containerRef.current) return;
    
    const L = window.L;
    
    // Solo inicializar el mapa si aún no se ha hecho
    if (!mapRef.current) {
      // Crear el mapa
      mapRef.current = L.map(containerRef.current).setView(
        [initialLocation.lat, initialLocation.lng],
        15
      );
      
      // Configurar el icono predeterminado para los marcadores
      const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.Marker.prototype.options.icon = DefaultIcon;
      
      // Agregar el marcador inicial
      markerRef.current = L.marker([initialLocation.lat, initialLocation.lng])
        .addTo(mapRef.current);
      
      // Agregar el círculo inicial
      circleRef.current = L.circle([initialLocation.lat, initialLocation.lng], {
        radius: radius,
        fillColor: "#4f46e5",
        fillOpacity: 0.2,
        color: "#4f46e5",
        weight: 2,
      }).addTo(mapRef.current);
      
      // Configurar el manejador de clics en el mapa (si no es de solo lectura)
      if (!readOnly) {
        mapRef.current.on("click", (e: any) => {
          const { lat, lng } = e.latlng;
          updateMarkerAndCircle(lat, lng);
          onLocationSelect({ lat, lng });
        });
      }
    }

    // Actualizar el tipo de mapa (fondo)
    updateTileLayer();
    
    return () => {
      // Limpiar el mapa al desmontar
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapLoaded, mapType]);

  // Actualizar la capa de tiles cuando cambie el tipo de mapa
  const updateTileLayer = () => {
    if (!mapRef.current || !mapLoaded) return;
    
    const L = window.L;
    
    // Eliminar las capas de tiles existentes
    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) {
        mapRef.current.removeLayer(layer);
      }
    });
    
    // Agregar la capa de tiles según el tipo seleccionado
    const tileLayer = L.tileLayer(
      mapType === "mapa"
        ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    );
    
    tileLayer.addTo(mapRef.current);
  };

  // Actualizar la posición del marcador y el círculo cuando cambia initialLocation
  useEffect(() => {
    if (mapRef.current && markerRef.current && circleRef.current && mapLoaded) {
      updateMarkerAndCircle(initialLocation.lat, initialLocation.lng);
      
      // Centrar el mapa en la nueva ubicación
      mapRef.current.setView([initialLocation.lat, initialLocation.lng]);
    }
  }, [initialLocation, mapLoaded]);

  // Actualizar el radio del círculo cuando cambia
  useEffect(() => {
    if (circleRef.current && mapLoaded) {
      circleRef.current.setRadius(radius);
    }
  }, [radius, mapLoaded]);

  // Función para actualizar el marcador y el círculo
  const updateMarkerAndCircle = (lat: number, lng: number) => {
    if (!markerRef.current || !circleRef.current) return;
    
    markerRef.current.setLatLng([lat, lng]);
    circleRef.current.setLatLng([lat, lng]);
  };

  // Función para buscar una dirección
  const handleSearch = async () => {
    if (!searchQuery || !mapLoaded) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLat = Number.parseFloat(lat);
        const newLng = Number.parseFloat(lon);
        
        updateMarkerAndCircle(newLat, newLng);
        
        if (mapRef.current) {
          mapRef.current.setView([newLat, newLng], 15);
        }
        
        onLocationSelect({ lat: newLat, lng: newLng });
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <>
      {!readOnly && (
        <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Buscar dirección..."
              icon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
      )}

      <div 
        ref={containerRef}
        className="h-full w-full"
        style={{ height: "100%", width: "100%" }}
      />
    </>
  );
};

// Declarar el tipo global para Leaflet
declare global {
  interface Window {
    L: any;
  }
}

export default MapComponent;