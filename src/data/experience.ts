export interface Experience {
  company: string;
  role: string;
  responsibilities: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Museu das Comunicações',
    role: 'Software / Systems Development',
    responsibilities: [
      'Museum management platform development',
      'Full-stack architecture and deployment',
      'Authentication and role-based access control',
      'Collections, visitors, events and location management',
      'Reports, auditing, testing and debugging',
    ],
  },
  {
    company: 'ISPPK',
    role: 'Systems Technician',
    responsibilities: [],
  },
];
