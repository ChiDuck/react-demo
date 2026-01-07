import { animate, motion, useMotionValue } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import "./drag.scss";

const DragBlock = ({ id, onStepChange, occupancy, height_multiplier = 1 }) => {
  const lastStoredY = useRef(0);
  const STEP_HEIGHT = 110;
  const MIN_STEP = 0;
  const MAX_STEP = 10;
  const [currentStep, setCurrentStep] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  let clampStep = 0;
  let targetY = 0;

  // 1. Determine layout based on how many others are at this step
  const sharingData = useMemo(() => {
    let maxOccupants = 0;
    let myPositionInRow = 0;
    for (let i = 0; i < height_multiplier; i++) {
      const stepItems = occupancy[currentStep + i] || [];
      maxOccupants = Math.max(maxOccupants, stepItems.length);
      const index = stepItems.indexOf(id);
      if (index !== -1) myPositionInRow = Math.max(myPositionInRow, index);
    }
    return { count: maxOccupants || 1, index: myPositionInRow };
  }, [occupancy, currentStep, id, height_multiplier]);

  const width = `${100 / sharingData.count}%`;
  const left = `${(100 / sharingData.count) * sharingData.index}%`;

  const handleDrag = (event, info) => {
    let curPt = info.offset.y + lastStoredY.current;
    const targetStep = Math.round(curPt / STEP_HEIGHT);
    clampStep = Math.max(
      MIN_STEP,
      Math.min(MAX_STEP - height_multiplier, targetStep)
    );

    // y.set(targetY);
    // Only animate if we actually changed steps to avoid spamming animations
    // if (y.get() !== targetY) {
    //   animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });
    // }
  };
  const handleDragEnd = () => {
    lastStoredY.current = y.get();
    if (clampStep !== currentStep) {
      setCurrentStep(clampStep);
      onStepChange(id, clampStep, height_multiplier); // Tell parent we moved
    }
    targetY = clampStep * STEP_HEIGHT;
    if (y.get() !== targetY) {
      animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });
    }
    x.set(0);
  };
  return (
    <motion.button
      drag
      dragMomentum={false}
      style={{ x, y, height: STEP_HEIGHT * height_multiplier }}
      animate={{ width, left }}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="drag-button"
    >
      Block {id}
    </motion.button>
  );
};

export default DragBlock;
