export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Geocerca {
  id: string;
  nombre: string;
  sede: string;
  radio: number;
  direccion: string;
  estado: "Activa" | "Inactiva";
  empleadosAsignados: number;
  fechaCreacion: string;
  coordenadas: Coordenadas;
  perfilesMarcaje?: string[];
  turnos?: string[];
}