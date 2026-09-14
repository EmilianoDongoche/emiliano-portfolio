'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/i18n/context';

import Image from 'next/image';

export function About() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="max-w-3xl">
            <SectionHeading title={t.about.title} />

            <div className="mt-10 space-y-5">
              {t.about.paragraphs.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="text-base md:text-lg text-muted leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: '-10%' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mx-auto w-full max-w-[420px]"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.02 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.42, ease: 'easeOut' }}
              className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.02]"
            >
              <Image
                src="/images/sobre mim.jpg"
                alt="Emiliano Dongoche"
                width={900}
                height={1200}
                sizes="(max-width: 768px) 100vw, 42vw"
                className="h-[420px] w-full object-cover object-center md:h-[500px]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
