import React, { useState } from 'react';
import { Search, Filter, MapPin, DoorClosed, AlertCircle, Lock, Unlock, Shield, Bell, Users, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { monitoringData } from './data';
import { AccessMap } from './components/AccessMap';
import { EventStream } from './components/EventStream';
import { ControlPanel } from './components/ControlPanel';
import { StatsPanel } from './components/StatsPanel';

export function MonitoringScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [showMap, setShowMap] = useState(true);

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Monitoreo en Tiempo Real</h1>
              <p className="mt-1 text-sm text-gray-500">
                Control y seguimiento de accesos en tiempo real
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Puertas activas</p>
                  <p className="text-2xl font-semibold text-green-600">18/24</p>
                  <div className="flex items-center mt-1 text-sm text-green-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+2 vs ayer</span>
                  </div>
                </div>
                <DoorClosed className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Accesos hoy</p>
                  <p className="text-2xl font-semibold text-blue-600">1,248</p>
                  <div className="flex items-center mt-1 text-sm text-blue-600">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    <span>+15% vs promedio</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Accesos denegados</p>
                  <p className="text-2xl font-semibold text-red-600">23</p>
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <ArrowDownRight className="w-4 h-4 mr-1" />
                    <span>-5% vs ayer</span>
                  </div>
                </div>
                <Shield className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Alertas activas</p>
                  <p className="text-2xl font-semibold text-yellow-600">5</p>
                  <div className="flex items-center mt-1 text-sm text-yellow-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>2 críticas</span>
                  </div>
                </div>
                <Bell className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="flex space-x-6">
            {/* Left Panel - Map/Events */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setShowMap(true)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          showMap
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Mapa interactivo
                      </button>
                      <button
                        onClick={() => setShowMap(false)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          !showMap
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Lista de eventos
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="all">Todas las ubicaciones</option>
                        <option value="gran_almirante">Gran Almirante</option>
                        <option value="garden_court">Garden Court</option>
                        <option value="centro_plaza">Centro Plaza</option>
                      </select>
                      <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg">
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {showMap ? (
                    <AccessMap data={monitoringData.mapData} />
                  ) : (
                    <EventStream events={monitoringData.events} />
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Controls */}
            <div className="w-96">
              <div className="space-y-6">
                <ControlPanel doors={monitoringData.doors} />
                <StatsPanel stats={monitoringData.stats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}