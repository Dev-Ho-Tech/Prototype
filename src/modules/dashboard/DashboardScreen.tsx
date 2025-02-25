import  { useState, useEffect } from 'react';
import { Search, Grid, List, Clock, Users, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { empleadosData, estadoDelDiaData, tiemposData} from './temp/data_temp';
import EmployeeCard from './components/EmployeCardUser';
// import Pagination from './components/PaginationProps';

function DashboardScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === 'grid' ? 18 : 8; 

  
  const filteredEmpleados = empleadosData.filter(empleado => 
    empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empleado.pais.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmpleados.length / itemsPerPage);
  
  const currentEmpleados = filteredEmpleados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  console.log('Dashboard Pagination Values:', {
    currentPage,
    totalPages,
    filteredEmpleadosLength: filteredEmpleados.length,
    itemsPerPage,
    viewMode
  });

  // Reiniciar a la primera página cuando cambie el modo de vista o el término de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, searchTerm]);

  // Función para manejar cambios de página
  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  // Función para obtener clase CSS basada en estado para vista de lista
  const getEstadoClase = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'bg-green-100 text-green-800';
      case 'permiso':
        return 'bg-orange-100 text-orange-800';
      case 'ausencia':
        return 'bg-red-100 text-red-800';
      case 'planificado':
        return 'bg-blue-100 text-blue-800';
      case 'trabajó':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el texto del estado para vista de lista
  const getEstadoTexto = (estado: string) => {
    switch(estado) {
      case 'trabajando':
        return 'Trabajando';
      case 'permiso':
        return 'Permiso';
      case 'ausencia':
        return 'Ausencia';
      case 'planificado':
        return 'Planificado';
      case 'trabajó':
        return 'Trabajó';
      default:
        return estado;
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-4">
        {/* Cabecera simplificada */}
        <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg shadow">
          <div className="text-xl font-bold text-gray-800">
            Panel de monitoreo
          </div>
          
          <div className="relative flex-1 max-w-2xl mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vista de cuadrícula"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Vista de lista"
            >
              <List className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Bloques de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Panel de personas con novedades */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700 mb-3">Personas con novedades</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">1</div>
                  <div className="text-xs text-gray-500">Tardanzas</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">2</div>
                  <div className="text-xs text-gray-500">Permisos</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">2</div>
                  <div className="text-xs text-gray-500">Salidas Intemp...</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">9</div>
                  <div className="text-xs text-gray-500">Ausencias</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">0</div>
                  <div className="text-xs text-gray-500">Sin Horario</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-pink-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">0</div>
                  <div className="text-xs text-gray-500">Horas Extras</div>
                </div>
              </div>
            </div>
          </div>

          {/* Estado del día */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700 mb-3">Estado del día</h2>
            <div className="flex items-center justify-between">
              <div className="h-32 w-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={estadoDelDiaData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={40}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {estadoDelDiaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xl font-bold text-gray-800">3</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-sm">Trabajando</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm">Trabajaron</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-sm">Planificados: 15</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-sm">Sin planificación: 0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tiempos */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-gray-700 mb-3">Tiempos</h2>
            <div className="flex items-center justify-center">
              <div className="h-32 w-32 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tiemposData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={40}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {tiemposData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-lg font-bold text-gray-800">139hs</div>
                </div>
              </div>
              <div className="space-y-2 ml-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-sm">Trabajadas: 7h 11m</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm">Planificadas: 132h 15m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor principal que cambia según viewMode */}
        <div className="bg-white rounded-lg shadow mb-4">
          {viewMode === 'grid' ? (
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {currentEmpleados.map(empleado => (
                  <EmployeeCard key={empleado.id} empleado={empleado} />
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Empleado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      País
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Acción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEmpleados.map(empleado => {
                    const estadoClase = getEstadoClase(empleado.estado);
                    const estadoTexto = getEstadoTexto(empleado.estado);
                    const bgColorClass = 
                      empleado.estado === 'permiso' 
                        ? 'bg-orange-50' 
                        : empleado.estado === 'ausencia' 
                          ? 'bg-red-50' 
                          : empleado.estado === 'trabajando' 
                            ? 'bg-green-50' 
                            : empleado.estado === 'planificado'
                              ? 'bg-blue-50'
                              : 'bg-gray-50';
                    
                    return (
                      <tr 
                        key={empleado.id}
                        className={bgColorClass}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              {empleado.foto ? (
                                <img 
                                  src={empleado.foto} 
                                  alt={empleado.nombre} 
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {empleado.nombre}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {empleado.pais}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {empleado.horas}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {empleado.ultimaAccion ? empleado.ultimaAccion : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${estadoClase}`}>
                            {estadoTexto}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          )}
          

        </div>

      </div>

    </div>
  );
}

export default DashboardScreen;