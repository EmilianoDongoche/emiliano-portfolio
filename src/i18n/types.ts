export type Language = 'en' | 'pt' | 'es';

export interface TranslationData {
  nav: {
    about: string;
    projects: string;
    experience: string;
    contact: string;
    brandName: string;
    letsWork: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    titleAccent: string;
    description: string;
    positioning: string;
    viewWork: string;
    letsWork: string;
    available: string;
    architectureLabel: string;
    nextProject: string;
    terminal: {
      prompt: string;
      output: string;
      delay: number;
    }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  services: {
    title: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  projectsSection: {
    title: string;
    intro: string;
    conceptLabel: string;
    featuredLabel: string;
    architectureLabel: string;
    capabilitiesLabel: string;
    exploreCaseStudy: string;
    items: {
      slug: string;
      title: string;
      subtitle: string;
      category: string;
      description: string;
      technologies: string[];
      metrics?: { value: string; label: string }[];
      isFeatured?: boolean;
      isConceptProject?: boolean;
      caseStudyUrl?: string;
      capabilities?: string[];
      flow?: string[];
    }[];
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  experience: {
    title: string;
    headline: string;
    items: {
      company: string;
      role: string;
      period: string;
      responsibilities: string[];
    }[];
  };
  techStack: {
    title: string;
    categories: {
      category: string;
      items: string[];
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    emailMe: string;
    downloadCv: string;
    cvLanguages: {
      pt: string;
      en: string;
      es: string;
    };
  };
  footer: {
    role: string;
    locationLabel: string;
    location: string;
    available: string;
    connectLabel: string;
  };
  ui: {
    changeLanguage: string;
  };
  caseStudy: {
    back: string;
    overview: string;
    challenge: string;
    solution: string;
    architecture: string;
    appStack: string;
    deployment: string;
    coreFeatures: string;
    rbac: string;
    testing: string;
    technology: string;
    results: string;
    nextProject: string;
    viewAllProjects: string;
    interfaceSection: {
      eyebrow: string;
      title: string;
      description: string;
      note: string;
      prev: string;
      next: string;
      dotLabel: string;
    };
    content: {
      overview: string;
      challenge1: string;
      challenge2: string;
      solution: string;
      testing: string;
      deployment: string;
    };
    roles: {
      name: string;
      description: string;
      icon: string;
    }[];
    featuresList: string[];
  };
}
