import { Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KpiCard } from './KpiCard';

export interface StatsProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
  stats: {
    active: number;
    inactive: number;
    recentAdditions: number;
    recentExits: number;
  };
}

export function StatsSection({ activeFilter, onFilterChange, stats }: StatsProps) {
  const handleCardClick = (filterKey: string) => {
    // Si ya está seleccionado, quitamos el filtro
    if (activeFilter === filterKey) {
      onFilterChange(null);
    } else {
      onFilterChange(filterKey);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 mb-3">
      {/* Active Employees */}
      <KpiCard 
        title="Empleados activos"
        value={stats.active}
        icon={<Users className="w-8 h-8" />}
        trend={{
          value: "+2.5%",
          isPositive: true
        }}
        iconColor="text-blue-400"
        filterKey="active"
        isActive={activeFilter === "active"}
        onClick={handleCardClick}
      />

      {/* Inactive Employees */}
      <KpiCard 
        title="Empleados inactivos"
        value={stats.inactive}
        icon={<Users className="w-8 h-8" />}
        trend={{
          value: "-1.2%",
          isPositive: false
        }}
        iconColor="text-gray-400"
        filterKey="inactive"
        isActive={activeFilter === "inactive"}
        onClick={handleCardClick}
      />

      {/* Recent Additions */}
      <KpiCard 
        title="Ingresos recientes"
        value={stats.recentAdditions}
        icon={<ArrowUpRight className="w-8 h-8" />}
        suffix="últimos 30 días"
        iconColor="text-green-400"
        filterKey="recent-additions"
        isActive={activeFilter === "recent-additions"}
        onClick={handleCardClick}
      />

      {/* Recent Exits */}
      <KpiCard 
        title="Egresos recientes"
        value={stats.recentExits}
        icon={<ArrowDownRight className="w-8 h-8" />}
        suffix="últimos 30 días"
        iconColor="text-red-400"
        filterKey="recent-exits"
        isActive={activeFilter === "recent-exits"}
        onClick={handleCardClick}
      />
    </div>
  );
}