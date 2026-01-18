import { useEffect, useMemo, useRef, useState } from "react";
import { map_ICR17 } from "../map_ICR17";
import { pr_ICR17 } from "../pr_ICR17";

/* ---------------- Utility Functions ---------------- */

function getBounds(areas) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  areas.forEach((area) => {
    area.points.forEach(({ x, y }) => {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
  });

  return { minX, minY, maxX, maxY };
}

function scalePoint(point, bounds, width, height) {
  if (!width || !height) return { x: 0, y: 0 };

  return {
    x:
      ((point.x - bounds.minX) /
        (bounds.maxX - bounds.minX)) *
      width,
    y:
      ((point.y - bounds.minY) /
        (bounds.maxY - bounds.minY)) *
      height,
  };
}

/* ---------------- Component ---------------- */

function AssetsMap({ date, setId }) {
  const svgRef = useRef(null);

  const [svgSize, setSvgSize] = useState({
    width: 0,
    height: 0,
  });

  const [hoverInfo, setHoverInfo] = useState(null);

  const areas = map_ICR17.areas;
  const prData = pr_ICR17.pr_data;

  /* ---------------- Bounds ---------------- */
  const bounds = useMemo(
    () => getBounds(areas),
    [areas]
  );

  /* ---------------- Resize Observer ---------------- */
  useEffect(() => {
    if (!svgRef.current) return;

    const observer = new ResizeObserver(
      ([entry]) => {
        const { width, height } =
          entry.contentRect;
        setSvgSize({ width, height });
      }
    );

    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, []);

  /* ---------------- PR Min / Max ---------------- */
  const { minVal, maxVal } = useMemo(() => {
    const values = [];

    Object.values(prData).forEach((day) => {
      Object.values(day).forEach((val) => {
        if (!isNaN(val)) values.push(val);
      });
    });

    if (!values.length) {
      return { minVal: 0, maxVal: 1 };
    }

    return {
      minVal: Math.min(...values),
      maxVal: Math.max(...values),
    };
  }, [prData]);

  /* ---------------- Color Mapping ---------------- */
  const prToColor = (pr) => {
    if (isNaN(pr)) return "rgb(180,180,180)";

    const t =
      maxVal === minVal
        ? 0.5
        : (pr - minVal) / (maxVal - minVal);

    const red = Math.round((1 - t) * 240);
    const green = Math.round(t * 240);

    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <section className="w-full h-full relative p-2">
      <svg
  ref={svgRef}
  className="w-full h-full"
  preserveAspectRatio="xMidYMid meet"
>
        {areas.map((area) => {
          const points = area.points
            .map((p) => {
              const sp = scalePoint(
                p,
                bounds,
                svgSize.width,
                svgSize.height
              );
              return `${sp.x},${sp.y}`;
            })
            .join(" ");

          const prValue =
            prData?.[date]?.[area.id];

          return (
            <polygon
              key={area.id}
              points={points}
              fill={prToColor(prValue)}
              stroke="#222"
              strokeWidth="1"
              className="cursor-pointer transition hover:opacity-90"
              onClick={() => setId(area.id)}
              onMouseEnter={(e) =>
                setHoverInfo({
                  id: area.id,
                  pr: prValue,
                  x: e.clientX,
                  y: e.clientY,
                })
              }
              onMouseMove={(e) =>
                setHoverInfo((prev) =>
                  prev
                    ? {
                        ...prev,
                        x: e.clientX,
                        y: e.clientY,
                      }
                    : null
                )
              }
              onMouseLeave={() =>
                setHoverInfo(null)
              }
            />
          );
        })}
      </svg>

      {/* ---------------- Tooltip ---------------- */}
      {hoverInfo && (
        <div
          className="
            fixed z-50
            bg-black/80
            text-white text-xs
            px-2 py-1
            rounded
            pointer-events-none
          "
          style={{
            top: hoverInfo.y + 10,
            left: hoverInfo.x + 10,
          }}
        >
          <div>
            <strong>ID:</strong>{" "}
            {hoverInfo.id}
          </div>
          <div>
            <strong>PR:</strong>{" "}
            {isNaN(hoverInfo.pr)
              ? "N/A"
              : hoverInfo.pr.toFixed(6)}
          </div>
        </div>
      )}
    </section>
  );
}

export default AssetsMap;
