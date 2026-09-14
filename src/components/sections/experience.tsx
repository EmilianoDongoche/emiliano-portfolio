'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/context';

export function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-shell py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: '-10%' }} transition={{ duration: 0.5 }}>
          <p className="eyebrow">{t.experience.title}</p>
          <h2 id="experience-heading" className="section-title mt-4">{t.experience.headline}</h2>
        </motion.div>
        <div className="mt-14 border-t border-white/10">
          {t.experience.items.map((experience, index) => (
            <motion.article key={experience.company} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: '-8%' }} transition={{ duration: 0.5, delay: index * 0.1 }} className="grid gap-6 border-b border-white/10 py-8 sm:grid-cols-[minmax(11rem,.6fr)_1.4fr] sm:py-10">
              <div>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-foreground">{experience.company}</h3>
                <p className="mt-2 font-mono text-xs text-accent">{experience.role}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{experience.period}</p>
              </div>
              {experience.responsibilities.length > 0 && (
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {experience.responsibilities.map((responsibility) => <li key={responsibility} className="text-sm leading-relaxed text-muted">— {responsibility}</li>)}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
