import { Capacitor } from '@capacitor/core';

/**
 * Utility functions for Capacitor integration
 */

/**
 * Check if the app is running on a native mobile platform
 */
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Get the current platform name: 'web', 'android', or 'ios'
 */
export const getPlatform = (): string => {
  return Capacitor.getPlatform();
};

/**
 * Check if a specific Capacitor plugin is available on the current platform
 * @param pluginName The name of the plugin to check
 */
export const isPluginAvailable = (pluginName: string): boolean => {
  return Capacitor.isPluginAvailable(pluginName);
};

/**
 * Convert a web URL to a platform-specific URL
 * On Android and iOS, this ensures proper deep linking
 * @param url The web URL to convert
 */
export const convertWebUrlToDeepLink = (url: string): string => {
  const platform = getPlatform();
  
  if (platform === 'web') {
    return url;
  }
  
  // Remove the protocol and domain from the URL if present
  const path = url.replace(/^https?:\/\/[^/]+/, '');
  
  // Create a platform-specific deep link
  if (platform === 'android') {
    return `com.elonda.app://${path}`;
  } else if (platform === 'ios') {
    return `elonda://${path}`;
  }
  
  // Fallback to original URL
  return url;
};

/**
 * Handles back button behavior differently on web vs. native platforms
 * @param customAction Optional custom action to perform on back press
 */
export const handleBackButton = (customAction?: () => void): void => {
  if (isNativePlatform()) {
    // On mobile, this would use Capacitor's App plugin to handle the back button
    // For now, we'll just call the custom action if provided
    if (customAction) {
      customAction();
    }
  } else {
    // On web, use the browser's back functionality
    if (customAction) {
      customAction();
    } else {
      window.history.back();
    }
  }
};

/**
 * Opens an external URL in the appropriate manner for the platform
 * @param url The URL to open
 */
export const openExternalUrl = (url: string): void => {
  // On a real project, this would use Capacitor's Browser plugin
  // For now, just open in a new tab
  window.open(url, '_blank');
};

export default {
  isNativePlatform,
  getPlatform,
  isPluginAvailable,
  convertWebUrlToDeepLink,
  handleBackButton,
  openExternalUrl
};