import { Portfolio } from "@/lib/storage";


export const demoPortfolio: Portfolio = {
  id: "0",
  name: "Mahendra Thapa",
  title: "Frontend Developer",
  intro: "I build modern and responsive web applications that people love to use.",
  email: "mahendrathapa687@gmail.com",
  phone: "+9779812345678",
  personalImage: "/portfolioimage.jpg", // dummy profile image
  education: [
    { institution: "Tech University", degree: "BSc", field: "Computer Science", year: "2022" },
  ],
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  qualifications: ["Certified React Developer", "Advanced JavaScript"],
  experience: [
    {
      company: "MSP Solutions Pvt. Ltd.",
      position: "Frontend Developer",
      duration: "Jan 2023 - Present",
      description: "Building responsive web apps with React and Next.js.",
    },
    {
      company: "Startup Hub",
      position: "Intern Developer",
      duration: "Jun 2022 - Dec 2022",
      description: "Worked on e-commerce projects and internal tools.",
    },
    {
      company: "Startup Hub",
      position: "Intern Developer",
      duration: "Jun 2022 - Dec 2022",
      description: "Worked on e-commerce projects and internal tools.",
    },
  ],
  additionalExperience: "Participated in open-source projects and hackathons.",
  projects: [
    {
      name: "Portfolio Website",
      projectRole: "Developer",
      projectDuration: "2 Months",
      description: "A personal portfolio website showcasing my projects and skills.",
      link: "https://example.com",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      technologiesList: ["React", "TypeScript", "Tailwind"],
    },
    {
      name: "E-commerce App",
      projectRole: "Frontend Developer",
      projectDuration: "3 Months",
      description: "Built a full-stack e-commerce platform using React and Node.js.",
      link: "https://example.com/shop",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=60",
      technologiesList: ["Next.js", "Node.js", "MongoDB"],
    },
    {
      name: "Journal App",
      projectRole: "Frontend Developer",
      projectDuration: "3 Months",
      description: "Built a full-stack journal platform using React and Node.js.",
      link: "https://example.com/shop",
      image: "/portfolioSave.png",
      technologiesList: ["Next.js", "Node.js", "MongoDB"],
    },
  ],
  templateId: "professional",
  colorScheme: "blue",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};