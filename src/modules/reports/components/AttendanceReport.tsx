import React, { useState } from 'react';
import { Calendar, Clock, Building2, Users, Download, Filter, Search, BarChart2, FileText, Printer } from 'lucide-react';
import { reportStats, mockReportData } from '../data';

interface AttendanceReportProps {
  period: string;
  onPeriodChange: (period: string) => void;
  onExport: (format: string) => void;
}

export function AttendanceReport({ period, onPeriodChange, onExport }: AttendanceReportProps) {
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedView, setSelectedView] = useState('detailed');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedReport, setSelectedReport] = useState('Marcajes');

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'a tiempo':
        return 'bg-green-100 text-green-800';
      case 'tardanza':
        return 'bg-yellow-100 text-yellow-800';
      case 'ausente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-6 gap-4">
          {/* Report Type Selection */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Reporte
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Marcajes">Marcajes</option>
              <option value="Horas Trabajadas">Horas Trabajadas</option>
              <option value="Cumplimiento">Cumplimiento</option>
            </select>
          </div>

          {/* Period Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Período
            </label>
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="custom">Rango personalizado</option>
            </select>
          </div>

          {/* Company Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compañía
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todas</option>
              <option value="hodelpa">Hodelpa Hotels & Resorts</option>
              <option value="ccn">Grupo CCN</option>
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departamento
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos</option>
              <option value="operaciones">Operaciones</option>
              <option value="front_desk">Front Desk</option>
              <option value="housekeeping">Housekeeping</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exportar
            </label>
            <select
              onChange={(e) => onExport(e.target.value)}
              className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar formato</option>
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>

        {period === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha inicial
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha final
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Report Sections */}
      <div className="grid grid-cols-3 gap-6">
        {/* Marcajes Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Marcajes</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Total empleados</span>
                <span className="text-lg font-medium">{reportStats.attendance.totalEmployees}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Presentes</span>
                <span className="text-lg font-medium text-green-600">{reportStats.attendance.presentToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Tardanzas</span>
                <span className="text-lg font-medium text-yellow-600">{reportStats.attendance.lateToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Ausencias</span>
                <span className="text-lg font-medium text-red-600">{reportStats.attendance.absentToday}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horas Trabajadas Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Horas Trabajadas</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Horas normales</span>
                <span className="text-lg font-medium">{reportStats.hours.regularHours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Horas extras</span>
                <span className="text-lg font-medium text-blue-600">{reportStats.hours.overtimeHours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Horas nocturnas</span>
                <span className="text-lg font-medium text-purple-600">{reportStats.hours.nightHours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Horas feriadas</span>
                <span className="text-lg font-medium text-orange-600">{reportStats.hours.holidayHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cumplimiento Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Cumplimiento</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">Asistencia</span>
                  <span className="text-sm font-medium">{reportStats.compliance.attendanceRate}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-green-600 rounded-full"
                    style={{ width: `${reportStats.compliance.attendanceRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">Puntualidad</span>
                  <span className="text-sm font-medium">{reportStats.compliance.punctualityRate}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${reportStats.compliance.punctualityRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">Horas completadas</span>
                  <span className="text-sm font-medium">{reportStats.compliance.hoursCompletionRate}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${reportStats.compliance.hoursCompletionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Reporte Detallado - {selectedReport}</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {Object.entries(mockReportData[selectedReport][0] || {}).map(([key]) => (
                  <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key === 'employeeId' ? 'Código' :
                     key === 'employeeName' ? 'Empleado' :
                     key === 'department' ? 'Departamento' :
                     key === 'checkIn' ? 'Entrada' :
                     key === 'checkOut' ? 'Salida' :
                     key === 'totalHours' ? 'Horas' :
                     key === 'status' ? 'Estado' :
                     key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockReportData[selectedReport].map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.entries(row).map(([key, value]) => (
                    <td key={key} className="px-6 py-4 whitespace-nowrap">
                      {key === 'status' ? (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(value as string)}`}>
                          {value}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-900">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}