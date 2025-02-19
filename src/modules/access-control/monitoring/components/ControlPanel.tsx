import React from 'react';
import { Lock, Unlock, AlertTriangle, Shield } from 'lucide-react';
import type { Door } from '../../../../types';

interface ControlPanelProps {
  doors: Door[];
}

export function ControlPanel({ doors }: ControlPanelProps) {
  const handleDoorAction = (doorId: string, action: 'lock' | 'unlock' | 'emergency') => {
    // Handle door control actions
    console.log(`Door ${doorId} action: ${action}`);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Panel de Control</h2>
      </div>
      <div className="p-4 space-y-4">
        {doors.map((door) => (
          <div
            key={door.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{door.name}</h3>
                <p className="text-sm text-gray-500">{door.location}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                door.status === 'online' ? 'bg-green-500' :
                door.status === 'offline' ? 'bg-red-500' :
                'bg-yellow-500'
              }`} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDoorAction(door.id, 'lock')}
                className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Lock className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDoorAction(door.id, 'unlock')}
                className="flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Unlock className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDoorAction(door.id, 'emergency')}
                className="flex items-center justify-center px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        <div className="pt-4 border-t border-gray-200">
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Modo Emergencia Global</span>
          </button>
        </div>
      </div>
    </div>
  );
}