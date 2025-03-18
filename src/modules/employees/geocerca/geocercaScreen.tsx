/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from "react"
import { Search, Plus, Filter, ChevronDown, Trash, List, Grid } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Card, CardContent } from "./components/ui/card"
import { DataTable } from "./components/data-table"
import { geocercas } from "./temp/mock-data"
import { Badge } from "./components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
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
import { ConfirmModal } from "./components/ConfirmModal"
import GeocercaGridView from "./components/GeocercaGridView"
import { ViewMode } from "./components/ViewToggleButton"

// Importaciones para las columnas
import { ArrowUpDown, MapPin, Edit, Eye } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"
import { CardFooter } from "./components/CardFooter"
import { DropdownMenuSeparator } from "./components/DropdownMenuSeparator"

// Tipo de vista
type Vista = 'lista' | 'detalle' | 'editar' | 'crear';

export default function GeocercasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activas" | "inactivas">("activas")
  const [vistaActual, setVistaActual] = useState<Vista>('lista')
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [geocercaSeleccionada, setGeocercaSeleccionada] = useState<Geocerca | null>(null)
  const [listaGeocercas, setListaGeocercas] = useState<Geocerca[]>([])
  // Guarda la vista anterior para volver correctamente
  const [vistaAnterior, setVistaAnterior] = useState<Vista>('lista')
  
  // Estado para el modal de confirmación
  const [modalConfirmacion, setModalConfirmacion] = useState({
    isOpen: false,
    geocercaId: '',
    geocercaNombre: ''
  });
  
  // Carga inicial de datos - solo una vez
  useEffect(() => {
    setListaGeocercas(geocercas);
    
    // Intentar recuperar la preferencia de visualización del localStorage
    const savedViewMode = localStorage.getItem('geocercas-view-mode');
    if (savedViewMode && (savedViewMode === 'table' || savedViewMode === 'grid')) {
      setViewMode(savedViewMode as ViewMode);
    }
    
    // Limpieza al desmontar
    return () => {
      setListaGeocercas([]);
      setGeocercaSeleccionada(null);
      setSearchQuery("");
      setFiltroEstado("activas");
      setVistaActual('lista');
      setVistaAnterior('lista');
    };
  }, []);
  
  // Persistir el tipo de visualización en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('geocercas-view-mode', viewMode);
  }, [viewMode]);
  
  // Memoizar manejadores para evitar recreaciones
  const handleViewGeocerca = useCallback((geocerca: Geocerca) => {
    setGeocercaSeleccionada(geocerca);
    setVistaAnterior(vistaActual);
    setVistaActual('detalle');
  }, [vistaActual]);
  
  const handleEditGeocerca = useCallback((geocerca: Geocerca) => {
    setGeocercaSeleccionada(geocerca);
    setVistaAnterior(vistaActual);
    setVistaActual('editar');
  }, [vistaActual]);
  
  // Muestra el modal de confirmación para eliminar
  const handleShowDeleteModal = useCallback((geocerca: Geocerca) => {
    setModalConfirmacion({
      isOpen: true,
      geocercaId: geocerca.id,
      geocercaNombre: geocerca.nombre
    });
  }, []);
  
  // Cerrar el modal de confirmación
  const handleCancelDelete = useCallback(() => {
    setModalConfirmacion({
      isOpen: false,
      geocercaId: '',
      geocercaNombre: ''
    });
  }, []);
  
  // Confirmar eliminación desde el modal
  const handleConfirmDelete = useCallback(() => {
    const geocercaId = modalConfirmacion.geocercaId;
    
    // Eliminar la geocerca de la lista
    setListaGeocercas(prev => prev.filter(g => g.id !== geocercaId));
    
    // Si estamos en la vista de detalle de la geocerca eliminada, volver a la lista
    if (vistaActual === 'detalle' && geocercaSeleccionada?.id === geocercaId) {
      setVistaActual('lista');
    }
    
    // Cerrar el modal
    setModalConfirmacion({
      isOpen: false,
      geocercaId: '',
      geocercaNombre: ''
    });
  }, [modalConfirmacion.geocercaId, vistaActual, geocercaSeleccionada]);
  
  const handleCreateGeocerca = useCallback(() => {
    setGeocercaSeleccionada(null);
    setVistaAnterior(vistaActual);
    setVistaActual('crear');
  }, [vistaActual]);
  
  const handleSaveGeocerca = useCallback((geocerca: Geocerca) => {
    if (vistaActual === 'crear') {
      // Agregar nueva geocerca
      setListaGeocercas(prev => [...prev, geocerca]);
    } else {
      // Actualizar geocerca existente
      setListaGeocercas(prev => 
        prev.map(g => g.id === geocerca.id ? geocerca : g)
      );
    }
    
    // Volver a la vista de detalle con la geocerca actualizada
    setGeocercaSeleccionada(geocerca);
    setVistaActual('detalle');
  }, [vistaActual]);
  
  const handleCancelEdicion = useCallback(() => {
    // Siempre volver a la vista anterior
    setVistaActual(vistaAnterior);
  }, [vistaAnterior]);
  
  const handleVolverALista = useCallback(() => {
    setVistaActual('lista');
  }, []);
  
  // Cambiar modo de visualización
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);
  
  // Función para crear las columnas que usa handlers de clic en lugar de navegación
  const createGeocercaColumns = useCallback(() => [
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleViewGeocerca(row.original)}>
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
      header: "Acciones",
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
                handleViewGeocerca(geocerca);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleEditGeocerca(geocerca);
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
                handleShowDeleteModal(geocerca);
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )
      },
    },
  ] as ColumnDef<Geocerca>[], [handleViewGeocerca, handleEditGeocerca, handleShowDeleteModal]);

  // Memoizar las columnas para evitar recreaciones constantes
  const columns = useMemo(() => createGeocercaColumns(), [createGeocercaColumns]);

  // Memoizar las geocercas filtradas
  const geocercasFiltradas = useMemo(() => {
    // Buscar primero, filtrar después
    const geocercasBuscadas = listaGeocercas.filter(g => {
      if (!searchQuery) return true;
      
      // Búsqueda insensible a mayúsculas/minúsculas
      const query = searchQuery.toLowerCase();
      return (
        g.nombre.toLowerCase().includes(query) ||
        g.sede.toLowerCase().includes(query) ||
        g.direccion.toLowerCase().includes(query)
      );
    });

    // Filtrar geocercas según el estado seleccionado
    return geocercasBuscadas.filter(g => {
      if (filtroEstado === "todos") return true;
      if (filtroEstado === "activas") return g.estado === "Activa";
      if (filtroEstado === "inactivas") return g.estado === "Inactiva";
      return true;
    });
  }, [listaGeocercas, searchQuery, filtroEstado]);

  // Memoizar contadores para evitar cálculos innecesarios
  const contadores = useMemo(() => {
    const totalActivas = listaGeocercas.filter(g => g.estado === "Activa").length;
    const totalInactivas = listaGeocercas.filter(g => g.estado === "Inactiva").length;
    return { totalActivas, totalInactivas };
  }, [listaGeocercas]);

  // Renderizado condicional según la vista actual
  if (vistaActual === 'detalle' && geocercaSeleccionada) {
    return (
      <div className="container mx-auto py-6">
        <GeocercaDetalle 
          geocerca={geocercaSeleccionada}
          onBack={handleVolverALista}
          onEdit={handleEditGeocerca}
          onDelete={handleShowDeleteModal}
        />
        
        {/* Modal de confirmación */}
        <ConfirmModal 
          deviceName={modalConfirmacion.geocercaNombre}
          onDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isOpen={modalConfirmacion.isOpen}
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

      <Tabs value={filtroEstado} onValueChange={(value) => setFiltroEstado(value as any)}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="activas">
              Activas <Badge className="ml-2 bg-green-100 text-green-800">{contadores.totalActivas}</Badge>
            </TabsTrigger>
            <TabsTrigger value="inactivas">
              Inactivas <Badge className="ml-2 bg-gray-100 text-gray-800">{contadores.totalInactivas}</Badge>
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
            
            {/* Botón de alternancia de vistas y filtros */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {viewMode === 'table' ? 'Modo Lista' : 'Modo Tarjetas'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem 
                  onClick={() => handleViewModeChange('table')}
                  className={viewMode === 'table' ? 'bg-gray-100' : ''}
                >
                  Vista Lista
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleViewModeChange('grid')}
                  className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                >
                  Vista Tarjetas
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Renderizado condicional basado en el tipo de visualización */}
        <TabsContent value={filtroEstado}>
          <Card>
            <CardContent className={viewMode === 'table' ? "p-0" : ""}>
              {viewMode === 'table' ? (
                <DataTable
                  columns={columns}
                  data={geocercasFiltradas}
                  searchQuery={searchQuery}
                />
              ) : (
                <GeocercaGridView 
                  geocercas={geocercasFiltradas}
                  onView={handleViewGeocerca}
                  onEdit={handleEditGeocerca}
                  onDelete={handleShowDeleteModal}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Modal de confirmación */}
      <ConfirmModal 
        deviceName={modalConfirmacion.geocercaNombre}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isOpen={modalConfirmacion.isOpen}
      />
    </div>
  );
}