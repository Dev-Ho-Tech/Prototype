interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'personal'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange('personal')}
        >
          Datos personales
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === 'laboral'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onTabChange('laboral')}
        >
          Datos laborales
        </button>
      </div>
    </div>
  );
};