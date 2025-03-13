import React, { useState } from "react";

export const Toggle: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <button
      onClick={() => setIsChecked(!isChecked)}
      className={`relative w-11 h-6 flex items-center rounded-full transition-colors ${
        isChecked ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
          isChecked ? "translate-x-5" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
};
