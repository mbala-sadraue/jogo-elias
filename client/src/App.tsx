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
import AgeVerification from "@/components/age-verification";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    // Verificar se a idade já foi verificada
    const isVerified = localStorage.getItem("age-verified") === "true";
    
    if (isVerified) {
      setAgeVerified(true);
    }
    
    // Temporizador para o splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Após o splash, mostrar verificação de idade se necessário
      if (!isVerified) {
        setShowAgeVerification(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAgeVerification = () => {
    setShowAgeVerification(false);
    setAgeVerified(true);
    localStorage.setItem("age-verified", "true");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
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
