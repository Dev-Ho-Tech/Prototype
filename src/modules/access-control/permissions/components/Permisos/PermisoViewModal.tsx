import { X, Shield, Users, Calendar, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { Permiso } from '../../interfaces/permisos';

interface PermisoViewModalProps {
  permiso: Permiso;
  onClose: () => void;
  onEdit: () => void;
}

export function PermisoViewModal({ permiso, onClose, onEdit }: PermisoViewModalProps) {
  const getBadgeClass = (nivel: string) => {
    switch (nivel) {
      case 'bajo':
        return 'bg-blue-100 text-blue-800';
      case 'medio':
        return 'bg-green-100 text-green-800';
      case 'alto':
        return 'bg-orange-100 text-orange-800';
      case 'critico':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusClass = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-gray-100 text-gray-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getAutorizacionText = (tipo: string) => {
    switch (tipo) {
      case 'tarjeta':
        return 'Tarjeta';
      case 'tarjeta_pin':
        return 'Tarjeta + PIN';
      case 'biometrico':
        return 'Biométrico';
      default:
        return tipo;
    }
  };

  const getDiasSemana = (dias: string[]) => {
    const nombresDias: Record<string, string> = {
      lunes: 'Lun',
      martes: 'Mar',
      miercoles: 'Mié',
      jueves: 'Jue',
      viernes: 'Vie',
      sabado: 'Sáb',
      domingo: 'Dom'
    };
    
    return dias.map(dia => nombresDias[dia] || dia).join(', ');
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-hidden">
        {/* Cabecera con título y botón de cerrar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBadgeClass(permiso.nivel)}`}>
              <Shield className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-900">{permiso.nombre}</h2>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(permiso.estado)}`}>
                  {permiso.estado.charAt(0).toUpperCase() + permiso.estado.slice(1)}
                </span>
                <span className="mx-2">•</span>
                <span className="text-sm text-gray-500">ID: {permiso.id}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cuerpo del modal con la información */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna 1: Información general */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-blue-600 mb-3">Descripción</h3>
                <p className="text-gray-700">{permiso.descripcion}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-blue-600 mb-3">Detalles</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Tipo de Permiso</p>
                        <p className="text-sm text-gray-500">
                          {permiso.tipo.charAt(0).toUpperCase() + permiso.tipo.slice(1)}
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Nivel de Acceso</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(permiso.nivel)}`}>
                          {permiso.nivel.charAt(0).toUpperCase() + permiso.nivel.slice(1)}
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Usuarios Asignados</p>
                        <p className="text-sm text-gray-500">{permiso.usuariosAsignados}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Creado</p>
                        <p className="text-sm text-gray-500">{formatDate(permiso.fechaCreacion)} por {permiso.creadoPor}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Última Modificación</p>
                        <p className="text-sm text-gray-500">{formatDate(permiso.fechaModificacion)} por {permiso.modificadoPor}</p>
                      </div>
                    </li>
                    {permiso.vencimiento && (
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Vencimiento</p>
                          <p className="text-sm text-gray-500">{formatDate(permiso.vencimiento)}</p>
                        </div>
                      </li>
                    )}
                    {permiso.tipoAutorizacion && (
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tipo de Autorización</p>
                          <p className="text-sm text-gray-500">{getAutorizacionText(permiso.tipoAutorizacion)}</p>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Requiere Acompañante</p>
                        <p className="text-sm text-gray-500">{permiso.requiereAcompanante ? 'Sí' : 'No'}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-blue-600 mb-3">Horarios</h3>
                  {permiso.horarios && permiso.horarios.length > 0 ? (
                    <ul className="space-y-4">
                      {permiso.horarios.map((horario, index) => (
                        <li key={index} className="bg-gray-50 p-3 rounded-md">
                          <div className="flex items-center mb-1">
                            <Clock className="h-4 w-4 text-blue-500 mr-2" />
                            <p className="text-sm font-medium text-gray-900">
                              {horario.inicio} - {horario.fin}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 ml-6">
                            {getDiasSemana(horario.diasSemana)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No hay horarios definidos</p>
                  )}
                </div>
              </div>
            </div>

            {/* Columna 2: Áreas asignadas */}
            <div>
              <h3 className="text-lg font-medium text-blue-600 mb-3">Áreas Asignadas</h3>
              {permiso.areas && permiso.areas.length > 0 ? (
                <ul className="space-y-3 bg-gray-50 p-4 rounded-md">
                  {permiso.areas.map((area, index) => (
                    <li key={index} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-start mb-1">
                        <MapPin className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{area.nombre}</p>
                          <p className="text-xs text-gray-500">{area.ubicacion}</p>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(area.nivelSeguridad)}`}>
                              {area.nivelSeguridad.charAt(0).toUpperCase() + area.nivelSeguridad.slice(1)}
                            </span>
                            {area.requiereAutorizacionAdicional && (
                              <span className="ml-2 text-xs text-orange-600">Requiere autorización adicional</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No hay áreas asignadas</p>
              )}
            </div>
          </div>
        </div>

        {/* Pie del modal con acciones */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
          >
            Cerrar
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
}