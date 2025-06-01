
import React from 'react';
import { Facebook, Twitter, MessageCircle, Mail } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const shareText = `Anda dapat menyiarkan ulang, menulis ulang, dan atau menyalin konten ini dengan mencantumkan sumber KaroBudaya`;
  
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title + '\n\n' + url)}`;
    window.open(emailUrl);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-12">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        {shareText}
      </p>
      
      <div className="flex gap-2">
        <button
          onClick={handleFacebookShare}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          <Facebook size={16} />
          Facebook
        </button>
        
        <button
          onClick={handleTwitterShare}
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
        >
          <Twitter size={16} />
          Twitter
        </button>
        
        <button
          onClick={handleWhatsAppShare}
          className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors"
        >
          <MessageCircle size={16} />
          WhatsApp
        </button>
        
        <button
          onClick={handleEmailShare}
          className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-2 rounded text-sm hover:bg-yellow-600 transition-colors"
        >
          <Mail size={16} />
          Salin
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
