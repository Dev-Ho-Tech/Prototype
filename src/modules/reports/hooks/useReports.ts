import { useState, useEffect } from 'react';
import { 
  ReportFilter, 
  DateRange, 
  HotelHoursData,
  AttendanceData,
  BiometricData
} from '../interfaces/Report';
import { EmployeeList } from '../interfaces/Employee';
import { 
  mockEmployees, 
} from '../temp/employees';
import { 
  mockReportCategories 
} from '../temp/reportCategories';
import { 
  mockHotelHoursData, 
  mockAttendanceData, 
  mockBiometricData 
} from '../temp/reports';

// Establece un rango de fechas predeterminado (últimos 30 días)
const getDefaultDateRange = (): DateRange => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);
  
  return { startDate, endDate };
};

interface UseReportsProps {
  reportType?: string;
}

interface UseReportsReturn {
  employees: EmployeeList;
  filter: ReportFilter;
  reportCategories: typeof mockReportCategories;
  hotelHoursData: HotelHoursData[];
  attendanceData: AttendanceData[];
  biometricData: BiometricData[];
  filteredHotelHoursData: HotelHoursData[];
  filteredAttendanceData: AttendanceData[];
  filteredBiometricData: BiometricData[];
  updateFilter: (newFilter: ReportFilter) => void;
  exportReport: (format: 'pdf' | 'excel' | 'csv' | 'xml') => void;
}

export const useReports = ({ reportType }: UseReportsProps = {}): UseReportsReturn => {
  const [filter, setFilter] = useState<ReportFilter>({
    dateRange: getDefaultDateRange(),
    employees: []
  });

  const [filteredHotelHoursData, setFilteredHotelHoursData] = useState<HotelHoursData[]>([]);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState<AttendanceData[]>([]);
  const [filteredBiometricData, setFilteredBiometricData] = useState<BiometricData[]>([]);

  // Aplicar filtros cada vez que cambien
  useEffect(() => {
    // Filtro por fecha
    const filterByDate = <T extends { date: Date, employeeId: string }>(data: T[]): T[] => {
      return data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= filter.dateRange.startDate && 
               itemDate <= filter.dateRange.endDate &&
               (filter.employees && filter.employees.length > 0 
                 ? filter.employees.includes(item.employeeId) 
                 : true);
      });
    };

    setFilteredHotelHoursData(filterByDate(mockHotelHoursData));
    setFilteredAttendanceData(filterByDate(mockAttendanceData));
    setFilteredBiometricData(filterByDate(mockBiometricData));
  }, [filter]);

  const updateFilter = (newFilter: ReportFilter) => {
    setFilter(newFilter);
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv' | 'xml') => {
    // Aquí iría la lógica para exportar el reporte
    console.log(`Exportando reporte en formato ${format}`);
    
    // En una implementación real, esto podría llamar a una API o usar una biblioteca para generar 
    // el archivo en el formato correcto
    alert(`Exportando reporte como ${format.toUpperCase()}`);
  };

  return {
    employees: mockEmployees,
    filter,
    reportCategories: mockReportCategories,
    hotelHoursData: mockHotelHoursData,
    attendanceData: mockAttendanceData,
    biometricData: mockBiometricData,
    filteredHotelHoursData,
    filteredAttendanceData,
    filteredBiometricData,
    updateFilter,
    exportReport
  };
};