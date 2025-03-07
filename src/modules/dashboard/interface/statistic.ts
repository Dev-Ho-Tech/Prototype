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
  tooltip?: string; // Tooltip adicional para mostrar información extra
}

export interface StatisticsPanelsProps {
  estadoDelDiaData: DataEntry[];
  tiemposData: DataEntry[];
  novedadesTiempoData?: NovedadesTiempoEntry[];
  novedadesCards?: NovedadCard[];
}