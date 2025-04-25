import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { fadeIn } from "@/lib/animations";

export default function SplashScreen() {
  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary p-8 z-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
    >
      <div className="flex items-center justify-center flex-col space-y-4">
        <motion.div 
          className="p-4 rounded-full bg-white/20 shadow-lg"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <Heart className="text-white h-16 w-16" />
        </motion.div>
        <motion.h1 
          className="font-bold text-4xl text-white mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Couple Play
        </motion.h1>
        <motion.p 
          className="text-white/80 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Jogue e se apaixone todos os dias
        </motion.p>
      </div>
      <div className="absolute bottom-12 w-full flex justify-center">
        <div className="loading-dots flex space-x-2">
          <motion.div 
            className="h-3 w-3 bg-white rounded-full"
            animate={{ 
              y: ["0%", "-50%", "0%"]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          <motion.div 
            className="h-3 w-3 bg-white rounded-full"
            animate={{ 
              y: ["0%", "-50%", "0%"]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.2
            }}
          />
          <motion.div 
            className="h-3 w-3 bg-white rounded-full"
            animate={{ 
              y: ["0%", "-50%", "0%"]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.4
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
