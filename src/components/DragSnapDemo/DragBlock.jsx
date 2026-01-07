import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import "./drag.scss";
export const DragBlock = ({ id, step, height, layout, onStepChange }) => {
  const STEP_HEIGHT = 110;
  const y = useMotionValue(step * STEP_HEIGHT);
  const x = useMotionValue(0);
  const lastStoredY = useRef(step * STEP_HEIGHT);
  const currentStepRef = useRef(step);

  useEffect(() => {
    animate(y, step * STEP_HEIGHT, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
    lastStoredY.current = step * STEP_HEIGHT;
    currentStepRef.current = step;
  }, [step, y]);

  return (
    <motion.button
      drag
      dragMomentum={false}
      onDrag={(e, info) => {
        const targetStep = Math.round(
          (lastStoredY.current + info.offset.y) / STEP_HEIGHT
        );
        currentStepRef.current = Math.max(0, targetStep);
      }}
      onDragEnd={() => {
        lastStoredY.current = y.get();
        if (currentStepRef.current !== step)
          onStepChange(id, currentStepRef.current);
        animate(y, currentStepRef.current * STEP_HEIGHT, {
          type: "spring",
          stiffness: 300,
          damping: 25,
        });
        animate(x, 0, {
          type: "spring",
          stiffness: 300,
          damping: 25,
        });
      }}
      animate={{ width: layout?.width, left: layout?.left }}
      className="drag-button"
      style={{
        y,
        x,
        position: "absolute",
        height: STEP_HEIGHT * height - 4,
        zIndex: 1,
      }}
    >
      Block {id}
    </motion.button>
  );
};
