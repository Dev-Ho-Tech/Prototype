import React from 'react';
import { Employee, TipoIncidencia } from '../interface/types';
import { incidencias } from '../temp/data'; // Importamos los datos de incidencias
import EmployeeAvatar from './EmployeeAvatar';

interface EmployeeDetailHeaderProps {
  employee: Employee;
  activeKpiFilter?: string | null; // Añadimos el filtro de KPI activo
}

const EmployeeDetailHeader: React.FC<EmployeeDetailHeaderProps> = ({ 
  employee, 
  activeKpiFilter = null 
}) => {
  // Datos de prueba complementarios para los campos que no existen
  const mockData = {
    supervisor: 'María González Pérez'
  };

  // Combinamos los datos reales con los de prueba
  const completeEmployee = {
    ...employee,
    supervisor: employee.supervisor || mockData.supervisor
  };

  // Obtenemos las incidencias del empleado
  const employeeIncidencias = incidencias.filter(inc => inc.empleadoId === employee.id);
  
  // Si hay un filtro activo, filtramos por ese tipo de incidencia
  const filteredIncidencias = activeKpiFilter 
    ? employeeIncidencias.filter(inc => inc.tipo === activeKpiFilter as TipoIncidencia)
    : employeeIncidencias;

  console.log('activeKpiFilter:', activeKpiFilter);
  console.log('employeeIncidencias:', employeeIncidencias);
  console.log('filteredIncidencias:', filteredIncidencias);

  // Formateamos el texto de incidencias para mostrar
  const formatIncidenciasText = () => {
    if (filteredIncidencias.length === 0) {
      return "Sin incidencias";
    }
    
    if (activeKpiFilter) {
      // Si hay un filtro activo, mostramos cuántas incidencias de ese tipo tiene
      const tipoText = activeKpiFilter === 'tardanzas' ? 'Tardanza' : 
                      activeKpiFilter === 'permisos' ? 'Permiso' :
                      activeKpiFilter === 'salidas' ? 'Salida Intempestiva' :
                      activeKpiFilter === 'ausencias' ? 'Ausencia' :
                      activeKpiFilter === 'sin-horario' ? 'Sin Horario' :
                      activeKpiFilter === 'horas-extras' ? 'Horas Extras' : 'Otra';
      
      return `${tipoText}`;
    } else {
      // Si no hay filtro, mostramos el total de incidencias
      return `Total: ${employeeIncidencias.length}`;
    }
  };

  // Si no hay filtro activo pero hay incidencias, mostrar el primer tipo de incidencia
  const getFirstIncidenciaType = () => {
    if (!activeKpiFilter && employeeIncidencias.length > 0) {
      const firstIncidencia = employeeIncidencias[0];
      const tipoText = firstIncidencia.tipo === 'tardanzas' ? 'Tardanza' : 
                      firstIncidencia.tipo === 'permisos' ? 'Permiso' :
                      firstIncidencia.tipo === 'salidas' ? 'Salida Intempestiva' :
                      firstIncidencia.tipo === 'ausencias' ? 'Ausencia' :
                      firstIncidencia.tipo === 'sin-horario' ? 'Sin Horario' :
                      firstIncidencia.tipo === 'horas-extras' ? 'Horas Extras' : 'Otra';
      
      return `${tipoText}`;
    }
    return formatIncidenciasText();
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <h2 className="text-sm font-medium text-gray-700 mb-4">Datos de la persona</h2>
      
      <div className="flex">
        <div className="mr-6">
          <EmployeeAvatar 
            photoUrl={completeEmployee.photoUrl} 
            name={`${completeEmployee.nombre} ${completeEmployee.apellidos}`}
            size="large"
          />
        </div>
        
        <div className="grid grid-cols-6 gap-x-4 gap-y-4 flex-1">
          {/* Primera fila - 6 columnas  */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Nombres:</div>
            <div className="text-sm font-medium">{completeEmployee.nombre}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Apellidos:</div>
            <div className="text-sm font-medium">{completeEmployee.apellidos}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Compañia:</div>
            <div className="text-sm font-medium">{completeEmployee.company}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sucursal:</div>
            <div className="text-sm font-medium">Hodelpa Gran Almirante</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Departamento:</div>
            <div className="text-sm font-medium">{completeEmployee.department}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Sección:</div>
            <div className="text-sm font-medium">Reclutamiento y Seleccíon</div>
          </div>
          
          {/* Segunda fila -  */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Unidad:</div>
            <div className="text-sm font-medium">Selección de Personal</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Cargo:</div>
            <div className="text-sm font-medium">{completeEmployee.position}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 mb-1">Supervisor:</div>
            <div className="text-sm font-medium">Marco Timaná</div>
          </div>
          
          {/* Incidencia */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Incidencia:</div>
            <div className="text-sm font-medium">
              {getFirstIncidenciaType()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailHeader;