'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/context';

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: '-10%' },
  transition: { duration: 0.55 },
};

const architecture = ['React / TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL'];

export function SelectedWork() {
  const { t } = useLanguage();
  const featured = t.projectsSection.items.find((project) => project.isFeatured);
  const concepts = t.projectsSection.items.filter((project) => project.isConceptProject);

  if (!featured) return null;

  return (
    <section id="projects" aria-labelledby="work-heading" className="section-shell relative overflow-hidden py-24 md:py-36">
      <div className="section-rule absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div {...reveal} className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{t.projectsSection.title}</p>
            <h2 id="work-heading" className="section-title mt-4">{t.projectsSection.intro}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{t.projectsSection.intro}</p>
        </motion.div>

        <motion.article {...reveal} transition={{ duration: 0.6, delay: 0.08 }} className="project-feature mt-14 overflow-hidden rounded-[1.75rem] border border-white/10 bg-card">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-9 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow !text-[10px]">{featured.category}</span>
                <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground">{t.projectsSection.featuredLabel}</span>
              </div>
              <h3 className="mt-6 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">{featured.title}</h3>
              <p className="mt-2 font-mono text-xs text-accent">{featured.subtitle}</p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{featured.description}</p>

              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {featured.metrics?.map((metric) => (
                  <div key={metric.label} className="bg-[#11141d] px-4 py-5 sm:px-5">
                    <p className="text-xl font-semibold tracking-[-0.03em] text-foreground">{metric.value}</p>
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {featured.technologies.map((technology) => <span key={technology} className="tech-chip">{technology}</span>)}
              </div>
              {featured.caseStudyUrl && (
                <Link href={featured.caseStudyUrl} className="text-link mt-8">
                  {t.projectsSection.exploreCaseStudy} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              )}
            </div>

            <div className="relative border-t border-white/10 bg-[#0c0f16] p-6 sm:p-9 lg:border-t-0 lg:border-l lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(72,142,255,0.17),transparent_27%)]" />
              <div className="relative">
                <p className="eyebrow !text-[10px]">{t.projectsSection.architectureLabel}</p>
                <div className="mt-7 space-y-2">
                  {architecture.map((item, index) => (
                    <div key={item}>
                      <motion.div
                        initial={{ opacity: 0, x: 12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`rounded-lg border px-4 py-3 font-mono text-xs ${index === 0 ? 'border-accent/35 bg-accent/[0.08] text-white' : 'border-white/10 bg-white/[0.035] text-white/70'}`}
                      >
                        {item}
                      </motion.div>
                      {index < architecture.length - 1 && <ArrowDown size={15} className="mx-auto my-1.5 text-accent/65" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
                <div className="mt-9 border-t border-white/10 pt-6">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">{t.projectsSection.capabilitiesLabel}</p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {featured.capabilities?.map((capability) => (
                      <li key={capability} className="flex items-start gap-2 text-xs leading-relaxed text-white/68">
                        <Check size={13} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        <div className="mt-7 grid gap-7 lg:grid-cols-2">
          {concepts.map((project, index) => (
            <motion.article {...reveal} transition={{ duration: 0.55, delay: index * 0.1 }} key={project.slug} className="group rounded-[1.5rem] border border-white/10 bg-card p-6 transition-colors hover:border-white/20 sm:p-8">
              <span className="inline-flex rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-muted-foreground">{t.projectsSection.conceptLabel}</span>
              <p className="mt-6 font-mono text-[11px] text-accent">{project.category}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">{project.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{project.description}</p>

              {project.flow ? (
                <div className="mt-7 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-white/65">
                  {project.flow.map((step, flowIndex) => (
                    <Fragment key={step}>
                      <span className="rounded border border-white/10 bg-white/[0.025] px-2 py-1.5">{step}</span>
                      {flowIndex < project.flow!.length - 1 && <span className="text-accent/80">↓</span>}
                    </Fragment>
                  ))}
                </div>
              ) : (
                <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                  {project.capabilities?.map((capability) => <li key={capability} className="text-xs text-white/63">— {capability}</li>)}
                </ul>
              )}

              <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                {project.technologies.map((technology) => <span key={technology} className="tech-chip">{technology}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
