import React from 'react';
import { BarChart2, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import type { AccessStats } from '../../../../types';

interface StatsPanelProps {
  stats: AccessStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Estadísticas</h2>
      </div>
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Patrones de uso</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Hora pico</span>
                <span className="text-sm font-medium">{stats.peakHour}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${stats.peakHourPercentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Ocupación</span>
                <span className="text-sm font-medium">{stats.occupancy}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full"
                  style={{ width: `${stats.occupancy}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Puntos críticos</h3>
          <div className="space-y-2">
            {stats.hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{hotspot.location}</span>
                <span className="text-sm font-medium">{hotspot.accessCount} accesos</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Tendencias</h3>
          <div className="space-y-4">
            {stats.trends.map((trend, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">{trend.name}</span>
                  <div className="flex items-center space-x-1">
                    {trend.change > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
                    )}
                    <span className={`text-sm font-medium ${
                      trend.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trend.change > 0 ? '+' : ''}{trend.change}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      trend.change > 0 ? 'bg-green-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${Math.abs(trend.change)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Anomalías</h3>
          <div className="space-y-2">
            {stats.anomalies.map((anomaly, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">{anomaly.title}</p>
                  <p className="text-sm text-red-600">{anomaly.description}</p>
                  <div className="mt-1 flex items-center text-xs text-red-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{anomaly.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}