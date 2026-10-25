import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

const StudioObjects = lazy(() => import("./StudioObjects"));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ScrollStudio() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [palette, setPalette] = useState({ paper: "", green: "", coral: "", ink: "", soft: "" });
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const color = (name: string) => `hsl(${style.getPropertyValue(name).trim().replace(/\s+/g, ", ")})`;
    setPalette({ paper: color("--card"), green: color("--primary"), coral: color("--accent"), ink: color("--foreground"), soft: color("--secondary") });
    const element = host.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <section ref={host} className="scroll-studio relative" aria-label="Website development and automation in 3D">
    <div className="studio-stage sticky top-20">
      <div className="container mx-auto px-4 text-center pt-6 studio-heading">
        <p className="text-xs font-semibold uppercase text-primary mb-2">Thoughtfully connected</p>
        <h2 className="text-2xl sm:text-3xl font-bold">The little things that make it work.</h2>
      </div>
      <div className="studio-canvas" aria-hidden="true">
        {ready && <SceneBoundary><Suspense fallback={null}><StudioObjects palette={palette} host={host} /></Suspense></SceneBoundary>}
      </div>
    </div>
  </section>;
}