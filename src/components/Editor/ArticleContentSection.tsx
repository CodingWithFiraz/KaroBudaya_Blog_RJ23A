
import React, { useEffect } from 'react';
import FormSection from './FormSection';
import { Textarea } from '@/components/ui/textarea';
import BlockEditor from './BlockEditor/BlockEditor';
import { Block } from '@/types/blocks';

interface ArticleContentSectionProps {
  title: string;
  summary: string;
  content: string;
  blocks: Block[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlocksChange: (blocks: Block[]) => void;
}

const ArticleContentSection: React.FC<ArticleContentSectionProps> = ({
  title,
  summary,
  content,
  blocks,
  onInputChange,
  onBlocksChange
}) => {
  // Trigger localStorage sync event to enable real-time updates
  useEffect(() => {
    const triggerSync = () => {
      // This is a dummy operation just to trigger a storage event
      // Real sync happens through the localStorage event listeners
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    };
    
    // Set up interval for periodic sync
    const syncInterval = setInterval(triggerSync, 5000);
    
    return () => clearInterval(syncInterval);
  }, []);

  return (
    <>
      <FormSection title="JUDUL">
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onInputChange}
          placeholder="Tulis judul artikel yang menarik"
          className="input-field"
        />
      </FormSection>
      
      <FormSection title="RINGKASAN">
        <Textarea
          id="summary"
          name="summary"
          value={summary}
          onChange={onInputChange}
          placeholder="Tulis ringkasan singkat dari artikel (opsional)"
          className="textarea-field"
          rows={3}
        />
      </FormSection>
      
      <FormSection title="ISI ARTIKEL">
        <BlockEditor 
          initialContent={blocks.length === 0 ? content : undefined}
          initialBlocks={blocks.length > 0 ? blocks : undefined}
          onChange={onBlocksChange}
        />
      </FormSection>
    </>
  );
};

export default ArticleContentSection;
