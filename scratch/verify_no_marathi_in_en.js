const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/constants/schemeTranslations.json');
const translations = JSON.parse(fs.readFileSync(file, 'utf8'));

const hasDevanagari = (str) => /[\u0900-\u097F]/.test(String(str));

let issueCount = 0;

Object.keys(translations).forEach((schemeId) => {
  const t = translations[schemeId];
  ['title', 'description', 'amount', 'department', 'overview', 'benefits', 'eligibility', 'documents', 'howToApply'].forEach((f) => {
    if (t[f] && t[f].en) {
      const val = t[f].en;
      const str = Array.isArray(val) ? val.join(' ') : (typeof val === 'object' ? JSON.stringify(val) : String(val));
      if (hasDevanagari(str)) {
        console.log(`❌ Scheme "${schemeId}" field "${f}.en" contains Devanagari text: "${str.substring(0, 80)}..."`);
        issueCount++;
      }
    }
  });
});

if (issueCount === 0) {
  console.log("🎉 SUCCESS: 100% ZERO Devanagari/Marathi characters found in English ('en') translation keys across ALL schemes!");
} else {
  console.log(`⚠️ Found ${issueCount} fields with Devanagari text in 'en'.`);
}
