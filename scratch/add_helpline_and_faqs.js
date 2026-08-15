const fs = require('fs');
const path = require('path');

// 1. Update i18n.ts with helplineLabel translations
const i18nPath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
let i18n = fs.readFileSync(i18nPath, 'utf8');

const helplineTranslations = {
  mr: { helplineLabel: 'हेल्पलाईन नंबर', contactTab: 'संपर्क व हेल्पलाईन' },
  en: { helplineLabel: 'Helpline Number', contactTab: 'Contact & Helpline' },
  hi: { helplineLabel: 'हेल्पलाइन नंबर', contactTab: 'संपर्क एवं हेल्पलाइन' },
  ahr: { helplineLabel: 'हेल्पलाईन नंबर', contactTab: 'संपर्क अन हेल्पलाईन' },
  kok: { helplineLabel: 'हेल्पलाईन नंबर', contactTab: 'संपर्क आनी हेल्पलाईन' },
};

Object.keys(helplineTranslations).forEach(lang => {
  const dict = helplineTranslations[lang];
  Object.keys(dict).forEach(k => {
    if (!i18n.includes(`${k}:`)) {
      i18n = i18n.replace(`${lang}: {`, `${lang}: {\n    ${k}: '${dict[k]}',`);
    }
  });
});

fs.writeFileSync(i18nPath, i18n, 'utf8');
console.log('✅ Updated src/utils/i18n.ts with helplineLabel and contactTab keys!');

// 2. Update schemeTranslations.json with FAQs & Helpline Contact for ALL schemes
const jsonPath = path.join(__dirname, '..', 'src', 'constants', 'schemeTranslations.json');
let schemeData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Common contact object for helpline 022-61316429
const defaultContact = {
  mr: {
    phone: "022-61316429",
    email: "helpdesk@mahadbt.gov.in",
    address: "कृषी आयुक्तालय, महाराष्ट्र शासन, शिवाजीनगर, पुणे"
  },
  en: {
    phone: "022-61316429",
    email: "helpdesk@mahadbt.gov.in",
    address: "Commissioner of Agriculture, Govt of Maharashtra, Shivajinagar, Pune"
  },
  hi: {
    phone: "022-61316429",
    email: "helpdesk@mahadbt.gov.in",
    address: "कृषि आयुक्तालय, महाराष्ट्र सरकार, शिवाजीनगर, पुणे"
  },
  ahr: {
    phone: "022-61316429",
    email: "helpdesk@mahadbt.gov.in",
    address: "कृषी आयुक्तालय, महाराष्ट्र शासन, पुणे"
  },
  kok: {
    phone: "022-61316429",
    email: "helpdesk@mahadbt.gov.in",
    address: "कृषी आयुक्तालय, महाराष्ट्र शासन, पुणे"
  }
};

