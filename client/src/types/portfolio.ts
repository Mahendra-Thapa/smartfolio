// Main Portfolio Type
export interface Portfolio {
  id: number;
  name: string;
  title: string;
  intro: string;
  email: string;
  phone: string;
  personalImage: string;
  skills: string[];
  qualifications: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  owner: Owner;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
  details: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string;
  link: string;
  image: string | null;
  technologiesList: string[];
}

export interface Owner {
  id: number;
  username: string;
  email: string;
  password: string;
  approved: boolean;
  suspended: boolean;
  roles: Role[];
}

export type Role = "ROLE_USER" | "ROLE_ADMIN";
