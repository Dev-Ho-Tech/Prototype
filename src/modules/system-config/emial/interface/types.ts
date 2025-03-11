// Interfaces para plantillas de email
export interface EmailTemplate {
  id: string;
  name: string;
  content: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Tipo para formulario de nueva plantilla
export type NewEmailTemplateForm = Omit<EmailTemplate, "id">;

// Interfaz para toast
export interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'success' | 'destructive';
}

// Interfaz para etiquetas de plantilla
export interface TemplateTag {
  id: string;
  name: string;
  value: string;
}

// Interfaz para props de componentes
export interface EmailTemplateTagProps {
  tags: TemplateTag[];
  onTagClick: (tag: TemplateTag) => void;
}

// Estado global para filtros y búsqueda
export interface FilterState {
  searchQuery: string;
  activeOnly: boolean;
}