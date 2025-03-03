export interface Employee {
  initial?: string;
  name?: string;
  position?: string;
  department?: string;
  location?: string;
  id?: string;
}

export interface EmployeeHeaderProps {
  employee: Employee | null;
  onClose: () => void;
}

export interface PersonalData {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  genero: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
}

// Interface para datos laborales del formulario
export interface LaborData {
  codigo: string;
  modalidadTiempo: string;
  fechaInicialContrato: string;
  fechaFinalContrato: string;
  empresa: string;
  sede: string;
  tipoPlanificacion: string;
  cargo: string;
  perfilesMarcaje: string;
}

// Props para los componentes de formulario
export interface EmployeeProfileHeaderProps {
  employee: Employee | null;
  onClose: () => void;
}

// Props para el componente principal
export interface EmployeeProfileProps {
  employee: Employee | null;
  onClose: () => void;
  onSave?: (data: { personalData: PersonalData; laborData: LaborData }) => void;
}

// Props para formulario de datos personales
export interface PersonalDataFormProps {
  personalData: PersonalData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// Props para formulario de datos laborales
export interface LaborDataFormProps {
  laborData: LaborData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

// Props para los botones de acción
export interface ActionButtonsProps {
  onSave: () => void;
  onCancel: () => void;
}

export interface ExtendedHeaderProps extends EmployeeProfileHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}