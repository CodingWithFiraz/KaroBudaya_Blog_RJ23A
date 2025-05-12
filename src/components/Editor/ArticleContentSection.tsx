
import React, { useEffect, useState } from 'react';
import FormSection from './FormSection';
import { Textarea } from '@/components/ui/textarea';
import BlockEditor from './BlockEditor/BlockEditor';
import { Block } from '@/types/blocks';
import { toast } from 'sonner';

interface ArticleContentSectionProps {
  title: string;
  summary: string;
  content: string;
  blocks: Block[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlocksChange: (blocks: Block[]) => void;
  articleId?: string;
}

const ArticleContentSection: React.FC<ArticleContentSectionProps> = ({
  title,
  summary,
  content,
  blocks,
  onInputChange,
  onBlocksChange,
  articleId
}) => {
  const [localBlocks, setLocalBlocks] = useState<Block[]>(blocks);
  const [isSyncNotificationVisible, setIsSyncNotificationVisible] = useState<boolean>(false);

  // Update local blocks when prop blocks change
  useEffect(() => {
    setLocalBlocks(blocks);
  }, [blocks]);

  // Save blocks to localStorage when they change
  useEffect(() => {
    if (articleId) {
      localStorage.setItem(`article-blocks-${articleId}`, JSON.stringify(localBlocks));
    }
  }, [localBlocks, articleId]);

  // Load blocks from localStorage on component mount
  useEffect(() => {
    if (articleId) {
      const savedBlocks = localStorage.getItem(`article-blocks-${articleId}`);
      if (savedBlocks) {
        const parsedBlocks = JSON.parse(savedBlocks);
        setLocalBlocks(parsedBlocks);
        onBlocksChange(parsedBlocks);
      }
    }
  }, [articleId, onBlocksChange]);

  // Save title and summary to localStorage when they change
  useEffect(() => {
    if (articleId) {
      localStorage.setItem(`article-title-${articleId}`, title);
      localStorage.setItem(`article-summary-${articleId}`, summary);
      
      // Trigger sync event
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  }, [title, summary, articleId]);

  // Listen for storage events from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (!articleId) return;

      // Check if the event is related to our article
      if (event.key === `article-blocks-${articleId}`) {
        const newBlocks = JSON.parse(event.newValue || '[]');
        setLocalBlocks(newBlocks);
        onBlocksChange(newBlocks);
        showSyncNotification();
      }
      else if (event.key === 'article-sync-timestamp') {
        // This is a sync event, let's check if there are updates
        checkForUpdates();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Set up interval for periodic sync check
    const syncInterval = setInterval(() => {
      if (articleId) {
        checkForUpdates();
      }
    }, 10000); // Check every 10 seconds
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(syncInterval);
    };
  }, [articleId, onBlocksChange]);

  // Check if there are updates in localStorage
  const checkForUpdates = () => {
    if (!articleId) return;
    
    // Check for block updates
    const savedBlocks = localStorage.getItem(`article-blocks-${articleId}`);
    if (savedBlocks) {
      const parsedBlocks = JSON.parse(savedBlocks);
      // Only update if the blocks are different
      if (JSON.stringify(parsedBlocks) !== JSON.stringify(localBlocks)) {
        setLocalBlocks(parsedBlocks);
        onBlocksChange(parsedBlocks);
        showSyncNotification();
      }
    }
    
    // Check for title updates
    const savedTitle = localStorage.getItem(`article-title-${articleId}`);
    if (savedTitle && savedTitle !== title) {
      const titleEvent = {
        target: { name: 'title', value: savedTitle }
      } as React.ChangeEvent<HTMLInputElement>;
      onInputChange(titleEvent);
      showSyncNotification();
    }
    
    // Check for summary updates
    const savedSummary = localStorage.getItem(`article-summary-${articleId}`);
    if (savedSummary && savedSummary !== summary) {
      const summaryEvent = {
        target: { name: 'summary', value: savedSummary }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onInputChange(summaryEvent);
      showSyncNotification();
    }
  };
  
  // Show a notification when content is synced
  const showSyncNotification = () => {
    setIsSyncNotificationVisible(true);
    toast.info("Konten artikel telah diperbarui", {
      description: "Perubahan dari perangkat lain telah disinkronkan"
    });
    
    setTimeout(() => {
      setIsSyncNotificationVisible(false);
    }, 5000);
  };

  // Handle blocks change from BlockEditor
  const handleBlocksChange = (newBlocks: Block[]) => {
    setLocalBlocks(newBlocks);
    onBlocksChange(newBlocks);
    
    // Save to localStorage
    if (articleId) {
      localStorage.setItem(`article-blocks-${articleId}`, JSON.stringify(newBlocks));
      
      // Trigger sync event
      localStorage.setItem('article-sync-timestamp', Date.now().toString());
    }
  };

  return (
    <>
      <FormSection title="JUDUL">
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => {
            onInputChange(e);
            if (articleId) {
              localStorage.setItem(`article-title-${articleId}`, e.target.value);
              localStorage.setItem('article-sync-timestamp', Date.now().toString());
            }
          }}
          placeholder="Tulis judul artikel yang menarik"
          className="input-field"
        />
      </FormSection>
      
      <FormSection title="RINGKASAN">
        <Textarea
          id="summary"
          name="summary"
          value={summary}
          onChange={(e) => {
            onInputChange(e);
            if (articleId) {
              localStorage.setItem(`article-summary-${articleId}`, e.target.value);
              localStorage.setItem('article-sync-timestamp', Date.now().toString());
            }
          }}
          placeholder="Tulis ringkasan singkat dari artikel (opsional)"
          className="textarea-field"
          rows={3}
        />
      </FormSection>
      
      <FormSection title="ISI ARTIKEL">
        {isSyncNotificationVisible && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md">
            Konten artikel telah diperbarui dari perangkat lain
          </div>
        )}
        <BlockEditor 
          initialContent={localBlocks.length === 0 ? content : undefined}
          initialBlocks={localBlocks.length > 0 ? localBlocks : undefined}
          onChange={handleBlocksChange}
          articleId={articleId}
        />
      </FormSection>
    </>
  );
};

export default ArticleContentSection;
