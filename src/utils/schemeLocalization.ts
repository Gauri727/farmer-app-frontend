import SCHEME_TRANSLATIONS_JSON from '../constants/schemeTranslations.json';

export type LanguageCode = 'mr' | 'en' | 'hi' | 'ahr' | 'kok';

export interface LocalizedSchemeContent {
  contact?: Record<string, { phone?: string; email?: string; address?: string }>;
  faqs?: Record<string, Array<{ question: string; answer: string }>>;
  title?: Record<string, string>;
  description?: Record<string, string>;
  amount?: Record<string, string>;
  department?: Record<string, string>;
  overview?: Record<string, string[] | string>;
  benefits?: Record<string, string[] | string>;
  eligibility?: Record<string, string[] | string>;
  documents?: Record<string, string[] | string>;
  howToApply?: Record<string, string[] | string>;
}

export const SCHEME_TRANSLATIONS: Record<string, LocalizedSchemeContent> = SCHEME_TRANSLATIONS_JSON as any;

export const normalizeLangCode = (lang: string): LanguageCode => {
  const clean = (lang || '').toLowerCase().trim();
  if (clean.includes('en') || clean === 'english') return 'en';
  if (clean.includes('hi') || clean === 'hindi') return 'hi';
  if (clean.includes('ahr') || clean.includes('ahirani')) return 'ahr';
  if (clean.includes('kok') || clean.includes('konkani')) return 'kok';
  return 'mr';
};

export const getLocalizedCategoryName = (categoryName: string, langCode: string): string => {
  const lang = normalizeLangCode(langCode);
  if (lang === 'mr') return categoryName;

  const categoryTranslations: Record<string, Record<LanguageCode, string>> = {
    "सिंचन योजना": {
      mr: "सिंचन योजना",
      en: "Irrigation Schemes",
      hi: "सिंचाई योजनाएं",
      ahr: "सिंचन योजना",
      kok: "सिंचन योजना"
    },
    "यांत्रिकीकरण": {
      mr: "यांत्रिकीकरण",
      en: "Mechanization Schemes",
      hi: "यांत्रिकीकरण योजनाएं",
      ahr: "यांत्रिकीकरण",
      kok: "यांत्रिकीकरण"
    },
    "अन्न सुरक्षा व पिके": {
      mr: "अन्न सुरक्षा व पिके",
      en: "Food Security & Crops",
      hi: "खाद्य सुरक्षा एवं फसलें",
      ahr: "अन्न सुरक्षा व पिके",
      kok: "अन्न सुरक्षा व पिके"
    },
    "विशेष घटक व अनुसूचित जमाती": {
      mr: "विशेष घटक व अनुसूचित जमाती",
      en: "Special Tribal & Component Schemes",
      hi: "विशेष घटक एवं जनजातीय योजनाएं",
      ahr: "विशेष घटक योजना",
      kok: "विशेष घटक योजना"
    },
    "अनुसूचित जाती कल्याण": {
      mr: "अनुसूचित जाती कल्याण",
      en: "Scheduled Caste Welfare",
      hi: "अनुसूचित जाति कल्याण",
      ahr: "अनुसूचित जाती कल्याण",
      kok: "अनुसूचित जाती कल्याण"
    },
    "फलोत्पादन": {
      mr: "फलोत्पादन",
      en: "Horticulture Development",
      hi: "बागवानी विकास",
      ahr: "फलोत्पादन",
      kok: "फलोत्पादन"
    }
  };

  const match = categoryTranslations[categoryName];
  if (match && match[lang]) return match[lang];
  return categoryName;
};

