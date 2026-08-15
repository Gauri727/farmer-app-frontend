const fs = require('fs');
const path = require('path');

const ALLOWED_20_IDS = [
  "bhausaheb-fundkar-falbag-lagvad-yojana",
  "birsa-munda-krishi-kranti-outside-tribal-sub-plan",
  "birsa-munda-krishi-kranti-tribal-sub-plan",
  "chief-minister-agro-food-processing-scheme",
  "chief-minister-sustainable-agriculture-irrigation-scheme",
  "dr-babasaheb-ambedkar-krushi-swavalamban-yojana",
  "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "gopinath-munde-shetkari-apghat-suraksha-yojana",
  "kaju-kalma-vatap-scheme",
  "mission-for-integrated-development-of-horticulture",
  "nfsm-cotton-css",
  "nfsm-food-grains-css",
  "nfsm-oilseed-oilpalm-css",
  "nfsm-sugarcane-css",
  "pmksy-per-drop-more-crop-css",
  "pmrkvy-rainfed-area-development",
  "rashtriya-krushi-vikas-yojana-raftaar",
  "rkvy-sugarcane-harvester-subsidy",
  "state-sponsored-agriculture-mechanization",
  "sub-mission-on-agricultural-mechanization-css"
];

console.log(`Allowed exact 20 IDs count: ${ALLOWED_20_IDS.length}`);

// 1. Update src/constants/schemeTranslations.json
const translationsFile = path.join(__dirname, '../src/constants/schemeTranslations.json');
const translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));

const filteredTranslations = {};
ALLOWED_20_IDS.forEach((id) => {
  if (translations[id]) {
    filteredTranslations[id] = translations[id];
  } else {
    console.warn(`⚠️ Warning: ID "${id}" missing in schemeTranslations.json`);
  }
});

fs.writeFileSync(translationsFile, JSON.stringify(filteredTranslations, null, 2), 'utf8');
console.log(`✅ Filtered schemeTranslations.json: now contains exactly ${Object.keys(filteredTranslations).length} schemes.`);

// 2. Update MOCK_SCHEMES in src/services/schemeService.ts
const schemeServiceFile = path.join(__dirname, '../src/services/schemeService.ts');
let serviceContent = fs.readFileSync(schemeServiceFile, 'utf8');

const mockMatch = serviceContent.match(/export const MOCK_SCHEMES: Scheme\[\] = (\[[\s\S]*?\n\];)/);
const mockSchemes = eval('(' + mockMatch[1].slice(0, -1) + ')');

const filteredMock = [];
ALLOWED_20_IDS.forEach((id) => {
  const match = mockSchemes.find((m) => m.id === id);
  if (match) {
    filteredMock.push(match);
  }
});

console.log(`Filtered MOCK_SCHEMES count: ${filteredMock.length}`);

const newMockStr = 'export const MOCK_SCHEMES: Scheme[] = ' + JSON.stringify(filteredMock, null, 2) + ';';
serviceContent = serviceContent.replace(mockMatch[0], newMockStr);
fs.writeFileSync(schemeServiceFile, serviceContent, 'utf8');
console.log(`✅ Updated MOCK_SCHEMES in src/services/schemeService.ts: now contains exactly ${filteredMock.length} schemes.`);

// 3. Update backend/data/schemeSources.js
const backendFile = path.join(__dirname, '../backend/data/schemeSources.js');
if (fs.existsSync(backendFile)) {
  const backendSchemes = require(backendFile);
  const filteredBackend = [];
  ALLOWED_20_IDS.forEach((id) => {
    const match = backendSchemes.find((b) => b.id === id);
    if (match) {
      filteredBackend.push(match);
    }
  });
  const backendContent = `/**
 * Official MahaDBT & Maharashtra Agriculture Schemes Data Repository
 * Exactly 20 Official Specified Schemes.
 */

module.exports = ${JSON.stringify(filteredBackend, null, 2)};
`;
  fs.writeFileSync(backendFile, backendContent, 'utf8');
  console.log(`✅ Updated backend/data/schemeSources.js: now contains exactly ${filteredBackend.length} schemes.`);
}
