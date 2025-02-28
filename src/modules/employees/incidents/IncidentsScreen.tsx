import React, { useState, useEffect } from 'react';
import { Employee, Marcaje, MarcajeFormData } from './interface/types';
import { employees as mockEmployees, marcajes as mockMarcajes, dispositivos } from './data';
import EmployeeDetailHeader from './components/EmployeeDetailHeader';
// import IncidenciasList from './components/IncidenciasList';
import TimelineViewer from './components/TimelineViewer';
// import IncidenciaActions from './components/IncidenciaActions';
import AddMarkModal from './components/AddMarkModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Pagination from './components/Pagination';

// Función para generar un ID único
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const IncidenciasScreen: React.FC = () => {
  // Vista actual - inicialmente lista de empleados, luego detalle de incidencias
  const [view, setView] = useState<'list' | 'detail'>('list');
  
  // Estados para lista de empleados
  const [employees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Estados para vista detallada
  const [marcajes, setMarcajes] = useState<Marcaje[]>(mockMarcajes);
  const [filteredMarcajes, setFilteredMarcajes] = useState<Marcaje[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('14-02-2025');
  const [selectedMarcaje, setSelectedMarcaje] = useState<Marcaje | null>(null);
  
  // Estados para modales
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Filtrar marcajes por empleado y fecha
  useEffect(() => {
    if (selectedEmployee) {
      const filtered = marcajes.filter(
        m => m.empleadoId === selectedEmployee.id && m.fecha === selectedDate
      );
      setFilteredMarcajes(filtered);
      
      // Si hay marcajes filtrados, seleccionar automáticamente el más reciente para mostrar sus datos
      if (filtered.length > 0 && !selectedMarcaje) {
        // Ordenar por hora para encontrar el más reciente
        const sortedMarcajes = [...filtered].sort((a, b) => {
          // Convertir a formato 24h para comparar correctamente
          const getHour24 = (timeStr: string) => {
            const [time, ampm] = timeStr.split(' ');
            // eslint-disable-next-line prefer-const
            let [hours, minutes] = time.split(':').map(Number);
            if (ampm === 'PM' && hours < 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0;
            return hours * 60 + minutes;
          };
          
          return getHour24(b.hora) - getHour24(a.hora);
        });
        
        setSelectedMarcaje(sortedMarcajes[0]);
      }
    } else {
      setFilteredMarcajes([]);
    }
  }, [selectedEmployee, marcajes, selectedDate, selectedMarcaje]);

  // Manejar selección de empleado
  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setSelectedMarcaje(null); // Resetear selección de marcaje al cambiar de empleado
    setView('detail');
  };

  // Manejar click en volver a la lista
  const handleBackToList = () => {
    setView('list');
    setSelectedEmployee(null);
    setSelectedMarcaje(null);
  };

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Manejar agregar marcaje
  const handleAddMarcaje = (data: MarcajeFormData) => {
    if (selectedEmployee) {
      const newMarcaje: Marcaje = {
        id: generateId(),
        fecha: data.fecha.split('-').reverse().join('-'), // Convertir a formato DD-MM-YYYY
        hora: data.hora,
        empleadoId: selectedEmployee.id,
        dispositivo: dispositivos.find(d => d.id === data.dispositivo)?.nombre || data.dispositivo,
        tipoVerificacion: data.tipoVerificacion,
        tipoMarcaje: data.tipoMarcaje,
        esManual: true,
        observaciones: data.observaciones,
        usuarioRegistro: 'Usuario Actual',
        timestampRegistro: new Date().toISOString()
      };
      
      setMarcajes([...marcajes, newMarcaje]);
      setSelectedMarcaje(newMarcaje); // Seleccionar automáticamente el nuevo marcaje
      setAddModalOpen(false);
    }
  };

  // Manejar eliminar marcaje
  const handleDeleteMarcaje = (id: string) => {
    // Verificar si estamos eliminando el marcaje seleccionado
    const isSelectedMarcaje = selectedMarcaje?.id === id;
    
    // Primero filtrar los marcajes
    const updatedMarcajes = marcajes.filter(m => m.id !== id);
    setMarcajes(updatedMarcajes);
    
    // Si eliminamos el marcaje seleccionado, seleccionamos otro si existe
    if (isSelectedMarcaje && selectedEmployee) {
      const remainingFiltered = updatedMarcajes.filter(
        m => m.empleadoId === selectedEmployee.id && m.fecha === selectedDate
      );
      
      if (remainingFiltered.length > 0) {
        setSelectedMarcaje(remainingFiltered[0]);
      } else {
        setSelectedMarcaje(null);
      }
    }
    
    setDeleteModalOpen(false);
  };

  // Manejar clic en marcador de la línea de tiempo
  const handleMarkerClick = (marcaje: Marcaje) => {
    setSelectedMarcaje(marcaje);
  };

  // Manejar selección de un marcaje de la lista
  const handleSelectMarcaje = (marcaje: Marcaje) => {
    setSelectedMarcaje(marcaje);
  };

  // Filtrar empleados por término de búsqueda
  const filteredEmployees = employees.filter(employee =>
    employee.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular empleados paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Renderizado condicional basado en la vista actual
  if (view === 'list') {
    return (
      <div className="flex-1 flex flex-col">
        {/* Filtro de búsqueda */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, cargo o departamento"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla de empleados */}
        <div className="overflow-auto flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empleado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sede
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incidencias
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedEmployees.map((employee) => {
                // Contar incidencias para este empleado (simulado)
                const incidenciasCount = Math.floor(Math.random() * 3) + 1;
                
                return (
                  <tr 
                    key={employee.id}
                    onClick={() => handleSelectEmployee(employee)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.nombre} {employee.apellidos}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-800 font-medium">
                        {incidenciasCount}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredEmployees.length)}</span> de <span className="font-medium">{filteredEmployees.length}</span> empleados
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
  }
  
  // Vista detallada de incidencias para un empleado específico
  return (
    <div className="flex-1 overflow-hidden flex flex-col h-screen bg-gray-100">
      {/* Botón de volver */}
      <div className="p-2 bg-white shadow-sm">
        <button 
          onClick={handleBackToList}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al listado
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {selectedEmployee && (
          <>
            {/* Información detallada del empleado */}
            <EmployeeDetailHeader employee={selectedEmployee} />
            
            {/* Fechas de incidencias */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Fechas de incidencias</h3>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Fecha:
                  </label>
                  <input
                    type="text"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Hora:
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm">
                    {selectedMarcaje?.hora || "---"}
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Dispositivo:
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm">
                    {selectedMarcaje?.dispositivo || "---"}
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label className="block text-xs text-gray-500 mb-1">
                    Tipo De Verificación:
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm">
                    {selectedMarcaje?.tipoVerificacion || "---"}
                  </div>
                </div>
              </div>
              
              {/* Visor de línea de tiempo */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Marcajes</h3>
                  {/* <button 
                    onClick={() => setAddModalOpen(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Agregar marcajeee
                  </button> */}
                </div>
                <TimelineViewer 
                  marcajes={filteredMarcajes}
                  onAddMarcaje={() => setAddModalOpen(true)}
                  onMarkerClick={handleMarkerClick}
                  selectedMarcajeId={selectedMarcaje?.id}
                />
              </div>
              
              {/* Botones de acción */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center text-sm"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar marcaje
                </button>
                
                <button
                  onClick={() => selectedMarcaje && setDeleteModalOpen(true)}
                  disabled={!selectedMarcaje}
                  className={`px-4 py-2 rounded-md inline-flex items-center text-sm ${
                    selectedMarcaje
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-200 text-red-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar marcaje
                </button>
              </div>
            </div>
            
            {/* Lista de marcajes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
              <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-medium text-gray-700">Marcajes registrados</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispositivo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verificación</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMarcajes.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No hay marcajes registrados para este empleado en la fecha seleccionada.
                        </td>
                      </tr>
                    ) : (
                      filteredMarcajes.map(marcaje => (
                        <tr 
                          key={marcaje.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${selectedMarcaje?.id === marcaje.id ? 'bg-blue-50' : ''}`}
                          onClick={() => handleSelectMarcaje(marcaje)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.fecha}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.hora}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.dispositivo}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              marcaje.tipoMarcaje === 'Entrada' 
                                ? 'bg-green-100 text-green-800' 
                                : marcaje.tipoMarcaje === 'Salida'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                            }`}>
                              {marcaje.tipoMarcaje}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{marcaje.tipoVerificacion}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMarcaje(marcaje);
                                setDeleteModalOpen(true);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Modales */}
      {selectedEmployee && (
        <>
          <AddMarkModal 
            isOpen={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onSubmit={handleAddMarcaje}
            empleadoNombre={`${selectedEmployee.nombre} ${selectedEmployee.apellidos}`}
            dispositivos={dispositivos}
          />
          
          <DeleteConfirmModal 
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={() => selectedMarcaje && handleDeleteMarcaje(selectedMarcaje.id)}
            itemName={selectedMarcaje 
              ? `${selectedMarcaje.fecha} - ${selectedMarcaje.hora} (${selectedMarcaje.tipoMarcaje})`
              : ''}
          />
        </>
      )}
    </div>
  );
};

export default IncidenciasScreen;