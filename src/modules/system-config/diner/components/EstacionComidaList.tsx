import React from 'react';
import { EstacionComidaListProps } from '../interfaces/types';
import { Edit, Trash2, Utensils } from 'lucide-react';

const EstacionComidaList: React.FC<EstacionComidaListProps> = ({
  estaciones,
  comedores,
  onEdit,
  onDelete
}) => {
  // Función para obtener el nombre del comedor según su ID
  const getComedorNombre = (comedorId: string): string => {
    const comedor = comedores.find(c => c.id === comedorId);
    return comedor ? comedor.nombre : 'Comedor no encontrado';
  };

  // Función para mostrar el tipo de estación de forma más amigable
  const formatTipoEstacion = (tipo: string): string => {
    switch (tipo) {
      case 'buffet': return 'Buffet';
      case 'servido': return 'Servido';
      case 'self-service': return 'Self-Service';
      case 'otro': return 'Otro';
      default: return tipo;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comedor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacidad
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {estaciones.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay estaciones registradas
                </td>
              </tr>
            ) : (
              estaciones.map((estacion) => (
                <tr key={estacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-yellow-100 rounded-full">
                        <Utensils className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{estacion.nombre}</div>
                        <div className="text-sm text-gray-500">{estacion.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getComedorNombre(estacion.comedorId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                      estacion.tipo === 'buffet' ? 'bg-purple-100 text-purple-800' :
                      estacion.tipo === 'servido' ? 'bg-blue-100 text-blue-800' :
                      estacion.tipo === 'self-service' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {formatTipoEstacion(estacion.tipo)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {estacion.capacidadMaxima} personas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {estacion.descripcion ? 
                      (estacion.descripcion.length > 30 ? 
                        `${estacion.descripcion.substring(0, 30)}...` : 
                        estacion.descripcion) : 
                      "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      estacion.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {estacion.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEdit(estacion)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(estacion.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstacionComidaList;