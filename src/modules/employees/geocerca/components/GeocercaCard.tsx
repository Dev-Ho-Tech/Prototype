import React from 'react';
import { MapPin, Eye, Edit, Trash, Users } from 'lucide-react';
import { Card,  } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Geocerca } from '../interfaces/Geocerca';

interface GeocercaCardProps {
  geocerca: Geocerca;
  onView: (geocerca: Geocerca) => void;
  onEdit: (geocerca: Geocerca) => void;
  onDelete: (geocerca: Geocerca) => void;
}

const GeocercaCard: React.FC<GeocercaCardProps> = ({ 
  geocerca, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className="h-full transition-all hover:shadow-md overflow-hidden">
      {/* Cabecera con color de fondo */}
      <div className="bg-blue-50 p-4 border-b border-blue-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900 text-lg line-clamp-1">{geocerca.nombre}</h3>
              <p className="text-sm text-gray-500 truncate max-w-[200px]">{geocerca.direccion}</p>
            </div>
          </div>
          <Badge
            variant={geocerca.estado === "Activa" ? "default" : "secondary"}
            className={geocerca.estado === "Activa" ? "bg-green-100 text-green-800" : "bg-gray-100"}
          >
            {geocerca.estado}
          </Badge>
        </div>
      </div>
      
      {/* Cuerpo con información */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 font-medium">Sede:</span>
              <span className="text-sm text-blue-700">{geocerca.sede}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 font-medium">Radio:</span>
              <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{geocerca.radio}m</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 font-medium">Empleados:</span>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">{geocerca.empleadosAsignados}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 font-medium">Creación:</span>
              <span className="text-sm text-gray-700">{geocerca.fechaCreacion}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pie con acciones */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-100">
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          onClick={() => onView(geocerca)}
        >
          <Eye className="h-4 w-4 mr-1" />
          Ver
        </Button>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => onEdit(geocerca)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
            onClick={() => onDelete(geocerca)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GeocercaCard;