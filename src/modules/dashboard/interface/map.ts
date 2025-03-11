export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  lat: number;
  lng: number;
  cantidadEmpleados: number;
}

export interface MapViewProps {
  onClose: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}