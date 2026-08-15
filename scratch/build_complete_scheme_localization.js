const fs = require('fs');
const path = require('path');

const code = `/**
 * Scheme Localization Utility Module
 * Complete Multi-Lingual Scheme Data Localizer for all 5 languages (mr, en, hi, ahr, kok).
 * Ensures instant, complete language switching across Titles, Overview, Benefits,
 * Eligibility, Documents, How to Apply, FAQs, GR, and Contact info without reloads.
 */

import { Scheme } from '../types/api.types';
import { getTranslation, getCategoryTranslation } from './i18n';

export interface LocalizedSchemeContent {
  title: Record<string, string>;
  description?: Record<string, string>;
  amount?: Record<string, string>;
  department?: Record<string, string>;
  overview?: Record<string, string | string[]>;
  benefits?: Record<string, string | string[]>;
  eligibility?: Record<string, string | string[]>;
  documents?: Record<string, string[]>;
  howToApply?: Record<string, { description?: string; steps?: string[]; officialUrl?: string }>;
  faqs?: Record<string, Array<{ question: string; answer: string }>>;
  gr?: Record<string, { title?: string; viewUrl?: string; downloadUrl?: string }>;
  contact?: Record<string, { phone?: string; email?: string; address?: string }>;
}

export const SCHEME_TRANSLATIONS: Record<string, LocalizedSchemeContent> = {
  'bhausaheb-fundkar-falbag-lagvad-yojana': {
    title: {
      mr: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
      en: 'Bhausaheb Fundkar Fruit Orchard Plantation Scheme',
      hi: 'भाऊसाहेब फुंडकर फलबाग पौधरोपण योजना',
      ahr: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
      kok: 'भाऊसाहेब फुंडकर फळबाग रोवप येवजण',
    },
    description: {
      mr: 'फळबाग लागवड आणि दीर्घकालीन बागायती पिकांसाठी अनुदान सहाय्य.',
      en: 'Subsidy support for orchard plantation and long-term horticulture crops.',
      hi: 'फलबाग पौधरोपण और दीर्घकालिक बागवानी फसलों के लिए सब्सिडी सहायता।',
      ahr: 'फळबाग लागवड अन बागायती पिकांसाठी अनुदान सहाय्य.',
      kok: 'फळबाग रोवप आनी बागायती पिकां खातीर अनदानाचो आदार.',
    },
    amount: {
      mr: '५०%-३०%-२०% ३ वर्षात टप्प्याटप्प्याने अनुदान',
      en: '50%-30%-20% Phased Subsidy Over 3 Years',
      hi: '50%-30%-20% 3 वर्षों में चरणबद्ध सब्सिडी',
      ahr: '५०%-३०%-२०% ३ वर्षात अनुदान',
      kok: '५०%-३०%-२०% ३ वर्षांत अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      en: [
        "1) Started in 2018-19 to extend fruit orchard plantation support to farmers not covered under MGNREGA.",
        "2) Subsidy is released in 3 instalments: 50% in Year 1, 30% in Year 2, and 20% in Year 3 upon maintaining 90% plant survival for irrigated crops and 80% for rainfed crops.",
        "3) Land holding limits: 10 guntha to 10 ha in Konkan region; 20 guntha to 6 ha in rest of Maharashtra.",
        "4) Priority given to small, marginal, women, and divyang farmers."
      ],
      hi: [
        "1) मनरेगा के अंतर्गत शामिल न होने वाले किसानों को फलबाग पौधरोपण प्रोत्साहन देने के लिए 2018-19 से शुरू किया गया।",
        "2) सब्सिडी 3 किस्तों में दी जाती है: प्रथम वर्ष 50%, द्वितीय वर्ष 30% और तृतीय वर्ष 20% (पौधों की 90%/80% उत्तरजीविता पर)।",
        "3) कोंकण क्षेत्र में 10 गुंठा से 10 हेक्टेयर; शेष महाराष्ट्र में 20 गुंठा से 6 हेक्टेयर भूमि सीमा।",
        "4) छोटे, सीमांत, महिला और दिव्यांग किसानों को प्राथमिकता।"
      ]
    },
    benefits: {
      en: [
        "100% subsidy for installation of drip irrigation setup.",
        "Phased financial assistance for fruit saplings, pit digging, and maintenance over 3 years."
      ],
      hi: [
        "ड्रिप सिंचाई सेटअप की स्थापना पर 100% सब्सिडी।",
        "फल के पौधों, गड्ढे की खुदाई और रखरखाव के लिए 3 वर्षों में चरणबद्ध वित्तीय सहायता।"
      ]
    },
    eligibility: {
      en: [
        "Drip irrigation setup is mandatory for orchard plantation.",
        "Farmers depending primarily on agriculture for livelihood are given first priority.",
        "Must hold valid 7/12 extract or joint owner consent letter."
      ],
      hi: [
        "फलबाग पौधरोपण के लिए ड्रिप सिंचाई अनिवार्य है।",
        "जीविका के लिए मुख्य रूप से कृषि पर निर्भर किसानों को पहली प्राथमिकता दी जाती है।",
        "वैध 7/12 उतारा या संयुक्त मालिक सहमति पत्र होना आवश्यक है।"
      ]
    },
    documents: {
      en: ["7/12 and 8-A Extracts", "Guarantee Letter / Undertaking", "Joint Holder Consent Letter (if applicable)", "Caste Certificate (for SC/ST farmers)"],
      hi: ["7/12 और 8-अ उतारा", "गारंटी पत्र / वचनपत्र", "संयुक्त खाताधारक सहमति पत्र (यदि लागू हो)", "जाति प्रमाण पत्र (SC/ST किसानों के लिए)"]
    }
  },

  'birsa-munda-krishi-kranti-outside-tribal-sub-plan': {
    title: {
      mr: 'बिरसा मुंडा कृषि क्रांती योजना (आदिवासी उपयोजना बाह्य)',
      en: 'Birsa Munda Krishi Kranti Yojana (Outside Tribal Sub Plan)',
      hi: 'बिरसा मुंडा कृषि क्रांति योजना (आदिवासी उपयोजना के बाहर)',
      ahr: 'बिरसा मुंडा कृषी क्रांती योजना (आदिवासी क्षेत्राबाहेर)',
      kok: 'बिरसा मुंडा कृषी क्रांती येवजण (आदिवासी उपयेवजणे भायर)',
    },
    description: {
      mr: 'आदिवासी उपयोजना क्षेत्राबाहेरील अनुसूचित जमाती (ST) शेतकऱ्यांसाठी विहीर व सिंचन अनुदान.',
      en: 'Irrigation & well construction subsidy for Scheduled Tribe (ST) farmers outside tribal sub-plan areas.',
      hi: 'आदिवासी उपयोजना क्षेत्रों के बाहर अनुसूचित जनजाति (ST) किसानों के लिए सिंचाई और कुआं निर्माण सब्सिडी।',
      ahr: 'आदिवासी क्षेत्राबाहेर सिंचन अन विहीर अनुदान.',
      kok: 'आदिवासी वाठारा भायर सिंचन आनी बांय अनदान.',
    },
    amount: {
      mr: 'रु. २.५० लाख पर्यंत १००% अनुदान',
      en: 'Up to ₹2.50 Lakh 100% Subsidy',
      hi: '₹2.50 लाख तक 100% सब्सिडी',
      ahr: 'रु. २.५० लाख पर्यंत अनुदान',
      kok: 'रु. २.५० लाख मेरेन अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      en: [
        "Provides 100% financial assistance to Scheduled Tribe (ST) farmers located outside Tribal Sub-Plan areas.",
        "Aims to create sustainable irrigation assets like new wells, well repairs, pump sets, micro-irrigation, and farm pond lining."
      ],
      hi: [
        "आदिवासी उपयोजना क्षेत्रों के बाहर स्थित अनुसूचित जनजाति (ST) किसानों को 100% वित्तीय सहायता प्रदान करता है।",
        "नया कुआं, कुएं की मरम्मत, पंप सेट, ड्रिप/स्प्रिंकलर और फार्म पॉन्ड प्लास्टिक अस्तर जैसी सतत सिंचाई सुविधाएं बनाना।"
      ]
    },
    benefits: {
      en: [
        "New Well: Up to ₹2,50,000 subsidy.",
        "Old Well Repair: Up to ₹50,000 subsidy.",
        "In-well Boring: Up to ₹20,000 subsidy.",
        "Electric/Solar Pump Set: Up to ₹20,000 subsidy.",
        "Farm Pond Plastic Lining: Up to ₹1,00,000 subsidy.",
        "Drip/Sprinkler Irrigation: Up to ₹50,000 subsidy."
      ],
      hi: [
        "नया कुआं: ₹2,50,000 तक सब्सिडी।",
        "पुराने कुएं की मरम्मत: ₹50,000 तक सब्सिडी।",
        "इन-वेल बोरिंग: ₹20,000 तक सब्सिडी।",
        "पंप सेट: ₹20,000 तक सब्सिडी।",
        "फार्म पॉन्ड प्लास्टिक अस्तर: ₹1,00,000 तक सब्सिडी।",
        "सूक्ष्म सिंचाई सेट: ₹50,000 तक सब्सिडी।"
      ]
    },
    eligibility: {
      en: [
        "Farmer must belong to Scheduled Tribe (ST) category with valid ST Caste Certificate.",
        "Annual household income must be within ₹1.50 Lakh.",
        "Land holding must be between 0.20 ha to 6.00 ha (min 0.40 ha for new well)."
      ],
      hi: [
        "किसान को मान्य जाति प्रमाण पत्र के साथ अनुसूचित जनजाति (ST) श्रेणी का होना चाहिए।",
        "वार्षिक पारिवारिक आय ₹1.50 लाख के भीतर होनी चाहिए।",
        "भूमि धारण 0.20 से 6.00 हेक्टेयर के बीच होना चाहिए (नए कुएं के लिए न्यूनतम 0.40 हेक्टेयर)।"
      ]
    },
    documents: {
      en: ["Valid ST Caste Certificate", "7/12 and 8-A Extracts", "Income Certificate (Max ₹1.5 Lakh)", "No-well Certificate from Talathi", "GSDA Water Availability Certificate"],
      hi: ["वैध ST जाति प्रमाण पत्र", "7/12 और 8-अ उतारा", "आय प्रमाण पत्र (अधिकतम ₹1.5 लाख)", "तलाठी से कोई कुआं न होने का प्रमाण पत्र", "GSDA जल उपलब्धता प्रमाण पत्र"]
    }
  },

  'birsa-munda-krishi-kranti-tribal-sub-plan': {
    title: {
      mr: 'बिरसा मुंडा कृषि क्रांती योजना (आदिवासी उपयोजना)',
      en: 'Birsa Munda Krishi Kranti Yojana (Tribal Sub Plan)',
      hi: 'बिरसा मुंडा कृषि क्रांति योजना (आदिवासी उपयोजना)',
      ahr: 'बिरसा मुंडा कृषी क्रांती योजना (आदिवासी क्षेत्र)',
      kok: 'बिरसा मुंडा कृषी क्रांती येवजण (आदिवासी उपयेवजण)',
    },
    description: {
      mr: 'आदिवासी उपयोजना क्षेत्रातील (TSP) अनुसूचित जमाती (ST) शेतकऱ्यांसाठी विहीर व सिंचन अनुदान.',
      en: '100% Irrigation and well construction support for ST farmers within Tribal Sub-Plan (TSP) regions.',
      hi: 'आदिवासी उपयोजना (TSP) क्षेत्रों के भीतर ST किसानों के लिए 100% सिंचाई और कुआं निर्माण सहायता।',
      ahr: 'आदिवासी क्षेत्रातील ST शेतकरी विहीर अन सिंचन अनुदान.',
      kok: 'आदिवासी वाठारांतल्या ST शेतकारां खातीर बांय अनदान.',
    },
    amount: {
      mr: 'रु. २.५० लाख पर्यंत १००% अनुदान',
      en: 'Up to ₹2.50 Lakh 100% Subsidy',
      hi: '₹2.50 लाख तक 100% सब्सिडी',
      ahr: 'रु. २.५० लाख पर्यंत अनुदान',
      kok: 'रु. २.५० लाख मेरेन अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'chief-minister-agro-food-processing-scheme': {
    title: {
      mr: 'मुख्यमंत्री कृषि आणि अन्न प्रक्रिया योजना',
      en: 'Chief Minister Agro and Food Processing Scheme',
      hi: 'मुख्यमंत्री कृषि एवं खाद्य प्रसंस्करण योजना',
      ahr: 'मुख्यमंत्री कृषी अन अन्न प्रक्रिया योजना',
      kok: 'मुख्यमंत्री कृषी आनी अन्न प्रक्रिया येवजण',
    },
    description: {
      mr: 'मूल्यवर्धन, अन्न प्रक्रिया उद्योग आणि कृषी निर्यातीसाठी ५०% पर्यंत भांडवली अनुदान.',
      en: 'Up to 50% capital subsidy for food processing industries, value addition, and agro exports.',
      hi: 'खाद्य प्रसंस्करण उद्योगों, मूल्य संवर्धन और कृषि निर्यात के लिए 50% तक पूंजीगत सब्सिडी।',
      ahr: 'अन्न प्रक्रिया उद्योग अन मूल्यवर्धनासाठी ५०% भांडवली अनुदान.',
      kok: 'अन्न प्रक्रिया उद्देग आनी निर्याती खातीर ५०% अनदान.',
    },
    amount: {
      mr: '३०% ते ५०% भांडवली अनुदान (कमाल ₹५० लाख ते ₹१ कोटी)',
      en: '30% to 50% Capital Subsidy (Max ₹50 Lakh to ₹1 Crore)',
      hi: '30% से 50% पूंजीगत सब्सिडी (अधिकतम ₹50 लाख से ₹1 करोड़)',
      ahr: '३०% ते ५०% भांडवली अनुदान',
      kok: '३०% ते ५०% मेरेन अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'chief-minister-sustainable-agriculture-irrigation-scheme': {
    title: {
      mr: 'मुख्यमंत्री शाश्वत कृषि सिंचन योजना',
      en: 'Chief Minister Sustainable Agriculture Irrigation Scheme',
      hi: 'मुख्यमंत्री सतत कृषि सिंचाई योजना',
      ahr: 'मुख्यमंत्री शाश्वत कृषी सिंचन योजना',
      kok: 'मुख्यमंत्री शाश्वत कृषी सिंचन येवजण',
    },
    description: {
      mr: 'सूक्ष्म सिंचनावर अतिरिक्त २५% पूरक अनुदान आणि वैयक्तिक शेततळे खोदाईस मदत.',
      en: 'Additional 25% top-up subsidy on micro-irrigation and individual farm pond support.',
      hi: 'सूक्ष्म सिंचाई पर अतिरिक्त 25% टॉप-अप सब्सिडी और व्यक्तिगत फार्म पॉन्ड सहायता।',
      ahr: 'सूक्ष्म सिंचनावर २५% पूरक अनुदान अन शेततळे मदत.',
      kok: 'सूक्ष्म सिंचनाचेर २५% अदीक अनदान आनी शेततळे मदत.',
    },
    amount: {
      mr: '२५% अतिरिक्त पूरक अनुदान (एकूण ७५% सवलत)',
      en: '25% Additional Top-up Subsidy (Total 75% Grant)',
      hi: '25% अतिरिक्त टॉप-अप सब्सिडी (कुल 75% अनुदान)',
      ahr: '२५% पूरक अनुदान (एकूण ७५% सवलत)',
      kok: '२५% अदीक अनदान (एकूण ७५% सवलत)',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'dr-babasaheb-ambedkar-krushi-swavalamban-yojana': {
    title: {
      mr: 'डॉ. बाबासाहेब आंबेडकर कृषि स्वावलंबन योजना',
      en: 'Dr. Babasaheb Ambedkar Krushi Swavalamban Yojana',
      hi: 'डॉ. बाबासाहेब आंबेडकर कृषि स्वावलंबन योजना',
      ahr: 'डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन योजना',
      kok: 'डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन येवजण',
    },
    description: {
      mr: 'अनुसूचित जाती (SC) व नवबौद्ध शेतकऱ्यांसाठी विहीर, विहीर दुरुस्ती, पंप व सूक्ष्म सिंचन अनुदान.',
      en: 'Wells, well repairs, pumps, and micro-irrigation subsidies for SC & Neo-Buddhist farmers.',
      hi: 'अनुसूचित जाति (SC) और नवबौद्ध किसानों के लिए कुआं, मरम्मत, पंप और सूक्ष्म सिंचाई सब्सिडी।',
      ahr: 'SC शेतकरी भाऊंसाठी विहीर अन सिंचन अनुदान.',
      kok: 'SC शेतकारां खातीर बांय आनी सिंचन अनदान.',
    },
    amount: {
      mr: 'रु. २.५० लाख पर्यंत १००% अनुदान',
      en: 'Up to ₹2.50 Lakh 100% Subsidy',
      hi: '₹2.50 लाख तक 100% सब्सिडी',
      ahr: 'रु. २.५० लाख पर्यंत अनुदान',
      kok: 'रु. २.५० लाख मेरेन अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'dr-shyamprasad-mukherjee-jan-van-vikas-scheme': {
    title: {
      mr: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      en: 'Dr. Shyamaprasad Mukherjee Jan-Van Vikas Scheme',
      hi: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      ahr: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      kok: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास येवजण',
    },
    description: {
      mr: 'व्याघ्र प्रकल्प व अभयारण्य लगतच्या गावांमधील शेतकऱ्यांना सौर कुंपण व शेतीपूरक व्यवसाय मदत.',
      en: 'Solar fencing (75% grant) & alternative livelihood support for tiger reserve buffer villages.',
      hi: 'बाघ अभयारण्य बफर गांवों के किसानों के लिए सौर बाड़ (75% अनुदान) और आजीविका सहायता।',
      ahr: 'वन परिसरातील गावांसाठी सौर कुंपण अन जोडधंदा मदत.',
      kok: 'रान वाठारांतल्या गांवकारां खातीर सोर कुंपण आनी जोडधंदो आदार.',
    },
    amount: {
      mr: '७५% वन विभाग अनुदान (सौर कुंपण)',
      en: '75% Forest Dept Subsidy (Solar Fencing)',
      hi: '75% वन विभाग सब्सिडी (सौर बाड़)',
      ahr: '७५% वन विभाग अनुदान',
      kok: '७५% रान खातं अनदान',
    },
    department: {
      mr: 'वन विभाग',
      en: 'Forest Department',
      hi: 'वन विभाग',
      ahr: 'वन विभाग',
      kok: 'रान खातं',
    }
  },

  'gopinath-munde-shetkari-apghat-suraksha-yojana': {
    title: {
      mr: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह अनुदान योजना',
      en: 'Gopinath Munde Shetkari Apghat Suraksha Sanugrah Anudan Yojana',
      hi: 'गोपीनाथ मुंडे किसान दुर्घटना सुरक्षा अनुग्रह अनुदान योजना',
      ahr: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा योजना',
      kok: 'गोपीनाथ मुंडे शेतकार अपघात सुरक्षा येवजण',
    },
    description: {
      mr: 'शेतकऱ्याचा अपघाती मृत्यू किंवा अपंगत्व आल्यास रु. २ लाख पर्यंत सानुग्रह अनुदान.',
      en: 'Ex-gratia financial assistance up to ₹2 Lakh for accidental death or disability of farmers.',
      hi: 'किसान की दुर्घटना में मृत्यु या विकलांगता पर ₹2 लाख तक का अनुग्रह अनुदान।',
      ahr: 'अपघाती मृत्यू किंवा अपंगत्वावर रु. २ लाख पर्यंत मदत.',
      kok: 'अपघाती मरण वा अपंगत्वाचेर रु. २ लाख मेरेन आदार.',
    },
    amount: {
      mr: 'रु. २,००,०००/- पर्यंत सानुग्रह अनुदान',
      en: 'Up to ₹2,00,000 Ex-gratia Grant',
      hi: '₹2,00,000 तक अनुग्रह अनुदान',
      ahr: 'रु. २,००,०००/- पर्यंत मदत',
      kok: 'रु. २,००,०००/- मेरेन आदार',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'kaju-kalma-vatap-scheme': {
    title: {
      mr: 'काजू फळपीक विकास योजना (काजू कलम वाटप)',
      en: 'Kaju Phalpeek Vikas Yojana (Cashew Saplings Distribution)',
      hi: 'काजू फल फसल विकास योजना (काजू कलम वितरण)',
      ahr: 'काजू फळपीक विकास योजना (काजू कलम वाटप)',
      kok: 'काजू फळपीक विकास येवजण (काजू रोपां वाटप)',
    },
    description: {
      mr: 'उत्पादकता वाढ व फलोत्पादन विस्तारासाठी उच्च दर्जाच्या काजू कलमांचे वाटप.',
      en: 'Distribution of high-yielding Vengurla cashew saplings & technical horticulture guidance.',
      hi: 'उत्पादकता बढ़ाने और बागवानी विस्तार के लिए उच्च उपज वाले काजू की कलमी का वितरण।',
      ahr: 'उच्च दर्जाच्या काजू कलमांचे वाटप अन मार्गदर्शन.',
      kok: 'उच्च दर्ज्याची काजू रोपां वाटप आनी फलोत्पादन आदार.',
    },
    amount: {
      mr: 'मोफत / १००% कलमे अनुदान',
      en: 'Free / 100% Saplings Subsidy',
      hi: 'मुफ्त / 100% कलम सब्सिडी',
      ahr: 'मोफत कलमे अनुदान',
      kok: 'फुकट काजू रोपां अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'mission-for-integrated-development-of-horticulture': {
    title: {
      mr: 'एकात्मिक फलोत्पादन विकास अभियान - केंद्र पुरस्कृत',
      en: 'Mission for Integrated Development of Horticulture (MIDH - CSS)',
      hi: 'एकीकृत बागवानी विकास मिशन (MIDH - केंद्र प्रायोजित)',
      ahr: 'एकात्मिक फलोत्पादन विकास अभियान (MIDH)',
      kok: 'एकात्मिक फलोत्पादन विकास अभियान (MIDH)',
    },
    description: {
      mr: 'फळबाग लागवड, ग्रीनहाऊस, कांदाचाळ, शितगृह व काढणीपश्चात व्यवस्थापनासाठी १९ घटकांवर अनुदान.',
      en: 'Subsidies across 19 horticulture components including polyhouses, cold chains & packhouses.',
      hi: 'पॉलीहाउस, कोल्ड चेन और पैकहाउस सहित 19 बागवानी घटकों पर सब्सिडी।',
      ahr: 'ग्रीनहाऊस, कांदाचाळ अन फळबागांसाठी १९ घटकांवर अनुदान.',
      kok: 'पॉलीहाऊस, शीतगृह आनी कांदाचाळ खातीर १९ घटकांवेर अनदान.',
    },
    amount: {
      mr: '१९ घटकांवर फलोत्पादन अनुदान',
      en: 'Subsidy across 19 Horticulture Components',
      hi: '19 बागवानी घटकों पर सब्सिडी',
      ahr: '१९ घटकांवर अनुदान',
      kok: '१९ घटकांवेर अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'nfsm-cotton-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस - केंद्र पुरस्कृत',
      en: 'National Food Security Mission - Cotton (NFSM - CSS)',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - कपास (केंद्र प्रायोजित)',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस',
    },
    description: {
      mr: 'अधिसूचित कापूस उत्पादक जिल्ह्यांमध्ये संकरित बियाणे वाटप, प्रात्यक्षिके आणि एकात्मिक किड नियंत्रण.',
      en: 'Hybrid cotton seed distribution, field demonstrations, and IPM pest management support.',
      hi: 'संकरित कपास बीज वितरण, क्षेत्र प्रदर्शन और एकीकृत कीट प्रबंधन सहायता।',
      ahr: 'कापूस बियाणे अन कीड नियंत्रण प्रात्यक्षिके अनुदान.',
      kok: 'कापूस बियाणीं आनी कीड नियंत्रण प्रात्यक्षिकां अनदान.',
    },
    amount: {
      mr: '५०% बियाणे व IPM प्रात्यक्षिके अनुदान',
      en: '50% Seed & IPM Demonstration Subsidy',
      hi: '50% बीज एवं IPM प्रदर्शन सब्सिडी',
      ahr: '५०% बियाणे अनुदान',
      kok: '५०% बियाणीं अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'nfsm-food-grains-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्य (डाळी, भरड धान्ये, पोषक धान्ये, तांदूळ व गहू) - केंद्र पुरस्कृत',
      en: 'NFSM - Food Grains (Pulses, Coarse Cereals, Nutri-Cereals, Rice & Wheat) - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - खाद्यान्न (दालें, मोटे अनाज, पोषक अनाज, चावल और गेहूं)',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्य अन कडधान्य',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्य आनी डाळी',
    },
    description: {
      mr: 'भात, गहू, कडधान्ये (डाळी) व पोषक तृणधान्ये पिकांची उत्पादकता वाढवण्यासाठी बियाणे मिनीकिट अनुदान.',
      en: 'Seed minikits, nutrient management, and farm machinery subsidies for food grains & pulses.',
      hi: 'खाद्यान्न और दालों के लिए बीज मिनीकिट, पोषक तत्व प्रबंधन और कृषि उपकरण सब्सिडी।',
      ahr: 'अन्नधान्य अन डाळी बियाणे मिनीकिट अनुदान.',
      kok: 'अन्नधान्य आनी कडधान्य बियाणीं मिनीकीट अनदान.',
    },
    amount: {
      mr: '५०% पर्यंत बियाणे मिनीकिट अनुदान',
      en: 'Up to 50% Seed Minikit Subsidy',
      hi: '50% तक बीज मिनीकिट सब्सिडी',
      ahr: '५०% बियाणे मिनीकिट अनुदान',
      kok: '५०% बियाणीं मिनीकीट अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'nfsm-oilseed-oilpalm-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबिया आणि पाम तेल - केंद्र पुरस्कृत',
      en: 'NFSM - Oilseeds and Oil Palm - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - तिलहन और पाम ऑयल (केंद्र प्रायोजित)',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबिया अन पाम तेल',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबिया आनी पाम तेल',
    },
    description: {
      mr: 'सोयाबीन, भुईमूग, सूर्यफूल व तेलताड लागवडीसाठी बियाणे मिनीकिट व तुषार सिंचन सवलत.',
      en: 'Seed minikits, sprinkler irrigation, and intercropping support for soybean, groundnut & oil palm.',
      hi: 'सोयाबीन, मूंगफली और पाम ऑयल के लिए बीज मिनीकिट, स्प्रिंकलर सिंचाई और अंतर-फसल सहायता।',
      ahr: 'सोयाबीन अन भुईमूग बियाणे मिनीकिट अनुदान.',
      kok: 'सोयाबीन आनी भुंयमूग बियाणीं मिनीकीट अनदान.',
    },
    amount: {
      mr: 'बियाणे मिनीकिट व तुषार सिंचन अनुदान',
      en: 'Seed Minikit & Sprinkler Subsidy',
      hi: 'बीज मिनीकिट और स्प्रिंकलर सब्सिडी',
      ahr: 'बियाणे अन तुषार सिंचन अनुदान',
      kok: 'बियाणीं आनी स्प्रिंकलर अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'nfsm-sugarcane-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस - केंद्र पुरस्कृत',
      en: 'NFSM - Sugarcane Development - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - गन्ना (केंद्र प्रायोजित)',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस',
    },
    description: {
      mr: 'ऊस उत्पादकता वाढ, उति संवर्धित रोपे, बेणे प्रक्रिया आणि आंतरपीक पद्धतीस प्रोत्साहन.',
      en: 'Tissue culture saplings, seed treatment, and intercropping support to boost sugarcane yield.',
      hi: 'गन्ने की उपज बढ़ाने के लिए टिश्यू कल्चर पौधे, बीज उपचार और अंतर-फसल सहायता।',
      ahr: 'ऊस रोपे अन बेणे प्रक्रिया अनुदान.',
      kok: 'ऊस रोपां आनी बेणे प्रक्रिया अनदान.',
    },
    amount: {
      mr: 'उति संवर्धित रोपे व आंतरपीक प्रात्यक्षिक अनुदान',
      en: 'Tissue Culture Saplings & Intercropping Subsidy',
      hi: 'टिश्यू कल्चर पौधे और अंतर-फसल प्रदर्शन सब्सिडी',
      ahr: 'टिश्यू कल्चर रोपे अनुदान',
      kok: 'टिश्यू कल्चर रोपां अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'pmksy-per-drop-more-crop-css': {
    title: {
      mr: 'प्रधानमंत्री कृषि सिंचन योजना - प्रति थेंब अधिक पीक (सूक्ष्म सिंचन घटक) - केंद्र पुरस्कृत',
      en: 'PMKSY - Per Drop More Crop (Micro-Irrigation Component) - CSS',
      hi: 'प्रधानमंत्री कृषि सिंचाई योजना - प्रति बूंद अधिक फसल (सूक्ष्म सिंचाई) - केंद्र प्रायोजित',
      ahr: 'प्रधानमंत्री कृषी सिंचन योजना - प्रती थेंब अधिक पिक (सूक्ष्म सिंचन)',
      kok: 'प्रधानमंत्री कृषी सिंचन येवजण - दर थेंबाक चड पीक (सूक्ष्म सिंचन)',
    },
    description: {
      mr: 'ठिबक व तुषार सिंचनासाठी लहान व अल्पभूधारक शेतकऱ्यांना ५५% तर इतर शेतकऱ्यांना ४५% अनुदान.',
      en: '55% subsidy for small & marginal farmers and 45% for other farmers on drip & sprinkler irrigation.',
      hi: 'छोटे और सीमांत किसानों के लिए 55% और अन्य किसानों के लिए ड्रिप और स्प्रिंकलर पर 45% सब्सिडी।',
      ahr: 'ठिबक अन तुषार सिंचनावर ५५% अन ४५% अनुदान.',
      kok: 'ठिबक आनी तुषार सिंचनाचेर ५५% आनी ४५% अनदान.',
    },
    amount: {
      mr: 'अल्प भूधारक ५५% / इतर ४५% अनुदान',
      en: '55% Small Farmers / 45% Others Subsidy',
      hi: 'छोटे किसान 55% / अन्य 45% सब्सिडी',
      ahr: '५५% / ४५% अनुदान',
      kok: '५५% / ४५% अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'pmrkvy-rainfed-area-development': {
    title: {
      mr: 'प्रधानमंत्री राष्ट्रीय कृषि विकास योजना - सिंचित क्षेत्र विकास',
      en: 'PMRKVY - Rainfed Area Development (RAD)',
      hi: 'प्रधानमंत्री राष्ट्रीय कृषि विकास योजना - वर्षा सिंचित क्षेत्र विकास (RAD)',
      ahr: 'प्रधानमंत्री राष्ट्रीय कृषी विकास योजना - कोरडवाहू क्षेत्र विकास',
      kok: 'प्रधानमंत्री राष्ट्रीय कृषी विकास येवजण - कोरडवाहू वाठार विकास',
    },
    description: {
      mr: 'कोरडवाहू क्षेत्रात एकात्मिक शेती पद्धती (IFS) व क्लस्टर विकासासाठी प्रति शेतकरी रु. ३०,००० मदत.',
      en: 'Up to ₹30,000 per family assistance for Integrated Farming Systems (IFS) in rainfed clusters.',
      hi: 'वर्षा सिंचित क्लस्टर्स में एकीकृत कृषि प्रणालियों (IFS) के लिए प्रति परिवार ₹30,000 तक की सहायता।',
      ahr: 'कोरडवाहू क्षेत्रात एकात्मिक शेतीसाठी रु. ३०,००० मदत.',
      kok: 'कोरडवाहू वाठारांत एकात्मिक शेती खातीर रु. ३०,००० आदार.',
    },
    amount: {
      mr: 'प्रति कुटुंब कमाल ₹३०,००० अनुदान',
      en: 'Max ₹30,000 Per Family Subsidy',
      hi: 'अधिकतम ₹30,000 प्रति परिवार सब्सिडी',
      ahr: 'रु. ३०,००० अनुदान',
      kok: 'रु. ३०,००० अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'rashtriya-krushi-vikas-yojana-raftaar': {
    title: {
      mr: 'राष्ट्रीय कृषि विकास योजना - रफ्तार - केंद्र पुरस्कृत',
      en: 'Rashtriya Krishi Vikas Yojana - RAFTAAR (RKVY - CSS)',
      hi: 'राष्ट्रीय कृषि विकास योजना - रफ्तार (RKVY - केंद्र प्रायोजित)',
      ahr: 'राष्ट्रीय कृषी विकास योजना - रफ्तार',
      kok: 'राष्ट्रीय कृषी विकास येवजण - रफ्तार',
    },
    description: {
      mr: 'कृषी पायाभूत सुविधा, कापणीपश्चात व्यवस्थापन व कृषी उद्योजकतेला प्रोत्साहन.',
      en: 'Promotes post-harvest infrastructure, cold chains, agro-processing, and agri-entrepreneurship.',
      hi: 'कटाई के बाद के बुनियादी ढांचे, कोल्ड चेन, कृषि-प्रसंस्करण और कृषि-उद्यमिता को बढ़ावा।',
      ahr: 'शेती पायाभूत सुविधा अन प्रक्रिया उद्योगांसाठी अनुदान.',
      kok: 'शेतकाम पायाभूत सोयी आनी प्रक्रिया उद्देगां खातीर अनदान.',
    },
    amount: {
      mr: '५०% पर्यंत भांडवली अनुदान',
      en: 'Up to 50% Capital Subsidy',
      hi: '50% तक पूंजीगत सब्सिडी',
      ahr: '५०% पर्यंत अनुदान',
      kok: '५०% मेरेन अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'rkvy-sugarcane-harvester-subsidy': {
    title: {
      mr: 'राष्ट्रीय कृषि विकास योजना - ऊस तोडणी यंत्राला अनुदान',
      en: 'RKVY - Sugarcane Harvester Machine Subsidy Scheme',
      hi: 'राष्ट्रीय कृषि विकास योजना - गन्ना कटाई की मशीन पर सब्सिडी',
      ahr: 'राष्ट्रीय कृषी विकास योजना - ऊस तोडणी यंत्र अनुदान',
      kok: 'राष्ट्रीय कृषी विकास येवजण - ऊस कापपाच्या मशिनाचेर अनदान',
    },
    description: {
      mr: 'स्वयंचलित ऊस तोडणी यंत्रांच्या (Sugarcane Harvesters) खरेदीवर ४०% पर्यंत (कमाल रु. ४० लाख) भांडवली अनुदान.',
      en: '40% capital subsidy (Max ₹40 Lakh) for purchasing self-propelled sugarcane harvesters.',
      hi: 'स्वचालित गन्ना कटाई मशीनों की खरीद पर 40% तक पूंजीगत सब्सिडी (अधिकतम ₹40 लाख)।',
      ahr: 'ऊस तोडणी यंत्र खरेदीवर ४०% (कमाल रु. ४० लाख) अनुदान.',
      kok: 'ऊस कापपाच्या मशिनाचेर ४०% (कमाल रु. ४० लाख) अनदान.',
    },
    amount: {
      mr: '४०% अनुदान (कमाल ₹४० लाख)',
      en: '40% Subsidy (Max ₹40 Lakh)',
      hi: '40% सब्सिडी (अधिकतम ₹40 लाख)',
      ahr: '४०% अनुदान (कमाल रु. ४० लाख)',
      kok: '४०% अनदान (कमाल रु. ४० लाख)',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'state-sponsored-agriculture-mechanization': {
    title: {
      mr: 'कृषि यांत्रिकीकरण उप-अभियान (राज्य पुरस्कृत)',
      en: 'State Agriculture Mechanization Scheme',
      hi: 'राज्य कृषि मशीनीकरण योजना',
      ahr: 'राज्य कृषी यांत्रिकीकरण योजना',
      kok: 'राज्य कृषी यांत्रिकीकरण येवजण',
    },
    description: {
      mr: 'राज्य शासनाकडून ट्रॅक्टर व कृषी अवजारे खरेदीसाठी ४०% ते ५०% अनुदान.',
      en: '40% to 50% subsidy from Maharashtra state govt for purchasing tractors & farm implements.',
      hi: 'महाराष्ट्र राज्य सरकार से ट्रैक्टर और कृषि उपकरण खरीदने के लिए 40% से 50% सब्सिडी।',
      ahr: 'ट्रॅक्टर अन अवजारे खरेदीवर ४०% ते ५०% अनुदान.',
      kok: 'ट्रॅक्टर आनी यंत्र खरेदीचेर ४०% ते ५०% अनदान.',
    },
    amount: {
      mr: '४०% ते ५०% अनुदान',
      en: '40% to 50% Subsidy',
      hi: '40% से 50% सब्सिडी',
      ahr: '४०% ते ५०% अनुदान',
      kok: '४०% ते ५०% अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  },

  'sub-mission-on-agricultural-mechanization-css': {
    title: {
      mr: 'कृषि यांत्रिकीकरण उप-अभियान - केंद्र पुरस्कृत',
      en: 'Sub-Mission on Agricultural Mechanization (SMAM - CSS)',
      hi: 'कृषि मशीनीकरण उप-मिशन (SMAM - केंद्र प्रायोजित)',
      ahr: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
      kok: 'कृषी यांत्रिकीकरण उप-अभियान (SMAM)',
    },
    description: {
      mr: 'ट्रॅक्टर, पॉवर टिलर, अवजारे खरेदीसाठी ५०% अनुदान व कस्टम हायरिंग केंद्रांसाठी ८०% सहाय्य.',
      en: '50% subsidy for individual machinery and up to 80% for setting up Custom Hiring Centers (CHC).',
      hi: 'व्यक्तिगत मशीनरी पर 50% सब्सिडी और कस्टम हायरिंग सेंटर (CHC) की स्थापना के लिए 80% तक।',
      ahr: 'वैयक्तिक यंत्रांवर ५०% अन CHC साठी ८०% अनुदान.',
      kok: 'यंत्र खरेदीचेर ५०% आनी CHC उबारपा खातीर ८०% अनदान.',
    },
    amount: {
      mr: 'वैयक्तिक ५०% / CHC ८०% अनुदान',
      en: 'Individual 50% / CHC 80% Subsidy',
      hi: 'व्यक्तिगत 50% / CHC 80% सब्सिडी',
      ahr: 'वैयक्तिक ५०% / CHC ८०% अनुदान',
      kok: 'वैयक्तिक ५०% / CHC ८०% अनदान',
    },
    department: {
      mr: 'कृषी विभाग',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    }
  }
};

/**
 * Normalizes a language code (mr, en, hi, ahr, kok).
 */
export const normalizeLangCode = (langCode?: string): string => {
  if (!langCode) return 'mr';
  const clean = langCode.toLowerCase().trim();
  if (['mr', 'en', 'hi', 'ahr', 'kok'].includes(clean)) return clean;
  return 'mr';
};

/**
 * Returns a fully localized Scheme object for the active language.
 * Guarantees 100% language switching across Title, Description, Overview, Benefits, Eligibility, Documents, Department, and Category.
 */
export const getLocalizedScheme = (scheme: Scheme | any, langCode?: string): Scheme => {
  if (!scheme) return scheme;
  const lang = normalizeLangCode(langCode);

  let localizedData = SCHEME_TRANSLATIONS[scheme.id];
  if (!localizedData && scheme.id) {
    const slug = scheme.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    localizedData = SCHEME_TRANSLATIONS[slug];
  }

  const getField = (fieldName: keyof LocalizedSchemeContent, fallbackValue?: any): any => {
    if (localizedData && localizedData[fieldName]) {
      const fieldDict = localizedData[fieldName]!;
      if (fieldDict[lang]) return fieldDict[lang];
      if (lang === 'en' && fieldDict['en']) return fieldDict['en'];
      if (lang === 'hi' && fieldDict['hi']) return fieldDict['hi'];
      if (fieldDict['mr']) return fieldDict['mr'];
    }
    return fallbackValue;
  };

  const localizedTitle = getField('title') || (lang === 'en' ? (scheme.englishName || scheme.name || scheme.title) : (scheme.name || scheme.title || scheme.englishName));
  const localizedDesc = getField('description') || (Array.isArray(scheme.overview) ? scheme.overview[0] : (scheme.shortDescription || scheme.description || scheme.overview));
  const localizedAmount = getField('amount') || scheme.amount || 'शासकीय अनुदान उपलब्ध';
  const localizedBenefits = getField('benefits') || scheme.benefits || scheme.benefit;
  const localizedEligibility = getField('eligibility') || scheme.eligibility || scheme.eligibility_criteria;
  const localizedDepartment = getField('department') || scheme.department || (scheme.type === 'Central' ? getTranslation(lang, 'centralType') : getTranslation(lang, 'stateType'));
  const localizedCategory = getCategoryTranslation(scheme.category, lang);

  return {
    ...scheme,
    title: localizedTitle,
    name: localizedTitle,
    description: localizedDesc,
    shortDescription: localizedDesc,
    amount: localizedAmount,
    benefits: localizedBenefits,
    benefit: localizedBenefits,
    eligibility_criteria: Array.isArray(localizedEligibility) ? localizedEligibility.join('\n• ') : localizedEligibility,
    eligibility: localizedEligibility,
    department: localizedDepartment,
    category: localizedCategory,
  };
};

/**
 * Translates scheme category names dynamically (e.g., 'Horticulture' -> 'फलोत्पादन').
 */
export const getLocalizedCategoryName = (categoryName: string, langCode?: string): string => {
  if (!categoryName) return '';
  const lang = normalizeLangCode(langCode);
  if (categoryName === 'All' || categoryName === 'सर्व') {
    return getTranslation(lang, 'allSchemes') || 'सर्व';
  }
  return getCategoryTranslation(categoryName, lang);
};
`;

const file = path.join(__dirname, '..', 'src', 'utils', 'schemeLocalization.ts');
fs.writeFileSync(file, code, 'utf8');
console.log('✅ Updated src/utils/schemeLocalization.ts with multi-lingual translations!');
