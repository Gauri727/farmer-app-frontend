const fs = require('fs');
const path = require('path');

const schemeSourcesFile = path.join(__dirname, '../backend/data/schemeSources.js');
let exactSchemes;
if (fs.existsSync(schemeSourcesFile)) {
  exactSchemes = require(schemeSourcesFile);
} else {
  console.error("schemeSources.js not found!");
  process.exit(1);
}

console.log(`Loaded ${exactSchemes.length} schemes from backend/data/schemeSources.js`);

// 1. Update src/constants/schemeTranslations.json
const translationsFile = path.join(__dirname, '../src/constants/schemeTranslations.json');
let translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));

exactSchemes.forEach((s) => {
  const id = s.id;
  if (!translations[id]) {
    translations[id] = {};
  }
  const t = translations[id];

  // Helper to ensure dictionary structure
  const setField = (field, mrVal, enVal) => {
    if (!t[field]) t[field] = {};
    t[field].mr = mrVal;
    if (enVal && !t[field].en) t[field].en = enVal;
  };

  setField('title', s.name, s.englishName || s.name);
  setField('description', s.shortDescription, s.shortDescription);

  const amountStr = Array.isArray(s.benefit) ? s.benefit.join('\n') : (s.benefit || '');
  setField('amount', amountStr, amountStr);
  setField('benefits', s.benefits || s.benefit, s.benefits || s.benefit);
  setField('department', s.department || 'कृषी विभाग', s.department || 'Department of Agriculture');

  setField('overview', s.overview, s.overview);
  setField('eligibility', s.eligibility, s.eligibility);
  setField('documents', s.requiredDocuments || s.documents, s.requiredDocuments || s.documents);

  if (s.howToApply) {
    const howArray = Array.isArray(s.howToApply.steps) ? s.howToApply.steps : [s.howToApply.description || ''];
    setField('howToApply', howArray, howArray);
  }

  if (s.faqs) {
    setField('faqs', s.faqs, s.faqs);
  }

  if (s.contact) {
    setField('contact', s.contact, s.contact);
  }
});

fs.writeFileSync(translationsFile, JSON.stringify(translations, null, 2), 'utf8');
console.log('✅ Updated src/constants/schemeTranslations.json with verbatim 11 schemes!');

// 2. Update MOCK_SCHEMES in src/services/schemeService.ts
const schemeServiceFile = path.join(__dirname, '../src/services/schemeService.ts');
let serviceContent = fs.readFileSync(schemeServiceFile, 'utf8');

// Match MOCK_SCHEMES array
const mockMatch = serviceContent.match(/export const MOCK_SCHEMES: Scheme\[\] = (\[[\s\S]*?\n\];)/);
if (mockMatch) {
  let mockObj;
  try {
    mockObj = eval('(' + mockMatch[1].slice(0, -1) + ')');
  } catch (e) {
    console.error("Failed to parse MOCK_SCHEMES:", e);
    process.exit(1);
  }

  // Update existing schemes or add new ones
  exactSchemes.forEach((exact) => {
    const idx = mockObj.findIndex((m) => m.id === exact.id);
    const updatedMock = {
      id: exact.id,
      name: exact.name,
      title: exact.name,
      englishName: exact.englishName || exact.name,
      description: exact.shortDescription,
      shortDescription: exact.shortDescription,
      category: exact.category || 'Irrigation',
      type: exact.type || 'State',
      amount: Array.isArray(exact.benefit) ? exact.benefit[0] : (exact.benefit || 'अनुदान अनुज्ञेय'),
      benefits: Array.isArray(exact.benefit) ? exact.benefit.join('\n') : exact.benefit,
      eligibility_criteria: Array.isArray(exact.eligibility) ? exact.eligibility.join('\n• ') : exact.eligibility,
      department: exact.department,
      is_featured: true,
      overview: exact.overview,
      howToApply: exact.howToApply,
      documents: exact.requiredDocuments,
      faqs: exact.faqs,
      contact: exact.contact,
    };

    if (idx !== -1) {
      mockObj[idx] = { ...mockObj[idx], ...updatedMock };
    } else {
      mockObj.push(updatedMock);
    }
  });

  const newMockStr = 'export const MOCK_SCHEMES: Scheme[] = ' + JSON.stringify(mockObj, null, 2) + ';';
  serviceContent = serviceContent.replace(mockMatch[0], newMockStr);
  fs.writeFileSync(schemeServiceFile, serviceContent, 'utf8');
  console.log('✅ Updated MOCK_SCHEMES in src/services/schemeService.ts with verbatim 11 schemes!');
} else {
  console.error("Could not match MOCK_SCHEMES in schemeService.ts");
}
