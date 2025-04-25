import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import PlayerSetupPage from "@/pages/player-setup-page";
import GameplayPage from "@/pages/gameplay-page";
import CelebrationPage from "@/pages/celebration-page";
import ModeSelectionPage from "@/pages/mode-selection-page";
import StoryModePage from "@/pages/story-mode-page";
import RoleplayModePage from "@/pages/roleplay-mode-page";
import RouletteModePage from "@/pages/roulette-mode-page";
import SplashScreen from "@/components/splash-screen";
import MobileSplashScreen from "@/components/mobile-splash-screen";
import AgeVerification from "@/components/age-verification";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import useCapacitor from "@/hooks/use-capacitor";
import { Capacitor } from "@capacitor/core";

// Initialize Capacitor as early as possible
function initializeCapacitor() {
  // Any additional Capacitor initialization can go here
  console.log("Capacitor initialized on platform:", Capacitor.getPlatform());
}

// Router component for all app routes
function Router() {
  return (
    <Switch>
      <Route path="/" component={PlayerSetupPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/gameplay/:categoryId" component={GameplayPage} />
      <Route path="/celebration/:gameId" component={CelebrationPage} />
      <Route path="/mode-selection" component={ModeSelectionPage} />
      <Route path="/story-mode" component={StoryModePage} />
      <Route path="/roleplay-mode" component={RoleplayModePage} />
      <Route path="/roulette-mode" component={RouletteModePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const { isNative, isAndroid, isIOS } = useCapacitor();
  
  // Initialize Capacitor on first render
  useEffect(() => {
    initializeCapacitor();
  }, []);

  useEffect(() => {
    // Check if age has been verified already
    const isVerified = localStorage.getItem("age-verified") === "true";
    
    if (isVerified) {
      setAgeVerified(true);
    }
    
    // Timer for splash screen
    const splashDuration = isNative ? 2500 : 3000; // slightly shorter on native platforms
    const timer = setTimeout(() => {
      setShowSplash(false);
      // After splash, show age verification if needed
      if (!isVerified) {
        setShowAgeVerification(true);
      }
    }, splashDuration);

    return () => clearTimeout(timer);
  }, [isNative]);

  const handleAgeVerification = () => {
    setShowAgeVerification(false);
    setAgeVerified(true);
    localStorage.setItem("age-verified", "true");
  };

  // Choose the appropriate splash screen based on platform
  const SplashComponent = isNative ? MobileSplashScreen : SplashScreen;

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashComponent key="splash" />
        ) : showAgeVerification ? (
          <AgeVerification key="age-verification" onConfirm={handleAgeVerification} />
        ) : (
          <Router key="main-app" />
        )}
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;
