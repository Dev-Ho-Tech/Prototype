import React, { useState } from 'react';
import { Lock, User, Loader, Mail, X } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecovering(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRecoverySuccess(true);
    } catch (error) {
      console.error('Recovery error:', error);
    } finally {
      setIsRecovering(false);
    }
  };

  const handleCloseRecoveryModal = () => {
    setShowRecoveryModal(false);
    setRecoveryEmail('');
    setRecoverySuccess(false);
  };

  return (
    <div className="relative w-screen h-screen flex items-center bg-gradient-to-tl from-blue-700 to-blue-500">
      {/* Background with wave patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
          <path
            className="animate-wave"
            fill="url(#wave-gradient)"
            d="M-200 200 C 400 100, 1000 300, 1600 200 C 2200 100, 2800 300, 3400 200 L 3400 2000 L -200 2000 Z"
          />
          <path
            className="animate-wave"
            fill="url(#wave-gradient)"
            d="M-200 400 C 400 300, 1000 500, 1600 400 C 2200 300, 2800 500, 3400 400 L 3400 2000 L -200 2000 Z"
            style={{ animationDelay: '0.5s' }}
          />
          <path
            className="animate-wave"
            fill="url(#wave-gradient)"
            d="M-200 600 C 400 500, 1000 700, 1600 600 C 2200 500, 2800 700, 3400 600 L 3400 2000 L -200 2000 Z"
            style={{ animationDelay: '1s' }}
          />
          <path
            className="animate-wave"
            fill="url(#wave-gradient)"
            d="M-200 800 C 400 700, 1000 900, 1600 800 C 2200 700, 2800 900, 3400 800 L 3400 2000 L -200 2000 Z"
            style={{ animationDelay: '1.5s' }}
          />
          <path
            className="animate-wave"
            fill="url(#wave-gradient)"
            d="M-200 1000 C 400 900, 1000 1100, 1600 1000 C 2200 900, 2800 1100, 3400 1000 L 3400 2000 L -200 2000 Z"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>

      {/* Form container - Left aligned */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 w-96 m-8">
        <div className="flex flex-col items-center">
          {/* Logo and System Name */}
          <div className="mb-8 text-center logo-container">
            <img
              src="https://ho-tech.com/wp-content/uploads/2020/06/HoTech-Logo_Mesa-de-trabajo-1-copy.png"
              alt="Hotel Management System"
              className="w-32 mx-auto mb-4 filter drop-shadow-lg"
            />
            <h1 className="text-2xl font-semibold text-gray-900">
              Sistema de Gestión Hotelera
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Ingrese su usuario"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Ingrese su contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowRecoveryModal(true)}
                className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
              >
                ¿Olvidó su contraseña?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1a56db] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>

        {/* Company Name */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Ho-Tech del Caribe
          </p>
        </div>
      </div>

      {/* Password Recovery Modal */}
      {showRecoveryModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Recuperar contraseña
              </h2>
              <button
                onClick={handleCloseRecoveryModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {!recoverySuccess ? (
              <form onSubmit={handleRecoverySubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                      placeholder="Ingrese su correo electrónico"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isRecovering}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#1a56db] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRecovering ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Enviar instrucciones'
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="mb-4 text-green-500">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Instrucciones enviadas
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Hemos enviado las instrucciones de recuperación a su correo electrónico.
                </p>
                <button
                  onClick={handleCloseRecoveryModal}
                  className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:underline"
                >
                  Volver al inicio de sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}