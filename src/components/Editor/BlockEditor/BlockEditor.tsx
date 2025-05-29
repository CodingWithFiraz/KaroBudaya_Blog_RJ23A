
import React, { useState, useEffect, useCallback } from 'react';
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
  articleId?: string;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ initialContent, initialBlocks, onChange, articleId }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize blocks only once
  useEffect(() => {
    if (!isInitialized) {
      if (initialBlocks && initialBlocks.length > 0) {
        setBlocks(initialBlocks);
      } else if (initialContent) {
        const newBlock = createBlock('paragraph', initialContent);
        setBlocks([newBlock]);
      } else {
        const newBlock = createBlock('paragraph');
        setBlocks([newBlock]);
      }
      setIsInitialized(true);
    }
  }, [initialBlocks, initialContent, isInitialized]);

  // Memoize the onChange callback to prevent unnecessary re-renders
  const handleBlocksChange = useCallback((newBlocks: Block[]) => {
    onChange(newBlocks);
  }, [onChange]);

  // Notify parent component when blocks change, but only after initialization
  useEffect(() => {
    if (isInitialized && blocks.length > 0) {
      handleBlocksChange(blocks);
    }
  }, [blocks, isInitialized, handleBlocksChange]);

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

  const addBlock = useCallback((type: BlockType, content: string = '') => {
    const newBlock = createBlock(type, content);
    setBlocks(prev => [...prev, newBlock]);
  }, []);

  const updateBlockContent = useCallback((id: string, content: string) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, content } : block
      )
    );
  }, []);

  const updateHeadingLevel = useCallback((id: string, level: 1 | 2 | 3) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id && block.type === 'heading' 
          ? { ...block, level } 
          : block
      )
    );
  }, []);

  const updateImageBlock = useCallback((id: string, updates: Partial<ImageBlock>) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id && block.type === 'image' 
          ? { ...block, ...updates } 
          : block
      )
    );
  }, []);

  const updateQuoteCitation = useCallback((id: string, citation: string) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id && block.type === 'quote' 
          ? { ...block, citation } 
          : block
      )
    );
  }, []);

  const moveBlockUp = useCallback((id: string) => {
    setBlocks(prev => {
      const index = prev.findIndex(block => block.id === id);
      if (index <= 0) return prev;

      const newBlocks = [...prev];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index - 1];
      newBlocks[index - 1] = temp;
      
      return newBlocks;
    });
  }, []);

  const moveBlockDown = useCallback((id: string) => {
    setBlocks(prev => {
      const index = prev.findIndex(block => block.id === id);
      if (index === -1 || index === prev.length - 1) return prev;

      const newBlocks = [...prev];
      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[index + 1];
      newBlocks[index + 1] = temp;
      
      return newBlocks;
    });
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const filtered = prev.filter(block => block.id !== id);
      if (filtered.length === 0) {
        return [createBlock('paragraph')];
      }
      return filtered;
    });
  }, []);

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
            articleId={articleId}
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

  if (!isInitialized) {
    return <div className="block-editor">Loading...</div>;
  }

  return (
    <div className="block-editor">
      {blocks.map((block, index) => renderBlock(block, index))}
      <BlockAdder onAddBlock={addBlock} />
    </div>
  );
};

export default BlockEditor;
