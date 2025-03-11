import { EmailTemplate, TemplateTag } from '../interface/types';

// Datos de ejemplo para las plantillas de email
export const mockTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Acceso Autorizado",
    content: "Estimado {{person}}, su acceso por el {{device}} ha sido autorizado.",
    active: true,
    createdAt: "2024-02-15T10:30:00Z",
    updatedAt: "2024-02-16T08:15:00Z"
  },
  {
    id: "2",
    name: "Acceso No Autorizado",
    content: "Estimado {{person}}, su acceso por el {{device}} ha sido rechazado.",
    active: true,
    createdAt: "2024-02-15T11:45:00Z",
    updatedAt: "2024-02-16T09:30:00Z"
  },
  {
    id: "3",
    name: "Acceso No Reconocido",
    content: "Se ha detectado un intento de acceso no reconocido desde {{device}}.",
    active: true,
    createdAt: "2024-02-15T14:20:00Z",
    updatedAt: "2024-02-17T16:10:00Z"
  },
  {
    id: "4",
    name: "Dispositivo Conectado",
    content: "Su dispositivo {{device}} ha sido conectado exitosamente a las {{time}}.",
    active: true,
    createdAt: "2024-02-16T09:15:00Z",
    updatedAt: "2024-02-18T11:25:00Z"
  },
  {
    id: "5",
    name: "Dispositivo Desconectado",
    content: "Su dispositivo {{device}} ha sido desconectado a las {{time}}.",
    active: true,
    createdAt: "2024-02-17T13:40:00Z",
    updatedAt: "2024-02-19T10:45:00Z"
  },
  {
    id: "6",
    name: "Recepción De Visita",
    content: "Tiene una visita de {{person}} esperando en recepción desde las {{time}}.",
    active: true,
    createdAt: "2024-02-18T15:30:00Z",
    updatedAt: "2024-02-20T08:50:00Z"
  },
  {
    id: "7",
    name: "Recordatorio de Reunión",
    content: "Le recordamos su reunión programada para hoy a las {{time}} en {{location}}.",
    active: false,
    createdAt: "2024-02-19T11:20:00Z",
    updatedAt: "2024-02-21T14:35:00Z"
  },
  {
    id: "8",
    name: "Alerta de Seguridad",
    content: "Se ha detectado un comportamiento inusual en su cuenta. Por favor contacte con seguridad.",
    active: false,
    createdAt: "2024-02-20T16:45:00Z",
    updatedAt: "2024-02-22T09:15:00Z"
  }
];

// Etiquetas disponibles para las plantillas
export const availableTags: TemplateTag[] = [
  { id: "1", name: "Fecha", value: "date" },
  { id: "2", name: "Hora", value: "time" },
  { id: "3", name: "Usuario", value: "person" },
  { id: "4", name: "Documento", value: "document" },
  { id: "5", name: "Empresa", value: "company" },
  { id: "6", name: "Estructura", value: "structure" },
  { id: "7", name: "Dispositivo", value: "device" },
  { id: "8", name: "Ubicación", value: "location" }
];