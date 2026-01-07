import { useMemo, useState } from "react";
import { GridBlock } from "./GridBlock";

const calculateLayout = (items) => {
  const layout = {};

  // Group items by column first (Isolation)
  const columns = {};
  items.forEach((item) => {
    if (!columns[item.column]) columns[item.column] = [];
    columns[item.column].push(item);
  });

  Object.keys(columns).forEach((colIdx) => {
    const colItems = columns[colIdx];
    colItems.sort((a, b) => a.step - b.step);

    const overlaps = [];
    const lanes = [];
    colItems.forEach((item) => {
      const start = item.step;
      const end = item.step + item.height;

      let laneIdx = -1;
      for (let i = 0; i < lanes.length; i++) {
        // If the lane is free at this start time
        if (lanes[i] <= start) {
          laneIdx = i;
          break;
        }
      }

      if (laneIdx === -1) {
        laneIdx = lanes.length;
        lanes.push(end);
      } else {
        lanes[laneIdx] = end;
      }

      layout[item.id] = {
        lane: laneIdx,
        start,
        end,
      };
    });
  });

  Object.keys(columns).forEach((colIndex) => {
    const colItems = columns[colIndex];

    colItems.forEach((item) => {
      let maxLane = 0;
      const start = item.step;
      const end = item.step + item.height;

      colItems.forEach((neighbor) => {
        const nStart = neighbor.step;
        const nEnd = neighbor.step + neighbor.height;

        if (start < nEnd && nStart < end) {
          if (layout[neighbor.id].lane >= maxLane) {
            maxLane = layout[neighbor.id].lane;
          }
        }
      });

      const totalSubCols = maxLane + 1;
      layout[item.id] = {
        ...layout[item.id],
        widthPercent: 100 / totalSubCols,
        leftPercent: (layout[item.id].lane * 100) / totalSubCols,
      };
    });
  });
  return layout;
};

export const GridDrag = () => {
  const COLUMNS = 8;
  const STEP_HEIGHT = 80;
  const STEP_WIDTH = 200;
  const MAX_STEP = 15;

  const [items, setItems] = useState([
    { id: 1, step: 0, column: 0, height: 3.4 },
    { id: 2, step: 1, column: 1, height: 1.2 },
    { id: 3, step: 0, column: 2, height: 2.6 },
    { id: 4, step: 2, column: 3, height: 2 },
    { id: 5, step: 1, column: 5, height: 1.3 },
    { id: 6, step: 2, column: 3, height: 1 },
  ]);

  const layoutData = useMemo(() => calculateLayout(items), [items]);

  const handleMove = (id, newStep, newCol) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, step: newStep, column: newCol } : item
      )
    );
  };

  return (
    <div
      className="drag-container"
      style={{
        position: "relative",
        width: `${STEP_WIDTH * COLUMNS}px`,
        height: `${STEP_HEIGHT * MAX_STEP}px`,
        background: "#eee",
        // Visual grid lines (optional)
        backgroundImage: `linear-gradient(to right, #ddd 1px, transparent 1px), linear-gradient(to bottom, #ddd 1px, transparent 1px)`,
        backgroundSize: `${STEP_WIDTH}px ${STEP_HEIGHT}px`,
      }}
    >
      {items.map((item) => (
        <GridBlock
          key={item.id}
          {...item}
          layoutStyle={
            layoutData[item.id] || { widthPercent: 100, leftPercent: 0 }
          }
          totalCols={COLUMNS}
          stepHeight={STEP_HEIGHT}
          stepWidth={STEP_WIDTH}
          maxStep={MAX_STEP}
          onMove={handleMove}
        />
      ))}
    </div>
  );
};
