import React from 'react';
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ChartData } from '../../types';

interface CustomPieChartProps {
  data: ChartData[];
  title: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg rounded-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].name}</p>
        <div className="flex items-baseline space-x-1">
          <p className="text-base font-semibold text-gray-800">{payload[0].value}</p>
          <span className="text-xs text-gray-500">unidades</span>
        </div>
      </div>
    );
  }
  return null;
};

export function CustomPieChart({ data, title }: CustomPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-current text-gray-600 font-medium"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    style={{
                      fontSize: '14px',
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    }}
                  >
                    {value}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              wrapperStyle={{ outline: 'none' }}
            />
          </RechartsChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white/50 backdrop-blur-[2px] rounded-full w-24 h-24 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-gray-800" style={{ 
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontSize: '24px'
            }}>
              {total}
            </span>
            <span className="text-xs text-gray-500 mt-1">Total</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="font-medium text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}