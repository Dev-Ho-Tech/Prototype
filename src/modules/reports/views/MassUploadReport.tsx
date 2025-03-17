/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useReports } from '../hooks/useReports';
import ReportLayout from '../components/ReportLayout';
import { Upload, UploadCloud, Download, CheckCircle, XCircle, AlertTriangle, FileSpreadsheet, RefreshCw, Clock } from 'lucide-react';

const MassUploadReport: React.FC = () => {
  const { 
    employees, 
    filter, 
    updateFilter, 
    exportReport 
  } = useReports({ reportType: 'mass-upload' });

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedTemplate, setSelectedTemplate] = useState<'complete' | 'basic' | 'departmental'>('complete');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload');

  // Simular carga de archivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setUploadedFile(file);
    setUploadStatus('uploading');
    
    // Simular procesamiento del archivo
    setTimeout(() => {
      // Generar datos de previsualización de ejemplo
      const mockPreviewData = [
        { id: '100', name: 'Juan', lastName: 'Pérez', email: 'juan.perez@empresa.com', department: 'Ventas', position: 'Ejecutivo', status: 'valid' },
        { id: '101', name: 'María', lastName: 'Gómez', email: 'maria.gomez@empresa.com', department: 'Finanzas', position: 'Analista', status: 'valid' },
        { id: '102', name: 'Carlos', lastName: 'López', email: 'carlos', department: 'TI', position: 'Desarrollador', status: 'error' },
        { id: '103', name: 'Ana', lastName: 'Martínez', email: 'ana.martinez@empresa.com', department: '', position: 'Coordinadora', status: 'warning' },
        { id: '104', name: 'Roberto', lastName: 'Sánchez', email: 'roberto.sanchez@empresa.com', department: 'RRHH', position: 'Especialista', status: 'valid' },
      ];
      
      setPreviewData(mockPreviewData);
      setUploadStatus('success');
    }, 1500);
  };

  // Historial de cargas (simulado)
  const uploadHistory = [
    { id: '1', fileName: 'empleados_marzo.xlsx', date: new Date('2025-03-10T14:30:00'), user: 'admin@empresa.com', records: 45, status: 'completed' },
    { id: '2', fileName: 'nuevos_empleados.csv', date: new Date('2025-03-05T09:15:00'), user: 'rrhh@empresa.com', records: 12, status: 'completed' },
    { id: '3', fileName: 'actualizacion_departamentos.xlsx', date: new Date('2025-02-28T16:20:00'), user: 'admin@empresa.com', records: 28, status: 'completed' },
    { id: '4', fileName: 'empleados_contratistas.csv', date: new Date('2025-02-15T11:45:00'), user: 'rrhh@empresa.com', records: 17, status: 'error' },
  ];

  // Descargar plantilla
  const handleDownloadTemplate = () => {
    alert(`Descargando plantilla de tipo: ${selectedTemplate}`);
  };

  // Enviar datos para procesamiento
  const handleProcessData = () => {
    alert('Procesando datos para carga masiva...');
    
    // Aquí iría la lógica real de procesamiento de datos
    setTimeout(() => {
      alert('¡Carga masiva completada con éxito!');
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
      title="Carga Masiva de Personas"
      description="Actualización masiva de datos de empleados mediante plantillas predefinidas"
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
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('upload')}
            >
              Cargar Archivo
            </button>
            <button
              className={`${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('history')}
            >
              Historial de Cargas
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de la pestaña activa */}
      {activeTab === 'upload' ? (
        <div className="mb-6 flex flex-col lg:flex-row gap-6">
          {/* Sección de plantillas */}
          <div className="lg:w-1/3 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Plantillas Disponibles</h2>
            
            <div className="space-y-4">
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedTemplate === 'complete' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTemplate('complete')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Plantilla Completa</h3>
                  {selectedTemplate === 'complete' && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Incluye todos los campos disponibles: datos personales, contractuales y organizacionales.
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedTemplate === 'basic' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTemplate('basic')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Plantilla Básica</h3>
                  {selectedTemplate === 'basic' && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Incluye solo campos esenciales: nombre, identificación y datos de contacto.
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedTemplate === 'departmental' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedTemplate('departmental')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">Plantilla Departamental</h3>
                  {selectedTemplate === 'departmental' && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Enfocada en la estructura organizacional: departamento, sección, unidad y puesto.
                </p>
              </div>
              
              <button
                type="button"
                className="mt-6 w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleDownloadTemplate}
              >
                <Download className="h-5 w-5 mr-2 text-gray-500" />
                Descargar Plantilla
              </button>
            </div>
          </div>
          
          {/* Sección de carga */}
          <div className="lg:w-2/3 bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Cargar Archivo</h2>
            
            {uploadStatus === 'idle' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadCloud className="h-12 w-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Arrastra y suelta un archivo Excel o CSV aquí, o haz clic para seleccionar un archivo
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
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Seleccionar Archivo
                </label>
              </div>
            ) : uploadStatus === 'uploading' ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-700">Procesando archivo...</p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-6 w-6 text-green-500 mr-2" />
                    <div>
                      <h3 className="font-medium">{uploadedFile?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {uploadedFile?.size ? `${Math.round(uploadedFile.size / 1024)} KB` : ''} - {previewData.length} registros
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
                
                {/* Previsualización de datos */}
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puesto</th>
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
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.status === 'error' && row.email === 'carlos' ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                            {row.email}
                            {row.status === 'error' && row.email === 'carlos' && " (Formato inválido)"}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.status === 'warning' && !row.department ? 'text-yellow-500 font-medium' : 'text-gray-500'}`}>
                            {row.department || 'No especificado'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Resumen y acciones */}
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-green-600">3</span> registros válidos, 
                      <span className="font-medium text-yellow-600 ml-1">1</span> advertencia, 
                      <span className="font-medium text-red-600 ml-1">1</span> error
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Corrige los errores antes de procesar o continúa solo con los registros válidos
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
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleProcessData}
                    >
                      Procesar Datos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Historial de cargas */}
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
                {uploadHistory.map((upload) => (
                  <tr key={upload.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{upload.fileName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{formatDate(upload.date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {upload.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {upload.records}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        upload.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {upload.status === 'completed' ? 'Completado' : 'Error'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <RefreshCw className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
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

export default MassUploadReport;