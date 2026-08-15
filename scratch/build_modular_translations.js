const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '../src/utils/i18n.ts');
const i18nContent = fs.readFileSync(i18nPath, 'utf8');

// Use regex to match translations object in i18n.ts
const match = i18nContent.match(/export const translations: Record<SupportedLanguage, Record<string, string>> = (\{[\s\S]*?\n\};)/);

if (!match) {
  console.error("Could not match translations object in i18n.ts");
  process.exit(1);
}

let objStr = match[1];
if (objStr.endsWith(';')) objStr = objStr.slice(0, -1);

let translations;
try {
  translations = eval('(' + objStr + ')');
} catch (e) {
  console.error("Failed to eval translations object:", e);
  process.exit(1);
}

console.log("Extracted languages:", Object.keys(translations));

const extraKeys = {
  mr: {
    weather: 'हवामान अंदाज',
    humidity: 'आर्द्रता',
    rainProbability: 'पावसाची शक्यता',
    windSpeed: 'वाऱ्याचा वेग',
    weatherAdvisoryTitle: 'शेतकऱ्यांसाठी हवामान सल्ला',
    weatherAdvisorySub: 'येत्या बुधवारी पावसाचा अंदाज असल्याने फवारणी आजच उरकून घ्या.',
    weatherUpdatedToday: 'आज अद्ययावत, सकाळी ६:००',
    onboarding1Title: 'शासकीय योजना शोधा',
    onboarding1Desc: 'शेतकऱ्यांसाठीच्या शासकीय योजना शोधा. पात्रता, लाभ आणि अर्ज प्रक्रियेची माहिती मिळवा.',
    onboarding2Title: 'तुमच्या भाषेत विचारा',
    onboarding2Desc: 'आमच्या AI सहाय्यकाशी ५ प्रादेशिक भाषांमध्ये बोला. आवाजाद्वारे शेती आणि योजनांचे झटपट उत्तर मिळवा.',
    onboarding3Title: 'पात्रता तपासा',
    onboarding3Desc: 'विविध योजनांसाठी तुमची पात्रता झटपट तपासा. अर्ज करण्यापूर्वी तुम्ही कशासाठी पात्र आहात ते जाणून घ्या.',
    skip: 'वगळा',
    next: 'पुढे',
    getStarted: 'शुरू करा',
    popularSearches: 'लोकप्रिय शोध',
    noResultsFound: 'कोणतेही निकाल आढळले नाहीत',
    noSchemesMatch: 'तुमच्या शोधाशी जुळणाऱ्या योजना आढळल्या नाहीत. दुसरा शब्द वापरून पहा.',
    talkToAgriMitraArrow: 'Farmer AI शी बोला →',
    checkEligibility: 'पात्रता तपासा',
    eligibilitySubtitle: 'शेतीची थोडी माहिती द्या आणि योग्य योजना शोधा',
    about: 'माहिती',
    aboutFarmerAi: 'Farmer AI बद्दल माहिती',
    preferences: 'प्राधान्ये',
    pushNotifications: 'सूचना',
    enabled: 'सुरू',
    disabled: 'बंद',
    themeMode: 'डार्क मोड',
    introCardText: 'बोलणे सोपे वाटते? Farmer AI ला आवाजाद्वारे विचारा.',
  },
  en: {
    weather: 'Weather Forecast',
    humidity: 'Humidity',
    rainProbability: 'Chance of Rain',
    windSpeed: 'Wind Speed',
    weatherAdvisoryTitle: 'Weather Advisory for Farmers',
    weatherAdvisorySub: 'Rain is forecasted this Wednesday, complete spraying activities today.',
    weatherUpdatedToday: 'Updated Today, 6:00 AM',
    onboarding1Title: 'Discover Schemes',
    onboarding1Desc: 'Find government schemes tailored for farmers. Get information about eligibility, benefits, and how to apply.',
    onboarding2Title: 'Ask in Your Language',
    onboarding2Desc: 'Talk to our AI assistant in 5 regional languages. Just speak and get instant answers about farming and schemes.',
    onboarding3Title: 'Check Eligibility',
    onboarding3Desc: 'Quickly check your eligibility for various schemes. Save time by knowing what you qualify for before applying.',
    skip: 'Skip',
    next: 'Next',
    getStarted: 'Get Started',
    popularSearches: 'Popular Searches',
    noResultsFound: 'No results found',
    noSchemesMatch: 'No schemes match your query. Try a different keyword.',
    talkToAgriMitraArrow: 'Talk to Farmer AI →',
    checkEligibility: 'Check eligibility',
    eligibilitySubtitle: 'Share a few farm details and find matches',
    about: 'About',
    aboutFarmerAi: 'About Farmer AI',
    preferences: 'Preferences',
    pushNotifications: 'Push Notifications',
    enabled: 'Enabled',
    disabled: 'Disabled',
    themeMode: 'Dark Mode',
    introCardText: 'Prefer to talk? Ask Farmer AI by voice.',
  },
  hi: {
    weather: 'मौसम पूर्वानुमान',
    humidity: 'आर्द्रता',
    rainProbability: 'बारिश की संभावना',
    windSpeed: 'हवा की गति',
    weatherAdvisoryTitle: 'किसानों के लिए मौसम परामर्श',
    weatherAdvisorySub: 'बुधवार को बारिश का अनुमान है, छिड़काव आज ही पूरा करें।',
    weatherUpdatedToday: 'आज अद्यतन, सुबह 6:00 बजे',
    onboarding1Title: 'सरकारी योजनाएं खोजें',
    onboarding1Desc: 'किसानों के लिए विशेष योजनाएं खोजें। पात्रता, लाभ और आवेदन की जानकारी प्राप्त करें।',
    onboarding2Title: 'अपनी भाषा में पूछें',
    onboarding2Desc: 'हमारे AI सहायक से 5 क्षेत्रीय भाषाओं में बात करें। बोलकर खेती और योजनाओं के तुरंत उत्तर पाएं।',
    onboarding3Title: 'पात्रता जांचें',
    onboarding3Desc: 'विभिन्न योजनाओं के लिए अपनी पात्रता जल्दी जांचें। आवेदन करने से पहले जानें कि आप किसके लिए पात्र हैं।',
    skip: 'छोड़ें',
    next: 'आगे',
    getStarted: 'शुरू करें',
    popularSearches: 'लोकप्रिय खोजें',
    noResultsFound: 'कोई परिणाम नहीं मिला',
    noSchemesMatch: 'आपकी खोज से मेल खाती योजनाएं नहीं मिलीं। कोई अन्य शब्द आज़माएं।',
    talkToAgriMitraArrow: 'Farmer AI से बात करें →',
    checkEligibility: 'पात्रता जांचें',
    eligibilitySubtitle: 'अपनी खेती के कुछ विवरण साझा करें और योजनाएं खोजें',
    about: 'के बारे में',
    aboutFarmerAi: 'Farmer AI के बारे में',
    preferences: 'प्राथमिकताएं',
    pushNotifications: 'पुश सूचनाएं',
    enabled: 'सक्षम',
    disabled: 'अक्षम',
    themeMode: 'डार्क मोड',
    introCardText: 'बोलकर बात करना पसंद है? Farmer AI से पूछें।',
  },
  ahr: {
    weather: 'हवामान अंदाज',
    humidity: 'आर्द्रता',
    rainProbability: 'पावसाची शक्यता',
    windSpeed: 'वाऱ्याचा वेग',
    weatherAdvisoryTitle: 'शेतकऱ्यांसाठी हवामान सल्ला',
    weatherAdvisorySub: 'बुधवारी पावसाचा अंदाज शे, फवारणी आजच करा.',
    weatherUpdatedToday: 'आज अपडेट, सकाळी ६:००',
    onboarding1Title: 'सरकारी योजना शोधा',
    onboarding1Desc: 'शेतकऱ्यांसाठी योजना शोधा. पात्रता अन लाभाची माहिती घ्या.',
    onboarding2Title: 'तुमना भाषाम्हा विचारा',
    onboarding2Desc: '५ भाषांमध्ये AI साथीदाराशी बोला अन झटपट उत्तरे मिळवा.',
    onboarding3Title: 'पात्रता तपासा',
    onboarding3Desc: 'योजनांसाठी पात्रता झटपट तपासा अन वेळ वाचवा.',
    skip: 'वगळा',
    next: 'पुढे',
    getStarted: 'शुरू करा',
    popularSearches: 'लोकप्रिय शोध',
    noResultsFound: 'काहीच निकाल भेटना नाही',
    noSchemesMatch: 'शोधाशी जुळणाऱ्या योजना भेटल्या नाहीत. दुसरा शब्द वापरा.',
    talkToAgriMitraArrow: 'Farmer AI शी बोला →',
    checkEligibility: 'पात्रता तपासा',
    eligibilitySubtitle: 'शेतीची माहिती द्या अन योजना शोधा',
    about: 'माहिती',
    aboutFarmerAi: 'Farmer AI बद्दल माहिती',
    preferences: 'प्राधान्ये',
    pushNotifications: 'सूचना',
    enabled: 'सुरू',
    disabled: 'बंद',
    themeMode: 'डार्क मोड',
    introCardText: 'बोलणे सोपे वाटते? Farmer AI ला आवाजाद्वारे विचारा.',
  },
  kok: {
    weather: 'हवामान अंदाज',
    humidity: 'आर्द्रता',
    rainProbability: 'पावसाची शक्यता',
    windSpeed: 'वाऱ्याचो वेग',
    weatherAdvisoryTitle: 'शेतकारां खातीर हवामान सल्लो',
    weatherAdvisorySub: 'येत्या बुधवारा पावसाची शिफारस आशिल्ल्यान फवारणी आजच उरकून घेयात.',
    weatherUpdatedToday: 'आज अद्ययावत, सकाळी ६:००',
    onboarding1Title: 'सरकारी येवजणी सोदात्',
    onboarding1Desc: 'शेतकारां खातीर शासकीय येवजणी सोदात्. पात्रता आनी लाभाची माहिती मेळव्यात.',
    onboarding2Title: 'तुमच्या भाशेंत विचारात',
    onboarding2Desc: 'आमच्या AI आधारा कडे ५ भाशेंत उलोव्यात आनी रोखडींच उत्तराम मेळव्यात.',
    onboarding3Title: 'पात्रता तपासात',
    onboarding3Desc: 'योजनां खातीर तुमची पात्रता रोखडीच तपासात.',
    skip: 'सोडात',
    next: 'फुडें',
    getStarted: 'सुरू करात्',
    popularSearches: 'फामाद सोद',
    noResultsFound: 'कांयच निकाल मेळंक ना',
    noSchemesMatch: 'तुमच्या सोदा कडे जुळपी येवजणी मेळूंक नात.',
    talkToAgriMitraArrow: 'Farmer AI शी उलोव्यात →',
    checkEligibility: 'पात्रता तपासात',
    eligibilitySubtitle: 'शेतीचो बारीक-साणी तपशील दियात आनी येवजणी सोदात्',
    about: 'माहिती',
    aboutFarmerAi: 'Farmer AI विशीं माहिती',
    preferences: 'प्राधान्यां',
    pushNotifications: 'सूचना',
    enabled: 'सुरू',
    disabled: 'बंद',
    themeMode: 'डार्क मोड',
    introCardText: 'उलोवंक सोपे लागता? Farmer AI कडे आवाजान विचारात.',
  },
};

const outputDir = path.join(__dirname, '../src/translations');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

['mr', 'en', 'hi', 'ahr', 'kok'].forEach((lang) => {
  const langObj = { ...(translations[lang] || {}), ...(extraKeys[lang] || {}) };
  const fileContent = `/**
 * Centralized Translation File — ${lang.toUpperCase()}
 */

export const ${lang}: Record<string, string> = ${JSON.stringify(langObj, null, 2)};
`;
  fs.writeFileSync(path.join(outputDir, `${lang}.ts`), fileContent, 'utf8');
  console.log(`Wrote src/translations/${lang}.ts (${Object.keys(langObj).length} keys)`);
});

const indexContent = `/**
 * Central Aggregator for Application Translations
 */

import { mr } from './mr';
import { en } from './en';
import { hi } from './hi';
import { ahr } from './ahr';
import { kok } from './kok';
import { SupportedLanguage } from '../utils/i18n';

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  mr,
  en,
  hi,
  ahr,
  kok,
};
`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent, 'utf8');
console.log('Wrote src/translations/index.ts');
