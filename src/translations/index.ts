/**
 * Central Aggregator for Application Translations
 */

import { mr } from './mr';
import { en } from './en';
import { hi } from './hi';
import { SupportedLanguage } from '../utils/i18n';

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  mr,
  en,
  hi,
};
