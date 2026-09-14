export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: 'Web Applications',
    description:
      'Custom web applications designed around real business workflows, users and operational needs.',
    icon: 'app-window',
  },
  {
    title: 'Business Websites',
    description:
      'High-performance websites designed to establish credibility, generate leads and convert visitors into customers.',
    icon: 'globe',
  },
  {
    title: 'AI & Automation',
    description:
      'AI-powered workflows that automate repetitive tasks, process information and improve business operations.',
    icon: 'brain',
  },
  {
    title: 'Digital Systems',
    description:
      'Authentication, databases, APIs, dashboards, reporting and business management platforms.',
    icon: 'database',
  },
];