// Generate scheme-specific FAQs
const getSchemeFaqs = (schemeKey, titleMr, titleEn) => {
  return {
    mr: [
      {
        question: `${titleMr} योजनेचा अर्ज कुठे करावा?`,
        answer: "महाराष्ट्र शासनाच्या महाडीबीटी (MahaDBT) पोर्टलवर (mahadbt.maharashtra.gov.in) ऑनलाईन अर्ज करावा."
      },
      {
        question: "योजनेसाठी कोणता हेल्पलाईन नंबर आहे?",
        answer: "योजनेच्या मार्गदर्शनासाठी कृषी विभाग हेल्पलाईन नंबर 022-61316429 वर संपर्क साधावा."
      },
      {
        question: "अनुदानाची रक्कम कुठे जमा होते?",
        answer: "अनुदानाची रक्कम थेट लाभार्थ्याच्या आधार-लिंक्ड बँक खात्यात (DBT) जमा केली जाते."
      }
    ],
    en: [
      {
        question: `How to apply for ${titleEn || schemeKey}?`,
        answer: "Apply online on the official Govt of Maharashtra MahaDBT portal (mahadbt.maharashtra.gov.in)."
      },
      {
        question: "What is the official helpline number for this scheme?",
        answer: "You can contact the official Agriculture Department Helpline at 022-61316429 for assistance."
      },
      {
        question: "How is the subsidy amount disbursed?",
        answer: "The subsidy amount is directly transferred to the farmer's Aadhaar-linked bank account (DBT)."
      }
    ],
    hi: [
      {
        question: `${titleMr} योजना के लिए आवेदन कैसे करें?`,
        answer: "महाराष्ट्र सरकार के महाडीबीटी (MahaDBT) पोर्टल (mahadbt.maharashtra.gov.in) पर ऑनलाइन आवेदन करें।"
      },
      {
        question: "इस योजना का हेल्पलाइन नंबर क्या है?",
        answer: "सहायता के लिए कृषि विभाग हेल्पलाइन नंबर 022-61316429 पर संपर्क करें।"
      },
      {
        question: "सब्सिडी की राशि कैसे मिलती है?",
        answer: "सब्सिडी की राशि सीधे लाभार्थी के आधार-लिंक्ड बैंक खाते (DBT) में भेजी जाती है।"
      }
    ],
    ahr: [
      {
        question: `या योजनेना अर्ज कसा करायना?`,
        answer: "महाराष्ट्र शासनाच्या महाडीबीटी (MahaDBT) पोर्टलवर ऑनलाईन अर्ज करावा."
      },
      {
        question: "योजनेना हेल्पलाईन नंबर काय शे?",
        answer: "कृषी विभाग हेल्पलाईन नंबर 022-61316429 वर फोन करावा."
      },
      {
        question: "अनुदान कसं भेटस?",
        answer: "अनुदान थेट बँक खात्यात (DBT) जमा व्हस."
      }
    ],
    kok: [
      {
        question: `या येवजणे खातीर अर्ज कसा करचो?`,
        answer: "महाराष्ट्र शासनाच्या महाडीबीटी (MahaDBT) पोर्टलाचेर ऑनलाईन अर्ज करात."
      },
      {
        question: "येवजणेचो हेल्पलाईन नंबर काय आसा?",
        answer: "कृषी खात्याच्या हेल्पलाईन नंबर 022-61316429 चेर फोन करात."
      },
      {
        question: "अनदानाचे पयशे कसे मेळटात?",
        answer: "अनदानाची रक्कम थेट बँक खात्यांत (DBT) जमा जाता."
      }
    ]
  };
};

Object.keys(schemeData).forEach(schemeKey => {
  const item = schemeData[schemeKey];
  const titleMr = item.title?.mr || schemeKey;
  const titleEn = item.title?.en || schemeKey;

  item.contact = defaultContact;
  item.faqs = getSchemeFaqs(schemeKey, titleMr, titleEn);
});

fs.writeFileSync(jsonPath, JSON.stringify(schemeData, null, 2), 'utf8');
console.log('✅ Updated schemeTranslations.json with FAQs & Helpline 022-61316429 for all schemes!');

// 3. Update getLocalizedScheme in src/utils/schemeLocalization.ts to extract faqs & contact
const locPath = path.join(__dirname, '..', 'src', 'utils', 'schemeLocalization.ts');
let locCode = fs.readFileSync(locPath, 'utf8');

locCode = locCode.replace(
  `export interface LocalizedSchemeContent {`,
  `export interface LocalizedSchemeContent {
  contact?: Record<string, { phone?: string; email?: string; address?: string }>;
  faqs?: Record<string, Array<{ question: string; answer: string }>>;`
);

locCode = locCode.replace(
  `  const localizedOverview = getField('overview') || scheme.overview;`,
  `  const localizedOverview = getField('overview') || scheme.overview;
  const localizedFaqs = getField('faqs') || scheme.faqs || [];
  const localizedContact = getField('contact') || scheme.contact || { phone: '022-61316429' };`
);

locCode = locCode.replace(
  `    requiredDocuments: localizedDocuments`,
  `    requiredDocuments: localizedDocuments,
    faqs: localizedFaqs,
    contact: localizedContact`
);

fs.writeFileSync(locPath, locCode, 'utf8');
console.log('✅ Updated src/utils/schemeLocalization.ts to localizing FAQs & Contact!');
