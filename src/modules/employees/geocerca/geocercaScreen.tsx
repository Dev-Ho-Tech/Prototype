import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const redMarkerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Main component
function GeofenceModule() {
  const [employee, setEmployee] = useState({
    name: 'SANTIAGO',
    profile: 'Remote App',
    location: 'HODELPA GRAN ALMIRANTE',
  });
  
  const [mapType, setMapType] = useState('mapa');
  const [geofenceRadius, setGeofenceRadius] = useState(250);
  const [center] = useState([18.4855, -69.8731]); // Santo Domingo, Republica dominicana
  const [isExpanded, setIsExpanded] = useState(true);
  const mapRef = useRef(null);
  
  // Handle checkbox click
  const handleEmployeeSelection = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Change radius of geofence
  const handleRadiusChange = (newRadius) => {
    setGeofenceRadius(newRadius);
    
    // Update circle if map is initialized
    if (mapRef.current && mapRef.current.circle) {
      mapRef.current.circle.setRadius(newRadius);
    }
  };

  // Initialize map after component mounts and when expanded
  useEffect(() => {
    if (isExpanded && !mapRef.current) {
      // Small delay to ensure the container is rendered
      setTimeout(() => {
        const container = document.getElementById('map');
        if (!container) return;
        
        // Initialize the map
        const map = L.map(container, {
          center: center,
          zoom: 15,
          zoomControl: false
        });
        
        // Add tile layer based on mapType
        mapRef.current = {
          map: map,
          layers: {}
        };
        
        updateMapType(mapType);
        
        // Add circle for geofence
        const circle = L.circle(center, {
          radius: geofenceRadius,
          fillColor: '#6366f1',
          fillOpacity: 0.2,
          color: '#4f46e5',
          weight: 2
        }).addTo(map);
        
        mapRef.current.circle = circle;
        
        // Add marker
        L.marker(center, {icon: redMarkerIcon}).addTo(map);

        // Add attribution
        L.control.attribution({
          position: 'bottomright'
        }).addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>').addTo(map);
      }, 100);
    }
  }, [isExpanded, center, mapType, geofenceRadius]);
  
  // Handle map type changes
  useEffect(() => {
    updateMapType(mapType);
  }, [mapType]);
  
  const updateMapType = (type) => {
    if (!mapRef.current || !mapRef.current.map) return;
    
    const map = mapRef.current.map;
    const layers = mapRef.current.layers;
    
    // Remove existing layers
    if (layers.tile) {
      map.removeLayer(layers.tile);
    }
    
    // Add new layer based on type
    if (type === 'mapa') {
      layers.tile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    } else {
      layers.tile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(map);
    }
  };
  
  // Zoom in function
  const handleZoomIn = () => {
    if (mapRef.current && mapRef.current.map) {
      mapRef.current.map.zoomIn();
    }
  };
  
  // Zoom out function
  const handleZoomOut = () => {
    if (mapRef.current && mapRef.current.map) {
      mapRef.current.map.zoomOut();
    }
  };
  
  return (
    <div className="geofence-container" style={{ 
      fontFamily: 'Inter, system-ui, sans-serif', 
      width: '100%', 
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="search-bar" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '15px 20px', 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <input 
          type="text" 
          placeholder="Buscar en conceptos" 
          style={{ 
            flex: 1, 
            padding: '10px 16px', 
            border: '1px solid #e2e8f0', 
            borderRadius: '8px',
            marginRight: '12px',
            fontSize: '14px'
          }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            style={{ 
              backgroundColor: '#9333ea', 
              border: 'none', 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              color: 'white',
              boxShadow: '0 2px 4px rgba(147, 51, 234, 0.2)'
            }}
            title="Menú"
          >
            <span style={{ fontSize: '18px' }}>≡</span>
          </button>
          <button 
            style={{ 
              backgroundColor: '#4f46e5', 
              border: 'none', 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              color: 'white',
              boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
            }}
            title="Añadir"
          >
            <span style={{ fontSize: '24px' }}>+</span>
          </button>
        </div>
      </div>
      
      <div className="content" style={{ padding: '16px 20px', flex: 1 }}>
        <div className="employee-list" style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div 
            className="employee-item" 
            style={{ 
              padding: '14px 20px', 
              borderBottom: '1px solid #e2e8f0', 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: '#f8fafc',
              fontWeight: 600,
              fontSize: '14px',
              color: '#475569'
            }}
          >
            <input 
              type="checkbox" 
              checked={true} 
              readOnly
              style={{ 
                marginRight: '12px',
                width: '18px',
                height: '18px',
                accentColor: '#4f46e5'
              }}
            />
            <span>Nombre</span>
          </div>
          
          <div 
            className="employee-item clickable" 
            onClick={handleEmployeeSelection}
            style={{ 
              padding: '14px 20px', 
              backgroundColor: isExpanded ? '#eff6ff' : 'white', 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              borderBottom: isExpanded ? '1px solid #bfdbfe' : 'none'
            }}
          >
            <input 
              type="checkbox" 
              checked={isExpanded} 
              onChange={handleEmployeeSelection} 
              style={{ 
                marginRight: '12px',
                width: '18px',
                height: '18px',
                accentColor: '#4f46e5'
              }}
            />
            <span style={{ fontWeight: isExpanded ? 500 : 400 }}>Santiago</span>
          </div>
          
          {isExpanded && (
            <div className="employee-details" style={{ padding: '24px', backgroundColor: 'white' }}>
              <div className="form-row" style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div className="form-group" style={{ flex: '1', minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#4b5563' }}>
                    Nombre <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    value={employee.name} 
                    onChange={(e) => setEmployee({...employee, name: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '10px 12px', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div className="form-group" style={{ flex: '1', minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#4b5563' }}>
                    Perfiles de marcaje
                  </label>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    width: '100%', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    padding: '5px 12px',
                    backgroundColor: 'white'
                  }}>
                    <span style={{ 
                      backgroundColor: '#f1f5f9', 
                      padding: '5px 10px', 
                      borderRadius: '6px', 
                      fontSize: '13px', 
                      display: 'flex', 
                      alignItems: 'center',
                      marginRight: '8px'
                    }}>
                      Remote App
                      <button style={{ 
                        marginLeft: '6px', 
                        border: 'none', 
                        background: 'none', 
                        cursor: 'pointer',
                        color: '#64748b',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                        width: '16px',
                        height: '16px'
                      }}>×</button>
                    </span>
                    <select style={{ 
                      flex: '1', 
                      padding: '5px', 
                      border: 'none', 
                      backgroundColor: 'transparent',
                      fontSize: '14px' 
                    }}>
                      <option value=""></option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group" style={{ flex: '1', minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#4b5563' }}>
                    Turnos
                  </label>
                  <select style={{ 
                    width: '100%', 
                    padding: '10px 12px', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontSize: '14px',
                    appearance: 'none',
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%2364748b\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '20px'
                  }}>
                    <option>Buscar</option>
                  </select>
                </div>
                
                <div className="form-group" style={{ flex: '1', minWidth: '200px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500, color: '#4b5563' }}>
                    Dirección de la geocerca
                  </label>
                  <input 
                    type="text" 
                    placeholder=""
                    style={{ 
                      width: '100%', 
                      padding: '10px 12px', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
              
              <div className="location-tag" style={{ marginBottom: '20px' }}>
                <span style={{ 
                  backgroundColor: '#f1f5f9', 
                  padding: '6px 12px', 
                  borderRadius: '6px', 
                  fontSize: '13px', 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  marginRight: '8px',
                  color: '#334155'
                }}>
                  {employee.location}
                  <button style={{ 
                    marginLeft: '8px', 
                    border: 'none', 
                    background: 'none', 
                    cursor: 'pointer',
                    color: '#64748b',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>×</button>
                </span>
              </div>
              
              <div className="map-section" style={{ marginBottom: '24px' }}>
                <div 
                  className="map-container" 
                  style={{ 
                    height: '500px', 
                    position: 'relative', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <div id="map" style={{ height: '100%', width: '100%' }}></div>
                  
                  <div className="map-controls" style={{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 1000 }}>
                    <div className="zoom-controls" style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      backgroundColor: 'white', 
                      borderRadius: '8px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      overflow: 'hidden'
                    }}>
                      <button 
                        onClick={handleZoomIn}
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          border: 'none', 
                          borderBottom: '1px solid #e2e8f0', 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          fontSize: '18px'
                        }}
                      >
                        +
                      </button>
                      <button 
                        onClick={handleZoomOut}
                        style={{ 
                          width: '36px', 
                          height: '36px', 
                          border: 'none', 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          fontSize: '18px'
                        }}
                      >
                        −
                      </button>
                    </div>
                  </div>
                  
                  <div className="map-type-selector" style={{ 
                    position: 'absolute', 
                    top: '16px', 
                    left: '16px', 
                    zIndex: 1000, 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)', 
                    display: 'flex',
                    overflow: 'hidden'
                  }}>
                    <button 
                      onClick={() => setMapType('mapa')} 
                      style={{ 
                        padding: '8px 16px', 
                        border: 'none', 
                        borderRight: '1px solid #e2e8f0', 
                        backgroundColor: mapType === 'mapa' ? '#4f46e5' : 'white',
                        color: mapType === 'mapa' ? 'white' : '#334155',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                    >
                      Mapa
                    </button>
                    <button 
                      onClick={() => setMapType('satélite')} 
                      style={{ 
                        padding: '8px 16px', 
                        border: 'none', 
                        backgroundColor: mapType === 'satélite' ? '#4f46e5' : 'white',
                        color: mapType === 'satélite' ? 'white' : '#334155',
                        cursor: 'pointer',
                        fontWeight: 500,
                        fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                    >
                      Satélite
                    </button>
                  </div>
                  
                  <div className="geofence-controls" style={{ 
                    position: 'absolute', 
                    top: '70px', 
                    left: '16px', 
                    zIndex: 1000, 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)', 
                    padding: '12px 16px',
                    minWidth: '220px'
                  }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '10px', 
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#334155'
                    }}>
                      Radio de geocerca: <span style={{ color: '#4f46e5', fontWeight: 600 }}>{geofenceRadius}m</span>
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>50m</span>
                      <input 
                        type="range" 
                        min="50" 
                        max="500" 
                        step="10" 
                        value={geofenceRadius} 
                        onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
                        style={{ 
                          flex: 1,
                          accentColor: '#4f46e5',
                          height: '6px'
                        }}
                      />
                      <span style={{ fontSize: '12px', color: '#64748b' }}>500m</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="action-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button style={{ 
                  padding: '10px 20px', 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#475569',
                  transition: 'all 0.2s'
                }}>
                  Cancelar
                </button>
                <button style={{ 
                  padding: '10px 20px', 
                  backgroundColor: '#4f46e5', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
                  transition: 'all 0.2s'
                }}>
                  Guardar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GeofenceModule;