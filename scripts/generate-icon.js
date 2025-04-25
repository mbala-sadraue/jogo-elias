#!/usr/bin/env node

// Simple script to generate app icon
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a simple icon with the letter "E" in a purple background
const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="128" fill="#1F2937" />
  <circle cx="256" cy="256" r="180" fill="#8B5CF6" />
  <path 
    d="M180 180H332V216H216V238H310V274H216V296H332V332H180V180Z" 
    fill="white"
    fill-opacity="0.95"
  />
  <circle cx="256" cy="160" r="16" fill="white" fill-opacity="0.8" />
  <circle cx="256" cy="352" r="16" fill="white" fill-opacity="0.8" />
  <circle cx="160" cy="256" r="16" fill="white" fill-opacity="0.8" />
  <circle cx="352" cy="256" r="16" fill="white" fill-opacity="0.8" />
</svg>
`;

// Save the SVG to the project root
const outputPath = path.join(process.cwd(), 'app-icon.svg');
fs.writeFileSync(outputPath, svgIcon);

console.log(`Icon generated at ${outputPath}`);
console.log('You can convert this SVG to PNG using an online converter or tools like Inkscape');
console.log('Then use it with your Capacitor iOS and Android projects');