"use client";

import { useColorMode } from "@/components/ui/color-mode";
import { MotionValue } from "framer-motion";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { NodeButtons } from "@/components/sections/NodeButtons";

// Interfaces
interface NeuronNode {
  id: number;
  theta: number;
  phi: number;
  x: number;
  y: number;
  z: number;
  rotatedX: number;
  rotatedY: number;
  rotatedZ: number;
  screenX: number;
  screenY: number;
  scale: number;
  alpha: number;
  angle: number;
  angularVelocity: number;
}

interface Galaxy {
  id: number;
  nodes: NeuronNode[];
  currentRadius: number;
  baseRotation: { x: number; y: number; z: number };
  rotationVelocity: { x: number; y: number; z: number };
}

interface ButtonPosition {
  x: number;
  y: number;
  alpha: number;
  scale: number;
}

// Animation Helper Functions
const updateGalaxies = (
  galaxies: Galaxy[],
  mouseRotation: { x: number; y: number },
  maxRadius: number,
  growthSpeed: number,
  canvasWidth: number,
  canvasHeight: number,
  FOCAL_LENGTH: number
) => {
  galaxies.forEach((galaxy) => {
    galaxy.currentRadius = (galaxy.currentRadius + growthSpeed) % maxRadius;
    galaxy.baseRotation.x += galaxy.rotationVelocity.x;
    galaxy.baseRotation.y += galaxy.rotationVelocity.y;
    galaxy.baseRotation.z += galaxy.rotationVelocity.z;

    const totalRotX = mouseRotation.x + galaxy.baseRotation.x;
    const totalRotY = mouseRotation.y + galaxy.baseRotation.y;
    const totalRotZ = galaxy.baseRotation.z;

    const cosX = Math.cos(totalRotX),
      sinX = Math.sin(totalRotX);
    const cosY = Math.cos(totalRotY),
      sinY = Math.sin(totalRotY);
    const cosZ = Math.cos(totalRotZ),
      sinZ = Math.sin(totalRotZ);

    const phase = galaxy.currentRadius / maxRadius;
    let overallAlpha = 0;
    if (phase < 0.7) {
      overallAlpha = 1;
    } else {
      overallAlpha = 1 - (phase - 0.7) / 0.3;
    }

    galaxy.nodes.forEach((node) => {
      const r = galaxy.currentRadius;
      node.x = r * Math.sin(node.theta) * Math.cos(node.phi);
      node.y = r * Math.sin(node.theta) * Math.sin(node.phi);
      node.z = r * Math.cos(node.theta);

      const x1 = node.x * cosZ - node.y * sinZ,
        y1 = node.x * sinZ + node.y * cosZ;
      const y2 = y1 * cosX - node.z * sinX,
        z2 = y1 * sinX + node.z * cosX;
      node.rotatedX = x1 * cosY - z2 * sinY;
      node.rotatedY = y2;
      node.rotatedZ = x1 * sinY + z2 * cosY;

      node.scale = FOCAL_LENGTH / (FOCAL_LENGTH + node.rotatedZ);
      node.screenX = canvasWidth / 2 + node.rotatedX * node.scale;
      node.screenY = canvasHeight / 2 + node.rotatedY * node.scale;
      node.alpha =
        Math.max(0, 1 - Math.abs(node.rotatedZ) / FOCAL_LENGTH) * overallAlpha;

      // Update angle
      node.angle += node.angularVelocity;
    });
  });
};

