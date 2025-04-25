import { useState } from "react";
import { motion } from "framer-motion";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { Redirect } from "wouter";
import { Heart, Facebook, FileHeart } from "lucide-react";
import { fadeIn, slideUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  // For now, just show the auth page without checking user status
  // We'll restore the redirection once auth is working
  
  return (
    <motion.div 
      className="min-h-screen bg-light dark:bg-dark p-6 pt-12 flex flex-col"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <div className="max-w-md mx-auto w-full">
        <motion.div className="text-center mb-8" variants={slideUp}>
          <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
            {isLogin ? (
              <Heart className="text-primary h-12 w-12" />
            ) : (
              <FileHeart className="text-primary h-12 w-12" />
            )}
          </div>
          <h1 className="font-bold text-3xl text-dark dark:text-light">
            {isLogin ? "Bem-vindo(a) de volta!" : "Criar sua conta"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {isLogin 
              ? "Entre para continuar sua jornada de casal" 
              : "Comece sua jornada como casal"}
          </p>
        </motion.div>
        
        <motion.div variants={slideUp}>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </motion.div>
        
        <motion.div className="mt-6 text-center" variants={slideUp}>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              className="text-primary font-medium ml-1"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Cadastre-se" : "Entrar"}
            </button>
          </p>
        </motion.div>
        
        <motion.div variants={slideUp} className="mt-8">
          <div className="flex items-center">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
            <p className="mx-4 text-sm text-gray-500 dark:text-gray-400">ou continue com</p>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center justify-center py-3 px-4">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                  fill="#4285F4"
                />
                <path d="M9 14l.93-3.48L12 12l-3 2z" fill="#34A853" />
                <path
                  d="M12 17.5c2.33 0 4.31-1.46 4.31-4.08H16.1c-.23 1.45-1.49 2.55-3.1 2.55-1.62 0-2.93-1.1-2.93-2.55h4.25c.05-.3.08-.6.08-.92 0-3.13-2.5-5.35-5.45-5.35C6.36 7.15 5 10.13 5 12c0 2.76 2.09 5.5 5 5.5z"
                  fill="#FBBC05"
                />
                <path
                  d="M6.6 10.81c0-1.22.89-2.27 2.14-2.27 1.25 0 2.14 1.05 2.14 2.27s-.89 2.27-2.14 2.27c-1.25 0-2.14-1.05-2.14-2.27z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </Button>
            
            <Button variant="outline" className="flex items-center justify-center py-3 px-4">
              <Facebook className="h-5 w-5 mr-2 text-blue-600" />
              <span>Facebook</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
