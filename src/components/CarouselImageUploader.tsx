import React, { useState } from 'react';
import { Upload, X, Link } from 'lucide-react';
import { toast } from 'sonner';

interface CarouselImageUploaderProps {
  existingImages?: string[];
  onImagesChange: (imageUrls: string[]) => void;
  onImageRemove: (index: number) => void;
}

const CarouselImageUploader: React.FC<CarouselImageUploaderProps> = ({
  existingImages = [],
  onImagesChange,
  onImageRemove
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);

  const validateImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || 
             url.includes('unsplash.com') || 
             url.includes('upload.wikimedia.org') ||
             url.includes('images.') ||
             url.includes('cdn.');
    } catch {
      return false;
    }
  };

  const handleUrlSubmit = () => {
    if (inputUrl.trim()) {
      if (validateImageUrl(inputUrl)) {
        const updatedUrls = [...imageUrls, inputUrl];
        setImageUrls(updatedUrls);
        onImagesChange(updatedUrls);
        setInputUrl('');
        setIsValidUrl(true);
        
        toast.success('Gambar berhasil ditambahkan');
      } else {
        setIsValidUrl(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUrlSubmit();
    }
  };
  
  const removeNewImage = (index: number) => {
    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);
    onImagesChange(updatedUrls);
  };
  
  return (
    <div className="space-y-3">
      {/* URL Input Section */}
      <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-3">
          <Upload size={32} className="text-gray-400" />
          <span className="text-sm text-gray-500">Masukkan URL Gambar untuk Carousel</span>
          <div className="w-full max-w-md">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                setIsValidUrl(true);
              }}
              onKeyPress={handleKeyPress}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-3 py-2 border rounded-md text-sm ${
                !isValidUrl ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {!isValidUrl && (
              <p className="text-red-500 text-xs mt-1">URL gambar tidak valid</p>
            )}
            <button
              type="button"
              onClick={handleUrlSubmit}
              className="w-full mt-2 px-4 py-2 bg-karo-gold text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Tambah Gambar
            </button>
          </div>
        </div>
      </div>

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
        {imageUrls.map((imageUrl, index) => (
          <div key={`new-${index}`} className="relative h-32 bg-gray-100 rounded-lg overflow-hidden group">
            <img 
              src={imageUrl} 
              alt={`New carousel ${index + 1}`}
              className="w-full h-full object-cover"
              onError={() => {
                toast.error('Gagal memuat gambar');
                removeNewImage(index);
              }}
            />
            <button
              type="button"
              onClick={() => removeNewImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500">
        Upload beberapa gambar melalui URL untuk ditampilkan dalam carousel. Gambar akan tersinkronisasi secara real-time di semua perangkat.
      </p>
    </div>
  );
};

export default CarouselImageUploader;
