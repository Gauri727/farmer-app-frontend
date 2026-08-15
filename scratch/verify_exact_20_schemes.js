const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/constants/schemeTranslations.json');
const translations = JSON.parse(fs.readFileSync(file, 'utf8'));

const serviceFile = path.join(__dirname, '../src/services/schemeService.ts');
const serviceContent = fs.readFileSync(serviceFile, 'utf8');
const mockMatch = serviceContent.match(/export const MOCK_SCHEMES: Scheme\[\] = (\[[\s\S]*?\n\];)/);
const mockSchemes = eval('(' + mockMatch[1].slice(0, -1) + ')');

const backendFile = path.join(__dirname, '../backend/data/schemeSources.js');
const backendSchemes = require(backendFile);

console.log(`1. schemeTranslations.json scheme count: ${Object.keys(translations).length}`);
console.log(`2. MOCK_SCHEMES scheme count: ${mockSchemes.length}`);
console.log(`3. backend schemeSources.js scheme count: ${backendSchemes.length}`);

console.log("\n=== EXACT 20 SCHEMES IN APP ===");
mockSchemes.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.id}] -> ${s.englishName || s.title}`);
});
