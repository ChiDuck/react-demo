import { useEffect, useState } from "react";
import DragBlock from "../DragBlock";
import "./drag.scss";

const MagneticDrag = () => {
  const [occupancy, setOccupancy] = useState({ 0: [], 1: [] });

  useEffect(() => {
    console.log(occupancy);
  }, [occupancy]);

  const handleStepChange = (blockId, newStep, height) => {
    setOccupancy((prev) => {
      const next = { ...prev };
      // Remove from old step
      Object.keys(next).forEach((step) => {
        next[step] = prev[step].filter((id) => id !== blockId);
      });
      // Add to new step
      for (let i = 0; i < height; i++) {
        const step = newStep + i;
        if (!next[step]) next[step] = [];
        if (!next[step].includes(blockId)) next[step].push(blockId);
      }
      return next;
    });
  };
  return (
    <div>
      <div className="drag-container">
        <DragBlock
          id={1}
          onStepChange={handleStepChange}
          occupancy={occupancy}
          height_multiplier={3}
        />
        <DragBlock
          id={2}
          onStepChange={handleStepChange}
          occupancy={occupancy}
        />
        <DragBlock
          id={3}
          onStepChange={handleStepChange}
          occupancy={occupancy}
          height_multiplier={2}
        />
        <DragBlock
          id={4}
          onStepChange={handleStepChange}
          occupancy={occupancy}
        />
      </div>
    </div>
  );
};

export default MagneticDrag;
