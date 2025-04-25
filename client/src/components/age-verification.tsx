import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, Check, X } from "lucide-react";
import { fadeIn, slideUp } from "@/lib/animations";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AgeVerificationProps {
  onConfirm: () => void;
}

export default function AgeVerification({ onConfirm }: AgeVerificationProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  // Check if the user has already verified their age
  useEffect(() => {
    const hasVerified = localStorage.getItem("age-verified") === "true";
    if (hasVerified) {
      onConfirm();
    }
  }, [onConfirm]);

  const handleContinue = () => {
    if (isChecked) {
      localStorage.setItem("age-verified", "true");
      onConfirm();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div 
        className="w-full max-w-md p-6 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white"
        variants={slideUp}
      >
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-7 w-7 text-red-400 mr-3" />
          <h2 className="text-2xl font-bold">Verificação de Idade</h2>
        </div>
        
        <div className="h-[1px] w-full bg-white/20 mb-5"></div>
        
        <p className="mb-6 leading-relaxed text-white/90">
          Para acessar o ELONDA, você precisa confirmar que tem pelo menos 18 anos. 
          O conteúdo deste aplicativo é destinado apenas para adultos.
        </p>
        
        <div className="mb-6 p-4 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <Label htmlFor="age-verification" className="text-white font-semibold mb-1">
                Confirmo que tenho 18 anos ou mais
              </Label>
              <p className="text-sm text-white/70">
                Ao confirmar, você declara que é maior de idade.
              </p>
            </div>
            <Switch 
              id="age-verification"
              checked={isChecked} 
              onCheckedChange={setIsChecked}
              className={`${isChecked ? 'bg-green-500' : 'bg-gray-400'}`}
            />
          </div>
        </div>
        
        {showError && (
          <motion.div 
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <X className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-white">
              Você precisa confirmar que é maior de 18 anos para continuar.
            </p>
          </motion.div>
        )}
        
        <div className="flex justify-end space-x-3">
          <Button 
            variant="ghost" 
            className="text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => window.close()}
          >
            Sair
          </Button>
          <Button 
            onClick={handleContinue}
            className={`px-6 bg-secondary hover:bg-secondary-light text-white ${isChecked ? 'pulse-animation' : ''}`}
          >
            {isChecked ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Continuar
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}