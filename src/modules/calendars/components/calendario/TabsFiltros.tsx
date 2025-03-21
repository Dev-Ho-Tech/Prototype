import React, { useState, useMemo } from 'react';
import { Turno } from '../../interfaces/Turno';
import { Permiso } from '../../interfaces/Permiso';

interface TabsFiltrosProps {
  turnos: Turno[];
  permisos: Permiso[];
}

export const TabsFiltros: React.FC<TabsFiltrosProps> = ({ turnos, permisos }) => {
  // Estado local para el tab activo, ahora correctamente en un componente
  const [tabActivo, setTabActivo] = useState('todos');
  
  // Filtrar elementos según el tab activo
  const elementosFiltrados = useMemo(() => {
    if (tabActivo === 'todos') return [...turnos, ...permisos];
    if (tabActivo === 'turnos') return turnos;
    if (tabActivo === 'permisos') return permisos;
    return [];
  }, [tabActivo, turnos, permisos]);
  
  return (
    <>
      <div className="flex items-center border-b">
        <button 
          className={`px-6 py-3 font-medium transition-colors ${
            tabActivo === 'todos' 
              ? 'text-blue-600 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setTabActivo('todos')}
        >
          Todos ({turnos.length + permisos.length})
        </button>
        <button 
          className={`px-6 py-3 font-medium transition-colors ${
            tabActivo === 'turnos' 
              ? 'text-blue-600 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setTabActivo('turnos')}
        >
          Turnos ({turnos.length})
        </button>
        <button 
          className={`px-6 py-3 font-medium transition-colors ${
            tabActivo === 'permisos' 
              ? 'text-blue-600 border-b-2 border-blue-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setTabActivo('permisos')}
        >
          Permisos ({permisos.length})
        </button>
      </div>
      
      <div className="p-5">
        {tabActivo === 'todos' && (
          <>
            {/* Sección de Turnos */}
            {turnos.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">
                  <span className="border-l-4 border-blue-500 pl-2">Turnos de Trabajo</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {turnos.map(turno => (
                    <div key={turno.id} className="flex items-center p-2 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                      <div className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center ${turno.color}`}>
                        <span className="font-bold text-xs">{turno.codigo}</span>
                      </div>
                      <div className="ml-2 min-w-0">
                        <div className="font-medium text-sm truncate">{turno.nombre}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {turno.horaInicio} - {turno.horaFin}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sección de Permisos */}
            {permisos.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 px-2">
                  <span className="border-l-4 border-purple-500 pl-2">Permisos</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {permisos.map(permiso => (
                    <div key={permiso.id} className="flex items-center p-2 rounded-lg hover:bg-purple-50 transition-colors border border-gray-100">
                      <div className={`w-9 h-9 flex-shrink-0 rounded-lg flex items-center justify-center ${permiso.color}`}>
                        <span className="font-bold text-xs">{permiso.codigo}</span>
                      </div>
                      <div className="ml-2 min-w-0">
                        <div className="font-medium text-sm truncate">{permiso.nombre}</div>
                        {permiso.descripcion && (
                          <div className="text-xs text-gray-500 truncate">{permiso.descripcion}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
        {/* Tab de solo Turnos */}
        {tabActivo === 'turnos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {turnos.map(turno => (
              <div key={turno.id} className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors border border-gray-100">
                <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${turno.color}`}>
                  <span className="font-bold text-xs">{turno.codigo}</span>
                </div>
                <div className="ml-3 min-w-0">
                  <div className="font-medium text-sm truncate">{turno.nombre}</div>
                  <div className="text-xs text-gray-500 flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {turno.horaInicio} - {turno.horaFin}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Tab de solo Permisos */}
        {tabActivo === 'permisos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {permisos.map(permiso => (
              <div key={permiso.id} className="flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors border border-gray-100">
                <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${permiso.color}`}>
                  <span className="font-bold text-xs">{permiso.codigo}</span>
                </div>
                <div className="ml-3 min-w-0">
                  <div className="font-medium text-sm truncate">{permiso.nombre}</div>
                  {permiso.descripcion && (
                    <div className="text-xs text-gray-500 truncate">{permiso.descripcion}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Mensaje cuando no hay elementos */}
        {elementosFiltrados.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No hay {tabActivo} configurados actualmente.
          </div>
        )}
      </div>
    </>
  );
};