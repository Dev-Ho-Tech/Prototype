import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

// Types and mock data
import { EmailTemplate, FilterState } from './interface/types';
import { mockTemplates } from './temp/mockData';

// Components
import Modal from './components/Modal';
import ConfirmDialog from './components/ConfirmDialog';
import TemplateForm from './components/TemplateForm';
// import { useToast } from './components/toast-context';

const EmailTemplatesPage: React.FC = () => {
  // State management
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Partial<EmailTemplate>>({});
  const [filters, setFilters] = useState<FilterState>({ searchQuery: '', activeOnly: false });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  // Hooks
  // const { showToast } = useToast();

  // Load mock data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTemplates(mockTemplates);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         template.content.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesActiveFilter = filters.activeOnly ? template.active : true;
    return matchesSearch && matchesActiveFilter;
  });

  // Handlers
  const handleEditClick = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setSelectedTemplateId(template.id);
    setFormMode('edit');
    setIsEditModalOpen(true);
  };

  const handleNewClick = () => {
    setSelectedTemplate({ name: '', content: '', active: true });
    setFormMode('create');
    setIsNewModalOpen(true);
  };

  const handleDeleteClick = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setSelectedTemplateId(templateId);
      setIsDeleteConfirmOpen(true);
    }
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate.name || !selectedTemplate.content) {
      // showToast({
      //   title: "Error",
      //   description: "El nombre y contenido son obligatorios.",
      //   variant: "destructive"
      // });
      return;
    }

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      if (formMode === 'create') {
        // Create new template
        const newId = (Math.max(...templates.map(t => parseInt(t.id))) + 1).toString();
        const newTemplate: EmailTemplate = {
          id: newId,
          name: selectedTemplate.name!,
          content: selectedTemplate.content!,
          active: selectedTemplate.active ?? true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setTemplates([...templates, newTemplate]);
        // showToast({
        //   title: "Plantilla creada",
        //   description: "La plantilla ha sido creada correctamente.",
        //   variant: "success"
        // });
        setIsNewModalOpen(false);
      } else {
        // Update existing template
        if (!selectedTemplateId) return;
        
        const updatedTemplates = templates.map(template => 
          template.id === selectedTemplateId ? 
            { ...template, ...selectedTemplate, updatedAt: new Date().toISOString() } : 
            template
        );
        
        setTemplates(updatedTemplates);

        // showToast({
        //   title: "Plantilla actualizada",
        //   description: "La plantilla ha sido actualizada correctamente.",
        //   variant: "success"
        // });

        setIsEditModalOpen(false);
      }
      
      setIsSaving(false);
      setSelectedTemplate({});
      setSelectedTemplateId(null);
    }, 600);
  };

  const handleDeleteTemplate = () => {
    if (!selectedTemplateId) return;
    
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedTemplates = templates.filter(template => template.id !== selectedTemplateId);
      setTemplates(updatedTemplates);
      
      // Clear selected rows if the deleted template was selected
      if (selectedRows.includes(selectedTemplateId)) {
        setSelectedRows(selectedRows.filter(id => id !== selectedTemplateId));
      }
      
      // showToast({
      //   title: "Plantilla eliminada",
      //   description: "La plantilla ha sido eliminada correctamente.",
      //   variant: "success"
      // });
      
      setIsDeleting(false);
      setIsDeleteConfirmOpen(false);
      setSelectedTemplateId(null);
    }, 600);
  };

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(filteredTemplates.map(template => template.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleToggleSelect = (templateId: string) => {
    if (selectedRows.includes(templateId)) {
      setSelectedRows(selectedRows.filter(id => id !== templateId));
    } else {
      setSelectedRows([...selectedRows, templateId]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    
    // In a real application, you might want to show a confirmation dialog here
    const updatedTemplates = templates.filter(template => !selectedRows.includes(template.id));
    setTemplates(updatedTemplates);
    
    // showToast({
    //   title: "Plantillas eliminadas",
    //   description: `Se han eliminado ${selectedRows.length} plantillas.`,
    //   variant: "success"
    // });
    
    setSelectedRows([]);
  };

  // Render edit/create template modal
  const renderTemplateModal = (isOpen: boolean, onClose: () => void, mode: 'create' | 'edit') => {
    const title = mode === 'create' ? 'Crear Nueva Plantilla' : 'Editar Plantilla de Email';
    const buttonText = mode === 'create' ? 'Crear Plantilla' : 'Guardar Cambios';
    
    const footer = (
      <div className="flex justify-end gap-3">
        {mode === 'edit' && (
          <button
            type="button"
            onClick={() => {
              if (selectedTemplateId) {
                handleDeleteClick(selectedTemplateId);
              }
            }}
            className="px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Eliminar
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSaving}
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleSaveTemplate}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSaving || !selectedTemplate.name || !selectedTemplate.content}
        >
          {isSaving ? (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>
    );

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size="lg"
        footer={footer}
      >
        <TemplateForm
          template={selectedTemplate}
          onTemplateChange={setSelectedTemplate}
          isEditing={isSaving}
          formMode={mode}
        />
      </Modal>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plantillas de Email</h1>
          <p className="mt-1 text-sm text-gray-500">Gestiona las plantillas de notificaciones por email</p>
        </div>
        <button
          onClick={handleNewClick}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="mr-2 -ml-1 h-5 w-5" />
          Nueva Plantilla
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
            placeholder="Buscar en plantillas de notificaciones"
            className="pl-10 pr-10 py-2 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters({...filters, searchQuery: ''})}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              id="active-only"
              type="checkbox"
              checked={filters.activeOnly}
              onChange={(e) => setFilters({...filters, activeOnly: e.target.checked})}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="active-only" className="ml-2 text-sm text-gray-700">
              Solo activas
            </label>
          </div>
          
          {selectedRows.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="mr-1.5 -ml-0.5 h-4 w-4" />
              Eliminar ({selectedRows.length})
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredTemplates.length && filteredTemplates.length > 0}
                      onChange={handleToggleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre de plantilla
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actualización
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTemplates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                      {filters.searchQuery ? (
                        <div>
                          <p className="font-medium">No se encontraron plantillas que coincidan con tu búsqueda</p>
                          <p className="mt-1">Intenta con otros términos o elimina los filtros</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium">No hay plantillas disponibles</p>
                          <p className="mt-1">Crea una nueva plantilla para comenzar</p>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredTemplates.map((template) => (
                    <tr 
                      key={template.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleEditClick(template)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(template.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleToggleSelect(template.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {template.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {template.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.active ? (
                            <>
                              <CheckCircle className="mr-1.5 h-3 w-3 text-green-500" />
                              Activo
                            </>
                          ) : (
                            <>
                              <AlertCircle className="mr-1.5 h-3 w-3 text-gray-500" />
                              Inactivo
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {template.updatedAt ? new Date(template.updatedAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(template);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(template.id);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {renderTemplateModal(isNewModalOpen, () => setIsNewModalOpen(false), 'create')}
      {renderTemplateModal(isEditModalOpen, () => setIsEditModalOpen(false), 'edit')}
      
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteTemplate}
        title="¿Estás seguro?"
        message={`Esta acción no se puede deshacer. Esto eliminará permanentemente la plantilla "${selectedTemplate.name}".`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        variant="danger"
        confirmInProgress={isDeleting}
      />
    </div>
  );
};

export default EmailTemplatesPage;