import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, OrthographicCamera } from "@react-three/drei";
import { CanvasTexture, Group, SRGBColorSpace } from "three";

type Palette = { paper: string; green: string; coral: string; ink: string; soft: string };
const kinds = ["website", "chat", "code", "analytics", "workflow", "commerce", "booking", "forms", "connections"];

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
  } else if (kind === "booking") {
    ctx.font = "bold 26px sans-serif"; ctx.fillStyle = palette.ink; ctx.fillText("Your bookings", 28, 90);
    for (let i = 0; i < 21; i++) block(28 + (i % 7) * 66, 120 + Math.floor(i / 7) * 65, 50, 48, i === 10 ? palette.coral : palette.soft, 7);
  } else if (kind === "forms") {
    ctx.font = "bold 26px sans-serif"; ctx.fillStyle = palette.ink; ctx.fillText("Let’s talk", 28, 90);
    for (let i = 0; i < 3; i++) block(28, 120 + i * 55, 452, 38, palette.soft, 6);
    block(28, 300, 160, 40, palette.green, 6);
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
    const scale = size.width < 640 ? 0.25 : size.width < 1100 ? 0.38 : 0.68;
    const halfWidth = size.width / 100;
    const halfHeight = size.height / 100;
    root.current?.children.forEach((object, i) => {
      // Staggered journeys across the entire page: only two or three are on screen.
      const journey = t * 5.4 - i * 0.57 + 0.45;
      object.visible = journey >= -0.15 && journey <= 1.15;
      const side = i % 2 ? 1 : -1;
      // Keep models in the outer gutters, clear of text and controls.
      const edge = size.width < 1100 ? scale * 0.35 : scale * 1.35;
      object.position.set(side * (halfWidth - edge), halfHeight * (1 - journey * 2), 0);
      object.rotation.set(0.12, side * (0.28 + journey * 0.35), side * (journey - 0.5) * 0.14);
      object.scale.setScalar(scale);
    });
    gl.domElement.parentElement?.setAttribute("data-scene-ready", "true");
    gl.domElement.dataset.scrollProgress = t.toFixed(4);
    if (Math.abs(next - t) > 0.0002) invalidate();
  });
  return <>
    <OrthographicCamera makeDefault position={[0, 0, 16]} zoom={50} near={0.1} far={50} />
    <group ref={root}>
    {kinds.map((kind, i) => <group key={kind} name={kind}>
      <RoundedBox args={[2.45, 1.86, kind === "code" ? 0.42 : 0.2]} radius={0.1} smoothness={2}>
        <meshStandardMaterial color={i % 3 === 1 ? palette.coral : palette.green} roughness={0.7} metalness={0} />
      </RoundedBox>
      <mesh position={[0, 0, kind === "code" ? 0.216 : 0.106]}>
        <planeGeometry args={[2.28, 1.7]} />
        <meshStandardMaterial map={textures[i]} roughness={0.65} />
      </mesh>
      {kind === "chat" || kind === "forms" ? <mesh position={[-0.7, -0.94, 0]} rotation-z={Math.PI}>
        <coneGeometry args={[0.19, 0.32, 3]} />
        <meshStandardMaterial color={palette.coral} roughness={0.8} />
      </mesh> : <RoundedBox args={[0.62, 0.14, 0.38]} radius={0.06} smoothness={2} position={[0.7, -0.98, 0.07]}>
        <meshStandardMaterial color={palette.coral} roughness={0.8} />
      </RoundedBox>}
      {kind === "connections" && <mesh position={[1.15, 0, 0.1]} rotation-y={Math.PI / 2}>
        <torusGeometry args={[0.29, 0.075, 8, 20]} />
        <meshStandardMaterial color={palette.green} roughness={0.8} />
      </mesh>}
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