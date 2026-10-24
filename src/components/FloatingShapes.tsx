import { useEffect, useRef } from "react";

export const FloatingShapes = () => {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (preference.matches) {
        root.current?.querySelectorAll<HTMLElement>("[data-shape]").forEach((element) => { element.style.transform = "none"; });
        return;
      }
      root.current?.querySelectorAll<HTMLElement>("[data-shape]").forEach((element, index) => {
        const direction = index % 2 ? -1 : 1;
        element.style.transform = `translate3d(0, ${Math.sin(window.scrollY / 900 + index) * 100 * direction}px, 0) rotate(${window.scrollY / 25 * direction}deg)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    preference.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      preference.removeEventListener("change", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div data-shape className="absolute left-[2%] top-[20%] w-20 h-20 border border-primary/20 rounded-lg" />
      <div data-shape className="absolute right-[2%] top-[55%] w-16 h-16 border border-foreground/10 rounded-lg" />
      <div data-shape className="absolute left-[4%] top-[85%] w-10 h-10 border border-primary/15 rounded-lg" />
    </div>
  );
};
