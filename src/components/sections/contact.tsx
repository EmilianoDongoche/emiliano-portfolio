'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, AtSign, Code2, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { useLanguage } from '@/i18n/context';
import { CVDownload } from '@/components/cv-download';

const contactLinks = [
  { label: 'LinkedIn', href: siteConfig.links.linkedin, icon: AtSign },
  { label: 'GitHub', href: siteConfig.links.github, icon: Code2 },
  { label: 'Email', href: siteConfig.links.email, icon: Mail },
];

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-shell relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_100%,rgba(73,138,239,0.16),transparent_45%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ margin: '-10%' }} transition={{ duration: 0.55 }} className="rounded-[1.75rem] border border-white/10 bg-card/80 p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-12 lg:p-16">
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-heading" className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl lg:text-6xl">{t.contact.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{t.contact.description}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={siteConfig.links.email} className="button-primary">{t.nav.letsWork} <ArrowUpRight size={17} aria-hidden="true" /></a>
            <a href={siteConfig.links.email} className="button-secondary">{t.contact.emailMe} <Mail size={16} aria-hidden="true" /></a>
            <CVDownload />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {contactLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noopener noreferrer'} className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground">
                <Icon size={15} aria-hidden="true" /> {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
