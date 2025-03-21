import { X, Calendar, Clock, UserCircle, Bookmark, Info, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../ui/utils';

interface DetalleHorarioModalProps {
  asignacion: {
    id: string;
    tipo: 'turno' | 'permiso';
    tipoNombre: string;
    empleadoNombre: string;
    fecha: Date;
    fechaFin?: Date | null;
    horaInicio?: string;
    horaFin?: string;
    motivo?: string | null;
    color: string;
    departamento?: string;
    codigo: string;
  };
  onClose: () => void;
  onEdit: () => void;
}

export function DetalleHorarioModal({ 
  asignacion,
  onClose,
  onEdit
}: DetalleHorarioModalProps) {
  const esTurno = asignacion.tipo === 'turno';
  const fechaFormateada = format(asignacion.fecha, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
  const fechaFinFormateada = asignacion.fechaFin 
    ? format(asignacion.fechaFin, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
    : null;
  
  // Calcular duración solo si horaInicio y horaFin existen
  const duracionHoras = (asignacion.horaInicio && asignacion.horaFin) 
    ? calcularHoras(asignacion.horaInicio, asignacion.horaFin) 
    : null;
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
        <div className="bg-blue-500 text-white p-6 rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", 
                              esTurno ? "bg-blue-200" : "bg-blue-200")}>
              {esTurno 
                ? <Clock className="w-7 h-7 text-blue-700" /> 
                : <Bookmark className="w-7 h-7 text-blue-700" />}
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider opacity-90">
                {esTurno ? 'Turno' : 'Permiso'}
              </h3>
              <h2 className="text-xl font-bold">
                {asignacion.codigo} - {asignacion.tipoNombre}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <UserCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Empleado</h4>
                  <p className="text-gray-900 font-medium">{asignacion.empleadoNombre}</p>
                  {asignacion.departamento && (
                    <p className="text-sm text-gray-500">{asignacion.departamento}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fecha</h4>
                  <p className="text-gray-900">{fechaFormateada}</p>
                  {fechaFinFormateada && (
                    <div className="mt-1">
                      <h4 className="text-sm font-medium text-gray-500">Hasta</h4>
                      <p className="text-gray-900">{fechaFinFormateada}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {(asignacion.horaInicio && asignacion.horaFin) && (
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Horario</h4>
                    <p className="text-gray-900">
                      {asignacion.horaInicio} - {asignacion.horaFin}
                    </p>
                    {duracionHoras && (
                      <p className="text-sm text-gray-500">
                        ({duracionHoras} horas)
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {asignacion.motivo && (
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Motivo</h4>
                    <p className="text-gray-900">{asignacion.motivo}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cerrar
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Función para calcular horas entre dos horarios en formato "HH:MM"
function calcularHoras(inicio: string, fin: string): string {
  if (!inicio || !fin) return '0';
  
  // Asegurarse de que inicio y fin sean strings y tengan el formato correcto
  const inicioPartes = inicio.split(':');
  const finPartes = fin.split(':');
  
  if (inicioPartes.length !== 2 || finPartes.length !== 2) {
    return '0';
  }
  
  const inicioHoras = parseInt(inicioPartes[0], 10);
  const inicioMinutos = parseInt(inicioPartes[1], 10);
  const finHoras = parseInt(finPartes[0], 10);
  const finMinutos = parseInt(finPartes[1], 10);
  
  if (isNaN(inicioHoras) || isNaN(inicioMinutos) || isNaN(finHoras) || isNaN(finMinutos)) {
    return '0';
  }
  
  let horasTotales = finHoras - inicioHoras;
  let minutosTotales = finMinutos - inicioMinutos;
  
  if (minutosTotales < 0) {
    horasTotales -= 1;
    minutosTotales += 60;
  }
  
  // Si la jornada cruza la medianoche
  if (horasTotales < 0) {
    horasTotales += 24;
  }
  
  const decimalMinutos = (minutosTotales / 60).toFixed(2).substring(1);
  return horasTotales + decimalMinutos;
}