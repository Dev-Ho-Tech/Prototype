export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
  details?: string;
  additionalInfo?: string;
  percentage?: number;
}

export interface ChartPosition {
  x: number;
  y: number;
}

export interface PieChartSegmentProps {
  data: ChartDataItem;
  index: number;
  total: number;
  startAngle: number;
  size: number;
  selected: ChartDataItem | null;
  onSegmentClick: (data: ChartDataItem, position: ChartPosition) => void;
}

export interface InteractivePieChartProps {
  data: ChartDataItem[];
  centerLabel: string;
  sectionId: string;
  onSegmentClick: (data: ChartDataItem, position: ChartPosition) => void;
  selectedSegment: ChartDataItem | null;
  size?: number;
}

export interface ChartTooltipProps {
  data: ChartDataItem | null;
  position: ChartPosition;
  onClose: () => void;
  visible: boolean;
}

export interface ChartCardProps {
  title: string;
  chartData: ChartDataItem[];
  centerLabel: string;
  id: string;
  onChartClick: (data: ChartDataItem, position: ChartPosition) => void;
  selectedItem: ChartDataItem | null;
}