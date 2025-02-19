import React from 'react';
import { DoorClosed, User, Clock, Shield, AlertCircle } from 'lucide-react';
import type { AccessEvent } from '../../../../types';

interface EventStreamProps {
  events: AccessEvent[];
}

export function EventStream({ events }: EventStreamProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'entry':
        return <DoorClosed className="w-5 h-5 text-green-500" />;
      case 'exit':
        return <DoorClosed className="w-5 h-5 text-blue-500" />;
      case 'denied':
        return <Shield className="w-5 h-5 text-red-500" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'entry':
        return 'bg-green-100 text-green-800';
      case 'exit':
        return 'bg-blue-100 text-blue-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'alert':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    getEventColor(event.type)
                  }`}>
                    {event.type === 'entry' ? 'Entrada' :
                     event.type === 'exit' ? 'Salida' :
                     event.type === 'denied' ? 'Denegado' :
                     'Alerta'}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{event.door}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="mt-1 flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{event.user}</span>
              </div>
              {event.details && (
                <p className="mt-1 text-sm text-gray-500">{event.details}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}