const drawFractalsLayer = (
  ctx: CanvasRenderingContext2D,
  galaxies: Galaxy[],
  MAX_CONNECT_DISTANCE_SQR: number,
  isForeground: boolean,
  isDark: boolean
) => {
  const baseHue = 140; // green base
  const hueRange = 50; // limit to green(120) -> yellow(60)
  const saturation = "51%";
  const lightness = isDark ? "45%" : "45%";

  galaxies.forEach((galaxy) => {
    const nodesToDraw = galaxy.nodes.filter((node) =>
      isForeground ? node.rotatedZ < 0 : node.rotatedZ >= 0
    );

    for (let i = 0; i < nodesToDraw.length; i++) {
      const p1 = nodesToDraw[i];
      if (p1.alpha <= 0) continue;

      for (let j = i + 1; j < nodesToDraw.length; j++) {
        const p2 = nodesToDraw[j];
        if (p2.alpha <= 0) continue;

        const distSqr =
          Math.pow(p1.rotatedX - p2.rotatedX, 2) +
          Math.pow(p1.rotatedY - p2.rotatedY, 2) +
          Math.pow(p1.rotatedZ - p2.rotatedZ, 2);
        if (distSqr < MAX_CONNECT_DISTANCE_SQR) {
          const opacity =
            (1 - distSqr / MAX_CONNECT_DISTANCE_SQR) * p1.alpha * p2.alpha;
          if (opacity > 0) {
            const hue1 = baseHue + (p1.phi / (2 * Math.PI)) * hueRange;
            const hue2 = baseHue + (p2.phi / (2 * Math.PI)) * hueRange;
            const grad = ctx.createLinearGradient(
              p1.screenX,
              p1.screenY,
              p2.screenX,
              p2.screenY
            );
            grad.addColorStop(
              0,
              `hsla(${hue1}, ${saturation}, ${lightness}, ${opacity * 0.8})`
            );
            grad.addColorStop(
              1,
              `hsla(${hue2}, ${saturation}, ${lightness}, ${opacity * 0.8})`
            );
            ctx.strokeStyle = grad;

            ctx.lineWidth = p1.scale * 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }
      }
    }
    nodesToDraw.forEach((node) => {
      if (node.alpha <= 0) return;
      const hue = baseHue + (node.phi / (2 * Math.PI)) * hueRange;
      ctx.fillStyle = `hsla(${hue}, ${saturation}, ${lightness}, ${node.alpha})`;

      ctx.save();
      ctx.translate(node.screenX, node.screenY);
      ctx.rotate(node.angle);

      ctx.beginPath();
      const size = node.scale * 1.5;
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.fill();

      ctx.restore();
    });
  });
};

interface FractalCanvasProps {
  mouse: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

const FractalCanvas = ({ mouse, containerRef }: FractalCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [buttonPositions, setButtonPositions] = useState<ButtonPosition[]>([]);
  const lastEmitMsRef = useRef(0);
  const lastEmittedPositionsRef = useRef<ButtonPosition[] | null>(null);
  const isPausedRef = useRef(false);
  const pausedIndexRef = useRef<number | null>(null);

  const galaxies = useMemo(() => {
    const newGalaxies: Galaxy[] = [];
    const maxRadius = 300;

    for (let i = 0; i < 3; i++) {
      const nodes: NeuronNode[] = [];
      const nodeCount = 100;
      for (let j = 0; j < nodeCount; j++) {
        nodes.push({
          id: j,
          theta: Math.acos(2 * Math.random() - 1),
          phi: Math.random() * 2 * Math.PI,
          x: 0,
          y: 0,
          z: 0,
          rotatedX: 0,
          rotatedY: 0,
          rotatedZ: 0,
          screenX: 0,
          screenY: 0,
          scale: 0,
          alpha: 0,
          angle: Math.random() * Math.PI * 2,
          angularVelocity: (Math.random() - 0.5) * 0.05,
        });
      }
      newGalaxies.push({
        id: i,
        nodes,
        currentRadius: i * (maxRadius / 3),
        baseRotation: {
          x: Math.random() * 2,
          y: Math.random() * 2,
          z: Math.random() * 2,
        },
        rotationVelocity: {
          x: (Math.random() - 0.5) * 0.002,
          y: (Math.random() - 0.5) * 0.002,
          z: (Math.random() - 0.5) * 0.002,
        },
      });
    }
    return newGalaxies;
  }, []);

  // 버튼 위치를 위한 노드 선택
  const selectedNodeIndices = useMemo(() => {
    const indices: number[] = [];
    const totalNodes = galaxies[0].nodes.length;
    const startOffset = Math.floor(totalNodes * 0.2); // 20% 오프셋으로 시작

    // 5개의 버튼을 위해 균등하게 분포된 인덱스 선택
    for (let i = 0; i < 5; i++) {
      indices.push(Math.floor(startOffset + (i * (totalNodes * 0.6)) / 5));
    }
    return indices;
  }, [galaxies]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let canvasWidth = 0,
      canvasHeight = 0;
    const FOCAL_LENGTH = 350;
    const MAX_CONNECT_DISTANCE_SQR = 100 * 100;
    const maxRadius = 300;
    const growthSpeed = 0.5;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvasWidth = rect.width;
      canvasHeight = rect.height;
      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(setCanvasSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    setCanvasSize();

    let mouseRotationX = 0;
    let mouseRotationY = 0;
    let mouseVelocity = { x: 0, y: 0 };
    let lastMousePosition = { x: 0.5, y: 0.5 };
    const dampingFactor = 0.95;

    const animate = () => {
      if (!canvasRef.current || !containerRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const mousePos = {
        x: mouse.x.get(),
        y: mouse.y.get(),
      };

      if (!isPausedRef.current) {
        mouseVelocity.x = mousePos.x - lastMousePosition.x;
        mouseVelocity.y = mousePos.y - lastMousePosition.y;
        lastMousePosition = { ...mousePos };

        mouseVelocity.x *= dampingFactor;
        mouseVelocity.y *= dampingFactor;

        const targetMouseRotX = mousePos.y - 0.5;
        const targetMouseRotY = mousePos.x - 0.5;

        mouseRotationX +=
          (targetMouseRotX - mouseRotationX) * 0.1 + mouseVelocity.y * 0.5;
        mouseRotationY +=
          (targetMouseRotY - mouseRotationY) * 0.1 + mouseVelocity.x * 0.5;
      }

      const mouseRotation = { x: mouseRotationX, y: mouseRotationY };

      if (!isPausedRef.current) {
        updateGalaxies(
          galaxies,
          mouseRotation,
          maxRadius,
          growthSpeed,
          canvasWidth,
          canvasHeight,
          FOCAL_LENGTH
        );
      }

      // 버튼 위치 업데이트 (throttle + diff check)
      const newButtonPositions = selectedNodeIndices.map((nodeIndex, i) => {
        const node = galaxies[0].nodes[nodeIndex];
        const isPausedThis =
          pausedIndexRef.current === i && isPausedRef.current;
        return {
          x: node.screenX,
          y: node.screenY,
          alpha: Math.pow(node.alpha, 0.7),
          scale: Math.max(0.8, Math.min(1.2, node.scale)),
        } as ButtonPosition;
      });

      const nowMs = performance.now();
      const elapsedMs = nowMs - lastEmitMsRef.current;
      const prev = lastEmittedPositionsRef.current;
      const POSITION_EPS = 0.75;
      const ALPHA_EPS = 0.02;
      const SCALE_EPS = 0.01;

      let hasMeaningfulChange = false;
      if (!prev || prev.length !== newButtonPositions.length) {
        hasMeaningfulChange = true;
      } else {
        for (let i = 0; i < newButtonPositions.length; i++) {
          const a = prev[i];
          const b = newButtonPositions[i];
          if (
            Math.abs(a.x - b.x) > POSITION_EPS ||
            Math.abs(a.y - b.y) > POSITION_EPS ||
            Math.abs(a.alpha - b.alpha) > ALPHA_EPS ||
            Math.abs(a.scale - b.scale) > SCALE_EPS
          ) {
            hasMeaningfulChange = true;
            break;
          }
        }
      }

      // emit at most ~15fps and only if changed; always emit immediately when paused state toggles to true
      if ((elapsedMs >= 66 && hasMeaningfulChange) || isPausedRef.current) {
        setButtonPositions(newButtonPositions);
        lastEmittedPositionsRef.current = newButtonPositions;
        lastEmitMsRef.current = nowMs;
      }

      drawFractalsLayer(ctx, galaxies, MAX_CONNECT_DISTANCE_SQR, false, isDark);
      drawFractalsLayer(ctx, galaxies, MAX_CONNECT_DISTANCE_SQR, true, isDark);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, [galaxies, isDark, mouse, containerRef, selectedNodeIndices]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          willChange: "transform",
        }}
      />
      <NodeButtons
        buttonPositions={buttonPositions}
        onHoverChange={(hovering, mappedIndex) => {
          isPausedRef.current = hovering;
          pausedIndexRef.current = hovering ? mappedIndex : null;
        }}
      />
    </>
  );
};

export default FractalCanvas;
