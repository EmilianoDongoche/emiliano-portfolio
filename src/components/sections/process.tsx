'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/context';

export function Process() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="process-heading" className="section-shell py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: '-10%' }} transition={{ duration: 0.5 }}>
          <p className="eyebrow">{t.process.eyebrow}</p>
          <h2 id="process-heading" className="section-title mt-4">{t.process.title}</h2>
        </motion.div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-8%' }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group min-h-56 bg-card p-6 sm:p-7"
            >
              <p className="font-mono text-xs tracking-[0.16em] text-accent">{step.number}</p>
              <h3 className="mt-12 text-xl font-medium tracking-[-0.03em] text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
