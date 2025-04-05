import React, { useState, useEffect } from 'react';
import { Block, BlockType, ParagraphBlock, HeadingBlock, ImageBlock, QuoteBlock } from '@/types/blocks';
import ParagraphBlockComponent from './ParagraphBlock';
import HeadingBlockComponent from './HeadingBlock';
import ImageBlockComponent from './ImageBlock';
import QuoteBlockComponent from './QuoteBlock';
import BlockAdder from './BlockAdder';

interface BlockEditorProps {
  initialContent?: string;
  initialBlocks?: Block[];
  onChange: (blocks: Block[]) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ initialContent, initialBlocks, onChange }) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks || []);

  // Initialize with a paragraph block if no blocks exist
  useEffect(() => {
    if (blocks.length === 0) {
      if (initialContent) {
        // If we have initial content, create a paragraph block with it
        addBlock('paragraph', initialContent);
      } else if (!initialBlocks) {
        // Otherwise create an empty paragraph block
        addBlock('paragraph');
      }
    }
  }, []);

  // Notify parent component when blocks change
  useEffect(() => {
    onChange(blocks);
  }, [blocks, onChange]);

  const createBlock = (type: BlockType, content: string = ''): Block => {
    const id = Math.random().toString(36).substring(2, 9);
    
    switch (type) {
      case 'paragraph':
        return { id, type, content };
      case 'heading':
        return { id, type, content, level: 2 };
      case 'image':
        return { id, type, url: '' };
      case 'quote':
        return { id, type, content };
      default:
        return { id, type: 'paragraph', content };
    }
  };

  const addBlock = (type: BlockType, content: string = '') => {
    const newBlock = createBlock(type, content);
    setBlocks(prev => [...prev, newBlock]);
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const updateHeadingLevel = (id: string, level: 1 | 2 | 3) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id && block.type === 'heading' 
          ? { ...block, level } 
          : block
      )
    );
  };

  const updateImageBlock = (id: string, updates: Partial<ImageBlock>) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id && block.type === 'image' 
          ? { ...block, ...updates } 
          : block
      )
    );
  };

  const updateQuoteCitation = (id: string, citation: string) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id && block.type === 'quote' 
          ? { ...block, citation } 
          : block
      )
    );
  };

  const moveBlockUp = (id: string) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index <= 0) return; // Can't move up if it's the first block

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index - 1];
    newBlocks[index - 1] = temp;
    
    setBlocks(newBlocks);
  };

  const moveBlockDown = (id: string) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index === -1 || index === blocks.length - 1) return; // Can't move down if it's the last block

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[index + 1];
    newBlocks[index + 1] = temp;
    
    setBlocks(newBlocks);
  };

  const deleteBlock = (id: string) => {
    setBlocks(prev => {
      const filtered = prev.filter(block => block.id !== id);
      // If all blocks would be deleted, create a new empty paragraph block
      if (filtered.length === 0) {
        return [createBlock('paragraph')];
      }
      return filtered;
    });
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <ParagraphBlockComponent
            key={block.id}
            block={block}
            index={index}
            totalBlocks={blocks.length}
            onChange={updateBlockContent}
            onMoveUp={moveBlockUp}
            onMoveDown={moveBlockDown}
            onDelete={deleteBlock}
          />
        );
      case 'heading':
        return (
          <HeadingBlockComponent
            key={block.id}
            block={block}
            index={index}
            totalBlocks={blocks.length}
            onChange={updateBlockContent}
            onLevelChange={updateHeadingLevel}
            onMoveUp={moveBlockUp}
            onMoveDown={moveBlockDown}
            onDelete={deleteBlock}
          />
        );
      case 'image':
        return (
          <ImageBlockComponent
            key={block.id}
            block={block}
            index={index}
            totalBlocks={blocks.length}
            onChange={updateImageBlock}
            onMoveUp={moveBlockUp}
            onMoveDown={moveBlockDown}
            onDelete={deleteBlock}
          />
        );
      case 'quote':
        return (
          <QuoteBlockComponent
            key={block.id}
            block={block}
            index={index}
            totalBlocks={blocks.length}
            onChange={updateBlockContent}
            onCitationChange={updateQuoteCitation}
            onMoveUp={moveBlockUp}
            onMoveDown={moveBlockDown}
            onDelete={deleteBlock}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="block-editor">
      {blocks.map((block, index) => renderBlock(block, index))}
      <BlockAdder onAddBlock={addBlock} />
    </div>
  );
};

export default BlockEditor;
