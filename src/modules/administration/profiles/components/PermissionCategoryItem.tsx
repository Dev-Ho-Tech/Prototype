import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Permission, PermissionCategory } from '../interfaces/Profile';

interface PermissionCategoryItemProps {
  category: PermissionCategory;
  onToggleExpand: (id: string) => void;
  onTogglePermission: (permission: Permission) => void;
}

export const PermissionCategoryItem: React.FC<PermissionCategoryItemProps> = ({ 
  category, 
  onToggleExpand, 
  onTogglePermission 
}) => {
  return (
    <div className="border rounded-md mb-2 overflow-hidden">
      <div 
        className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
        onClick={() => onToggleExpand(category.id)}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500 mr-3"
            checked={category.permissions.every(p => p.isEnabled)}
            onChange={() => {
              const allEnabled = category.permissions.every(p => p.isEnabled);
              category.permissions.forEach(permission => {
                if (allEnabled !== permission.isEnabled) {
                  onTogglePermission({...permission, isEnabled: !allEnabled});
                }
              });
            }}
          />
          <span className="font-medium">{category.name}</span>
        </div>
        {category.isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
      
      {category.isExpanded && (
        <div className="p-3 pl-10 space-y-2">
          {category.permissions.map(permission => (
            <div key={permission.id} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500 mr-3"
                checked={permission.isEnabled}
                onChange={() => onTogglePermission({...permission, isEnabled: !permission.isEnabled})}
              />
              <span>{permission.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};