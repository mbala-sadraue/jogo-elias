import { Variants } from "framer-motion";

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Slide up animation
export const slideUp: Variants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

// Slide from right animation
export const slideFromRight: Variants = {
  hidden: { 
    x: "100%",
    opacity: 0
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300
    }
  },
  exit: { 
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Slide from left animation
export const slideFromLeft: Variants = {
  hidden: { 
    x: "-100%",
    opacity: 0
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300
    }
  },
  exit: { 
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Card animation
export const cardAnimation: Variants = {
  hover: { 
    scale: 1.03,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};

// Staggered children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Rotate animation
export const rotateIn: Variants = {
  hidden: { 
    rotate: -10,
    opacity: 0 
  },
  visible: { 
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
};

// Scale animation 
export const scaleIn: Variants = {
  hidden: { 
    scale: 0.8,
    opacity: 0 
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
};

// Pulse animation
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

// Bottom navigation animation
export const bottomNavItemAnimation: Variants = {
  active: {
    y: -5,
    color: "#FF4B91",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  inactive: {
    y: 0,
    color: "currentColor",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  }
};

// Page transition wrapper
export const pageTransition: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};
