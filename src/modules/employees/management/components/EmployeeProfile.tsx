import React, { useState } from 'react';
import { EmployeeHeader } from './EmployeeProfile/EmployeeHeader';
import { PersonalDataForm } from './EmployeeProfile/PersonalDataForm';
import { LaborDataForm } from './EmployeeProfile/LaborDataForm';
import { ActionButtons } from './EmployeeProfile/ActionButtons';
import { Employee, LaborData, PersonalData } from '../interface/types';

interface EmployeeProfileProps {
  employee: Employee | null;
  onClose: () => void;
  onSave?: (data: { personalData: PersonalData; laborData: LaborData }) => void;
}

export const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee, onClose, onSave }) => {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState<string>('personal');
  
  // Estados para los datos del formulario
  const [personalData, setPersonalData] = useState<PersonalData>({
    primerNombre: employee?.name?.split(' ')[0] || '',
    segundoNombre: employee?.name?.split(' ')?.[1] || '',
    primerApellido: employee?.name?.split(' ')?.[2] || '',
    segundoApellido: employee?.name?.split(' ')?.[3] || '',
    genero: 'Mujer',
    tipoDocumento: 'Cédula',
    numeroDocumento: employee?.id || '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
  });

  const [laborData, setLaborData] = useState<LaborData>({
    codigo: '',
    modalidadTiempo: '002-Operativo',
    fechaInicialContrato: '',
    fechaFinalContrato: '',
    empresa: 'Emp - Caldelpa S.a.',
    sede: employee?.location || '',
    tipoPlanificacion: '',
    cargo: employee?.position || '',
    perfilesMarcaje: 'Principal',
  });

  // Manejadores de eventos
  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalData(prev => ({ ...prev, [name]: value }));
  };

  const handleLaborDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLaborData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ personalData, laborData });
    }
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cabecera del Empleado */}
      <EmployeeHeader 
        employee={employee} 
        onClose={onClose}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="p-6">
        {/* Componente activo según la pestaña seleccionada */}
        {activeTab === 'personal' ? (
          <PersonalDataForm personalData={personalData} onChange={handlePersonalDataChange} />
        ) : (
          <LaborDataForm laborData={laborData} onChange={handleLaborDataChange} />
        )}
        
        {/* Botones de Acción siempre visibles */}
        <div className="mt-6">
          <ActionButtons onSave={handleSave} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
};