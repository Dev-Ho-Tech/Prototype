import React, { useState } from 'react';
import {useLocation, Outlet } from 'react-router-dom';
import { useReports } from './hooks/useReports';
import ReportCategoryList from './components/ReportCategoryList';
import ReportDatePicker from './components/ReportDatePicker';
import ReportTabs from './components/ReportTabs';

// Importamos los datos mock para uso en este componente
import { mockReportCategories } from './temp/reportCategories';

const ReportsModule: React.FC = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const { filter, updateFilter } = useReports();
  const [activeTab, setActiveTab] = useState('most-used'); // 'most-used' | 'all'

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Determinar si estamos en la vista principal o en una vista de reporte específica
  const isReportMainView = location.pathname === '/reports/attendance';

  // Obtenemos las categorías de reportes más utilizadas (simulado)
  const mostUsedCategories = mockReportCategories.slice(0, 6);

  // Función para manejar la navegación cuando se clickea una categoría
  // const handleCategoryClick = (path: string) => {
  //   navigate(`/reports/attendance${path}`);
  // };

  // Si no estamos en la vista principal, mostramos el contenido específico del reporte
  if (!isReportMainView) {
    return <Outlet />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Reportes</h1>
        
        {/* Filtro de fecha */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <ReportDatePicker 
            dateRange={filter.dateRange}
            onChange={(dateRange) => updateFilter({ ...filter, dateRange })}
          />
        </div>
      </div>

      {/* Pestañas */}
      <div className="mb-6">
        <ReportTabs 
          categories={[
            { id: 'most-used', name: 'Más usados', description: 'Reportes más utilizados', icon: 'star', color: 'bg-blue-500', path: '#' },
            { id: 'all', name: 'Todos', description: 'Todos los reportes', icon: 'list', color: 'bg-blue-500', path: '#' }
          ]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>

      {/* Lista de categorías */}
      {activeTab === 'most-used' ? (
        <ReportCategoryList 
          categories={mostUsedCategories.map(cat => ({
            ...cat,
            path: `/reports/attendance${cat.path}` // Ajustamos las rutas para que funcionen con el router
          }))} 
          title="Más usados" 
        />
      ) : (
        <ReportCategoryList 
          categories={mockReportCategories.map(cat => ({
            ...cat,
            path: `/reports/attendance${cat.path}` // Ajustamos las rutas para que funcionen con el router
          }))} 
          title="Todos los reportes" 
        />
      )}
    </div>
  );
};

export default ReportsModule;