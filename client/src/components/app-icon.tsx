import React from 'react';
import { motion } from 'framer-motion';

interface AppIconProps {
  size?: number;
  animated?: boolean;
}

export default function AppIcon({ size = 512, animated = false }: AppIconProps) {
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        delay: 0.2
      }
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="512" height="512" rx="128" fill="#1F2937" />
      <motion.g
        initial={animated ? "hidden" : "visible"}
        animate="visible"
        variants={iconVariants}
      >
        {/* Gradient Background Circle */}
        <circle cx="256" cy="256" r="180" fill="url(#gradientBg)" />
        
        {/* "E" Letter */}
        <path 
          d="M180 180H332V216H216V238H310V274H216V296H332V332H180V180Z" 
          fill="white"
          fillOpacity="0.95"
        />
        
        {/* Decorative Elements */}
        <circle cx="256" cy="160" r="16" fill="white" fillOpacity="0.8" />
        <circle cx="256" cy="352" r="16" fill="white" fillOpacity="0.8" />
        <circle cx="160" cy="256" r="16" fill="white" fillOpacity="0.8" />
        <circle cx="352" cy="256" r="16" fill="white" fillOpacity="0.8" />
      </motion.g>
      
      {/* Gradient Definition */}
      <defs>
        <radialGradient
          id="gradientBg"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(256 256) rotate(90) scale(180)"
        >
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#4338CA" />
        </radialGradient>
      </defs>
    </svg>
  );
}