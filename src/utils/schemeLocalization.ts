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
  "pmksy-per-drop-more-crop-css": {
    "title": {
      "mr": "प्रधानमंत्री कृषि सिंचन योजना - प्रति थेंब अधिक पीक (सूक्ष्म सिंचन घटक)",
      "en": "PMKSY - Per Drop More Crop (Micro-Irrigation Component)",
      "hi": "प्रधानमंत्री कृषि सिंचाई योजना - प्रति बूंद अधिक फसल (सूक्ष्म सिंचाई)",
      "ahr": "प्रधानमंत्री कृषि सिंचन योजना - प्रती थेंब जादा पीक",
      "kok": "प्रधानमंत्री कृषि सिंचन योजना - दर थेंबाक चड पीक"
    },
    "description": {
      "mr": "पिकांच्या झाडाच्या मुळाशी लहानशा नळीद्वारे थेंबथेंब पाणी देण्याची आधुनिक पद्धत म्हणजे ठिबक सिंचन. ठिबक व तुषार सिंचनासाठी ५५% ते ४५% अनुदान.",
      "en": "Drip and Sprinkler micro-irrigation system delivering water drop-by-drop to plant roots. Provides 55% subsidy for small/marginal farmers and 45% for other farmers.",
      "hi": "पौधों की जड़ों में बूंद-बूंद पानी देने की आधुनिक तकनीक। छोटे किसानों के लिए 55% और अन्य किसानों के लिए 45% सब्सिडी।",
      "ahr": "झाडानी मुळाशी ठिबकनं पाणी देनानी आधुनिक पद्धत. लहान शेतकऱ्यासले ५५% अनुदान.",
      "kok": "झाडांच्या मुळांत थेंबाथेंबान उदक दिवपाची पद्धत. ल्हान शेतकऱ्यांक ५५% अनुदान."
    },
    "amount": {
      "mr": "अल्प व अत्यल्प भूधारक शेतकरी: ५५% अनुदान | इतर शेतकरी: ४५% अनुदान",
      "en": "Small & Marginal Farmers: 55% Subsidy | Other Farmers: 45% Subsidy",
      "hi": "लघु एवं सीमांत किसान: 55% सब्सिडी | अन्य किसान: 45% सब्सिडी",
      "ahr": "लहान शेतकरी: ५५% अनुदान | ईतर शेतकरी: ४५% अनुदान",
      "kok": "ल्हान शेतकार: ५५% अनुदान | हेर शेतकार: ४५% अनुदान"
    },
    "department": {
      "mr": "कृषी विभाग",
      "en": "Department of Agriculture",
      "hi": "कृषि विभाग",
      "ahr": "कृषी विभाग",
      "kok": "कृषी विभाग"
    },
    "overview": {
      "mr": [
        "पिकांच्या झाडाच्या मुळाशी लहानशा नळीद्वारे थेंबथेंब पाणी देण्याची आधुनिक पद्धत म्हणजे ठिबक सिंचन. या पद्धतीत, जमिनीत पाणी जिरण्याचा जो वेग असतो, त्यापेक्षा कमी वेगाने पिकास पाणी दिले जाते. मुख्यत्वे करून पाणी थेंबाथेंबाने दिले जाते. ठिबक सिंचनात महाराष्ट्र अग्रेसर असून संपूर्ण भारताच्या ६० टक्के ठिबक सिंचन एकटय़ा महाराष्ट्रात केले जाते.",
        "तुषार सिंचन (ज्यात पाणी शिंपडणारे म्हणून ओळखले जाते) हे एक असे साधन आहे जे शेती पिके, लॉन्स, भूदृश्य, गोल्फ अभ्यासक्रम आणि इतर भागात सिंचन करण्यासाठी वापरली जाते. ते थंड करण्यासाठी आणि वायूच्या धूळ नियंत्रणासाठी देखील वापरली जाते. तुषार सिंचन ही पावसासारख्याच प्रकारे नियंत्रित पद्धतीने पाण्याचा वापर करण्याचा मार्ग आहे. पाणी एका नेटवर्कद्वारे वितरीत केले जाते ज्यामध्ये पंप, वॉल्व्ह , पाईप्स आणि स्पिंकलर्स असू शकतात. या सिंचनाचा वापर निवासी, औद्योगिक आणि कृषी वापरासाठी केला जाऊ शकतो. जेव्हा पंपच्या मदतीने मुख्य पाईपद्वारे दाबून पाणी वाहू दिले जाते तेव्हा फिरणाऱ्या नोझल मधून बाहेर पडते आणि ते पिकावर शिंपडले जाते."
      ],
      "en": [
        "Drip irrigation is a modern method of applying water drop by drop directly to the roots of crop plants through small tubes. Water is supplied at a rate slower than the soil's water absorption capacity. Maharashtra is a national leader in drip irrigation, accounting for 60% of India's total drip-irrigated land.",
        "Sprinkler irrigation (crop rain sprayers) is an irrigation tool used for agricultural crops, lawns, landscapes, and golf courses. It is also used for cooling and controlling airborne dust. Water is distributed through a pipe network consisting of pumps, valves, pipes, and rotating sprinkler nozzles."
      ],
      "hi": [
        "फसलों के पौधों की जड़ों में छोटी नलियों द्वारा बूंद-बूंद पानी देने की आधुनिक तकनीक ड्रिप सिंचाई कहलाती है। ड्रिप सिंचाई में महाराष्ट्र देश में अग्रणी है और भारत के कुल ड्रिप सिंचित क्षेत्र का 60 प्रतिशत अकेले महाराष्ट्र में है।",
        "स्प्रिंकलर सिंचाई (फव्वारा सिंचाई) फसलों और खेतों में नियंत्रित तरीके से बारिश की तरह पानी का छिड़काव करने वाली प्रणाली है। इसमें पंप, पाइप और घूर्णन नोजल के माध्यम से पानी दबाव के साथ फसलों पर छिड़का जाता है।"
      ],
      "ahr": [
        "झाडानी मुळाशी लहानशा नळीद्वारे थेंबथेंब पाणी देनानी आधुनिक पद्धत म्हणजे ठिबक सिंचन. संपूर्ण भारताच्या ६० टक्के ठिबक सिंचन एकट्या महाराष्ट्रात शे.",
        "तुषार सिंचन म्हणजे फवारा पद्धतनं पाणी देना. पाऊस पडस तसं नियंत्रित पद्धतनं पिकासले पाणी मिळस."
      ],
      "kok": [
        "झाडांच्या मुळांत ल्हान नळयांतल्यान थेंबाथेंबान उदक दिवपाची पद्धत म्हळ्यार ठिबक सिंचन. भारतांतल्या ६० टक्के ठिबक सिंचन महाराष्ट्रांत आसा.",
        "तुषार सिंचन म्हळ्यार पावसा भाशेन पिकांक नियंत्रित उदक मारप. पंप, वॉल्व्ह आनी पाईपांच्या आदारान नोझल कडल्यान उदक पिकांचेर शिंपडतात."
      ]
    },
    "benefits": {
      "mr": [
        "अल्प व अत्यल्प भूधारक शेतकरी - ५५ % अनुदान",
        "इतर शेतकरी - ४५ % अनुदान"
      ],
      "en": [
        "Small & Marginal Farmers - 55% Subsidy",
        "Other Farmers - 45% Subsidy"
      ],
      "hi": [
        "लघु एवं सीमांत किसान - 55% सब्सिडी",
        "अन्य किसान - 45% सब्सिडी"
      ],
      "ahr": [
        "लहान व अल्प भूधारक शेतकरी - ५५ % अनुदान",
        "ईतर शेतकरी - ४५ % अनुदान"
      ],
      "kok": [
        "ल्हान व अल्प भूधारक शेतकार - ५५ % अनुदान",
        "हेर शेतकार - ४५ % अनुदान"
      ]
    },
    "eligibility": {
      "mr": [
        "शेतकऱ्याकडे आधार कार्ड असावे.",
        "शेतकऱ्याकडे ७/१२ प्रमाणपत्र आणि 8-अ प्रमाणपत्र असणे आवश्यक आहे.",
        "शेतकरी एससी, एसटी जातिवर्गाचा असेल तर जात प्रमाणपत्र आवश्यक आहे.",
        "पाणी पंपासाठी कायमस्वरूपी वीज जोडणी व वीज बिल असणे आवश्यक आहे."
      ],
      "en": [
        "Farmer must possess a valid Aadhaar Card.",
        "Farmer must have 7/12 land extract and 8-A certificates.",
        "Caste certificate is required if belonging to SC/ST categories.",
        "Permanent electricity connection and latest electricity bill required for water pump."
      ],
      "hi": [
        "किसान के पास आधार कार्ड होना अनिवार्य है।",
        "किसान के नाम 7/12 और 8-अ खसरा/खतौनी होना आवश्यक है।",
        "अनुसूचित जाति/जनजाति के किसानों के लिए जाति प्रमाण पत्र आवश्यक।",
        "कृषि पंप के लिए स्थायी बिजली कनेक्शन और नवीनतम बिजली बिल अनिवार्य है।"
      ],
      "ahr": [
        "शेतकऱ्याकडं आधार कार्ड पायजे.",
        "७/१२ अन ८-अ उतारा असवा.",
        "SC/ST वर्गना असाल तं जातीचा दाखला पायजे.",
        "वीज कनेक्शन अन चालू लाईट बिल आवश्यक."
      ],
      "kok": [
        "शेतकऱ्या कडेन आधार कार्ड आसपाक जाय.",
        "७/१२ आनी ८-अ दाखलो आसपाक जाय.",
        "SC/ST वर्गाचो आसल्यार जातीचो दाखलो जाय.",
        "विजेचे बील आनी पॉवर कनेक्शन जाय."
      ]
    },
    "documents": {
      "mr": [
        "७/१२ प्रमाणपत्र",
        "८-ए प्रमाणपत्र",
        "वीज बिल",
        "खरेदी केलेल्या संचाचे बिल",
        "पूर्वसंमती पत्र"
      ],
      "en": [
        "7/12 Land Certificate",
        "8-A Extract Certificate",
        "Electricity Bill Copy",
        "Equipment Purchase Invoice",
        "Pre-sanction Approval Letter"
      ],
      "hi": [
        "7/12 प्रमाण पत्र",
        "8-अ खसरा प्रमाण पत्र",
        "बिजली बिल",
        "उपकरण खरीद बिल",
        "पूर्व-स्वीकृति पत्र"
      ],
      "ahr": [
        "७/१२ दाखला",
        "८-अ दाखला",
        "लाइट बिल",
        "खरेदी बिल",
        "पूर्वसंमती पत्र"
      ],
      "kok": [
        "७/१२ दाखलो",
        "८-अ दाखलो",
        "विजेचे बील",
        "खरेदी बील",
        "पूर्वसंमती पत्र"
      ]
    },
    "howToApply": {
      "mr": [
        "१) महाडीबीटी (MahaDBT) शेतकरी योजनेच्या अधिकृत पोर्टलला (mahadbt.maharashtra.gov.in) भेट द्या.",
        "२) 'नवीन अर्जदार नोंदणी' वर क्लिक करून युझर आयडी व पासवर्ड तयार करा किंवा आधार क्रमांकाने लॉगिन करा.",
        "३) 'वैयक्तिक माहिती' व 'शेतजमिनीचा तपशील' अचूक भरा.",
        "४) 'कृषी योजना' विभागात जाऊन सूक्ष्म सिंचन घटकाची निवड करा.",
        "५) आवश्यक कागदपत्रे स्कॅन करून अपलोड करा.",
        "६) फॉर्म सबमिट करा आणि पूर्वसंमती पत्र मिळाल्यावर खरेदी करा."
      ],
      "en": [
        "1) Visit the official MahaDBT Farmer Portal (mahadbt.maharashtra.gov.in).",
        "2) Register as new user or login using Aadhaar Number.",
        "3) Fill in Personal and Land Details (7/12 & 8-A extract).",
        "4) Select Micro-Irrigation Component under Agriculture Schemes.",
        "5) Upload scanned copies of required documents.",
        "6) Submit application and purchase equipment after Pre-Sanction approval."
      ],
      "hi": [
        "1) आधिकारिक महाडीबीटी किसान पोर्टल (mahadbt.maharashtra.gov.in) पर जाएं।",
        "2) यूजर आईडी और पासवर्ड बनाएं या आधार नंबर से लॉगिन करें।",
        "3) व्यक्तिगत विवरण और कृषि भूमि विवरण (7/12 और 8-अ नकल) भरें।",
        "4) 'कृषि योजनाएं' अनुभाग में सूक्ष्म सिंचाई घटक का चयन करें।",
        "5) आवश्यक दस्तावेज स्कैन करके अपलोड करें।",
        "6) आवेदन सबमिट करें और पूर्व-स्वीकृति पत्र मिलने के बाद उपकरण खरीदें।"
      ],
      "ahr": [
        "१) महाडीबीटी पोर्टलवर (mahadbt.maharashtra.gov.in) जावा.",
        "२) लॉगिन करा अन ७/१२, ८-अ उतारा भरा.",
        "३) सूक्ष्म सिंचन योजना निवडा अन कागदपत्रे अपलोड करा.",
        "४) फॉर्म सबमिट करा अन पूर्व-मंजुरी पत्र मिळनावर खरेदी करा."
      ],
      "kok": [
        "१) महाडीबीटी पोर्टलार (mahadbt.maharashtra.gov.in) वचात.",
        "२) लॉगिन करात आनी ७/१२, ८-अ दाखलो भरात.",
        "३) सूक्ष्म सिंचन योजना विंचून कागदपत्रां अपलोड करात.",
        "४) फॉर्म सबमिट करात आनी पूर्व-मंजुरी मेळटकीच खरेदी करात."
      ]
    }
  },
  "bhausaheb-fundkar-falbag-lagvad-yojana": {
    "title": {
      "mr": "भाऊसाहेब फुंडकर फळबाग लागवड योजना",
      "en": "Bhausaheb Fundkar Orchard Plantation Scheme",
      "hi": "भाऊसाहेब फुंडकर फलबाग रोपण योजना",
      "ahr": "भाऊसाहेब फुंडकर फळबाग लागवड योजना",
      "kok": "भाऊसाहेब फुंडकर फळबाग लागवड योजना"
    },
    "description": {
      "mr": "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजनेअंतर्गत न बसणाऱ्या शेतकऱ्यांसाठी ५०%, ३०% व २०% या ३ वर्षांच्या टप्प्यात १००% फळबाग लागवड अनुदान.",
      "en": "100% financial assistance for orchard plantation over 3 years (50% in 1st year, 30% in 2nd year, 20% in 3rd year) for farmers ineligible under MGNREGA scheme.",
      "hi": "मनरेगा योजना के तहत अपात्र किसानों के लिए 3 वर्षों में (50%, 30%, 20%) फलबाग लगाने के लिए 100% वित्तीय सहायता।",
      "ahr": "मनरेगा मंदी न बसनार शेतकऱ्यासले ३ वर्षात ५०%, ३०%, २०% फळबाग लागवड अनुदान.",
      "kok": "मनरेगांत न बसपी शेतकऱ्यांक ३ वर्सांत ५०%, ३०%, २०% फळबाग लागवड अनुदान."
    },
    "amount": {
      "mr": "पहिल्या वर्षी ५०%, दुसऱ्या वर्षी ३०%, तिसऱ्या वर्षी २०% अनुदान (३ वर्षांत १००% सहाय्य)",
      "en": "50% in 1st Year, 30% in 2nd Year, 20% in 3rd Year (100% total assistance over 3 years)",
      "hi": "प्रथम वर्ष 50%, द्वितीय वर्ष 30%, तृतीय वर्ष 20% अनुदान (3 वर्षों में 100% कुल सहायता)",
      "ahr": "पहील्या वर्षी ५०%, दुसऱ्या वर्षी ३०%, तिसऱ्या वर्षी २०% अनुदान",
      "kok": "पयल्या वर्सा ५०%, दुसऱ्या वर्सा ३०%, तिसऱ्या वर्सा २०% अनुदान"
    },
    "department": {
      "mr": "कृषी विभाग",
      "en": "Department of Agriculture",
      "hi": "कृषि विभाग",
      "ahr": "कृषी विभाग",
      "kok": "कृषी विभाग"
    },
    "overview": {
      "mr": [
        "१) सन २०१८-१९ पासून राज्यात भाऊसाहेब फुंडकर फळबाग लागवड योजना नव्याने सुरु करण्यात आली आहे. या योजनेमध्ये केंद्र शासनाच्या महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजनेअंतर्गत जे लाभार्थी फळबाग लागवड बाबीचा लाभ घेऊ शकत नाही, त्यांना लाभ देण्यात येणार आहे. सदर योजना शासनाच्या कृषी विभागामार्फत राबविली जात आहे.",
        "२) योजनेत भाग घेणाऱ्या शेतकऱ्यांना मंजूर अनुदान पहिल्या वर्षी ५०%, दुसऱ्या वर्षी ३०% आणि तिसऱ्या वर्षी २०% अश्या तीन वर्षात देण्यात येणार असून लाभार्थी शेतकऱ्याने दुसऱ्या व तिसऱ्या वर्षीच्या अनुदानाचा लाभ घेण्यासाठी लागवड केलेल्या झाडांचे जीविताचे प्रमाण बागायती झाडांसाठी ९०% तर कोरडवाहू झाडांसाठी ८०% ठेवणे आवश्यक आहे.",
        "३) या योजनेत भाग करण्यासाठी शेतकरी कोंकण विभागात कमीत कमी १० गुंठे तर जास्तीच जास्त १० हे. आणि इतर विभागात कमीत कमी २० गुंठे तर जास्तीच जास्त ६ हे. क्षेत्र मर्यादित लाभ घेऊ शकतो."
      ],
      "en": [
        "1) The Bhausaheb Fundkar Orchard Plantation Scheme was newly launched in Maharashtra from the year 2018-19. Under this scheme, farmers who cannot avail orchard plantation benefits under the Central Government's MGNREGA scheme are provided financial assistance. This scheme is implemented by the Department of Agriculture.",
        "2) Farmers participating in the scheme receive sanctioned subsidies in three annual installments: 50% in the 1st year, 30% in the 2nd year, and 20% in the 3rd year. To qualify for 2nd and 3rd-year subsidies, farmers must maintain a plant survival rate of 90% for irrigated fruit trees and 80% for rainfed fruit trees.",
        "3) Landholding Eligibility Limit: Farmers in Konkan division can claim benefits for minimum 10 Guntha up to maximum 10 Hectares; in other divisions of Maharashtra, minimum 20 Guntha up to maximum 6 Hectares."
      ],
      "hi": [
        "1) महाराष्ट्र सरकार ने वर्ष 2018-19 से भाऊसाहेब फुंडकर फलबाग रोपण योजना शुरू की है। जो किसान मनरेगा योजना के तहत लाभ नहीं ले पाते हैं, उन्हें इस योजना के अंतर्गत सहायता दी जाती है।",
        "2) सब्सिडी तीन वर्षों में दी जाती है: प्रथम वर्ष 50%, द्वितीय वर्ष 30% और तृतीय वर्ष 20%। द्वितीय व तृतीय वर्ष की सब्सिडी के लिए सिंचित पौधों का जीवित प्रतिशत 90% और बारानी (कोरडवाहू) पौधों का 80% होना अनिवार्य है।",
        "3) भूमि सीमा: कोंकण क्षेत्र में न्यूनतम 10 गुंठा से अधिकतम 10 हेक्टेयर; अन्य क्षेत्रों में न्यूनतम 20 गुंठा से अधिकतम 6 हेक्टेयर।"
      ],
      "ahr": [
        "१) २०१८-१९ पासुन भाऊसाहेब फुंडकर फळबाग लागवड योजना चालु झाली शे. मनरेगा मंदी न बसनार शेतकऱ्यासले या योजनेचा लाभ मिळस.",
        "२) अनुदान ३ वर्षात ५०%, ३०%, २०% मिळस. दुसऱ्या व तिसऱ्या वर्षी झाडं जगनाचे प्रमाण ९०% (बागायती) अन ८०% (कोरडवाहू) पायजे.",
        "३) कोकण मंदी १० गुंठे ते १० हेक्टर अन ईतर भागात २० गुंठे ते ६ हेक्टर मर्यादा शे."
      ],
      "kok": [
        "१) २०१८-१९ साला सावन भाऊसाहेब फुंडकर फळबाग लागवड योजना सुरू जाल्या. मनरेगांत न बसपी शेतकऱ्यांक हाचो लाभ मेळटा.",
        "२) अनुदान ३ वर्सांत ५०%, ३०%, २०% मेळटले. झाडां जिवंत उरपाचे प्रमाण ९०% आनी ८०% आसपाक जाय.",
        "३) कोकणांत १० गुंठे ते १० हेक्टर आनी हेर भागांत २० गुंठे ते ६ हेक्टर मर्यादा आसा."
      ]
    },
    "benefits": {
      "mr": [
        "पहिल्या वर्षी ५०% अनुदान (खड्डे खणणे व लागवड)",
        "दुसऱ्या वर्षी ३०% अनुदान (झाडांचे संगोपन)",
        "तिसऱ्या वर्षी २०% अनुदान (झाडांचे संरक्षण)"
      ],
      "en": [
        "1st Year: 50% Subsidy (Pit Digging & Graft Planting)",
        "2nd Year: 30% Subsidy (Plant Nurturing & Maintenance)",
        "3rd Year: 20% Subsidy (Plant Protection & Growth)"
      ],
      "hi": [
        "प्रथम वर्ष: 50% सब्सिडी (गड्ढे खोदना और रोपण)",
        "द्वितीय वर्ष: 30% सब्सिडी (पौधों की देखभाल)",
        "तृतीय वर्ष: 20% सब्सिडी (पौधों का संरक्षण)"
      ],
      "ahr": [
        "पहील्या वर्षी ५०% अनुदान (खड्डे खणना अन झाडं लावना)",
        "दुसऱ्या वर्षी ३०% अनुदान (संगोपन)",
        "तिसऱ्या वर्षी २०% अनुदान (संरक्षण)"
      ],
      "kok": [
        "पयल्या वर्सा ५०% अनुदान (खणी खणप आनी झाडां लावप)",
        "दुसऱ्या वर्सा ३०% अनुदान (राखण)",
        "तिसऱ्या वर्सा २०% अनुदान (वाड)"
      ]
    },
    "eligibility": {
      "mr": [
        "लाभार्थ्यास फळबाग लागवडीसाठी ठिबक सिंचन संच बसविणे अनिवार्य आहे.",
        "शेतकऱ्यास स्वतःच्या नावावर ७/१२ असणे आवश्यक आहे.",
        "अल्प, अत्यल्प भूधारक, महिला आणि दिव्यांग शेतकऱ्यांना प्राधान्य.",
        "शेतकऱ्याने मनरेगा योजनेअंतर्गत लाभ घेतलेला नसावा."
      ],
      "en": [
        "Installation of Drip Irrigation system is mandatory.",
        "Farmer must have 7/12 land extract registered in their own name.",
        "Priority given to Small, Marginal, Women, and Divyang farmers.",
        "Farmer must not have availed orchard plantation benefits under MGNREGA scheme."
      ],
      "hi": [
        "ड्रिप सिंचाई प्रणाली स्थापित करना अनिवार्य है।",
        "किसान के नाम 7/12 खतौनी होना आवश्यक है।",
        "लघु, सीमांत, महिला एवं दिव्यांग किसानों को प्राथमिकता।",
        "किसान ने मनरेगा योजना के तहत लाभ न लिया हो।"
      ],
      "ahr": [
        "ठिबक सिंचन संच बसवना अनिवार्य शे.",
        "स्वतःना नावावर ७/१२ असवा.",
        "लहान, महिला अन अपंग शेतकऱ्यासले प्राधान्य."
      ],
      "kok": [
        "ठिबक सिंचन संच बसोवप जाय.",
        "स्वतःच्या नांवार ७/१२ आसपाक जाय.",
        "ल्हान, बायलो आनी अपंग शेतकऱ्यांक प्राधान्य."
      ]
    },
    "documents": {
      "mr": [
        "७/१२ दाखला व ८-अ उतारा",
        "आधार कार्ड",
        "बँक पासबुक छायाप्रत",
        "ठिबक सिंचन बसविल्याचे प्रमाणपत्र"
      ],
      "en": [
        "7/12 Land Extract and 8-A Certificate",
        "Aadhaar Card Copy",
        "Bank Passbook Photo Copy",
        "Drip Irrigation Installation Certificate"
      ],
      "hi": [
        "7/12 और 8-अ खसरा नकल",
        "आधार कार्ड प्रति",
        "बैंक पासबुक की प्रति",
        "ड्रिप सिंचाई स्थापना प्रमाण पत्र"
      ],
      "ahr": [
        "७/१२ अन ८-अ उतारा",
        "आधार कार्ड",
        "बँक पासबुक",
        "ठिबक बिल"
      ],
      "kok": [
        "७/१२ आनी ८-अ दाखलो",
        "आधार कार्ड",
        "बँक पासबुक",
        "ठिबक बील"
      ]
    },
    "howToApply": {
      "mr": [
        "१) महाडीबीटी (MahaDBT) पोर्टलवर (mahadbt.maharashtra.gov.in) नोंदणी करून लॉगिन करा.",
        "२) 'फलोत्पादन घटक' निवडून 'भाऊसाहेब फुंडकर फळबाग लागवड योजना' वर क्लिक करा.",
        "३) शेतजमिनीचा ७/१२ उतारा व लागवड करावयाच्या फळझाडांचा प्रकार निवडा.",
        "४) आवश्यक कागदपत्रे (७/१२, ८-अ, आधार कार्ड) अपलोड करा.",
        "५) कृषी विभागाकडून पूर्वसंमती पत्र मिळाल्यावर कलमे खरेदी करून लागवड करा."
      ],
      "en": [
        "1) Register and login on MahaDBT Portal (mahadbt.maharashtra.gov.in).",
        "2) Select 'Horticulture Component' and click on 'Bhausaheb Fundkar Orchard Scheme'.",
        "3) Enter 7/12 land extract details and choose fruit crop type.",
        "4) Upload required documents (7/12, 8-A, Aadhaar Card).",
        "5) Purchase approved grafts and plant them after receiving Pre-Sanction letter."
      ],
      "hi": [
        "1) महाडीबीटी पोर्टल (mahadbt.maharashtra.gov.in) पर पंजीकरण कर लॉगिन करें।",
        "2) 'बागवानी घटक' में 'भाऊसाहेब फुंडकर फलबाग योजना' चुनें।",
        "3) 7/12 खतौनी और फल फसल का चयन करें।",
        "4) आवश्यक दस्तावेज अपलोड करें।",
        "5) पूर्व-स्वीकृति पत्र मिलने के बाद रोपण करें।"
      ],
      "ahr": [
        "१) महाडीबीटी पोर्टलवर लॉगिन करा.",
        "२) भाऊसाहेब फुंडकर फळबाग योजना निवडा.",
        "३) ७/१२ अन फळझाड प्रकार निवडा.",
        "४) कागदपत्रे अपलोड करा अन पूर्व-मंजुरी पत्र मिळनावर लागवड करा."
      ],
      "kok": [
        "१) महाडीबीटी पोर्टलार लॉगिन करात.",
        "२) भाऊसाहेब फुंडकर फळबाग योजना विंचात.",
        "३) ७/१२ आनी फळझाड प्रकार विंचात.",
        "४) कागदपत्रां अपलोड करात आनी पूर्व-मंजुरी मेळटकीच लागवड करात."
      ]
    }
  }
};

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

  // If Marathi ('mr'), preserve 100% of the original official scheme info from database/MOCK
  if (lang === 'mr') {
    const rawTitle = scheme.title || scheme.name || scheme.englishName;
    const rawDesc = scheme.description || scheme.shortDescription || (Array.isArray(scheme.overview) ? scheme.overview[0] : scheme.overview);
    const rawOverview = scheme.overview || (rawDesc ? [rawDesc] : []);
    const rawBenefits = scheme.benefits || scheme.benefit;
    const rawEligibility = scheme.eligibility || scheme.eligibility_criteria;
    const rawDocuments = scheme.documents || scheme.requiredDocuments;
    const rawAmount = scheme.amount;
    const rawDept = scheme.department || scheme.category || 'कृषी विभाग';

    return {
      ...scheme,
      title: rawTitle,
      name: rawTitle,
      description: rawDesc,
      shortDescription: rawDesc,
      amount: rawAmount,
      benefits: rawBenefits,
      benefit: rawBenefits,
      eligibility_criteria: Array.isArray(rawEligibility) ? rawEligibility.join('\n• ') : rawEligibility,
      eligibility: rawEligibility,
      department: rawDept,
      category: getCategoryTranslation(scheme.category || scheme.department || 'General', 'mr'),
      overview: rawOverview,
      howToApply: scheme.howToApply || [
        'महाडीबीटी शेतकरी पोर्टलवर नोंदणी करा',
        'आवश्यक कागदपत्रे अपलोड करा',
        'अर्जाची स्थिती ऑनलाईन तपासा'
      ],
      documents: rawDocuments,
      requiredDocuments: rawDocuments,
      faqs: scheme.faqs || [
        {
          question: 'या योजनेसाठी कोण अर्ज करू शकते?',
          answer: 'महाराष्ट्रातील ७/१२ धारक खातेदार शेतकरी.'
        },
        {
          question: 'अनुदानाची रक्कम कशी मिळते?',
          answer: 'थेट बँक खात्यात डीबीटी (DBT) द्वारे जमा केली जाते.'
        }
      ],
      gr: scheme.gr || {
        title: 'अधिकृत शासन निर्णय (GR)',
        linkText: 'शासन निर्णय डाऊनलोड करा (PDF)',
        downloadUrl: scheme.application_url || 'https://mahadbt.maharashtra.gov.in'
      },
      contact: scheme.contact || {
        phone: '1800-233-4000',
        email: 'support.krishi@maharashtra.gov.in',
        address: 'कृषी आयुक्त कार्यालय, पुणे, महाराष्ट्र'
      },
    };
  }

  // For other languages ('en', 'hi', 'ahr', 'kok'):
  let schemeKey = (scheme.id || '').toLowerCase().trim();
  let localizedData = SCHEME_TRANSLATIONS[schemeKey];

  if (!localizedData && scheme.id) {
    const slug = scheme.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    localizedData = SCHEME_TRANSLATIONS[slug];
  }

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
    }
    return fallbackValue;
  };

  const localizedTitle = getField('title') || (lang === 'en' && scheme.englishName ? scheme.englishName : (scheme.name || scheme.title));
  const localizedDesc = getField('description') || scheme.shortDescription || scheme.description;
  const localizedAmount = getField('amount') || scheme.amount;
  const localizedBenefits = getField('benefits') || scheme.benefits || scheme.benefit;
  const localizedEligibility = getField('eligibility') || scheme.eligibility || scheme.eligibility_criteria;
  const localizedDepartment = getField('department') || scheme.department;
  const localizedCategory = getCategoryTranslation(scheme.category || scheme.department || 'General', lang);
  const localizedOverview = getField('overview') || scheme.overview;
  const localizedHowToApply = getField('howToApply') || scheme.howToApply;
  const localizedDocuments = getField('documents') || scheme.documents || scheme.requiredDocuments;
  const localizedFaqs = getField('faqs') || scheme.faqs;
  const localizedGr = getField('gr') || scheme.gr;
  const localizedContact = getField('contact') || scheme.contact;

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
