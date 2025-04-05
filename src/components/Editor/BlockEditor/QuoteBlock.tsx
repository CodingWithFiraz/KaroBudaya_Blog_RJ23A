
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { QuoteBlock as QuoteBlockType } from '@/types/blocks';
import BlockControls from './BlockControls';

interface QuoteBlockProps {
  block: QuoteBlockType;
  index: number;
  totalBlocks: number;
  onChange: (id: string, content: string) => void;
  onCitationChange: (id: string, citation: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string) => void;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({
  block,
  index,
  totalBlocks,
  onChange,
  onCitationChange,
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
        <div className="p-2 border-l-4 border-karo-gold dark:border-karo-darkgold bg-karo-cream dark:bg-gray-800 rounded-r-md">
          <Textarea
            value={block.content}
            onChange={(e) => onChange(block.id, e.target.value)}
            placeholder="Type quote text here..."
            className="min-h-[80px] resize-y border-0 focus-visible:ring-0 p-2 bg-transparent font-serif italic"
          />
          <input
            type="text"
            value={block.citation || ''}
            onChange={(e) => onCitationChange(block.id, e.target.value)}
            placeholder="Attribution (optional)"
            className="w-full mt-2 p-2 text-sm border-0 bg-transparent text-right focus:outline-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteBlock;
