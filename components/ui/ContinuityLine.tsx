"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ContinuityLine() {
  const { scrollYProgress } = useScroll();
  const pathRef = useRef<SVGPathElement>(null);
  const [totalLength, setTotalLength] = useState(0);

  // Smooth scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (pathRef.current) {
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Calculate tracer dot position along the curve
  const dotX = useTransform(smoothProgress, (val) => {
    if (!pathRef.current || !totalLength) return 40;
    const pt = pathRef.current.getPointAtLength(val * totalLength);
    return pt.x;
  });

  const dotY = useTransform(smoothProgress, (val) => {
    if (!pathRef.current || !totalLength) return 0;
    const pt = pathRef.current.getPointAtLength(val * totalLength);
    return pt.y;
  });

  // Seamless organic curved path coordinates (mapped 0-200 x, 0-1000 y)
  const curvePath = "M 40 0 C 150 180, 160 340, 70 500 C 10 650, 150 820, 50 1000";

  return (
    <div className="fixed top-0 left-0 bottom-0 w-28 sm:w-36 md:w-48 lg:w-56 z-50 pointer-events-none hidden sm:block overflow-visible">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 200 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="continuity-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="continuity-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9D00FF" stopOpacity="1" />
            <stop offset="50%" stopColor="#B033FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9D00FF" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Background dashed track curve */}
        <path
          d={curvePath}
          fill="none"
          stroke="rgba(157, 0, 255, 0.3)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        {/* Outer ambient glow aura */}
        <motion.path
          d={curvePath}
          fill="none"
          stroke="rgba(157, 0, 255, 0.35)"
          strokeWidth="3.5"
          strokeLinecap="round"
          filter="url(#continuity-glow)"
          style={{ pathLength: smoothProgress }}
        />

        {/* Animated main flow line */}
        <motion.path
          ref={pathRef}
          d={curvePath}
          fill="none"
          stroke="url(#continuity-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
        />

        {/* Leading tracer dot & glowing head */}
        {totalLength > 0 && (
          <g>
            {/* Soft glow halo around leading dot */}
            <motion.circle
              cx={dotX}
              cy={dotY}
              r="7"
              fill="rgba(157, 0, 255, 0.45)"
              filter="url(#continuity-glow)"
            />
            {/* Core tracer dot */}
            <motion.circle
              cx={dotX}
              cy={dotY}
              r="3.5"
              fill="#9D00FF"
              stroke="#ffffff"
              strokeWidth="0.8"
              className="shadow-[0_0_12px_rgba(157,0,255,1)]"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

