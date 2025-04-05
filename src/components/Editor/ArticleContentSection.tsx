
import React from 'react';
import FormSection from './FormSection';
import CarouselImageUploader from '@/components/CarouselImageUploader';
import InlineImageUploader from '@/components/InlineImageUploader';
import { Textarea } from '@/components/ui/textarea';

interface ArticleContentSectionProps {
  title: string;
  summary: string;
  content: string;
  carouselImageUrls: string[];
  inlineImageUrls: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCarouselImagesChange: (files: File[]) => void;
  onCarouselImageRemove: (index: number) => void;
  onInlineImageChange: (files: File[]) => void;
}

const ArticleContentSection: React.FC<ArticleContentSectionProps> = ({
  title,
  summary,
  content,
  carouselImageUrls,
  inlineImageUrls,
  onInputChange,
  onCarouselImagesChange,
  onCarouselImageRemove,
  onInlineImageChange
}) => {
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
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={onInputChange}
          placeholder="Tulis artikel dengan bahasa yang jelas dan informatif"
          className="textarea-field"
          rows={10}
        />
      </FormSection>
      
      <FormSection title="GAMBAR UNTUK CAROUSEL">
        <CarouselImageUploader
          existingImages={carouselImageUrls}
          onImagesChange={onCarouselImagesChange}
          onImageRemove={onCarouselImageRemove}
        />
      </FormSection>
      
      <FormSection title="GAMBAR UNTUK KONTEN ARTIKEL">
        <InlineImageUploader
          existingImages={inlineImageUrls}
          onImagesChange={onInlineImageChange}
        />
      </FormSection>
    </>
  );
};

export default ArticleContentSection;
