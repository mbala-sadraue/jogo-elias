# Mobile Deployment Guide for ELONDA

This guide provides instructions for building and deploying the ELONDA app as a native mobile application for Android and iOS using Capacitor.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)
- For Android:
  - Android Studio
  - Java Development Kit (JDK) 11 or newer
  - Android SDK
- For iOS:
  - macOS
  - Xcode (latest version)
  - CocoaPods

## Step 1: Build the Web Application

First, build the web application:

```bash
npm run build
```

This creates a production build in the `dist` directory, which will be used by Capacitor.

## Step 2: Initialize Capacitor

If you haven't initialized Capacitor yet, run:

```bash
bash scripts/capacitor-init.sh
```

This script:
1. Initializes Capacitor with the app name and ID
2. Builds the web app
3. Adds both Android and iOS platforms

## Step 3: Android Setup

To build and run on Android:

```bash
bash scripts/capacitor-open-android.sh
```

This will:
1. Build the web app
2. Sync the latest changes with Capacitor
3. Open the project in Android Studio

From Android Studio:
1. Connect a device or start an emulator
2. Click the "Run" button to build and deploy the app

## Step 4: iOS Setup

To build and run on iOS (requires macOS):

```bash
bash scripts/capacitor-open-ios.sh
```

This will:
1. Build the web app
2. Sync the latest changes with Capacitor
3. Open the project in Xcode

From Xcode:
1. Select a development team in the Signing & Capabilities section
2. Connect an iOS device or select a simulator
3. Click the "Run" button to build and deploy the app

## Making Updates

After making changes to the web application:

1. Rebuild the web app: `npm run build`
2. Sync with Capacitor: `npx cap sync`
3. Open in Android Studio or Xcode to test the changes

For quick updates, use:

```bash
bash scripts/capacitor-build.sh
```

## App Icons and Splash Screens

### Icons

The app icon is defined in:
- `android/app/src/main/res/mipmap-*/ic_launcher.png` (various sizes)
- `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

You can generate a new icon using:

```bash
node scripts/generate-icon.js
```

Then convert the SVG to various PNG sizes for Android and iOS.

### Splash Screens

The splash screen is configured in `capacitor.config.ts` and styled in the `MobileSplashScreen` component.

## Troubleshooting

- **Build Errors**: Ensure you're using the latest versions of Android Studio/Xcode
- **Plugin Issues**: If a plugin isn't working, check if it's available on your platform using `Capacitor.isPluginAvailable('PluginName')`
- **Live Reload**: For development, you can use the `server.url` configuration in `capacitor.config.ts` to enable live reload

## Publishing

### Android

1. In Android Studio, select `Build > Generate Signed Bundle/APK`
2. Follow the prompts to create a signed app bundle
3. Upload the bundle to the Google Play Console

### iOS

1. In Xcode, select `Product > Archive`
2. After archiving completes, use the organizer window to upload to App Store Connect

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Portal](https://developer.android.com/)
- [iOS Developer Portal](https://developer.apple.com/)