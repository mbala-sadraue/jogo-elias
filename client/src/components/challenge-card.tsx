import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { rotateIn } from "@/lib/animations";
import { Timer } from "lucide-react";
import { CategoryType } from "./category-card";

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    type: string;
    duration: string;
    index: number;
    category: CategoryType;
  };
  onComplete: () => void;
  onSkip: () => void;
}

export default function ChallengeCard({ challenge, onComplete, onSkip }: ChallengeCardProps) {
  const categoryClasses = {
    suave: {
      badge: "bg-suave/20 text-suave",
      button: "bg-suave hover:bg-suave/80"
    },
    picante: {
      badge: "bg-picante/20 text-picante",
      button: "bg-picante hover:bg-picante/80"
    },
    selvagem: {
      badge: "bg-selvagem/20 text-selvagem",
      button: "bg-selvagem hover:bg-selvagem/80"
    },
    extremo: {
      badge: "bg-extremo/20 text-extremo",
      button: "bg-extremo hover:bg-extremo/80"
    }
  };
  
  const classes = categoryClasses[challenge.category];
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      variants={rotateIn}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-sm px-2 py-1 rounded-full ${classes.badge}`}>
          {challenge.type}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          #{challenge.index}
        </span>
      </div>
      
      <h2 className="font-semibold text-xl text-dark dark:text-light mb-4">
        {challenge.title}
      </h2>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {challenge.description}
      </p>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Timer className="h-4 w-4 mr-1" />
        <span>{challenge.duration}</span>
      </div>
      
      <div className="flex space-x-3">
        <Button 
          variant="secondary"
          className="flex-1 py-3"
          onClick={onSkip}
        >
          Pular
        </Button>
        <Button 
          className={`flex-1 py-3 text-white ${classes.button}`}
          onClick={onComplete}
        >
          Concluir
        </Button>
      </div>
    </motion.div>
  );
}
