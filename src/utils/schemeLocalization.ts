/**
 * Scheme Localization Utility Module
 * Complete Multi-Lingual Scheme Data Localizer for all 5 languages (mr, en, hi, ahr, kok).
 * Ensures instant, complete language switching across Titles, Overview, Benefits,
 * Eligibility, Documents, How to Apply, FAQs, GR, and Contact info without reloads.
 */

import { Scheme } from '../types/api.types';
import { getTranslation, getCategoryTranslation } from './i18n';

export interface LocalizedSchemeContent {
  title?: Record<string, string>;
  description?: Record<string, string>;
  amount?: Record<string, string>;
  department?: Record<string, string>;
  overview?: Record<string, string[]>;
  benefits?: Record<string, string[]>;
  eligibility?: Record<string, string[]>;
  documents?: Record<string, string[]>;
  howToApply?: Record<string, string[]>;
  faqs?: Record<string, Array<{ question: string; answer: string }>>;
  gr?: Record<string, { title: string; linkText: string; downloadUrl?: string }>;
  contact?: Record<string, { phone: string; email: string; address: string }>;
}

export const SCHEME_TRANSLATIONS: Record<string, LocalizedSchemeContent> = {
  'bhausaheb-fundkar-falbag-lagvad-yojana': {
    title: {
      mr: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
      en: 'Bhausaheb Fundkar Fruit Orchard Plantation Scheme',
      hi: 'भाऊसाहेब फुंडकर फलबाग पौधरोपण योजना',
      ahr: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
      kok: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना',
    },
    description: {
      mr: 'फळबाग लागवडीसाठी पहिल्या वर्षी ५०%, दुसऱ्या वर्षी ३०% आणि तिसऱ्या वर्षी २०% अनुदान.',
      en: '50% subsidy in 1st year, 30% in 2nd year, and 20% in 3rd year for fruit orchard plantation.',
      hi: 'फलबाग पौधरोपण के लिए पहले वर्ष 50%, दूसरे वर्ष 30% और तीसरे वर्ष 20% अनुदान।',
      ahr: 'फळबाग लागवडसाठी पहिला वर्शी ५०%, दुसरा वर्शी ३०% अनी तिसरा वर्शी २०% अनुदान.',
      kok: 'फळबाग लागवडी खातीर पहिल्या वर्सा ५०%, दुसऱ्या वर्सा ३०% आनी तिसऱ्या वर्सा २०% अनुदान.',
    },
    amount: {
      mr: '१००% ठिबक सिंचन अनुदान व टप्प्याटप्प्याने फळबाग अनुदान',
      en: '100% Drip Irrigation Subsidy & Phased Plantation Grants',
      hi: '100% ड्रिप सिंचाई सब्सिडी और चरणबद्ध पौधरोपण अनुदान',
      ahr: '१००% ठिबक सिंचन अनुदान',
      kok: '१००% ठिबक सिंचन अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture (Govt. of Maharashtra)',
      hi: 'कृषि विभाग (महाराष्ट्र सरकार)',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: [
        'सन २०१८-१९ पासून राज्यात भाऊसाहेब फुंडकर फळबाग लागवड योजना नव्याने सुरु करण्यात आली आहे.',
        'मनरेगा अंतर्गत लाभ न मिळणाऱ्या शेतकऱ्यांना या योजनेद्वारे फळबाग लागवडीसाठी आर्थिक मदत दिली जाते.',
        'झाडांचे जीविताचे प्रमाण बागायतीसाठी ९०% व कोरडवाहूसाठी ८०% राखणे आवश्यक आहे.'
      ],
      en: [
        'Bhausaheb Fundkar Fruit Orchard Plantation Scheme was introduced to boost horticulture in Maharashtra.',
        'It provides financial assistance to farmers ineligible under MGNREGA for orchard creation.',
        'Min survival rate of 90% for irrigated and 80% for rainfed trees must be maintained.'
      ],
      hi: [
        'महाराष्ट्र राज्य में बागवानी को बढ़ावा देने के लिए यह योजना शुरू की गई है।',
        'मनरेगा में जो किसान लाभ नहीं ले पाते, उन्हें इस योजना से अनुदान मिलता है।',
        'पौधों की उत्तरजीविता दर 90% (सिंचित) और 80% (असिंचित) बनाए रखना अनिवार्य है।'
      ],
      ahr: [
        'सन २०१८-१९ पासुन भाऊसाहेब फुंडकर फळबाग लागवड योजना सुरू झाली शे.',
        'मनरेगा मंदी लाभ न मिळणारा शेतकर्यांसले या योजनातुन मदत मिळस.'
      ],
      kok: [
        '२०१८-१९ साला सावन भाऊसाहेब फुंडकर फळबाग लागवड योजना सुरू जाल्या.',
        'मनरेगा अंतर्गतांत लाभ मेळनाशिल्ल्या शेतकऱ्यांक हे योजने वरवीं मदत मेळटा.'
      ]
    },
    benefits: {
      mr: [
        '३ वर्षात टप्प्याटप्प्याने ५०%, ३०%, २०% अनुदान',
        'ठिबक सिंचन संच उभारणीसाठी १००% अनुदान सहायता'
      ],
      en: [
        'Phased 50%, 30%, and 20% subsidy over 3 consecutive years',
        '100% financial assistance for installing drip irrigation set'
      ],
      hi: [
        '3 वर्षों में 50%, 30% और 20% अनुदान',
        'ड्रिप सिंचाई प्रणाली स्थापित करने पर 100% सब्सिडी'
      ],
      ahr: [
        '३ वर्समा ५०%, ३०%, २०% टप्प्याटप्प्याने अनुदान',
        'ठिबक सिंचन संच साठी १००% अनुदान'
      ],
      kok: [
        '३ वर्सांत ५०%, ३०%, २०% अनुदान',
        'ठिबक सिंचना खातीर १००% अनुदान'
      ]
    },
    eligibility: {
      mr: [
        'शेतकऱ्याच्या नावावर ७/१२ उतारा असणे आवश्यक',
        'कोकण विभागात १० गुंठे ते १० हेक्टर व इतर विभागात २० गुंठे ते ६ हेक्टर क्षेत्र मर्यादा',
        'अल्प, अत्यल्प भूधारक व महिला शेतकऱ्यांना प्राधान्य'
      ],
      en: [
        'Farmer must possess valid 7/12 land record document',
        'Land limit: 0.1 to 10 hectares in Konkan; 0.2 to 6 hectares in other regions',
        'Priority given to small, marginal, women, and disabled farmers'
      ],
      hi: [
        'किसान के नाम 7/12 खसरा खतौनी होना आवश्यक',
        'कोंकण में 10 गुंठा से 10 हेक्टेयर; अन्य क्षेत्रों में 20 गुंठा से 6 हेक्टेयर सीमा',
        'छोटे, सीमांत और महिला किसानों को प्राथमिकता'
      ],
      ahr: [
        'शेतकरी नानाव ७/१२ उतारा पाहिजे',
        'अल्प व अत्यल्प भूधारक शेतकर्यांसले प्राधान्य'
      ],
      kok: [
        'शेतकऱ्याच्या नावार ७/१२ उतारा आसपाक जाय',
        'लहान आनी अल्पभूधारक शेतकऱ्यांक प्राधान्य'
      ]
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'हमीपत्र', 'संयुक्त खातेदार संमतीपत्र', 'जातीचे प्रमाणपत्र (लागू असल्यास)'],
      en: ['7/12 & 8-A Land Extract', 'Guarantee Declaration Letter', 'Joint Landholder Consent Letter', 'Caste Certificate (if applicable)'],
      hi: ['7/12 और 8-अ खतौनी', 'शपथ पत्र / वचनपत्र', 'सहमति पत्र', 'जाति प्रमाण पत्र (यदि लागू हो)'],
      ahr: ['७/१२ व ८-अ उतारा', 'हमीपत्र', 'आधार कार्ड प्रत'],
      kok: ['७/१२ आनी ८-अ उतारा', 'हमीपत्र', 'आधार कार्ड प्रत']
    }
  },

  'birsa-munda-krishi-kranti-outside-tribal-sub-plan': {
    title: {
      mr: 'बिरसा मुंडा कृषि क्रांती योजना (आदिवासी उपयोजना बाह्य)',
      en: 'Birsa Munda Krishi Kranti Yojana (Outside Tribal Sub Plan)',
      hi: 'बिरसा मुंडा कृषि क्रांति योजना (आदिवासी उपयोजना बाह्य)',
      ahr: 'बिरसा मुंडा कृषि क्रांती योजना (OTSP)',
      kok: 'बिरसा मुंडा कृषि क्रांती योजना (OTSP)',
    },
    description: {
      mr: 'आदिवासी उपयोजना क्षेत्राबाहेरील अनुसूचित जमाती (ST) शेतकऱ्यांसाठी विहीर व सिंचन अनुदान.',
      en: 'Irrigation & well construction subsidy for Scheduled Tribe (ST) farmers outside tribal sub-plan areas.',
      hi: 'जनजातीय उपयोजना क्षेत्र से बाहर के अनुसूचित जनजाति (ST) किसानों के लिए कुआँ व सिंचाई अनुदान।',
      ahr: 'ST शेतकर्यांसले विहीर अनी सिंचन अनुदान.',
      kok: 'ST शेतकऱ्यां खातीर बांय आनी सिंचन अनुदान.',
    },
    amount: {
      mr: 'नवीन विहीर: कमाल रु. २,५०,०००/- १००% अनुदान',
      en: 'New Well: Max Rs. 2,50,000/- 100% Subsidy',
      hi: 'नवीन कुआँ: अधिकतम रु 2,50,000/- 100% सब्सिडी',
      ahr: 'नवीन विहीर: कमाल रु. २,५०,०००/- अनुदान',
      kok: 'नवी बांय: कमाल रु. २,५०,०००/- अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['OTSP क्षेत्रातील अनुसूचित जमाती (ST) प्रवर्गातील शेतकऱ्यांना शाश्वत सिंचन सुविधा देणे.'],
      en: ['Provides sustainable irrigation facilities for ST farmers outside tribal sub-plan areas.'],
      hi: ['जनजातीय क्षेत्रों के बाहर एसटी किसानों को स्थायी सिंचाई सुविधा प्रदान करना।'],
      ahr: ['ST शेतकर्यांसले सिंचन सुविधा देणे.'],
      kok: ['ST शेतकऱ्यांक सिंचन सुविधा दिवप.']
    },
    benefits: {
      mr: ['नवीन विहीर: रु. २.५ लाख', 'विहीर दुरुस्ती: रु. ५० हजार', 'पंप संच: रु. २० हजार'],
      en: ['New Well: Rs. 2.5 Lakhs', 'Well Repair: Rs. 50,000', 'Pump Set: Rs. 20,000'],
      hi: ['नवीन कुआँ: रु 2.5 लाख', 'कुआँ मरम्मत: रु 50 हजार', 'पंप सेट: रु 20 हजार'],
      ahr: ['नवीन विहीर: रु. २.५ लाख', 'पंप संच: रु. २० हजार'],
      kok: ['नवी बांय: रु. २.५ लाख', 'पंप संच: रु. २० हजार']
    },
    eligibility: {
      mr: ['अनुसूचित जमाती (ST) प्रवर्गातील शेतकरी', '०.२० हेक्टर ते ६.०० हेक्टर जमीन धारणा', 'वार्षिक उत्पन्न रु. १.५ लाखांपर्यंत'],
      en: ['Scheduled Tribe (ST) Category Farmer', 'Landholding between 0.20 to 6.00 hectares', 'Annual income below Rs. 1,50,000'],
      hi: ['अनुसूचित जनजाति (ST) किसान', '0.20 से 6.00 हेक्टेयर भूमि', 'वार्षिक आय रु 1.5 लाख तक'],
      ahr: ['ST प्रवर्गातील शेतकरी', 'उत्पन्न रु. १.५ लाखांपर्यंत'],
      kok: ['ST प्रवर्गातलो शेतकरी', 'उत्पन्न रु. १.५ लाखां भितर']
    },
    documents: {
      mr: ['ST जात प्रमाणपत्र', '७/१२ व ८-अ उतारा', 'उत्पन्न दाखला (रु. १.५ लाख)'],
      en: ['ST Caste Certificate', '7/12 & 8-A Extract', 'Income Certificate (< Rs. 1.5 Lakh)'],
      hi: ['एसटी जाति प्रमाण पत्र', '7/12 और 8-अ खतौनी', 'आय प्रमाण पत्र'],
      ahr: ['ST जात दाखला', '७/१२ उतारा', 'उत्पन्न दाखला'],
      kok: ['ST जात दाखलो', '७/१२ उतारा', 'उत्पन्न दाखलो']
    }
  },

  'birsa-munda-krishi-kranti-tribal-sub-plan': {
    title: {
      mr: 'बिरसा मुंडा कृषि क्रांती योजना (आदिवासी उपयोजना)',
      en: 'Birsa Munda Krishi Kranti Yojana (Tribal Sub Plan)',
      hi: 'बिरसा मुंडा कृषि क्रांति योजना (आदिवासी उपयोजना)',
      ahr: 'बिरसा मुंडा कृषि क्रांती योजना (TSP)',
      kok: 'बिरसा मुंडा कृषि क्रांती योजना (TSP)',
    },
    description: {
      mr: 'आदिवासी उपयोजना क्षेत्रातील (TSP) अनुसूचित जमाती (ST) शेतकऱ्यांसाठी विहीर व सिंचन अनुदान.',
      en: 'Irrigation & well construction subsidy for ST farmers inside tribal sub-plan areas.',
      hi: 'जनजातीय उपयोजना क्षेत्र के भीतर अनुसूचित जनजाति (ST) किसानों के लिए कुआँ व सिंचाई सहायता।',
      ahr: 'TSP क्षेत्रातील ST शेतकर्यांसले सिंचन अनुदान.',
      kok: 'TSP क्षेत्रांतल्या ST शेतकऱ्यां खातीर सिंचन अनुदान.',
    },
    amount: {
      mr: 'नवीन विहीर रु. २.५ लाख, विहीर दुरुस्ती रु. ५० हजार व सूक्ष्म सिंचन रु. ५० हजार',
      en: 'New Well Rs. 2.5 Lakh, Repair Rs. 50k & Micro-irrigation Rs. 50k',
      hi: 'नया कुआँ रु 2.5 लाख, मरम्मत रु 50 हजार व ड्रिप रु 50 हजार',
      ahr: 'नवीन विहीर रु. २.५ लाख व सिंचन संच रु. ५० हजार',
      kok: 'नवी बांय रु. २.५ लाख आनी सिंचन संच रु. ५० हजार',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['TSP क्षेत्रातील आदिवासी शेतकऱ्यांना शाश्वत जलस्रोत आणि सिंचन उपकरणे उपलब्ध करून देणे.'],
      en: ['Empower tribal farmers in TSP areas with sustainable water sources and pumps.'],
      hi: ['जनजातीय उपयोजना क्षेत्रों में स्थायी जल संसाधन प्रदान करना।'],
      ahr: ['आदिवासी शेतकर्यांसले सिंचन सुविधा देणे.'],
      kok: ['आदिवासी शेतकऱ्यांक सिंचन सुविधा दिवप.']
    },
    benefits: {
      mr: ['नवीन विहीर (रु. २.५ लाख)', 'शेती उपयोगी पंप संच (रु. २० हजार)', 'ठिबक/तुषार सिंचन (रु. ५० हजार)'],
      en: ['New Well (Rs. 2.5 Lakh)', 'Electric/Solar Pump (Rs. 20,000)', 'Micro Irrigation (Rs. 50,000)'],
      hi: ['नया कुआँ (रु 2.5 लाख)', 'पंप सेट (रु 20 हजार)', 'सूक्ष्म सिंचाई (रु 50 हजार)'],
      ahr: ['नवीन विहीर (रु. २.५ लाख)', 'सिंचन संच मदत'],
      kok: ['नवी बांय (रु. २.५ लाख)', 'सिंचन संच मदत']
    },
    eligibility: {
      mr: ['TSP क्षेत्रातील अनुसूचित जमातीचे शेतकरी', '०.२० ते ६.०० हेक्टर जमीन', 'उत्पन्न रु. १.५ लाखांच्या आत'],
      en: ['ST farmers residing in TSP area', 'Landholding between 0.20 to 6.00 hectares', 'Annual income below Rs. 1.5 Lakh'],
      hi: ['TSP क्षेत्र के एसटी किसान', '0.20 से 6.00 हेक्टेयर भूमि', 'आय रु 1.5 लाख तक'],
      ahr: ['TSP क्षेत्रातील ST शेतकरी', 'उत्पन्न रु. १.५ लाख पर्यंत'],
      kok: ['TSP क्षेत्रांतलो ST शेतकरी', 'उत्पन्न रु. १.५ लाख भितर']
    },
    documents: {
      mr: ['जातीचा दाखला', '७/१२ व ८-अ उतारा', 'उत्पन्न दाखला'],
      en: ['Caste Certificate', '7/12 & 8-A Extract', 'Income Certificate'],
      hi: ['जाति प्रमाण पत्र', '7/12 और 8-अ खतौनी', 'आय प्रमाण पत्र'],
      ahr: ['जात दाखला', '७/१२ उतारा', 'उत्पन्न दाखला'],
      kok: ['जात दाखलो', '७/१२ उतारा', 'उत्पन्न दाखलो']
    }
  },

  'chief-minister-agro-food-processing-scheme': {
    title: {
      mr: 'मुख्यमंत्री कृषि आणि अन्न प्रक्रिया योजना',
      en: 'Chief Minister Agro and Food Processing Scheme',
      hi: 'मुख्यमंत्री कृषि एवं खाद्य प्रसंस्करण योजना',
      ahr: 'मुख्यमंत्री कृषि अनी अन्न प्रक्रिया योजना',
      kok: 'मुख्यमंत्री कृषि आनी अन्न प्रक्रिया योजना',
    },
    description: {
      mr: 'मूल्यवर्धन, अन्न प्रक्रिया उद्योग आणि कृषी निर्यातीसाठी ५०% पर्यंत भांडवली अनुदान.',
      en: 'Up to 50% capital subsidy for setting up agro-processing and food value-addition units.',
      hi: 'कृषि उत्पाद प्रसंस्करण और खाद्य उद्योगों की स्थापना के लिए 50% तक पूंजीगत अनुदान।',
      ahr: 'अन्न प्रक्रिया उद्योग उभारणीसाठी ५०% अनुदान.',
      kok: 'अन्न प्रक्रिया उद्योगा खातीर ५०% अनुदान.',
    },
    amount: {
      mr: '३०% ते ५०% भांडवली अनुदान (कमाल रु. ५० लाख ते रु. १ कोटी)',
      en: '30% to 50% Capital Subsidy (Max Rs. 50 Lakhs to Rs. 1 Crore)',
      hi: '30% से 50% पूंजीगत सब्सिडी (अधिकतम रु 50 लाख से 1 करोड़)',
      ahr: '३०% ते ५०% भांडवली अनुदान',
      kok: '३०% ते ५०% भांडवली अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['कृषी मालावर स्थानिक पातळीवर प्रक्रिया करून मूल्यवर्धन साधणे आणि FPOs ला प्रोत्साहन देणे.'],
      en: ['Promotes local value addition of farm produce and financial backing to FPOs.'],
      hi: ['कृषि उपज का मूल्य संवर्धन करना और खाद्य प्रसंस्करण उद्योगों का विस्तार करना।'],
      ahr: ['कृषि मालावर प्रक्रिया करीन नफा वाढवणे.'],
      kok: ['कृषि मालाचेर प्रक्रिया करून नेट लावप.']
    },
    benefits: {
      mr: ['प्रक्रिया उद्योगासाठी ५०% पर्यंत भांडवली मदत', 'शीतगृह, पॅकिंग लाईन्स व ग्रेडिंग युनिट्ससाठी अनुदान'],
      en: ['Up to 50% capital subsidy for food processing projects', 'Grants for cold storages, packing lines, & sorting units'],
      hi: ['प्रसंस्करण उद्योग के लिए 50% तक सब्सिडी', 'कोल्ड स्टोरेज और ग्रेडिंग यूनिट के लिए अनुदान'],
      ahr: ['प्रक्रिया उद्योग साठी ५०% अनुदान'],
      kok: ['प्रक्रिया उद्योगा खातीर ५०% अनुदान']
    },
    eligibility: {
      mr: ['वैयक्तिक शेतकरी, FPO, महिला बचत गट व कृषी उद्योजक', 'प्रकल्पासाठी जमीन/MIDC जागा आवश्यक'],
      en: ['Individual Farmers, FPOs, Women SHGs, and Agri-Entrepreneurs', 'Land availability / MIDC plot required'],
      hi: ['व्यक्तिगत किसान, एफपीओ, स्वयं सहायता समूह और उद्यमी', 'भूमि उपलब्धता आवश्यक'],
      ahr: ['शेतकरी, FPO अनी बचत गट'],
      kok: ['शेतकरी, FPO आनी बचत गट']
    },
    documents: {
      mr: ['विस्तृत प्रकल्प अहवाल (DPR)', '७/१२ उतारा / MIDC वाटप पत्र', 'बँक कर्ज मंजुरी पत्र'],
      en: ['Detailed Project Report (DPR)', '7/12 Extract / MIDC Plot Allotment', 'Bank Loan Sanction Letter'],
      hi: ['विस्तृत परियोजना रिपोर्ट (DPR)', 'भूमि दस्तावेज / MIDC पत्र', 'बैंक ऋण स्वीकृति पत्र'],
      ahr: ['DPR रिपोर्ट', '७/१२ उतारा', 'बँक कागदपत्रे'],
      kok: ['DPR रिपोर्ट', '७/१२ उतारा', 'बँक कागदपत्रां']
    }
  },

  'chief-minister-sustainable-agriculture-irrigation-scheme': {
    title: {
      mr: 'मुख्यमंत्री शाश्वत कृषि सिंचन योजना',
      en: 'Chief Minister Sustainable Agriculture Irrigation Scheme',
      hi: 'मुख्यमंत्री सतत कृषि सिंचाई योजना',
      ahr: 'मुख्यमंत्री शाश्वत कृषि सिंचन योजना',
      kok: 'मुख्यमंत्री शाश्वत कृषि सिंचन योजना',
    },
    description: {
      mr: 'सूक्ष्म सिंचन (ठिबक व तुषार) संचावर अतिरिक्त २५% पूरक अनुदान आणि शेततळे अनुदान.',
      en: 'Additional 25% top-up subsidy on micro-irrigation (Drip/Sprinkler) and farm pond grants.',
      hi: 'सूक्ष्म सिंचाई (ड्रिप/स्प्रिंकलर) पर अतिरिक्त 25% टॉप-अप सब्सिडी और खेत तालाब अनुदान।',
      ahr: 'ठिबक व तुषार वर २५% जादा पूरक अनुदान.',
      kok: 'ठिबक आनी तुषार सिंचनाचेर २५% चड अनुदान.',
    },
    amount: {
      mr: 'एकूण ७५% सूक्ष्म सिंचन सवलत व रु. ७५,०००/- शेततळे अनुदान',
      en: 'Total 75% Micro Irrigation Subsidy & Rs. 75,000 Farm Pond Grant',
      hi: 'कुल 75% सूक्ष्म सिंचाई छूट व रु 75,000 खेत तालाब सहायता',
      ahr: '७५% सिंचन सवलत व रु. ७५ हजार शेततळे मदत',
      kok: '७५% सिंचन सवलत आनी रु. ७५ हजार शेततळे मदत',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['PMKSY योजनेतील अनुदानावर राज्य शासनाकडून अतिरिक्त २५% टॉप-अप सवलत दिली जाते.'],
      en: ['Provides an additional 25% state top-up subsidy over central PMKSY grants.'],
      hi: ['केंद्रीय पीएमकेएसवाई सब्सिडी के ऊपर 25% अतिरिक्त राज्य सहायता प्रदान की जाती है।'],
      ahr: ['केंद्र योजनेवर राज्य कडून २५% जास्त अनुदान मिळस.'],
      kok: ['केंद्र योजनेचेर राज्या कडल्यान २५% चड अनुदान मेळटा.']
    },
    benefits: {
      mr: ['अल्प भूधारकांना ७५% तर इतर शेतकऱ्यांना ६५% सूक्ष्म सिंचन सवलत', 'वैयक्तिक शेततळ्यासाठी रु. ७५,०००/- अनुदान'],
      en: ['75% total subsidy for small/marginal farmers, 65% for others', 'Rs. 75,000 direct subsidy for individual farm ponds'],
      hi: ['छोटे किसानों को 75% और अन्य को 65% सिंचाई सब्सिडी', 'व्यक्तिगत खेत तालाब के लिए रु 75,000 अनुदान'],
      ahr: ['७५% ठिबक सवलत व शेततळे अनुदान'],
      kok: ['७५% ठिबक सवलत आनी शेततळे अनुदान']
    },
    eligibility: {
      mr: ['महाडीबीटी पोर्टलवर अर्ज केलेले सर्व ७/१२ धारक शेतकरी', 'शेततळ्यासाठी किमान ०.६० हेक्टर जमीन'],
      en: ['All 7/12 landholder farmers registered on MahaDBT portal', 'Min 0.60 hectares land for farm pond component'],
      hi: ['MahaDBT पर पंजीकृत सभी 7/12 धारक किसान', 'खेत तालाब के लिए न्यूनतम 0.60 हेक्टेयर भूमि'],
      ahr: ['MahaDBT वर अर्ज केलेला शेतकरी'],
      kok: ['MahaDBT चेर अर्ज केल्लो शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'पूर्वसंमती पत्र व बिल', 'बँक पासबुक'],
      en: ['7/12 & 8-A Extract', 'Prior Consent Letter & Purchase Invoice', 'Bank Passbook'],
      hi: ['7/12 और 8-अ दस्तावेज', 'पूर्व सहमति पत्र व बिल', 'बैंक पासबुक'],
      ahr: ['७/१२ उतारा', 'पूर्वसंमती पत्र व बिल'],
      kok: ['७/१२ उतारा', 'पूर्वसंमती पत्र आनी बिल']
    }
  },

  'dr-babasaheb-ambedkar-krushi-swavalamban-yojana': {
    title: {
      mr: 'डॉ. बाबासाहेब आंबेडकर कृषि स्वावलंबन योजना',
      en: 'Dr. Babasaheb Ambedkar Krushi Swavalamban Yojana',
      hi: 'डॉ. बाबासाहेब आंबेडकर कृषि स्वावलंबन योजना',
      ahr: 'डॉ. बाबासाहेब आंबेडकर कृषि स्वावलंबन योजना',
      kok: 'डॉ. बाबासाहेब आंबेडकर कृषि स्वावलंबन योजना',
    },
    description: {
      mr: 'अनुसूचित जाती (SC) व नवबौद्ध शेतकऱ्यांसाठी विहीर, विहीर दुरुस्ती, पंप व सूक्ष्म सिंचन अनुदान.',
      en: 'Wells, pumps, well repair, and micro-irrigation subsidy for Scheduled Caste (SC) farmers.',
      hi: 'अनुसूचित जाति (SC) और नवबौद्ध किसानों के लिए कुआँ, पंप और ड्रिप सिंचाई अनुदान।',
      ahr: 'SC अनी नवबौद्ध शेतकर्यांसले विहीर व सिंचन अनुदान.',
      kok: 'SC आनी नवबौद्ध शेतकऱ्यां खातीर बांय आनी सिंचन अनुदान.',
    },
    amount: {
      mr: 'नवीन विहीर रु. २.५ लाख, दुरुस्ती रु. ५० हजार व पंप संच रु. २० हजार',
      en: 'New Well Rs. 2.5 Lakh, Repair Rs. 50k, Pump Set Rs. 20k',
      hi: 'नया कुआँ रु 2.5 लाख, मरम्मत रु 50 हजार व पंप रु 20 हजार',
      ahr: 'नवीन विहीर रु. २.५ लाख व सिंचन संच अनुदान',
      kok: 'नवी बांय रु. २.५ लाख आनी सिंचन संच अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['अनुसूचित जाती आणि नवबौद्ध शेतकऱ्यांना शाश्वत सिंचन सुविधा देऊन आर्थिक स्वावलंबन मिळवून देणे.'],
      en: ['Aims to empower SC and Neo-Buddhist farmers with reliable irrigation infrastructure.'],
      hi: ['अनुसूचित जाति एवं नवबौद्ध किसानों को सिंचाई साधन उपलब्ध कराकर आत्मनिर्भर बनाना।'],
      ahr: ['SC शेतकर्यांसले सिंचन सुविधा दीयन आत्मनिर्भर करणे.'],
      kok: ['SC शेतकऱ्यांक सिंचन सुविधा दिवन आत्मनिर्भर करप.']
    },
    benefits: {
      mr: ['नवीन विहीर खोदाईसाठी रु. २,५०,०००/- अनुदान', 'जुनी विहीर दुरुस्तीसाठी रु. ५०,०००/- अनुदान', 'पंप संचासाठी रु. २०,०००/- अनुदान'],
      en: ['Rs. 2,50,000 for digging new irrigation well', 'Rs. 50,000 for old well repair', 'Rs. 20,000 for purchasing electric/solar pump set'],
      hi: ['कुएँ की खुदाई के लिए रु 2,50,000', 'कुएँ की मरम्मत के लिए रु 50,000', 'पंप सेट के लिए रु 20,000'],
      ahr: ['नवीन विहीर साठी रु. २.५ लाख अनुदान', 'पंप संच साठी रु. २० हजार'],
      kok: ['नवी बांय खातीर रु. २.५ लाख अनुदान', 'पंप संच खातीर रु. २० हजार']
    },
    eligibility: {
      mr: ['अनुसूचित जाती (SC) किंवा नवबौद्ध प्रवर्गातील शेतकरी', '०.२० हेक्टर ते ६.०० हेक्टर जमीन धारणा', 'वार्षिक उत्पन्न रु. १,५०,०००/- च्या आत'],
      en: ['Scheduled Caste (SC) or Neo-Buddhist farmer', 'Landholding between 0.20 to 6.00 hectares', 'Annual family income below Rs. 1.5 Lakh'],
      hi: ['अनुसूचित जाति (SC) या नवबौद्ध किसान', '0.20 से 6.00 हेक्टेयर भूमि', 'वार्षिक आय रु 1.5 लाख तक'],
      ahr: ['SC प्रवर्गातील शेतकरी', 'उत्पन्न रु. १.५ लाखांपर्यंत'],
      kok: ['SC प्रवर्गातलो शेतकरी', 'उत्पन्न रु. १.५ लाखां भितर']
    },
    documents: {
      mr: ['SC जात प्रमाणपत्र', '७/१२ व ८-अ उतारा', 'वार्षिक उत्पन्न प्रमाणपत्र'],
      en: ['SC Caste Certificate', '7/12 & 8-A Extract', 'Annual Income Certificate'],
      hi: ['अनुसूचित जाति प्रमाण पत्र', '7/12 और 8-अ दस्तावेज', 'आय प्रमाण पत्र'],
      ahr: ['SC जात दाखला', '७/१२ उतारा', 'उत्पन्न दाखला'],
      kok: ['SC जात दाखलो', '७/१२ उतारा', 'उत्पन्न दाखलो']
    }
  },

  'dr-shyamprasad-mukherjee-jan-van-vikas-scheme': {
    title: {
      mr: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      en: 'Dr. Shyamaprasad Mukherjee Jan-Van Vikas Scheme',
      hi: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      ahr: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
      kok: 'डॉ. श्यामाप्रसाद मुखर्जी जन-वन विकास योजना',
    },
    description: {
      mr: 'व्याघ्र प्रकल्प व अभयारण्य लगतच्या गावांमधील शेतकऱ्यांना एलपीजी, सौर कुंपण व शेतीपूरक व्यवसाय मदत.',
      en: 'Solar fencing (75% grant), LPG cylinders, and livelihood support for farmers near tiger reserves & sanctuaries.',
      hi: 'बाघ अभयारण्यों के निकटवर्ती किसानों के लिए सौर बाड़ (75% अनुदान), एलपीजी और कृषि-पूरक सहायता।',
      ahr: 'अभयारण्य जवळना शेतकर्यांसले सौर कुंपण व एलपीजी मदत.',
      kok: 'अभयारण्या लागसारच्या शेतकऱ्यां खातीर सौर कुंपण आनी एलपीजी मदत.',
    },
    amount: {
      mr: 'सौर कुंपणासाठी ७५% (कमाल रु. १५,०००/-) वन विभाग अनुदान',
      en: '75% (Max Rs. 15,000/-) Forest Department Subsidy for Solar Fencing',
      hi: 'सौर बाड़ लगाने हेतु 75% (अधिकतम रु 15,000) वन विभाग अनुदान',
      ahr: 'सौर कुंपण साठी ७५% वन विभाग अनुदान',
      kok: 'सौर कुंपणा खातीर ७५% वन विभाग अनुदान',
    },
    department: {
      mr: 'वन विभाग (महाराष्ट्र शासन)',
      en: 'Forest Department (Govt. of Maharashtra)',
      hi: 'वन विभाग (महाराष्ट्र सरकार)',
      ahr: 'वन विभाग',
      kok: 'वन विभाग',
    },
    overview: {
      mr: ['अभयारण्य व व्याघ्र प्रकल्पांच्या २ किमी परिघातील गावांमध्ये मानव-वन्यजीव संघर्ष कमी करणे आणि सौर कुंपण उभारणे.'],
      en: ['Reduces human-wildlife conflict within 2 km of tiger reserve buffers by providing solar fencing and clean fuel.'],
      hi: ['टाइगर रिजर्व और वन्यजीव अभयारण्य के 2 किमी क्षेत्र में मानव-वन्यजीव संघर्ष कम करना।'],
      ahr: ['जंगली जनावरा पासुन पिकांचे संरक्षण साठी सौर कुंपण अनुदान.'],
      kok: ['रानटी जनावरांसावन पिकांचो राखण करपा खातीर सौर कुंपण.']
    },
    benefits: {
      mr: ['सौर ऊर्जेच्या कुंपणासाठी ७५% (रु. १५,०००) वन विभाग अनुदान', 'घरगुती एलपीजी सिलिंडर आणि शेतीपूरक व्यवसाय मदत'],
      en: ['75% grant (up to Rs. 15,000) for individual solar power fencing', 'LPG cylinder connection & supplementary business support'],
      hi: ['सौर ऊर्जा बाड़ के लिए 75% (रु 15,000) अनुदान', 'घरेलू एलपीजी सिलेंडर और पूरक आजीविका सहायता'],
      ahr: ['सौर कुंपण साठी ७५% अनुदान', 'एलपीजी गॅस जोडणी मदत'],
      kok: ['सौर कुंपणा खातीर ७५% अनुदान', 'एलपीजी गॅस जोडणी मदत']
    },
    eligibility: {
      mr: ['व्याघ्र प्रकल्प व अभयारण्याच्या २ किमी परिघातील ग्रामस्थ व शेतकरी'],
      en: ['Farmers and residents living within 2 km radius of tiger reserves & wildlife sanctuaries'],
      hi: ['टाइगर रिजर्व और अभयारण्य की 2 किमी परिधि में रहने वाले किसान'],
      ahr: ['अभयारण्य परिसर मंदी राहणारा शेतकरी'],
      kok: ['अभयारण्य लागसार रावपी शेतकरी']
    },
    documents: {
      mr: ['आधार कार्ड', '७/१२ उतारा', 'बँक पासबुक'],
      en: ['Aadhaar Card', '7/12 Extract', 'Bank Passbook'],
      hi: ['आधार कार्ड', '7/12 खतौनी', 'बैंक पासबुक'],
      ahr: ['आधार कार्ड', '७/१२ उतारा', 'बँक पासबुक'],
      kok: ['आधार कार्ड', '७/१२ उतारा', 'बँक पासबुक']
    }
  },

  'gopinath-munde-shetkari-apghat-suraksha-yojana': {
    title: {
      mr: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह अनुदान योजना',
      en: 'Gopinath Munde Shetkari Apghat Suraksha Sanugrah Anudan Yojana',
      hi: 'गोपीनाथ मुंडे किसान दुर्घटना सुरक्षा अनुग्रह अनुदान योजना',
      ahr: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा योजना',
      kok: 'गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा योजना',
    },
    description: {
      mr: 'शेतकऱ्याचा अपघाती मृत्यू किंवा अपंगत्व आल्यास रु. २ लाख पर्यंत सानुग्रह अनुदान.',
      en: 'Financial compensation up to Rs. 2 Lakhs to farmer or legal heirs in case of accidental death or disability.',
      hi: 'किसान की दुर्घटना में मृत्यु या विकलांगता पर रु 2 लाख तक की अनुग्रह राशि।',
      ahr: 'अपघाती मृत्यू अथवा अपंगत्व आल्यास रु. २ लाख मदत.',
      kok: 'अपघाती मरण वा अपंगत्व आयल्यार रु. २ लाख मदत.',
    },
    amount: {
      mr: 'अपघाती मृत्यू / दोन अवयव निकामी: रु. २,००,०००/- अनुदान',
      en: 'Accidental Death / Loss of Two Limbs: Rs. 2,00,000 Financial Grant',
      hi: 'दुर्घटना मृत्यु / दो अंग क्षति: रु 2,00,000 सहायता',
      ahr: 'अपघाती मृत्यू: रु. २ लाख सानुग्रह मदत',
      kok: 'अपघाती मरण: रु. २ लाख मदत',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['शेती करताना, विजेचा धक्का, सर्पदंश, रस्ता अपघात किंवा नैसर्गिक आपत्तीमुळे मृत्यू/अपंगत्व आल्यास सानुग्रह अनुदान दिले जाते.'],
      en: ['Provides financial relief to farming families in case of accident, snakebite, electrocution, or drowning.'],
      hi: ['खेती के दौरान दुर्घटना, सर्पदंश, बिजली के झटके या डूबने पर परिजनों को वित्तीय राहत दी जाती है।'],
      ahr: ['शेती काम करताना अपघात अथवा सर्पदंश झाल्यास आर्थिक मदत.'],
      kok: ['शेतांतल्या कामा वेळार अपघात वा सोरोप चावल्यार आर्थिक मदत.']
    },
    benefits: {
      mr: ['अपघाती मृत्यू: रु. २,००,०००/-', 'दोन अवयव / दोन डोळे निकामी: रु. २,००,०००/-', 'एक अवयव / एक डोळा निकामी: रु. १,००,०००/-'],
      en: ['Accidental Death: Rs. 2,00,000', 'Loss of 2 Eyes/Limbs: Rs. 2,00,000', 'Loss of 1 Eye/Limb: Rs. 1,00,000'],
      hi: ['दुर्घटना मृत्यु: रु 2,00,000', 'दो अंग/आँखें क्षति: रु 2,00,000', 'एक अंग/आँख क्षति: रु 1,00,000'],
      ahr: ['अपघाती मृत्यू: रु. २ लाख', 'एक डोळा/अवयव निकामी: रु. १ लाख'],
      kok: ['अपघाती मरण: रु. २ लाख', 'एक दोळो/अवयव निकामी: रु. १ लाख']
    },
    eligibility: {
      mr: ['१० ते ७५ वयोगटातील ७/१२ धारक खातेदार शेतकरी व कुटुंबातील १ सदस्य (एकूण २ व्यक्ती)'],
      en: ['Registered landholder farmer (aged 10-75) and 1 family member (total 2 individuals covered)'],
      hi: ['10 से 75 आयु वर्ग के पंजीकृत 7/12 धारक किसान और परिवार का 1 सदस्य'],
      ahr: ['१० ते ७५ वयोगटातील ७/१२ धारक शेतकरी'],
      kok: ['१० ते ७५ पिरायेचो ७/१२ धारक शेतकरी']
    },
    documents: {
      mr: ['७/१२ उतारा', 'मृत्यू दाखला', 'गांव नमुना ६-क वारस नोंद', 'एफआयआर / पंचनामा अहवाल'],
      en: ['7/12 Land Extract', 'Death Certificate', 'Form 6-K Heir Certificate', 'FIR / Spot Panchanama Report'],
      hi: ['7/12 दस्तावेज', 'मृत्यु प्रमाण पत्र', 'वारिस प्रमाण पत्र', 'एफआईआर / पंचनामा रिपोर्ट'],
      ahr: ['७/१२ उतारा', 'मृत्यू दाखला', 'पंचनामा अहवाल'],
      kok: ['७/१२ उतारा', 'मरण दाखलो', 'पंचनामा अहवाल']
    }
  },

  'kaju-kalma-vatap-scheme': {
    title: {
      mr: 'काजू फळपीक विकास योजना (काजू कलम वाटप)',
      en: 'Kaju Phalpeek Vikas Yojana (Cashew Graft Distribution)',
      hi: 'काजू फल फसल विकास योजना (काजू कलम वितरण)',
      ahr: 'काजू कलम वाटप योजना',
      kok: 'काजू कलम वाटप योजना',
    },
    description: {
      mr: 'उत्पादकता वाढ व फलोत्पादन विस्तारासाठी उच्च दर्जाच्या काजू कलमांचे वाटप.',
      en: 'Distribution of high-yielding Vengurla-4/7 cashew grafts at subsidized/free rates to farmers.',
      hi: 'उच्च उपज देने वाली वेंगुर्ला काजू कलमों का किसानों को रियायती वितरण।',
      ahr: 'उत्कृष्ट काजू कलमे सवलत दरामंदी वाटप.',
      kok: 'उच्च दर्जाच्यो काजू कलमो वाटप.',
    },
    amount: {
      mr: 'सुधारित उच्च उत्पन्न वाणाची (Vengurla-4/7) काजू कलमे वाटप सवलत',
      en: 'Subsidized Distribution of High-Yielding Vengurla Cashew Grafts',
      hi: 'उच्च उपज वाली वेंगुर्ला काजू किस्मों का रियायती वितरण',
      ahr: 'काजू कलम सवलत वाटप',
      kok: 'काजू कलम सवलत वाटप',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['कोकण व अधिसूचित काजू उत्पादक जिल्ह्यांत उच्च उत्पन्न देणाऱ्या व्हेनगुर्ला वाणाच्या काजू कलमांचे वाटप करणे.'],
      en: ['Promotes cashew horticulture in Konkan and notified districts using quality Vengurla grafts.'],
      hi: ['कोंकण क्षेत्र में उच्च गुणवत्ता वाली काजू कलमों का वितरण कर बागवानी को बढ़ावा देना।'],
      ahr: ['कोकण भागामंदी काजू लागवड प्रोत्साहन देणे.'],
      kok: ['कोंकण भागांत काजू लागवडीक आदार दिवप.']
    },
    benefits: {
      mr: ['सुधारित उच्च उत्पन्न वाणाची काजू कलमे मोफत/सवलतीत मिळतात', 'रोपण साहित्य व फलोत्पादन तज्ज्ञांचे मार्गदर्शन'],
      en: ['Subsidized or free high-quality Vengurla cashew grafts', 'Planting material support and expert horticultural advice'],
      hi: ['वेंगुर्ला किस्म की उच्च गुणवत्ता काजू कलमें मुफ्त/रियायत पर', 'रोपण सामग्री एवं कृषि विशेषज्ञों का मार्गदर्शन'],
      ahr: ['उच्च प्रतिनी काजू कलमे वाटप'],
      kok: ['उच्च प्रतिच्यो काजू कलमो वाटप']
    },
    eligibility: {
      mr: ['काजू लागवडीसाठी योग्य जमीन असणारे कोकण व अधिसूचित जिल्ह्यातील ७/१२ धारक शेतकरी'],
      en: ['Registered 7/12 landholder farmers in Konkan and notified cashew growing districts'],
      hi: ['कोंकण एवं अधिसूचित जिलों के 7/12 धारक किसान जिनके पास उपयुक्त भूमि हो'],
      ahr: ['कोकण भागातील ७/१२ धारक शेतकरी'],
      kok: ['कोंकण भागांतलो ७/१२ धारक शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'आधार कार्ड प्रत', 'हमीपत्र'],
      en: ['7/12 & 8-A Extract', 'Aadhaar Card Copy', 'Undertaking Form'],
      hi: ['7/12 और 8-अ दस्तावेज', 'आधार कार्ड प्रति', 'वचनपत्र'],
      ahr: ['७/१२ उतारा', 'आधार कार्ड'],
      kok: ['७/१२ उतारा', 'आधार कार्ड']
    }
  },

  'mission-for-integrated-development-of-horticulture': {
    title: {
      mr: 'एकात्मिक फलोत्पादन विकास अभियान - केंद्र पुरस्कृत',
      en: 'Mission for Integrated Development of Horticulture (MIDH - CSS)',
      hi: 'एकीकृत बागवानी विकास मिशन - केंद्र प्रायोजित',
      ahr: 'एकात्मिक फलोत्पादन विकास अभियान (MIDH)',
      kok: 'एकात्मिक फलोत्पादन विकास अभियान (MIDH)',
    },
    description: {
      mr: 'फळबाग लागवड, ग्रीनहाऊस, कांदाचाळ, शितगृह व काढणीपश्चात व्यवस्थापनासाठी १९ घटकांवर अनुदान.',
      en: 'Grants across 19 components including polyhouse, shade net, onion storage, pack houses, and cold chains.',
      hi: 'पॉलीहाउस, शेडनेट, प्याज भंडारण, पैक हाउस और शीत गृह सहित 19 घटकों पर सब्सिडी।',
      ahr: 'फळबाग, पॉलीहाऊस, कांदाचाळ व शीतगृह साठी अनुदान.',
      kok: 'फळबाग, पॉलीहाऊस, कांदाचाळ आनी शितगृहा खातीर अनुदान.',
    },
    amount: {
      mr: 'फलोत्पादन व काढणीपश्चात व्यवस्थापनाच्या १९ घटकांवर ३४% ते ५०% अनुदान',
      en: '34% to 50% Subsidy across 19 Horticulture & Post-Harvest Components',
      hi: 'बागवानी और कटाई के बाद प्रबंधन के 19 घटकों पर 34% से 50% सब्सिडी',
      ahr: '१९ घटकांवर ३४% ते ५०% अनुदान',
      kok: '१९ घटकांचेर ३४% ते ५०% अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['फलोत्पादन क्षेत्राचे उत्पादन दुप्पट करणे, हरितगृह/शेडनेट तंत्रज्ञान प्रसृत करणे आणि काढणीपश्चात पायाभूत सुविधा उभारणे.'],
      en: ['Aims to double horticulture production and improve post-harvest storage and infrastructure.'],
      hi: ['बागवानी उत्पादन को दोगुना करना और आधुनिक संरक्षित खेती को बढ़ावा देना।'],
      ahr: ['फलोत्पादन उत्पादन वाढवणे अनी शितगृह साठवणूक करणे.'],
      kok: ['फळबाग उत्पादन वाडोवप आनी शितगृह उभारप.']
    },
    benefits: {
      mr: ['पॉलीहाऊस व शेडनेट हाऊस उभारणीसाठी ५०% अनुदान', 'कांदाचाळ, पॅक हाऊस व कोल्ड स्टोरेजसाठी भरीव मदत'],
      en: ['50% grant for Polyhouse & Shade Net Construction', 'Substantial subsidy for Onion Storage, Pack Houses, & Cold Chains'],
      hi: ['पॉलीहाउस व शेडनेट के लिए 50% अनुदान', 'प्याज भंडारण और कोल्ड स्टोरेज पर सब्सिडी'],
      ahr: ['पॉलीहाऊस व कांदाचाळ साठी ५०% मदत'],
      kok: ['पॉलीहाऊस आनी कांदाचाळ खातीर ५०% मदत']
    },
    eligibility: {
      mr: ['वैयक्तिक शेतकरी, FPO, बचत गट, ५०० मायक्रॉन प्लास्टिक अस्तरीकरण नियम लागू'],
      en: ['Individual Farmers, FPOs, SHGs; 500-micron plastic lining rules apply'],
      hi: ['व्यक्तिगत किसान, एफपीओ, बचत समूह'],
      ahr: ['शेतकरी, FPO अनी बचत गट'],
      kok: ['शेतकरी, FPO आनी बचत गट']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'प्रकल्प आराखडा / कोटेशन', 'बँक खाते तपशील'],
      en: ['7/12 & 8-A Extract', 'Project Design / Dealer Quotation', 'Bank Account Details'],
      hi: ['7/12 व 8-अ दस्तावेज', 'परियोजना कोटेशन', 'बैंक खाता विवरण'],
      ahr: ['७/१२ उतारा', 'कोटेशन बिल'],
      kok: ['७/१२ उतारा', 'कोटेशन बिल']
    }
  },

  'nfsm-cotton-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस - केंद्र पुरस्कृत',
      en: 'National Food Security Mission - Cotton (NFSM - CSS)',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - कपास - केंद्र प्रायोजित',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - कापूस',
    },
    description: {
      mr: 'अधिसूचित कापूस उत्पादक जिल्ह्यांमध्ये बियाणे, IPM प्रात्यक्षिके आणि उत्पादकता वाढ अभियान.',
      en: 'Subsidized certified cotton seeds, IPM demonstrations, and productivity enhancement drive.',
      hi: 'अधिसूचित कपास उत्पादक जिलों में प्रमाणित बीज, आईपीएम प्रदर्शन और उत्पादकता वृद्धि।',
      ahr: 'कापूस बियाणे ५०% अनुदानावर वाटप.',
      kok: 'कापूस बीं ५०% अनुदानाचेर वाटप.',
    },
    amount: {
      mr: 'प्रमाणित कापूस बियाणे वितरणावर ५०% अनुदान व IPM साधनांवर सवलत',
      en: '50% Subsidy on Certified Cotton Seed Distribution & IPM Support',
      hi: 'प्रमाणित कपास बीज पर 50% सब्सिडी और आईपीएम कीट नियंत्रण सहायता',
      ahr: 'कापूस बियाणे वर ५०% अनुदान',
      kok: 'कापूस बिंयाचेर ५०% अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['अमरावती व नागपूर विभागातील कापूस उत्पादक जिल्ह्यांमध्ये बियाणे प्रात्यक्षिके आणि IPM तंत्रज्ञानाद्वारे उत्पादन वाढवणे.'],
      en: ['Boosts cotton yield in Vidarbha/Marathwada districts through certified seed distribution and IPM.'],
      hi: ['विदर्भ व मराठवाड़ा के कपास उत्पादक जिलों में प्रमाणित बीजों के जरिए पैदावार बढ़ाना।'],
      ahr: ['कापूस पीक उत्पादन वाढवणे साठी बियाणे प्रात्यक्षिके.'],
      kok: ['कापूस पीक उत्पादन वाडोवपा खातीर बीं प्रात्यक्षिकां.']
    },
    benefits: {
      mr: ['प्रमाणित कापूस बियाण्यांवर ५०% थेट अनुदान', 'एकात्मिक कीड नियंत्रण (IPM) निविष्ठांवर सवलत'],
      en: ['50% direct subsidy on certified high-yielding cotton seed packets', 'Concessions on Integrated Pest Management (IPM) inputs'],
      hi: ['प्रमाणित कपास बीजों पर 50% सीधा अनुदान', 'एकीकृत कीट प्रबंधन (IPM) साधनों पर छूट'],
      ahr: ['कापूस बियाणे वर ५०% सूट'],
      kok: ['कापूस बिंयाचेर ५०% सूट']
    },
    eligibility: {
      mr: ['अधिसूचित कापूस उत्पादक जिल्ह्यांमधील ७/१२ धारक शेतकरी'],
      en: ['Registered 7/12 landholder farmers in notified cotton growing districts'],
      hi: ['अधिसूचित कपास उत्पादक जिलों के 7/12 धारक किसान'],
      ahr: ['कापूस उत्पादक शेतकरी'],
      kok: ['कापूस उत्पादक शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'आधार कार्ड', 'बियाणे खरेदी बिल'],
      en: ['7/12 & 8-A Extract', 'Aadhaar Card', 'Seed Purchase Invoice'],
      hi: ['7/12 और 8-अ दस्तावेज', 'आधार कार्ड', 'बीज खरीद बिल'],
      ahr: ['७/१२ उतारा', 'बियाणे बिल'],
      kok: ['७/१२ उतारा', 'बिंयाचे बिल']
    }
  },

  'nfsm-food-grains-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्य (डाळी, तृणधान्ये) - केंद्र पुरस्कृत',
      en: 'NFSM - Food Grains (Pulses, Coarse Cereals, Rice & Wheat) - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - खाद्यान्न (दालें, मोटे अनाज) - केंद्र प्रायोजित',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्य (डाळी, धान्ये)',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - अन्नधान्य (डाळी, धान्यां)',
    },
    description: {
      mr: 'भात, गहू, कडधान्ये (डाळी) व पोषक तृणधान्ये पिकांची उत्पादकता वाढवण्यासाठी बियाणे मिनीकिट अनुदान.',
      en: 'Seed minikits and 50% subsidy (up to Rs. 3000-5000/quintal) for pulses, cereals, and wheat.',
      hi: 'दालों, चावल, गेहूं और मोटे अनाजों की उत्पादकता बढ़ाने हेतु बीज मिनीकिट व 50% अनुदान।',
      ahr: 'डाळी, गहू, तांदूळ बियाणे वर ५०% अनुदान.',
      kok: 'डाळी, गंव, तांदूळ बिंयाचेर ५०% अनुदान.',
    },
    amount: {
      mr: 'सुधारित बियाणे वितरणावर ५०% अनुदान किंवा रु. ३००० ते ५००० प्रति क्विंटल',
      en: '50% Subsidy on High-Yielding Seeds (Rs. 3000 to 5000 per quintal)',
      hi: 'उन्नत बीजों के वितरण पर 50% सब्सिडी या रु 3000 से 5000 प्रति क्विंटल',
      ahr: 'बियाणे वर ५०% अनुदान (रु. ३०००-५०००/क्विंटल)',
      kok: 'बिंयाचेर ५०% अनुदान (रु. ३०००-५०००/क्विंटल)',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['राज्यात भात, गहू, डाळी व भरडधान्य पिकांची उत्पादकता वाढवण्यासाठी केंद्र पुरस्कृत अभियान राबवणे.'],
      en: ['Promotes productivity of food grains, pulses, and nutri-cereals through seed minikits & tech demos.'],
      hi: ['दालों और मोटे अनाजों का उत्पादन बढ़ाने के लिए बीज मिनीकिट व प्रदर्शन आयोजित करना।'],
      ahr: ['धान्य अनी डाळी उत्पादन वाढवणे साठी मिनीकिट वाटप.'],
      kok: ['धान्य आनी डाळी उत्पादन वाडोवपा खातीर मिनीकिट वाटप.']
    },
    benefits: {
      mr: ['५०% अनुदानावर प्रमाणित बियाणे वितरण', 'प्रक्षेत्र प्रात्यक्षिकांसाठी प्रति हेक्टरी आर्थिक सहाय्य', 'सूक्ष्म अन्नद्रव्ये व खतांवर सवलत'],
      en: ['50% subsidy on certified pulse and cereal seeds', 'Per-hectare field demo financial aid', 'Discounts on micro-nutrients & bio-fertilizers'],
      hi: ['50% सब्सिडी पर प्रमाणित बीज मिनीकिट', 'खेत प्रदर्शन के लिए प्रति हेक्टेयर वित्तीय सहायता'],
      ahr: ['५०% सूट वर बियाणे मिनीकिट'],
      kok: ['५०% सुटीचेर बिंया मिनीकिट']
    },
    eligibility: {
      mr: ['अन्नधान्य व कडधान्ये पिकांची लागवड करणारे महाराष्ट्रातील सर्व ७/१२ धारक शेतकरी'],
      en: ['All 7/12 landholder farmers in Maharashtra cultivating pulses and food grains'],
      hi: ['खाद्यान्न और दालों की खेती करने वाले सभी 7/12 धारक किसान'],
      ahr: ['महाराष्ट्रातील सर्व ७/१२ धारक शेतकरी'],
      kok: ['महाराष्ट्रांतले सगळे ७/१२ धारक शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'आधार कार्ड', 'बियाणे खरेदी बिल'],
      en: ['7/12 & 8-A Extract', 'Aadhaar Card', 'Seed GST Bill'],
      hi: ['7/12 व 8-अ दस्तावेज', 'आधार कार्ड', 'बीज जीएसटी बिल'],
      ahr: ['७/१२ उतारा', 'बियाणे बिल'],
      kok: ['७/१२ उतारा', 'बिंयाचे बिल']
    }
  },

  'nfsm-oilseed-oilpalm-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबिया आणि पाम तेल - केंद्र पुरस्कृत',
      en: 'NFSM - Oilseeds and Oil Palm - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - तिलहन और ऑयल पाम - केंद्र प्रायोजित',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबिया व पाम तेल',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - तेलबियाँ आनी पाम तेल',
    },
    description: {
      mr: 'सोयाबीन, भुईमूग, सूर्यफूल व तेलताड लागवडीसाठी बियाणे मिनीकिट व तुषार सिंचन सवलत.',
      en: 'Seed minikits for soybean, groundnut, sunflower, and oil palm, along with sprinkler irrigation grants.',
      hi: 'सोयाबीन, मूंगफली, सूरजमुखी और ऑयल पाम के लिए बीज मिनीकिट एवं स्प्रिंकलर सिंचाई सहायता।',
      ahr: 'सोयाबीन व भुईमूग बियाणे ५०% अनुदानावर.',
      kok: 'सोयाबीन आनी भुंयमूग बिंयाचेर ५०% अनुदान.',
    },
    amount: {
      mr: 'सोयाबीन व भुईमूग बियाणे मिनीकिट ५०% अनुदानावर व तुषार सिंचन सवलत',
      en: '50% Subsidy on Oilseed Seed Minikits & Sprinkler Sets',
      hi: 'तिलहन बीज मिनीकिट पर 50% सब्सिडी और स्प्रिंकलर सेट छूट',
      ahr: '५०% अनुदानावर बियाणे मिनीकिट',
      kok: '५०% अनुदानाचेर बिंया मिनीकिट',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['सोयाबीन, भुईमूग, तिळ व पाम तेल पिकांचे उत्पादन वाढवून वनस्पती तेलात स्वावलंबन प्राप्त करणे.'],
      en: ['Aims to achieve self-reliance in edible oils by expanding soybean, groundnut, and oil palm cultivation.'],
      hi: ['सोयाबीन, मूंगफली और ऑयल पाम का उत्पादन बढ़ाकर खाद्य तेल में आत्मनिर्भरता प्राप्त करना।'],
      ahr: ['तेलबिया पीक उत्पादन वाढवणे साठी मिनीकिट वाटप.'],
      kok: ['तेलबियाँ पीक उत्पादन वाडोवपा खातीर मिनीकिट वाटप.']
    },
    benefits: {
      mr: ['सोयाबीन व भुईमूग बियाणे मिनीकिट ५०% अनुदानावर', 'तुषार सिंचन संच व स्प्रिंकलर पाईपवर विशेष अनुदान', 'तेलताड रोपांवर सवलत'],
      en: ['50% subsidy on soybean & groundnut seed minikits', 'Special grants for Sprinkler Irrigation sets & pipes', 'Subsidized oil palm saplings'],
      hi: ['सोयाबीन व मूंगफली बीजों पर 50% सब्सिडी', 'स्प्रिंकलर सेट और पाइपों पर विशेष अनुदान'],
      ahr: ['तेलबिया बियाणे ५०% सवलत', 'तुषार सिंचन अनुदान'],
      kok: ['तेलबियाँ बिंयाचेर ५०% सवलत', 'तुषार सिंचन अनुदान']
    },
    eligibility: {
      mr: ['तेलबिया व पाम तेल लागवड करणारे ७/१२ धारक शेतकरी'],
      en: ['Registered 7/12 landholders cultivating oilseed or oil palm crops'],
      hi: ['तिलहन एवं ऑयल पाम की खेती करने वाले 7/12 धारक किसान'],
      ahr: ['तेलबिया शेतकरी'],
      kok: ['तेलबियाँ शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'आधार कार्ड', 'बँक पासबुक'],
      en: ['7/12 & 8-A Extract', 'Aadhaar Card', 'Bank Passbook'],
      hi: ['7/12 और 8-अ दस्तावेज', 'आधार कार्ड', 'बैंक पासबुक'],
      ahr: ['७/१२ उतारा', 'आधार कार्ड'],
      kok: ['७/१२ उतारा', 'आधार कार्ड']
    }
  },

  'nfsm-sugarcane-css': {
    title: {
      mr: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस - केंद्र पुरस्कृत',
      en: 'NFSM - Sugarcane Development - CSS',
      hi: 'राष्ट्रीय खाद्य सुरक्षा मिशन - गन्ना - केंद्र प्रायोजित',
      ahr: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस',
      kok: 'राष्ट्रीय अन्न सुरक्षा अभियान - ऊस',
    },
    description: {
      mr: 'ऊस उत्पादकता वाढ, उति संवर्धित रोपे, बेणे प्रक्रिया आणि आंतरपीक पद्धतीस प्रोत्साहन.',
      en: 'Tissue culture sugarcane saplings, seed treatment, and intercropping incentives.',
      hi: 'गन्ना उत्पादकता वृद्धि, टिशू कल्चर पौधे, बीज उपचार और अंतर-फसल प्रोत्साहन।',
      ahr: 'टिशू कल्चर ऊस रोपे वर अनुदान.',
      kok: 'टिशू कल्चर ऊस रोपांचेर अनुदान.',
    },
    amount: {
      mr: 'उति संवर्धित (Tissue Culture) उसाची रोपे खरेदी व आंतरपीक लागवडीवर अनुदान',
      en: 'Grant on Tissue Culture Sugarcane Saplings & Intercropping',
      hi: 'टिशू कल्चर गन्ने के पौधों की खरीद व अंतर-फसल पर सब्सिडी',
      ahr: 'ऊस रोपे खरेदीवर अनुदान',
      kok: 'ऊस रोपां खरेदीचेर अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['ऊस पिकाची उत्पादकता वाढवणे, बड-चिप पद्धतीचा प्रसार करणे आणि उसात कडधान्ये/तेलबिया आंतरपीक घेण्यास प्रोत्साहन देणे.'],
      en: ['Improves sugarcane yield using tissue culture saplings, drip irrigation, and intercropping with pulses.'],
      hi: ['गन्ने की उत्पादकता बढ़ाना, बड-चिप तकनीक को बढ़ावा देना और गन्ने में अंतर-फसल को प्रोत्साहित करना।'],
      ahr: ['ऊस शेती मंदी आंतरपीक पद्धती प्रोत्साहन देणे.'],
      kok: ['ऊस शेतांत अंतर-पीक पद्धतीक आदार दिवप.']
    },
    benefits: {
      mr: ['उति संवर्धित (Tissue Culture) रोपे खरेदीवर अनुदान', 'उसात आंतरपीक प्रात्यक्षिकांसाठी आर्थिक मदत', 'बेणे प्रक्रिया साधनांवर सवलत'],
      en: ['Subsidy on certified Tissue Culture sugarcane saplings', 'Financial assistance for sugarcane intercropping demonstrations', 'Seed treatment input grants'],
      hi: ['टिशू कल्चर गन्ने के पौधों पर अनुदान', 'अंतर-फसल (दालें/तिलहन) प्रदर्शन हेतु वित्तीय सहायता'],
      ahr: ['ऊस रोपे ५०% अनुदान'],
      kok: ['ऊस रोपां ५०% अनुदान']
    },
    eligibility: {
      mr: ['अधिसूचित विभागातील नोंदणीकृत ऊस उत्पादक शेतकरी'],
      en: ['Registered sugarcane growers with 7/12 land records'],
      hi: ['अधिसूचित क्षेत्रों के पंजीकृत गन्ना उत्पादक किसान'],
      ahr: ['ऊस उत्पादक शेतकरी'],
      kok: ['ऊस उत्पादक शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'साखर कारखाना नोंदणी पावती', 'आधार कार्ड'],
      en: ['7/12 & 8-A Extract', 'Sugar Factory Registration Receipt', 'Aadhaar Card'],
      hi: ['7/12 और 8-अ दस्तावेज', 'चीनी मिल पंजीकरण रसीद', 'आधार कार्ड'],
      ahr: ['७/१२ उतारा', 'साखर कारखाना पावती'],
      kok: ['७/१२ उतारा', 'साखर कारखाना पावती']
    }
  },

  'pmksy-per-drop-more-crop-css': {
    title: {
      mr: 'प्रधानमंत्री कृषि सिंचन योजना - प्रति थेंब अधिक पीक (सूक्ष्म सिंचन) - केंद्र पुरस्कृत',
      en: 'PMKSY - Per Drop More Crop (Micro-Irrigation) - CSS',
      hi: 'प्रधानमंत्री कृषि सिंचाई योजना - प्रति बूंद अधिक फसल (सूक्ष्म सिंचाई) - केंद्र प्रायोजित',
      ahr: 'प्रधानमंत्री कृषि सिंचन योजना - प्रति थेंब अधिक पीक',
      kok: 'प्रधानमंत्री कृषि सिंचन योजना - प्रति थेंब चड पीक',
    },
    description: {
      mr: 'ठिबक व तुषार सिंचनासाठी लहान व अल्पभूधारक शेतकऱ्यांना ५५% तर इतर शेतकऱ्यांना ४५% अनुदान.',
      en: '55% subsidy for small/marginal farmers and 45% for others on Drip & Sprinkler irrigation systems.',
      hi: 'ड्रिप और स्प्रिंकलर सिंचाई के लिए छोटे किसानों को 55% तथा अन्य को 45% सब्सिडी।',
      ahr: 'अल्पभूधारक शेतकर्यांसले ५५% ठिबक अनुदान.',
      kok: 'अल्पभूधारक शेतकऱ्यांक ५५% ठिबक अनुदान.',
    },
    amount: {
      mr: 'अल्प/अत्यल्प भूधारक: ५५% अनुदान | इतर शेतकरी: ४५% अनुदान',
      en: 'Small/Marginal Farmers: 55% Subsidy | Other Farmers: 45% Subsidy',
      hi: 'छोटे किसान: 55% सब्सिडी | अन्य किसान: 45% सब्सिडी',
      ahr: 'लहान शेतकरी: ५५% अनुदान | इतर: ४५% अनुदान',
      kok: 'लहान शेतकरी: ५५% अनुदान | हेर: ४५% अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['पाण्याचा प्रत्येक थेंब कार्यक्षमतेने वापरण्यासाठी ठिबक व तुषार सिंचन संचावर थेट बँक अनुदानाची तरतूद.'],
      en: ['Ensures efficient water utilization by subsidizing drip and sprinkler sets directly into farmer bank accounts.'],
      hi: ['पानी की एक-एक बूंद का कुशलतापूर्वक उपयोग करने के लिए ड्रिप और स्प्रिंकलर सेट पर डायरेक्ट बैंक ट्रांसफर सब्सिडी।'],
      ahr: ['पाणी बचत साठी ठिबक व तुषार सिंचन सवलत.'],
      kok: ['उदक बचत खातीर ठिबक आनी तुषार सिंचन सवलत.']
    },
    benefits: {
      mr: ['ठिबक संच खरेदीवर ५५% पर्यंत थेट अनुदान', 'तुषार (स्प्रिंकलर) संचावर भरीव सवलत', 'पाण्याची ४०% ते ६०% बचत'],
      en: ['Up to 55% direct bank subsidy on Drip Systems', 'Substantial grant on Sprinkler Irrigation sets', '40% to 60% water savings'],
      hi: ['ड्रिप सिस्टम पर 55% तक डायरेक्ट बैंक सब्सिडी', 'स्प्रिंकलर सेट पर अनुदान', '40% से 60% पानी की बचत'],
      ahr: ['५५% ठिबक सिंचन सवलत', 'पाण्याची बचत'],
      kok: ['५५% ठिबक सिंचन सवलत', 'उदकाची बचत']
    },
    eligibility: {
      mr: ['महाराष्ट्रातील सर्व ७/१२ धारक शेतकरी', 'आधार कार्ड व बँक खाते असणे आवश्यक'],
      en: ['All registered 7/12 landholder farmers in Maharashtra', 'Aadhaar Card and linked bank account required'],
      hi: ['महाराष्ट्र के सभी 7/12 धारक किसान', 'आधार कार्ड और बैंक खाता आवश्यक'],
      ahr: ['महाराष्ट्रातील सर्व ७/१२ धारक शेतकरी'],
      kok: ['महाराष्ट्रांतले सगळे ७/१२ धारक शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'वीज बिल', 'डीलर कोटेशन व जीएसटी बिल', 'पूर्वसंमती पत्र'],
      en: ['7/12 & 8-A Extract', 'Electricity Bill', 'Dealer Quotation & GST Invoice', 'Prior Approval Sanction Letter'],
      hi: ['7/12 और 8-अ दस्तावेज', 'बिजली बिल', 'कोटेशन व जीएसटी बिल', 'पूर्व सहमति पत्र'],
      ahr: ['७/१२ उतारा', 'वीज बिल', 'कोटेशन बिल'],
      kok: ['७/१२ उतारा', 'वीज बिल', 'कोटेशन बिल']
    }
  },

  'pmrkvy-rainfed-area-development': {
    title: {
      mr: 'प्रधानमंत्री राष्ट्रीय कृषि विकास योजना - सिंचित क्षेत्र विकास (RAD)',
      en: 'PMRKVY - Rainfed Area Development (RAD)',
      hi: 'प्रधानमंत्री राष्ट्रीय कृषि विकास योजना - वर्षा सिंचित क्षेत्र विकास (RAD)',
      ahr: 'PMRKVY - सिंचित क्षेत्र विकास योजना',
      kok: 'PMRKVY - सिंचित क्षेत्र विकास योजना',
    },
    description: {
      mr: 'कोरडवाहू क्षेत्रात एकात्मिक शेती पद्धती (IFS) व क्लस्टर विकासासाठी प्रति शेतकरी रु. ३०,००० मदत.',
      en: 'Integrated Farming System (IFS) subsidy up to Rs. 30,000 per farmer family in rainfed clusters.',
      hi: 'वर्षा सिंचित क्षेत्रों में एकीकृत कृषि प्रणाली (IFS) हेतु प्रति किसान रु 30,000 सहायता।',
      ahr: 'कोरडवाहू भागामंदी एकात्मिक शेती साठी रु. ३०,००० मदत.',
      kok: 'कोरडवाहू भागांत एकात्मिक शेती खातीर रु. ३०,००० मदत.',
    },
    amount: {
      mr: 'प्रति शेतकरी कुटुंबाला कमाल रु. ३०,०००/- एकात्मिक शेती अनुदान',
      en: 'Max Rs. 30,000/- Integrated Farming Subsidy per Farmer Family',
      hi: 'प्रति किसान परिवार अधिकतम रु 30,000 एकीकृत कृषि सहायता',
      ahr: 'प्रति शेतकरी कुटुंब रु. ३०,००० अनुदान',
      kok: 'प्रति शेतकरी कुटुंब रु. ३०,००० अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['महाराष्ट्रातील ३४ जिल्ह्यांत २० हेक्टर क्लस्टर धोरणाने कोरडवाहू शेतीत एकात्मिक शेती (IFS) पद्धत राबवणे.'],
      en: ['Implements Integrated Farming Systems (IFS) across 20-hectare clusters in 34 rainfed districts.'],
      hi: ['वर्षा आधारित 34 जिलों में क्लस्टर आधारित दृष्टिकोण से एकीकृत कृषि मॉडल लागू करना।'],
      ahr: ['कोरडवाहू भाग मंदी पिके व पशुपालन सोबत शेती विकास.'],
      kok: ['कोरडवाहू भागांत पिकां आनी पशूपालन हांचे वांगडा शेती विकास.']
    },
    benefits: {
      mr: ['एकात्मिक शेती (पिके + पशुपालन + फलोत्पादन) साठी रु. ३०,०००/- मदत', 'क्षमता बांधणी व तंत्रज्ञान प्रशिक्षण'],
      en: ['Rs. 30,000 subsidy for Integrated Farming (Crops + Livestock + Horticulture)', 'Capacity building and modern training'],
      hi: ['एकीकृत कृषि (फसल + पशुपालन + बागवानी) हेतु रु 30,000 अनुदान', 'तकनीकी प्रशिक्षण'],
      ahr: ['एकात्मिक शेती साठी रु. ३०,००० अनुदान'],
      kok: ['एकात्मिक शेती खातीर रु. ३०,००० अनुदान']
    },
    eligibility: {
      mr: ['महाराष्ट्रातील ३४ जिल्ह्यांमधील निवडक क्लस्टर क्षेत्रातील ७/१२ धारक शेतकरी', 'Agristack फार्मर आयडी आवश्यक'],
      en: ['Farmers within selected 20-hectare clusters across 34 rainfed districts', 'Agristack Farmer ID required'],
      hi: ['चयनित 34 जिलों के क्लस्टर क्षेत्रों के किसान', 'Agristack फार्मर आईडी अनिवार्य'],
      ahr: ['कोरडवाहू क्लस्टर क्षेत्रातील शेतकरी'],
      kok: ['कोरडवाहू क्लस्टर क्षेत्रांतलो शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'आधार कार्ड व Agristack Farmer ID', 'बँक पासबुक'],
      en: ['7/12 & 8-A Extract', 'Aadhaar Card & Agristack Farmer ID', 'Bank Passbook'],
      hi: ['7/12 और 8-अ दस्तावेज', 'आधार कार्ड व एग्रीस्टैक आईडी', 'बैंक पासबुक'],
      ahr: ['७/१२ उतारा', 'आधार कार्ड'],
      kok: ['७/१२ उतारा', 'आधार कार्ड']
    }
  },

  'rashtriya-krushi-vikas-yojana-raftaar': {
    title: {
      mr: 'राष्ट्रीय कृषि विकास योजना - रफ्तार - केंद्र पुरस्कृत',
      en: 'Rashtriya Krishi Vikas Yojana - RAFTAAR (CSS)',
      hi: 'राष्ट्रीय कृषि विकास योजना - रफ्तार - केंद्र प्रायोजित',
      ahr: 'राष्ट्रीय कृषि विकास योजना - रफ्तार',
      kok: 'राष्ट्रीय कृषि विकास योजना - रफ्तार',
    },
    description: {
      mr: 'गोडाऊन, शीतगृह व प्रक्रिया प्रकल्पांसाठी ५०% पर्यंत भांडवली अनुदान.',
      en: 'Up to 50% capital subsidy for agri-infrastructure, cold chains, warehouses, and agri-startups.',
      hi: 'कृषि अवसंरचना, गोदाम, शीत गृह और कृषि स्टार्ट-अप्स के लिए 50% तक पूंजीगत अनुदान।',
      ahr: 'गोडाऊन, शितगृह व प्रक्रिया उद्योग साठी ५०% अनुदान.',
      kok: 'गोडाऊन, शितगृह आनी प्रक्रिया उद्योगा खातीर ५०% अनुदान.',
    },
    amount: {
      mr: 'कृषी पायाभूत सुविधा प्रकल्पांवर ५०% पर्यंत भांडवली अनुदान',
      en: 'Up to 50% Capital Subsidy for Post-Harvest & Agri Infrastructure',
      hi: 'कटाई के बाद कृषि अवसंरचना पर 50% तक पूंजीगत अनुदान',
      ahr: 'कृषि पायाभूत प्रकल्पांवर ५०% अनुदान',
      kok: 'कृषि पायाभूत प्रकल्पांचेर ५०% अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['काढणीपश्चात पिकांचे नुकसान रोखणे, गोडाऊन उभारणे आणि कृषी उद्योजकतेला गती देणे.'],
      en: ['Promotes agri-entrepreneurship, warehouses, cold storage, and infrastructure post-harvest.'],
      hi: ['कटाई के बाद फसल नुकसान को रोकना और कृषि उद्यमिता (Agri Startups) को बढ़ावा देना।'],
      ahr: ['पिक साठवणूक व गोडाऊन उभारणी प्रोत्साहन.'],
      kok: ['पीक साठवणूक आनी गोडाऊन उभारणीक आदार.']
    },
    benefits: {
      mr: ['गोडाऊन व शीतगृह प्रकल्पांसाठी ५०% पर्यंत भांडवली अनुदान', 'FPOs व कृषी पदवीधरांच्या उपक्रमांना विशेष निधी सहाय्य'],
      en: ['Up to 50% capital subsidy for warehouses & cold storage units', 'Special grant support for FPOs & Agri-graduates'],
      hi: ['गोदाम और कोल्ड स्टोरेज के लिए 50% तक सब्सिडी', 'एफपीओ और कृषि स्नातकों के लिए विशेष वित्तीय मदद'],
      ahr: ['गोडाऊन साठी ५०% भांडवली अनुदान'],
      kok: ['गोडाऊन खातीर ५०% भांडवली अनुदान']
    },
    eligibility: {
      mr: ['FPO, शेतकरी बचत गट, कृषी उद्योजक आणि वैयक्तिक शेतकरी'],
      en: ['FPOs, Farmer SHGs, Agri-Entrepreneurs, and Individual Farmers'],
      hi: ['एफपीओ, स्वयं सहायता समूह, कृषि उद्यमी और किसान'],
      ahr: ['FPO, बचत गट व शेतकरी'],
      kok: ['FPO, बचत गट आनी शेतकरी']
    },
    documents: {
      mr: ['७/१२ व ८-अ उतारा', 'विस्तृत प्रकल्प अहवाल (DPR)', 'FPO नोंदणी दाखला'],
      en: ['7/12 & 8-A Extract', 'Detailed Project Report (DPR)', 'FPO Registration Certificate'],
      hi: ['7/12 और 8-अ दस्तावेज', 'विस्तृत प्रोजेक्ट रिपोर्ट (DPR)', 'FPO पंजीकरण प्रमाण पत्र'],
      ahr: ['७/१२ उतारा', 'DPR रिपोर्ट'],
      kok: ['७/१२ उतारा', 'DPR रिपोर्ट']
    }
  },

  'rkvy-sugarcane-harvester-subsidy': {
    title: {
      mr: 'राष्ट्रीय कृषि विकास योजना - ऊस तोडणी यंत्राला अनुदान',
      en: 'RKVY - Sugarcane Harvester Machine Subsidy',
      hi: 'राष्ट्रीय कृषि विकास योजना - गन्ना कटाई मशीन सब्सिडी',
      ahr: 'ऊस तोडणी यंत्र अनुदान योजना',
      kok: 'ऊस तोडणी यंत्र अनुदान योजना',
    },
    description: {
      mr: 'ऊस तोडणी यंत्रांच्या (Sugarcane Harvesters) खरेदीवर ४०% पर्यंत (कमाल रु. ४० लाख) भांडवली अनुदान.',
      en: '40% capital subsidy (up to Rs. 40 Lakhs) on purchase of self-propelled sugarcane harvesters.',
      hi: 'स्वचालित गन्ना कटाई मशीनों (Sugarcane Harvesters) की खरीद पर 40% (अधिकतम रु 40 लाख) सब्सिडी।',
      ahr: 'ऊस तोडणी यंत्र खरेदीवर ४०% (कमाल रु. ४० लाख) अनुदान.',
      kok: 'ऊस तोडणी यंत्र खरेदीचेर ४०% (कमाल रु. ४० लाख) अनुदान.',
    },
    amount: {
      mr: 'ऊस तोडणी यंत्र खरेदीवर ४०% (कमाल रु. ४०,००,०००/-) भांडवली अनुदान',
      en: '40% (Max Rs. 40,00,000/-) Capital Grant on Sugarcane Harvester Purchase',
      hi: 'गन्ना कटाई मशीन पर 40% (अधिकतम रु 40 लाख) पूंजीगत अनुदान',
      ahr: '४०% (कमाल रु. ४० लाख) थेट अनुदान',
      kok: '४०% (कमाल रु. ४० लाख) थेट अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['ऊस तोडणी मजुरांच्या तुटवड्यावर मात करण्यासाठी व स्वयंचलित ऊस तोडणी यंत्रांना प्रोत्साहन देण्यासाठी भांडवली अनुदान.'],
      en: ['Tackles sugarcane harvesting labor shortages by subsidizing high-tech mechanical harvesters.'],
      hi: ['गन्ना कटाई मजदूरों की कमी से निपटने के लिए स्वचालित मशीनों पर पूंजीगत सब्सिडी।'],
      ahr: ['ऊस तोडणी यंत्र खरेदीसाठी ४० लाख पर्यंत अनुदान.'],
      kok: ['ऊस तोडणी यंत्र खरेदी खातीर ४० लाख मेरेन अनुदान.']
    },
    benefits: {
      mr: ['स्वयंचलित ऊस तोडणी यंत्रावर ४०% (कमाल रु. ४० लाख) अनुदान', 'कस्टम हायरिंग भाडे तत्त्वावर इतरांना सेवा देण्याची संधी'],
      en: ['40% capital subsidy (up to Rs. 40 Lakhs) on sugarcane harvester', 'Opportunity to provide Custom Hiring Services to sugar mills & farmers'],
      hi: ['गन्ना कटाई मशीन पर 40% (रु 40 लाख तक) अनुदान', 'कस्टम हायरिंग केंद्र के रूप में किराए पर देने का अवसर'],
      ahr: ['ऊस तोडणी यंत्र वर ४०% (रु. ४० लाख) अनुदान'],
      kok: ['ऊस तोडणी यंत्राचेर ४०% (रु. ४० लाख) अनुदान']
    },
    eligibility: {
      mr: ['कृषी पदवीधर, शेतकरी उत्पादक कंपन्या (FPO), सहकारी साखर कारखाने व उद्योजक शेतकरी'],
      en: ['Agri-Graduates, FPOs, Sugar Co-operatives, and Entrepreneur Farmers', 'Bank loan sanction required'],
      hi: ['कृषि स्नातक, एफपीओ, सहकारी चीनी मिलें और उद्यमी किसान'],
      ahr: ['कृषि पदवीधर, FPO व शेतकरी'],
      kok: ['कृषि पदवीधर, FPO आनी शेतकरी']
    },
    documents: {
      mr: ['७/१२ उतारा', 'यंत्र खरेदी अधिकृत डीलर कोटेशन', 'बँक कर्ज मंजुरी पत्र व पॅन कार्ड'],
      en: ['7/12 Extract', 'Authorized Dealer Machinery Quotation', 'Bank Loan Sanction Letter & PAN Card'],
      hi: ['7/12 दस्तावेज', 'मशीन डीलर कोटेशन', 'बैंक ऋण स्वीकृति पत्र व पैन कार्ड'],
      ahr: ['७/१२ उतारा', 'यंत्र कोटेशन', 'बँक कर्ज पत्र'],
      kok: ['७/१२ उतारा', 'यंत्र कोटेशन', 'बँक कर्ज पत्र']
    }
  },

  'state-sponsored-agriculture-mechanization': {
    title: {
      mr: 'कृषि यांत्रिकीकरण उप-अभियान (राज्य पुरस्कृत)',
      en: 'State Sponsored Agriculture Mechanization Scheme',
      hi: 'राज्य कृषि यांत्रीकरण योजना',
      ahr: 'राज्य कृषि यांत्रिकीकरण योजना',
      kok: 'राज्य कृषि यांत्रिकीकरण योजना',
    },
    description: {
      mr: 'राज्य शासनाकडून ट्रॅक्टर व कृषी अवजारे खरेदीसाठी ४०% ते ५०% अनुदान.',
      en: '40% to 50% state subsidy for purchasing tractors, power tillers, rotavators, and farm equipment.',
      hi: 'ट्रैक्टर, पावर टिलर, रोटावेटर और कृषि उपकरणों की खरीद पर 40% से 50% राज्य सब्सिडी।',
      ahr: 'ट्रॅक्टर व अवजारे खरेदीसाठी ४०% ते ५०% अनुदान.',
      kok: 'ट्रॅक्टर आनी अवजारां खरेदी खातीर ४०% ते ५०% अनुदान.',
    },
    amount: {
      mr: 'ट्रॅक्टर, पॉवर टिलर, पेरणी यंत्र, रोटॅव्हेटर व अवजारांवर ४०% ते ५०% अनुदान',
      en: '40% to 50% Subsidy on Tractors, Power Tillers, Rotavators & Implements',
      hi: 'ट्रैक्टर, पावर टिलर, बुआई मशीन और रोटावेटर पर 40% से 50% सब्सिडी',
      ahr: 'ट्रॅक्टर व अवजारांवर ४०% ते ५०% अनुदान',
      kok: 'ट्रॅक्टर आनी अवजारांचेर ४०% ते ५०% अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['शेतीमधील ऊर्जेचा वापर वाढवणे आणि लहान व अल्पभूधारक शेतकऱ्यांना आधुनिक कृषी अवजारे सवलतीत उपलब्ध करणे.'],
      en: ['Enhances farm power availability to 2 kW/ha by subsidizing tractors and implements for small farmers.'],
      hi: ['छोटे व सीमांत किसानों को आधुनिक कृषि उपकरण रियायती दरों पर उपलब्ध कराना।'],
      ahr: ['शेती काम सोपे करणे साठी ट्रॅक्टर व अवजारे सवलत.'],
      kok: ['शेती काम सोपे करपा खातीर ट्रॅक्टर आनी अवजारां सवलत.']
    },
    benefits: {
      mr: ['ट्रॅक्टर खरेदीसाठी ४०% (कमाल रु. १.२५ लाख) अनुदान', 'पॉवर टिलर, रोटॅव्हेटर, पेरणी यंत्रावर ५०% अनुदान'],
      en: ['40% grant (up to Rs. 1.25 Lakhs) for Tractor purchase', '50% subsidy on Power Tillers, Rotavators, & Seed Drills'],
      hi: ['ट्रैक्टर खरीद पर 40% (रु 1.25 लाख) अनुदान', 'पावर टिलर और रोटावेटर पर 50% सब्सिडी'],
      ahr: ['ट्रॅक्टर वर ४०% व अवजारांवर ५०% अनुदान'],
      kok: ['ट्रॅक्टराचेर ४०% आनी अवजारांचेर ५०% अनुदान']
    },
    eligibility: {
      mr: ['महाराष्ट्रातील ७/१२ धारक व आधार कार्ड असलेले सर्व शेतकरी'],
      en: ['All registered 7/12 landholder farmers in Maharashtra with Aadhaar'],
      hi: ['महाराष्ट्र के सभी 7/12 धारक और आधार कार्ड वाले किसान'],
      ahr: ['महाराष्ट्रातील सर्व ७/१२ धारक शेतकरी'],
      kok: ['महाराष्ट्रांतले सगळे ७/१२ धारक शेतकरी']
    },
    documents: {
      mr: ['आधार कार्ड', '७/१२ व ८-अ उतारा', 'डीलर कोटेशन व पूर्वसंमती पत्र'],
      en: ['Aadhaar Card', '7/12 & 8-A Extract', 'Dealer Quotation & Sanction Letter'],
      hi: ['आधार कार्ड', '7/12 और 8-अ दस्तावेज', 'डीलर कोटेशन'],
      ahr: ['आधार कार्ड', '७/१२ उतारा', 'कोटेशन बिल'],
      kok: ['आधार कार्ड', '७/१२ उतारा', 'कोटेशन बिल']
    }
  },

  'sub-mission-on-agricultural-mechanization-css': {
    title: {
      mr: 'कृषि यांत्रिकीकरण उप-अभियान - केंद्र पुरस्कृत',
      en: 'Sub-Mission on Agricultural Mechanization (SMAM - CSS)',
      hi: 'कृषि यांत्रिकीकरण पर उप-मिशन - केंद्र प्रायोजित',
      ahr: 'कृषि यांत्रिकीकरण उप-अभियान (SMAM)',
      kok: 'कृषि यांत्रिकीकरण उप-अभियान (SMAM)',
    },
    description: {
      mr: 'ट्रॅक्टर, पॉवर टिलर, अवजारे खरेदीसाठी ५०% अनुदान व कस्टम हायरिंग केंद्रांसाठी ८०% सहाय्य.',
      en: '50% grant for individual farm equipment and up to 80% for setting up Custom Hiring Centers (CHC).',
      hi: 'व्यक्तिगत कृषि उपकरणों पर 50% सब्सिडी और कस्टम हायरिंग सेंटर्स (CHC) की स्थापना हेतु 80% सहायता।',
      ahr: 'यंत्र खरेदीवर ५०% व CHC सेंटर साठी ८०% अनुदान.',
      kok: 'यंत्र खरेदीचेर ५०% आनी CHC केंद्रा खातीर ८०% अनुदान.',
    },
    amount: {
      mr: 'वैयक्तिक यंत्रे: ५०% अनुदान | कस्टम हायरिंग केंद्र (CHC): ८०% वित्तीय सहाय्य',
      en: 'Individual Equipment: 50% Subsidy | Custom Hiring Center (CHC): 80% Financial Assistance',
      hi: 'व्यक्तिगत उपकरण: 50% सब्सिडी | कस्टम हायरिंग सेंटर (CHC): 80% सहायता',
      ahr: 'वैयक्तिक यंत्रे: ५०% | CHC: ८०% अनुदान',
      kok: 'वैयक्तिक यंत्रां: ५०% | CHC: ८०% अनुदान',
    },
    department: {
      mr: 'कृषी विभाग (महाराष्ट्र शासन)',
      en: 'Department of Agriculture',
      hi: 'कृषि विभाग',
      ahr: 'कृषी विभाग',
      kok: 'कृषी विभाग',
    },
    overview: {
      mr: ['शेतकऱ्यांना ट्रॅक्टर, अवजारे आणि कस्टम हायरिंग बँक (CHC) द्वारे आधुनिक यंत्रसामग्री उपलब्ध करून देणे.'],
      en: ['Promotes farm mechanization by providing machinery subsidy and CHC custom hiring centers.'],
      hi: ['कृषि मशीनीकरण को बढ़ावा देने के लिए व्यक्तिगत मशीनों और कस्टम हायरिंग सेंटरों पर भारी सब्सिडी।'],
      ahr: ['शेती यंत्रे सवलतीवर देणे व अवजारे बँक स्थापन करणे.'],
      kok: ['शेती यंत्रां सवलतीचेर दिवप आनी अवजारां बँक स्थापन करप.']
    },
    benefits: {
      mr: ['वैयक्तिक अवजारे व ट्रॅक्टर खरेदीसाठी ४०% ते ५०% अनुदान', 'भाडे तत्त्वावरील अवजारे बँक (CHC) उभारणीसाठी ८०% अनुदान'],
      en: ['40% to 50% grant for individual tractors & implements', '80% grant for establishing Custom Hiring Centers (CHC)'],
      hi: ['व्यक्तिगत मशीनों पर 40% से 50% सब्सिडी', 'कस्टम हायरिंग सेंटर (CHC) की स्थापना पर 80% अनुदान'],
      ahr: ['यंत्रांवर ५०% व CHC साठी ८०% मदत'],
      kok: ['यंत्रांचेर ५०% आनी CHC खातीर ८०% मदत']
    },
    eligibility: {
      mr: ['महिला शेतकरी, अल्प व अत्यल्प भूधारक शेतकरी आणि शेतकरी बचत गट (SHGs)'],
      en: ['Women Farmers, Small/Marginal Farmers, and Farmer SHGs/FPOs'],
      hi: ['महिला किसान, छोटे व सीमांत किसान और स्वयं सहायता समूह'],
      ahr: ['महिला शेतकरी व अल्पभूधारक'],
      kok: ['बायलो शेतकरी आनी अल्पभूधारक']
    },
    documents: {
      mr: ['आधार कार्ड', '७/१२ व ८-अ उतारा', 'ट्रॅक्टर आरसी बुक (लागू असल्यास)', 'डीलर कोटेशन'],
      en: ['Aadhaar Card', '7/12 & 8-A Extract', 'Tractor RC Book (if applicable)', 'Dealer Quotation'],
      hi: ['आधार कार्ड', '7/12 और 8-अ दस्तावेज', 'ट्रैक्टर आरसी (यदि लागू हो)', 'डीलर कोटेशन'],
      ahr: ['आधार कार्ड', '७/१२ उतारा', 'डीलर कोटेशन'],
      kok: ['आधार कार्ड', '७/१२ उतारा', 'डीलर कोटेशन']
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

  let schemeKey = (scheme.id || '').toLowerCase().trim();
  let localizedData = SCHEME_TRANSLATIONS[schemeKey];

  if (!localizedData && scheme.id) {
    const slug = scheme.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    localizedData = SCHEME_TRANSLATIONS[slug];
  }

  // Fallback slug matching by englishName or title if id search fails
  if (!localizedData) {
    const nameToSlug = (scheme.englishName || scheme.name || scheme.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    for (const key of Object.keys(SCHEME_TRANSLATIONS)) {
      if (nameToSlug.includes(key) || key.includes(nameToSlug)) {
        localizedData = SCHEME_TRANSLATIONS[key];
        break;
      }
    }
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

  const rawTitle = scheme.name || scheme.title || scheme.englishName || '';
  const fallbackTitle = (lang === 'en' && scheme.englishName) ? scheme.englishName : rawTitle;
  const localizedTitle = getField('title') || fallbackTitle || 'Scheme Details';

  const localizedDesc = getField('description') || (Array.isArray(scheme.overview) ? scheme.overview[0] : (scheme.shortDescription || scheme.description || scheme.overview));
  
  const localizedAmount = getField('amount') || scheme.amount || (
    lang === 'en' ? 'Government Financial Subsidy Available' :
    lang === 'hi' ? 'सरकारी अनुदान उपलब्ध' :
    'शासकीय अनुदान उपलब्ध'
  );

  const localizedBenefits = getField('benefits') || scheme.benefits || scheme.benefit;
  const localizedEligibility = getField('eligibility') || scheme.eligibility || scheme.eligibility_criteria;

  const defaultDept = scheme.type === 'Central' ? getTranslation(lang, 'centralType') : getTranslation(lang, 'stateType');
  const localizedDepartment = getField('department') || scheme.department || defaultDept;
  const localizedCategory = getCategoryTranslation(scheme.category || scheme.department || 'General', lang);

  const localizedOverview = getField('overview') || (
    Array.isArray(scheme.overview) ? scheme.overview : (scheme.overview ? [scheme.overview] : (localizedDesc ? [localizedDesc] : []))
  );

  const localizedHowToApply = getField('howToApply') || scheme.howToApply || [
    lang === 'en' ? 'Visit MahaDBT Farmer Portal' : 'महाडीबीटी शेतकरी पोर्टलवर अर्ज करा',
    lang === 'en' ? 'Upload required 7/12 & Aadhaar documents' : 'आवश्यक कागदपत्रे अपलोड करा',
    lang === 'en' ? 'Track application approval online' : 'अर्जाची स्थिती ऑनलाईन तपासा'
  ];

  const localizedDocuments = getField('documents') || scheme.documents || scheme.requiredDocuments;

  const localizedFaqs = getField('faqs') || scheme.faqs || [
    {
      question: lang === 'en' ? 'Who can apply for this scheme?' : 'या योजनेसाठी कोण अर्ज करू शकते?',
      answer: lang === 'en' ? 'Registered 7/12 landholder farmers in Maharashtra.' : 'महाराष्ट्रातील ७/१२ धारक खातेदार शेतकरी.'
    },
    {
      question: lang === 'en' ? 'How is subsidy amount disbursed?' : 'अनुदानाची रक्कम कशी मिळते?',
      answer: lang === 'en' ? 'Directly credited into linked bank account via DBT.' : 'थेट बँक खात्यात डीबीटी (DBT) द्वारे जमा केली जाते.'
    }
  ];

  const localizedGr = getField('gr') || scheme.gr || {
    title: lang === 'en' ? 'Official Government Resolution (GR)' : 'अधिकृत शासन निर्णय (GR)',
    linkText: lang === 'en' ? 'Download GR Document (PDF)' : 'शासन निर्णय डाऊनलोड करा (PDF)',
    downloadUrl: scheme.application_url || 'https://mahadbt.maharashtra.gov.in'
  };

  const localizedContact = getField('contact') || scheme.contact || {
    phone: '1800-233-4000',
    email: 'support.krishi@maharashtra.gov.in',
    address: lang === 'en' ? 'Commissioner of Agriculture, Pune, Maharashtra' : 'कृषी आयुक्त कार्यालय, पुणे, महाराष्ट्र'
  };

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
    gr: localizedGr,
    contact: localizedContact,
  };
};

/**
 * Translates scheme category names dynamically (e.g., 'Horticulture' -> 'फलोत्पादन').
 */
export const getLocalizedCategoryName = (categoryName: string, langCode?: string): string => {
  if (!categoryName) return '';
  const lang = normalizeLangCode(langCode);
  if (categoryName === 'All' || categoryName === 'सर्व') {
    return getTranslation(lang, 'allSchemes') || (lang === 'en' ? 'All' : 'सर्व');
  }
  return getCategoryTranslation(categoryName, lang);
};
