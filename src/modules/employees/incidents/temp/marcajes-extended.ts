import { Marcaje, TipoVerificacion, TipoMarcaje } from '../interface/types';

// Marcajes más completos para el empleado 1001, incluyendo horas extras y descansos
export const enhancedMarcajes: Marcaje[] = [
  // Día normal con horas extras (14-02-2025)
  {
    id: 'e1',
    fecha: '14-02-2025',
    hora: '07:00 AM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e2',
    fecha: '14-02-2025',
    hora: '11:00 AM',
    empleadoId: '1001',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e3',
    fecha: '14-02-2025',
    hora: '12:00 PM',
    empleadoId: '1001',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e4',
    fecha: '14-02-2025',
    hora: '03:00 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e5',
    fecha: '14-02-2025',
    hora: '03:30 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    observaciones: "Regresó para hacer horas extras",
    resultado: "Verificado"
  },
  {
    id: 'e6',
    fecha: '14-02-2025',
    hora: '06:00 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    observaciones: "Completó 2.5 horas extras",
    resultado: "Verificado"
  },

  // Día con llegada tarde (15-02-2025)
  {
    id: 'e7',
    fecha: '15-02-2025',
    hora: '07:45 AM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    observaciones: "Llegada tarde",
    resultado: "Verificado"
  },
  {
    id: 'e8',
    fecha: '15-02-2025',
    hora: '11:30 AM',
    empleadoId: '1001',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e9',
    fecha: '15-02-2025',
    hora: '12:30 PM',
    empleadoId: '1001',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e10',
    fecha: '15-02-2025',
    hora: '03:00 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    resultado: "Verificado"
  },

  // Día con salida temprana (16-02-2025)
  {
    id: 'e11',
    fecha: '16-02-2025',
    hora: '07:05 AM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e12',
    fecha: '16-02-2025',
    hora: '11:00 AM',
    empleadoId: '1001',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e13',
    fecha: '16-02-2025',
    hora: '12:00 PM',
    empleadoId: '1001',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e14',
    fecha: '16-02-2025',
    hora: '02:30 PM',
    empleadoId: '1001',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    observaciones: "Salida temprana autorizada por supervisor",
    resultado: "Verificado"
  },
  
  // Marcajes para el empleado 1002 con múltiples descansos
  {
    id: 'e15',
    fecha: '14-02-2025',
    hora: '07:00 AM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e16',
    fecha: '14-02-2025',
    hora: '09:30 AM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    observaciones: "Salida a sitio de obra",
    resultado: "Verificado"
  },
  {
    id: 'e17',
    fecha: '14-02-2025',
    hora: '10:00 AM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e18',
    fecha: '14-02-2025',
    hora: '12:00 PM',
    empleadoId: '1002',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    observaciones: "Almuerzo",
    resultado: "Verificado"
  },
  {
    id: 'e19',
    fecha: '14-02-2025',
    hora: '01:00 PM',
    empleadoId: '1002',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e20',
    fecha: '14-02-2025',
    hora: '02:30 PM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    observaciones: "Salida a sitio de obra",
    resultado: "Verificado"
  },
  {
    id: 'e21',
    fecha: '14-02-2025',
    hora: '03:00 PM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e22',
    fecha: '14-02-2025',
    hora: '05:00 PM',
    empleadoId: '1002',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.ROSTRO,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    resultado: "Verificado"
  },
  
  // Marcajes para el empleado 1003 con horas extras aprobadas
  {
    id: 'e23',
    fecha: '14-02-2025',
    hora: '08:00 AM',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e24',
    fecha: '14-02-2025',
    hora: '12:00 PM',
    empleadoId: '1003',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e25',
    fecha: '14-02-2025',
    hora: '01:00 PM',
    empleadoId: '1003',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e26',
    fecha: '14-02-2025',
    hora: '05:00 PM',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e27',
    fecha: '14-02-2025',
    hora: '06:00 PM',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    observaciones: "Trabajo extra para cierre contable",
    resultado: "Verificado"
  },
  {
    id: 'e28',
    fecha: '14-02-2025',
    hora: '09:00 PM',
    empleadoId: '1003',
    dispositivo: 'ACC-GA-001',
    tipoVerificacion: TipoVerificacion.TARJETA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    observaciones: "Completó 3 horas extras aprobadas",
    resultado: "Verificado"
  },
  
  // Marcajes para el empleado 1004 (día normal)
  {
    id: 'e29',
    fecha: '14-02-2025',
    hora: '08:30 AM',
    empleadoId: '1004',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e30',
    fecha: '14-02-2025',
    hora: '12:00 PM',
    empleadoId: '1004',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e31',
    fecha: '14-02-2025',
    hora: '01:00 PM',
    empleadoId: '1004',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e32',
    fecha: '14-02-2025',
    hora: '05:30 PM',
    empleadoId: '1004',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    resultado: "Verificado"
  },
  
  // Marcajes para el empleado 1005 con hora extra no aprobada
  {
    id: 'e33',
    fecha: '14-02-2025',
    hora: '06:15 AM',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e34',
    fecha: '14-02-2025',
    hora: '11:00 AM',
    empleadoId: '1005',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_INICIO,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e35',
    fecha: '14-02-2025',
    hora: '12:00 PM',
    empleadoId: '1005',
    dispositivo: 'DIN-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.BREAK_FIN,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e36',
    fecha: '14-02-2025',
    hora: '02:15 PM',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    resultado: "Verificado"
  },
  {
    id: 'e37',
    fecha: '14-02-2025',
    hora: '04:00 PM',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.ENTRADA,
    esManual: false,
    observaciones: "Regresó sin autorización",
    resultado: "Verificado"
  },
  {
    id: 'e38',
    fecha: '14-02-2025',
    hora: '07:30 PM',
    empleadoId: '1005',
    dispositivo: 'BIO-GA-001',
    tipoVerificacion: TipoVerificacion.HUELLA,
    tipoMarcaje: TipoMarcaje.SALIDA,
    esManual: false,
    observaciones: "Horas extras no autorizadas",
    resultado: "Verificado"
  }
];