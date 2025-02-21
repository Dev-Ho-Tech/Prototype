import React, { useState } from 'react';
import { LogOut, ChevronRight, ChevronLeft, ChevronDown, Menu } from 'lucide-react';
import { useSidebarStore } from '../../store/sidebarStore';
import { menuItems } from '../../config/menuItems';
import type { MenuItem } from '../../types';

interface MenuItemProps {
  item: MenuItem;
  currentView: string;
  setCurrentView: (view: string) => void;
  level?: number;
}

function MenuItemComponent({ item, currentView, setCurrentView, level = 0 }: MenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = currentView === item.path;
  const { isExpanded: isSidebarExpanded, toggleExpanded } = useSidebarStore();

  const handleClick = () => {
    if (!isSidebarExpanded) {
      toggleExpanded();
      return;
    }

    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      setCurrentView(item.path);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={`
          flex items-center w-full px-3 py-2 rounded-lg text-sm
          ${isActive ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-10'}
          transition-all
          ${level > 0 ? 'pl-8' : ''}
        `}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        {isSidebarExpanded && (
          <>
            <span className="ml-3 flex-1 text-left">{item.label}</span>
            {hasChildren && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
              />
            )}
          </>
        )}
      </button>
      {hasChildren && isExpanded && isSidebarExpanded && (
        <div className="mt-1">
          {item.children.map((child) => (
            <MenuItemComponent
              key={child.id}
              item={child}
              currentView={currentView}
              setCurrentView={setCurrentView}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ currentView, setCurrentView, onLogout }: {
  currentView: string;
  setCurrentView: (view: string) => void;
  onLogout: () => void;
}) {
  const { isExpanded, toggleExpanded } = useSidebarStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Reorder menu items to move administration and system config to the end
  const reorderedMenuItems = [...menuItems].sort((a, b) => {
    if (a.id === 'administration' || a.id === 'system-config') return 1;
    if (b.id === 'administration' || b.id === 'system-config') return -1;
    return 0;
  });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`
          ${isExpanded ? 'w-64' : 'w-20'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed inset-y-0 left-0 lg:relative
          bg-gradient-to-b from-blue-600 to-blue-800 text-white
          flex flex-col transition-all duration-300
          z-40
        `}
      >
        <div className="p-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://i.postimg.cc/jdTNsfWq/Logo-Ho-Tech-Blanco.png" 
              alt="Ho-Tech Logo"
              className={`h-[100px] object-contain transition-all duration-300 ${isExpanded ? 'w-full' : 'w-12'}`}
            />
          </div>
          {!isExpanded && (
            <button
              onClick={toggleExpanded}
              className="p-1 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          {isExpanded && (
            <button
              onClick={toggleExpanded}
              className="p-1 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {reorderedMenuItems.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
              currentView={currentView}
              setCurrentView={setCurrentView}
            />
          ))}
          <button
            onClick={onLogout}
            className="w-full mt-4 px-3 py-2 rounded-lg text-sm hover:bg-white hover:bg-opacity-10 transition-all flex items-center"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isExpanded && <span className="ml-3">Cerrar sesión</span>}
          </button>
        </nav>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}