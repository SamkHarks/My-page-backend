declare module '@/data/skills.json' {
  export interface SkillCategory {
    category: 'Frontend' | 'Backend' | 'Universal';
    items: string[];  // List of skills in the category
  }

  export interface SkillsData {
    skills: SkillCategory[]; // Array of skill categories
  }

  const skillsData: SkillsData;
  export default skillsData;
}