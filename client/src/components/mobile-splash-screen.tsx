import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AppIcon from './app-icon';
import useCapacitor from '@/hooks/use-capacitor';

interface MobileSplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function MobileSplashScreen({ 
  onComplete, 
  duration = 2000 
}: MobileSplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { isNative } = useCapacitor();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className="mb-8"
        >
          <AppIcon size={120} animated />
        </motion.div>
        
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          ELONDA
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <div className="w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: duration / 1000 - 0.5, 
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}