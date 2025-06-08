import { classname } from "@/utils";
import { motion, useAnimationControls, type PanInfo } from "motion/react";

import classes from "./styles.module.scss";
const cnDraggableCard = classname(classes, "DraggableCard");

export const DraggableCard = () => {
  const controls = useAnimationControls();

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      controls.start({
        x: 200,
        transition: { type: "spring", stiffness: 100 },
      });
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 100 } });
    }
  };

  return (
    <div className={cnDraggableCard("wrapper")}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 200 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{
          width: 100,
          height: 100,
          background: "#3498db",
          borderRadius: 8,
        }}
        aria-label="Перетаскиваемая карточка"
      />
    </div>
  );
};
