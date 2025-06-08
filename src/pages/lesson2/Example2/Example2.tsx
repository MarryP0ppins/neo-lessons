import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";

export const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const controls = useProgressAnimation(progress);

  return (
    <div>
      <button
        onClick={() =>
          setProgress((prev) => {
            if (prev === 100) {
              return 0;
            }
            return prev + 20;
          })
        }
      >
        Увеличить прогресс
      </button>
      <div
        style={{
          width: "100%",
          height: 20,
          background: "#f0f0f0",
          borderRadius: 5,
        }}
      >
        <motion.div
          style={{ height: "100%", background: "#3498db", borderRadius: 5 }}
          animate={controls}
          initial={{ width: "0%" }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

const useProgressAnimation = (target: number) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      width: `${target}%`,
      transition: { duration: 1, ease: "easeInOut" },
    });
  }, [controls, target]);

  return controls;
};
