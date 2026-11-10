"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

type MagneticLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  wrapperClassName?: string;
};

export default function MagneticLink({
  href,
  className,
  children,
  wrapperClassName,
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.35 });

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== "mouse" || reduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    x.set(offsetX * 0.18);
    y.set(offsetY * 0.18);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={wrapperClassName ? `magnetic-wrap ${wrapperClassName}` : "magnetic-wrap"}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
    >
      <a className={className} href={href}>{children}</a>
    </motion.span>
  );
}
