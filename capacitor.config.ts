import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.elonda.app',
  appName: 'ELONDA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  // Enable live reload during development
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1F2937",
      showSpinner: true,
      spinnerColor: "#8B5CF6"
    }
  }
};

export default config;