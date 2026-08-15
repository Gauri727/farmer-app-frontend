/**
 * Centralized i18n Translation Helper System
 * Supports Marathi ('mr'), English ('en'), Hindi ('hi'), Ahirani ('ahr'), and Konkani ('kok')
 * Imports translation dictionaries from dedicated files in src/translations/
 */

import { translations } from '../translations';

export type SupportedLanguage = 'mr' | 'en' | 'hi' | 'ahr' | 'kok';

export { translations };

export const getTranslation = (
  langCode: string,
  key: string,
  params?: Record<string, any>
): string => {
  const code = (['mr', 'en', 'hi', 'ahr', 'kok'].includes(langCode) ? langCode : 'mr') as SupportedLanguage;
  let text = translations[code]?.[key] || translations['mr']?.[key] || translations['en']?.[key];

  if (!text) {
    // Human-readable title-case fallback: never output raw camelCase keys!
    text = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  if (params) {
    Object.keys(params).forEach((paramKey) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(params[paramKey]));
    });
  }

  return text;
};

export const getCategoryTranslation = (category: string, langCode: string): string => {
  const keyMap: Record<string, string> = {
    Horticulture: 'catHorticulture',
    'Tribal Development': 'catTribalDevelopment',
    'Agro Processing': 'catAgroProcessing',
    Irrigation: 'catIrrigation',
    'Farmer Welfare': 'catFarmerWelfare',
    'Safety & Welfare': 'catSafetyWelfare',
    'Crop Development': 'catCropDevelopment',
    'Rainfed Development': 'catRainfedDevelopment',
    Mechanization: 'catMechanization',
  };

  const key = keyMap[category];
  return key ? getTranslation(langCode, key) : category;
};
