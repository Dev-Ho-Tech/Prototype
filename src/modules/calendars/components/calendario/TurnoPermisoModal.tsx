/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Turno } from '../../interfaces/Turno';
import { Permiso } from '../../interfaces/Permiso';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Button } from '../ui/button';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '../ui/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface TurnoPermisoModalProps {
  isOpen: boolean;
  onClose: () => void;
  turnos: Turno[];
  permisos: Permiso[];
  empleadoId: string;
  empleadoNombre: string;
  fechaInicial: Date;
  onGuardar: (data: any) => void;
}

export const TurnoPermisoModal: React.FC<TurnoPermisoModalProps> = ({
  isOpen,
  onClose,
  turnos,
  permisos,
  empleadoId,
  empleadoNombre,
  fechaInicial,
  onGuardar
}) => {
  const [tabActivo, setTabActivo] = useState('turno');
  const [fechaInicio, setFechaInicio] = useState<Date>(fechaInicial);
  const [fechaFin, setFechaFin] = useState<Date>(fechaInicial);
  const [tipoSeleccionadoId, setTipoSeleccionadoId] = useState('');
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [horaFin, setHoraFin] = useState('17:00');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      empleadoId,
      tipo: tabActivo,
      tipoId: tipoSeleccionadoId,
      fechaInicio: fechaInicio.toISOString().split('T')[0],
      fechaFin: fechaFin.toISOString().split('T')[0],
      horaInicio,
      horaFin,
      motivo
    };

    onGuardar(data);
    onClose();
  };

  // Actualiza la hora inicio/fin al cambiar el tipo
  useEffect(() => {
    if (tabActivo === 'turno' && tipoSeleccionadoId) {
      const turnoSeleccionado = turnos.find(t => t.id === tipoSeleccionadoId);
      if (turnoSeleccionado) {
        // Extraemos solo la hora del formato "08:00 am"
        setHoraInicio(turnoSeleccionado.horaInicio.split(' ')[0]);
        setHoraFin(turnoSeleccionado.horaFin.split(' ')[0]);
      }
    }
  }, [tabActivo, tipoSeleccionadoId, turnos]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Agregar {tabActivo === 'turno' ? 'Turno' : 'Permiso'}</DialogTitle>
            <DialogDescription>
              Para el empleado: <span className="font-medium">{empleadoNombre}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <Tabs value={tabActivo} onValueChange={setTabActivo}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="turno" className="bg-white data-[state=active]:bg-blue-50">Turno</TabsTrigger>
                <TabsTrigger value="permiso" className="bg-white data-[state=active]:bg-blue-50">Permiso</TabsTrigger>
              </TabsList>
              
              <TabsContent value="turno" className="space-y-4 bg-white p-4 rounded-md">
                <div>
                  <Label htmlFor="turno">Seleccione un turno</Label>
                  <Select 
                    value={tipoSeleccionadoId} 
                    onValueChange={setTipoSeleccionadoId}
                  >
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Seleccionar turno" />
                    </SelectTrigger>
                    <SelectContent>
                      {turnos.map(turno => (
                        <SelectItem key={turno.id} value={turno.id}>
                          <div className="flex items-center">
                            <span className={cn("w-4 h-4 rounded-full mr-2", turno.color.split(' ')[0])}></span>
                            <span>{turno.codigo} - {turno.nombre}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="permiso" className="space-y-4 bg-white p-4 rounded-md">
                <div>
                  <Label htmlFor="permiso">Seleccione un permiso</Label>
                  <Select 
                    value={tipoSeleccionadoId} 
                    onValueChange={setTipoSeleccionadoId}
                  >
                    <SelectTrigger className="mt-1 bg-white">
                      <SelectValue placeholder="Seleccionar permiso" />
                    </SelectTrigger>
                    <SelectContent>
                      {permisos.map(permiso => (
                        <SelectItem key={permiso.id} value={permiso.id}>
                          <div className="flex items-center">
                            <span className={cn("w-4 h-4 rounded-full mr-2", permiso.color.split(' ')[0])}></span>
                            <span>{permiso.codigo} - {permiso.nombre}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fechaInicio">Fecha inicio</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="fechaInicio"
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white mt-1"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fechaInicio ? format(fechaInicio, 'dd/MM/yyyy', { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                      mode="single"
                      selected={fechaInicio}
                      onSelect={(date) => date && setFechaInicio(date)}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {tabActivo === 'permiso' && (
                <div>
                  <Label htmlFor="fechaFin">Fecha fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="fechaFin"
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white mt-1"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fechaFin ? format(fechaFin, 'dd/MM/yyyy', { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <Calendar
                        mode="single"
                        selected={fechaFin}
                        onSelect={(date) => date && setFechaFin(date)}
                        initialFocus
                        locale={es}
                        disabled={(date) => date < fechaInicio}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="horaInicio">Hora inicio</Label>
                <div className="relative mt-1">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="horaInicio"
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="horaFin">Hora fin</Label>
                <div className="relative mt-1">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="horaFin"
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    className="pl-10 bg-white"
                  />
                </div>
              </div>
            </div>

            {tabActivo === 'permiso' && (
              <div>
                <Label htmlFor="motivo">Motivo</Label>
                <Textarea
                  id="motivo"
                  placeholder="Describa el motivo del permiso..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  rows={3}
                  className="mt-1 bg-white"
                />
              </div>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} className="bg-white">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};