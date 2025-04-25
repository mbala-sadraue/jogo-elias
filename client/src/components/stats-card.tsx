import { motion } from "framer-motion";
import { slideUp } from "@/lib/animations";

interface StatsCardProps {
  title: string;
  value: string | number;
  bg?: string;
}

export default function StatsCard({ title, value, bg = "bg-white/20" }: StatsCardProps) {
  return (
    <motion.div
      className={`flex-shrink-0 w-28 ${bg} rounded-xl p-3 text-white`}
      variants={slideUp}
    >
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}
