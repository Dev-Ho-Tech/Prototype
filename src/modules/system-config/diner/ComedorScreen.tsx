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
import { Plus, Search} from 'lucide-react';

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
  
  // Estado para confirmación de eliminación
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<string>('');

  // Búsqueda y filtrado
  const filteredComedores = comedores.filter(comedor => 
    comedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comedor.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredHorarios = horarios.filter(horario => 
    horario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comedores.find(c => c.id === horario.comedorId)?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredEstaciones = estaciones.filter(estacion => 
    estacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comedores.find(c => c.id === estacion.comedorId)?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPerfiles = perfiles.filter(perfil => 
    perfil.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perfil.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Administración de Comedores</h1>
      
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
          
          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button 
              onClick={() => {
                setEditingItem(null);
                setShowForm(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-1" />
              Nuevo {getFormTitle()}
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