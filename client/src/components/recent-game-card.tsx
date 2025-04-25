import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Flame, Heart, Smile } from "lucide-react";
import { slideUp } from "@/lib/animations";
import { CategoryType } from "./category-card";
import { Progress } from "@/components/ui/progress";

interface RecentGameCardProps {
  game: {
    id: string;
    title: string;
    category: CategoryType;
    progress: number;
  };
  onContinue: (gameId: string) => void;
}

const categoryIcons = {
  suave: <motion.div className="w-12 h-12 flex items-center justify-center bg-suave/20 rounded-full">
    <Heart className="text-suave h-5 w-5" />
  </motion.div>,
  picante: <motion.div className="w-12 h-12 flex items-center justify-center bg-picante/20 rounded-full">
    <Flame className="text-picante h-5 w-5" />
  </motion.div>,
  selvagem: <motion.div className="w-12 h-12 flex items-center justify-center bg-selvagem/20 rounded-full">
    <Flame className="text-selvagem h-5 w-5" />
  </motion.div>,
  extremo: <motion.div className="w-12 h-12 flex items-center justify-center bg-extremo/20 rounded-full">
    <Smile className="text-extremo h-5 w-5" />
  </motion.div>,
};

const categoryClasses = {
  suave: {
    badge: "bg-suave/20 text-suave",
    progress: "bg-suave",
    button: "bg-suave hover:bg-suave/80"
  },
  picante: {
    badge: "bg-picante/20 text-picante",
    progress: "bg-picante",
    button: "bg-picante hover:bg-picante/80"
  },
  selvagem: {
    badge: "bg-selvagem/20 text-selvagem",
    progress: "bg-selvagem",
    button: "bg-selvagem hover:bg-selvagem/80"
  },
  extremo: {
    badge: "bg-extremo/20 text-extremo",
    progress: "bg-extremo",
    button: "bg-extremo hover:bg-extremo/80"
  }
};

export default function RecentGameCard({ game, onContinue }: RecentGameCardProps) {
  const classes = categoryClasses[game.category];
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6"
      variants={slideUp}
    >
      <div className="flex items-center">
        {categoryIcons[game.category]}
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-dark dark:text-light">{game.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${classes.badge}`}>
              {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
            </span>
          </div>
          <div className="mt-1 relative pt-1">
            <Progress 
              value={game.progress} 
              className="h-2 bg-gray-200 dark:bg-gray-700"
              indicatorClassName={classes.progress}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {game.progress}% completado
            </p>
          </div>
        </div>
      </div>
      
      <Button 
        className={`mt-3 w-full py-2 rounded-lg text-white ${classes.button}`}
        onClick={() => onContinue(game.id)}
      >
        Continuar
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </motion.div>
  );
}
