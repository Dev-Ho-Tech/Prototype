import React from 'react';
import { Info, Clock, Calendar, Settings } from 'lucide-react';

interface TabHeaderProps {
  activeTab: number;
  onTabChange: (tabIndex: number) => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 0, name: 'Información Básica', icon: <Info className="w-5 h-5" /> },
    { id: 1, name: 'Horario de Trabajo', icon: <Clock className="w-5 h-5" /> },
    { id: 2, name: 'Configuración de Días', icon: <Calendar className="w-5 h-5" /> },
    { id: 3, name: 'Configuración Adicional', icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <div className="flex flex-wrap gap-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center justify-center flex-1 p-3 ${
            activeTab === tab.id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } rounded-md transition-colors`}
        >
          <div className="flex items-center">
            {tab.icon}
            <span className="ml-2 text-sm">{tab.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
};