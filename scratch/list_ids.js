const fs = require('fs');
const path = require('path');

const translationsFile = path.join(__dirname, '../src/constants/schemeTranslations.json');
const schemeServiceFile = path.join(__dirname, '../src/services/schemeService.ts');

const translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));

const serviceContent = fs.readFileSync(schemeServiceFile, 'utf8');
const mockMatch = serviceContent.match(/export const MOCK_SCHEMES: Scheme\[\] = (\[[\s\S]*?\n\];)/);
const mockSchemes = eval('(' + mockMatch[1].slice(0, -1) + ')');

console.log("=== ALL MOCK_SCHEMES IDs ===");
mockSchemes.forEach((s) => {
  console.log(`ID: "${s.id}" -> Title: "${s.title || s.name}"`);
});

console.log("\n=== ALL TRANSLATION KEYS ===");
console.log(Object.keys(translations));
