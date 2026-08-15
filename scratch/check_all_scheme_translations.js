const fs = require('fs');
const path = require('path');

const translationsFile = path.join(__dirname, '../src/constants/schemeTranslations.json');
const schemeServiceFile = path.join(__dirname, '../src/services/schemeService.ts');

const translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));

// Extract scheme IDs from MOCK_SCHEMES
const serviceContent = fs.readFileSync(schemeServiceFile, 'utf8');
const mockMatch = serviceContent.match(/export const MOCK_SCHEMES: Scheme\[\] = (\[[\s\S]*?\n\];)/);
const mockSchemes = eval('(' + mockMatch[1].slice(0, -1) + ')');

console.log(`Total MOCK_SCHEMES count: ${mockSchemes.length}`);
console.log(`Total schemeTranslations keys: ${Object.keys(translations).length}`);

const langs = ['mr', 'en', 'hi', 'ahr', 'kok'];
const fields = ['title', 'description', 'amount', 'department', 'overview', 'benefits', 'eligibility', 'documents'];

mockSchemes.forEach((s) => {
  const id = s.id;
  const t = translations[id];
  console.log(`\n-----------------------------------------`);
  console.log(`Scheme ID: "${id}" | Name: "${s.name || s.title}"`);
  if (!t) {
    console.log(`❌ MISSING ENTIRELY from schemeTranslations.json!`);
  } else {
    fields.forEach((f) => {
      if (!t[f]) {
        console.log(`  ❌ Missing field "${f}"`);
      } else {
        langs.forEach((l) => {
          if (!t[f][l]) {
            console.log(`  ⚠️ Field "${f}" missing language "${l}"`);
          }
        });
      }
    });
  }
});
