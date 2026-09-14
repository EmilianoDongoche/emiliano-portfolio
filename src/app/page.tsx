import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { Process } from '@/components/sections/process';
import { Services } from '@/components/sections/services';
import { SelectedWork } from '@/components/sections/selected-work';
import { About } from '@/components/sections/about';
import { Experience } from '@/components/sections/experience';
import { TechStack } from '@/components/sections/tech-stack';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SelectedWork />
        <About />
        <Experience />
        <TechStack />
        <Process />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
