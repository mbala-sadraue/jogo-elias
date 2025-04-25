import { motion } from "framer-motion";
import { bottomNavItemAnimation } from "@/lib/animations";
import { Home, Heart, BarChart2, User } from "lucide-react";
import { useLocation } from "wouter";
import { useCallback } from "react";

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

export const defaultNavItems: NavItem[] = [
  {
    name: "Início",
    icon: <Home className="h-5 w-5" />,
    path: "/"
  },
  {
    name: "Jogos",
    icon: <Heart className="h-5 w-5" />,
    path: "/games"
  },
  {
    name: "Progresso",
    icon: <BarChart2 className="h-5 w-5" />,
    path: "/progress"
  },
  {
    name: "Perfil",
    icon: <User className="h-5 w-5" />,
    path: "/profile"
  }
];

type BottomNavProps = {
  items?: NavItem[];
};

export default function BottomNav({ items = defaultNavItems }: BottomNavProps) {
  const [location, navigate] = useLocation();
  
  const isActive = useCallback((path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  }, [location]);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-md rounded-t-2xl flex justify-around items-center px-6 z-10">
      {items.map((item) => (
        <motion.button
          key={item.name}
          className="flex flex-col items-center"
          initial="inactive"
          animate={isActive(item.path) ? "active" : "inactive"}
          variants={bottomNavItemAnimation}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
