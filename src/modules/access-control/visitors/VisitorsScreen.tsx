import React, { useState } from 'react';
import { visitorsData } from './temp/visitors';
import { Visitor } from './interfaces/types';

// Componentes
import VisitorsHeader from './components/VisitorsHeader';
import VisitorsStats from './components/VisitorsStats';
import VisitorList from './components/VisitorList';
import VisitorForm from './components/VisitorForm';

const VisitorsScreen: React.FC = () => {
  // Estados
  const [visitors, setVisitors] = useState<Visitor[]>(visitorsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [showForm, setShowForm] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  // Contadores para los StatusTabs
  const counts = {
    active: visitors.filter(v => v.status === 'active').length,
    inactive: visitors.filter(v => v.status === 'pending').length,
    total: visitors.length
  };

  // Estadísticas
  const stats = {
    current: visitors.filter(v => v.status === 'active').length,
    scheduled: visitors.filter(v => v.status === 'pending').length,
    avgDuration: '45m',
    pending: visitors.filter(v => v.status === 'pending').length
  };

  // Manejadores
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleNewVisitor = () => {
    setSelectedVisitor(null);
    setShowForm(true);
  };

  const handleEditVisitor = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    setShowForm(true);
  };

  const handleFinishVisit = (id: string) => {
    setVisitors(prev => 
      prev.map(visitor => 
        visitor.id === id 
          ? { ...visitor, status: 'completed' as const } 
          : visitor
      )
    );
  };

  const handleSaveVisitor = (visitor: Visitor) => {
    if (selectedVisitor) {
      // Actualizar visitante existente
      setVisitors(prev => 
        prev.map(v => v.id === visitor.id ? visitor : v)
      );
    } else {
      // Crear nuevo visitante
      setVisitors(prev => [...prev, visitor]);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        {/* Cabecera y búsqueda */}
        <VisitorsHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          onNewClick={handleNewVisitor}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          counts={counts}
        />

        {/* Estadísticas */}
        <VisitorsStats
          current={stats.current}
          scheduled={stats.scheduled}
          avgDuration={stats.avgDuration}
          pending={stats.pending}
        />

        {/* Lista de visitantes */}
        <VisitorList
          visitors={visitors}
          onEdit={handleEditVisitor}
          onFinish={handleFinishVisit}
          searchTerm={searchTerm}
          selectedStatus={selectedStatus}
          viewMode={viewMode}
        />
      </div>

      {/* Formulario modal */}
      {showForm && (
        <VisitorForm
          visitor={selectedVisitor}
          onClose={() => {
            setShowForm(false);
            setSelectedVisitor(null);
          }}
          onSave={handleSaveVisitor}
        />
      )}
    </div>
  );
};

export default VisitorsScreen;