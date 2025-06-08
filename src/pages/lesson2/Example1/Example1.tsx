import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export const StaggerList = () => {
  const { controls, resetAnimation } = useStaggerAnimation(0.2);

  return (
    <div>
      <button
        onClick={resetAnimation}
        style={{
          padding: "10px 20px",
          margin: "10px 0",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Перезапустить анимацию
      </button>
      {["Элемент 1", "Элемент 2", "Элемент 3"].map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
          style={{
            padding: 10,
            background: "#e0e0e0",
            margin: 5,
            color: "black",
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

const useStaggerAnimation = (delay = 0.2) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * delay, type: "spring", stiffness: 100 },
    }));
  }, [controls, delay]);

  const resetAnimation = () => {
    controls.start({
      opacity: 0,
      y: 50,
      transition: { duration: 0 },
    });

    setTimeout(() => {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * delay, type: "spring", stiffness: 100 },
      }));
    }, 50);
  };

  return { controls, resetAnimation };
};
