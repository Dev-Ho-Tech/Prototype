import React from 'react';
import { TemplateTag } from '../interface/types';
import TemplateTagComponent from './TemplateTag';

interface TemplateTagListProps {
  tags: TemplateTag[];
  onTagClick: (tag: TemplateTag) => void;
}

const TemplateTagList: React.FC<TemplateTagListProps> = ({ tags, onTagClick }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TemplateTagComponent key={tag.id} tag={tag} onClick={onTagClick} />
      ))}
    </div>
  );
};

export default TemplateTagList;