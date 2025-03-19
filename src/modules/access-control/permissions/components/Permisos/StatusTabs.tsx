import { PermisoEstado } from '../../interfaces/permisos';

interface StatusTabsProps {
  activeTab: PermisoEstado | 'todos';
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
  pendingCount: number;
  onTabChange: (tab: PermisoEstado | 'todos') => void;
}

export function StatusTabs({
  activeTab,
  totalCount,
  activeCount,
  inactiveCount,
  pendingCount,
  onTabChange
}: StatusTabsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="px-4 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => onTabChange('todos')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'todos'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Todos
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {totalCount}
            </span>
          </button>
          <button
            onClick={() => onTabChange('activo')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'activo'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Activos
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {activeCount}
            </span>
          </button>
          <button
            onClick={() => onTabChange('inactivo')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'inactivo'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Inactivos
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {inactiveCount}
            </span>
          </button>
          <button
            onClick={() => onTabChange('pendiente')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pendiente'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pendientes
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {pendingCount}
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}