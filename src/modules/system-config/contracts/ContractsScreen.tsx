import{ useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Contract,} from './interfaces/types';
import { contractsData, scheduleLimitGroups } from './data';
import { ContractList } from './components/ContractList';
import { ContractForm } from './components/ContractForm';
import { ContractDetail } from './components/ContractDetail';

enum ScreenMode {
  LIST = 'LIST',
  ADD = 'ADD',
  EDIT = 'EDIT',
  DETAIL = 'DETAIL'
}

export function ContractsScreen() {
  // Estado para los contratos
  const [contracts, setContracts] = useState<Contract[]>(contractsData);
  
  // Estado para el modo de pantalla
  const [screenMode, setScreenMode] = useState<ScreenMode>(ScreenMode.LIST);
  
  // Estado para el contrato seleccionado
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  
  // Estado para filtros
  const [filteredContracts, setFilteredContracts] = useState<Contract[]>(contracts);
  
  // Actualizar contratos filtrados cuando cambia la lista de contratos
  useEffect(() => {
    setFilteredContracts(contracts);
  }, [contracts]);

  // Manejadores de eventos
  const handleAddContract = () => {
    setSelectedContract(null);
    setScreenMode(ScreenMode.ADD);
  };

  const handleEditContract = () => {
    if (selectedContract) {
      setScreenMode(ScreenMode.EDIT);
    }
  };

  const handleSelectContract = (contract: Contract) => {
    setSelectedContract(contract);
    setScreenMode(ScreenMode.DETAIL);
  };

  const handleSaveContract = (contract: Contract) => {
    if (screenMode === ScreenMode.ADD) {
      setContracts([...contracts, contract]);
    } else if (screenMode === ScreenMode.EDIT && selectedContract) {
      setContracts(
        contracts.map(c => (c.id === contract.id ? contract : c))
      );
    }
    
    setSelectedContract(null);
    setScreenMode(ScreenMode.LIST);
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredContracts(contracts);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = contracts.filter(
      contract => 
        contract.name.toLowerCase().includes(term) ||
        contract.code.toLowerCase().includes(term)
    );
    
    setFilteredContracts(filtered);
  };

  const handleFilterByType = (type: string) => {
    if (type === 'all') {
      setFilteredContracts(contracts);
      return;
    }
    
    const filtered = contracts.filter(
      contract => contract.type === type
    );
    
    setFilteredContracts(filtered);
  };

  const handleBackToList = () => {
    setSelectedContract(null);
    setScreenMode(ScreenMode.LIST);
  };

  // Renderizado condicional según el modo de pantalla
  const renderContent = () => {
    switch (screenMode) {
      case ScreenMode.ADD:
      case ScreenMode.EDIT:
        return (
          <ContractForm
            contract={screenMode === ScreenMode.EDIT ? selectedContract || undefined : undefined}
            scheduleLimitGroups={scheduleLimitGroups}
            onSave={handleSaveContract}
            onCancel={handleBackToList}
          />
        );
      case ScreenMode.DETAIL:
        return selectedContract ? (
          <ContractDetail
            contract={selectedContract}
            onEdit={handleEditContract}
            onBack={handleBackToList}
          />
        ) : null;
      case ScreenMode.LIST:
      default:
        return (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Contratos</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Gestiona los tipos de contratos y sus condiciones
                </p>
              </div>
              <button
                onClick={handleAddContract}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Nuevo Contrato</span>
              </button>
            </div>

            <ContractList
              contracts={filteredContracts}
              onSelect={handleSelectContract}
              onAdd={handleAddContract}
              onSearch={handleSearch}
              onFilterByType={handleFilterByType}
            />
          </>
        );
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        {renderContent()}
      </div>
    </div>
  );
}