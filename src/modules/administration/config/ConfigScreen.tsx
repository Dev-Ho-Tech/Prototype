import { useState } from 'react';
import { Globe2, Link, Sliders, Bell, Save } from 'lucide-react';
import { ConfigTabs } from './components/ConfigTabs';
import { BaseConfig } from './components/BaseConfig';
import { VipsConfig } from './components/VipsConfig';
import { EmailConfig } from './components/EmailConfig';
import { ParamsConfig } from './components/ParamsConfig';
import { AlertsConfig } from './components/AlertsConfig';

const tabs = [
  { id: 'base', label: 'Configuración Base', icon: Globe2 },
  { id: 'vips', label: 'Integración VIPS 3.0', icon: Link },
  // { id: 'email', label: 'Configuración de Correo', icon: Mail },
  { id: 'params', label: 'Parametrización', icon: Sliders },
  { id: 'alerts', label: 'Alertas y Notificaciones', icon: Bell }
];

export function ConfigScreen() {
  const [currentTab, setCurrentTab] = useState('base');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Aquí iría la lógica real de guardado
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Configuración General</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administra la configuración global del sistema
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Save className="w-5 h-5" />
            <span>{isSaving ? 'Guardando...' : 'Guardar cambios'}</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <ConfigTabs tabs={tabs} currentTab={currentTab} onChange={setCurrentTab} />
          
          <div className="p-6">
            {currentTab === 'base' && <BaseConfig />}
            {currentTab === 'vips' && <VipsConfig />}
            {currentTab === 'email' && <EmailConfig />}
            {currentTab === 'params' && <ParamsConfig />}
            {currentTab === 'alerts' && <AlertsConfig />}
          </div>
        </div>
      </div>
    </div>
  );
}