const SCHEME_ALIASES: Record<string, string> = {
  "dr-shyamaprasad-mukherjee-jan-van-vikas-yojana": "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "dr-shyamprasad-mukherjee-jan-van-vikas-scheme": "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "shyamaprasad-mukherjee-jan-van-vikas": "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",

  "birsa-munda-krishi-kranti-outside-tribal-sub-plan": "birsa-munda-krishi-kranti-tribal-sub-plan",
  "birsa-munda-krishi-kranti-yojana": "birsa-munda-krishi-kranti-tribal-sub-plan",
  "birsa-munda-krushi-kranti-yojana": "birsa-munda-krishi-kranti-tribal-sub-plan",

  "national-food-security-mission": "nfsm-food-grains-css",
  "national-food-security-mission-nfsm-css": "nfsm-food-grains-css",

  "mission-for-integrated-development-of-horticulture-midh-css": "mission-for-integrated-development-of-horticulture",
  "midh-css": "mission-for-integrated-development-of-horticulture",

  "state-agriculture-mechanization-scheme": "state-sponsored-agriculture-mechanization",
  "rajya-krishi-yantrikikaran": "state-sponsored-agriculture-mechanization",

  "rainfed-area-development-rad-scheme": "pmrkvy-rainfed-area-development",
  "rad-dryland-development": "pmrkvy-rainfed-area-development",

  "gopinath-munde-farmer-accident-insurance-scheme": "gopinath-munde-shetkari-apghat-suraksha-yojana",
  "gopinath-munde-farmer-accident": "gopinath-munde-shetkari-apghat-suraksha-yojana",
};

export const getLocalizedScheme = (scheme: any, langCode: string): any => {
  if (!scheme) return scheme;
  const lang = normalizeLangCode(langCode);

  const rawId = (scheme.id || '').toLowerCase().trim();
  const resolvedId = SCHEME_ALIASES[rawId] || rawId;
  const localizedData = SCHEME_TRANSLATIONS[resolvedId] || SCHEME_TRANSLATIONS[rawId] || SCHEME_TRANSLATIONS[scheme.id];

  const getField = (fieldName: keyof LocalizedSchemeContent, fallbackValue?: any): any => {
    if (localizedData && localizedData[fieldName]) {
      const fieldDict = localizedData[fieldName]!;
      if (fieldDict[lang] !== undefined && fieldDict[lang] !== null) return fieldDict[lang];
      if (fieldDict['mr'] !== undefined && fieldDict['mr'] !== null) return fieldDict['mr'];
      if (fieldDict['en'] !== undefined && fieldDict['en'] !== null) return fieldDict['en'];
    }
    return fallbackValue;
  };

  const localizedTitle = getField('title') || (lang === 'en' && scheme.englishName ? scheme.englishName : (scheme.name || scheme.title));
  const localizedDesc = getField('description') || scheme.shortDescription || scheme.description;
  const localizedAmount = getField('amount') || scheme.amount;
  const localizedBenefits = getField('benefits') || scheme.benefits || scheme.benefit;
  const localizedEligibility = getField('eligibility') || scheme.eligibility || scheme.eligibility_criteria;
  const localizedDepartment = getField('department') || scheme.department;
  const localizedCategory = getLocalizedCategoryName(scheme.category || scheme.department || 'General', lang);
  const localizedOverview = getField('overview') || scheme.overview;
  const localizedFaqs = getField('faqs') || scheme.faqs || [];
  const localizedContact = getField('contact') || scheme.contact || { phone: '020-25530012' };
  const localizedHowToApply = getField('howToApply') || scheme.howToApply;
  const localizedDocuments = getField('documents') || scheme.documents || scheme.requiredDocuments;

  return {
    ...scheme,
    title: localizedTitle,
    name: localizedTitle,
    description: localizedDesc,
    shortDescription: localizedDesc,
    amount: localizedAmount,
    benefits: localizedBenefits,
    benefit: localizedBenefits,
    eligibility_criteria: Array.isArray(localizedEligibility)
      ? localizedEligibility.join('\n• ')
      : localizedEligibility,
    eligibility: localizedEligibility,
    department: localizedDepartment,
    category: localizedCategory,
    overview: localizedOverview,
    howToApply: localizedHowToApply,
    documents: localizedDocuments,
    requiredDocuments: localizedDocuments,
    faqs: localizedFaqs,
    contact: localizedContact
  };
};
