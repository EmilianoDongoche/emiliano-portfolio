'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/i18n/context';

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title={t.techStack.title} />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {t.techStack.categories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.items.map((tech) => (
                  <li key={tech} className="text-sm text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
