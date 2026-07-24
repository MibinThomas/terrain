"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  el?: React.ElementType;
  className?: string;
  once?: boolean;
  mode?: "word" | "character";
  delay?: number;
}

export default function AnimatedText({
  text,
  el: Wrapper = "div",
  className = "",
  once = true,
  mode = "word",
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const isWordMode = mode === "word";
  
  // Split by words or characters
  const itemArray = isWordMode ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isWordMode ? 0.04 : 0.02,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Wrapper ref={ref} className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        {itemArray.map((item, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ marginRight: isWordMode && index !== itemArray.length - 1 ? "0.25em" : "0" }}
          >
            {item === " " && !isWordMode ? "\u00A0" : item}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
