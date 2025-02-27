import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  availableTags: string[];
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags, availableTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputValue('');
    setShowDropdown(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const filteredTags = availableTags.filter(
    tag => !tags.includes(tag) && tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2 items-center">
        {tags.map(tag => (
          <div 
            key={tag} 
            className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
          >
            <span className="mr-1">{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        <div className="relative">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Agregar campo..."
              className="text-sm bg-transparent outline-none w-24"
            />
            <Plus className="w-4 h-4 text-gray-400" />
          </div>
          
          {showDropdown && filteredTags.length > 0 && (
            <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
              {filteredTags.map(tag => (
                <div
                  key={tag}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};