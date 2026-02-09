// Mock Portfolio Data for Template Previews
export interface Portfolio {
  id: string;
  name: string;
  title: string;
  intro: string;
  email: string;
  phone: string;
  skills: string[];
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    details?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  qualifications: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
}

export const MOCK_PORTFOLIOS: Record<string, Portfolio> = {
  professional: {
    id: "mock-professional",
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    intro:
      "Experienced product manager with 8+ years in SaaS and enterprise software. Passionate about building user-centric products that drive business value.",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 234-5678",
    skills: [
      "Product Strategy",
      "User Research",
      "Data Analysis",
      "Agile/Scrum",
      "Stakeholder Management",
      "Roadmap Planning",
      "Analytics",
      "Market Research",
    ],
    education: [
      {
        institution: "Stanford University",
        degree: "MBA in Business Administration",
        year: "2016",
        details: "Focus: Product Management & Entrepreneurship",
      },
      {
        institution: "UC Berkeley",
        degree: "Bachelor of Science in Computer Science",
        year: "2014",
        details: "GPA: 3.9/4.0, Dean's List",
      },
    ],
    experience: [
      {
        company: "Tech Innovations Corp",
        position: "Senior Product Manager",
        duration: "2020 - Present",
        description:
          "Lead product strategy for enterprise platform serving 500+ customers. Increased user engagement by 45% through data-driven feature prioritization. Managed cross-functional teams of 15+ engineers and designers.",
      },
      {
        company: "Digital Solutions Inc",
        position: "Product Manager",
        duration: "2017 - 2020",
        description:
          "Drove product development for mobile and web applications. Launched 3 major features that generated $2M+ in annual revenue. Conducted user research and competitive analysis.",
      },
      {
        company: "StartUp Ventures",
        position: "Associate Product Manager",
        duration: "2015 - 2017",
        description:
          "Supported product launches and feature development. Analyzed user behavior and provided insights for product improvements.",
      },
    ],
    qualifications: [
      "Certified Scrum Product Owner (CSPO)",
      "Google Analytics Certified",
      "Pragmatic Marketing Certified",
    ],
    projects: [
      {
        name: "Enterprise Dashboard Platform",
        description:
          "Led development of analytics dashboard used by 1000+ enterprise customers. Improved data visualization and reduced load time by 60%.",
        technologies: ["React", "Node.js", "PostgreSQL", "D3.js"],
        link: "https://github.com/example/dashboard",
      },
      {
        name: "Mobile App Launch",
        description:
          "Managed complete product launch of iOS and Android applications. Achieved 50K downloads in first month.",
        technologies: ["React Native", "Firebase", "App Store Optimization"],
        link: "https://github.com/example/mobile",
      },
    ],
  },

  modern: {
    id: "mock-modern",
    name: "Alex Chen",
    title: "Creative Director & Designer",
    intro:
      "Award-winning creative director specializing in brand identity and digital design. Passionate about creating memorable visual experiences.",
    email: "alex.chen@example.com",
    phone: "+1 (555) 345-6789",
    skills: [
      "UI/UX Design",
      "Brand Strategy",
      "Figma",
      "Adobe Creative Suite",
      "Web Design",
      "Motion Graphics",
      "Design Systems",
      "User Research",
    ],
    education: [
      {
        institution: "Rhode Island School of Design",
        degree: "BFA in Graphic Design",
        year: "2018",
        details: "Honors: Magna Cum Laude",
      },
      {
        institution: "Design Academy",
        degree: "Advanced UX/UI Certification",
        year: "2019",
        details: "Specialized in interaction design and prototyping",
      },
    ],
    experience: [
      {
        company: "Creative Studios International",
        position: "Creative Director",
        duration: "2021 - Present",
        description:
          "Lead creative team of 8 designers. Directed brand identity projects for Fortune 500 companies. Won 3 international design awards.",
      },
      {
        company: "Digital Design Agency",
        position: "Senior Designer",
        duration: "2019 - 2021",
        description:
          "Designed digital experiences for tech startups and established brands. Created comprehensive design systems and UI kits.",
      },
      {
        company: "Design Studio",
        position: "Graphic Designer",
        duration: "2018 - 2019",
        description:
          "Created visual designs for web and print. Collaborated with clients on brand identity projects.",
      },
    ],
    qualifications: [
      "Red Dot Design Award Winner",
      "Adobe Certified Associate",
      "Figma Expert",
    ],
    projects: [
      {
        name: "Tech Startup Brand Identity",
        description:
          "Complete brand redesign including logo, color palette, and design system. Increased brand recognition by 70%.",
        technologies: ["Figma", "Adobe XD", "Branding"],
        link: "https://github.com/example/branding",
      },
      {
        name: "E-commerce Platform UI",
        description:
          "Designed and prototyped complete e-commerce platform. Improved conversion rate by 35% through UX improvements.",
        technologies: ["Figma", "Prototyping", "User Testing"],
        link: "https://github.com/example/ecommerce-ui",
      },
    ],
  },

  creative: {
    id: "mock-creative",
    name: "Jordan Martinez",
    title: "Full Stack Developer & Creative Technologist",
    intro:
      "Innovative developer combining technical expertise with creative problem-solving. Building interactive experiences that blend art and technology.",
    email: "jordan.martinez@example.com",
    phone: "+1 (555) 456-7890",
    skills: [
      "React",
      "Next.js",
      "Three.js",
      "WebGL",
      "Node.js",
      "Python",
      "Creative Coding",
      "Generative Art",
      "Animation",
      "TypeScript",
    ],
    education: [
      {
        institution: "MIT Media Lab",
        degree: "Master's in Media Arts and Sciences",
        year: "2020",
        details: "Focus: Creative Technology",
      },
      {
        institution: "Carnegie Mellon University",
        degree: "Bachelor of Science in Computer Science",
        year: "2018",
        details: "Minor: Art & Design",
      },
    ],
    experience: [
      {
        company: "Creative Tech Studio",
        position: "Senior Creative Developer",
        duration: "2021 - Present",
        description:
          "Develop interactive installations and digital experiences. Created viral WebGL experiences with 5M+ views. Led team of 5 developers.",
      },
      {
        company: "Interactive Agency",
        position: "Creative Developer",
        duration: "2019 - 2021",
        description:
          "Built interactive websites and digital art installations. Specialized in Three.js and creative coding.",
      },
      {
        company: "Tech Startup",
        position: "Junior Developer",
        duration: "2018 - 2019",
        description:
          "Developed web applications and contributed to creative projects.",
      },
    ],
    qualifications: [
      "Three.js Expert",
      "Generative Art Specialist",
      "Creative Technologist",
    ],
    projects: [
      {
        name: "Interactive Art Installation",
        description:
          "Created immersive WebGL experience with real-time audio visualization. Exhibited at major art festivals.",
        technologies: ["Three.js", "WebGL", "Web Audio API"],
        link: "https://github.com/example/art-installation",
      },
      {
        name: "Generative Design System",
        description:
          "Built algorithmic design system that generates unique visual patterns. Used by 100+ designers.",
        technologies: ["p5.js", "Processing", "Generative Art"],
        link: "https://github.com/example/generative",
      },
      {
        name: "Interactive Data Visualization",
        description:
          "Created stunning data visualizations for climate research. Featured in major publications.",
        technologies: ["D3.js", "Three.js", "Data Visualization"],
        link: "https://github.com/example/data-viz",
      },
    ],
  },

  developer: {
    id: "mock-developer",
    name: "Michael Thompson",
    title: "Full Stack Developer",
    intro:
      "Passionate full-stack developer with 6+ years of experience building scalable web applications. Specialized in modern JavaScript frameworks and cloud technologies.",
    email: "michael.thompson@example.com",
    phone: "+1 (555) 567-8901",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
      "GraphQL",
    ],
    education: [
      {
        institution: "University of Washington",
        degree: "Bachelor of Science in Computer Science",
        year: "2018",
        details: "GPA: 3.8/4.0",
      },
      {
        institution: "Codecademy",
        degree: "Full Stack Web Development Certificate",
        year: "2019",
        details: "Advanced certification in modern web technologies",
      },
    ],
    experience: [
      {
        company: "Enterprise Software Solutions",
        position: "Senior Full Stack Developer",
        duration: "2021 - Present",
        description:
          "Lead development of customer-facing applications using React and Node.js. Mentored 5 junior developers. Improved application performance by 50% through optimization.",
      },
      {
        company: "Digital Agency",
        position: "Full Stack Developer",
        duration: "2019 - 2021",
        description:
          "Developed web applications for various clients. Implemented RESTful APIs and optimized database queries. Collaborated with design team on responsive interfaces.",
      },
      {
        company: "Tech Startup",
        position: "Junior Developer",
        duration: "2018 - 2019",
        description:
          "Built frontend components using React and contributed to backend development with Node.js.",
      },
    ],
    qualifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Data Engineer",
      "Certified Kubernetes Administrator",
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description:
          "Built full-stack e-commerce platform with React frontend and Node.js backend. Implemented Stripe payment integration and real-time inventory management.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "https://github.com/example/ecommerce",
      },
      {
        name: "Task Management Application",
        description:
          "Developed collaborative task management app with real-time updates using WebSocket. Features include team collaboration and progress analytics.",
        technologies: ["Next.js", "PostgreSQL", "WebSocket", "Tailwind CSS"],
        link: "https://github.com/example/taskapp",
      },
      {
        name: "Analytics Dashboard",
        description:
          "Created interactive analytics dashboard for visualizing business metrics. Integrated with multiple data sources and implemented advanced filtering.",
        technologies: ["React", "D3.js", "Express", "PostgreSQL"],
        link: "https://github.com/example/analytics",
      },
    ],
  },
};

// Function to get mock portfolio by template ID
export function getMockPortfolioByTemplate(templateId: string): Portfolio {
  return (
    MOCK_PORTFOLIOS[templateId] || MOCK_PORTFOLIOS.professional
  );
}

// Get all mock portfolios
export function getAllMockPortfolios(): Portfolio[] {
  return Object.values(MOCK_PORTFOLIOS);
}
