import { employees as managementEmployees } from '../data';

import { Employee as SchedulingEmployee } from '../interfaces/types';
import { employees, mapEmployeeToOrganization } from '../data';

// Mejorar la estructura de los empleados con datos de organización
const enhancedEmployees = employees.map(emp => mapEmployeeToOrganization(emp));

/**
 * Encuentra un empleado correspondiente entre EmployeeManagementScreen y SchedulingScreen
 * @param employeeId ID del empleado a buscar
 * @returns El empleado correspondiente o el primer empleado como fallback
 */
export const findCorrespondingEmployee = (employeeId: string): SchedulingEmployee | null => {
  try {
    console.log('Buscando empleado con ID:', employeeId);
    
    // Primero intentamos encontrar el empleado directamente por ID
    let matchingEmployee = enhancedEmployees.find(emp => emp.id === employeeId);
    
    if (matchingEmployee) {
      console.log('Empleado encontrado directamente por ID');
      return matchingEmployee;
    }
    
    console.log('Empleado no encontrado por ID, buscando en datos de gestión');
    
    // Buscar el empleado en los datos de gestión
    const managementEmployee = managementEmployees.find(emp => emp.id === employeeId);
    
    if (managementEmployee && managementEmployee.name) {
      console.log('Empleado encontrado en datos de gestión:', managementEmployee.name);
      
      // Buscar un empleado con el mismo nombre en nuestra lista
      matchingEmployee = enhancedEmployees.find(emp => 
        emp.name === managementEmployee.name ||
        (emp.name && managementEmployee.name && 
         emp.name.toLowerCase() === managementEmployee.name.toLowerCase())
      );
      
      if (matchingEmployee) {
        console.log('Encontrada correspondencia por nombre');
        return matchingEmployee;
      }
      
      // Si no encontramos por nombre, intentamos buscar por departamento/ubicación
      console.log('No encontrado por nombre, buscando por departamento/ubicación');
      if (managementEmployee.department && managementEmployee.location) {
        matchingEmployee = enhancedEmployees.find(emp => 
          emp.department === managementEmployee.department && 
          emp.location === managementEmployee.location
        );
        
        if (matchingEmployee) {
          console.log('Encontrada correspondencia por departamento y ubicación');
          return matchingEmployee;
        }
      }
    }
    
    console.log('No se encontró ninguna correspondencia, usando el primer empleado');
    // Si no encontramos ninguna correspondencia, retornamos el primer empleado
    return enhancedEmployees[0];
  } catch (error) {
    console.error("Error al buscar correspondencia de empleado:", error);
    return enhancedEmployees[0];
  }
};

// Exportar también los empleados mejorados para evitar duplicación
export { enhancedEmployees };