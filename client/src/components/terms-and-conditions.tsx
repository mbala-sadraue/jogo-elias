import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";

interface TermsAndConditionsProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function TermsAndConditions({ onAccept, onDecline }: TermsAndConditionsProps) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem("terms-accepted", "true");
      onAccept();
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-primary rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl"
        variants={slideUp}
      >
        <div className="bg-primary-dark p-4 flex items-center">
          <AlertTriangle className="text-red-500 h-6 w-6 mr-2" />
          <h2 className="text-xl font-bold text-white">Termos e Condições - Conteúdo Adulto</h2>
        </div>
        
        <ScrollArea className="h-80 p-4 bg-black/20">
          <div className="text-white/90 space-y-4">
            <p className="font-bold text-red-400">
              ATENÇÃO: Este aplicativo contém conteúdo adulto explícito. É estritamente destinado apenas para maiores de 18 anos.
            </p>
            
            <p>
              Ao usar o ELONDA, você concorda e declara que:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Você tem pelo menos 18 anos de idade ou a maioridade legal em sua jurisdição, o que for maior.</li>
              <li>O uso deste aplicativo é voluntário e por sua conta e risco.</li>
              <li>Você entende que o conteúdo neste aplicativo é de natureza sexual explícita.</li>
              <li>Você não compartilhará este aplicativo ou seu conteúdo com menores de idade.</li>
              <li>Você está acessando este conteúdo em uma jurisdição onde o material adulto é legal.</li>
              <li>O conteúdo deste aplicativo não deve ser compartilhado, reproduzido ou distribuído sem consentimento.</li>
              <li>O ELONDA não se responsabiliza por quaisquer consequências resultantes do uso deste aplicativo.</li>
              <li>Todas as interações devem ser consensuais entre adultos.</li>
              <li>Você concorda em usar este aplicativo de maneira responsável e respeitosa.</li>
              <li>Você não usará este aplicativo para fins ilegais ou prejudiciais.</li>
            </ol>
            
            <p>
              PRIVACIDADE: O ELONDA respeita sua privacidade. Não coletamos dados pessoais sensíveis. Todas as informações inseridas são armazenadas localmente no seu dispositivo.
            </p>
            
            <p>
              CONSENTIMENTO: Ao aceitar estes termos, você reconhece que entendeu completamente as condições acima e concorda voluntariamente com elas.
            </p>
            
            <p className="font-bold text-red-400">
              Se você não concorda com estes termos ou tem menos de 18 anos, NÃO deve usar este aplicativo e deve sair imediatamente.
            </p>
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-black/30">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox 
              id="terms" 
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)} 
              className="data-[state=checked]:bg-red-500"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Confirmo que tenho pelo menos 18 anos e aceito os termos e condições
            </label>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={onDecline}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Recusar
            </Button>
            
            <Button 
              onClick={handleAccept}
              disabled={!accepted}
              className={accepted ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-500 text-white cursor-not-allowed"}
            >
              Aceitar e Continuar
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}