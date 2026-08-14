import SCHEME_TRANSLATIONS_JSON from '../constants/schemeTranslations.json';

export type LanguageCode = 'mr' | 'en' | 'hi' | 'ahr' | 'kok';

export interface LocalizedSchemeContent {
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

export const getLocalizedScheme = (scheme: any, langCode: string): any => {
  if (!scheme) return scheme;
  const lang = normalizeLangCode(langCode);

  const schemeId = (scheme.id || '').toLowerCase().trim();
  const localizedData = SCHEME_TRANSLATIONS[schemeId] || SCHEME_TRANSLATIONS[scheme.id];

  const getField = (fieldName: keyof LocalizedSchemeContent, fallbackValue?: any): any => {
    if (localizedData && localizedData[fieldName]) {
      const fieldDict = localizedData[fieldName]!;
      if (fieldDict[lang]) return fieldDict[lang];
      if (lang === 'en' && fieldDict['en']) return fieldDict['en'];
      if (lang === 'hi' && fieldDict['hi']) return fieldDict['hi'];
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
    requiredDocuments: localizedDocuments
  };
};
