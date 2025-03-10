export interface DataEntry {
  value: number;
  color: string;
  name: string;
  details?: string;
}

export interface NovedadesTiempoEntry {
  name: string;
  value: number;
  color: string;
  details: string;
}

export interface NovedadCard {
  id: string;
  count: number;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  borderColor: string;
  tooltip?: string;
}

export interface StatisticsPanelsProps {
  estadoDelDiaData: { name: string; value: number; color: string; details?: string }[];
  tiemposData: { name: string; value: number; color: string; details?: string }[];
  novedadesTiempoData?: { name: string; value: number; color: string; details?: string }[];
  novedadesCards?: NovedadCard[];
  
  // Nuevas propiedades para manejar el filtro
  activeKpiFilter?: string | null;
  onKpiFilterChange?: (kpiId: string) => void;
}