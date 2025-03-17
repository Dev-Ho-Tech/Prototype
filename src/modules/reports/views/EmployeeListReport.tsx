import React, { useState, useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import { Search, X, FileText, FileSpreadsheet, User, Phone, Mail, MapPin, Building } from 'lucide-react';

// Simulación de datos adicionales para los empleados
const mockEmployeesInfo = [
  {
    id: '1',
    documentType: 'DNI',
    documentNumber: '12345678',
    email: 'juan.perez@empresa.com',
    phone: '+1234567890',
    address: 'Calle Principal 123',
    city: 'Ciudad Capital',
    birthDate: new Date('1985-05-15'),
    hireDate: new Date('2018-03-10'),
    contractType: 'Indefinido',
    department: 'Ventas',
    section: 'Comercial',
    unit: 'Ventas Corporativas',
    position: 'Gerente de Ventas',
    status: 'active'
  },
  {
    id: '2',
    documentType: 'DNI',
    documentNumber: '23456789',
    email: 'maria.lopez@empresa.com',
    phone: '+1234567891',
    address: 'Avenida Central 456',
    city: 'Ciudad Norte',
    birthDate: new Date('1990-08-22'),
    hireDate: new Date('2019-07-15'),
    contractType: 'Indefinido',
    department: 'Marketing',
    section: 'Digital',
    unit: 'Redes Sociales',
    position: 'Especialista en Marketing Digital',
    status: 'active'
  },
  {
    id: '3',
    documentType: 'Pasaporte',
    documentNumber: 'AB123456',
    email: 'carlos.rodriguez@empresa.com',
    phone: '+1234567892',
    address: 'Plaza Mayor 789',
    city: 'Ciudad Sur',
    birthDate: new Date('1982-12-10'),
    hireDate: new Date('2017-01-05'),
    contractType: 'Temporal',
    department: 'TI',
    section: 'Desarrollo',
    unit: 'Frontend',
    position: 'Desarrollador Senior',
    status: 'active'
  },
  {
    id: '4',
    documentType: 'DNI',
    documentNumber: '34567890',
    email: 'ana.martinez@empresa.com',
    phone: '+1234567893',
    address: 'Calle Secundaria 234',
    city: 'Ciudad Este',
    birthDate: new Date('1988-03-25'),
    hireDate: new Date('2020-02-20'),
    contractType: 'Indefinido',
    department: 'RRHH',
    section: 'Reclutamiento',
    unit: 'Selección',
    position: 'Analista de RRHH',
    status: 'inactive'
  },
  {
    id: '5',
    documentType: 'DNI',
    documentNumber: '45678901',
    email: 'roberto.sanchez@empresa.com',
    phone: '+1234567894',
    address: 'Avenida Principal 567',
    city: 'Ciudad Oeste',
    birthDate: new Date('1975-11-18'),
    hireDate: new Date('2015-08-12'),
    contractType: 'Indefinido',
    department: 'Dirección',
    section: 'Ejecutiva',
    unit: 'Gerencia',
    position: 'Director de Operaciones',
    status: 'active'
  }
];

const EmployeeListReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'employee-list' });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'name' | 'position' | 'department' | 'hireDate'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  // Combinar datos básicos de empleados con información adicional
  const enrichedEmployees = useMemo(() => {
    return employees.map(emp => {
      const additionalInfo = mockEmployeesInfo.find(info => info.id === emp.id);
      return {
        ...emp,
        ...additionalInfo
      };
    });
  }, [employees]);

  // Filtrar empleados según los criterios
  const filteredEmployees = useMemo(() => {
    return enrichedEmployees.filter(emp => {
      // Filtro de búsqueda
      const searchMatch = searchTerm === '' || 
        `${emp.name} ${emp.lastName} ${emp.documentNumber || ''} ${emp.position || ''} ${emp.department || ''}`.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtro de estado
      const statusMatch = statusFilter === 'all' || emp.status === statusFilter;
      
      // Filtro de departamento
      const departmentMatch = departmentFilter === 'all' || emp.department === departmentFilter;
      
      return searchMatch && statusMatch && departmentMatch;
    });
  }, [enrichedEmployees, searchTerm, statusFilter, departmentFilter]);

  // Ordenar empleados
  const sortedEmployees = useMemo(() => {
    return [...filteredEmployees].sort((a, b) => {
      if (sortField === 'name') {
        const nameA = `${a.name} ${a.lastName}`;
        const nameB = `${b.name} ${b.lastName}`;
        return sortDirection === 'asc' 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      } else if (sortField === 'position' && a.position && b.position) {
        return sortDirection === 'asc' 
          ? a.position.localeCompare(b.position) 
          : b.position.localeCompare(a.position);
      } else if (sortField === 'department' && a.department && b.department) {
        return sortDirection === 'asc' 
          ? a.department.localeCompare(b.department) 
          : b.department.localeCompare(a.department);
      } else if (sortField === 'hireDate' && a.hireDate && b.hireDate) {
        return sortDirection === 'asc' 
          ? new Date(a.hireDate).getTime() - new Date(b.hireDate).getTime() 
          : new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime();
      }
      return 0;
    });
  }, [filteredEmployees, sortField, sortDirection]);

  // Obtener departamentos únicos para filtro
  const departments = useMemo(() => {
    const uniqueDepartments = new Set<string>();
    enrichedEmployees.forEach(emp => {
      if (emp.department) {
        uniqueDepartments.add(emp.department);
      }
    });
    return Array.from(uniqueDepartments).sort();
  }, [enrichedEmployees]);

  // Empleado seleccionado
  const selectedEmployee = useMemo(() => {
    if (!selectedEmployeeId) return null;
    return enrichedEmployees.find(emp => emp.id === selectedEmployeeId) || null;
  }, [selectedEmployeeId, enrichedEmployees]);

  // Formatear fecha
  const formatDate = (date: Date | undefined): string => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Manejar cambio de ordenamiento
  const handleSort = (field: 'name' | 'position' | 'department' | 'hireDate') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Manejar exportación
  const handleExportEmployee = (employeeId: string, format: 'excel' | 'pdf') => {
    const employee = enrichedEmployees.find(emp => emp.id === employeeId);
    if (!employee) return;
    
    alert(`Exportando datos de ${employee.name} ${employee.lastName} en formato ${format.toUpperCase()}`);
  };

  return (
    <ReportLayout
      title="Listado de Personas"
      description="Información completa del personal incluyendo datos personales, departamento, sección, unidad y puesto"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['pdf', 'excel', 'csv']}
      onExport={exportReport}
    >
      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar por nombre, documento, posición..."
            className="w-full px-4 py-2 pl-10 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button 
              className="absolute right-3 top-2.5"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-3 py-2 text-sm font-medium rounded-l-md border ${
                statusFilter === 'all'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setStatusFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={`px-3 py-2 text-sm font-medium border-t border-b ${
                statusFilter === 'active'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setStatusFilter('active')}
            >
              Activos
            </button>
            <button
              type="button"
              className={`px-3 py-2 text-sm font-medium rounded-r-md border ${
                statusFilter === 'inactive'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setStatusFilter('inactive')}
            >
              Inactivos
            </button>
          </div>
          
          <select
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="all">Todos los departamentos</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Lista de empleados */}
        <div className={`${selectedEmployee ? 'md:w-2/3' : 'w-full'} overflow-x-auto transition-all duration-300`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Nombre
                    {sortField === 'name' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documento
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center">
                    Departamento
                    {sortField === 'department' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('position')}
                >
                  <div className="flex items-center">
                    Puesto
                    {sortField === 'position' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEmployees.map((employee) => (
                <tr 
                  key={employee.id}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedEmployeeId === employee.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedEmployeeId(selectedEmployeeId === employee.id ? null : employee.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name} {employee.lastName}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.documentType && employee.documentNumber ? (
                      <div>
                        <div className="text-sm text-gray-900">{employee.documentNumber}</div>
                        <div className="text-xs text-gray-500">{employee.documentType}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.department || '—'}</div>
                    {employee.section && (
                      <div className="text-xs text-gray-500">{employee.section}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.position || '—'}</div>
                    {employee.unit && (
                      <div className="text-xs text-gray-500">{employee.unit}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleExportEmployee(employee.id, 'excel')}
                      >
                        <FileSpreadsheet className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleExportEmployee(employee.id, 'pdf')}
                      >
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedEmployees.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No hay empleados que coincidan con los criterios de búsqueda.
            </div>
          )}
        </div>
        
        {/* Detalles del empleado seleccionado */}
        {selectedEmployee && (
          <div className="md:w-1/3 md:ml-6 mt-6 md:mt-0 border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalles del Empleado
              </h2>
            </div>
            
            <div className="p-4">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Datos personales */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Información Personal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Nombre completo</div>
                      <div className="text-sm font-medium">{selectedEmployee.name} {selectedEmployee.lastName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Documento</div>
                      <div className="text-sm font-medium">
                        {selectedEmployee.documentType} {selectedEmployee.documentNumber || '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Fecha nacimiento</div>
                      <div className="text-sm font-medium">{formatDate(selectedEmployee.birthDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Estado</div>
                      <div className="text-sm font-medium">
                        <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedEmployee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedEmployee.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contacto */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Contacto</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{selectedEmployee.email || '—'}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm">{selectedEmployee.phone || '—'}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-sm">
                        {selectedEmployee.address ? (
                          <>
                            {selectedEmployee.address}<br />
                            {selectedEmployee.city}
                          </>
                        ) : '—'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Información laboral */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">Información Laboral</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Fecha contratación</div>
                      <div className="text-sm font-medium">{formatDate(selectedEmployee.hireDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tipo contrato</div>
                      <div className="text-sm font-medium">{selectedEmployee.contractType || '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Puesto</div>
                      <div className="text-sm font-medium">{selectedEmployee.position || '—'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Unidad</div>
                      <div className="text-sm font-medium">{selectedEmployee.unit || '—'}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-start">
                      <Building className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">
                          {selectedEmployee.department || '—'}
                        </div>
                        {selectedEmployee.section && (
                          <div className="text-sm text-gray-500">
                            {selectedEmployee.section}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ReportLayout>
  );
};

export default EmployeeListReport;