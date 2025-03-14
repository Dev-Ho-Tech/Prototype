import React from 'react';
import { ReportCategory } from '../interfaces/Report';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  ClipboardCheck,
  Users,
  BarChart2,
  FileText,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

interface ReportCardProps {
  category: ReportCategory;
}

const ReportCard: React.FC<ReportCardProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(category.path);
  };

  // Función para seleccionar el icono correcto según el id o nombre de la categoría
  const getIcon = () => {
    // Mapping de nombres o ids a iconos
    switch (category.name.toLowerCase()) {
      case 'hotelería - horas trabajadas':
        return <Clock className="h-7 w-7 text-white" />;
      case 'planilla sin horario':
        return <Calendar className="h-7 w-7 text-white" />;
      case 'personas con biometría':
        return <ClipboardCheck className="h-7 w-7 text-white" />;
      case 'carga masiva de personas':
        return <Users className="h-7 w-7 text-white" />;
      case 'hotelería - sumatorio':
        return <BarChart2 className="h-7 w-7 text-white" />;
      case 'listado de personas':
        return <FileText className="h-7 w-7 text-white" />;
      case 'marcajes de asistencia':
        return <ClipboardList className="h-7 w-7 text-white" />;
      case 'tiempo trabajado':
        return <TrendingUp className="h-7 w-7 text-white" />;
      case 'tiempo sin aprobar':
        return <AlertTriangle className="h-7 w-7 text-white" />;
      default:
        return <FileText className="h-7 w-7 text-white" />; // Icono por defecto
    }
  };

  // Función para obtener el color de fondo del círculo del icono
  const getIconBgColor = () => {
    switch (category.name.toLowerCase()) {
      case 'hotelería - horas trabajadas':
        return 'bg-yellow-400'; // Amarillo
      case 'planilla sin horario':
        return 'bg-pink-400'; // Rosa
      case 'personas con biometría':
        return 'bg-green-400'; // Verde
      case 'carga masiva de personas':
        return 'bg-green-400'; // Verde
      case 'hotelería - sumatorio':
        return 'bg-blue-400'; // Azul
      case 'listado de personas':
        return 'bg-purple-400'; // Morado
      case 'marcajes de asistencia':
        return 'bg-purple-400'; // Morado
      case 'tiempo trabajado':
        return 'bg-lime-400'; // Verde lima
      case 'tiempo sin aprobar':
        return 'bg-cyan-400'; // Cian
      default:
        return 'bg-gray-400'; // Gris por defecto
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] cursor-pointer"
      onClick={handleClick}
    >
      <div className={`${getIconBgColor()} rounded-full p-3 mb-4 flex items-center justify-center`}>
        {getIcon()}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h3>
      <p className="text-sm text-gray-500">{category.description || 'Reporte detallado'}</p>
    </div>
  );
};

export default ReportCard;