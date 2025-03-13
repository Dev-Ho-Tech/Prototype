// src/modules/reports/components/ReportCard.tsx
import React from 'react';
import { ReportCategory } from '../interfaces/Report';
import { useNavigate } from 'react-router-dom';

interface ReportCardProps {
  category: ReportCategory;
}

const ReportCard: React.FC<ReportCardProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Usamos la ruta completa proporcionada
    navigate(category.path);
  };

  return (
    <div 
      className={`rounded-lg shadow-md p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:shadow-lg ${category.color} text-white h-48`}
      onClick={handleClick}
    >
      <div className="text-4xl mb-4">
        {/* Este sería reemplazado con un componente de icono real */}
        <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-center">{category.name}</h3>
    </div>
  );
};

export default ReportCard;