import React from 'react';
import { EmailTemplateTagProps } from '../interface/types';

const TemplateTag: React.FC<EmailTemplateTagProps> = ({ tags, onTagClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          onClick={() => onTagClick(tag)}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TemplateTag;