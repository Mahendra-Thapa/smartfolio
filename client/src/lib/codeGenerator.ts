import { Portfolio } from "./storage";

export function generateNextJsProject(portfolio: Portfolio) {
  const projectName = portfolio.name.toLowerCase().replace(/\s+/g, "-");

  // Generate package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: `${portfolio.name}'s Professional Portfolio`,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      next: "^14.0.0",
      "next-themes": "^0.2.1",
    },
    devDependencies: {
      typescript: "^5.0.0",
      "@types/react": "^18.0.0",
      "@types/react-dom": "^18.0.0",
      "@types/node": "^20.0.0",
      autoprefixer: "^10.4.0",
      postcss: "^8.4.0",
      tailwindcss: "^3.3.0",
    },
  };

  // Generate next.config.js
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
`;

  // Generate tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

  // Generate globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;

  // Generate portfolio page component
  const portfolioComponent = `'use client';

import React from 'react';
import Link from 'next/link';

const portfolio = {
  name: '${portfolio.name}',
  title: '${portfolio.title}',
  intro: \`${portfolio.intro}\`,
  email: '${portfolio.email}',
  phone: '${portfolio.phone}',
  education: ${JSON.stringify(portfolio.education, null, 2)},
  skills: ${JSON.stringify(portfolio.skills, null, 2)},
  experience: ${JSON.stringify(portfolio.experience, null, 2)},
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {portfolio.name}
          </h1>
          <div className="flex gap-8">
            {['About', 'Skills', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={\`#\${item.toLowerCase()}\`}
                className="text-slate-600 hover:text-slate-900 font-medium transition"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h2 className="text-6xl font-bold text-slate-900 mb-4">{portfolio.name}</h2>
          <p className="text-2xl text-blue-600 font-semibold mb-6">{portfolio.title}</p>
          <p className="text-lg text-slate-600 leading-relaxed mb-8">{portfolio.intro}</p>
          <div className="flex gap-4">
            <a
              href={\`mailto:\${portfolio.email}\`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get In Touch
            </a>
            <a
              href={\`tel:\${portfolio.phone}\`}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Call Me
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-slate-900 mb-8">About Me</h3>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">{portfolio.intro}</p>
        </div>
      </section>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <section id="skills" className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-slate-900 mb-8">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portfolio.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-lg transition"
                >
                  <p className="font-semibold text-slate-900">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section id="experience" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-slate-900 mb-8">Experience</h3>
            <div className="space-y-8 max-w-3xl">
              {portfolio.experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-blue-600 pl-6">
                  <h4 className="text-2xl font-bold text-slate-900">{exp.position}</h4>
                  <p className="text-slate-600 font-semibold">{exp.company}</p>
                  <p className="text-sm text-slate-500 mb-3">{exp.duration}</p>
                  <p className="text-slate-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Let's Connect</h3>
          <p className="text-blue-100 text-lg mb-8">Feel free to reach out for any opportunities or collaborations.</p>
          <div className="flex gap-4 justify-center">
            <a
              href={\`mailto:\${portfolio.email}\`}
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Email Me
            </a>
            <a
              href={\`tel:\${portfolio.phone}\`}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Call Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 {portfolio.name}. All rights reserved.</p>
          <p className="text-slate-400 text-sm mt-2">Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
`;

  // Generate layout.tsx
  const layoutTsx = `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '${portfolio.name} - ${portfolio.title}',
  description: '${portfolio.intro.substring(0, 160)}...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

  // Generate page.tsx
  const pageTsx = `import Portfolio from './portfolio';

export default function Home() {
  return <Portfolio />;
}
`;

  // Generate .gitignore
  const gitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode
.idea
*.swp
*.swo
`;

  // Generate README.md
  const readme = `# ${portfolio.name}'s Portfolio

A modern, responsive portfolio website built with Next.js and Tailwind CSS.

## Features

- Modern and responsive design
- Fast performance with Next.js
- Beautiful UI with Tailwind CSS
- Mobile-friendly layout
- Easy to customize

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Development

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
# or
yarn build
yarn start
\`\`\`

## Customization

Edit \`src/app/portfolio.tsx\` to update your portfolio content.

## Deployment

This portfolio can be easily deployed to:
- Vercel (recommended for Next.js)
- Netlify
- GitHub Pages
- Any Node.js hosting provider

## License

MIT License - feel free to use this portfolio for your own projects.

---

Generated by SmartFolio Portfolio Builder
`;

  return {
    projectName,
    files: {
      "package.json": JSON.stringify(packageJson, null, 2),
      "next.config.js": nextConfig,
      "tailwind.config.js": tailwindConfig,
      "postcss.config.js": `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
      ".gitignore": gitignore,
      "README.md": readme,
      "src/app/globals.css": globalsCss,
      "src/app/layout.tsx": layoutTsx,
      "src/app/page.tsx": pageTsx,
      "src/app/portfolio.tsx": portfolioComponent,
      ".env.local": `# Add your environment variables here
NEXT_PUBLIC_SITE_NAME="${portfolio.name}"
`,
    },
  };
}

export async function downloadAsZip(portfolio: Portfolio) {
  const project = generateNextJsProject(portfolio);

  // Create a blob with all files
  const fileContents: Record<string, string> = {};

  for (const [path, content] of Object.entries(project.files)) {
    fileContents[path] = content;
  }

  // Create JSON representation of the project
  const projectData = JSON.stringify(fileContents, null, 2);

  // For now, we'll create a simple download by creating a text file
  // In a real scenario, you'd use a library like jszip
  return {
    projectName: project.projectName,
    files: project.files,
  };
}
