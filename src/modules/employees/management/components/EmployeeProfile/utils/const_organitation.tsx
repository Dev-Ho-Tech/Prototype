import { Building2 } from "lucide-react";
import { TreeNodeData } from "../../../interface/types";

export const organizationalData: TreeNodeData = {
  name: 'Caldelpa S.a.(Empresas)',
  manager: 'Roberto Henríquez Martínez',
  employeeCount: 350 + 15 + 120 + 85,
  id: 'caldelpa-empresas',
  icon: <Building2 className="w-5 h-5 text-blue-500" />,
  color: 'blue',
  type: 'company',
  expanded: true,
  children: [
    {
      name: 'Comercial Caldelpa S.a.(Empresa)',
      manager: 'Carlos Eduardo Sánchez',
      employeeCount: 350,
      id: 'comercial-caldelpa',
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: true,
      children: []
    },
    {
      name: 'Positiva (Inmobiliaria)',
      manager: 'Francisco Jiménez',
      employeeCount: 280,
      id: 'positiva-inmobiliaria',
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: true,
      children: []
    },
    {
      name: 'Caldelpa S.a.(Operaciones)',
      manager: 'Luisa Hernández',
      employeeCount: 150,
      id: 'caldelpa-operaciones',
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: true,
      children: []
    },
    {
      name: 'Instalaciones Hotelera CHO Clima (empresa)',
      manager: 'Manuel Rodríguez',
      employeeCount: 200,
      id: 'instalaciones-hotelera',
      icon: <Building2 className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: true,
      children: []
    }
  ]
};