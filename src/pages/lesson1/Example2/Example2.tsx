import { motion } from "motion/react";
import { useState } from "react";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export const AnimatedList = () => {
  const [animationKey, setAnimationKey] = useState(0);

  const handleRestart = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div>
      <button
        onClick={handleRestart}
        style={{
          marginBottom: 10,
          padding: "8px 16px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Перезапустить анимацию
      </button>
      <motion.ul
        key={animationKey}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ listStyle: "none" }}
      >
        {["Элемент 1", "Элемент 2", "Элемент 3"].map((item, index) => (
          <motion.li
            key={index}
            variants={itemVariants}
            style={{
              padding: 10,
              background: "#e0e0e0",
              margin: 5,
              color: "black",
            }}
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};
