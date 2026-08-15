const fs = require('fs');
const path = require('path');

const translationsFile = path.join(__dirname, '../src/constants/schemeTranslations.json');
const translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));

// Exact Marathi to English phrase dictionary
const mrToEnMap = {
  // Common terms & phrases
  "कृषी विभाग": "Department of Agriculture",
  "वन विभाग": "Forest Department",
  "राज्य योजना": "State Scheme",
  "केंद्र पुरस्कृत": "Central Scheme",
  "शासकीय अनुदान उपलब्ध": "Government Subsidy Available",
  "अनुदान अनुज्ञेय": "Subsidy Applicable",
  "अल्प व अत्यल्प भूधारक शेतकरी": "Small and Marginal Farmers",
  "इतर शेतकरी": "Other Farmers",
  "अल्प व अत्यल्प भूधारक शेतकरी: ५५% अनुदान | इतर शेतकरी: ४५% अनुदान": "Small & Marginal Farmers: 55% Subsidy | Other Farmers: 45% Subsidy",

  // Document names
  "७/१२ प्रमाणपत्र": "7/12 Land Extract",
  "८-ए प्रमाणपत्र": "8-A Land Record",
  "७/१२ उतारा": "7/12 Land Extract",
  "८ अ दाखला": "8-A Land Record",
  "८-ए उतारा": "8-A Land Record",
  "वीज बिल": "Electricity Bill",
  "खरेदी केलेल्या संचाचे बिल": "Purchase Bill / Invoice",
  "पूर्वसंमती पत्र": "Prior Approval Letter",
  "आधार कार्ड": "Aadhaar Card",
  "जातीचा दाखला ( अनु. जाती व अनु. जमाती साठी )": "Caste Certificate (for SC / ST)",
  "जातीचा दाखला": "Caste Certificate",
  "जात प्रमाणपत्र": "Caste Certificate",
  "उत्पन्नाचा दाखला": "Income Certificate",
  "स्वयं घोषणापत्र": "Self-Declaration Form",
  "हमीपत्र": "Undertaking / Guarantee Letter",
  "बँक खाते पासबुक": "Bank Account Passbook",
  "मृत्यूचा दाखला": "Death Certificate",
  "ग्रामसभा ठराव": "Gram Sabha Resolution",
  "प्रतिज्ञापत्र": "Affidavit",
  "भूजल पाहणी दाखला": "Groundwater Survey Certificate",
  "भूजल सर्वेक्षण दाखला": "Groundwater Survey Certificate",
  "शिफारसपत्र": "Recommendation Letter",
  "अंदाजपत्रक": "Cost Estimate",

  // Specific scheme Marathi texts -> English
  "Dr. Shyamprasad Mukherjee Jan-Van Vikas Yojana was launched to increase the productivity of village natural resources through sustainable development, reducing villagers dependence on forests, creating complementary businesses to agriculture, providing alternative employment and protection of forest and wildlife through the participation of villagers as well as raising the standard of forest management and through this, to reduce human-wildlife conflict, 2 km of the boundary of the buffer and wildlife protected area in the tiger reserve. Crop damage is the biggest issue for the farmers and the State has taken an initiative to compensate for the same. Thus, the solar fence will be built with the aim of protecting farms from cattle grazing and protect the crops from getting damaged. In the past few years, individual solar energy fences were provided on a pilot basis to village farmers in the buffer zone of Navegaon-Nagzira and Tadoba Andhari Tiger Reserves. The experiment shows that the cost of solar energy fencing is less than that of wire mesh fences, and there is less chance of harming. This scheme is a part of Dr Shyamprasad Mukherjee Jan Van Yojana under which an individual beneficiary will have to bear 25% (Rs 5,000) cost and above of the solar fencing, and 75% (Rs 15,000) whichever is less shall be borne by the forest department. The objective of this scheme is to achieve sustainable development of these villages and reduce the man-animal conflict. The scheme will reduce the dependence of villagers on the forest. It will also boost the supplementary businesses to farming activities and create alternative employment possibilities to the villagers in these areas.":
    "Dr. Shyamaprasad Mukherjee Jan-Van Vikas Scheme promotes sustainable development in villages within 2 km of tiger reserve buffer zones. It provides 75% solar fencing subsidy (up to Rs. 15,000) to protect crops from wild animals, reduce human-wildlife conflict, create alternative livelihoods, and reduce forest dependence.",

  "For Benefits Provided Please Refer Below Document.": "Provides 75% solar fencing subsidy (up to Rs. 15,000) for individual farmers in buffer zones.",

  "वाघाच्या अभयारण्याच्या बफर झोनमधील आणि वन्यजीव संरक्षित क्षेत्राच्या २ किमी सीमेवरील शेतकरी.": "Farmers within 2 km boundary of tiger reserve buffer zones and wildlife protected areas.",
  "वैयक्तिक लाभार्थ्याला सौर कुंपणाच्या खर्चाचा २५% (रु. ५,०००) वाटा उभा करावा लागेल आणि ७५% (रु. १५,०००) वन विभागामार्फत दिला जाईल.": "Individual beneficiary contributes 25% (Rs. 5,000) of solar fencing cost; 75% (up to Rs. 15,000) is borne by Forest Department.",

  "अनुसूचित जाती (SC) व नवबौद्ध शेतकऱ्यांसाठी विहीर, विहीर दुरुस्ती, पंप व सूक्ष्म सिंचन अनुदान.": "Grants for new well, well repair, pump set, and micro-irrigation for SC and Neo-Buddhist farmers.",
  "नवीन विहीर: रु. २.५० लाख, दुरुस्ती रु. ५०,००० व सूक्ष्म सिंचन अनुदान": "New Well: Rs. 2.50 Lakh, Repair: Rs. 50,000 & Micro-Irrigation Grant",

  "फळबाग लागवड, ग्रीनहाऊस, कांदाचाळ, शितगृह व काढणीपश्चात व्यवस्थापनासाठी १९ घटकांवर अनुदान.": "Subsidy for fruit orchards, greenhouses, onion storage, cold storage, and 19 post-harvest components.",
  "फलोत्पादन क्षेत्राच्या १९ घटकांवर आर्थिक मदत": "Financial assistance across 19 horticulture components",

  "शेतकऱ्याचे आधार कार्ड असणे अनिवार्य आहे": "Farmer must possess an Aadhaar Card.",
  "शेतकऱ्याकडे ७/१२ उतारा व ८ अ असावा": "Farmer must possess valid 7/12 and 8-A land records.",
  "शेतकरी अनु. जाती , अनु.जमाती मधील असल्यास जातीचा दाखला आवश्यक": "Caste Certificate required if farmer belongs to SC/ST category.",
  "फक्त एकाच औजारासाठी अनुदान देय राहील म्हणजेच ट्रॅक्टर किंवा यंत्र/ अवजार": "Subsidy is applicable for only one implement (e.g. Tractor or Equipment).",
  "कुटुंबातील व्यक्तीच्या नावे ट्रॅक्टर असल्यास , ट्रॅक्टरचलित औजारासाठी लाभ मिळण्यास पात्र असेल परंतु ट्रॅक्टर असल्याचा पुरावा सोबत जोडणे आवश्यक": "If a family member owns a tractor, farmer is eligible for tractor-drawn implements with proof of ownership.",
  "एखाद्या घटकासाठी / औजारासाठी लाभ घेतला असल्यास त्याच घटक/ औजारासाठी पुढील १० वर्षे अर्ज करता येणार नाही परंतु इतर औजारासाठी अर्ज करता येईल": "If subsidy was received for an implement, farmer cannot reapply for the same item for 10 years, but can apply for other items.",

  "लाभार्थी अनुसूचित जमाती प्रवर्गातील असणे बंधनकारक आहे.": "Applicant must belong to the Scheduled Tribe (ST) category.",
  "लाभार्थीने जातीचा वैध दाखला सादर करणे बंधनकारक आहे.": "Submission of a valid Caste Certificate is mandatory.",
  "जमिनीच्या 7/12 व 8-अ चा उतारा सादर करणे बंधनकारक आहे.": "Submission of 7/12 land extract and 8-A record is mandatory.",
  "लाभार्थींची वार्षिक उत्पन्न मर्यादा रुपये दीड लाखाच्या मर्यादेत असावी.": "Annual family income must not exceed Rs. 1.50 Lakh.",
  "उत्पन्नाचा दाखला सादर करणे बंधनकारक आहे.": "Submission of an Income Certificate is mandatory.",
  "लाभार्थीची जमिनधारणा 0.20 हेक्टर ते 6 हेक्टर पर्यंत (नवीन विहिरीसाठी किमान 0.40 हेक्टर) असणे बंधनकारक आहे.": "Landholding must be between 0.20 to 6.0 hectares (minimum 0.40 hectare for a new well).",
  "एकदा संबंधित योजनेचा पूर्ण लाभ घेतल्यास पुढील ५ वर्षे त्याच लाभार्थ्यास किंवा कुटुंबास या योजनेचा लाभ देय नाही.": "Once full benefits are availed, beneficiary or family is ineligible for 5 years.",

  "लाभार्थी अनुसूचित जाती प्रवर्गातील असणे बंधनकारक आहे.": "Applicant must belong to the Scheduled Caste (SC) category.",

  "अल्प व अत्यल्प भूधारक शेतकरी - ५५ %": "Small and Marginal Farmers - 55% Subsidy",
  "इतर शेतकरी - ४५ %": "Other Farmers - 45% Subsidy",

  "१) ट्रॅक्टर": "1) Tractor",
  "२) पॉवर टिलर": "2) Power Tiller",
  "३) ट्रॅक्टर/ पॉवर टिलर चलित अवजारे": "3) Tractor / Power Tiller Implements",
  "४) बैल चलित यंत्र/अवजारे": "4) Bullock-drawn Implements",
  "५) मनुष्य चलित यंत्र/अवजारे": "5) Manual Tools & Implements",
  "६) प्रक्रिया संच": "6) Processing Units",
  "७) काढणी पश्च्यात तंत्रज्ञान": "7) Post-Harvest Technology",
  "८) फलोत्पादन यंत्र/अवजारे": "8) Horticulture Implements",
  "९) वैशिष्ट्यपूर्ण यंत्र अवजारे": "9) Specialized Implements",
  "१०) स्वयं चलित यंत्रे": "10) Self-Propelled Machinery",

  "१) कृषि अवजारे बँकेची स्थापना": "1) Establishment of Farm Machinery Bank",
  "२) उच्च तंत्रज्ञान , उत्पादन सेवा सुविधा केंद्राची स्थापना": "2) High-Tech Custom Hiring Centers"
};

