import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

// Types for platform information
export type PlatformInfo = {
  isNative: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isWeb: boolean;
  platform: string;
};

/**
 * Custom hook for Capacitor platform detection and native features
 */
export const useCapacitor = () => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isNative: false,
    isAndroid: false,
    isIOS: false,
    isWeb: true,
    platform: 'web'
  });

  useEffect(() => {
    const platform = Capacitor.getPlatform();
    
    setPlatformInfo({
      isNative: Capacitor.isNativePlatform(),
      isAndroid: platform === 'android',
      isIOS: platform === 'ios',
      isWeb: platform === 'web',
      platform
    });
  }, []);

  /**
   * Check if the app is running on a native mobile platform
   */
  const isNativePlatform = (): boolean => {
    return platformInfo.isNative;
  };

  /**
   * Get the current platform name
   */
  const getPlatform = (): string => {
    return platformInfo.platform;
  };

  /**
   * Safely execute code only when running on a native platform
   * @param callback Function to execute on native platforms
   * @param fallback Optional function to execute on web
   */
  const runOnNativePlatform = <T,>(
    callback: () => T,
    fallback?: () => T
  ): T | undefined => {
    if (platformInfo.isNative) {
      return callback();
    } else if (fallback) {
      return fallback();
    }
    return undefined;
  };

  return {
    ...platformInfo,
    isNativePlatform,
    getPlatform,
    runOnNativePlatform
  };
};

export default useCapacitor;