import { Comedor, HorarioComida, EstacionComida, PerfilComida, DiaSemana } from "../interfaces/types";

// Datos de ejemplo para comedores
export const comedores: Comedor[] = [
  {
    id: "COM-001",
    nombre: "Comedor Principal",
    descripcion: "Comedor principal para empleados",
    ubicacion: "Edificio A, Planta Baja",
    capacidadMaxima: 200,
    cantidadMesas: 50,
    encargado: "María Rodríguez",
    estado: "activo",
    fechaCreacion: "2023-01-15"
  },
  {
    id: "COM-002",
    nombre: "Comedor Ejecutivo",
    descripcion: "Comedor para ejecutivos y visitantes",
    ubicacion: "Edificio B, Piso 10",
    capacidadMaxima: 50,
    cantidadMesas: 15,
    encargado: "Juan Pérez",
    estado: "activo",
    fechaCreacion: "2023-02-20"
  },
  {
    id: "COM-003",
    nombre: "Cafetería Norte",
    descripcion: "Cafetería para refrigerios y comidas rápidas",
    ubicacion: "Edificio C, Planta Baja",
    capacidadMaxima: 80,
    cantidadMesas: 20,
    encargado: "Carlos Gómez",
    estado: "activo",
    fechaCreacion: "2023-03-10"
  }
];

// Datos de ejemplo para horarios de comida
export const horariosComida: HorarioComida[] = [
  {
    id: "HOR-001",
    nombre: "Desayuno",
    horaInicio: "07:00",
    horaFin: "09:00",
    diasSemana: [DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES],
    capacidadMaxima: 150,
    comedorId: "COM-001",
    estado: "activo"
  },
  {
    id: "HOR-002",
    nombre: "Almuerzo",
    horaInicio: "12:00",
    horaFin: "14:00",
    diasSemana: [DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES],
    capacidadMaxima: 200,
    comedorId: "COM-001",
    estado: "activo"
  },
  {
    id: "HOR-003",
    nombre: "Cena",
    horaInicio: "18:00",
    horaFin: "20:00",
    diasSemana: [DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES],
    capacidadMaxima: 120,
    comedorId: "COM-001",
    estado: "activo"
  },
  {
    id: "HOR-004",
    nombre: "Desayuno Ejecutivo",
    horaInicio: "08:00",
    horaFin: "10:00",
    diasSemana: [DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES],
    capacidadMaxima: 40,
    comedorId: "COM-002",
    estado: "activo"
  },
  {
    id: "HOR-005",
    nombre: "Almuerzo Ejecutivo",
    horaInicio: "13:00",
    horaFin: "15:00",
    diasSemana: [DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES],
    capacidadMaxima: 50,
    comedorId: "COM-002",
    estado: "activo"
  },
  {
    id: "HOR-006",
    nombre: "Café Mañana",
    horaInicio: "09:00",
    horaFin: "11:00",
    diasSemana: [DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES, DiaSemana.SABADO],
    capacidadMaxima: 60,
    comedorId: "COM-003",
    estado: "activo"
  },
  {
    id: "HOR-007",
    nombre: "Merienda Tarde",
    horaInicio: "16:00",
    horaFin: "18:00",
    diasSemana: [DiaSemana.LUNES, DiaSemana.MARTES, DiaSemana.MIERCOLES, DiaSemana.JUEVES, DiaSemana.VIERNES],
    capacidadMaxima: 60,
    comedorId: "COM-003",
    estado: "activo"
  }
];

// Datos de ejemplo para estaciones de comida
export const estacionesComida: EstacionComida[] = [
  {
    id: "EST-001",
    nombre: "Platos Principales",
    descripcion: "Estación para platos principales servidos",
    tipo: "servido",
    capacidadMaxima: 80,
    comedorId: "COM-001",
    estado: "activo"
  },
  {
    id: "EST-002",
    nombre: "Ensaladas",
    descripcion: "Barra de ensaladas self-service",
    tipo: "self-service",
    capacidadMaxima: 50,
    comedorId: "COM-001",
    estado: "activo"
  },
  {
    id: "EST-003",
    nombre: "Postres",
    descripcion: "Estación de postres",
    tipo: "self-service",
    capacidadMaxima: 40,
    comedorId: "COM-001",
    estado: "activo"
  },
  {
    id: "EST-004",
    nombre: "Buffet Ejecutivo",
    descripcion: "Buffet completo para ejecutivos",
    tipo: "buffet",
    capacidadMaxima: 50,
    comedorId: "COM-002",
    estado: "activo"
  },
  {
    id: "EST-005",
    nombre: "Bebidas y Cafetería",
    descripcion: "Estación de bebidas frías y calientes",
    tipo: "self-service",
    capacidadMaxima: 60,
    comedorId: "COM-003",
    estado: "activo"
  }
];

// Datos de ejemplo para perfiles de comida
export const perfilesComida: PerfilComida[] = [
  {
    id: "PERF-001",
    nombre: "Alimentación Regular",
    descripcion: "Perfil estándar para empleados",
    ticketsDisponibles: 100,
    horarioIds: ["HOR-001", "HOR-002", "HOR-003"],
    estacionIds: ["EST-001", "EST-002", "EST-003"],
    estado: "activo"
  },
  {
    id: "PERF-002",
    nombre: "Alimentación Ejecutiva",
    descripcion: "Perfil para directivos y gerentes",
    ticketsDisponibles: 30,
    horarioIds: ["HOR-004", "HOR-005"],
    estacionIds: ["EST-004"],
    estado: "activo"
  },
  {
    id: "PERF-003",
    nombre: "Cafetería",
    descripcion: "Perfil para acceso a la cafetería",
    ticketsDisponibles: 50,
    horarioIds: ["HOR-006", "HOR-007"],
    estacionIds: ["EST-005"],
    estado: "activo"
  }
];

// Función para generar un ID único
export const generateId = (prefix: string) => {
  return `${prefix}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
};