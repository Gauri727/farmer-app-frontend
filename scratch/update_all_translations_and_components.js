const fs = require('fs');
const path = require('path');

// 1. Update i18n.ts with all missing keys for all 5 languages
const i18nPath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

const missingKeys = {
  mr: {
    quickAskHeader: 'झटपट प्रश्न',
    moreTopicsHeader: 'अधिक विषय',
    featuredSchemesHeader: 'प्रमुख शासकीय योजना',
    recentUpdatesHeader: 'नवीन अपडेट्स',
    viewAll: 'सर्व पहा →',
    seeAll: 'सर्व पहा →',
    checkEligibility: 'पात्रता तपासा',
    eligibilitySubtitle: 'शेतीची माहिती द्या आणि पात्र योजना शोधा',
    introCardText: 'बोलणे सोपे वाटते? Farmer AI सोबत आवाजाने बोला.',
    btnCheckEligible: 'पात्र योजना शोधा →',
    qOwnLand: 'तुमच्याकडे शेतजमीन आहे का?',
    qLandSize: 'एकूण शेतजमीन क्षेत्र किती आहे?',
    qPrimaryActivity: 'प्रमुख शेती प्रकार कोणता?',
    qAnnualIncome: 'वार्षिक कौटुंबिक उत्पन्न किती आहे?',
    qCategory: 'सामाजिक प्रवर्ग कोणता?',
    qPmKisan: 'तुम्हाला PM-KISAN योजनेचा लाभ मिळतो का?',
    qWomanFarmer: 'तुम्ही महिला शेतकरी आहात का?',
    qSupportNeeded: 'तुम्हाला कोणत्या प्रकारच्या सहाय्याची गरज आहे?',
    optYes: 'होय',
    optNo: 'नाही',
    optUnder1: '२ एकर पेक्षा कमी',
    opt1to2: '२ ते ५ एकर',
    opt2to5: '५ ते १० एकर',
    optAbove5: '१० एकर पेक्षा जास्त',
    optFieldCrops: 'अन्नधान्य व पिके',
    optHorticulture: 'फलोत्पादन व फळबाग',
    optDairy: 'दुग्धव्यवसाय व पशुपालन',
    optFisheries: 'मत्स्यव्यवसाय',
    optIncomeUnder1_5L: 'रु. १.५ लाखांपेक्षा कमी',
    optIncome1_5to2_5L: 'रु. १.५ लाख ते रु. ३ लाख',
    optIncome2_5to5L: 'रु. ३ लाख ते रु. ५ लाख',
    optIncomeAbove5L: 'रु. ५ लाखांपेक्षा जास्त',
    optGeneral: 'सर्वसाधारण (General)',
    optSC: 'SC (अनुसूचित जाती)',
    optST: 'ST (अनुसूचित जमाती)',
    optOBC: 'OBC (इतर मागास)',
    optIrrigation: 'सूक्ष्म सिंचन (ठिबक/तुषार)',
    optMachinery: 'कृषी यांत्रिकीकरण (ट्रॅक्टर/अवजारे)',
    optPond: 'वैयक्तिक शेततळे व विहीर',
    optCropInputs: 'बियाणे व खते अनुदान',
    topicHorticultureTitle: 'फलोत्पादन',
    topicHorticultureSub: 'फळबाग लागवड व रोपे सहाय्य',
    topicIrrigationTitle: 'सूक्ष्म सिंचन',
    topicIrrigationSub: 'ठिबक व तुषार सिंचन अनुदान',
    topicMechanizationTitle: 'कृषी यांत्रिकीकरण',
    topicMechanizationSub: 'ट्रॅक्टर व अवजारे बँक मदत',
    topicWelfareTitle: 'शेतकरी कल्याण',
    topicWelfareSub: 'उत्पन्न व सानुग्रह अनुदान',
    quickQ1: 'ठिबक सिंचनासाठी ऑनलाईन अर्ज कसा करावा?',
    quickQ2: 'ट्रॅक्टर अनुदानासाठी काय पात्रता नियम आहेत?',
    quickQ3: 'पीक विमा व सानुग्रह अनुदान हप्ता कसा तपासावा?',
    quickQ4: 'भाऊसाहेब फुंडकर फळबाग योजनेत किती अनुदान मिळते?',
  },
  en: {
    quickAskHeader: 'Quick Ask',
    moreTopicsHeader: 'More Topics',
    featuredSchemesHeader: 'Featured Government Schemes',
    recentUpdatesHeader: 'Recent Updates',
    viewAll: 'View all →',
    seeAll: 'See all →',
    checkEligibility: 'Check Eligibility',
    eligibilitySubtitle: 'Share farm details to find matching schemes',
    introCardText: 'Prefer to talk? Ask Farmer AI by voice.',
    btnCheckEligible: 'Find Matching Schemes →',
    qOwnLand: 'Do you own agricultural land?',
    qLandSize: 'Approximate land holding size?',
    qPrimaryActivity: 'Primary farming activity?',
    qAnnualIncome: 'Annual farmer household income?',
    qCategory: 'Your social category?',
    qPmKisan: 'Do you currently receive PM-KISAN support?',
    qWomanFarmer: 'Are you a woman farmer?',
    qSupportNeeded: 'What type of support are you looking for?',
    optYes: 'Yes',
    optNo: 'No',
    optUnder1: '< 2 acres',
    opt1to2: '2 - 5 acres',
    opt2to5: '5 - 10 acres',
    optAbove5: '> 10 acres',
    optFieldCrops: 'Field Crops',
    optHorticulture: 'Horticulture & Orchards',
    optDairy: 'Dairy & Livestock',
    optFisheries: 'Fisheries',
    optIncomeUnder1_5L: '< ₹1.5 Lakh',
    optIncome1_5to2_5L: '₹1.5L - ₹3 Lakh',
    optIncome2_5to5L: '₹3L - ₹5 Lakh',
    optIncomeAbove5L: '> ₹5 Lakh',
    optGeneral: 'General Category',
    optSC: 'SC (Scheduled Caste)',
    optST: 'ST (Scheduled Tribe)',
    optOBC: 'OBC (Other Backward)',
    optIrrigation: 'Micro-Irrigation (Drip/Sprinkler)',
    optMachinery: 'Farm Machinery (Tractor/Tools)',
    optPond: 'Farm Pond & Irrigation Well',
    optCropInputs: 'Seeds & Fertilizer Subsidy',
    topicHorticultureTitle: 'Horticulture',
    topicHorticultureSub: 'Fruit Orchards & Sapling Grant',
    topicIrrigationTitle: 'Micro-Irrigation',
    topicIrrigationSub: 'Drip & Sprinkler Subsidies',
    topicMechanizationTitle: 'Farm Mechanization',
    topicMechanizationSub: 'Tractor & Machinery Bank Support',
    topicWelfareTitle: 'Farmer Welfare',
    topicWelfareSub: 'Income Support & Ex-Gratia Grant',
    quickQ1: 'How to apply for Drip Irrigation online?',
    quickQ2: 'What are the eligibility rules for tractor subsidy?',
    quickQ3: 'How to check PM-Kisan and crop insurance status?',
    quickQ4: 'What is the grant amount for fruit orchard plantation?',
  },
  hi: {
    quickAskHeader: 'त्वरित प्रश्न',
    moreTopicsHeader: 'अधिक विषय',
    featuredSchemesHeader: 'प्रमुख सरकारी योजनाएं',
    recentUpdatesHeader: 'नवीनतम अपडेट',
    viewAll: 'सभी देखें →',
    seeAll: 'सभी देखें →',
    checkEligibility: 'पात्रता जांचें',
    eligibilitySubtitle: 'कृषि विवरण साझा करें और पात्र योजनाएं खोजें',
    introCardText: 'बोलना आसान लगता है? Farmer AI से आवाज में बात करें।',
    btnCheckEligible: 'पात्र योजनाएं खोजें →',
    qOwnLand: 'क्या आपके पास कृषि भूमि है?',
    qLandSize: 'अनुमानित भूमि धारण आकार कितना है?',
    qPrimaryActivity: 'प्राथमिक कृषि गतिविधि क्या है?',
    qAnnualIncome: 'वार्षिक किसान परिवार आय कितनी है?',
    qCategory: 'आपकी सामाजिक श्रेणी क्या है?',
    qPmKisan: 'क्या आपको वर्तमान में PM-KISAN सहायता मिलती है?',
    qWomanFarmer: 'क्या आप महिला किसान हैं?',
    qSupportNeeded: 'आप किस प्रकार की सहायता की तलाश में हैं?',
    optYes: 'हां',
    optNo: 'नहीं',
    optUnder1: '< 2 एकड़',
    opt1to2: '2 - 5 एकड़',
    opt2to5: '5 - 10 एकड़',
    optAbove5: '> 10 एकड़',
    optFieldCrops: 'खाद्यान्न फसलें',
    optHorticulture: 'बागवानी और फलबाग',
    optDairy: 'डेयरी और पशुपालन',
    optFisheries: 'मत्स्य पालन',
    optIncomeUnder1_5L: '< ₹1.5 लाख',
    optIncome1_5to2_5L: '₹1.5L - ₹3 लाख',
    optIncome2_5to5L: '₹3L - ₹5 लाख',
    optIncomeAbove5L: '> ₹5 लाख',
    optGeneral: 'सामान्य श्रेणी (General)',
    optSC: 'SC (अनुसूचित जाति)',
    optST: 'ST (अनुसूचित जनजाति)',
    optOBC: 'OBC (अन्य पिछड़ा वर्ग)',
    optIrrigation: 'सूक्ष्म सिंचाई (ड्रिप/स्प्रिंकलर)',
    optMachinery: 'कृषि मशीनरी (ट्रैक्टर/उपकरण)',
    optPond: 'फार्म पॉन्ड और सिंचाई कुआं',
    optCropInputs: 'बीज और उर्वरक सब्सिडी',
    topicHorticultureTitle: 'बागवानी',
    topicHorticultureSub: 'फलबाग पौधरोपण और पौध अनुदान',
    topicIrrigationTitle: 'सूक्ष्म सिंचाई',
    topicIrrigationSub: 'ड्रिप और स्प्रिंकलर सब्सिडी',
    topicMechanizationTitle: 'कृषि मशीनीकरण',
    topicMechanizationSub: 'ट्रैक्टर और मशीनरी बैंक सहायता',
    topicWelfareTitle: 'किसान कल्याण',
    topicWelfareSub: 'आय सहायता और अनुग्रह अनुदान',
    quickQ1: 'ड्रिप सिंचाई के लिए ऑनलाइन आवेदन कैसे करें?',
    quickQ2: 'ट्रैक्टर सब्सिडी के लिए पात्रता नियम क्या हैं?',
    quickQ3: 'पीएम-किसान किस्त और फसल बीमा की स्थिति कैसे देखें?',
    quickQ4: 'फलबाग पौधरोपण योजना की सब्सिडी कितनी है?',
  },
  ahr: {
    quickAskHeader: 'झटपट प्रश्न',
    moreTopicsHeader: 'अधिक विषय',
    featuredSchemesHeader: 'प्रमुख सरकारी योजना',
    recentUpdatesHeader: 'नवीन अपडेट्स',
    viewAll: 'सर्व पहा →',
    seeAll: 'सर्व पहा →',
    checkEligibility: 'पात्रता तपासा',
    eligibilitySubtitle: 'शेती बद्दल माहिती द्या अन योजना शोधा',
    introCardText: 'बोलना सोपा वाटस? Farmer AI शी आवाजाने बोला.',
    btnCheckEligible: 'पात्र योजना शोधा →',
    qOwnLand: 'तुमच्याकडे शेतजमीन शे का?',
    qLandSize: 'एकूण शेतजमीन क्षेत्र किती शे?',
    qPrimaryActivity: 'मुख्य शेती प्रकार कोणता शे?',
    qAnnualIncome: 'वार्षिक कौटुंबिक उत्पन्न किती शे?',
    qCategory: 'सामाजिक प्रवर्ग कोणता शे?',
    qPmKisan: 'तुमाले PM-KISAN हप्ता भेटस का?',
    qWomanFarmer: 'तुम महिला शेतकरी शत का?',
    qSupportNeeded: 'तुमाले काय मदत पायजे शे?',
    optYes: 'व्हय',
    optNo: 'नका',
    optUnder1: '२ एकर पेक्षा कमी',
    opt1to2: '२ ते ५ एकर',
    opt2to5: '५ ते १० एकर',
    optAbove5: '१० एकर पेक्षा जास्त',
    optFieldCrops: 'अन्नधान्य पिके',
    optHorticulture: 'फलोत्पादन अन फळबाग',
    optDairy: 'दूधधंदा अन जनावर',
    optFisheries: 'मासोळी धंदा',
    optIncomeUnder1_5L: 'रु. १.५ लाखा पेक्षा कमी',
    optIncome1_5to2_5L: 'रु. १.५ ते ३ लाख',
    optIncome2_5to5L: 'रु. ३ ते ५ लाख',
    optIncomeAbove5L: 'रु. ५ लाखा पेक्षा जास्त',
    optGeneral: 'सर्वसाधारण',
    optSC: 'SC प्रवर्ग',
    optST: 'ST प्रवर्ग',
    optOBC: 'OBC प्रवर्ग',
    optIrrigation: 'ठिबक अन तुषार सिंचन',
    optMachinery: 'ट्रॅक्टर अन यंत्र',
    optPond: 'शेततळे अन विहीर',
    optCropInputs: 'बियाणे अन खते',
    topicHorticultureTitle: 'फलोत्पादन',
    topicHorticultureSub: 'फळबाग लागवड मदत',
    topicIrrigationTitle: 'सूक्ष्म सिंचन',
    topicIrrigationSub: 'ठिबक अन तुषार सिंचन अनुदान',
    topicMechanizationTitle: 'कृषी यांत्रिकीकरण',
    topicMechanizationSub: 'ट्रॅक्टर अन यंत्र बँक मदत',
    topicWelfareTitle: 'शेतकरी कल्याण',
    topicWelfareSub: 'आय मदत अन अनुदान',
    quickQ1: 'ठिबक सिंचनासाठी ऑनलाईन अर्ज कसा करायना?',
    quickQ2: 'ट्रॅक्टर अनुदानाना नियम काय शेत?',
    quickQ3: 'पीक अनुदान हप्ता कसा तपासावा?',
    quickQ4: 'फळबाग लागवड अनुदान किती भेटस?',
  },
  kok: {
    quickAskHeader: 'झटपट विचार',
    moreTopicsHeader: 'हेर विशय',
    featuredSchemesHeader: 'प्रमुख सरकारी येवजण्यो',
    recentUpdatesHeader: 'ताज्यो बातम्यो',
    viewAll: 'सगळे पळयात →',
    seeAll: 'सगळे पळयात →',
    checkEligibility: 'पात्रता तपासात',
    eligibilitySubtitle: 'शेतीची माहिती दियात आणी येवजण्यो सोधात',
    introCardText: 'उलोवप सोपे दिसता? Farmer AI कडेन ताळ्यान उलोयात.',
    btnCheckEligible: 'पात्र येवजण्यो सोधात →',
    qOwnLand: 'तुमच्या लागीं शेतजमीन आसा काय?',
    qLandSize: 'एकूण शेतजमीन किती आसा?',
    qPrimaryActivity: 'मुख्य शेती प्रकार कोणता?',
    qAnnualIncome: 'वर्साचे उत्पन्न किती आसा?',
    qCategory: 'सामाजिक वर्ग कोणता?',
    qPmKisan: 'तुमकां PM-KISAN हप्तो मेळटा काय?',
    qWomanFarmer: 'तुमी बायल शेतकार काय?',
    qSupportNeeded: 'तुमकां कसली मदत जाय?',
    optYes: 'होय',
    optNo: 'ना',
    optUnder1: '२ एकरा परस उणी',
    opt1to2: '२ ते ५ एकर',
    opt2to5: '५ ते १० एकर',
    optAbove5: '१० एकरा परस चड',
    optFieldCrops: 'अन्नधान्य पिकां',
    optHorticulture: 'फलोत्पादन आनी फळबाग',
    optDairy: 'दूधधंदो आनी जनावर',
    optFisheries: 'नुस्तेमारी',
    optIncomeUnder1_5L: 'रु. १.५ लाखां परस उणी',
    optIncome1_5to2_5L: 'रु. १.५ ते ३ लाख',
    optIncome2_5to5L: 'रु. ३ ते ५ लाख',
    optIncomeAbove5L: 'रु. ५ लाखां परस चड',
    optGeneral: 'सादारण',
    optSC: 'SC वर्ग',
    optST: 'ST वर्ग',
    optOBC: 'OBC वर्ग',
    optIrrigation: 'ठिबक आनी तुषार सिंचन',
    optMachinery: 'ट्रॅक्टर आनी मशिनां',
    optPond: 'शेततळे आनी बांय',
    optCropInputs: 'बियाणीं आनी खातां',
    topicHorticultureTitle: 'फलोत्पादन',
    topicHorticultureSub: 'फळबाग रोवप मदत',
    topicIrrigationTitle: 'सूक्ष्म सिंचन',
    topicIrrigationSub: 'ठिबक आनी तुषार सिंचन अनदान',
    topicMechanizationTitle: 'कृषी यांत्रिकीकरण',
    topicMechanizationSub: 'ट्रॅक्टर आनी मशिनां पंगड मदत',
    topicWelfareTitle: 'शेतकार कल्याण',
    topicWelfareSub: 'उत्पन्न आनी अनदान मदत',
    quickQ1: 'ठिबक सिंचना खातीर अर्ज कसा करचो?',
    quickQ2: 'ट्रॅक्टर अनदानाचे नेम काय आसात?',
    quickQ3: 'पीक अनदान हप्तो कसो पळोवचो?',
    quickQ4: 'फळबाग रोवप येवजणेचें अनदान किती मेळटले?',
  }
};

