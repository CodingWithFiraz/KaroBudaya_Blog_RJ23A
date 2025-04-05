
export type BlockType = 'paragraph' | 'heading' | 'image' | 'quote';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  content: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  content: string;
  level: 1 | 2 | 3;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  url: string;
  caption?: string;
  alt?: string;
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  content: string;
  citation?: string;
}

export type Block = ParagraphBlock | HeadingBlock | ImageBlock | QuoteBlock;
