'use client';

import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  MotionValue,
} from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Circle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n/context';
import profileCutout from '../../../public/images/profile-cutout-transparent.png';

/* ─── Tech floating labels ─────────────────────────────────────────── */

interface TechLabel {
  label: string;
  /** Desktop position classes (absolute) */
  position: string;
  /** Parallax speed factor: higher = faster */
  speed: number;
  /** Direction of Y drift on scroll: -1 = up, 1 = down */
  direction: -1 | 1;
}

const techLabels: TechLabel[] = [
  { label: 'React', position: 'left-[3%] top-[22%] lg:left-[5%]', speed: 0.7, direction: -1 },
  { label: 'TypeScript', position: 'right-[5%] top-[14%] lg:right-[9%]', speed: 0.5, direction: 1 },
  { label: 'FastAPI', position: 'left-[6%] bottom-[22%] lg:left-[11%]', speed: 0.6, direction: -1 },
  { label: 'PostgreSQL', position: 'right-[4%] bottom-[20%] lg:right-[3%]', speed: 0.55, direction: 1 },
  { label: 'AI', position: 'right-[15%] top-[38%] lg:right-[6%] lg:top-[44%]', speed: 0.45, direction: -1 },
];

const architecture = ['React / TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'];

/* ─── Component ────────────────────────────────────────────────────── */

export function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mobileTabletHeroScale, setMobileTabletHeroScale] = useState(1);
  const mobileTabletHeroScaleRef = useRef(1);
  const previousScrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    check();
    window.addEventListener('resize', check, { passive: true });

    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isMobile && !isTablet) {
      return undefined;
    }

    const minScale = isMobile ? 0.97 : 0.965;
    const maxScale = 1;

    const onScroll = () => {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || window.pageYOffset || 0;
        const deltaY = currentScrollY - previousScrollYRef.current;

        if (Math.abs(deltaY) > 0) {
          const distance = Math.min(Math.abs(deltaY) / Math.max(window.innerHeight, 1), 0.065);
          const step = isMobile ? Math.min(distance * 0.03, 0.012) : Math.min(distance * 0.035, 0.014);
          const direction = deltaY > 0 ? -1 : 1;
          const nextScale = Math.min(Math.max(mobileTabletHeroScaleRef.current + direction * step, minScale), maxScale);

          mobileTabletHeroScaleRef.current = nextScale;
          setMobileTabletHeroScale(nextScale);
        }

        previousScrollYRef.current = currentScrollY;
        rafRef.current = null;
      });
    };

    previousScrollYRef.current = window.scrollY || window.pageYOffset || 0;
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, isTablet]);

  /* ── Scroll progress ──────────────────────────────────────────────── */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [portraitFadeState, setPortraitFadeState] = useState(1);
  const [portraitBlurState, setPortraitBlurState] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (shouldReduceMotion) {
      setPortraitFadeState(1);
      setPortraitBlurState(0);
      return;
    }

    if (isMobile || isTablet) {
      setPortraitFadeState(1);
      setPortraitBlurState(0);
      return;
    }

    if (latest <= 0.12) {
      setPortraitFadeState(1);
      setPortraitBlurState(0);
      return;
    }

    const fadeProgress = Math.min((latest - 0.12) / 0.68, 1);
    setPortraitFadeState(1 - fadeProgress * 0.82);
    setPortraitBlurState(fadeProgress * 6);
  });

  /* ── Mouse parallax (desktop only) ────────────────────────────────── */

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 22 });

  // Layer mouse offsets: background 1×, labels 2×, portrait 3×
  const bgMouseX = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);
  const bgMouseY = useTransform(smoothY, [-0.5, 0.5], [-2, 2]);
  const labelMouseX = useTransform(smoothX, [-0.5, 0.5], [-4, 4]);
  const portraitMouseX = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);

  // Portrait 3D rotation from mouse
  const portraitRotateY = useTransform(smoothX, [-0.5, 0.5], [3.5, -3.5]);

  /* ── L1: Background ───────────────────────────────────────────────── */

  const bgScrollY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  /* ── L2: Tech labels ──────────────────────────────────────────────── */

  // Phase 1→3: opacity ramps from subtle to full, then fades phase 4→5
  const labelOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.55, 0.78], [0.65, 0.75, 1, 1, 0.12]);
  // Dynamic blur: reduced for visibility (sharper)
  const labelBlur = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.55, 0.78, 1], [0.5, 0.2, 0, 0, 0.5, 1]);

  /* ── L3: Portrait ─────────────────────────────────────────────────── */

  // Keep the portrait fully visible at the top of the section; only start fading once the user is meaningfully scrolling down.
  const portraitY = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.55, 0.78], [0, 0, -18, -28, -70]);
  const portraitScale = useTransform(scrollYProgress, [0, 0.35, 0.55, 0.78], [1, 1, 1.03, 0.88]);
  // Subtle scroll-driven rotateX (not mouse — adds to scroll depth)
  const portraitScrollRotateX = useTransform(scrollYProgress, [0, 0.35, 0.55], [0, 0, 1.5]);

  const activePortraitOpacity = shouldReduceMotion ? 1 : portraitFadeState;
  const activePortraitFilter = shouldReduceMotion ? 'none' : `blur(${portraitBlurState}px)`;

  /* ── L4: Foreground UI ────────────────────────────────────────────── */

  const architectureOpacity = useTransform(scrollYProgress, [0.55, 0.72, 1], [0, 1, 1]);
  const architectureY = useTransform(scrollYProgress, [0.55, 0.78, 1], [36, 0, -16]);
  const workTeaserOpacity = useTransform(scrollYProgress, [0.78, 0.94], [0, 1]);

  /* ── L5: Hero text ────────────────────────────────────────────────── */

  const textY = useTransform(scrollYProgress, [0, 0.55, 0.78], [0, 0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55, 0.78, 0.95], [1, 1, 0.4, 0.1]);

  /* ── Content overall ──────────────────────────────────────────────── */

  const contentX = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -16]);

  /* ── Portrait mask ────────────────────────────────────────────────── */

  const portraitMaskStyle = {
    maskImage:
      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.92) 78%, rgba(0,0,0,0.3) 100%), linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 3%, rgba(0,0,0,1) 97%, rgba(0,0,0,0.15) 100%)',
    WebkitMaskImage:
      'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.92) 78%, rgba(0,0,0,0.3) 100%), linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 3%, rgba(0,0,0,1) 97%, rgba(0,0,0,0.15) 100%)',
  } as const;

  /* ── Pointer handler ──────────────────────────────────────────────── */

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (shouldReduceMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetPointerState() {
    pointerX.set(0);
    pointerY.set(0);
  }

  /* ── Helpers ──────────────────────────────────────────────────────── */

  const noMotion = shouldReduceMotion;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerState}
      onPointerCancel={resetPointerState}
      className="hero-shell relative h-[140svh] min-h-[720px] overflow-visible md:overflow-clip md:h-[140svh]"
    >
      <div className="sticky top-0 flex min-h-svh items-center overflow-visible md:overflow-hidden">

        {/* ════════════════════════════════════════════════════════════
            LAYER 1 — Background grid + radial glows (slowest parallax)
            ════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            y: noMotion ? 0 : bgScrollY,
            x: noMotion ? 0 : bgMouseX,
            scale: noMotion ? 1 : gridScale,
          }}
          className="hero-grid absolute inset-[-12%] -z-20"
        />
        <motion.div
          style={{
            y: noMotion ? 0 : bgScrollY,
            x: noMotion ? 0 : bgMouseY,
            opacity: noMotion ? 1 : 0.9,
          }}
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_68%_38%,rgba(116,169,255,0.18),transparent_22%),radial-gradient(circle_at_26%_62%,rgba(84,110,180,0.13),transparent_30%)]"
        />
        {/* Bottom fade gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/70 to-transparent" />

        {/* ════════════════════════════════════════════════════════════
            LAYER 2 — Tech floating labels (individual parallax rates)
            Hidden on mobile; shown md+ only
            ════════════════════════════════════════════════════════════ */}
        {techLabels.map((tech) => {
          const yRange = tech.speed * 55 * tech.direction;
          return (
            <TechFloatingLabel
              key={tech.label}
              label={tech.label}
              position={tech.position}
              scrollYProgress={scrollYProgress}
              yRange={yRange}
              labelOpacity={labelOpacity}
              labelBlur={labelBlur}
              mouseX={labelMouseX}
              noMotion={!!noMotion}
              isMobile={isMobile}
            />
          );
        })}

        {/* ════════════════════════════════════════════════════════════
            LAYER 3 (Portrait) + LAYER 5 (Text) — Main content grid
            ════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{ x: noMotion ? 0 : contentX, y: noMotion ? 0 : contentY }}
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-20 sm:px-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-4 lg:px-12"
        >
          {/* ── LAYER 5 — Hero text ─────────────────────────────────── */}
          <motion.div
            style={{ y: noMotion ? 0 : textY, opacity: noMotion ? 1 : textOpacity }}
            className="relative z-40 w-full max-w-[560px] min-h-[420px] lg:min-h-[470px]"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-6 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.2em] text-accent uppercase"
            >
              <span className="h-px w-8 bg-accent/80" /> {t.hero.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="max-w-3xl text-balance text-[clamp(2.85rem,6.2vw,6.15rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-foreground"
            >
              {t.hero.title1}<span className="text-white/45">{t.hero.titleAccent}</span>
            </motion.h1>

            {/* Positioning + description */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-8 max-w-xl"
            >
              <p className="font-mono text-xs tracking-[0.13em] text-accent uppercase">{t.hero.positioning}</p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{t.hero.description}</p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#projects" className="button-primary">
                {t.hero.viewWork} <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a href="#contact" className="button-secondary">
                {t.hero.letsWork} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </motion.div>

            {/* Availability */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="mt-8 flex items-center gap-2.5 text-xs text-muted-foreground"
            >
              <Circle size={8} className="fill-emerald-400 text-emerald-400" aria-hidden="true" />
              {t.hero.available}
            </motion.p>
          </motion.div>

          {/* ── LAYER 3 — Portrait with 3D depth ───────────────────── */}
          <div className="hero-portrait-stage relative mx-auto h-[min(62svh,650px)] w-full max-w-[530px] lg:ml-auto lg:h-[min(72svh,750px)]">
            <motion.div
              style={{
                x: noMotion || isMobile ? 0 : portraitMouseX,
                y: noMotion ? 0 : portraitY,
                scale: noMotion ? 1 : (isMobile || isTablet ? mobileTabletHeroScale : portraitScale),
                rotateY: noMotion || isMobile ? 0 : portraitRotateY,
                rotateX: noMotion || isMobile ? 0 : portraitScrollRotateX,
                transformPerspective: noMotion || isMobile ? 'none' : 1200,
              }}
              className="absolute inset-x-3 bottom-0 z-20 origin-bottom [transform-style:preserve-3d] sm:inset-x-7"
            >
              <motion.div
                style={{
                  opacity: activePortraitOpacity,
                  filter: activePortraitFilter,
                }}
                className="relative flex items-end justify-center overflow-visible drop-shadow-[0_35px_90px_rgba(0,0,0,0.62)]"
              >
                <div style={portraitMaskStyle} className="hero-portrait-frame relative z-10">
                  <Image
                    src={profileCutout}
                    alt="Emiliano Dongoche, Software Engineer"
                    priority
                    unoptimized
                    quality={100}
                    sizes="(max-width: 1023px) 82vw, 38vw"
                    className="hero-portrait-image h-auto max-h-[620px] w-full max-w-[390px] object-contain object-bottom sm:max-h-[680px] lg:max-h-[720px]"
                  />
                </div>
              </motion.div>

              {/* Username badge on portrait */}
              <div className="absolute bottom-5 left-5 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white/80 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> emiliano.dongoche
              </div>
            </motion.div>

            {/* Decorative shapes behind portrait */}
            <motion.div
              style={{ y: noMotion ? 0 : bgScrollY, opacity: noMotion ? 1 : 0.9 }}
              className="absolute bottom-0 right-0 h-[74%] w-[74%] rounded-[7rem] border border-accent/20 bg-accent/[0.035] shadow-[0_0_80px_rgba(116,169,255,0.08)]"
            />
            <motion.div
              style={{ y: noMotion ? 0 : bgScrollY, opacity: noMotion ? 1 : 0.6 }}
              className="absolute right-[2%] top-[16%] h-24 w-24 rounded-full border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
            />
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            Mobile tech labels — horizontal row below content (md: hidden)
            ════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-x-5 bottom-28 z-20 flex flex-wrap justify-center gap-2 sm:inset-x-8 md:hidden">
          {techLabels.map((tech) => (
            <span
              key={tech.label}
              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 font-mono text-[9px] tracking-[0.14em] text-white/50 backdrop-blur-sm"
            >
              {tech.label}
            </span>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════
            LAYER 4 — Foreground UI: Architecture card
            ════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: noMotion ? 1 : architectureOpacity,
            y: noMotion ? 0 : architectureY,
          }}
          className="absolute inset-x-5 bottom-10 z-30 mx-auto max-w-5xl sm:inset-x-8 lg:bottom-12"
        >
          <div className="ml-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#0d1018]/80 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
            <p className="mb-3 font-mono text-[10px] tracking-[0.17em] text-muted-foreground uppercase">
              {t.hero.architectureLabel}
            </p>
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-1">
              {architecture.map((item, index) => (
                <div key={item} className="flex min-w-0 items-center gap-1 font-mono text-[10px] text-white/80 sm:gap-2 sm:text-xs">
                  <span className="truncate">{item}</span>
                  {index < architecture.length - 1 && (
                    <>
                      <ArrowDown size={12} className="text-accent/65 sm:hidden" aria-hidden="true" />
                      <span className="hidden text-accent/80 sm:inline" aria-hidden="true">↓</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════
            LAYER 4 — Next project teaser
            ════════════════════════════════════════════════════════════ */}
        <motion.p
          style={{ opacity: noMotion ? 1 : workTeaserOpacity }}
          className="pointer-events-none absolute bottom-3 left-5 z-30 font-mono text-[10px] tracking-[0.18em] text-white/40 uppercase sm:left-8 lg:left-12"
        >
          {t.hero.nextProject}
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Tech Floating Label sub-component ────────────────────────────── */

interface TechFloatingLabelProps {
  label: string;
  position: string;
  scrollYProgress: MotionValue<number>;
  yRange: number;
  labelOpacity: MotionValue<number>;
  labelBlur: MotionValue<number>;
  mouseX: MotionValue<number>;
  noMotion: boolean;
  isMobile: boolean;
}

function TechFloatingLabel({
  label,
  position,
  scrollYProgress,
  yRange,
  labelOpacity,
  labelBlur,
  mouseX,
  noMotion,
  isMobile,
}: TechFloatingLabelProps) {
  const y = useTransform(scrollYProgress, [0, 1], [0, yRange]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, yRange * 0.08]);
  const filter = useMotionTemplate`blur(${labelBlur}px)`;

  if (isMobile) return null;

  return (
    <motion.span
      style={{
        y: noMotion ? 0 : y,
        x: noMotion ? 0 : mouseX,
        rotate: noMotion ? 0 : rotate,
        opacity: noMotion ? 0.85 : labelOpacity,
        filter: noMotion ? 'none' : filter,
      }}
      whileHover={noMotion ? undefined : { scale: 1.15, rotate: 0, zIndex: 50, opacity: 1, filter: 'blur(0px)' }}
      transition={noMotion ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 20 }}
      className={`hero-tech-label hidden md:flex items-center justify-center cursor-default ${position}`}
    >
      {label}
    </motion.span>
  );
}
