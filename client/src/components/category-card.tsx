import { motion } from "framer-motion";
import { cardAnimation } from "@/lib/animations";
import { Heart, Thermometer, Flame, Sparkles } from "lucide-react";

export type CategoryType = "suave" | "picante" | "selvagem" | "extremo";

interface CategoryCardProps {
  category: CategoryType;
  onClick: (category: CategoryType) => void;
}

const categoryConfig = {
  suave: {
    title: "Suave",
    description: "Perguntas leves e divertidas",
    icon: <Heart className="text-white h-8 w-8" />,
    bgClass: "from-blue-400 to-blue-500"
  },
  picante: {
    title: "Picante",
    description: "Adicione um pouco de tempero",
    icon: <Thermometer className="text-white h-8 w-8" />,
    bgClass: "from-orange-400 to-orange-500"
  },
  selvagem: {
    title: "Selvagem",
    description: "Para momentos intensos",
    icon: <Flame className="text-white h-8 w-8" />,
    bgClass: "from-red-400 to-red-500"
  },
  extremo: {
    title: "Extremo",
    description: "Desafios para corajosos",
    icon: <Sparkles className="text-white h-8 w-8" />,
    bgClass: "from-purple-400 to-purple-500"
  }
};

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const config = categoryConfig[category];
  
  return (
    <motion.div
      className={`bg-gradient-to-br ${config.bgClass} rounded-xl shadow-lg overflow-hidden cursor-pointer h-40 relative`}
      variants={cardAnimation}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(category)}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
      <div className="p-5 flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-white">{config.title}</h3>
          <div className="bg-white/20 p-2 rounded-lg">
            {config.icon}
          </div>
        </div>
        <p className="text-xs text-white/80 mt-1">
          {config.description}
        </p>
      </div>
    </motion.div>
  );
}
