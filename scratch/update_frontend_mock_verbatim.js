const fs = require('fs');
const path = require('path');

const schemeSources = require('../backend/data/schemeSources');

const mockSchemes = schemeSources.map(s => {
  return {
    id: s.id,
    title: s.name,
    name: s.name,
    englishName: s.englishName || s.name,
    category: s.category || (s.department === 'वन विभाग' ? 'Tribal Development' : 'Agriculture'),
    department: s.department || 'कृषी विभाग',
    type: s.name.includes('केंद्र') || s.id.includes('css') ? 'Central' : 'State',
    amount: Array.isArray(s.benefit) ? s.benefit[0] : (s.amount || 'शासकीय अनुदान उपलब्ध'),
    shortDescription: s.shortDescription || (Array.isArray(s.overview) ? s.overview[0] : s.overview),
    description: Array.isArray(s.overview) ? s.overview.join('\n\n') : s.overview,
    overview: s.overview,
    eligibility_criteria: Array.isArray(s.eligibility) ? s.eligibility.join('\n• ') : s.eligibility,
    eligibility: s.eligibility,
    benefits: Array.isArray(s.benefit || s.benefits) ? (s.benefit || s.benefits).join('\n• ') : (s.benefit || s.benefits),
    benefit: s.benefit || s.benefits,
    requiredDocuments: s.requiredDocuments || s.documents,
    documents: s.requiredDocuments || s.documents,
    application_url: s.sourceUrl || "https://mahadbt2.maharashtra.gov.in/farmer",
    is_featured: true,
  };
});

const serviceFile = path.join(__dirname, '..', 'src', 'services', 'schemeService.ts');
let content = fs.readFileSync(serviceFile, 'utf8');

const startMarker = 'export const MOCK_SCHEMES: Scheme[] = [';
const endMarker = '];\n\nconst CATEGORY_ORDER';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newMockCode = `export const MOCK_SCHEMES: Scheme[] = ${JSON.stringify(mockSchemes, null, 2)};`;
  const updatedContent = content.substring(0, startIndex) + newMockCode + content.substring(endIndex + 2);
  fs.writeFileSync(serviceFile, updatedContent, 'utf8');
  console.log('✅ Updated src/services/schemeService.ts MOCK_SCHEMES with verbatim 11 schemes!');
} else {
  console.error('❌ Could not find markers in schemeService.ts');
}
