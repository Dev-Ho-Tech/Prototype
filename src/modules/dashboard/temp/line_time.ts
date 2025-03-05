export const marcajes = [
  {
    id: "entrada",
    time: "7:00 am",
    type: "Ingreso",
    device: "Biométrico",
    method: "Facial",
    position: "16.67%", // 7am position (5am=0%, 8pm=100%)
    color: "#22c55e", // green-500
    horasTrabajadas: "4 horas",
    entrada: "7:00 am",
    salida: "11:00 am",
    esHoraExtra: false
  },
  {
    id: "salida-almuerzo",
    time: "11:00 am",
    type: "Salida Almuerzo",
    device: "Biométrico",
    method: "Facial",
    position: "46.15%", // 11am position
    color: "#3b82f6", // blue-500
    horasTrabajadas: "1 hora",
    entrada: "11:00 am",
    salida: "12:00 pm",
    esHoraExtra: false
  },
  {
    id: "entrada-almuerzo",
    time: "12:00 pm",
    type: "Entrada Almuerzo",
    device: "Biométrico",
    method: "Facial",
    position: "53.85%", // 12pm position
    color: "#eab308", // yellow-500
    horasTrabajadas: "3 horas",
    entrada: "12:00 pm",
    salida: "3:00 pm",
    esHoraExtra: false
  },
  {
    id: "salida",
    time: "3:00 pm",
    type: "Salida",
    device: "Biométrico",
    method: "Facial",
    position: "75.85%", // 3pm position
    color: "#ef4444", // red-500
    horasTrabajadas: "2 horas",
    entrada: "3:00 pm",
    salida: "5:00 pm",
    esHoraExtra: true,
    estadoHoraExtra: "aprobado",
    aprobadoPor: "María Rodríguez",
    comentarios: "Aprobado por carga de trabajo excepcional"
  }
];

// Segmentos de tiempo para línea de tiempo
export const segmentos = [
  {
    id: "trabajo-1",
    tipo: "trabajo",
    inicio: "16.67%", // 7am
    fin: "46.15%", // 11am
    ancho: "29.48%",
    color: "bg-green-400",
    horasTrabajadas: "4 horas",
    entrada: "7:00 am",
    salida: "11:00 am",
    esHoraExtra: false
  },
  {
    id: "almuerzo",
    tipo: "descanso",
    inicio: "46.15%", // 11am
    fin: "53.85%", // 12pm
    ancho: "7.7%",
    color: "bg-orange-300",
    horasTrabajadas: "1 hora (descanso)",
    entrada: "11:00 am",
    salida: "12:00 pm",
    esHoraExtra: false
  },
  {
    id: "trabajo-2",
    tipo: "trabajo",
    inicio: "53.85%", // 12pm
    fin: "75.85%", // 3pm
    ancho: "22%",
    color: "bg-green-400",
    horasTrabajadas: "3 horas",
    entrada: "12:00 pm",
    salida: "3:00 pm",
    esHoraExtra: false
  },
  {
    id: "extra",
    tipo: "extra",
    inicio: "75.85%", // 3pm
    fin: "83.55%", // 5pm
    ancho: "7.7%",
    color: "bg-striped-green",
    horasTrabajadas: "2 horas extras",
    entrada: "3:00 pm",
    salida: "5:00 pm",
    esHoraExtra: true,
    estadoHoraExtra: "aprobado",
    aprobadoPor: "María Rodríguez",
    comentarios: "Aprobado por carga de trabajo excepcional",
    fechaAprobacion: "16 de marzo, 2025"
  }
];