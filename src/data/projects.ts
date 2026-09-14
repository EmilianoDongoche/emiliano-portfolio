export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  metrics?: ProjectMetric[];
  isFeatured?: boolean;
  isConceptProject?: boolean;
  caseStudyUrl?: string;
  capabilities?: string[];
  flow?: string[];
}

export const projects: Project[] = [
  {
    slug: 'museum-management',
    title: 'Sistema de Gestão Museológica',
    subtitle: 'Museum Management System',
    category: 'Full-Stack Web Application',
    description:
      'A complete museum management platform designed to centralize collections, exhibitions, visitors, events, locations, reports and administrative operations.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'Python',
      'SQLAlchemy',
      'PostgreSQL',
      'Supabase',
      'Vercel',
      'Render',
    ],
    metrics: [
      { value: '28', label: 'Functional Requirements' },
      { value: '4', label: 'User Roles' },
      { value: 'Full-Stack', label: 'Architecture' },
      { value: 'Production', label: 'Deployment' },
    ],
    isFeatured: true,
    caseStudyUrl: '/projects/museum-management',
    capabilities: [
      'Authentication',
      'Role-based access control',
      'Collection management',
      'Exhibitions & events',
      'Visitors & locations',
      'Reports & audit',
      'Administrative operations',
    ],
  },
  {
    slug: 'casanova',
    title: 'CasaNova',
    subtitle: 'Real Estate Platform',
    category: 'Real Estate Platform',
    description:
      'A modern real estate platform designed to help property agencies showcase listings, generate leads and manage their online presence.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    isConceptProject: true,
    capabilities: [
      'Property listings',
      'Search & filters',
      'Image galleries',
      'Contact & WhatsApp integration',
      'Maps',
      'Administrative dashboard',
    ],
  },
  {
    slug: 'leadflow-ai',
    title: 'LeadFlow AI',
    subtitle: 'AI & Automation',
    category: 'AI & Automation',
    description:
      'An AI-powered lead qualification and automation concept designed to capture, classify and route business leads automatically.',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'AI APIs', 'PostgreSQL'],
    isConceptProject: true,
    flow: [
      'Website',
      'Lead',
      'AI Classification',
      'Lead Score',
      'Database',
      'Email / WhatsApp',
      'CRM',
    ],
  },
];
