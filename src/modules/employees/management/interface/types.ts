// //Interface de EmployeeManagementScreen
// import { ReactNode } from "react";

// export interface Employee {
//   primerNombre?: string;
//   segundoNombre?: string;
//   primerApellido?: string;
//   segundoApellido?: string;
//   genero?: string;
//   tipoDocumento?: string;
//   numeroDocumento?: string;
//   fechaNacimiento?: string;
//   telefono?: string;
//   correo?: string;
//   permitirVisitas?: boolean;
//   codigo?: string;
//   modalidadTiempo?: string;
//   fechaInicialContrato?: string;
//   fechaFinalContrato?: string;
//   empresa?: string;
//   sede?: string;
//   tipoPlanificacion?: string;
//   cargo?: string;
//   perfilesMarcaje?: string[];
//   profileImage?: string;
//   name?: string;
//   position?: string;
//   department?: string;
//   initial?: string;
//   section: string;
//   unit?: string;
//   method: string;
//   id: string;
//   status?: 'active' | 'inactive';
//   email?: string;
//   phone?: string;
//   startDate?: string;
//   location?: string;
// }

// export interface EmployeeHeaderProps {
//   employee: Employee | null;
//   onClose: () => void;
// }

// export interface PersonalData {
//   primerNombre: string;
//   segundoNombre: string;
//   primerApellido: string;
//   segundoApellido: string;
//   genero: string;
//   tipoDocumento: string;
//   numeroDocumento: string;
//   fechaNacimiento: string;
//   telefono: string;
//   correo: string;
//   laborData?: {
//     codigo?: string;
//     modalidadTiempo?: string;
//     fechaInicialContrato?: string;
//     fechaFinalContrato?: string;
//     empresa?: string;
//     sede?: string;

//   };
// }

// // Interface para datos laborales del formulario
// export interface LaborData {
//   codigo: string;
//   modalidadTiempo: string;
//   fechaInicialContrato: string;
//   fechaFinalContrato: string;
//   empresa: string;
//   sede: string;
//   tipoPlanificacion: string;
//   cargo: string;
//   perfilesMarcaje: string;
// }

// // export interface TreeNodeData {
// //   id: string;
  
// //   name: string;
// //   manager: string;
// //   employeeCount: number;
// //   icon: JSX.Element;
// //   color: string;
// //   type: string;
// //   expanded?: boolean;
// //   children: TreeNodeData[];
  
// // }
// // export interface TreeNodeData {
// //   id: string;
// //   name: string;
// //   expanded?: boolean;
// //   children: TreeNodeData[];
// //   manager?: string;
// //   employeeCount?: number;
// //   icon?: React.ReactNode;
// //   color?: string;
// //   type?: string;
// // }

// // Props para los componentes de formulario
// export interface EmployeeProfileHeaderProps {
//   employee: Employee | null;
//   onClose: () => void;
// }

// // Props para el componente principal
// export interface EmployeeProfileProps {
//   employee: Employee | null;
//   onClose: () => void;
//   onSave?: (data: { personalData: PersonalData; laborData: LaborData }) => void;
// }

// // Props para formulario de datos personales
// export interface PersonalDataFormProps {
//   personalData: PersonalData;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

// // Props para formulario de datos laborales
// export interface LaborDataFormProps {
//   laborData: LaborData;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
// }

// export interface ActionButtonsProps {
//   onSave: () => void;
//   onCancel: () => void;
// }

// export interface ExtendedHeaderProps extends EmployeeProfileHeaderProps {
//   activeTab?: string;
//   onTabChange?: (tab: string) => void;
//   onProfileImageChange?: (file: File, imageUrl: string) => void;
// }



// export interface LocationSelection {
//   id: string;
//   name: string;
//   path?: string;
// }

// export interface TreeNodeProps {
//   node: TreeNodeData;
//   level?: number;
//   selectedLocations: string[];
//   onToggleSelect: (nodeId: string) => void;
//   searchTerm: string;
// }

// export interface StructureModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelectLocations?: (selectedLocations: LocationSelection[]) => void;
//   initialSelectedLocations?: string[];
// }

// export interface TreeNodeData {
//   id: string;
//   name: string;
//   type?: string;
//   manager?: string;
//   employeeCount?: number;
//   icon?: ReactNode;
//   color?: string;
//   expanded?: boolean;
//   children: TreeNodeData[];
// }

// export interface TreeNodeProps {
//   node: TreeNodeData;
//   level?: number;
//   selectedLocations: string[];
//   onToggleSelect: (nodeId: string) => void;
//   searchTerm: string;
// }

// export interface LocationSelection {
//   id: string;
//   name: string;
//   type?: string;
//   manager?: string;
//   employeeCount?: number;
// }

// export interface StructureModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelectLocations?: (locations: LocationSelection[]) => void;
//   initialSelectedLocations?: string[];
// }