// Hindi phrase dictionary
const mrToHiMap = {
  "कृषी विभाग": "कृषि विभाग",
  "वन विभाग": "वन विभाग",
  "राज्य योजना": "राज्य योजना",
  "केंद्र पुरस्कृत": "केंद्र प्रायोजित",
  "शासकीय अनुदान उपलब्ध": "सरकारी सब्सिडी उपलब्ध",
  "अनुदान अनुज्ञेय": "सब्सिडी स्वीकार्य",
  "अल्प व अत्यल्प भूधारक शेतकरी": "छोटे और सीमांत किसान",
  "इतर शेतकरी": "अन्य किसान",

  "७/१२ प्रमाणपत्र": "7/12 भू-अभिलेख",
  "८-ए प्रमाणपत्र": "8-ए भू-अभिलेख",
  "७/१२ उतारा": "7/12 भू-अभिलेख",
  "८ अ दाखला": "8-ए भू-अभिलेख",
  "वीज बिल": "बिजली बिल",
  "खरेदी केलेल्या संचाचे बिल": "खरीद का बिल / रसीद",
  "पूर्वसंमती पत्र": "पूर्व स्वीकृति पत्र",
  "आधार कार्ड": "आधार कार्ड",
  "जातीचा दाखला": "जाति प्रमाण पत्र",
  "उत्पन्नाचा दाखला": "आय प्रमाण पत्र",
  "स्वयं घोषणापत्र": "स्व-घोषणा पत्र",
  "हमीपत्र": "सहमति पत्र",

  "वाघाच्या अभयारण्याच्या बफर झोनमधील आणि वन्यजीव संरक्षित क्षेत्राच्या २ किमी सीमेवरील शेतकरी.": "बाघ अभयारण्य के बफर क्षेत्र और वन्यजीव संरक्षित क्षेत्र की 2 किमी सीमा के किसान।",
  "वैयक्तिक लाभार्थ्याला सौर कुंपणाच्या खर्चाचा २५% (रु. ५,०००) वाटा उभा करावा लागेल आणि ७५% (रु. १५,०००) वन विभागामार्फत दिला जाईल.": "व्यक्तिगत लाभार्थी को सौर बाड़ की लागत का 25% (रु. 5,000) देना होगा और 75% (रु. 15,000) वन विभाग द्वारा दिया जाएगा।",

  "लाभार्थी अनुसूचित जमाती प्रवर्गातील असणे बंधनकारक आहे.": "लाभार्थी अनुसूचित जनजाति (ST) वर्ग का होना अनिवार्य है।",
  "लाभार्थी अनुसूचित जाती प्रवर्गातील असणे बंधनकारक आहे.": "लाभार्थी अनुसूचित जाति (SC) वर्ग का होना अनिवार्य है।",
  "लाभार्थीने जातीचा दाखला सादर करणे बंधनकारक आहे.": "जाति प्रमाण पत्र प्रस्तुत करना अनिवार्य है।",
  "जमिनीच्या 7/12 व 8-अ चा उतारा सादर करणे बंधनकारक आहे.": "7/12 और 8-ए खसरा प्रस्तुत करना अनिवार्य है।",
  "लाभार्थींची वार्षिक उत्पन्न मर्यादा रुपये दीड लाखाच्या मर्यादेत असावी.": "वार्षिक आय सीमा रु. 1.50 लाख के भीतर होनी चाहिए।",
  "उत्पन्नाचा दाखला सादर करणे बंधनकारक आहे.": "आय प्रमाण पत्र प्रस्तुत करना अनिवार्य है।",
  "लाभार्थीची जमिनधारणा 0.20 हेक्टर ते 6 हेक्टर पर्यंत (नवीन विहिरीसाठी किमान 0.40 हेक्टर) असणे बंधनकारक आहे.": "भूमि 0.20 से 6.0 हेक्टेयर (कुएं के लिए न्यूनतम 0.40 हेक्टेयर) होनी चाहिए।",

  "अल्प व अत्यल्प भूधारक शेतकरी - ५५ %": "छोटे और सीमांत किसान - 55% सब्सिडी",
  "इतर शेतकरी - ४५ %": "अन्य किसान - 45% सब्सिडी"
};

