import { Building2, Factory, Users, Briefcase, Home, LayoutGrid } from "lucide-react";
import { TreeNodeData } from "../../../interface/types";


// IDs para preselección de estructura
export const COMPANY_ID = 'caldelpa-empresas';
export const OPERATIONS_ID = 'caldelpa-operaciones';


export const organizationalData: TreeNodeData = {
  name: 'Caldelpa S.a.(Empresas)',
  manager: 'Roberto Henríquez Martínez',
  employeeCount: 980,
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
      icon: <Factory className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: false,
      children: [
        {
          name: 'Departamento de Ventas',
          manager: 'María González',
          employeeCount: 120,
          id: 'caldelpa-ventas',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          expanded: false,
          children: [
            {
              name: 'Ventas Corporativas',
              manager: 'Javier Ramírez',
              employeeCount: 45,
              id: 'ventas-corporativas',
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'team',
              expanded: false,
              children: [
                {
                  name: 'Unidad de Grandes Clientes',
                  manager: 'Ana Martínez',
                  employeeCount: 20,
                  id: 'grandes-clientes',
                  icon: <LayoutGrid className="w-5 h-5 text-blue-500" />,
                  color: 'blue',
                  type: 'unit',
                  children: []
                },
                {
                  name: 'Unidad de PyMES',
                  manager: 'Pedro Jiménez',
                  employeeCount: 25,
                  id: 'pymes',
                  icon: <LayoutGrid className="w-5 h-5 text-blue-500" />,
                  color: 'blue',
                  type: 'unit',
                  children: []
                }
              ]
            },
            {
              name: 'Ventas Retail',
              manager: 'Patricia Lopez',
              employeeCount: 75,
              id: 'ventas-retail',
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'team',
              children: []
            }
          ]
        },
        {
          name: 'Departamento de Marketing',
          manager: 'Eduardo Morales',
          employeeCount: 65,
          id: 'caldelpa-marketing',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        },
        {
          name: 'Departamento de Logística',
          manager: 'Laura Mendoza',
          employeeCount: 95,
          id: 'caldelpa-logistica',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        },
        {
          name: 'Departamento de Finanzas',
          manager: 'Roberto Díaz',
          employeeCount: 70,
          id: 'caldelpa-finanzas',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        }
      ]
    },
    {
      name: 'Positiva (Inmobiliaria)',
      manager: 'Francisco Jiménez',
      employeeCount: 280,
      id: 'positiva-inmobiliaria',
      icon: <Home className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: false,
      children: [
        {
          name: 'Gerencia de Proyectos',
          manager: 'Claudia Rodríguez',
          employeeCount: 85,
          id: 'positiva-proyectos',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: [
            {
              name: 'Desarrollo Residencial',
              manager: 'Hugo Hernández',
              employeeCount: 45,
              id: 'desarrollo-residencial',
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'team',
              children: []
            },
            {
              name: 'Desarrollo Comercial',
              manager: 'Sofía Vargas',
              employeeCount: 40,
              id: 'desarrollo-comercial',
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'team',
              children: []
            }
          ]
        },
        {
          name: 'Gerencia de Ventas',
          manager: 'Daniel Torres',
          employeeCount: 110,
          id: 'positiva-ventas',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        },
        {
          name: 'Gerencia de Administración',
          manager: 'Carla Blanco',
          employeeCount: 85,
          id: 'positiva-administracion',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        }
      ]
    },
    {
      name: 'Caldelpa S.a.(Operaciones)',
      manager: 'Luisa Hernández',
      employeeCount: 150,
      id: 'caldelpa-operaciones',
      icon: <Factory className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: false,
      children: [
        {
          name: 'Operaciones Hoteleras',
          manager: 'Jorge Castillo',
          employeeCount: 95,
          id: 'operaciones-hoteleras',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        },
        {
          name: 'Mantenimiento e Infraestructura',
          manager: 'Gustavo Paz',
          employeeCount: 55,
          id: 'mantenimiento-infraestructura',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        }
      ]
    },
    {
      name: 'Instalaciones Hotelera CHO Clima (empresa)',
      manager: 'Manuel Rodríguez',
      employeeCount: 200,
      id: 'instalaciones-hotelera',
      icon: <Factory className="w-5 h-5 text-green-500" />,
      color: 'green',
      type: 'branch',
      expanded: false,
      children: [
        {
          name: 'Departamento de Instalaciones',
          manager: 'Ricardo Fuentes',
          employeeCount: 120,
          id: 'cho-instalaciones',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: [
            {
              name: 'Instalaciones Eléctricas',
              manager: 'Fernando Ríos',
              employeeCount: 45,
              id: 'instalaciones-electricas',
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'team',
              children: []
            },
            {
              name: 'Climatización',
              manager: 'Alicia Montes',
              employeeCount: 35,
              id: 'climatizacion',
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'team',
              children: []
            },
            {
              name: 'Fontanería',
              manager: 'Raúl Casas',
              employeeCount: 40,
              id: 'fontaneria',
              icon: <Users className="w-5 h-5 text-amber-500" />,
              color: 'amber',
              type: 'team',
              children: []
            }
          ]
        },
        {
          name: 'Departamento Técnico',
          manager: 'Mónica Durán',
          employeeCount: 80,
          id: 'cho-tecnico',
          icon: <Briefcase className="w-5 h-5 text-purple-500" />,
          color: 'purple',
          type: 'department',
          children: []
        }
      ]
    }
  ]
};