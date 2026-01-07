import { motion, useMotionValue } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import "./drag.scss";

const STEP_HEIGHT = 110;

// --- LAYOUT ENGINE ---
const calculateLayout = (blocks) => {
  // 1. Map blocks to the rows they occupy
  const rows = {}; // { 0: [blockId, blockId], 1: [...] }

  // Also track vertical span for slotting
  const blockSpans = {}; // { id: { start, end } }

  blocks.forEach((b) => {
    blockSpans[b.id] = { start: b.startStep, end: b.startStep + b.h };
    for (let i = 0; i < b.h; i++) {
      const step = b.startStep + i;
      if (!rows[step]) rows[step] = [];
      rows[step].push(b.id);
    }
  });

  // 2. Assign Horizontal Slots (Column Index)
  // We iterate steps top-down. Persistent blocks keep their slot.
  const blockSlots = {}; // { id: 0 } (Block 1 is in Col 0)
  const maxStep = Math.max(...blocks.map((b) => b.startStep + b.h), 0);

  // This tracks which slots are taken at the CURRENT step
  // layoutGrid[slotIndex] = blockId
  let currentGrid = [];

  for (let step = 0; step <= maxStep; step++) {
    const nextGrid = [];
    const blocksHere = rows[step] || [];

    // A. Carry over blocks from previous step (they keep their slot)
    currentGrid.forEach((blockId, slotIdx) => {
      if (blockId && blocksHere.includes(blockId)) {
        nextGrid[slotIdx] = blockId; // Keep slot
        blockSlots[blockId] = slotIdx;
      }
    });

    // B. Place new blocks starting at this step
    blocksHere.forEach((blockId) => {
      if (blockSlots[blockId] === undefined) {
        // Find first empty slot
        let slot = 0;
        while (nextGrid[slot] !== undefined) slot++;
        nextGrid[slot] = blockId;
        blockSlots[blockId] = slot;
      }
    });

    currentGrid = nextGrid;
  }

  // 3. Cluster Grouping (Union-Find Logic)
  // If Block A and Block B share a row, they are in the same cluster.
  const adj = {}; // Graph adjacency list
  blocks.forEach((b) => (adj[b.id] = []));

  Object.values(rows).forEach((rowBlocks) => {
    for (let i = 0; i < rowBlocks.length; i++) {
      for (let j = i + 1; j < rowBlocks.length; j++) {
        const u = rowBlocks[i],
          v = rowBlocks[j];
        adj[u].push(v);
        adj[v].push(u);
      }
    }
  });

  const clusters = [];
  const visited = new Set();

  blocks.forEach((b) => {
    if (!visited.has(b.id)) {
      const cluster = new Set();
      const queue = [b.id];
      while (queue.length) {
        const curr = queue.pop();
        if (visited.has(curr)) continue;
        visited.add(curr);
        cluster.add(curr);
        adj[curr].forEach((neighbor) => queue.push(neighbor));
      }
      clusters.push(Array.from(cluster));
    }
  });

  // 4. Calculate Dimensions per Cluster
  const layoutResults = {};

  clusters.forEach((clusterIds) => {
    // Find the max slot index used in this entire cluster
    // If a row has slots 0, 1, 2 used, the width is 1/3.
    let maxSlotUsed = 0;
    clusterIds.forEach((id) => {
      maxSlotUsed = Math.max(maxSlotUsed, blockSlots[id]);
    });

    const columnCount = maxSlotUsed + 1;
    const widthPercentage = 100 / columnCount;

    clusterIds.forEach((id) => {
      layoutResults[id] = {
        width: `${widthPercentage}%`,
        left: `${blockSlots[id] * widthPercentage}%`,
        zIndex: blockSlots[id], // simple layering
      };
    });
  });

  return layoutResults;
};

// --- COMPONENTS ---

const DraggableBlock = ({ block, layoutStyle, onDragUpdate, onDrop }) => {
  const y = useMotionValue(block.startStep * STEP_HEIGHT);
  const lastStoredY = useRef(block.startStep * STEP_HEIGHT);

  // When layout changes (e.g. pushed to new col), animate smoothly
  // Note: We don't animate Y here because we want instant snap for Y,
  // but smooth transitions for width/left are nice.

  const handleDrag = (event, info) => {
    const totalDistance = lastStoredY.current + info.offset.y;
    const targetStep = Math.round(totalDistance / STEP_HEIGHT);
    const clampedStep = Math.max(0, targetStep);

    // Live Update: Tell parent we are hovering over this step
    if (clampedStep !== block.startStep) {
      onDragUpdate(block.id, clampedStep);
    }
  };

  const handleDragEnd = () => {
    lastStoredY.current = y.get(); // Sync physics
    // Snap visual exactly to grid
    y.set(block.startStep * STEP_HEIGHT);
    onDrop(); // trigger final save/log
  };

  return (
    <motion.div
      drag="y"
      dragMomentum={false}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      initial={false}
      animate={{
        width: layoutStyle?.width || "100%",
        left: layoutStyle?.left || "0%",
        y: block.startStep * STEP_HEIGHT,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "absolute",
        height: block.h * STEP_HEIGHT - 8,
        backgroundColor: block.color,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        border: "1px solid rgba(255,255,255,0.5)",
        zIndex: 10 + (layoutStyle?.zIndex || 0),
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      {block.id}
    </motion.div>
  );
};

export default function SmartGrid() {
  // Initial state from your example:
  // [1](h2), [3](h2), [2,4](h1) are somewhat mixed
  const [blocks, setBlocks] = useState([
    { id: 1, startStep: 0, h: 2, color: "#3b82f6" }, // Blue
    { id: 2, startStep: 2, h: 1, color: "#ef4444" }, // Red
    { id: 3, startStep: 1, h: 2, color: "#10b981" }, // Green
    { id: 4, startStep: 2, h: 1, color: "#f59e0b" }, // Orange
  ]);

  // Recalculate layout whenever blocks move
  const layout = useMemo(() => calculateLayout(blocks), [blocks]);

  const handleDragUpdate = (id, newStartStep) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, startStep: newStartStep } : b))
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "800px",
        background: "#f1f5f9",
        margin: "50px auto",
        border: "1px solid #ccc",
      }}
    >
      {/* Grid Lines for visualization */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: i * STEP_HEIGHT,
            width: "100%",
            height: 1,
            background: "#e2e8f0",
          }}
        />
      ))}

      {blocks.map((block) => (
        <DraggableBlock
          key={block.id}
          block={block}
          layoutStyle={layout[block.id]}
          onDragUpdate={handleDragUpdate}
          onDrop={() => console.log("Saved")}
        />
      ))}
    </div>
  );
}
