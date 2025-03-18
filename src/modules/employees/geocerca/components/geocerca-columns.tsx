import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MapPin, Edit, Trash, Eye } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Geocerca } from "../interfaces/Geocerca"

// Función para crear las columnas con manejadores de eventos
export const createGeocercaColumns = (
  onView: (geocerca: Geocerca) => void,
  onEdit: (geocerca: Geocerca) => void,
  onDelete: (geocerca: Geocerca) => void
): ColumnDef<Geocerca>[] => [
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
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
            onClick={() => onView(geocerca)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(geocerca)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-700"
            onClick={() => onDelete(geocerca)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]