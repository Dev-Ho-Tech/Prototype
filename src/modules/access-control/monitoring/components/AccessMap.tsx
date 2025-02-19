import React from 'react';
import { MapPin, DoorClosed, AlertCircle } from 'lucide-react';
import type { MapData } from '../../../../types';

interface AccessMapProps {
  data: MapData;
}

export function AccessMap({ data }: AccessMapProps) {
  return (
    <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      {/* Placeholder for the actual map implementation */}
      <div className="absolute inset-0 p-4">
        <div className="grid grid-cols-3 gap-4">
          {data.doors.map((door) => (
            <div
              key={door.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{door.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{door.location}</span>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  door.status === 'online' ? 'bg-green-500' :
                  door.status === 'offline' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`} />
              </div>
              {door.lastEvent && (
                <div className="mt-3 text-xs text-gray-500">
                  <div className="flex items-center">
                    <DoorClosed className="w-4 h-4 mr-1" />
                    <span>{door.lastEvent}</span>
                  </div>
                </div>
              )}
              {door.alert && (
                <div className="mt-2 flex items-center text-xs text-amber-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span>{door.alert}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}