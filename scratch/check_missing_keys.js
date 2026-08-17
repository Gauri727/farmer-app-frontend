const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
const code = fs.readFileSync(file, 'utf8');

const keysToCheck = [
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

// Extract dictionary objects loosely
['mr', 'en', 'hi', 'ahr', 'kok'].forEach(lang => {
  console.log(`\n--- Checking language: ${lang} ---`);
  const sectionMatch = code.match(new RegExp(`${lang}:\\s*\\{([\\s\\S]*?)\\n\\s*\\},?\\n\\s*(en|hi|ahr|kok|\\});`));
  const sectionText = sectionMatch ? sectionMatch[1] : '';
  
  keysToCheck.forEach(k => {
    const hasKey = new RegExp(`\\b${k}\\s*:`).test(sectionText) || new RegExp(`'${k}'\\s*:`).test(sectionText);
    if (!hasKey) {
      console.log(`  ❌ Missing key: ${k}`);
    } else {
      console.log(`  ✅ Found key: ${k}`);
    }
  });
});
