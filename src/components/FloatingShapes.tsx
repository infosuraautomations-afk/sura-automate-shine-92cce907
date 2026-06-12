import { useEffect, useState } from "react";
import { Coffee, CupSoda, Croissant, Cookie, Cake, UtensilsCrossed, Leaf } from "lucide-react";

/**
 * Global cafe-themed 3D floating elements that travel as the user scrolls.
 * Mixes geometric shapes with cafe icons (coffee, beans, croissant, cake)
 * for an on-brand parallax atmosphere.
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
    // Geometric ambient
    { left: "5%", top: "10%", size: 120, speed: 0.25, rotate: 0.05, type: "cube" },
    { left: "85%", top: "20%", size: 90, speed: -0.18, rotate: -0.08, type: "ring" },
    { left: "15%", top: "55%", size: 70, speed: 0.35, rotate: 0.12, type: "dot" },
    { left: "75%", top: "70%", size: 140, speed: -0.22, rotate: 0.06, type: "cube" },
    { left: "45%", top: "120%", size: 100, speed: 0.3, rotate: -0.05, type: "ring" },
    { left: "10%", top: "180%", size: 110, speed: -0.28, rotate: 0.07, type: "dot" },
    { left: "80%", top: "210%", size: 80, speed: 0.2, rotate: -0.1, type: "cube" },
    { left: "30%", top: "260%", size: 130, speed: -0.32, rotate: 0.04, type: "ring" },

    // Cafe icons travelling on scroll
    { left: "8%", top: "30%", size: 64, speed: -0.4, rotate: 0.15, type: "icon", icon: "coffee" },
    { left: "90%", top: "45%", size: 56, speed: 0.45, rotate: -0.2, type: "icon", icon: "cup" },
    { left: "20%", top: "85%", size: 60, speed: -0.35, rotate: 0.18, type: "icon", icon: "croissant" },
    { left: "70%", top: "110%", size: 52, speed: 0.4, rotate: -0.14, type: "icon", icon: "cookie" },
    { left: "12%", top: "145%", size: 68, speed: -0.42, rotate: 0.1, type: "icon", icon: "cake" },
    { left: "82%", top: "175%", size: 58, speed: 0.38, rotate: -0.16, type: "icon", icon: "coffee" },
    { left: "40%", top: "225%", size: 54, speed: -0.36, rotate: 0.2, type: "icon", icon: "leaf" },
    { left: "65%", top: "290%", size: 62, speed: 0.44, rotate: -0.12, type: "icon", icon: "utensils" },
    { left: "25%", top: "320%", size: 50, speed: -0.3, rotate: 0.22, type: "icon", icon: "cup" },

    // Coffee beans (small dots clusters)
    { left: "50%", top: "60%", size: 24, speed: 0.55, rotate: 0.3, type: "bean" },
    { left: "55%", top: "62%", size: 20, speed: 0.5, rotate: -0.3, type: "bean" },
    { left: "35%", top: "160%", size: 22, speed: -0.5, rotate: 0.28, type: "bean" },
    { left: "60%", top: "240%", size: 26, speed: 0.6, rotate: -0.25, type: "bean" },
  ];

  const renderIcon = (name?: string) => {
    const cls = "w-full h-full text-primary-glow/40 drop-shadow-[0_0_20px_hsl(var(--primary)/0.35)]";
    switch (name) {
      case "coffee": return <Coffee className={cls} />;
      case "cup": return <CupSoda className={cls} />;
      case "croissant": return <Croissant className={cls} />;
      case "cookie": return <Cookie className={cls} />;
      case "cake": return <Cake className={cls} />;
      case "leaf": return <Leaf className={cls} />;
      case "utensils": return <UtensilsCrossed className={cls} />;
      default: return <Coffee className={cls} />;
    }
  };

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
        if (s.type === "icon") {
          return (
            <div key={i} style={style} className="absolute opacity-70">
              {renderIcon(s.icon)}
            </div>
          );
        }
        if (s.type === "bean") {
          return (
            <div
              key={i}
              style={style}
              className="absolute rounded-[50%] bg-gradient-to-br from-amber-700/60 to-amber-950/70 shadow-[0_0_20px_hsl(var(--primary)/0.3)] before:content-[''] before:absolute before:inset-y-0 before:left-1/2 before:w-px before:bg-amber-200/30"
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
