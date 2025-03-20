/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import { 
  Upload, 
  UploadCloud, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileSpreadsheet, 
  RefreshCw, 
  Clock,
  Info,
  Database 
} from 'lucide-react';

const MassUpdateReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'mass-update' });

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedTemplate, setSelectedTemplate] = useState<'complete' | 'common' | 'personal'>('complete');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'download' | 'upload' | 'history'>('download');
  const [changeType, setChangeType] = useState<'company' | 'department' | 'position' | 'salary' | 'custom'>('company');

  // Función para descargar datos en Excel
  const handleDownloadData = () => {
    exportReport('excel');
  };

  // Simular carga de archivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploadedFile(file);
    setUploadStatus('uploading');
    
    // Simular procesamiento del archivo
    setTimeout(() => {
      // Generar datos de previsualización de ejemplo para cambio de nombre de compañía
      const mockPreviewData = [
        { id: '100', name: 'Juan', lastName: 'Pérez', company: 'Marco Timana Soluciones SAC', newValue: 'TimanaTech', status: 'valid' },
        { id: '101', name: 'María', lastName: 'Gómez', company: 'Marco Timana Soluciones SAC', newValue: 'TimanaTech', status: 'valid' },
        { id: '102', name: 'Carlos', lastName: 'López', company: 'Marco Timana Soluciones SAC', newValue: 'TimanaTech', status: 'valid' },
        { id: '103', name: 'Ana', lastName: 'Martínez', company: 'Otra Empresa S.A.', newValue: 'Otra Empresa S.A.', status: 'warning' },
        { id: '104', name: 'Roberto', lastName: 'Sánchez', company: 'Marco Timana Soluciones SAC', newValue: 'TimanaTech', status: 'valid' },
      ];
      
      setPreviewData(mockPreviewData);
      setUploadStatus('success');
    }, 1500);
  };

  // Historial de actualizaciones (simulado)
  const updateHistory = [
    { id: '1', fileName: 'actualizacion_empresa.xlsx', date: new Date('2025-03-10T14:30:00'), user: 'admin@empresa.com', records: 45, fieldUpdated: 'Empresa', status: 'completed' },
    { id: '2', fileName: 'actualizacion_salarios.csv', date: new Date('2025-03-05T09:15:00'), user: 'rrhh@empresa.com', records: 12, fieldUpdated: 'Salario', status: 'completed' },
    { id: '3', fileName: 'actualizacion_departamentos.xlsx', date: new Date('2025-02-28T16:20:00'), user: 'admin@empresa.com', records: 28, fieldUpdated: 'Departamento', status: 'completed' },
    { id: '4', fileName: 'actualizacion_cargos.csv', date: new Date('2025-02-15T11:45:00'), user: 'rrhh@empresa.com', records: 17, fieldUpdated: 'Cargo', status: 'error' },
  ];

  // Enviar datos para procesamiento
  const handleProcessData = () => {
    alert('Procesando actualización masiva...');
    
    // Aquí iría la lógica real de procesamiento de datos
    setTimeout(() => {
      alert('¡Actualización masiva completada con éxito!');
      setUploadedFile(null);
      setPreviewData([]);
      setUploadStatus('idle');
    }, 1500);
  };

  // Formatear fecha
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return (
    <ReportLayout
      title="Actualización Masiva de Datos"
      description="Modifica datos de empleados de manera masiva mediante archivos Excel"
      filter={filter}
      employees={employees}
      onFilterChange={updateFilter}
      exportFormats={['excel']}
      onExport={exportReport}
    >
      {/* Pestañas */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              className={`${
                activeTab === 'download'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('download')}
            >
              Descargar Datos
            </button>
            <button
              className={`${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('upload')}
            >
              Subir Actualización
            </button>
            <button
              className={`${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('history')}
            >
              Historial
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de la pestaña activa */}
      {activeTab === 'download' ? (
        <div className="mb-6 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start mb-6">
            <div className="bg-blue-100 p-3 rounded-lg flex items-start">
              <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Proceso de actualización masiva:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Descarga la plantilla con los datos actuales</li>
                  <li>Modifica los valores en Excel según necesites</li>
                  <li>Sube el archivo modificado en la pestaña "Subir Actualización"</li>
                  <li>Verifica los cambios y confirma la actualización</li>
                </ol>
              </div>
            </div>
          </div>
          
          <h2 className="text-lg font-medium text-gray-900 mb-4">Descargar datos para actualización</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Sección de plantillas */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Selecciona el conjunto de datos</h3>
              
              <div className="space-y-3">
                <div 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate === 'complete' 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTemplate('complete')}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Datos Completos</h4>
                    {selectedTemplate === 'complete' && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Incluye todos los campos disponibles para actualización masiva.
                  </p>
                </div>
                
                <div 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate === 'common' 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTemplate('common')}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Datos Comunes</h4>
                    {selectedTemplate === 'common' && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Incluye campos organizacionales: empresa, departamento, cargo.
                  </p>
                </div>
                
                <div 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate === 'personal' 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTemplate('personal')}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Datos Personales</h4>
                    {selectedTemplate === 'personal' && (
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Información básica y contacto: correo, teléfono, dirección.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Filtros adicionales */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Aplicar filtros (opcional)</h3>
              <p className="text-sm text-gray-500 mb-4">
                Puedes descargar datos de todos los empleados o aplicar filtros para trabajar con un subconjunto específico.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Departamento
                  </label>
                  <select
                    id="department"
                    className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
                  >
                    <option value="">Todos los departamentos</option>
                    <option>Ventas</option>
                    <option>Marketing</option>
                    <option>Recursos Humanos</option>
                    <option>Tecnología</option>
                    <option>Finanzas</option>
                  </select>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleDownloadData}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Descargar Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">Instrucciones para actualización</h3>
            <div className="prose prose-sm text-gray-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>No elimines ni agregues filas o columnas en el archivo Excel.</li>
                <li>Solo modifica los valores en las columnas que desees actualizar.</li>
                <li>No cambies los identificadores o códigos de empleado.</li>
                <li>Para modificaciones masivas, usa las funciones de Excel para editar múltiples celdas.</li>
                <li>Guarda el archivo en formato Excel (.xlsx) o CSV antes de subirlo.</li>
              </ul>
            </div>
          </div>
        </div>
      ) : activeTab === 'upload' ? (
        <div className="mb-6 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Subir Actualización</h2>
          
          {uploadStatus === 'idle' ? (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo de actualización</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div 
                    className={`p-3 border rounded-md cursor-pointer ${changeType === 'company' ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                    onClick={() => setChangeType('company')}
                  >
                    <div className="flex items-center">
                      {changeType === 'company' && <CheckCircle className="h-4 w-4 text-blue-500 mr-1.5" />}
                      <span className="font-medium">Empresa</span>
                    </div>
                  </div>
                  <div 
                    className={`p-3 border rounded-md cursor-pointer ${changeType === 'department' ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                    onClick={() => setChangeType('department')}
                  >
                    <div className="flex items-center">
                      {changeType === 'department' && <CheckCircle className="h-4 w-4 text-blue-500 mr-1.5" />}
                      <span className="font-medium">Departamento</span>
                    </div>
                  </div>
                  <div 
                    className={`p-3 border rounded-md cursor-pointer ${changeType === 'position' ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                    onClick={() => setChangeType('position')}
                  >
                    <div className="flex items-center">
                      {changeType === 'position' && <CheckCircle className="h-4 w-4 text-blue-500 mr-1.5" />}
                      <span className="font-medium">Cargo</span>
                    </div>
                  </div>
                  <div 
                    className={`p-3 border rounded-md cursor-pointer ${changeType === 'salary' ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                    onClick={() => setChangeType('salary')}
                  >
                    <div className="flex items-center">
                      {changeType === 'salary' && <CheckCircle className="h-4 w-4 text-blue-500 mr-1.5" />}
                      <span className="font-medium">Salario</span>
                    </div>
                  </div>
                  <div 
                    className={`p-3 border rounded-md cursor-pointer ${changeType === 'custom' ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}
                    onClick={() => setChangeType('custom')}
                  >
                    <div className="flex items-center">
                      {changeType === 'custom' && <CheckCircle className="h-4 w-4 text-blue-500 mr-1.5" />}
                      <span className="font-medium">Personalizado</span>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadCloud className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Arrastra y suelta el archivo Excel modificado o haz clic para seleccionarlo
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Formatos soportados: .xlsx, .xls, .csv (Max. 10MB)
                </p>
                
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Seleccionar Archivo
                </label>
              </div>
            </div>
          ) : uploadStatus === 'uploading' ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-700">Analizando cambios...</p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <FileSpreadsheet className="h-6 w-6 text-blue-500 mr-2" />
                  <div>
                    <h3 className="font-medium">{uploadedFile?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {uploadedFile?.size ? `${Math.round(uploadedFile.size / 1024)} KB` : ''} - {previewData.length} registros a modificar
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setUploadedFile(null);
                    setPreviewData([]);
                    setUploadStatus('idle');
                  }}
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Cambio detectado: Actualización de nombre de empresa</p>
                    <p className="text-sm text-blue-700 mt-1">
                      De <span className="font-medium">Marco Timana Soluciones SAC</span> a <span className="font-medium">TimanaTech</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Previsualización de datos */}
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Actual</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nuevo Valor</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((row, index) => (
                      <tr key={index} className={row.status === 'error' ? 'bg-red-50' : row.status === 'warning' ? 'bg-yellow-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {row.status === 'valid' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : row.status === 'warning' ? (
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.company}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.status === 'warning' ? 'text-yellow-600 font-medium' : row.company !== row.newValue ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                          {row.newValue}
                          {row.status === 'warning' && row.company === 'Otra Empresa S.A.' && " (Sin cambios)"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Resumen y acciones */}
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">4</span> registros a modificar, 
                    <span className="font-medium text-yellow-600 ml-1">1</span> sin cambios
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Se generará una solicitud de actualización para los registros marcados con cambios
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      setUploadedFile(null);
                      setPreviewData([]);
                      setUploadStatus('idle');
                    }}
                  >
                    Cancelar
                  </button>
                  
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleProcessData}
                  >
                    <Database className="h-5 w-5 mr-2" />
                    Confirmar Actualización
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Historial de actualizaciones */}
          <div className="mb-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Historial de Actualizaciones</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Archivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campo Modificado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registros
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {updateHistory.map((update) => (
                  <tr key={update.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{update.fileName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {update.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {update.fieldUpdated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {update.records}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        update.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {update.status === 'completed' ? 'Completada' : 'Error'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <RefreshCw className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <FileSpreadsheet className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </ReportLayout>
  );
};

export default MassUpdateReport;