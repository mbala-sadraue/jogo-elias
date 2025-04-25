import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import PlayerSetupPage from "@/pages/player-setup-page";
import GameplayPage from "@/pages/gameplay-page";
import CelebrationPage from "@/pages/celebration-page";
import SplashScreen from "@/components/splash-screen";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PlayerSetupPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/gameplay/:categoryId" component={GameplayPage} />
      <Route path="/celebration/:gameId" component={CelebrationPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <Router key="main-app" />
        )}
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;
