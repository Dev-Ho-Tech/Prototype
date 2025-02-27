import { useState } from 'react';
import { X, Fingerprint, Camera, CreditCard, Key } from 'lucide-react';
import { BiometricData } from '../interfaces/BiometricData';

interface BiometricRegistrationProps {
  employeeData: BiometricData;
  onClose: () => void;
}

export function BiometricRegistration({ employeeData, onClose }: BiometricRegistrationProps) {
  const [activeTab, setActiveTab] = useState<'fingerprint' | 'face' | 'card' | 'pin'>('fingerprint');
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'capturing' | 'success' | 'error'>('idle');

  const handleCapture = () => {
    setCaptureStatus('capturing');
    setTimeout(() => {
      setCaptureStatus('success');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Registro Biométrico - {employeeData.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('fingerprint')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'fingerprint'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Fingerprint className="w-5 h-5" />
              <span>Huella digital</span>
            </button>
            <button
              onClick={() => setActiveTab('face')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'face'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span>Rostro</span>
            </button>
            <button
              onClick={() => setActiveTab('card')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'card'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Tarjeta</span>
            </button>
            <button
              onClick={() => setActiveTab('pin')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                activeTab === 'pin'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Key className="w-5 h-5" />
              <span>PIN</span>
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            {activeTab === 'fingerprint' && (
              <div className="text-center">
                <Fingerprint className="w-24 h-24 mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Registro de huella digital
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Coloque su dedo en el lector para capturar la huella
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Dedo índice derecho</span>
                    <span className="text-sm text-green-600">Registrado (95%)</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Dedo índice izquierdo</span>
                    <button
                      onClick={handleCapture}
                      disabled={captureStatus === 'capturing'}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                    >
                      {captureStatus === 'capturing' ? 'Capturando...' : 'Capturar'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'face' && (
              <div className="text-center">
                <Camera className="w-24 h-24 mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Registro facial
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Mire directamente a la cámara y mantenga su rostro dentro del marco
                </p>
                <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Vista previa de la cámara</span>
                </div>
                <button
                  onClick={handleCapture}
                  disabled={captureStatus === 'capturing'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {captureStatus === 'capturing' ? 'Capturando...' : 'Capturar rostro'}
                </button>
              </div>
            )}

            {activeTab === 'card' && (
              <div className="text-center">
                <CreditCard className="w-24 h-24 mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Registro de tarjeta
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Acerque la tarjeta al lector para registrarla
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Número de tarjeta</span>
                    <input
                      type="text"
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="A123456"
                    />
                  </div>
                  <button
                    onClick={handleCapture}
                    disabled={captureStatus === 'capturing'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {captureStatus === 'capturing' ? 'Registrando...' : 'Registrar tarjeta'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'pin' && (
              <div className="text-center">
                <Key className="w-24 h-24 mx-auto text-blue-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Configuración de PIN
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Ingrese un PIN de 4 a 6 dígitos
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">PIN</span>
                    <input
                      type="password"
                      maxLength={6}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="******"
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Confirmar PIN</span>
                    <input
                      type="password"
                      maxLength={6}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="******"
                    />
                  </div>
                  <button
                    onClick={handleCapture}
                    disabled={captureStatus === 'capturing'}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {captureStatus === 'capturing' ? 'Guardando...' : 'Guardar PIN'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}