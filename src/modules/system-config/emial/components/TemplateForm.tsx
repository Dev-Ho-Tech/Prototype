import React, { useEffect, useRef } from 'react';
import { EmailTemplate, TemplateTag } from '../interface/types';
import TemplateTagList from './TemplateTag';
import { availableTags } from '../temp/mockData';

interface TemplateFormProps {
  template: Partial<EmailTemplate>;
  onTemplateChange: (updatedTemplate: Partial<EmailTemplate>) => void;
  isEditing: boolean;
  formMode: 'create' | 'edit';
}

const TemplateForm: React.FC<TemplateFormProps> = ({ 
  template, 
  onTemplateChange, 
  // isEditing,
  formMode
}) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleTagClick = (tag: TemplateTag) => {
    if (!contentRef.current) return;
    
    const tagToInsert = `{{${tag.value}}}`;
    const textarea = contentRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    
    const newContent = 
      template.content?.substring(0, startPos) + 
      tagToInsert + 
      template.content?.substring(endPos) || tagToInsert;
    
    onTemplateChange({ ...template, content: newContent });
    
    // Set focus back with cursor after the inserted tag
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = startPos + tagToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };
  
  // Focus the name input when creating a new template
  useEffect(() => {
    if (formMode === 'create' && !template.id) {
      const nameInput = document.getElementById('template-name');
      if (nameInput) {
        nameInput.focus();
      }
    }
  }, [formMode, template.id]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="template-name" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de plantilla <span className="text-red-500">*</span>
        </label>
        <input
          id="template-name"
          type="text"
          value={template.name || ''}
          onChange={(e) => onTemplateChange({ ...template, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: Notificación de Acceso"
          required
        />
      </div>
      
      <div>
        <label htmlFor="template-content" className="block text-sm font-medium text-gray-700 mb-1">
          Contenido <span className="text-red-500">*</span>
        </label>
        <textarea
          id="template-content"
          ref={contentRef}
          value={template.content || ''}
          onChange={(e) => onTemplateChange({ ...template, content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={5}
          placeholder="Escribe el contenido de la plantilla..."
          required
        />
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Etiquetas disponibles:</p>
          <TemplateTagList tags={availableTags} onTagClick={handleTagClick} />
        </div>
      </div>
      
      <div className="flex items-center">
        <label htmlFor="template-active" className="block text-sm font-medium text-gray-700 mr-3">
          Estado
        </label>
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input
            id="template-active"
            type="checkbox"
            checked={template.active !== undefined ? template.active : true}
            onChange={(e) => onTemplateChange({ ...template, active: e.target.checked })}
            className="sr-only"
          />
          <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
          <div 
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${
              template.active ? 'translate-x-4' : 'translate-x-0'
            }`}
          ></div>
        </div>
        <span className={`text-sm ${template.active ? 'text-green-600' : 'text-gray-500'}`}>
          {template.active ? 'Activo' : 'Inactivo'}
        </span>
      </div>
    </div>
  );
};

export default TemplateForm;