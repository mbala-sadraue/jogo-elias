import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import GameplayPage from "@/pages/gameplay-page";
import CelebrationPage from "@/pages/celebration-page";
import SplashScreen from "@/components/splash-screen";
import { ProtectedRoute } from "./lib/protected-route";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={HomePage} />
      <ProtectedRoute path="/gameplay/:categoryId" component={GameplayPage} />
      <ProtectedRoute path="/celebration/:gameId" component={CelebrationPage} />
      <Route path="/auth" component={AuthPage} />
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
