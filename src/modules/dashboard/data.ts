export const dashboardData = {
  dayStatus: [
    { name: 'Planificados', value: 74, color: '#10B981' },
    { name: 'Sin planificación', value: 35, color: '#6B7280' }
  ],
  workingHours: [
    { name: 'Trabajadas', value: 895, color: '#3B82F6' },
    { name: 'Restantes', value: 219, color: '#E5E7EB' }
  ],
  timeEvents: [
    { name: 'Tardanzas', value: 45, color: '#EF4444' },
    { name: 'Descansos', value: 180, color: '#F59E0B' },
    { name: 'Horas extra', value: 120, color: '#10B981' },
    { name: 'Permisos', value: 250, color: '#6366F1' }
  ],
  kpiData: {
    tardanzas: { value: 15, trend: '+2%', color: 'text-red-600' },
    permisos: { value: 8, trend: '-1%', color: 'text-blue-600' },
    ausencias: { value: 5, trend: '0%', color: 'text-red-600' },
    aTiempo: { value: 422, trend: '+15%', color: 'text-green-600' },
    entradasRealizadas: { value: 445, trend: '+18%', color: 'text-blue-600' },
    salidasRegistradas: { value: 398, trend: '+12%', color: 'text-purple-600' },
    marcajesIncorrectos: { value: 3, trend: '-2%', color: 'text-amber-600' },
    salidasAntes: { value: 7, trend: '+1%', color: 'text-orange-600' },
    horasExtras: { value: 24, trend: '+4%', color: 'text-indigo-600' },
    horasFlotantes: { value: 12, trend: '-1%', color: 'text-pink-600' },
    sinHorario: { value: 35, trend: '0%', color: 'text-gray-600' },
    conHorario: { value: 415, trend: '+5%', color: 'text-green-600' }
  }
};

export const employeesData = [
  {
    id: '1001',
    name: 'Carmen Rodríguez',
    position: 'Recepcionista',
    department: 'Front Desk',
    location: 'Hodelpa Gran Almirante',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    documentId: '402-1234567-8',
    status: 'working',
    schedule: [
      { date: '2025-02-10', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-11', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-12', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-13', shift: 'M', startTime: '06:00', endTime: '14:00' },
      { date: '2025-02-14', shift: 'M', startTime: '06:00', endTime: '14:00' },
    ]
  },
  {
    id: '1002',
    name: 'Luis Méndez',
    position: 'Chef Ejecutivo',
    department: 'Cocina',
    location: 'Hodelpa Garden Court',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    documentId: '001-9876543-2',
    status: 'working',
    schedule: [
      { date: '2025-02-10', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-11', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-12', shift: 'S', startTime: '08:00', endTime: '19:00' },
      { date: '2025-02-13', shift: 'D', startTime: '', endTime: '' },
      { date: '2025-02-14', shift: 'D', startTime: '', endTime: '' },
    ]
  },
  {
    id: '1003',
    name: 'Ana María Santos',
    position: 'Camarera',
    department: 'Housekeeping',
    location: 'Hodelpa Gran Almirante',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    documentId: '223-4567890-1',
    status: 'break',
    schedule: [
      { date: '2025-02-10', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-11', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-12', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-13', shift: 'LPM', startTime: '', endTime: '' },
      { date: '2025-02-14', shift: 'LPM', startTime: '', endTime: '' },
    ]
  }
];