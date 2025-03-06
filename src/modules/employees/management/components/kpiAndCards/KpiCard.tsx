import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  suffix?: string;
  iconColor?: string;
}

export function KpiCard({ title, value, icon, trend, suffix, iconColor = 'text-blue-400' }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-center mt-1">
            <p className={`text-2xl font-semibold ${trend?.isPositive ? 'text-gray-900' : trend ? 'text-gray-900' : 'text-gray-900'}`}>
              {value}
            </p>
            {trend && (
              <div className={`flex items-center ml-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span>{trend.value}</span>
              </div>
            )}
            {suffix && <span className="ml-2 text-sm text-gray-500">{suffix}</span>}
          </div>
        </div>
        <div className={iconColor}>
          {icon}
        </div>
      </div>
    </div>
  );
}