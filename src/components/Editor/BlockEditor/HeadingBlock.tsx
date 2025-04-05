
import React from 'react';
import { HeadingBlock as HeadingBlockType } from '@/types/blocks';
import BlockControls from './BlockControls';

interface HeadingBlockProps {
  block: HeadingBlockType;
  index: number;
  totalBlocks: number;
  onChange: (id: string, content: string) => void;
  onLevelChange: (id: string, level: 1 | 2 | 3) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string) => void;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({
  block,
  index,
  totalBlocks,
  onChange,
  onLevelChange,
  onMoveUp,
  onMoveDown,
  onDelete
}) => {
  return (
    <div className="block-item group relative mb-4">
      <BlockControls
        index={index}
        totalBlocks={totalBlocks}
        onMoveUp={() => onMoveUp(block.id)}
        onMoveDown={() => onMoveDown(block.id)}
        onDelete={() => onDelete(block.id)}
      />
      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-1 focus-within:ring-2 focus-within:ring-karo-gold focus-within:ring-opacity-50">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-2">
          <select
            value={block.level}
            onChange={(e) => onLevelChange(block.id, Number(e.target.value) as 1 | 2 | 3)}
            className="bg-transparent text-sm border-0 outline-none dark:text-white"
          >
            <option value={1}>Heading 1</option>
            <option value={2}>Heading 2</option>
            <option value={3}>Heading 3</option>
          </select>
        </div>
        <input
          type="text"
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
          placeholder="Heading text..."
          className={`w-full p-2 border-0 outline-none bg-transparent dark:text-white
            ${block.level === 1 ? 'text-2xl font-bold' : ''}
            ${block.level === 2 ? 'text-xl font-semibold' : ''}
            ${block.level === 3 ? 'text-lg font-medium' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default HeadingBlock;
