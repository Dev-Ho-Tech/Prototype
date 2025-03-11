import React from 'react';
import { ArrowLeft, MapPin, Edit, Trash, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Geocerca } from '../interfaces/Geocerca';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import MapComponent from './MapComponent';

interface GeocercaDetalleProps {
  geocerca: Geocerca;
  onBack: () => void;
  onEdit: (geocerca: Geocerca) => void;
  onDelete: (geocerca: Geocerca) => void;
}

export const GeocercaDetalle: React.FC<GeocercaDetalleProps> = ({ 
  geocerca, 
  onBack, 
  onEdit, 
  onDelete 
}) => {
  const [mapView, setMapView] = React.useState<"mapa" | "satelite">("mapa");

  // Datos de ejemplo para mostrar estadísticas
  const estadisticas = {
    marcajesValidos: 245,
    porcentajeValidos: 94,
    entradas: 123,
    salidas: 122,
    tiempoPromedio: "8h 12m",
    marcajesFlotantes: 15,
    porcentajeFlotantes: 6,
    pendientes: 3,
    aprobados: 10,
    rechazados: 2,
    administrativos: 32,
    operativos: 88,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{geocerca.nombre}</h1>
            <p className="text-gray-500">{geocerca.direccion}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(geocerca)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              if (window.confirm(`¿Está seguro de eliminar la geocerca ${geocerca.nombre}?`)) {
                onDelete(geocerca);
              }
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <div className="h-[400px] relative">
                <MapComponent
                  mapType={mapView}
                  radius={geocerca.radio}
                  onLocationSelect={() => {}}
                  initialLocation={geocerca.coordenadas}
                  readOnly={true}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Marcajes Válidos (Últimos 30 días)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{estadisticas.marcajesValidos}</div>
                <div className="text-sm text-gray-500 mt-1">{estadisticas.porcentajeValidos}% del total de marcajes</div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Entradas</span>
                    <span className="font-medium">{estadisticas.entradas}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Salidas</span>
                    <span className="font-medium">{estadisticas.salidas}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Tiempo promedio</span>
                    <span className="font-medium">{estadisticas.tiempoPromedio}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-amber-600" />
                  Marcajes Flotantes (Últimos 30 días)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{estadisticas.marcajesFlotantes}</div>
                <div className="text-sm text-gray-500 mt-1">{estadisticas.porcentajeFlotantes}% del total de marcajes</div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Pendientes</span>
                    <span className="font-medium text-amber-600">{estadisticas.pendientes}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Aprobados</span>
                    <span className="font-medium text-green-600">{estadisticas.aprobados}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Rechazados</span>
                    <span className="font-medium text-red-600">{estadisticas.rechazados}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Estado</div>
                <Badge
                  variant={geocerca.estado === "Activa" ? "default" : "secondary"}
                  className={geocerca.estado === "Activa" ? "bg-green-100 text-green-800" : ""}
                >
                  {geocerca.estado}
                </Badge>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Sede</div>
                <div>{geocerca.sede}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Radio</div>
                <div>{geocerca.radio}m</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Coordenadas</div>
                <div className="text-sm">
                  Lat: {geocerca.coordenadas.lat.toFixed(6)}, Lng: {geocerca.coordenadas.lng.toFixed(6)}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Fecha de creación</div>
                <div className="flex items-center gap-1">
                  <span>{geocerca.fechaCreacion}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Empleados Asignados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{geocerca.empleadosAsignados}</div>
              <div className="text-sm text-gray-500 mt-1">Empleados con acceso a esta geocerca</div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Administrativos</span>
                  <span className="font-medium">{estadisticas.administrativos}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Operativos</span>
                  <span className="font-medium">{estadisticas.operativos}</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Users className="mr-2 h-4 w-4" />
                Ver Empleados
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Perfiles y Turnos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Perfiles de marcaje</div>
                <div className="flex flex-wrap gap-2">
                  {geocerca.perfilesMarcaje?.map(perfil => (
                    <Badge key={perfil} variant="outline" className="bg-blue-50">
                      {perfil === 'remote_app' ? 'Remote App' : 
                       perfil === 'biometrico' ? 'Biométrico' : 
                       perfil === 'web' ? 'Web' : 
                       perfil === 'kiosko' ? 'Kiosko' : perfil}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Turnos asignados</div>
                <div className="flex flex-wrap gap-2">
                  {geocerca.turnos?.map(turno => (
                    <Badge key={turno} variant="outline" className="bg-blue-50">
                      {turno === 'matutino' ? 'Matutino' : 
                       turno === 'vespertino' ? 'Vespertino' : 
                       turno === 'nocturno' ? 'Nocturno' : 
                       turno === 'administrativo' ? 'Administrativo' : turno}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};