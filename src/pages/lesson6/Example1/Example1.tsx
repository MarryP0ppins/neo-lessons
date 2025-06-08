import { motion, useReducedMotion } from "framer-motion";

export const AccessibleButton = () => {
  const shouldReduceMotion = useReducedMotion();
  const animationProps = shouldReduceMotion
    ? { whileHover: {}, whileTap: {} }
    : {
        whileHover: { scale: 1.1 },
        whileTap: { scale: 0.9 },
        transition: { type: "spring", stiffness: 300 },
      };

  return (
    <motion.button
      {...animationProps}
      style={{
        padding: "10px 20px",
        background: "#3498db",
        color: "white",
        border: "none",
        borderRadius: 5,
      }}
      aria-label="Отправить форму"
      role="button"
    >
      Нажми меня
    </motion.button>
  );
};
