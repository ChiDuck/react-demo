import { animate, delay, motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./drag.scss";

export const GridBlock = ({
  id,
  step,
  column,
  height,
  totalCols,
  maxStep,
  stepHeight,
  stepWidth,
  layoutStyle,
  onMove,
}) => {
  const x = useMotionValue(column * stepWidth);
  const y = useMotionValue(step * stepHeight);
  const xSD = useMotionValue(column * stepWidth);
  const ySD = useMotionValue(step * stepHeight);
  const [dragging, setDragging] = useState(false);
  // Use refs to track the "pending" grid position during drag
  const currentGridPos = useRef({ step, column });

  useEffect(() => {
    const subOffset = (layoutStyle.leftPercent / 100) * stepWidth;

    const targetX = column * stepWidth + subOffset;
    const targetY = step * stepHeight;

    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
    animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });

    // Update internal ref to match new reality
    currentGridPos.current = { step, column };
  }, [step, column, stepWidth, stepHeight, layoutStyle]);

  const handleDragStart = () => {
    setDragging(true);
    const subOffset = (layoutStyle.leftPercent / 100) * stepWidth;
    xSD.set(x.get() - subOffset);
    ySD.set(y.get());
  };

  const handleDrag = (event, info) => {
    const currentX = column * stepWidth + info.offset.x;
    const currentY = step * stepHeight + info.offset.y;

    const targetCol = Math.round(currentX / stepWidth);
    const targetStep = Math.round(currentY / stepHeight);

    // Clamp within bounds
    const clampedCol = Math.max(0, Math.min(targetCol, totalCols - 1));
    const clampedStep = Math.max(
      0,
      Math.min(targetStep, maxStep - Math.ceil(height))
    );

    // Only animate if the grid position actually changed
    if (
      clampedCol !== currentGridPos.current.column ||
      clampedStep !== currentGridPos.current.step
    ) {
      currentGridPos.current = { column: clampedCol, step: clampedStep };

      animate(xSD, clampedCol * stepWidth, {
        type: "spring",
        stiffness: 500,
        damping: 60,
      });
      animate(ySD, clampedStep * stepHeight, {
        type: "spring",
        stiffness: 500,
        damping: 60,
      });
    }
  };

  const handleDragEnd = () => {
    delay(() => setDragging(false), 200);
    // setDragging(false);
    // Notify parent to update state
    onMove(id, currentGridPos.current.step, currentGridPos.current.column);
  };

  const width = stepWidth * (layoutStyle.widthPercent / 100) - 4;

  return (
    <>
      {dragging && (
        <motion.div
          className="block-shadow"
          style={{
            x: xSD,
            y: ySD,
            width: stepWidth - 16,
            height: stepHeight * height - 16,
          }}
        >
          shadow of block {id}
        </motion.div>
      )}
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={{ width }}
        style={{
          x,
          y,
          position: "absolute",
          width,
          height: stepHeight * height - 4, // 4px gap for vertical spacing
          boxSizing: "border-box",
          margin: "2px",
          zIndex: 5,
        }}
        whileHover={{
          height: stepHeight * 4 - 4,
          width: stepWidth - 4,
          zIndex: 6,
        }}
        className="drag-button"
      >
        Block {id}
      </motion.div>
    </>
  );
};
