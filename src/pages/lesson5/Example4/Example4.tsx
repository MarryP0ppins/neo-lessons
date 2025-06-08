import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleLinear } from "@visx/scale";

interface DataPoint {
  id: string;
  x: number;
  y: number;
}

type ScaleFunction = ReturnType<typeof scaleLinear<number>>;

const generateData = (count: number): DataPoint[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `point-${i}`,
    x: i,
    y: Math.random() * 100,
  }));

const DATA = generateData(10);
const WIDTH = 800;
const HEIGHT = 400;

export const AnimatedGraph: React.FC = React.memo(() => {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const xScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, Math.max(...DATA.map((d) => d.x))],
        range: [50, WIDTH - 50],
      }),
    []
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, Math.max(...DATA.map((d) => d.y))],
        range: [HEIGHT - 50, 50],
      }),
    []
  );

  return (
    <div className="relative bg-white p-5 rounded-lg shadow-md">
      <svg width={WIDTH} height={HEIGHT}>
        <StaticGraph
          data={DATA}
          xScale={xScale}
          yScale={yScale}
          width={WIDTH}
          height={HEIGHT}
        />
        <InteractivePoints
          data={DATA}
          xScale={xScale}
          yScale={yScale}
          setHoveredPoint={setHoveredPoint}
        />
      </svg>

      <AnimatePresence>
        {hoveredPoint && (
          <motion.div
            className="absolute bg-gray-800 text-white px-2 py-1 rounded text-sm pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              left: xScale(hoveredPoint.x) + 10,
              top: yScale(hoveredPoint.y) - 30,
            }}
            layout
          >
            X: {hoveredPoint.x.toFixed(2)}, Y: {hoveredPoint.y.toFixed(2)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const StaticGraph: React.FC<{
  data: DataPoint[];
  xScale: ScaleFunction;
  yScale: ScaleFunction;
  width: number;
  height: number;
}> = React.memo(({ data, xScale, yScale, width, height }) => {
  const linePath = useMemo(
    () =>
      data
        .map(
          (point, i) =>
            `${i === 0 ? "M" : "L"} ${xScale(point.x)} ${yScale(point.y)}`
        )
        .join(" "),
    [data, xScale, yScale]
  );

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <g>
      {yScale.ticks(5).map((tick) => (
        <line
          key={`grid-${tick}`}
          x1={50}
          x2={width - 50}
          y1={yScale(tick)}
          y2={yScale(tick)}
          stroke="#e0e0e0"
          strokeWidth={1}
        />
      ))}

      <motion.path
        d={linePath}
        stroke="#4a90e2"
        strokeWidth={3}
        fill="none"
        variants={lineVariants}
        initial="hidden"
        animate="visible"
      />

      <line
        x1={50}
        x2={width - 50}
        y1={height - 50}
        y2={height - 50}
        stroke="#333"
        strokeWidth={2}
      />
      <line
        x1={50}
        x2={50}
        y1={50}
        y2={height - 50}
        stroke="#333"
        strokeWidth={2}
      />
    </g>
  );
});

const InteractivePoints: React.FC<{
  data: DataPoint[];
  xScale: (value: number) => number;
  yScale: (value: number) => number;
  setHoveredPoint: (point: DataPoint | null) => void;
}> = React.memo(({ data, xScale, yScale, setHoveredPoint }) => {
  const pointVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
    hover: { scale: 1.5, fill: "#ff6b6b", transition: { duration: 0.2 } },
  };

  return (
    <g>
      {data.map((point, i) => (
        <motion.circle
          key={point.id}
          cx={xScale(point.x)}
          cy={yScale(point.y)}
          r={6}
          fill="#4a90e2"
          variants={pointVariants}
          initial="hidden"
          animate="visible"
          custom={i}
          whileHover="hover"
          onHoverStart={() => setHoveredPoint(point)}
          onHoverEnd={() => setHoveredPoint(null)}
          layout
        />
      ))}
    </g>
  );
});
