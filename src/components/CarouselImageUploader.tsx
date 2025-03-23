import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { fileToDataURL } from '@/utils/articleUtils';

interface CarouselImageUploaderProps {
  existingImages?: string[];
  onImagesChange: (files: File[]) => void;
  onImageRemove: (index: number) => void;
}

const CarouselImageUploader: React.FC<CarouselImageUploaderProps> = ({
  existingImages = [],
  onImagesChange,
  onImageRemove
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    // Generate previews
    const newPreviews: string[] = [];
    for (const file of files) {
      try {
        const dataUrl = await fileToDataURL(file);
        newPreviews.push(dataUrl);
      } catch (error) {
        console.error('Error creating preview:', error);
      }
    }
    
    setPreviewImages([...previewImages, ...newPreviews]);
    onImagesChange(files);
    
    // Reset the input
    e.target.value = '';
  };
  
  const removeImage = (index: number) => {
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
    
    onImageRemove(index);
  };
  
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* Existing images */}
        {existingImages.map((image, index) => (
          <div key={`existing-${index}`} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
            <img 
              src={image} 
              alt={`Carousel ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {/* New image previews */}
        {previewImages.map((preview, index) => (
          <div key={`preview-${index}`} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
            <img 
              src={preview} 
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        
        {/* Upload button */}
        <label className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <Upload size={24} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Upload Gambar</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      
      <p className="text-sm text-gray-500">
        Upload beberapa gambar untuk ditampilkan dalam carousel. Ukuran yang disarankan 1200x800 piksel.
      </p>
    </div>
  );
};

export default CarouselImageUploader;
