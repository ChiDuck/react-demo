import { useMemo, useState } from "react";
import "./drag.scss";
import { DragBlock } from "./DragBlock";
const calculateLayout = (blocks) => {
  const blockSlots = {};
  const maxStep = Math.max(...blocks.map((b) => b.step + b.height), 0);
  let currentGrid = [];

  // 1. Assign STABLE slots (This prevents side-to-side overlapping)
  for (let step = 0; step <= maxStep; step++) {
    const nextGrid = [];
    const activeBlocks = blocks.filter(
      (b) => step >= b.step && step < b.step + b.height
    );

    currentGrid.forEach((blockId, slotIdx) => {
      if (activeBlocks.find((b) => b.id === blockId)) {
        nextGrid[slotIdx] = blockId;
        blockSlots[blockId] = slotIdx;
      }
    });

    activeBlocks.forEach((b) => {
      if (blockSlots[b.id] === undefined) {
        let slot = 0;
        while (nextGrid[slot] !== undefined) slot++;
        nextGrid[slot] = b.id;
        blockSlots[b.id] = slot;
      }
    });
    currentGrid = nextGrid;
  }

  // 2. Build a Connection Map (Who touches whom?)
  const adj = {};
  blocks.forEach((b) => (adj[b.id] = new Set()));

  for (let step = 0; step <= maxStep; step++) {
    const idsInRow = blocks
      .filter((b) => step >= b.step && step < b.step + b.height)
      .map((b) => b.id);

    idsInRow.forEach((id1) => {
      idsInRow.forEach((id2) => {
        if (id1 !== id2) adj[id1].add(id2);
      });
    });
  }

  // 3. Group into Clusters and find the MAX density for the WHOLE cluster
  const visited = new Set();
  const clusters = [];

  blocks.forEach((b) => {
    if (!visited.has(b.id)) {
      const cluster = [];
      const stack = [b.id];
      while (stack.length) {
        const node = stack.pop();
        if (!visited.has(node)) {
          visited.add(node);
          cluster.push(node);
          adj[node].forEach((neighbor) => stack.push(neighbor));
        }
      }
      clusters.push(cluster);
    }
  });

  const layout = {};
  clusters.forEach((cluster) => {
    // Find the highest slot used anywhere in this entire cluster
    let maxSlotInCluster = 0;
    cluster.forEach((id) => {
      if (blockSlots[id] > maxSlotInCluster) maxSlotInCluster = blockSlots[id];
    });

    const clusterCols = maxSlotInCluster + 1;
    const widthVal = 100 / clusterCols;

    cluster.forEach((id) => {
      layout[id] = {
        width: `${widthVal}%`,
        left: `${widthVal * blockSlots[id]}%`,
      };
    });
  });

  return layout;
};

const MagneticDrag = () => {
  const [items, setItems] = useState([
    { id: 1, step: 1, height: 3 },
    { id: 2, step: 1, height: 1 },
    { id: 3, step: 0, height: 2 },
    { id: 4, step: 1, height: 1 },
  ]);

  const layout = useMemo(() => calculateLayout(items), [items]);

  return (
    <div
      className="drag-container"
      style={{ position: "relative", width: "100%", height: "800px" }}
    >
      {items.map((item) => (
        <DragBlock
          key={item.id}
          {...item}
          layout={layout[item.id]}
          onStepChange={(id, newStep) =>
            setItems((prev) =>
              prev.map((i) => (i.id === id ? { ...i, step: newStep } : i))
            )
          }
        />
      ))}
    </div>
  );
};

export default MagneticDrag;
