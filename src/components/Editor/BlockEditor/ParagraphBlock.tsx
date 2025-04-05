
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ParagraphBlock as ParagraphBlockType } from '@/types/blocks';
import BlockControls from './BlockControls';

interface ParagraphBlockProps {
  block: ParagraphBlockType;
  index: number;
  totalBlocks: number;
  onChange: (id: string, content: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string) => void;
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({
  block,
  index,
  totalBlocks,
  onChange,
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
        <Textarea
          value={block.content}
          onChange={(e) => onChange(block.id, e.target.value)}
          placeholder="Type paragraph text here..."
          className="min-h-[100px] resize-y border-0 focus-visible:ring-0 p-2"
        />
      </div>
    </div>
  );
};

export default ParagraphBlock;
