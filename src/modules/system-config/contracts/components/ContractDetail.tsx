/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ContractDetailProps } from '../interfaces/types';
import { scheduleLimitGroups } from '../data';
import { ContractEditForm } from './contract_form/ContractEditForm';

export const ContractDetail: React.FC<ContractDetailProps & { 
  onSave?: (contract: any) => void;
  isEditMode?: boolean;
}> = ({
  contract,
  onEdit,
  onBack,
  onSave,
  isEditMode = false
}) => {
  // Si estamos en modo edición, mostrar el formulario de edición
  if (isEditMode && onSave) {
    return (
      <ContractEditForm
        contract={contract}
        onEdit={onEdit}
        onBack={onBack}
        onSave={onSave}
        scheduleLimitGroups={scheduleLimitGroups}
        isEditMode={true}
      />
    );
  }

  // Si no estamos en modo edición, mostrar el formulario de edición en modo lectura
  return (
    <ContractEditForm
      contract={contract}
      onEdit={onEdit}
      onBack={onBack}
      onSave={() => {}}
      scheduleLimitGroups={scheduleLimitGroups}
      isEditMode={false}
    />
  );
};