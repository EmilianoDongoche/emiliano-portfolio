export interface TechCategory {
  category: string;
  items: string[];
}

export const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Python', 'FastAPI', 'REST APIs'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'SQLAlchemy'],
  },
  {
    category: 'Cloud',
    items: ['Vercel', 'Render', 'Supabase'],
  },
  {
    category: 'Development',
    items: ['Git', 'GitHub', 'VS Code'],
  },
  {
    category: 'AI',
    items: ['OpenAI', 'Claude', 'Gemini', 'AI APIs', 'Automation'],
  },
];
