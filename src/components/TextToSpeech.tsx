
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface TextToSpeechProps {
  title: string;
  author: string;
  content: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ title, author, content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Clean the content by removing any HTML tags
  const cleanContent = (text: string) => {
    return text.replace(/<[^>]*>?/gm, '');
  };

  // Prepare the text to be read
  const prepareText = () => {
    const cleanedContent = cleanContent(content);
    return `Judul artikel: ${title}. Ditulis oleh: ${author}. Uraian. ${cleanedContent}`;
  };

  const handleTogglePlay = async () => {
    if (!audioRef.current) {
      setIsLoading(true);
      try {
        // Using the browser's native text-to-speech API
        const text = prepareText();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Try to find an Indonesian voice, otherwise use the default voice
        const voices = window.speechSynthesis.getVoices();
        const indonesianVoice = voices.find(voice => 
          voice.lang.includes('id') && voice.gender === 'male'
        ) || voices.find(voice => 
          voice.lang.includes('id')
        );
        
        if (indonesianVoice) {
          utterance.voice = indonesianVoice;
        }
        
        utterance.rate = 0.9; // Slightly slower rate for better clarity
        utterance.pitch = 1;
        
        // Event handlers
        utterance.onstart = () => {
          setIsPlaying(true);
          setIsLoading(false);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = (event) => {
          console.error('TTS Error:', event);
          setIsPlaying(false);
          setIsLoading(false);
        };
        
        window.speechSynthesis.speak(utterance);
        
        // Store reference to cancel later if needed
        audioRef.current = {} as HTMLAudioElement;
        audioRef.current.pause = () => {
          window.speechSynthesis.cancel();
          setIsPlaying(false);
        };
      } catch (error) {
        console.error('Failed to initialize TTS:', error);
        setIsLoading(false);
      }
    } else if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If paused, we need to restart
      audioRef.current = null;
      handleTogglePlay();
    }
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="fixed left-6 bottom-6 z-50">
      <button 
        onClick={handleTogglePlay}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 bg-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : isPlaying ? (
          <>
            <Pause size={24} />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play size={24} />
            <span>Listen</span>
          </>
        )}
      </button>
    </div>
  );
};

export default TextToSpeech;
