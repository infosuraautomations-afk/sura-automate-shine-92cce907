import { useEffect, useState } from "react";

/**
 * Global 3D floating shapes that travel as the user scrolls.
 * Uses simple parallax transforms — performant, no library needed.
 */
export const FloatingShapes = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const shapes = [
    { left: "5%", top: "10%", size: 120, speed: 0.25, rotate: 0.05, type: "cube" },
    { left: "85%", top: "20%", size: 90, speed: -0.18, rotate: -0.08, type: "ring" },
    { left: "15%", top: "55%", size: 70, speed: 0.35, rotate: 0.12, type: "dot" },
    { left: "75%", top: "70%", size: 140, speed: -0.22, rotate: 0.06, type: "cube" },
    { left: "45%", top: "120%", size: 100, speed: 0.3, rotate: -0.05, type: "ring" },
    { left: "10%", top: "180%", size: 110, speed: -0.28, rotate: 0.07, type: "dot" },
    { left: "80%", top: "210%", size: 80, speed: 0.2, rotate: -0.1, type: "cube" },
    { left: "30%", top: "260%", size: 130, speed: -0.32, rotate: 0.04, type: "ring" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {shapes.map((s, i) => {
        const ty = y * s.speed;
        const rot = y * s.rotate;
        const style = {
          left: s.left,
          top: s.top,
          width: s.size,
          height: s.size,
          transform: `translate3d(0, ${ty}px, 0) rotate(${rot}deg)`,
          willChange: "transform",
        } as React.CSSProperties;

        if (s.type === "cube") {
          return (
            <div
              key={i}
              style={style}
              className="absolute rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary-glow/5 backdrop-blur-sm shadow-glow"
            />
          );
        }
        if (s.type === "ring") {
          return (
            <div
              key={i}
              style={style}
              className="absolute rounded-full border-2 border-primary-glow/30"
            />
          );
        }
        return (
          <div
            key={i}
            style={style}
            className="absolute rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-2xl"
          />
        );
      })}
    </div>
  );
};
