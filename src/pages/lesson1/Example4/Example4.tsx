import { useState, useEffect } from "react";
import { motion, useAnimationControls, type PanInfo } from "framer-motion";

import classes from "./styles.module.scss";
import { classname } from "@/utils";

const cnCarousel = classname(classes, "Carousel");

const CATS: string[] = [
  "neo",
  "millie",
  "millie_neo",
  "neo_banana",
  "neo_2",
  "bella",
];

export const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isDragging) {
      return;
    }
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CATS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isDragging]);

  useEffect(() => {
    controls
      .start({
        x: `-${(index * 100) / CATS.length}%`,
        transition: { type: "spring", damping: 20, stiffness: 100 },
      })
      .then(() => {
        controls.set({ x: `-${(index * 100) / CATS.length}%` });
      });
  }, [index, controls]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 100;

    if (info.offset.x < -threshold) {
      setIndex((prev) => (prev + 1) % CATS.length);
    } else if (info.offset.x > threshold) {
      setIndex((prev) => (prev - 1 + CATS.length) % CATS.length);
    } else {
      controls.start({
        x: `-${(index * 100) / CATS.length}%`,
        transition: { type: "spring", damping: 20, stiffness: 100 },
      });
    }
  };

  return (
    <div
      className={cnCarousel("container")}
      role="region"
      aria-label="Карусель изображений"
    >
      <motion.div
        className={cnCarousel()}
        drag="x"
        dragConstraints={{
          left: -((CATS.length - 1) * (100 / CATS.length) * 300),
          right: 0,
        }}
        dragElastic={0.2}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ display: "flex", width: `${CATS.length * 100}%` }}
      >
        {CATS.map((img, i) => (
          <img
            key={i}
            src={`https://placecats.com/${img}/300/200`}
            alt={`Слайд ${i + 1}`}
            style={{ width: `${100 / CATS.length}%` }}
          />
        ))}
      </motion.div>
    </div>
  );
};
