/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Search, Plus, Filter, ChevronDown } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Card, CardContent} from "./components/ui/card"
import { DataTable } from "./components/data-table"
import { geocercas } from "./temp/mock-data"
import { Badge } from "./components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./components/ui/dropdown"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "./components/ui/tabs"
import { Geocerca } from "./interfaces/Geocerca"
import { GeocercaDetalle } from "./components/GeocercaDetalle"
import { GeocercaEditar } from "./components/geocerca-editar"

// Importaciones para las columnas
import { ArrowUpDown, MapPin, Edit, Trash, Eye } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

// Tipo de vista
type Vista = 'lista' | 'detalle' | 'editar' | 'crear';

// Función para crear las columnas que usa handlers de clic en lugar de navegación
const createGeocercaColumns = (
  onView: (geocerca: Geocerca) => void,
  onEdit: (geocerca: Geocerca) => void,
  onDelete: (geocerca: Geocerca) => void
): ColumnDef<Geocerca>[] => [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onView(row.original)}>
          <MapPin className="h-4 w-4 text-blue-600" />
          <div>
            <div className="font-medium">{row.getValue("nombre")}</div>
            <div className="text-xs text-gray-500 truncate max-w-[200px]">{row.original.direccion}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "sede",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Sede
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "radio",
    header: "Radio",
    cell: ({ row }) => {
      return <div>{row.getValue("radio")}m</div>
    },
  },
  {
    accessorKey: "empleadosAsignados",
    header: "Empleados",
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("empleadosAsignados")}</div>
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as string
      return (
        <Badge
          variant={estado === "Activa" ? "default" : "secondary"}
          className={estado === "Activa" ? "bg-green-100 text-green-800" : ""}
        >
          {estado}
        </Badge>
      )
    },
  },
  {
    accessorKey: "fechaCreacion",
    header: "Fecha de creación",
  },
  {
    id: "acciones",
    cell: ({ row }) => {
      const geocerca = row.original

      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onView(geocerca);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(geocerca);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(geocerca);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export default function GeocercasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activas" | "inactivas">("activas")
  const [vistaActual, setVistaActual] = useState<Vista>('lista')
  const [geocercaSeleccionada, setGeocercaSeleccionada] = useState<Geocerca | null>(null)
  const [listaGeocercas, setListaGeocercas] = useState<Geocerca[]>(geocercas)
  
  // Manejadores para las acciones de las geocercas
  const handleViewGeocerca = (geocerca: Geocerca) => {
    setGeocercaSeleccionada(geocerca);
    setVistaActual('detalle');
  };
  
  const handleEditGeocerca = (geocerca: Geocerca) => {
    setGeocercaSeleccionada(geocerca);
    setVistaActual('editar');
  };
  
  const handleDeleteGeocerca = (geocerca: Geocerca) => {
    if (window.confirm(`¿Está seguro de eliminar la geocerca ${geocerca.nombre}?`)) {
      // Eliminar la geocerca de la lista
      const nuevasGeocercas = listaGeocercas.filter(g => g.id !== geocerca.id);
      setListaGeocercas(nuevasGeocercas);
      
      // Si estamos en la vista de detalle de la geocerca eliminada, volver a la lista
      if (vistaActual === 'detalle' && geocercaSeleccionada?.id === geocerca.id) {
        setVistaActual('lista');
      }
    }
  };
  
  const handleCreateGeocerca = () => {
    setGeocercaSeleccionada(null);
    setVistaActual('crear');
  };
  
  const handleSaveGeocerca = (geocerca: Geocerca) => {
    if (vistaActual === 'crear') {
      // Agregar nueva geocerca
      setListaGeocercas([...listaGeocercas, geocerca]);
    } else {
      // Actualizar geocerca existente
      const nuevasGeocercas = listaGeocercas.map(g => 
        g.id === geocerca.id ? geocerca : g
      );
      setListaGeocercas(nuevasGeocercas);
    }
    
    // Volver a la vista de detalle con la geocerca actualizada
    setGeocercaSeleccionada(geocerca);
    setVistaActual('detalle');
  };
  
  const handleCancelEdicion = () => {
    if (vistaActual === 'crear') {
      // Si estábamos creando, volver a la lista
      setVistaActual('lista');
    } else {
      // Si estábamos editando, volver al detalle
      setVistaActual('detalle');
    }
  };
  
  const handleVolverALista = () => {
    setVistaActual('lista');
  };
  
  // Crear las columnas con manejadores de eventos
  const columns = createGeocercaColumns(
    handleViewGeocerca,
    handleEditGeocerca,
    handleDeleteGeocerca
  );

  // Filtrar geocercas según el estado seleccionado
  const geocercasFiltradas = listaGeocercas.filter(g => {
    if (filtroEstado === "todos") return true;
    if (filtroEstado === "activas") return g.estado === "Activa";
    if (filtroEstado === "inactivas") return g.estado === "Inactiva";
    return true;
  });

  // Contador de estados para las pestañas
  const totalActivas = listaGeocercas.filter(g => g.estado === "Activa").length;
  const totalInactivas = listaGeocercas.filter(g => g.estado === "Inactiva").length;

  // Renderizado condicional según la vista actual
  if (vistaActual === 'detalle' && geocercaSeleccionada) {
    return (
      <div className="container mx-auto py-6">
        <GeocercaDetalle 
          geocerca={geocercaSeleccionada}
          onBack={handleVolverALista}
          onEdit={handleEditGeocerca}
          onDelete={handleDeleteGeocerca}
        />
      </div>
    );
  }

  if (vistaActual === 'editar' || vistaActual === 'crear') {
    return (
      <div className="container mx-auto py-6">
        <GeocercaEditar 
          geocerca={vistaActual === 'editar' ? geocercaSeleccionada : null}
          onSave={handleSaveGeocerca}
          onCancel={handleCancelEdicion}
        />
      </div>
    );
  }

  // Vista de lista (por defecto)
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Geocercas</h1>
          <p className="text-gray-500">Gestione las zonas geográficas válidas para marcajes de asistencia</p>
        </div>
        <Button onClick={handleCreateGeocerca}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Geocerca
        </Button>
      </div>

      <Tabs defaultValue="activas" onValueChange={(value) => setFiltroEstado(value as any)}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="activas">
              Activas <Badge className="ml-2 bg-green-100 text-green-800">{totalActivas}</Badge>
            </TabsTrigger>
            <TabsTrigger value="inactivas">
              Inactivas <Badge className="ml-2 bg-gray-100 text-gray-800">{totalInactivas}</Badge>
            </TabsTrigger>
            <TabsTrigger value="todos">
              Todas <Badge className="ml-2 bg-gray-100 text-gray-600">{listaGeocercas.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar geocercas..."
                icon={<Search className="h-4 w-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[250px] md:w-[300px]"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => console.log("Filtro por sede")}>Por sede</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Filtro por radio")}>Por radio</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Filtro por empleados")}>Por empleados</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Filtro por fecha")}>Por fecha</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="activas">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                data={geocercasFiltradas}
                searchQuery={searchQuery}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactivas">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                data={geocercasFiltradas}
                searchQuery={searchQuery}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="todos">
          <Card>
            <CardContent className="p-0">
              <DataTable
                columns={columns}
                data={geocercasFiltradas}
                searchQuery={searchQuery}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}