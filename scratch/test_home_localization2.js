const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
const i18nCode = fs.readFileSync(i18nPath, 'utf8');

// Get content inside "export const translations: Record<SupportedLanguage, Record<string, string>> = {"
const startMarker = 'export const translations: Record<SupportedLanguage, Record<string, string>> = {';
const endMarker = 'export const getTranslation';

const startIndex = i18nCode.indexOf(startMarker);
const endIndex = i18nCode.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

const objText = i18nCode.substring(startIndex + startMarker.length - 1, endIndex).trim();
// remove trailing semicolon if any
const cleanedText = objText.replace(/;\s*$/, '');

let translationsObj;
try {
  translationsObj = eval("(" + cleanedText + ")");
} catch (e) {
  console.error("Eval error:", e.message);
  process.exit(1);
}

const languages = ['mr', 'en', 'hi', 'ahr', 'kok'];
const homeKeys = [
  'appName',
  'appSubtitle',
  'liveBadge',
  'namasteGreeting',
  'goodMorning',
  'goodAfternoon',
  'goodEvening',
  'heroSubTitle',
  'listeningStatus',
  'tapToSpeakTitle',
  'tapToSpeakSub',
  'pill12Languages',
  'pillInstantReply',
  'pillFreeToUse',
  'quickAskHeader',
  'viewAll',
  'quickQ1',
  'quickQ2',
  'quickQ3',
  'quickQ4',
  'moreTopicsHeader',
  'topicHorticultureTitle',
  'topicHorticultureSub',
  'topicIrrigationTitle',
  'topicIrrigationSub',
  'topicMechanizationTitle',
  'topicMechanizationSub',
  'topicWelfareTitle',
  'topicWelfareSub',
  'featuredSchemesHeader',
  'seeAll',
  'recentUpdatesHeader',
  'newBadge',
  'todayTip',
  'tipText'
];

console.log("==========================================");
console.log(" TESTING HOME SCREEN LOCALIZATION KEYS");
console.log("==========================================");

languages.forEach(lang => {
  console.log(`\n--- LANGUAGE: ${lang.toUpperCase()} ---`);
  let missing = 0;
  homeKeys.forEach(k => {
    const val = translationsObj[lang]?.[k];
    if (!val) {
      console.log(`❌ Missing translation for [${k}] in [${lang}]`);
      missing++;
    } else {
      console.log(`  [${k}]: "${val}"`);
    }
  });
  if (missing === 0) {
    console.log(`✅ ALL 35 HOME SCREEN KEYS PRESENT FOR ${lang.toUpperCase()}`);
  }
});
