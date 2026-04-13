const fs = require('fs');

const templates = fs.readFileSync('client/src/components/PortfolioTemplates.tsx', 'utf8')
  .replace(/@\/hooks\/useScrollAnimation/g, '../hooks/useScrollAnimation')
  .replace(/@\/components\/ScrollToTop/g, './ScrollToTop')
  .replace(/@\/lib\/storage/g, '../types');

const scrollAnimation = fs.readFileSync('client/src/hooks/useScrollAnimation.ts', 'utf8');
const scrollToTop = fs.readFileSync('client/src/components/ScrollToTop.tsx', 'utf8');

const output = `export const TEMPLATES_CODE = ${JSON.stringify({
  'PortfolioTemplates.tsx': templates,
  'useScrollAnimation.ts': scrollAnimation,
  'ScrollToTop.tsx': scrollToTop,
}, null, 2)};`;

fs.writeFileSync('client/src/lib/generatedTemplateStrings.ts', output);
console.log('Done!');
