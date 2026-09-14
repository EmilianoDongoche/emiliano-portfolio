'use client';

import { motion } from 'framer-motion';
import { AppWindow, Globe, Brain, Database } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { useLanguage } from '@/i18n/context';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'app-window': AppWindow,
  globe: Globe,
  brain: Brain,
  database: Database,
};

export function Services() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title={t.services.title} />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 md:p-8 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-border-light transition-all duration-300"
              >
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon size={20} className="text-accent" />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