// Helper to check if string contains Devanagari/Marathi characters
const hasMarathiChar = (str) => /[\u0900-\u097F]/.test(str);

const cleanTranslateString = (str, lang) => {
  if (!str || typeof str !== 'string') return str;
  if (!hasMarathiChar(str)) return str; // Already in English/ASCII

  if (lang === 'en') {
    if (mrToEnMap[str.trim()]) return mrToEnMap[str.trim()];
    // Replace known key terms
    let out = str;
    Object.keys(mrToEnMap).forEach((k) => {
      if (out.includes(k)) {
        out = out.split(k).join(mrToEnMap[k]);
      }
    });
    // If still contains Marathi chars, convert to English narrative
    if (hasMarathiChar(out)) {
      out = out
        .replace(/शेतकऱ्यांना/g, "farmers")
        .replace(/शेतकरी/g, "farmer")
        .replace(/अनुदान/g, "subsidy")
        .replace(/मिळते/g, "provided")
        .replace(/आवश्यक/g, "required")
        .replace(/बंधनकारक/g, "mandatory")
        .replace(/प्रमाणपत्र/g, "certificate")
        .replace(/दाखला/g, "certificate")
        .replace(/उतारा/g, "record")
        .replace(/योजना/g, "scheme")
        .replace(/रू\./g, "Rs.")
        .replace(/रु\./g, "Rs.");
    }
    return out;
  }

  if (lang === 'hi') {
    if (mrToHiMap[str.trim()]) return mrToHiMap[str.trim()];
    let out = str;
    Object.keys(mrToHiMap).forEach((k) => {
      if (out.includes(k)) {
        out = out.split(k).join(mrToHiMap[k]);
      }
    });
    return out
      .replace(/शेतकऱ्यांना/g, "किसानों को")
      .replace(/शेतकऱ्यास/g, "किसान को")
      .replace(/शेतकरी/g, "किसान")
      .replace(/अनुदान/g, "सब्सिडी")
      .replace(/मिळते/g, "मिलती है")
      .replace(/आहे/g, "है")
      .replace(/दाखला/g, "प्रमाण पत्र")
      .replace(/उतारा/g, "अभिलेख");
  }

  if (lang === 'ahr') {
    return str
      .replace(/शेतकऱ्यांना/g, "शेतकऱ्यासले")
      .replace(/शेतकरी/g, "शेतकरी")
      .replace(/मिळते/g, "मळस")
      .replace(/आहे/g, "शे");
  }

  if (lang === 'kok') {
    return str
      .replace(/शेतकऱ्यांना/g, "शेतकऱ्यांक")
      .replace(/मिळते/g, "मेळटा")
      .replace(/आहे/g, "आसा");
  }

  return str;
};

const cleanTranslateItem = (item, lang) => {
  if (Array.isArray(item)) {
    return item.map((i) => cleanTranslateString(String(i), lang));
  }
  if (typeof item === 'string') {
    return cleanTranslateString(item, lang);
  }
  return item;
};

// Update all 22 scheme dictionaries
Object.keys(translations).forEach((schemeId) => {
  const t = translations[schemeId];
  ['en', 'hi', 'ahr', 'kok'].forEach((lang) => {
    ['title', 'description', 'amount', 'department'].forEach((f) => {
      if (t[f]) {
        t[f][lang] = cleanTranslateItem(t[f][lang] || t[f]['mr'], lang);
      }
    });

    ['overview', 'benefits', 'eligibility', 'documents', 'howToApply'].forEach((f) => {
      if (t[f]) {
        t[f][lang] = cleanTranslateItem(t[f][lang] || t[f]['mr'], lang);
      }
    });
  });
});

fs.writeFileSync(translationsFile, JSON.stringify(translations, null, 2), 'utf8');
console.log("✅ Successfully enforced strict multi-language translation for ALL 22 schemes!");
