const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
const i18nCode = fs.readFileSync(i18nPath, 'utf8');

// Parse translations dictionary object dynamically
const match = i18nCode.match(/export const translations: Record<SupportedLanguage, Record<string, string>> = ([\s\S]*?);\n\nexport const getTranslation/);

if (!match) {
  console.error("Could not match translations in i18n.ts");
  process.exit(1);
}

let translationsObj;
try {
  translationsObj = eval("(" + match[1] + ")");
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
