import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Pause, Play, SkipForward, SkipBack } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'framer-motion';

// Playlist de exemplo
const playlist = [
  {
    id: '1',
    title: 'Sensual Lounge',
    artist: 'ELONDA Music',
    url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_07b68b0e31.mp3?filename=sexy-fashion-beats-118266.mp3',
  },
  {
    id: '2',
    title: 'Romantic Evening',
    artist: 'ELONDA Music',
    url: 'https://cdn.pixabay.com/download/audio/2022/05/09/audio_1ca6552fef.mp3?filename=your-own-chill-14092.mp3',
  },
  {
    id: '3',
    title: 'Soft Moments',
    artist: 'ELONDA Music',
    url: 'https://cdn.pixabay.com/download/audio/2021/11/13/audio_cb1c3e8b54.mp3?filename=lofi-chill-medium-version-159456.mp3',
  }
];

interface MusicPlayerProps {
  isEnabled?: boolean;
  volumeLevel?: number;
  onVolumeChange?: (level: number) => void;
}

export default function MusicPlayer({
  isEnabled = true,
  volumeLevel = 0.5,
  onVolumeChange
}: MusicPlayerProps) {
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(volumeLevel);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set initial track
    audio.src = playlist[currentTrack].url;
    audio.volume = volume;
    
    // Event listeners
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener('ended', handleNext);
    
    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleNext);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
      if (onVolumeChange) {
        onVolumeChange(muted ? 0 : volume);
      }
    }
  }, [volume, muted, onVolumeChange]);
  
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
        });
        animationRef.current = requestAnimationFrame(updateProgress);
      }
      setPlaying(!playing);
    }
  };
  
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };
  
  const handleNext = () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    changeTrack(nextTrack);
  };
  
  const handlePrev = () => {
    const prevTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    changeTrack(prevTrack);
  };
  
  const changeTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setCurrentTrack(index);
      audioRef.current.src = playlist[index].url;
      setCurrentTime(0);
      
      if (playing) {
        audioRef.current.play().catch(error => {
          console.error("Playback failed:", error);
        });
      }
    }
  };
  
  const handleMute = () => {
    setMuted(!muted);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (muted && value[0] > 0) {
      setMuted(false);
    }
  };
  
  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!isEnabled) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 z-40">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-dark-800/90 backdrop-blur-md p-4 rounded-lg shadow-lg mb-3 w-80"
          >
            <div className="mb-3">
              <h3 className="text-white font-medium truncate">
                {playlist[currentTrack].title}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                {playlist[currentTrack].artist}
              </p>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider 
                max={duration} 
                min={0}
                step={0.1}
                value={[currentTime]} 
                onValueChange={handleSeek}
                className="w-full" 
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                  onClick={handlePrev}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-white bg-purple-600/20 hover:bg-purple-600/40"
                  onClick={handlePlayPause}
                >
                  {playing ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                  onClick={handleNext}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                  onClick={handleMute}
                >
                  {muted || volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                
                <Slider
                  max={1}
                  min={0}
                  step={0.01}
                  value={[muted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button
        variant="ghost"
        className={`h-10 w-10 p-0 rounded-full ${expanded ? 'bg-purple-600 text-white' : 'bg-dark-800/90 text-gray-400 hover:text-white'}`}
        onClick={() => setExpanded(!expanded)}
      >
        <Music className="h-5 w-5" />
      </Button>
    </div>
  );
}