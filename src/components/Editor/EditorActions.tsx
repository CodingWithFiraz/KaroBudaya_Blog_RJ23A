
import React from 'react';

interface EditorActionsProps {
  isSubmitting: boolean;
  onSaveDraft: (e: React.FormEvent) => void;
  onPublish: (e: React.FormEvent) => void;
}

const EditorActions: React.FC<EditorActionsProps> = ({
  isSubmitting,
  onSaveDraft,
  onPublish
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={isSubmitting}
        className="btn-secondary"
      >
        Simpan Draft
      </button>
      
      <button
        type="button"
        onClick={onPublish}
        disabled={isSubmitting}
        className="btn-primary"
      >
        Publish Article
      </button>
    </div>
  );
};

export default EditorActions;
