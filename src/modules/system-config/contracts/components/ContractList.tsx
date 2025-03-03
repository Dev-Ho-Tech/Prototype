import React, { useState } from 'react';
import { Search, Filter, FileText, Clock, Calendar, Users, Briefcase, CheckSquare, XSquare } from 'lucide-react';
import { ContractListProps, ContractType } from '../interfaces/types';

export const ContractList: React.FC<ContractListProps> = ({
  contracts,
  onSelect,
  onSearch,
  onFilterByType
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    onFilterByType(value);
  };

  const getTypeColor = (type: ContractType) => {
    switch (type) {
      case ContractType.FIXED:
        return 'bg-blue-100 text-blue-800';
      case ContractType.TEMPORARY:
        return 'bg-amber-100 text-amber-800';
      case ContractType.INTERNSHIP:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: ContractType) => {
    switch (type) {
      case ContractType.FIXED:
        return 'Fijo';
      case ContractType.TEMPORARY:
        return 'Temporal';
      case ContractType.INTERNSHIP:
        return 'Pasantía';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o código"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos los tipos</option>
            <option value={ContractType.FIXED}>Fijo</option>
            <option value={ContractType.TEMPORARY}>Temporal</option>
            <option value={ContractType.INTERNSHIP}>Pasantía</option>
          </select>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelect(contract)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {contract.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Código: {contract.code}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  getTypeColor(contract.type)
                }`}>
                  {getTypeLabel(contract.type)}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">Duración</span>
                  </div>
                  <span className="font-medium">{contract.duration || 'Indefinido'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">Horas semanales</span>
                  </div>
                  <span className="font-medium">{contract.workingHours.perWeek}h</span>
                </div>
                {contract.employeeCount !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500">Empleados</span>
                    </div>
                    <span className="font-medium">{contract.employeeCount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500">Horas extras</span>
                  </div>
                  {contract.overtimeAllowed ? (
                    <CheckSquare className="w-4 h-4 text-green-500" />
                  ) : (
                    <XSquare className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(contract);
                  }}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};