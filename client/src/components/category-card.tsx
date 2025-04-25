import { motion } from "framer-motion";
import { cardAnimation } from "@/lib/animations";
import { Heart, FireExtinguisher, Flame, Smile } from "lucide-react";

export type CategoryType = "suave" | "picante" | "selvagem" | "extremo";

interface CategoryCardProps {
  category: CategoryType;
  onClick: (category: CategoryType) => void;
}

const categoryConfig = {
  suave: {
    title: "Suave",
    description: "Conexão emocional e romance",
    icon: <Heart className="text-white h-12 w-12" />,
    bgClass: "bg-suave"
  },
  picante: {
    title: "Picante",
    description: "Esquente a relação",
    icon: <FireExtinguisher className="text-white h-12 w-12" />,
    bgClass: "bg-picante"
  },
  selvagem: {
    title: "Selvagem",
    description: "Aventuras excitantes",
    icon: <Flame className="text-white h-12 w-12" />,
    bgClass: "bg-selvagem"
  },
  extremo: {
    title: "Extremo",
    description: "Para casais ousados",
    icon: <Smile className="text-white h-12 w-12" />,
    bgClass: "bg-extremo"
  }
};

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const config = categoryConfig[category];
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer"
      variants={cardAnimation}
      whileHover="hover"
      whileTap="tap"
      onClick={() => onClick(category)}
    >
      <div className={`h-32 ${config.bgClass} flex items-center justify-center`}>
        {config.icon}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-center">{config.title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
          {config.description}
        </p>
      </div>
    </motion.div>
  );
}
