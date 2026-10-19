"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type ParallaxSectionProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Sets --mx / --my on the section from the mouse position, once per frame.
 * Touch input and reduced-motion users get a static layout.
 */
export default function ParallaxSection({ className, children }: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  function setOffset(x: string, y: string) {
    ref.current?.style.setProperty("--mx", x);
    ref.current?.style.setProperty("--my", y);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { clientX, clientY } = event;
    const bounds = event.currentTarget.getBoundingClientRect();
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setOffset(
        `${((clientX - bounds.left) / bounds.width - 0.5) * 10}px`,
        `${((clientY - bounds.top) / bounds.height - 0.5) * 6}px`,
      );
    });
  }

  function handlePointerLeave() {
    cancelAnimationFrame(frame.current);
    setOffset("0px", "0px");
  }

  return (
    <section
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </section>
  );
}
