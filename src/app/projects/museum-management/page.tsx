import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CaseStudyContent } from './case-study-content';

export const metadata: Metadata = {
  title: 'Museum Management System — Case Study | Emiliano Dongoche',
  description:
    'A complete museum management platform designed to centralize collections, exhibitions, visitors, events, locations, reports and administrative operations.',
};

export default function MuseumManagementPage() {
  return (
    <>
      <Header />
      <main>
        <CaseStudyContent />
      </main>
      <Footer />
    </>
  );
}
