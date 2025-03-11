import React, { useState, useEffect } from 'react';
import { MapPin, Save, ArrowLeft } from 'lucide-react';
import { Geocerca } from '../interfaces/Geocerca';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import MapComponent from './MapComponent';
import { perfilesMarcajeOptions, turnosOptions } from '../temp/mock-data';

interface GeocercaEditarProps {
  geocerca: Geocerca | null; // null para nueva geocerca
  onSave: (geocerca: Geocerca) => void;
  onCancel: () => void;
}

export const GeocercaEditar: React.FC<GeocercaEditarProps> = ({ 
  geocerca, 
  onSave, 
  onCancel 
}) => {
  const [mapView, setMapView] = useState<"mapa" | "satelite">("mapa");
  const [nombre, setNombre] = useState('');
  const [sede, setSede] = useState('');
  const [radio, setRadio] = useState(100);
  const [direccion, setDireccion] = useState('');
  const [estado, setEstado] = useState<'Activa' | 'Inactiva'>('Activa');
  const [coordenadas, setCoordenadas] = useState({ lat: 19.4517, lng: -70.6986 });
  const [perfilesMarcaje, setPerfilesMarcaje] = useState<string[]>([]);
  const [turnos, setTurnos] = useState<string[]>([]);

  // Cargar datos existentes si es una edición
  useEffect(() => {
    if (geocerca) {
      setNombre(geocerca.nombre);
      setSede(geocerca.sede);
      setRadio(geocerca.radio);
      setDireccion(geocerca.direccion);
      setEstado(geocerca.estado);
      setCoordenadas(geocerca.coordenadas);
      setPerfilesMarcaje(geocerca.perfilesMarcaje || []);
      setTurnos(geocerca.turnos || []);
    }
  }, [geocerca]);

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setCoordenadas(location);
  };

  const togglePerfilMarcaje = (perfil: string) => {
    if (perfilesMarcaje.includes(perfil)) {
      setPerfilesMarcaje(perfilesMarcaje.filter(p => p !== perfil));
    } else {
      setPerfilesMarcaje([...perfilesMarcaje, perfil]);
    }
  };

  const toggleTurno = (turno: string) => {
    if (turnos.includes(turno)) {
      setTurnos(turnos.filter(t => t !== turno));
    } else {
      setTurnos([...turnos, turno]);
    }
  };

  const handleSave = () => {
    // Validaciones básicas
    if (!nombre || !sede || !direccion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    if (perfilesMarcaje.length === 0) {
      alert('Seleccione al menos un perfil de marcaje');
      return;
    }

    // Crear objeto de geocerca para guardar
    const geocercaGuardar: Geocerca = {
      id: geocerca?.id || `id-${Date.now()}`, // Generar ID temporal para nuevas geocercas
      nombre,
      sede,
      radio,
      direccion,
      estado,
      empleadosAsignados: geocerca?.empleadosAsignados || 0,
      fechaCreacion: geocerca?.fechaCreacion || new Date().toLocaleDateString('es-ES'),
      coordenadas,
      perfilesMarcaje,
      turnos
    };

    onSave(geocercaGuardar);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onCancel} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {geocerca ? 'Editar Geocerca' : 'Crear Nueva Geocerca'}
            </h1>
            <p className="text-gray-500">
              {geocerca 
                ? `Modifique los datos de la geocerca ${geocerca.nombre}` 
                : 'Defina una nueva zona geográfica para marcajes de asistencia'}
            </p>
          </div>
        </div>
        <div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            {geocerca ? 'Guardar Cambios' : 'Guardar'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Geocerca
                </label>
                <Input 
                  placeholder="Ej: HODELPA GRAN ALMIRANTE"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Nombre identificativo para la geocerca</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sede</label>
                <select
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                  value={sede}
                  onChange={(e) => setSede(e.target.value)}
                >
                  <option value="">Seleccione una sede</option>
                  <option value="Hodelpa Gran Almirante">Hodelpa Gran Almirante</option>
                  <option value="Hodelpa Garden">Hodelpa Garden</option>
                  <option value="Centro Plaza Hodelpa">Centro Plaza Hodelpa</option>
                  <option value="Hodelpa Centro">Hodelpa Centro</option>
                  <option value="Hodelpa Caribe Colonial">Hodelpa Caribe Colonial</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Sede a la que pertenece esta geocerca</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as 'Activa' | 'Inactiva')}
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Estado actual de la geocerca</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Radio de geocerca: {radio}m
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">50m</span>
                  <input
                    type="range"
                    min={50}
                    max={500}
                    step={10}
                    value={radio}
                    onChange={(e) => setRadio(parseInt(e.target.value))}
                    className="flex-1 h-2 rounded-lg appearance-none bg-blue-100 cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">500m</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Radio en metros para la geocerca (entre 50m y 500m)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <Input 
                  placeholder="Ej: Av. Las Américas, Santiago"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Dirección física de la geocerca</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perfiles de marcaje</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {perfilesMarcajeOptions.map((perfil) => (
                    <Badge
                      key={perfil.value}
                      variant={perfilesMarcaje.includes(perfil.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => togglePerfilMarcaje(perfil.value)}
                    >
                      {perfil.label}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Perfiles de marcaje permitidos en esta geocerca</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Turnos</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {turnosOptions.map((turno) => (
                    <Badge
                      key={turno.value}
                      variant={turnos.includes(turno.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTurno(turno.value)}
                    >
                      {turno.label}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Turnos asociados a esta geocerca (opcional)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold">Ubicación de la Geocerca</h3>
                </div>
                <div className="flex">
                  <Tabs value={mapView} onValueChange={(v) => setMapView(v as "mapa" | "satelite")}>
                    <TabsList className="grid w-[180px] grid-cols-2">
                      <TabsTrigger value="mapa">Mapa</TabsTrigger>
                      <TabsTrigger value="satelite">Satélite</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <div className="h-[500px] relative">
                <MapComponent
                  mapType={mapView}
                  radius={radio}
                  onLocationSelect={handleLocationSelect}
                  initialLocation={coordenadas}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};