const fs = require('fs');
const path = require('path');

const schemeServiceFile = path.join(__dirname, '../src/services/schemeService.ts');
const serviceContent = fs.readFileSync(schemeServiceFile, 'utf8');

const mockMatch = serviceContent.match(/export const MOCK_SCHEMES: Scheme\[\] = (\[[\s\S]*?\n\];)/);
const mockSchemes = eval('(' + mockMatch[1].slice(0, -1) + ')');

console.log(`Loaded ${mockSchemes.length} schemes from MOCK_SCHEMES`);

const backendSchemes = mockSchemes.map((s) => ({
  id: s.id,
  name: s.name || s.title,
  englishName: s.englishName || s.title,
  department: s.department || 'कृषी विभाग',
  shortDescription: s.shortDescription || s.description,
  overview: Array.isArray(s.overview) ? s.overview : [s.overview || s.description],
  benefit: Array.isArray(s.benefits) ? s.benefits : [s.benefits || s.amount],
  benefits: Array.isArray(s.benefits) ? s.benefits : [s.benefits || s.amount],
  eligibility: Array.isArray(s.eligibility) ? s.eligibility : [s.eligibility || s.eligibility_criteria],
  requiredDocuments: Array.isArray(s.documents) ? s.documents : (Array.isArray(s.requiredDocuments) ? s.requiredDocuments : [s.documents]),
  documents: Array.isArray(s.documents) ? s.documents : (Array.isArray(s.requiredDocuments) ? s.requiredDocuments : [s.documents]),
  howToApply: s.howToApply || {
    description: "महाडीबीटी पोर्टलवर ऑनलाईन अर्ज करावा.",
    steps: ["महाडीबीटी पोर्टलवर ऑनलाईन अर्ज सादर करा.", "आवश्यक कागदपत्रे अपलोड करा."]
  },
  faqs: s.faqs || [],
  contact: s.contact || { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषी आयुक्तालय, पुणे" },
  source: { name: "Maharashtra Agriculture Department", url: "https://krishi.maharashtra.gov.in" }
}));

const backendFile = path.join(__dirname, '../backend/data/schemeSources.js');
const backendContent = `/**
 * Official MahaDBT & Maharashtra Agriculture Schemes Data Repository
 * 20 Official Specified Schemes.
 */

module.exports = ${JSON.stringify(backendSchemes, null, 2)};
`;

fs.writeFileSync(backendFile, backendContent, 'utf8');
console.log(`✅ Successfully updated backend/data/schemeSources.js with all ${backendSchemes.length} specified schemes!`);
