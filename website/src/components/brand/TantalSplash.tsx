"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./TantalSplash.module.css";

const CONFIG = {
  SHOW_GUI: false,
  MASTER_COLOR: "#e6e6fa",
  MODE: 4,
  CONTINUOUS: true,
  MAX_FIREFLIES: 50,
  SIZE_MIN: 0.2,
  SIZE_MAX: 0.8,
  GLOW_BLUR: 4,
  SPEED_BASE: 0.3,
  ACCEL_OUT: 1.5,
  ACCEL_IN: 0.5,
  DURATION_MIN: 4500,
  DURATION_MAX: 9500,
  ORBIT_DIST_MIN: 0,
  ORBIT_DIST_MAX: 15,
  ARC_AMPLITUDE: 27,
};

type Point = { x: number; y: number };

type Firefly = {
  P0: Point;
  P1: Point;
  P2: Point;
  t: number;
  duration: number;
  size: number;
};

export function TantalSplash() {
  const tantalRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const tantal = tantalRef.current;
    const canvas = canvasRef.current;
    if (!tantal || !canvas) return;

    document.documentElement.style.setProperty(
      "--master-color",
      CONFIG.MASTER_COLOR,
    );

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rect = tantal.getBoundingClientRect();
    let GLOW_COLOR = CONFIG.MASTER_COLOR;
    const FIREFLIES: Firefly[] = [];
    let raf = 0;
    let lastTime = performance.now();
    let alive = true;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
    }

    function updateRect() {
      rect = tantal!.getBoundingClientRect();
    }

    function getWordPoint(): Point {
      const margin = 2;
      return {
        x: rect.left + margin + Math.random() * (rect.width - 2 * margin),
        y: rect.top + margin + Math.random() * (rect.height - 2 * margin),
      };
    }

    function getOrbitPoint(): Point {
      const minD = Math.min(CONFIG.ORBIT_DIST_MIN, CONFIG.ORBIT_DIST_MAX);
      const maxD = Math.max(CONFIG.ORBIT_DIST_MIN, CONFIG.ORBIT_DIST_MAX);
      const perimeter = (rect.width + rect.height) * 2;
      const p = Math.random() * perimeter;
      let baseX: number;
      let baseY: number;

      if (p < rect.width) {
        baseX = rect.left + p;
        baseY = rect.top;
      } else if (p < rect.width + rect.height) {
        baseX = rect.right;
        baseY = rect.top + (p - rect.width);
      } else if (p < rect.width * 2 + rect.height) {
        baseX = rect.right - (p - rect.width - rect.height);
        baseY = rect.bottom;
      } else {
        baseX = rect.left;
        baseY = rect.bottom - (p - rect.width * 2 - rect.height);
      }

      const angle = Math.random() * Math.PI * 2;
      const dist = minD + Math.random() * (maxD - minD);
      return {
        x: baseX + Math.cos(angle) * dist,
        y: baseY + Math.sin(angle) * dist,
      };
    }

    function generateTrajectory(
      startPoint: Point | null = null,
    ): { P0: Point; P1: Point; P2: Point } | null {
      updateRect();
      if (rect.width === 0 || rect.height === 0) return null;

      let P0: Point;
      let P2: Point;

      if (startPoint) {
        P0 = startPoint;
        if (CONFIG.MODE === 1 || CONFIG.MODE === 3) P2 = getWordPoint();
        else P2 = getOrbitPoint();
      } else if (CONFIG.MODE === 1) {
        P0 = getWordPoint();
        P2 = getWordPoint();
      } else if (CONFIG.MODE === 2) {
        P0 = getWordPoint();
        P2 = getOrbitPoint();
      } else if (CONFIG.MODE === 3) {
        P0 = getOrbitPoint();
        P2 = getWordPoint();
      } else {
        P0 = getOrbitPoint();
        P2 = getOrbitPoint();
      }

      const M = { x: (P0.x + P2.x) / 2, y: (P0.y + P2.y) / 2 };
      const randomAngle = Math.random() * Math.PI * 2;
      const offsetDist = (0.2 + Math.random() * 0.8) * CONFIG.ARC_AMPLITUDE;
      const P1 = {
        x: M.x + Math.cos(randomAngle) * offsetDist,
        y: M.y + Math.sin(randomAngle) * offsetDist,
      };
      return { P0, P1, P2 };
    }

    function createFirefly(startPoint: Point | null = null): Firefly | null {
      const traj = generateTrajectory(startPoint);
      if (!traj) return null;
      return {
        ...traj,
        t: startPoint ? 0 : Math.random(),
        duration:
          CONFIG.DURATION_MIN +
          Math.random() * (CONFIG.DURATION_MAX - CONFIG.DURATION_MIN),
        size:
          CONFIG.SIZE_MIN +
          Math.random() * (CONFIG.SIZE_MAX - CONFIG.SIZE_MIN),
      };
    }

    function updateFireflies(deltaMs: number) {
      while (FIREFLIES.length < CONFIG.MAX_FIREFLIES) {
        const ff = createFirefly();
        if (ff) FIREFLIES.push(ff);
        else break;
      }
      if (FIREFLIES.length > CONFIG.MAX_FIREFLIES) {
        FIREFLIES.splice(CONFIG.MAX_FIREFLIES);
      }

      for (const ff of FIREFLIES) {
        const transitionFactor = (1 - Math.cos(ff.t * Math.PI)) / 2;
        const currentAccel =
          CONFIG.ACCEL_OUT * (1 - transitionFactor) +
          CONFIG.ACCEL_IN * transitionFactor;
        const speedMultiplier = CONFIG.SPEED_BASE * currentAccel;
        ff.t += (deltaMs / ff.duration) * speedMultiplier;

        if (ff.t > 1) {
          if (CONFIG.CONTINUOUS) {
            const nextTraj = generateTrajectory(ff.P2);
            if (nextTraj) {
              ff.P0 = nextTraj.P0;
              ff.P1 = nextTraj.P1;
              ff.P2 = nextTraj.P2;
              ff.t = 0;
            }
          } else {
            const newTraj = generateTrajectory();
            if (newTraj) {
              ff.P0 = newTraj.P0;
              ff.P1 = newTraj.P1;
              ff.P2 = newTraj.P2;
              ff.t = 0;
              ff.duration =
                CONFIG.DURATION_MIN +
                Math.random() * (CONFIG.DURATION_MAX - CONFIG.DURATION_MIN);
              ff.size =
                CONFIG.SIZE_MIN +
                Math.random() * (CONFIG.SIZE_MAX - CONFIG.SIZE_MIN);
            }
          }
        }
      }
    }

    function drawFireflies() {
      ctx!.clearRect(0, 0, width, height);
      for (const ff of FIREFLIES) {
        const t = ff.t;
        const u = 1 - t;
        const x =
          u * u * ff.P0.x + 2 * u * t * ff.P1.x + t * t * ff.P2.x;
        const y =
          u * u * ff.P0.y + 2 * u * t * ff.P1.y + t * t * ff.P2.y;

        let alpha: number;
        let currentSize: number;
        if (CONFIG.CONTINUOUS) {
          alpha = 0.8;
          currentSize = ff.size;
        } else {
          const sinVal = Math.sin(t * Math.PI);
          alpha = 0.4 + 0.4 * sinVal;
          const sizeFactor = 0.6 + 0.4 * sinVal;
          currentSize = ff.size * sizeFactor;
        }

        ctx!.save();
        ctx!.globalAlpha = alpha;
        ctx!.shadowColor = GLOW_COLOR;
        ctx!.shadowBlur = CONFIG.GLOW_BLUR;
        ctx!.fillStyle = GLOW_COLOR;
        ctx!.beginPath();
        ctx!.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }

    function animate(time: number) {
      if (!alive) return;
      const delta = time - lastTime;
      lastTime = time;
      updateFireflies(delta);
      drawFireflies();
      raf = requestAnimationFrame(animate);
    }

    resize();
    updateRect();
    window.addEventListener("resize", resize);
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);
    raf = requestAnimationFrame(animate);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden />

      <div className={styles.card}>
        <div className={styles.titleWrapper}>
          <div className={styles.titleInner}>
            <span className={styles.mainLine}>BLACK DRAGON</span>
            <div className={styles.fireLine} />
            <span className={styles.secondLine}>
              Project <span ref={tantalRef} className={styles.tantal}>
                Midas
              </span>
            </span>
          </div>
        </div>
      </div>

      <Link href="/dashboard" className={styles.enter}>
        Enter terminal →
      </Link>
    </div>
  );
}