// Add fallback transformer to getTranslation in i18n.ts
let i18n = fs.readFileSync(i18nPath, 'utf8');

// Inject missing keys into Marathi dictionary
Object.keys(missingKeys.mr).forEach(k => {
  if (!i18n.includes(`${k}:`)) {
    i18n = i18n.replace("mr: {\n", `mr: {\n    ${k}: '${missingKeys.mr[k]}',\n`);
  }
});

// Inject missing keys into English dictionary
Object.keys(missingKeys.en).forEach(k => {
  if (!i18n.includes(`${k}:`)) {
    i18n = i18n.replace("en: {\n", `en: {\n    ${k}: '${missingKeys.en[k]}',\n`);
  }
});

// Inject missing keys into Hindi dictionary
Object.keys(missingKeys.hi).forEach(k => {
  if (!i18n.includes(`${k}:`)) {
    i18n = i18n.replace("hi: {\n", `hi: {\n    ${k}: '${missingKeys.hi[k]}',\n`);
  }
});

// Inject missing keys into Ahirani dictionary
Object.keys(missingKeys.ahr).forEach(k => {
  if (!i18n.includes(`${k}:`)) {
    i18n = i18n.replace("ahr: {\n", `ahr: {\n    ${k}: '${missingKeys.ahr[k]}',\n`);
  }
});

// Inject missing keys into Konkani dictionary
Object.keys(missingKeys.kok).forEach(k => {
  if (!i18n.includes(`${k}:`)) {
    i18n = i18n.replace("kok: {\n", `kok: {\n    ${k}: '${missingKeys.kok[k]}',\n`);
  }
});

// Fix getTranslation fallback so raw key string is NEVER shown directly
const rawKeyFix = `  let text = translations[code]?.[key] || translations['mr']?.[key] || translations['en']?.[key];

  if (!text) {
    // Human-readable title-case fallback: never output raw camelCase keys!
    text = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }`;

i18n = i18n.replace(/let text = translations\[code\]\?\.\[key\] \|\| translations\['mr'\]\?\.\[key\] \|\| translations\['en'\]\?\.\[key\] \|\| key;/g, rawKeyFix);

fs.writeFileSync(i18nPath, i18n, 'utf8');
console.log('✅ Updated src/utils/i18n.ts: added missing keys & raw key fallback fix!');
