// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { ToastProps } from '../interface/types';
// import { X } from 'lucide-react';

// interface ToastContextType {
//   showToast: (toast: ToastProps) => void;
//   hideToast: () => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export const useToast = () => {
//   const context = useContext(ToastContext);
//   if (!context) {
//     throw new Error('useToast must be used within a ToastProvider');
//   }
//   return context;
// };

// interface ToastProviderProps {
//   children: ReactNode;
// }

// export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
//   const [toast, setToast] = useState<ToastProps | null>(null);
//   const [visible, setVisible] = useState(false);

//   const showToast = (newToast: ToastProps) => {
//     setToast(newToast);
//     setVisible(true);

//     // Auto-hide toast after 3 seconds
//     setTimeout(() => {
//       setVisible(false);
//       setTimeout(() => setToast(null), 300); // Clear after fade out
//     }, 3000);
//   };

//   const hideToast = () => {
//     setVisible(false);
//     setTimeout(() => setToast(null), 300); // Clear after fade out
//   };

//   return (
//     <ToastContext.Provider value={{ showToast, hideToast }}>
//       {children}
      
//       {toast && (
//         <div 
//           className={`fixed bottom-4 right-4 max-w-md transition-opacity duration-300 z-50 ${
//             visible ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <div 
//             className={`flex items-start p-4 rounded-md shadow-lg ${
//               toast.variant === 'success' 
//                 ? 'bg-green-50 border-l-4 border-green-500' 
//                 : toast.variant === 'destructive' 
//                 ? 'bg-red-50 border-l-4 border-red-500' 
//                 : 'bg-blue-50 border-l-4 border-blue-500'
//             }`}
//           >
//             <div className="flex-grow">
//               <h3 
//                 className={`font-medium ${
//                   toast.variant === 'success' 
//                     ? 'text-green-800' 
//                     : toast.variant === 'destructive' 
//                     ? 'text-red-800' 
//                     : 'text-blue-800'
//                 }`}
//               >
//                 {toast.title}
//               </h3>
//               <p 
//                 className={`mt-1 text-sm ${
//                   toast.variant === 'success' 
//                     ? 'text-green-700' 
//                     : toast.variant === 'destructive' 
//                     ? 'text-red-700' 
//                     : 'text-blue-700'
//                 }`}
//               >
//                 {toast.description}
//               </p>
//             </div>
//             <button 
//               onClick={hideToast}
//               className={`ml-4 p-1 rounded-full ${
//                 toast.variant === 'success' 
//                   ? 'text-green-500 hover:bg-green-100' 
//                   : toast.variant === 'destructive' 
//                   ? 'text-red-500 hover:bg-red-100' 
//                   : 'text-blue-500 hover:bg-blue-100'
//               }`}
//             >
//               <X size={16} />
//             </button>
//           </div>
//         </div>
//       )}
//     </ToastContext.Provider>
//   );
// };