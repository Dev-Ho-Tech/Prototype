import { Geocerca } from "../interfaces/Geocerca";

export const geocercas: Geocerca[] = [
  {
    id: "1",
    nombre: "HODELPA GRAN ALMIRANTE",
    sede: "Hodelpa Gran Almirante",
    radio: 250,
    direccion: "Av. Las Américas, Santiago de los Caballeros",
    estado: "Activa",
    empleadosAsignados: 120,
    fechaCreacion: "15/01/2023",
    coordenadas: {
      lat: 19.4517,
      lng: -70.6986,
    },
    perfilesMarcaje: ["remote_app", "biometrico", "web"],
    turnos: ["matutino", "vespertino", "administrativo"],
  },
  {
    id: "2",
    nombre: "HODELPA GARDEN COURT",
    sede: "Hodelpa Garden",
    radio: 200,
    direccion: "Calle 10, Santiago de los Caballeros",
    estado: "Activa",
    empleadosAsignados: 85,
    fechaCreacion: "22/02/2023",
    coordenadas: {
      lat: 19.455,
      lng: -70.705,
    },
    perfilesMarcaje: ["remote_app", "web"],
    turnos: ["matutino", "nocturno"],
  },
  {
    id: "3",
    nombre: "CENTRO PLAZA HODELPA",
    sede: "Centro Plaza Hodelpa",
    radio: 150,
    direccion: "Av. 27 de Febrero, Santiago de los Caballeros",
    estado: "Activa",
    empleadosAsignados: 45,
    fechaCreacion: "10/03/2023",
    coordenadas: {
      lat: 19.46,
      lng: -70.71,
    },
    perfilesMarcaje: ["biometrico", "kiosko"],
    turnos: ["administrativo"],
  },
  {
    id: "4",
    nombre: "HODELPA CENTRO",
    sede: "Hodelpa Centro",
    radio: 180,
    direccion: "Calle del Sol, Santiago de los Caballeros",
    estado: "Inactiva",
    empleadosAsignados: 0,
    fechaCreacion: "05/04/2023",
    coordenadas: {
      lat: 19.452,
      lng: -70.7,
    },
    perfilesMarcaje: [],
    turnos: [],
  },
  {
    id: "5",
    nombre: "HODELPA CARIBE COLONIAL",
    sede: "Hodelpa Caribe Colonial",
    radio: 220,
    direccion: "Calle Isabel La Católica, Santo Domingo",
    estado: "Activa",
    empleadosAsignados: 68,
    fechaCreacion: "18/05/2023",
    coordenadas: {
      lat: 18.475,
      lng: -69.89,
    },
    perfilesMarcaje: ["remote_app", "biometrico", "web"],
    turnos: ["matutino", "vespertino", "nocturno"],
  },
];

export const perfilesMarcajeOptions = [
  { value: "remote_app", label: "Remote App" },
  { value: "biometrico", label: "Biométrico" },
  { value: "web", label: "Web" },
  { value: "kiosko", label: "Kiosko" },
];

export const turnosOptions = [
  { value: "matutino", label: "Matutino (7:00 - 15:00)" },
  { value: "vespertino", label: "Vespertino (15:00 - 23:00)" },
  { value: "nocturno", label: "Nocturno (23:00 - 7:00)" },
  { value: "administrativo", label: "Administrativo (8:00 - 17:00)" },
];