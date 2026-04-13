import { Portfolio } from "./storage";
import { TEMPLATES_CODE } from "./generatedTemplateStrings";

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
      "lucide-react": "^0.292.0"
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
  darkMode: 'class',
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

  // Generate theme toggle component
  const themeToggleTsx = `'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
      </button>
    </div>
  );
}
`;

  // Generate layout.tsx
  const layoutTsx = `import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
`;

  // Generate page.tsx
  const pageTsx = `'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { ProfessionalTemplate, ModernTemplate, CreativeTemplate, DeveloperTemplate, TEMPLATES } from '@/components/PortfolioTemplates';
import ThemeToggle from '@/components/ThemeToggle';

const portfolioInfo = ${JSON.stringify(portfolio, null, 2)};

export default function Home() {
  const { theme: currentTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const templateId = "${portfolio.templateId || 'professional'}";
  const colorSchemeId = "${portfolio.colorScheme || 'blue'}";
  
  const templateObj = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
  const colorSchemeObj = templateObj.colorSchemes.find(s => s.id === colorSchemeId) || templateObj.colorSchemes[0];

  const resolvedTheme = mounted ? (currentTheme === 'dark' ? 'dark' : 'light') : 'light';

  const props = {
    portfolio: portfolioInfo,
    template: templateObj,
    colorScheme: colorSchemeObj,
    theme: resolvedTheme,
    customColors: null,
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 'modern': return <ModernTemplate {...props as any} />;
      case 'creative': return <CreativeTemplate {...props as any} />;
      case 'developer': return <DeveloperTemplate {...props as any} />;
      default: return <ProfessionalTemplate {...props as any} />;
    }
  };

  return (
    <>
      <ThemeToggle />
      {renderTemplate()}
    </>
  );
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
      "src/components/ThemeProvider.tsx": `'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
`,
      "src/components/ThemeToggle.tsx": themeToggleTsx,
      "src/components/PortfolioTemplates.tsx": TEMPLATES_CODE['PortfolioTemplates.tsx'],
      "src/hooks/useScrollAnimation.ts": TEMPLATES_CODE['useScrollAnimation.ts'],
      "src/components/ScrollToTop.tsx": `"use client";\nexport default function ScrollToTop() { return null; }\n`,
      "src/types.ts": `export interface Portfolio {
  id?: string;
  name: string;
  title: string;
  intro: string;
  email: string;
  phone: string;
  skills: string[];
  qualifications: string[];
  education: any[];
  experience: any[];
  projects: any[];
  templateId?: string;
  colorScheme?: string;
  personalImage?: string;
}`,
      "src/app/globals.css": globalsCss,
      "src/app/layout.tsx": layoutTsx,
      "src/app/page.tsx": pageTsx,
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
