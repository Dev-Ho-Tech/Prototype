import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface ConfigTabsProps {
  tabs: Tab[];
  currentTab: string;
  onChange: (tab: string) => void;
}

export function ConfigTabs({ tabs, currentTab, onChange }: ConfigTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${currentTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}