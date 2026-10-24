import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { CanvasTexture, Group, SRGBColorSpace } from "three";

type Palette = { paper: string; green: string; coral: string; ink: string; soft: string };
const kinds = ["website", "chat", "code", "analytics", "workflow", "commerce"];

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
  if (kind === "website" || kind === "commerce") {
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
  } else if (kind === "code") {
    ctx.font = "bold 38px monospace"; ctx.fillStyle = palette.green; ctx.fillText("</>", 25, 110);
    for (let i = 0; i < 7; i++) block(32 + (i % 3) * 22, 140 + i * 28, 160 + (i % 3) * 70, 12, i % 2 ? palette.coral : palette.green);
  } else if (kind === "analytics") {
    for (let i = 0; i < 5; i++) { const h = 65 + i * 36; block(44 + i * 85, 321 - h, 54, h, i % 2 ? palette.coral : palette.green); }
    block(30, 340, 450, 5, palette.soft);
  } else {
    ctx.strokeStyle = palette.green; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(105, 125); ctx.lineTo(255, 125); ctx.lineTo(255, 268); ctx.lineTo(412, 268); ctx.stroke();
    [[65, 90], [215, 90], [215, 230], [370, 230]].forEach(([x, y], i) => block(x, y, 78, 78, i % 2 ? palette.coral : palette.green, 20));
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function Objects({ palette, host }: { palette: Palette; host: React.RefObject<HTMLDivElement> }) {
  const root = useRef<Group>(null);
  const progress = useRef(0);
  const target = useRef(0);
  const reduced = useRef(false);
  const { invalidate, size } = useThree();
  const textures = useMemo(() => kinds.map((kind) => makeSurface(kind, palette)), [palette]);
  useEffect(() => () => textures.forEach((texture) => texture.dispose()), [textures]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduced.current = preference.matches;
      const rect = host.current?.getBoundingClientRect();
      if (rect) target.current = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - rect.top) / (rect.height + window.innerHeight * 0.2)));
      invalidate();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    preference.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      preference.removeEventListener("change", update);
    };
  }, [host, invalidate]);
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const next = reduced.current ? 0.45 : target.current;
    progress.current += (next - progress.current) * (1 - Math.exp(-9 * dt));
    const t = progress.current;
    const mobile = size.width < 640;
    root.current?.children.forEach((object, i) => {
      const columns = mobile ? 2 : 3;
      const x = (i % columns - (columns - 1) / 2) * (mobile ? 2.4 : 3.1);
      const y = ((mobile ? 1 : 0.5) - Math.floor(i / columns)) * (mobile ? 1.92 : 2.35);
      object.position.set(x + Math.sin(t * Math.PI * 2 + i) * 0.18, y + Math.sin(t * Math.PI + i) * 0.25, Math.sin(t * Math.PI + i) * 0.25);
      object.rotation.set((t - 0.5) * 0.35 + (i % 2 ? -0.08 : 0.08), (t - 0.5) * 0.8 + (i % 2 ? -0.18 : 0.18), Math.sin(t * Math.PI * 2 + i) * 0.09);
      object.scale.setScalar(mobile ? 0.72 : 0.95);
    });
    if (Math.abs(next - t) > 0.0002) invalidate();
  });
  return <group ref={root}>
    {kinds.map((kind, i) => <group key={kind}>
      <RoundedBox args={[2.45, 1.86, 0.2]} radius={0.12} smoothness={3}>
        <meshStandardMaterial color={i % 3 === 1 ? palette.coral : palette.green} roughness={0.38} metalness={0.05} />
      </RoundedBox>
      <mesh position={[0, 0, 0.106]}>
        <planeGeometry args={[2.28, 1.7]} />
        <meshStandardMaterial map={textures[i]} roughness={0.65} />
      </mesh>
      <RoundedBox args={[0.62, 0.14, 0.38]} radius={0.06} smoothness={2} position={[0.7, -0.98, 0.07]}>
        <meshStandardMaterial color={palette.coral} roughness={0.5} />
      </RoundedBox>
    </group>)}
  </group>;
}

export default function StudioObjects({ palette, host }: { palette: Palette; host: React.RefObject<HTMLDivElement> }) {
  return <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 11], fov: 40 }} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.1} />
    <directionalLight position={[3, 5, 6]} intensity={2.2} />
    <Environment resolution={64}>
      <Lightformer intensity={2} position={[0, 4, 3]} scale={[10, 6, 1]} />
      <Lightformer color={palette.soft} intensity={1} position={[-4, 0, 1]} rotation-y={Math.PI / 2} scale={[5, 5, 1]} />
    </Environment>
    <Objects palette={palette} host={host} />
  </Canvas>;
}