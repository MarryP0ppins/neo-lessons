import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";

export const LazyAnimated = () => {
  const controls = useAnimationControls();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start({ opacity: 1, y: -600 });
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [controls]);

  const handleReset = () => {
    controls.set({ opacity: 0, y: 50 });
  };

  return (
    <>
      <button
        onClick={handleReset}
        style={{
          margin: "20px",
          padding: "10px 20px",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Сбросить анимацию
      </button>
      <div style={{ height: "100vh" }}></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        animate={controls}
        style={{ padding: 20, background: "#3498db", color: "white" }}
      >
        Ленивая анимация
      </motion.div>
    </>
  );
};
