import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Accordion.css";

export const Accordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const buttonVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const contentVariants = shouldReduceMotion
    ? {
        open: { height: "auto" },
        closed: { height: 0 },
      }
    : {
        open: {
          height: "auto",
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 120,
            scale: 1,
            damping: 20,
            duration: 0.4,
          },
        },
        closed: {
          height: 0,
          opacity: 0,
          transition: {
            type: "spring",
            stiffness: 120,
            scale: 0.95,
            damping: 20,
            duration: 0.4,
          },
        },
      };

  return (
    <div className="accordion-wrapper">
      <button
        onClick={() => {
          console.log("click");
          setIsOpen((prev) => !prev);
        }}
        aria-expanded={isOpen}
        aria-controls="accordion-content"
        className="accordion-button"
      >
        <span>Раскрыть интересный контент</span>
        <motion.div
          variants={buttonVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          className="icon-wrapper"
        >
          ↓
        </motion.div>
      </button>
      <motion.div
        variants={contentVariants}
        animate={isOpen ? "open" : "closed"}
        className={`accordion-content ${isOpen ? "open" : ""}`}
        id="accordion-content"
        role="region"
        aria-label="Содержимое аккордеона"
      >
        <div>
          <h3>Увлекательный контент</h3>
          <p>
            Откройте для себя удивительные возможности с нашим аккордеоном! Он
            поддерживает анимации, адаптивный дизайн и управление с клавиатуры.
            Попробуйте взаимодействовать с ним, чтобы увидеть плавные переходы и
            современный стиль.
          </p>
          <ul>
            <li>🎨 Поддержка темного и светлого режимов</li>
            <li>🚀 Плавные анимации с Framer Motion</li>
            <li>⌨️ Полная поддержка доступности</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
