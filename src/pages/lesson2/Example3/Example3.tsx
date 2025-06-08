import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export const AccessibleComponent = () => {
  const animationProps = useAccessibleAnimation();
  const [animationKey, setAnimationKey] = useState(0);

  const handleReplay = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div>
      <motion.div
        key={animationKey}
        {...animationProps}
        style={{
          padding: 20,
          background: "#3498db",
          color: "white",
          borderRadius: 5,
        }}
        role="region"
        aria-label="Анимированный компонент"
      >
        Доступный компонент
      </motion.div>
      <button
        onClick={handleReplay}
        style={{
          marginTop: 10,
          padding: 10,
          background: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: "pointer",
        }}
        aria-label="Повторить анимацию"
      >
        Повторить анимацию
      </button>
    </div>
  );
};

const useAccessibleAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion
    ? { animate: {}, initial: {} }
    : { animate: { opacity: 1, y: 0 }, initial: { opacity: 0, y: 20 } };
};
