import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";

const StudioObjects = lazy(() => import("./StudioObjects"));
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ScrollStudio() {
  const [ready, setReady] = useState(false);
  const [palette, setPalette] = useState({ paper: "", green: "", coral: "", ink: "", soft: "", brand: "" });
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const style = getComputedStyle(document.documentElement);
    const color = (name: string) => `hsl(${style.getPropertyValue(name).trim().replace(/\s+/g, ", ")})`;
    setPalette({ paper: color("--card"), green: color("--primary"), coral: color("--accent"), ink: color("--foreground"), soft: color("--secondary"), brand: color("--brand-logo") });
    const update = () => setReady(!preference.matches);
    const timer = window.setTimeout(update, 400);
    preference.addEventListener("change", update);
    return () => { window.clearTimeout(timer); preference.removeEventListener("change", update); };
  }, []);
  return <div className="page-scroll-models" aria-hidden="true">
    {ready && <SceneBoundary><Suspense fallback={null}><StudioObjects palette={palette} /></Suspense></SceneBoundary>}
  </div>;
}