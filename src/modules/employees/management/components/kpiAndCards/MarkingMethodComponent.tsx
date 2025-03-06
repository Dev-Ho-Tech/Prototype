import React from 'react';

interface MarkingMethodData {
  icon: React.ReactNode;
  count: number;
  label: string;
  percentage: number;
}

interface MarkingMethodProps {
  methods: MarkingMethodData[];
  title: string;
}

export function MarkingMethodComponent({ methods, title }: MarkingMethodProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      
      {/* Renderiza cada método de marcaje */}
      {methods.map((method, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="text-blue-500">
                {method.icon}
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{method.count}</p>
                <p className="text-sm text-gray-500">{method.label}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">{method.percentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${method.percentage}%` }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
}