import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, X } from 'lucide-react';
import { CheckProfile } from '../interfaces/CheckProfile';

interface ExportProfilesProps {
  profiles: CheckProfile[];
  isOpen: boolean;
  onClose: () => void;
}

const ExportProfiles: React.FC<ExportProfilesProps> = ({ profiles, isOpen, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'pdf'>('excel');

  if (!isOpen) return null;

  const handleExport = async () => {
    try {
      setIsExporting(true);
      // Aquí iría la lógica real de exportación
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulamos proceso de exportación
      
      // Crear un mensaje de éxito que indique cuántos perfiles se exportaron
      alert(`Se han exportado ${profiles.length} perfiles en formato ${exportFormat.toUpperCase()}`);
      
      onClose();
    } catch (error) {
      console.error('Error exporting profiles:', error);
      alert('Ocurrió un error al exportar los perfiles');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Exportar perfiles de marcaje
              </h3>
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Se exportarán {profiles.length} perfiles. Selecciona el formato de exportación:
            </p>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                exportFormat === 'excel' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="exportFormat"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={() => setExportFormat('excel')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <FileSpreadsheet className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Excel (.xlsx)</p>
                    <p className="text-xs text-gray-500">Compatible con Microsoft Excel y otras hojas de cálculo</p>
                  </div>
                </div>
              </label>
              
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                exportFormat === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="exportFormat"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <FileText className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">CSV (.csv)</p>
                    <p className="text-xs text-gray-500">Formato simple de texto para datos tabulares</p>
                  </div>
                </div>
              </label>
              
              <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                exportFormat === 'pdf' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="exportFormat"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={() => setExportFormat('pdf')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex items-center">
                  <FileText className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">PDF (.pdf)</p>
                    <p className="text-xs text-gray-500">Ideal para imprimir o compartir como documento</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                isExporting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </>
              )}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
              disabled={isExporting}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportProfiles;