'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Shield, Server, Globe, Layout, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/i18n/context';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-80px' as const },
  transition: { duration: 0.5 },
};

const technologies = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['FastAPI', 'Python', 'SQLAlchemy'] },
  { category: 'Database', items: ['PostgreSQL', 'Supabase'] },
  { category: 'Deployment', items: ['Vercel', 'Render'] },
];

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield,
  Layout,
  Server,
  Globe,
};

export function CaseStudyContent() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const museumScreens = ['/images/museu/1.png', '/images/museu/2.png', '/images/museu/3.png', '/images/museu/4.png', '/images/museu/5.png'];

  // We extract the first featured project (Museum Management) to show its metrics
  const project = t.projectsSection.items.find(p => p.slug === 'museum-management');
  const nextProject = t.projectsSection.items.find(p => p.slug === 'casanova');

  const goToSlide = useCallback((nextIndex: number) => {
    setActiveImageIndex((nextIndex + museumScreens.length) % museumScreens.length);
  }, [museumScreens.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToSlide(activeImageIndex + 1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToSlide(activeImageIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, goToSlide]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const deltaY = event.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goToSlide(activeImageIndex + 1);
      } else {
        goToSlide(activeImageIndex - 1);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <motion.div {...fadeIn} className="mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            {t.caseStudy.back}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeIn}>
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {project?.category}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {project?.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {project?.subtitle}
          </p>
        </motion.div>

        {/* Metrics */}
        {project?.metrics && (
          <motion.div
            {...fadeIn}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border mb-16"
          >
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-2xl md:text-3xl font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Overview */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.overview}</h2>
          <p className="text-base text-muted leading-relaxed">
            {t.caseStudy.content.overview}
          </p>
        </motion.section>

        {/* The Challenge */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.challenge}</h2>
          <p className="text-base text-muted leading-relaxed mb-4">
            {t.caseStudy.content.challenge1}
          </p>
          <p className="text-base text-muted leading-relaxed">
            {t.caseStudy.content.challenge2}
          </p>
        </motion.section>

        {/* The Solution */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.solution}</h2>
          <p className="text-base text-muted leading-relaxed">
            {t.caseStudy.content.solution}
          </p>
        </motion.section>

        {/* Architecture */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.architecture}</h2>

          {/* Application Stack */}
          <div className="rounded-xl border border-border bg-card p-8 mb-6">
            <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              {t.caseStudy.appStack}
            </h3>
            <div className="flex flex-col items-center gap-3 font-mono text-sm">
              <div className="px-6 py-3 rounded-lg border border-accent/30 bg-accent/5 text-accent font-medium w-full max-w-xs text-center">
                React + TypeScript
              </div>
              <div className="text-muted-foreground">↓</div>
              <div className="px-6 py-3 rounded-lg border border-border bg-surface text-foreground w-full max-w-xs text-center">
                FastAPI
              </div>
              <div className="text-muted-foreground">↓</div>
              <div className="px-6 py-3 rounded-lg border border-border bg-surface text-foreground w-full max-w-xs text-center">
                SQLAlchemy
              </div>
              <div className="text-muted-foreground">↓</div>
              <div className="px-6 py-3 rounded-lg border border-border bg-surface text-foreground w-full max-w-xs text-center">
                PostgreSQL
              </div>
            </div>
          </div>

          {/* Deployment */}
          <div className="rounded-xl border border-border bg-card p-8">
            <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              {t.caseStudy.deployment}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
              <div className="px-4 py-3 rounded-lg border border-border bg-surface text-center">
                <p className="text-muted-foreground text-xs mb-1">Frontend</p>
                <p className="text-foreground font-medium">Vercel</p>
              </div>
              <div className="px-4 py-3 rounded-lg border border-border bg-surface text-center">
                <p className="text-muted-foreground text-xs mb-1">Backend</p>
                <p className="text-foreground font-medium">Render</p>
              </div>
              <div className="px-4 py-3 rounded-lg border border-border bg-surface text-center">
                <p className="text-muted-foreground text-xs mb-1">Database</p>
                <p className="text-foreground font-medium">Supabase</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* System Interface Carousel */}
        <motion.section {...fadeIn} className="mb-20">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
                {t.caseStudy.interfaceSection.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">
                {t.caseStudy.interfaceSection.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              {t.caseStudy.interfaceSection.description}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-card/80 p-3 shadow-[0_25px_80px_rgba(4,8,18,0.42)] backdrop-blur-sm sm:p-4 md:p-5">
            <div
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  goToSlide(activeImageIndex + 1);
                }

                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  goToSlide(activeImageIndex - 1);
                }
              }}
              className="mx-auto max-w-5xl outline-none"
            >
              <div className="rounded-[1.35rem] border border-white/10 bg-[#0a0f17] p-2 shadow-[0_30px_90px_rgba(12,18,30,0.7)] sm:p-3">
                <div className="relative overflow-hidden rounded-[1rem] border border-white/10 bg-[#0d121b]">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#0d121b]/90 px-3 py-2 sm:px-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                      {activeImageIndex + 1} / {museumScreens.length}
                    </span>
                  </div>

                  <div className="relative isolate overflow-hidden px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-5">
                    <div
                      className="relative mx-auto max-w-4xl"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={museumScreens[activeImageIndex]}
                          initial={shouldReduceMotion ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.97, x: 20 }}
                          animate={shouldReduceMotion ? { opacity: 1, scale: 1, x: 0 } : { opacity: 1, scale: 1, x: 0 }}
                          exit={shouldReduceMotion ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.97, x: -20 }}
                          transition={shouldReduceMotion ? { duration: 0.1 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                          className="relative"
                        >
                          <div className="relative mx-auto overflow-hidden rounded-[0.85rem] border border-white/10 bg-[#111821] shadow-[0_32px_80px_rgba(6,12,19,0.8)]">
                            <div className="relative aspect-[16/10] w-full max-w-[1100px]">
                              <Image
                                src={museumScreens[activeImageIndex]}
                                alt={`${t.caseStudy.interfaceSection.dotLabel} ${activeImageIndex + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 80vw"
                                priority={activeImageIndex === 0}
                                className="object-contain p-2 sm:p-3"
                              />
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(116,169,255,0.08),transparent_62%)]" />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => goToSlide(activeImageIndex - 1)}
                  aria-label={t.caseStudy.interfaceSection.prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center justify-center gap-2">
                  {museumScreens.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`${t.caseStudy.interfaceSection.dotLabel} ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === activeImageIndex ? 'w-8 bg-accent' : 'w-2.5 bg-white/30 hover:bg-white/55'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goToSlide(activeImageIndex + 1)}
                  aria-label={t.caseStudy.interfaceSection.next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <p className="mt-4 text-center text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {t.caseStudy.interfaceSection.note}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Core Features */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.coreFeatures}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.caseStudy.featuresList.map((feature) => (
              <div key={feature} className="flex items-start gap-3 py-2">
                <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted">{feature}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* RBAC */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {t.caseStudy.rbac}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.caseStudy.roles.map((role) => {
              const Icon = iconMap[role.icon] || Shield;
              return (
                <div
                  key={role.name}
                  className="p-6 rounded-xl border border-border bg-card"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {role.name}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Testing */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.testing}</h2>
          <p className="text-base text-muted leading-relaxed">
            {t.caseStudy.content.testing}
          </p>
        </motion.section>

        {/* Deployment */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.deployment}</h2>
          <p className="text-base text-muted leading-relaxed">
            {t.caseStudy.content.deployment}
          </p>
        </motion.section>

        {/* Technology */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.technology}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Results */}
        <motion.section {...fadeIn} className="mb-20">
          <h2 className="text-2xl font-bold text-foreground mb-6">{t.caseStudy.results}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-border">
            {[
              { value: '28', label: 'Requirements Delivered' },
              { value: '4', label: 'User Roles Supported' },
              { value: '100%', label: 'Features Functional' },
              { value: 'Live', label: 'Production Status' },
            ].map((r) => (
              <div key={r.label}>
                <p className="text-2xl font-bold text-foreground">{r.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Next Project */}
        {nextProject && (
          <motion.section {...fadeIn}>
            <div className="rounded-xl border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">{t.caseStudy.nextProject}</p>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {nextProject.title} — {nextProject.subtitle}
              </h3>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-muted transition-colors"
              >
                {t.caseStudy.viewAllProjects}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
