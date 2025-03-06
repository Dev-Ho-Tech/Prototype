import { Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KpiCard } from './KpiCard';

export function StatsSection() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-3">
      {/* Active Employees */}
      <KpiCard 
        title="Empleados activos"
        value="388"
        icon={<Users className="w-8 h-8" />}
        trend={{
          value: "+2.5%",
          isPositive: true
        }}
        iconColor="text-blue-400"
      />

      {/* Inactive Employees */}
      <KpiCard 
        title="Empleados inactivos"
        value="52"
        icon={<Users className="w-8 h-8" />}
        trend={{
          value: "-1.2%",
          isPositive: false
        }}
        iconColor="text-gray-400"
      />

      {/* Recent Additions */}
      <KpiCard 
        title="Ingresos recientes"
        value="6"
        icon={<ArrowUpRight className="w-8 h-8" />}
        suffix="últimos 30 días"
        iconColor="text-green-400"
      />

      {/* Recent Exits */}
      <KpiCard 
        title="Egresos recientes"
        value="4"
        icon={<ArrowDownRight className="w-8 h-8" />}
        suffix="últimos 30 días"
        iconColor="text-red-400"
      />
    </div>
  );
}