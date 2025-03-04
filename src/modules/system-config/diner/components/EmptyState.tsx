import React from 'react';
import { FolderPlus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  icon?: React.ReactNode;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionText,
  icon = <FolderPlus className="h-12 w-12 text-gray-400" />,
  onAction
}) => {
  return (
    <div className="bg-white p-8 text-center rounded-lg border border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-gray-100 p-3 rounded-full">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 max-w-md">{message}</p>
        
        {actionText && onAction && (
          <button
            onClick={onAction}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;