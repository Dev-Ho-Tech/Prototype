/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Comedor, 
  HorarioComida, 
  EstacionComida, 
  PerfilComida 
} from './interfaces/types';
import { 
  comedores as initialComedores, 
  horariosComida as initialHorarios,
  estacionesComida as initialEstaciones,
  perfilesComida as initialPerfiles,
} from './temp/comedor';
import ComedorForm from './components/ComedorForm';
import HorarioComidaForm from './components/HorarioComidaForm';
import EstacionComidaForm from './components/EstacionComidaForm';
import PerfilComidaForm from './components/PerfilComidaForm';
import ComedorList from './components/ComedorList';
import HorarioComidaList from './components/HorarioComidaList';
import EstacionComidaList from './components/EstacionComidaList';
import PerfilComidaList from './components/PerfilComidaList';
import ComedoresHeader from './components/ComedoresHeader';

const ComedorScreen: React.FC = () => {
  // Estados para los datos
  const [comedores, setComedores] = useState<Comedor[]>(initialComedores);
  const [horarios, setHorarios] = useState<HorarioComida[]>(initialHorarios);
  const [estaciones, setEstaciones] = useState<EstacionComida[]>(initialEstaciones);
  const [perfiles, setPerfiles] = useState<PerfilComida[]>(initialPerfiles);
  
  // Estados para la interfaz
  const [activeTab, setActiveTab] = useState('comedores');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Estados para filtrado por estado
  const [comedoresStatus, setComedoresStatus] = useState('todas');
  const [horariosStatus, setHorariosStatus] = useState('todas');
  const [estacionesStatus, setEstacionesStatus] = useState('todas');
  const [perfilesStatus, setPerfilesStatus] = useState('todas');
  
  // Estado para confirmación de eliminación
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<string>('');

  // Contadores para los StatusTabs
  const comedoresCounts = {
    active: comedores.filter(comedor => comedor.estado === 'activo').length,
    inactive: comedores.filter(comedor => comedor.estado === 'inactivo').length,
    total: comedores.length
  };
  
  const horariosCounts = {
    active: horarios.filter(horario => horario.estado === 'activo').length,
    inactive: horarios.filter(horario => horario.estado === 'inactivo').length,
    total: horarios.length
  };
  
  const estacionesCounts = {
    active: estaciones.filter(estacion => estacion.estado === 'activo').length,
    inactive: estaciones.filter(estacion => estacion.estado === 'inactivo').length,
    total: estaciones.length
  };
  
  const perfilesCounts = {
    active: perfiles.filter(perfil => perfil.estado === 'activo').length,
    inactive: perfiles.filter(perfil => perfil.estado === 'inactivo').length,
    total: perfiles.length
  };

  // Búsqueda y filtrado combinado (búsqueda + estado)
  const filteredComedores = comedores.filter(comedor => {
    const matchesSearch = 
      comedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comedor.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (comedoresStatus === 'todas') return matchesSearch;
    return matchesSearch && comedor.estado === comedoresStatus;
  });
  
  const filteredHorarios = horarios.filter(horario => {
    const matchesSearch = 
      horario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comedores.find(c => c.id === horario.comedorId)?.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (horariosStatus === 'todas') return matchesSearch;
    return matchesSearch && horario.estado === horariosStatus;
  });
  
  const filteredEstaciones = estaciones.filter(estacion => {
    const matchesSearch =
      estacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comedores.find(c => c.id === estacion.comedorId)?.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (estacionesStatus === 'todas') return matchesSearch;
    return matchesSearch && estacion.estado === estacionesStatus;
  });
  
  const filteredPerfiles = perfiles.filter(perfil => {
    const matchesSearch =
      perfil.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perfil.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (perfilesStatus === 'todas') return matchesSearch;
    return matchesSearch && perfil.estado === perfilesStatus;
  });

  // Manejadores para el CRUD de Comedores
  const handleSaveComedor = (comedor: Comedor) => {
    if (editingItem) {
      // Actualizar comedor existente
      setComedores(prevComedores => 
        prevComedores.map(c => c.id === comedor.id ? comedor : c)
      );
    } else {
      // Crear nuevo comedor
      setComedores(prevComedores => [...prevComedores, comedor]);
    }
    setShowForm(false);
    setEditingItem(null);
  };
  
  const handleEditComedor = (comedor: Comedor) => {
    setEditingItem(comedor);
    setShowForm(true);
  };
  
  const handleDeleteComedor = (id: string) => {
    setItemToDelete(id);
    setDeleteType('comedor');
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteComedor = () => {
    if (itemToDelete) {
      setComedores(prevComedores => 
        prevComedores.filter(comedor => comedor.id !== itemToDelete)
      );
      
      // También eliminar horarios y estaciones asociados
      setHorarios(prevHorarios => 
        prevHorarios.filter(horario => horario.comedorId !== itemToDelete)
      );
      
      setEstaciones(prevEstaciones => 
        prevEstaciones.filter(estacion => estacion.comedorId !== itemToDelete)
      );
      
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  // Manejadores para el CRUD de Horarios
  const handleSaveHorario = (horario: HorarioComida) => {
    if (editingItem) {
      // Actualizar horario existente
      setHorarios(prevHorarios => 
        prevHorarios.map(h => h.id === horario.id ? horario : h)
      );
    } else {
      // Crear nuevo horario
      setHorarios(prevHorarios => [...prevHorarios, horario]);
    }
    setShowForm(false);
    setEditingItem(null);
  };
  
  const handleEditHorario = (horario: HorarioComida) => {
    setEditingItem(horario);
    setShowForm(true);
  };
  
  const handleDeleteHorario = (id: string) => {
    setItemToDelete(id);
    setDeleteType('horario');
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteHorario = () => {
    if (itemToDelete) {
      setHorarios(prevHorarios => 
        prevHorarios.filter(horario => horario.id !== itemToDelete)
      );
      
      // Actualizar perfiles que usan este horario
      setPerfiles(prevPerfiles => 
        prevPerfiles.map(perfil => ({
          ...perfil,
          horarioIds: perfil.horarioIds.filter(hid => hid !== itemToDelete)
        }))
      );
      
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  // Manejadores para el CRUD de Estaciones
  const handleSaveEstacion = (estacion: EstacionComida) => {
    if (editingItem) {
      // Actualizar estación existente
      setEstaciones(prevEstaciones => 
        prevEstaciones.map(e => e.id === estacion.id ? estacion : e)
      );
    } else {
      // Crear nueva estación
      setEstaciones(prevEstaciones => [...prevEstaciones, estacion]);
    }
    setShowForm(false);
    setEditingItem(null);
  };
  
  const handleEditEstacion = (estacion: EstacionComida) => {
    setEditingItem(estacion);
    setShowForm(true);
  };
  
  const handleDeleteEstacion = (id: string) => {
    setItemToDelete(id);
    setDeleteType('estacion');
    setShowDeleteConfirm(true);
  };
  
  const confirmDeleteEstacion = () => {
    if (itemToDelete) {
      setEstaciones(prevEstaciones => 
        prevEstaciones.filter(estacion => estacion.id !== itemToDelete)
      );
      
      // Actualizar perfiles que usan esta estación
      setPerfiles(prevPerfiles => 
        prevPerfiles.map(perfil => ({
          ...perfil,
          estacionIds: perfil.estacionIds.filter(eid => eid !== itemToDelete)
        }))
      );
      
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  // Manejadores para el CRUD de Perfiles
  const handleSavePerfil = (perfil: PerfilComida) => {
    if (editingItem) {
      // Actualizar perfil existente
      setPerfiles(prevPerfiles => 
        prevPerfiles.map(p => p.id === perfil.id ? perfil : p)
      );
    } else {
      // Crear nuevo perfil
      setPerfiles(prevPerfiles => [...prevPerfiles, perfil]);
    }
    setShowForm(false);
    setEditingItem(null);
  };
  
  const handleEditPerfil = (perfil: PerfilComida) => {
    setEditingItem(perfil);
    setShowForm(true);
  };
  
  const handleDeletePerfil = (id: string) => {
    setItemToDelete(id);
    setDeleteType('perfil');
    setShowDeleteConfirm(true);
  };
  
  const confirmDeletePerfil = () => {
    if (itemToDelete) {
      setPerfiles(prevPerfiles => 
        prevPerfiles.filter(perfil => perfil.id !== itemToDelete)
      );
      
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  // Manejador para todos los tipos de eliminación
  const handleConfirmDelete = () => {
    switch (deleteType) {
      case 'comedor':
        confirmDeleteComedor();
        break;
      case 'horario':
        confirmDeleteHorario();
        break;
      case 'estacion':
        confirmDeleteEstacion();
        break;
      case 'perfil':
        confirmDeletePerfil();
        break;
    }
  };

  // Función para mostrar el título del formulario según el tab activo
  const getFormTitle = (): string => {
    switch (activeTab) {
      case 'comedores': return 'Comedor';
      case 'horarios': return 'Horario de Comida';
      case 'estaciones': return 'Estación de Comida';
      case 'perfiles': return 'Perfil de Comida';
      default: return '';
    }
  };

  // Función para obtener el estado y contador activos según la pestaña
  const getActiveStatusProps = () => {
    switch (activeTab) {
      case 'comedores':
        return {
          currentStatus: comedoresStatus,
          onStatusChange: setComedoresStatus,
          counts: comedoresCounts
        };
      case 'horarios':
        return {
          currentStatus: horariosStatus,
          onStatusChange: setHorariosStatus,
          counts: horariosCounts
        };
      case 'estaciones':
        return {
          currentStatus: estacionesStatus,
          onStatusChange: setEstacionesStatus,
          counts: estacionesCounts
        };
      case 'perfiles':
        return {
          currentStatus: perfilesStatus,
          onStatusChange: setPerfilesStatus,
          counts: perfilesCounts
        };
      default:
        return {
          currentStatus: 'todas',
          onStatusChange: () => {},
          counts: { active: 0, inactive: 0, total: 0 }
        };
    }
  };

  const statusProps = getActiveStatusProps();

  return (
    <div className="container mx-auto p-4">
      {/* Cabecera Mejorada con StatusTabs */}
      <ComedoresHeader 
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onNewClick={() => {
          setEditingItem(null);
          setShowForm(true);
        }}
        title={getFormTitle()}
        currentStatus={statusProps.currentStatus}
        onStatusChange={statusProps.onStatusChange}
        counts={statusProps.counts}
      />
          
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-1">
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'comedores' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => {
                setActiveTab('comedores');
                setShowForm(false);
                setEditingItem(null);
              }}
            >
              Comedores
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'horarios' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => {
                setActiveTab('horarios');
                setShowForm(false);
                setEditingItem(null);
              }}
            >
              Horarios
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'estaciones' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => {
                setActiveTab('estaciones');
                setShowForm(false);
                setEditingItem(null);
              }}
            >
              Estaciones
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'perfiles' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => {
                setActiveTab('perfiles');
                setShowForm(false);
                setEditingItem(null);
              }}
            >
              Perfiles
            </button>
          </div>
        
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'comedores' && (
            showForm ? (
              <ComedorForm
                comedor={editingItem}
                onSave={handleSaveComedor}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            ) : (
              <ComedorList 
                comedores={filteredComedores}
                onEdit={handleEditComedor}
                onDelete={handleDeleteComedor}
              />
            )
          )}
          
          {activeTab === 'horarios' && (
            showForm ? (
              <HorarioComidaForm
                horario={editingItem}
                comedores={comedores}
                onSave={handleSaveHorario}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            ) : (
              <HorarioComidaList 
                horarios={filteredHorarios}
                comedores={comedores}
                onEdit={handleEditHorario}
                onDelete={handleDeleteHorario}
              />
            )
          )}
          
          {activeTab === 'estaciones' && (
            showForm ? (
              <EstacionComidaForm
                estacion={editingItem}
                comedores={comedores}
                onSave={handleSaveEstacion}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            ) : (
              <EstacionComidaList 
                estaciones={filteredEstaciones}
                comedores={comedores}
                onEdit={handleEditEstacion}
                onDelete={handleDeleteEstacion}
              />
            )
          )}
          
          {activeTab === 'perfiles' && (
            showForm ? (
              <PerfilComidaForm
                perfil={editingItem}
                horarios={horarios}
                estaciones={estaciones}
                onSave={handleSavePerfil}
                onCancel={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              />
            ) : (
              <PerfilComidaList 
                perfiles={filteredPerfiles}
                horarios={horarios}
                estaciones={estaciones}
                onEdit={handleEditPerfil}
                onDelete={handleDeletePerfil}
              />
            )
          )}
        </div>

      </div>
      
      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmar eliminación</h3>
            <p className="text-gray-500 mb-6">
              ¿Está seguro de que desea eliminar este {deleteType}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComedorScreen;