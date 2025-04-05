
import React from 'react';
import { ChevronUp, ChevronDown, Trash, GripVertical } from 'lucide-react';

interface BlockControlsProps {
  index: number;
  totalBlocks: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

const BlockControls: React.FC<BlockControlsProps> = ({
  index,
  totalBlocks,
  onMoveUp,
  onMoveDown,
  onDelete
}) => {
  return (
    <div className="block-controls opacity-0 group-hover:opacity-100 absolute -left-10 top-1/2 transform -translate-y-1/2 flex flex-col bg-white dark:bg-gray-800 shadow-md rounded-md p-1">
      <button
        type="button"
        className="p-1 text-gray-500 hover:text-karo-gold"
        onClick={onMoveUp}
        disabled={index === 0}
        title="Move up"
      >
        <ChevronUp size={14} className={index === 0 ? "opacity-50" : ""} />
      </button>
      
      <button
        type="button"
        className="p-1 text-gray-500 hover:text-karo-gold"
        onClick={onMoveDown}
        disabled={index === totalBlocks - 1}
        title="Move down"
      >
        <ChevronDown size={14} className={index === totalBlocks - 1 ? "opacity-50" : ""} />
      </button>
      
      <button
        type="button"
        className="p-1 text-gray-500 hover:text-destructive"
        onClick={onDelete}
        title="Delete block"
      >
        <Trash size={14} />
      </button>
      
      <div className="p-1 text-gray-400 cursor-grab" title="Drag to reorder">
        <GripVertical size={14} />
      </div>
    </div>
  );
};

export default BlockControls;
