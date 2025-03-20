import React, { useState, useEffect, useRef } from 'react';
import { WorkShift, License, ScheduleEntry, DragInfo } from '../interfaces/types';
import { UnifiedEmployee } from '../../../global/interfaces/unifiedTypes';
import DayRow from './DayRow';
import TimeSlotHeader from './TimeSlotHeader';
import ContextMenu from './ContextMenu';
import TimePickerModal from './TimePickerModal';

interface ScheduleGridProps {
  employees: UnifiedEmployee[]; 
  selectedDate: string;
  selectedPeriod: string;
  workShifts: WorkShift[];
  licenses: License[];
  dragInfo: DragInfo | null;
  setDragInfo: React.Dispatch<React.SetStateAction<DragInfo | null>>;
  startDate?: string;
  endDate?: string;
  timeStep?: number;
  onScheduleUpdate?: (updatedEntry: ScheduleEntry) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  employees,
  selectedDate,
  selectedPeriod,
  workShifts,
  licenses,
  dragInfo,
  setDragInfo,
  startDate,
  endDate,
  timeStep = 15,
  onScheduleUpdate
}) => {
  const startHour = 5;
  const endHour = 23;
  
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Estado para el tooltip
  const [tooltip, setTooltip] = useState({
    show: false,
    content: '',
    x: 0,
    y: 0
  });

  // Estado para el menú contextual
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    x: number;
    y: number;
    date: string;
    hour: number;
    employeeId: string | null;
  }>({
    show: false,
    x: 0,
    y: 0,
    date: '',
    hour: 0,
    employeeId: null
  });
  
  // Estado para el modal de selección de hora
  const [timePickerModal, setTimePickerModal] = useState<{
    isOpen: boolean;
    type: 'entry' | 'exit';
    date: string;
    employeeId: string | null;
    entryTime?: string;
    isSecondStep?: boolean;
  }>({
    isOpen: false,
    type: 'entry',
    date: '',
    employeeId: null,
    entryTime: undefined,
    isSecondStep: false
  });
  
  // Estados para tracking de arrastre entre días
  const [draggedSchedule, setDraggedSchedule] = useState<{
    entry: ScheduleEntry | null;
    originDate: string;
    originEmployeeId: string | null;
    isDraggingBetweenDays: boolean;
  }>({
    entry: null,
    originDate: '',
    originEmployeeId: null,
    isDraggingBetweenDays: false
  });
  
  // Prevenir menú contextual por defecto
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Manejador para mostrar menú contextual
  const handleShowContextMenu = (e: React.MouseEvent, date: string, hour: number, employeeId: string | null) => {
    e.preventDefault();
    
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY,
      date,
      hour,
      employeeId
    });
  };

  // Cerrar menú contextual
  const handleCloseContextMenu = () => {
    setContextMenu(prev => ({ ...prev, show: false }));
  };
  
  // Manejador para abrir el modal de selección de hora
  const handleOpenTimePicker = (type: 'entry' | 'exit', date: string, hour: number, employeeId: string | null) => {
    const initialTime = `${hour.toString().padStart(2, '0')}:00`;
    
    setTimePickerModal({
      isOpen: true,
      type,
      date,
      employeeId,
      entryTime: initialTime,
      isSecondStep: false
    });
    
    // Cerrar el menú contextual
    handleCloseContextMenu();
  };
  
  // Manejador para el primer paso (selección de hora de entrada)
  const handleEntryTimeSelected = (time: string) => {
    // Si es el primer paso (entrada), configurar para el segundo paso (salida)
    if (!timePickerModal.isSecondStep) {
      setTimePickerModal(prev => ({
        ...prev,
        entryTime: time,
        type: 'exit',
        isSecondStep: true
      }));
    }
  };
  
  // Manejador para el segundo paso (selección de hora de salida)
  const handleExitTimeSelected = (time: string) => {
    if (timePickerModal.isSecondStep && timePickerModal.entryTime && timePickerModal.employeeId) {
      // Crear un nuevo horario "manual" de color verde
      const employee = employees.find(e => e.id === timePickerModal.employeeId);
      
      if (!employee) {
        setTimePickerModal(prev => ({ ...prev, isOpen: false }));
        return;
      }
      
      // Crear entrada de horario para marcaje manual
      const newScheduleEntry: ScheduleEntry = {
        date: timePickerModal.date,
        shift: 'manual',  // Identificador especial para horarios creados manualmente
        startTime: timePickerModal.entryTime,
        endTime: time,
        employeeId: timePickerModal.employeeId
      };
      
      // Actualizar horario en el estado global
      if (onScheduleUpdate) {
        onScheduleUpdate(newScheduleEntry);
      }
      
      // Actualizar el horario en la copia local del empleado
      if (!employee.schedule) {
        employee.schedule = [];
      }
      
      // Verificar si ya existe una entrada para esta fecha
      const existingEntryIndex = employee.schedule.findIndex(s => s.date === timePickerModal.date);
      
      if (existingEntryIndex >= 0) {
        // Actualizar entrada existente
        employee.schedule[existingEntryIndex] = {
          ...employee.schedule[existingEntryIndex],
          shift: 'manual',
          startTime: timePickerModal.entryTime,
          endTime: time
        };
      } else {
        // Agregar nueva entrada
        employee.schedule.push({
          date: timePickerModal.date,
          shift: 'manual',
          startTime: timePickerModal.entryTime,
          endTime: time
        });
      }
      
      // Cerrar el modal
      setTimePickerModal(prev => ({ ...prev, isOpen: false }));
    }
  };

  // Manejador para cerrar el modal de selección de hora
  const handleCloseTimePicker = () => {
    setTimePickerModal(prev => ({ ...prev, isOpen: false }));
  };

  // Manejador para agregar un turno
  const handleAddShift = (shiftId: string, date: string, hour: number, employeeId: string | null) => {
    console.log('[GRID] Agregar turno:', { shiftId, date, hour, employeeId });
    
    if (!employeeId) return;
    
    // Crear entrada de horario para el turno seleccionado
    const shift = workShifts.find(s => s.id === shiftId);
    
    if (!shift) return;
    
    // Obtener el empleado
    const employee = employees.find(e => e.id === employeeId);
    
    if (!employee) return;
    
    // Formatear hora de inicio y fin
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const defaultDuration = shift.defaultDuration ? parseInt(shift.defaultDuration) : 8;
    let endHour = hour + defaultDuration;
    endHour = Math.min(endHour, endHour);
    const endTime = `${endHour.toString().padStart(2, '0')}:00`;
    
    // Crear entrada de horario
    const newScheduleEntry: ScheduleEntry = {
      date,
      shift: shiftId,
      startTime,
      endTime,
      employeeId
    };
    
    // Actualizar horario
    if (onScheduleUpdate) {
      onScheduleUpdate(newScheduleEntry);
    }
    
    // Actualizar el horario en la copia local del empleado
    if (!employee.schedule) {
      employee.schedule = [];
    }
    
    // Verificar si ya existe una entrada para esta fecha
    const existingEntryIndex = employee.schedule.findIndex(s => s.date === date);
    
    if (existingEntryIndex >= 0) {
      // Actualizar entrada existente
      employee.schedule[existingEntryIndex] = {
        ...employee.schedule[existingEntryIndex],
        shift: shiftId,
        startTime,
        endTime
      };
    } else {
      // Agregar nueva entrada
      employee.schedule.push({
        date,
        shift: shiftId,
        startTime,
        endTime
      });
    }
    
    // Cerrar menú contextual
    handleCloseContextMenu();
  };

  // Manejador para agregar una licencia
  const handleAddLicense = (licenseId: string, date: string, hour: number, employeeId: string | null) => {
    console.log('[GRID] Agregar licencia:', { licenseId, date, hour, employeeId });
    
    if (!employeeId) return;
    
    // Crear entrada de horario para la licencia seleccionada
    const license = licenses.find(l => l.code === licenseId);
    
    if (!license) return;
    
    // Obtener el empleado
    const employee = employees.find(e => e.id === employeeId);
    
    if (!employee) return;
    
    // Formatear hora de inicio y fin
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const defaultDuration = license.defaultDuration ? parseInt(license.defaultDuration) : 8;
    let endHour = hour + defaultDuration;
    endHour = Math.min(endHour, endHour);
    const endTime = `${endHour.toString().padStart(2, '0')}:00`;
    
    // Crear entrada de horario
    const newScheduleEntry: ScheduleEntry = {
      date,
      shift: licenseId,
      startTime,
      endTime,
      employeeId
    };
    
    // Actualizar horario
    if (onScheduleUpdate) {
      onScheduleUpdate(newScheduleEntry);
    }
    
    // Actualizar el horario en la copia local del empleado
    if (!employee.schedule) {
      employee.schedule = [];
    }
    
    // Verificar si ya existe una entrada para esta fecha
    const existingEntryIndex = employee.schedule.findIndex(s => s.date === date);
    
    if (existingEntryIndex >= 0) {
      // Actualizar entrada existente
      employee.schedule[existingEntryIndex] = {
        ...employee.schedule[existingEntryIndex],
        shift: licenseId,
        startTime,
        endTime
      };
    } else {
      // Agregar nueva entrada
      employee.schedule.push({
        date,
        shift: licenseId,
        startTime,
        endTime
      });
    }
    
    // Cerrar menú contextual
    handleCloseContextMenu();
  };

  // Manejador para agregar un marcaje
  const handleAddMarking = (type: 'entry' | 'exit', date: string, hour: number, employeeId: string | null) => {
    // Abrir el selector de hora en lugar de agregar directamente
    handleOpenTimePicker(type, date, hour, employeeId);
  };

  // Iniciar arrastre entre días
  const handleStartDragBetweenDays = (scheduleEntry: ScheduleEntry, date: string, employeeId: string | null) => {
    console.log('[GRID] Iniciando arrastre entre días:', { scheduleEntry, date, employeeId });
    
    setDraggedSchedule({
      entry: scheduleEntry,
      originDate: date,
      originEmployeeId: employeeId,
      isDraggingBetweenDays: true
    });
  };
  
  // Finalizar arrastre entre días
  const handleDragBetweenDaysEnd = (targetDate: string, hour: number, employeeId: string | null) => {
    console.log('[GRID] Finalizando arrastre entre días:', { targetDate, hour, employeeId });
    
    if (!draggedSchedule.entry || !draggedSchedule.isDraggingBetweenDays) return;
    
    // Solo procesar si es el mismo empleado
    if (draggedSchedule.originEmployeeId !== employeeId) {
      setDraggedSchedule({
        entry: null,
        originDate: '',
        originEmployeeId: null,
        isDraggingBetweenDays: false
      });
      return;
    }
    
    // Obtener el empleado
    const employee = employees.find(e => e.id === employeeId);
    
    if (!employee) return;
    
    // Calcular duración del horario original en minutos
    const startParts = draggedSchedule.entry.startTime.split(':');
    const endParts = draggedSchedule.entry.endTime.split(':');
    
    const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1] || '0');
    const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1] || '0');
    const duration = endMinutes - startMinutes;
    
    // Crear nueva hora de inicio basada en donde se soltó
    const newStartTime = `${hour.toString().padStart(2, '0')}:00`;
    const newStartMinutes = hour * 60;
    
    // Calcular nueva hora de fin
    const newEndMinutes = newStartMinutes + duration;
    const newEndHour = Math.floor(newEndMinutes / 60);
    const newEndMinute = newEndMinutes % 60;
    const newEndTime = `${newEndHour.toString().padStart(2, '0')}:${newEndMinute.toString().padStart(2, '0')}`;
    
    // Crear entrada de horario para el nuevo día
    const newScheduleEntry: ScheduleEntry = {
      date: targetDate,
      shift: draggedSchedule.entry.shift,
      startTime: newStartTime,
      endTime: newEndTime,
      employeeId: employeeId || ''
    };
    
    // Actualizar horario
    if (onScheduleUpdate) {
      onScheduleUpdate(newScheduleEntry);
    }
    
    // Actualizar el horario en la copia local del empleado
    if (!employee.schedule) {
      employee.schedule = [];
    }
    
    // 1. Eliminar la entrada original
    if (draggedSchedule.originDate !== targetDate) {
      employee.schedule = employee.schedule.filter(s => 
        s.date !== draggedSchedule.originDate || 
        s.shift !== draggedSchedule.entry?.shift
      );
    }
    
    // 2. Agregar/actualizar la nueva entrada
    const existingEntryIndex = employee.schedule.findIndex(s => s.date === targetDate);
    
    if (existingEntryIndex >= 0) {
      // Actualizar entrada existente
      employee.schedule[existingEntryIndex] = {
        ...employee.schedule[existingEntryIndex],
        shift: draggedSchedule.entry.shift,
        startTime: newStartTime,
        endTime: newEndTime
      };
    } else {
      // Agregar nueva entrada
      employee.schedule.push({
        date: targetDate,
        shift: draggedSchedule.entry.shift,
        startTime: newStartTime,
        endTime: newEndTime
      });
    }
    
    // Limpiar estado de arrastre
    setDraggedSchedule({
      entry: null,
      originDate: '',
      originEmployeeId: null,
      isDraggingBetweenDays: false
    });
  };

  // Manejador para drop
  const handleDrop = (e: React.DragEvent, date: string, hour: number, employeeId: string | null) => {
    e.preventDefault();
    
    if (!employeeId) return;
    
    // Manejar terminación de arrastre entre días si está activo
    if (draggedSchedule.isDraggingBetweenDays && draggedSchedule.entry) {
      handleDragBetweenDaysEnd(date, hour, employeeId);
      return;
    }
    
    try {
      // Obtener datos del elemento arrastrado
      const dragDataJson = e.dataTransfer.getData('application/json');
      
      if (!dragDataJson) return;
      
      const dragData = JSON.parse(dragDataJson);
      
      console.log('[GRID] Drop:', { dragData, date, hour, employeeId });
      
      if (dragData.type === 'shift') {
        handleAddShift(dragData.id, date, hour, employeeId);
      } else if (dragData.type === 'license') {
        handleAddLicense(dragData.id, date, hour, employeeId);
      }
    } catch (error) {
      console.error('[GRID] Error al procesar drop:', error);
    }
  };
  
  // Manejador para permitir drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necesario para permitir el drop
  };
  
  // Efecto para manejar eventos globales durante redimensionado
  useEffect(() => {
    if (!isDragging || !dragInfo) return;
    
    console.log('[GRID] Configurando manejadores globales');
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      if (!gridRef.current) return;
      
      // Actualizar tooltip
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY - 30
      }));
      
      // Obtener elemento que se está redimensionando
      if (!dragInfo?.scheduleEntry) return;
      
      const dayDate = dragInfo.scheduleEntry.date;
      const shiftId = dragInfo.scheduleEntry.shift;
      const empId = dragInfo.scheduleEntry.employeeId || '';
      const entryId = `schedule-entry-${dayDate}-${shiftId}-${empId}`;
      const entryElement = document.getElementById(entryId);
      
      if (!entryElement) {
        console.log('[GRID] No se encontró el elemento:', entryId);
        return;
      }
      
      // Obtener dimensiones
      const gridRect = gridRef.current.getBoundingClientRect();
      const totalWidth = gridRect.width - 80; // Restar ancho de columna de días
      const totalHours = endHour - startHour;
      
      // Parsear horarios actuales
      const startTimeParts = dragInfo.scheduleEntry.startTime.split(':');
      const endTimeParts = dragInfo.scheduleEntry.endTime.split(':');
      
      const startTimeHour = parseInt(startTimeParts[0]);
      const startTimeMinutes = parseInt(startTimeParts[1] || '0');
      const endTimeHour = parseInt(endTimeParts[0]);
      const endTimeMinutes = parseInt(endTimeParts[1] || '0');
      
      // Factor de reducción de sensibilidad
      const sensitivityFactor = 0.6;
      
      // Aplicar el factor de sensibilidad para reducir los cambios
      const relativeMovement = e.clientX - dragInfo.startX;
      const adjustedMovement = relativeMovement * sensitivityFactor;
      const adjustedClientX = dragInfo.startX + adjustedMovement;
      
      // Recalcular offsetX con la posición ajustada
      const adjustedOffsetX = adjustedClientX - gridRect.left - 80;
      
      // Calcular la hora usando el movimiento ajustado
      const hourDecimal = startHour + (adjustedOffsetX / totalWidth) * totalHours;
      
      // Calcular hora y minutos con snap a incrementos
      const hour = Math.floor(hourDecimal);
      let minutes = Math.floor((hourDecimal - hour) * 60);
      minutes = Math.round(minutes / timeStep) * timeStep;
      
      const newHour = Math.max(startHour, Math.min(endHour, minutes === 60 ? hour + 1 : hour));
      const newMinutes = minutes === 60 ? 0 : minutes;
      
      // Calcular duración actual en minutos
      const durationMinutes = 
        (endTimeHour * 60 + endTimeMinutes) - 
        (startTimeHour * 60 + startTimeMinutes);
      
      // Aplicar cambios según el tipo de operación
      if (dragInfo.isResizing) {
        if (dragInfo.isStartHandle) {
          // Redimensionar desde la izquierda
          const newStartTimeMinutesTotal = newHour * 60 + newMinutes;
          const endTimeMinutesTotal = endTimeHour * 60 + endTimeMinutes;
          
          // Asegurar duración mínima (30 min)
          if (newStartTimeMinutesTotal < endTimeMinutesTotal - 30) {
            // Calcular nueva posición y ancho
            const newStartHourDecimal = newHour + (newMinutes / 60);
            const newLeftPercent = ((newStartHourDecimal - startHour) / totalHours) * 100;
            const newEndHourDecimal = endTimeHour + (endTimeMinutes / 60);
            const newWidth = ((newEndHourDecimal - newStartHourDecimal) / totalHours) * 100;
            
            // Aplicar cambios
            console.log('[GRID] Redimensionando izquierda:', { 
              left: newLeftPercent, 
              width: newWidth,
              newTime: `${newHour}:${newMinutes}`
            });
            
            entryElement.style.left = `${newLeftPercent}%`;
            entryElement.style.width = `${newWidth}%`;
            
            // Actualizar horario
            const formattedNewTime = `${newHour.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
            dragInfo.scheduleEntry.startTime = formattedNewTime;
            
            // Actualizar tooltip
            setTooltip(prev => ({
              ...prev,
              content: `${formattedNewTime} - ${dragInfo.scheduleEntry.endTime}`,
              show: true
            }));
          }
        } else {
          // Redimensionar desde la derecha
          const startTimeMinutesTotal = startTimeHour * 60 + startTimeMinutes;
          const newEndTimeMinutesTotal = newHour * 60 + newMinutes;
          
          // Asegurar duración mínima (30 min)
          if (newEndTimeMinutesTotal > startTimeMinutesTotal + 30 && newHour <= endHour) {
            // Calcular nuevo ancho
            const startHourDecimal = startTimeHour + (startTimeMinutes / 60);
            const newEndHourDecimal = newHour + (newMinutes / 60);
            const newWidth = ((newEndHourDecimal - startHourDecimal) / totalHours) * 100;
            
            // Aplicar cambios
            console.log('[GRID] Redimensionando derecha:', { 
              width: newWidth,
              newTime: `${newHour}:${newMinutes}`
            });
            
            entryElement.style.width = `${newWidth}%`;
            
            // Actualizar horario
            const formattedNewTime = `${newHour.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
            dragInfo.scheduleEntry.endTime = formattedNewTime;
            
            // Actualizar tooltip
            setTooltip(prev => ({
              ...prev,
              content: `${dragInfo.scheduleEntry.startTime} - ${formattedNewTime}`,
              show: true
            }));
          }
        }
      } else {
        // Mover evento completo
        // Ajustar posición para centrar en el mouse
        const eventMouseOffset = dragInfo.initialWidth / 2;
        const adjustedOffsetX = adjustedOffsetX - eventMouseOffset;
        const adjustedHourDecimal = startHour + (adjustedOffsetX / totalWidth) * totalHours;
        
        // Calcular nueva hora de inicio con snap a incrementos
        const adjustedHour = Math.floor(adjustedHourDecimal);
        let adjustedMinutes = Math.floor((adjustedHourDecimal - adjustedHour) * 60);
        adjustedMinutes = Math.round(adjustedMinutes / timeStep) * timeStep;
        
        const newStartHour = Math.max(startHour, Math.min(endHour - 1, adjustedHour));
        const newStartMinutes = adjustedMinutes === 60 ? 0 : adjustedMinutes;
        
        // Calcular nueva hora de fin basada en la duración original
        let newEndHour = newStartHour + Math.floor(durationMinutes / 60);
        let newEndMinutes = newStartMinutes + (durationMinutes % 60);
        
        if (newEndMinutes >= 60) {
          newEndHour += 1;
          newEndMinutes -= 60;
        }
        
        // Verificar límites
        if (newStartHour >= startHour && newEndHour <= endHour) {
          // Calcular nueva posición
          const newStartHourDecimal = newStartHour + (newStartMinutes / 60);
          const newLeftPercent = ((newStartHourDecimal - startHour) / totalHours) * 100;
          
          // Aplicar cambios
          console.log('[GRID] Moviendo:', { 
            left: newLeftPercent,
            newStart: `${newStartHour}:${newStartMinutes}`,
            newEnd: `${newEndHour}:${newEndMinutes}`
          });
          
          entryElement.style.left = `${newLeftPercent}%`;
          
          // Actualizar horario
          const formattedStartTime = `${newStartHour.toString().padStart(2, '0')}:${newStartMinutes.toString().padStart(2, '0')}`;
          const formattedEndTime = `${newEndHour.toString().padStart(2, '0')}:${newEndMinutes.toString().padStart(2, '0')}`;
          
          dragInfo.scheduleEntry.startTime = formattedStartTime;
          dragInfo.scheduleEntry.endTime = formattedEndTime;
          
          // Actualizar tooltip
          setTooltip(prev => ({
            ...prev,
            content: `${formattedStartTime} - ${formattedEndTime}`,
            show: true
          }));
        }
      }
    };
    
    const handleGlobalMouseUp = () => {
      console.log('[GRID] Finalizando operación');
      
      if (dragInfo?.scheduleEntry && onScheduleUpdate) {
        console.log('[GRID] Notificando actualización:', dragInfo.scheduleEntry);
        onScheduleUpdate(dragInfo.scheduleEntry);
      }
      
      // Limpiar
      setIsDragging(false);
      setDragInfo(null);
      setTooltip(prev => ({ ...prev, show: false }));
      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
    };
    
    // Agregar listeners globales
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragInfo, timeStep, startHour, endHour, onScheduleUpdate]);

  // Calcular los días de la semana para la fecha seleccionada
  const weekDays = React.useMemo(() => {
    // Si hay más de un empleado seleccionado, mostrar solo el día actual
    if (employees.length > 1) {
      // Usar la fecha seleccionada en lugar de la fecha actual
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const date = new Date(selectedDate);
      const dayOfWeek = date.getDay();
      
      return [{
        name: dayNames[dayOfWeek],
        date: selectedDate
      }];
    }
    else if (selectedPeriod === 'Seleccionar fechas' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = [];
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      const maxDays = 30;
      let count = 0;
      
      for (let d = new Date(start); d <= end && count < maxDays; d.setDate(d.getDate() + 1), count++) {
        days.push({
          name: dayNames[d.getDay()],
          date: new Date(d).toISOString().split('T')[0]
        });
      }
      
      return days;
    } else if (selectedPeriod === 'Diario') {
      const date = new Date(selectedDate);
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      return [{
        name: dayNames[date.getDay()],
        date: date.toISOString().split('T')[0]
      }];
    } else if (selectedPeriod === 'Mensual') {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const days = [];
      const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        days.push({
          name: dayNames[d.getDay()],
          date: new Date(d).toISOString().split('T')[0]
        });
      }
      
      return days;
    } else {
      const date = new Date(selectedDate);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      
      const monday = new Date(date.setDate(diff));
      
      const days = [
        { name: 'Lunes', date: new Date(monday) },
        { name: 'Martes', date: new Date(monday) },
        { name: 'Miércoles', date: new Date(monday) },
        { name: 'Jueves', date: new Date(monday) },
        { name: 'Viernes', date: new Date(monday) },
        { name: 'Sábado', date: new Date(monday) },
        { name: 'Domingo', date: new Date(monday) }
      ];
      
      days[0].date = new Date(monday);
      for (let i = 1; i < days.length; i++) {
        const newDate = new Date(days[i-1].date);
        newDate.setDate(newDate.getDate() + 1);
        days[i].date = newDate;
      }
      
      return days.map(day => ({
        name: day.name,
        date: day.date.toISOString().split('T')[0]
      }));
    }
  }, [employees.length, selectedPeriod, selectedDate, startDate, endDate]);

  // Iniciar operación de redimensionado
  const handleMouseDown = (e: React.MouseEvent, scheduleEntry: ScheduleEntry) => {
    // Solo procesar click izquierdo (e.button === 0)
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log('[GRID] Iniciando operación:', scheduleEntry);
    
    if (!gridRef.current) return;
    
    // Obtener dimensiones
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const gridRect = gridRef.current.getBoundingClientRect();
    
    // Configurar estado de arrastre
    setDragInfo({
      isResizing: scheduleEntry.isResizingStart || scheduleEntry.isResizingEnd,
      isStartHandle: scheduleEntry.isResizingStart,
      startX: e.clientX,
      initialLeft: rect.left - gridRect.left,
      initialWidth: rect.width,
      scheduleEntry: {
        ...scheduleEntry,
        // Añadir ID del empleado para que se pueda identificar correctamente en evento global
        employeeId: scheduleEntry.employeeId
      }
    });
    
    // Configurar tooltip
    const startParts = scheduleEntry.startTime.split(':');
    const endParts = scheduleEntry.endTime.split(':');
    
    const startTimeFormatted = `${startParts[0].padStart(2, '0')}:${(startParts[1] || '00').padStart(2, '0')}`;
    const endTimeFormatted = `${endParts[0].padStart(2, '0')}:${(endParts[1] || '00').padStart(2, '0')}`;
    
    setTooltip({
      show: true,
      content: `${startTimeFormatted} - ${endTimeFormatted}`,
      x: e.clientX,
      y: e.clientY - 30
    });
    
    // Ajustar cursor según tipo de operación
    if (scheduleEntry.isResizingStart) {
      document.body.style.cursor = 'w-resize';
    } else if (scheduleEntry.isResizingEnd) {
      document.body.style.cursor = 'e-resize';
    } else {
      document.body.style.cursor = 'move';
    }
    
    document.body.style.userSelect = 'none';
    setIsDragging(true);
  };

  // Actualizar posición del tooltip durante el movimiento
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && tooltip.show) {
      setTooltip(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY - 30
      }));
    }
  };

  // Finalizar operación
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    console.log('[GRID] Finalizando operación (evento de React)');
    
    if (dragInfo?.scheduleEntry && onScheduleUpdate) {
      console.log('[GRID] Notificando actualización:', dragInfo.scheduleEntry);
      onScheduleUpdate(dragInfo.scheduleEntry);
    }
    
    setIsDragging(false);
    setDragInfo(null);
    setTooltip(prev => ({ ...prev, show: false }));
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
  };

  // Verificar si hay empleados seleccionados
  if (employees.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Seleccione uno o más empleados para ver su horario</p>
      </div>
    );
  }

  return (
    <div 
      className="overflow-auto rounded-lg mr-4 flex-1 relative"
      onContextMenu={handleContextMenu}
    >
      {tooltip.show && (
        <div 
          className="fixed bg-gray-800 text-white px-2 py-1 text-xs rounded z-50 pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%)'
          }}
        >
          {tooltip.content}
        </div>
      )}
      
      {/* Menú contextual */}
      {contextMenu.show && (
        <ContextMenu 
          x={contextMenu.x}
          y={contextMenu.y}
          date={contextMenu.date}
          hour={contextMenu.hour}
          employeeId={contextMenu.employeeId}
          onClose={handleCloseContextMenu}
          workShifts={workShifts}
          licenses={licenses}
          onAddShift={handleAddShift}
          onAddLicense={handleAddLicense}
          onAddMarking={handleAddMarking}
        />
      )}

      {/* Modal de selección de hora */}
      {timePickerModal.isOpen && (
        <TimePickerModal
          isOpen={timePickerModal.isOpen}
          onClose={handleCloseTimePicker}
          onConfirm={timePickerModal.isSecondStep ? handleExitTimeSelected : handleEntryTimeSelected}
          title={timePickerModal.isSecondStep ? "Seleccionar hora de salida" : "Seleccionar hora de entrada"}
          initialTime={timePickerModal.isSecondStep ? undefined : timePickerModal.entryTime}
        />
      )}
    
      <div 
        className="bg-white rounded-lg shadow-sm border border-gray-200" 
        ref={gridRef}
        onContextMenu={handleContextMenu}
      >
        <div className="grid grid-cols-[auto,1fr]">
          <div className="w-20 rounded-tl-lg bg-gray-50 border-r border-gray-200">
            {/* Encabezado para mostrar múltiples empleados */}
            {employees.length > 1 && (
              <div className="p-2 font-medium text-sm text-gray-700 border-b border-gray-200">
                Empleados
              </div>
            )}
          </div>
          <TimeSlotHeader startHour={startHour} endHour={endHour} />

          {/* Si hay múltiples empleados, mostrar una fila por empleado */}
          {employees.length > 1 ? (
            // Múltiples empleados - solo día actual
            employees.map(employee => weekDays.map(day => (
              <DayRow
                key={`${employee.id}-${day.date}`}
                day={employees.length > 1 ? employee.displayName || employee.name || '' : day.name}
                date={day.date}
                employee={employee}
                workShifts={workShifts}
                licenses={licenses}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                startHour={startHour}
                endHour={endHour}
                timeStep={timeStep}
                isEmployeeName={employees.length > 1}
                onContextMenu={handleShowContextMenu}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onStartDragBetweenDays={handleStartDragBetweenDays}
              />
            )))
          ) : (
            // Un solo empleado - mostrar según el período seleccionado
            weekDays.map((day) => (
              <DayRow
                key={day.date}
                day={day.name}
                date={day.date}
                employee={employees[0]}
                workShifts={workShifts}
                licenses={licenses}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                startHour={startHour}
                endHour={endHour}
                timeStep={timeStep}
                onContextMenu={handleShowContextMenu}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onStartDragBetweenDays={handleStartDragBetweenDays}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleGrid;