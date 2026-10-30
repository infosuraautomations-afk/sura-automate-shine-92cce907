import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, OrthographicCamera } from "@react-three/drei";
import { CanvasTexture, Group, SRGBColorSpace } from "three";

type Palette = { paper: string; green: string; coral: string; ink: string; soft: string };
const kinds = ["website", "chat"];

function makeSurface(kind: string, palette: Palette) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new CanvasTexture(canvas);
  const block = (x: number, y: number, w: number, h: number, color: string, r = 10) => {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill();
  };
  block(0, 0, 512, 384, palette.paper, 0);
  block(0, 0, 512, 46, palette.soft, 0);
  [palette.coral, palette.green, palette.ink].forEach((color, i) => block(20 + i * 24, 16, 12, 12, color, 6));
  block(140, 15, 230, 16, palette.paper);
  if (kind === "website") {
    block(24, 72, 220, 30, palette.green);
    block(24, 116, 195, 12, palette.soft);
    block(24, 140, 170, 12, palette.soft);
    block(24, 178, 128, 32, palette.coral);
    block(280, 70, 206, 144, palette.soft);
    ctx.fillStyle = palette.green; ctx.beginPath(); ctx.arc(384, 140, 44, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < 3; i++) { block(24 + i * 160, 244, 142, 84, i === 1 ? palette.soft : palette.green); block(24 + i * 160, 342, 100, 12, palette.soft); }
  } else if (kind === "chat") {
    block(24, 75, 310, 66, palette.soft, 22);
    block(157, 160, 330, 66, palette.green, 22);
    block(24, 245, 265, 66, palette.soft, 22);
    for (let i = 0; i < 3; i++) block(58 + i * 32, 272, 14, 14, palette.coral, 7);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function Objects({ palette }: { palette: Palette }) {
  const root = useRef<Group>(null);
  const progress = useRef(0);
  const target = useRef(0);
  const { invalidate, size, gl } = useThree();
  const textures = useMemo(() => kinds.map((kind) => makeSurface(kind, palette)), [palette]);
  useEffect(() => () => textures.forEach((texture) => texture.dispose()), [textures]);
  useEffect(() => {
    let distance = 1;
    const measure = () => {
      distance = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      update();
    };
    const update = () => {
      target.current = Math.max(0, Math.min(1, window.scrollY / distance));
      invalidate();
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
    const dt = Math.min(rawDelta, 0.05);
    const next = target.current;
    progress.current += (next - progress.current) * (1 - Math.exp(-18 * dt));
    const t = progress.current;
    const scale = size.width < 640 ? 0.48 : 0.8;
    const halfWidth = size.width / 100;
    const halfHeight = size.height / 100;
    root.current?.children.forEach((object, i) => {
      // Both sculptures travel left to right, once over the full page.
      const journey = i === 0 ? t : 0.12 + t * 0.76;
      const range = Math.max(0, halfWidth - scale * 1.65);
      const y = i === 0 ? halfHeight - scale * 1.5 : -halfHeight + 2.4;
      object.position.set(-range + 2 * range * journey, y, 0);
      object.rotation.set(-0.16, -0.45 + journey * 0.7, (i === 0 ? -1 : 1) * 0.07);
      object.scale.setScalar(scale);
    });
    gl.domElement.parentElement?.setAttribute("data-scene-ready", "true");
    gl.domElement.dataset.scrollProgress = t.toFixed(4);
    gl.domElement.dataset.modelPositions = JSON.stringify(root.current?.children.map((object) => ({ x: object.position.x, y: object.position.y })) ?? []);
    if (Math.abs(next - t) > 0.0002) invalidate();
  });
  return <>
    <OrthographicCamera makeDefault position={[0, 0, 16]} zoom={50} near={0.1} far={50} />
    <group ref={root}>
    {kinds.map((kind, i) => <group key={kind} name={kind}>
      <RoundedBox args={[2.45, 1.86, 0.48]} radius={0.12} smoothness={2}>
        <meshStandardMaterial color={i === 1 ? palette.coral : palette.green} roughness={0.48} metalness={0} />
      </RoundedBox>
      <mesh position={[0, 0, 0.246]}>
        <planeGeometry args={[2.28, 1.7]} />
        <meshStandardMaterial map={textures[i]} roughness={0.65} />
      </mesh>
      {kind === "chat" ? <mesh position={[-0.7, -0.98, 0]} rotation-z={Math.PI}>
        <coneGeometry args={[0.19, 0.32, 3]} />
        <meshStandardMaterial color={palette.coral} roughness={0.8} />
      </mesh> : <>
        <RoundedBox args={[0.3, 0.35, 0.3]} radius={0.04} smoothness={2} position={[0, -1.04, -0.08]}>
          <meshStandardMaterial color={palette.green} roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[1.1, 0.12, 0.65]} radius={0.05} smoothness={2} position={[0, -1.25, 0]}>
          <meshStandardMaterial color={palette.green} roughness={0.5} />
        </RoundedBox>
      </>}
    </group>)}
  </group></>;
}

export default function StudioObjects({ palette }: { palette: Palette }) {
  return <Canvas frameloop="demand" dpr={1} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}>
    <ambientLight intensity={1.1} />
    <directionalLight position={[3, 5, 6]} intensity={2.2} />
    <Environment resolution={32}>
      <Lightformer intensity={2} position={[0, 4, 3]} scale={[10, 6, 1]} />
      <Lightformer color={palette.soft} intensity={1} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[5, 5, 1]} />
    </Environment>
    <Objects palette={palette} />
  </Canvas>;
}