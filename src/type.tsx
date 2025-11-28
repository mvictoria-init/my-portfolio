import type { ComponentType } from 'react';

export type Language = 'es' | 'en';
export type Theme = 'light' | 'dark';
export type TabId = 'home' | 'experience' | 'projects' | 'skills' | 'education' | 'contact' | 'about';

export interface LocalizedText {
  es: string;
  en: string;
}

export interface ProfileData {
  name: string;
  role: LocalizedText;
  about: LocalizedText;
  location: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface ExperienceJob {
  company: string;
  role: LocalizedText;
  period: string;
  desc: LocalizedText;
  stack: string[];
  achievements: LocalizedText[];
}

export interface ProjectItem {
  title: string;
  desc: LocalizedText;
  tags: string[];
  link?: string;
  color: string;
}

export interface SkillsData {
  frontend: string[];
  backend: string[];
  tools: string[];
  soft: { es: string[]; en: string[] };
}

export interface EducationItem {
  degree: LocalizedText;
  institution: string;
  year: string;
}

export interface PortfolioData {
  profile: ProfileData;
  experience: ExperienceJob[];
  projects: ProjectItem[];
  skills: SkillsData;
  education: EducationItem[];
}

export interface AppConfig {
  id: TabId;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
}