import React from 'react';
import { Button } from './ui/button';
import { List, Grid } from 'lucide-react';

// Tipo de visualización
export type ViewMode = 'table' | 'grid';

interface ViewToggleButtonProps {
  currentView: ViewMode;
  onChange: (view: ViewMode) => void;
  className?: string;
}

const ViewToggleButton: React.FC<ViewToggleButtonProps> = ({
  currentView,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex border rounded-md overflow-hidden ${className}`}>
      <Button
        variant={currentView === 'table' ? 'default' : 'ghost'}
        className={`rounded-none px-3 py-1 h-9 ${currentView === 'table' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800' : 'bg-transparent text-gray-500 hover:bg-gray-100'}`}
        onClick={() => onChange('table')}
      >
        <List className="h-4 w-4 mr-2" />
        Lista
      </Button>
      <Button
        variant={currentView === 'grid' ? 'default' : 'ghost'}
        className={`rounded-none px-3 py-1 h-9 ${currentView === 'grid' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800' : 'bg-transparent text-gray-500 hover:bg-gray-100'}`}
        onClick={() => onChange('grid')}
      >
        <Grid className="h-4 w-4 mr-2" />
        Tarjetas
      </Button>
    </div>
  );
};

export default ViewToggleButton;