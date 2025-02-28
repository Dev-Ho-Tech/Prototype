import React from 'react';

const TestScreen: React.FC = () => {
  return (
    <div className="p-8 bg-white m-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        ¡Prueba de visualización exitosa!
      </h1>
      <p className="text-gray-600">
        Si puedes ver este mensaje, el problema no está en el componente, 
        sino en la configuración de rutas o en la estructura de archivos.
      </p>
    </div>
  );
};

export default TestScreen;