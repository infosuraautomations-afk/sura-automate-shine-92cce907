import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { ExtrudeGeometry, Group, Path, Shape } from "three";
import logoContours from "@/assets/sura-logo-contours.json";

type Palette = { paper: string; green: string; coral: string; ink: string; soft: string; brand: string };

function Logo({ palette }: { palette: Palette }) {
  const root = useRef<Group>(null);
  const progress = useRef(0);
  const target = useRef(0);
  const { invalidate, size, gl } = useThree();
  const geometries = useMemo(() => logoContours.map(({ outline, holes }) => {
    const shape = new Shape();
    outline.forEach(([x, y], i) => i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y));
    shape.closePath();
    holes.forEach((points) => {
      const hole = new Path();
      points.forEach(([x, y], i) => i === 0 ? hole.moveTo(x, y) : hole.lineTo(x, y));
      hole.closePath();
      shape.holes.push(hole);
    });
    const geometry = new ExtrudeGeometry(shape, { depth: 0.26, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.018, bevelSegments: 2, steps: 1, curveSegments: 4 });
    geometry.translate(0, 0, -0.13);
    geometry.computeVertexNormals();
    return geometry;
  }), []);
  useEffect(() => () => geometries.forEach((geometry) => geometry.dispose()), [geometries]);
  useEffect(() => {
    let distance = 1;
    const update = () => {
      target.current = Math.max(0, Math.min(1, window.scrollY / distance));
      invalidate();
    };
    const measure = () => {
      distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
    };
  }, [invalidate]);
  useFrame((_, rawDelta) => {
    const next = target.current;
    progress.current += (next - progress.current) * (1 - Math.exp(-18 * Math.min(rawDelta, 0.05)));
    const t = progress.current;
    const scale = size.width < 640 ? 0.54 : 0.86;
    const range = Math.max(0, size.width / 100 - scale * 1.5);
    if (root.current) {
      root.current.position.set(-range + 2 * range * t, size.height / 100 - scale * 1.3, 0);
      root.current.rotation.set(-0.12, -0.55 + t * 1.1, -0.06 + t * 0.12);
      root.current.scale.setScalar(scale);
      gl.domElement.dataset.modelPositions = JSON.stringify([{ x: root.current.position.x, y: root.current.position.y }]);
    }
    gl.domElement.parentElement?.setAttribute("data-scene-ready", "true");
    gl.domElement.dataset.scrollProgress = t.toFixed(4);
    if (Math.abs(next - t) > 0.0002) invalidate();
  });
  return <>
    <OrthographicCamera makeDefault position={[0, 0, 16]} zoom={50} near={0.1} far={50} />
    <group ref={root} name="sura-logo">
      {geometries.map((geometry, i) => <mesh key={i} geometry={geometry}>
        <meshStandardMaterial color={palette.brand} roughness={0.38} metalness={0} />
      </mesh>)}
    </group>
  </>;
}

export default function StudioObjects({ palette }: { palette: Palette }) {
  return <Canvas frameloop="demand" dpr={1} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
    <ambientLight intensity={1.1} />
    <directionalLight position={[3, 5, 6]} intensity={2.2} />
    <directionalLight color={palette.soft} position={[-4, 0, 3]} intensity={0.8} />
    <Logo palette={palette} />
  </Canvas>;
}
