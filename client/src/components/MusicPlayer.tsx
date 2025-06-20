
import { useState, useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isEnabled: boolean;
  volumeLevel: number;
  onVolumeChange: (volume: number) => void;
}

const MUSIC_PLAYLIST = [
  {
    name: "Sensual Jazz",
    url: "/sounds/background/sensual-jazz.mp3"
  },
  {
    name: "Romantic Piano",
    url: "/sounds/background/romantic-piano.mp3"
  },
  {
    name: "Smooth R&B",
    url: "/sounds/background/smooth-rb.mp3"
  },
  {
    name: "Slow Bossa Nova",
    url: "/sounds/background/bossa-nova.mp3"
  },
  {
    name: "Soul Groove",
    url: "/sounds/background/soul-groove.mp3"
  },
  {
    name: "Chill Lounge",
    url: "/sounds/background/chill-lounge.mp3"
  },
  {
    name: "Soft Blues",
    url: "/sounds/background/soft-blues.mp3"
  },
  {
    name: "Latin Romance",
    url: "/sounds/background/latin-romance.mp3"
  }
];

export default function MusicPlayer({ isEnabled, volumeLevel, onVolumeChange }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const audio = new Audio(MUSIC_PLAYLIST[currentTrackIndex].url);
    audio.loop = false;
    
    audio.onended = () => {
      const nextIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
      setCurrentTrackIndex(nextIndex);
    };
    
    audioRef.current = audio;

    if (audioRef.current) {
      audioRef.current.volume = volumeLevel / 100;
      
      if (isEnabled) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.error("Erro ao reproduzir música:", error));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [volumeLevel, currentTrackIndex, isEnabled]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.error("Erro ao reproduzir música:", error));
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    onVolumeChange(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    if (audioRef.current && isPlaying) {
      audioRef.current.src = MUSIC_PLAYLIST[nextIndex].url;
      audioRef.current.play()
        .catch(error => console.error("Erro ao reproduzir próxima música:", error));
    }
  };

  const handlePrevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length;
    setCurrentTrackIndex(prevIndex);
    if (audioRef.current && isPlaying) {
      audioRef.current.src = MUSIC_PLAYLIST[prevIndex].url;
      audioRef.current.play()
        .catch(error => console.error("Erro ao reproduzir música anterior:", error));
    }
  };

  if (!isEnabled) return null;

  return (
    <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 bg-dark-900/80 backdrop-blur p-2 md:p-3 rounded-lg shadow-lg z-50 flex flex-col gap-2">
      <div className="text-xs text-gray-400 text-center">
        {MUSIC_PLAYLIST[currentTrackIndex].name}
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button
          onClick={handlePrevTrack}
          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-dark-900 hover:bg-primary/80 text-white transition-colors"
        >
          <i className="fas fa-backward text-xs md:text-sm"></i>
        </button>
        
        <button
          onClick={handlePlayPause}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-primary text-white"
        >
          <i className={`fas fa-${isPlaying ? 'pause' : 'play'} text-xs md:text-sm`}></i>
        </button>

        <button
          onClick={handleNextTrack}
          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-dark-900 hover:bg-primary/80 text-white transition-colors"
        >
          <i className="fas fa-forward text-xs md:text-sm"></i>
        </button>
        
        <div className="flex items-center space-x-1 md:space-x-2">
          <i className="fas fa-volume-down text-gray-400 text-xs md:text-sm"></i>
          <input
            type="range"
            min="0"
            max="100"
            value={volumeLevel}
            onChange={handleVolumeChange}
            className="w-16 sm:w-20 lg:w-32"
          />
          <i className="fas fa-volume-up text-gray-400 text-xs md:text-sm"></i>
        </div>
      </div>
    </div>
  );
}
