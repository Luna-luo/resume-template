export interface ContactInfo {
  title: string;
  value: string;
  logo: string;
}

export interface workExperience {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
}

export interface edu {
  school: string;
  degree: string;
  date: string;
  location: string;
  coursesAndInfo: string[];
}

export interface skill {
  title: string;
  value: string;
}

export interface project {
  title: string;
  technologies: string;
  description: string[];
}

export interface ResumeData {
  jobTitle: string | null;
  contactInfo: ContactInfo[];
  introduction: string;
  workExperience: workExperience[];
  education: edu[];
  skills: skill[];
  projects: project[];
}

export interface CoverLetterContent {
  clContentInfo: { title: string, value: string, logo: string }[];
  introduction: string;
  applicant: { name: string, title: string, email: string, phone: string, location: string };
  recipient: { name: string, company: string, date: string };
  projects: { title: string, description: string }[];
  skills: string;
  missionStatement: string;
  closing: string;
}