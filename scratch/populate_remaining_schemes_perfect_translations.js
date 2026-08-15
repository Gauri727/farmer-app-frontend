const fs = require('fs');
const path = require('path');

const translationsFile = path.join(__dirname, '../src/constants/schemeTranslations.json');

const remainingTranslations = {
  "kaju-kalma-vatap-scheme": {
    title: {
      mr: "काजू फळपीक विकास योजना (काजू कलम वाटप)",
      en: "Cashew Plantation Development Scheme (Cashew Graft Distribution)",
      hi: "काजू फल फसल विकास योजना (काजू कलम वितरण)",
      ahr: "काजू फळपीक विकास योजना",
      kok: "काजू फळपीक विकास येवजण"
    },
    description: {
      mr: "कोकण व कोल्हापूर जिल्ह्यातील शेतकऱ्यांना मोफत काजू कलमांचे वाटप व लागवड अनुदान.",
      en: "Free cashew grafts distribution and plantation subsidy for farmers in Konkan and Kolhapur districts.",
      hi: "कोंकण और कोल्हापुर जिलों के किसानों को मुफ्त काजू कलम वितरण और वृक्षारोपण सब्सिडी।",
      ahr: "काजू कलमांचे मोफत वाटप अन लागवड अनुदान.",
      kok: "काजू कलमांचें फुकट वांटप आनी लागवड अनुदान."
    },
    amount: {
      mr: "१००% मोफत काजू कलम वाटप | रु. १०० प्रति कलम अनुदान",
      en: "100% Free Cashew Graft Distribution | Rs. 100 Subsidy Per Graft",
      hi: "100% मुफ्त काजू कलम वितरण | रु. 100 प्रति कलम सब्सिडी",
      ahr: "१००% मोफत काजू कलम वाटप",
      kok: "१००% फुकट काजू कलम वांटप"
    },
    department: {
      mr: "कृषी विभाग",
      en: "Department of Agriculture",
      hi: "कृषि विभाग",
      ahr: "कृषी विभाग",
      kok: "कृषी विभाग"
    },
    overview: {
      mr: [
        "महाराष्ट्रातील कोकण विभाग (ठाणे, पालघर, रायगड, रत्नागिरी, सिंधुदुर्ग) आणि कोल्हापूर, सांगली जिल्ह्यातील काजू लागवडीस प्रोत्साहन देण्यासाठी सुधारित काजू कलमांचे मोफत वाटप व लागवडीसाठी १००% अर्थसहाय्य दिले जाते."
      ],
      en: [
        "The Cashew Plantation Development Scheme promotes cashew cultivation in Konkan region (Thane, Palghar, Raigad, Ratnagiri, Sindhudurg) and Kolhapur/Sangli districts. High-yielding Vengurla cashew grafts are distributed free of cost to farmers along with 100% financial assistance for pit digging and plantation maintenance."
      ],
      hi: [
        "काजू फसल विकास योजना के तहत कोंकण क्षेत्र और कोल्हापुर/सांगली जिलों में उच्च उपज वाली काजू कलमों का मुफ्त वितरण और पौधरोपण के लिए 100% वित्तीय सहायता प्रदान की जाती है।"
      ],
      ahr: [
        "कोकण अन कोल्हापूर जिल्ह्यातील शेतकऱ्यासले काजू लागवडीसाठी मोफत कलमे वाटप अन १००% अर्थसहाय्य दिले जाते."
      ],
      kok: [
        "कोकण आनी कोल्हापूर जिल्ह्यांतल्या शेतकऱ्यांक काजू लागवडी खातीर फुकट कलमांचे वांटप आनी १००% आर्थीक आदार मेळटा."
      ]
    },
    benefits: {
      mr: ["१) उच्च उत्पन्न देणाऱ्या वेंगुर्ला काजू कलमांचे १००% मोफत वाटप.", "२) खड्डे खोदणे, खते व लागवड देखभालीसाठी रु. १००/- प्रति कलम अनुदान."],
      en: ["1) 100% free distribution of high-yielding Vengurla cashew grafts.", "2) Subsidy of Rs. 100 per graft for pit digging, fertilizers, and plantation care."],
      hi: ["1) उच्च उपज वाली वेंगुर्ला काजू कलमों का 100% मुफ्त वितरण।", "2) गड्ढा खोदने, उर्वरक और रखरखाव के लिए रु. 100 प्रति कलम सब्सिडी।"],
      ahr: ["१) मोफत काजू कलमे वाटप.", "२) रु. १००/- प्रति कलम अनुदान."],
      kok: ["१) फुकट काजू कलमां वांटप.", "२) रु. १००/- प्रति कलम अनुदान."]
    },
    eligibility: {
      mr: ["किमान १० गुंठे (०.१० हेक्टर) जमीन असणारा ७/१२ धारक शेतकरी.", "कोकण विभाग व कोल्हापूर/सांगली जिल्ह्यातील शेतकरी."],
      en: ["Landholding farmer having minimum 10 Guntha (0.10 Hectare) land with valid 7/12 extract.", "Resident farmer of Konkan region or Kolhapur/Sangli districts."],
      hi: ["न्यूनतम 10 गुंठा (0.10 हेक्टेयर) भूमि वाला 7/12 धारक किसान।", "कोंकण क्षेत्र या कोल्हापुर/सांगली जिले का निवासी किसान।"],
      ahr: ["किमान १० गुंठे जमीन असणारा ७/१२ धारक शेतकरी."],
      kok: ["कमींत कमी १० गुंठे जमीन आशिल्लो ७/१२ धारक शेतकार."]
    },
    documents: {
      mr: ["७/१२ उतारा व ८-अ दाखला", "आधार कार्ड", "बँक पासबुक", "स्वयं घोषणापत्र"],
      en: ["7/12 Land Extract and 8-A Record", "Aadhaar Card", "Bank Passbook", "Self-Declaration Form"],
      hi: ["7/12 भू-अभिलेख और 8-ए रिकॉर्ड", "आधार कार्ड", "बैंक पासबुक", "स्व-घोषणा पत्र"],
      ahr: ["७/१२ उतारा", "आधार कार्ड", "बँक पासबुक"],
      kok: ["७/१२ दाखलो", "आधार कार्ड", "बँक पासबुक"]
    },
    howToApply: {
      mr: ["महाडीबीटी कृषी पोर्टलवर किंवा तालुका कृषी अधिकारी कार्यालयात अर्ज करावा."],
      en: ["Apply online on the MahaDBT Farmer Portal or visit the Taluka Agriculture Officer (TAO) office."],
      hi: ["महाडीबीटी पोर्टल पर ऑनलाइन आवेदन करें या तालुका कृषि अधिकारी कार्यालय से संपर्क करें।"],
      ahr: ["महाडीबीटी पोर्टलवर किंवा तालुका कृषी कार्यालयात अर्ज करा."],
      kok: ["महाडीबीटी पोर्टलार वा तालुका कृषी कार्यालयांत अर्ज करात."]
    },
    faqs: {
      mr: [{ question: "काजू कलम योजनेत किती कलमे मोफत मिळतात?", answer: "प्रति लाभार्थी किमान २५ ते कमाल २०० काजू कलमे मोफत दिली जातात." }],
      en: [{ question: "How many cashew grafts are provided free under the scheme?", answer: "Beneficiaries receive a minimum of 25 up to a maximum of 200 free cashew grafts." }],
      hi: [{ question: "काजू कलम योजना में कितनी कलमें मुफ्त मिलती हैं?", answer: "प्रति लाभार्थी न्यूनतम 25 से अधिकतम 200 काजू कलमें मुफ्त दी जाती हैं।" }],
      ahr: [{ question: "किती काजू कलमे मोफत मिळतात?", answer: "२५ ते २०० काजू कलमे मोफत मिळतात." }],
      kok: [{ question: "कितलीं काजू कलमां फुकट मेळटात?", answer: "२५ ते २०० काजू कलमां फुकट मेळटात." }]
    },
    contact: {
      mr: { phone: "02327-222240", email: "tao.vengurla@gov.in", address: "तालुका कृषी अधिकारी कार्यालय, वेंगुर्ला / रत्नागिरी / सिंधुदुर्ग" },
      en: { phone: "02327-222240", email: "tao.vengurla@gov.in", address: "Office of Taluka Agriculture Officer, Vengurla / Ratnagiri / Sindhudurg" },
      hi: { phone: "02327-222240", email: "tao.vengurla@gov.in", address: "तालुका कृषि अधिकारी कार्यालय, वेंगुर्ला / रत्नागिरी" },
      ahr: { phone: "02327-222240", email: "tao.vengurla@gov.in", address: "तालुका कृषी कार्यालय, कोकण" },
      kok: { phone: "02327-222240", email: "tao.vengurla@gov.in", address: "तालुका कृषी कार्यालय, कोकण" }
    }
  },

  "pmrkvy-rainfed-area-development": {
    title: {
      mr: "प्रधानमंत्री राष्ट्रीय कृषी विकास योजने अंतर्गत कोरडवाहू क्षेत्र विकास (RAD) योजना",
      en: "Rainfed Area Development (RAD) under PMRKVY",
      hi: "प्रधानमंत्री राष्ट्रीय कृषि विकास योजना के तहत वर्षा सिंचित क्षेत्र विकास (RAD) योजना",
      ahr: "कोरडवाहू क्षेत्र विकास (RAD) योजना",
      kok: "कोरडवाहू क्षेत्र विकास (RAD) येवजण"
    },
    description: {
      mr: "कोरडवाहू क्षेत्रातील शेतकऱ्यांना एकात्मिक शेती पद्धती, शेततळे, दुभती जनावरे व सेंद्रिय शेतीसाठी रु. ३०,००० अनुदान.",
      en: "Provides up to Rs. 30,000 subsidy per farmer family for Integrated Farming Systems (IFS), farm ponds, horticulture, livestock, and organic farming in rainfed areas.",
      hi: "वर्षा सिंचित क्षेत्रों में एकीकृत कृषि प्रणाली (IFS), खेत तालाब, दुधारू मवेशियों और जैविक खेती के लिए प्रति किसान परिवार रु. 30,000 तक सब्सिडी।",
      ahr: "कोरडवाहू क्षेत्रातील शेतकऱ्यासले एकात्मिक शेती पद्धतीसाठी रु. ३०,००० अनुदान.",
      kok: "कोरडवाहू क्षेत्रांतल्या शेतकऱ्यांक एकात्मिक शेती पद्धती खातीर रु. ३०,००० अनुदान."
    },
    amount: {
      mr: "प्रति शेतकरी कुटुंब कमाल रु. ३०,०००/- अनुदान (५०% भांडवली अनुदान)",
      en: "Maximum Rs. 30,000 Subsidy per Farmer Family (50% Assistance)",
      hi: "प्रति किसान परिवार अधिकतम रु. 30,000 सब्सिडी (50% सहायता)",
      ahr: "कमाल रु. ३०,०००/- अनुदान",
      kok: "कमाल रु. ३०,०००/- अनुदान"
    },
    department: {
      mr: "कृषी विभाग",
      en: "Department of Agriculture",
      hi: "कृषि विभाग",
      ahr: "कृषी विभाग",
      kok: "कृषी विभाग"
    },
    overview: {
      mr: [
        "राज्यातील सर्व ३४ जिल्ह्यांमध्ये कोरडवाहू क्षेत्र विकास (RAD) योजना राबवली जाते. पावसावर आधारित शेतीचे उत्पादन वाढवण्यासाठी एकात्मिक शेती पद्धतीचा (IFS) अवलंब केला जातो. यामध्ये शेतीपिकांसोबत फळबाग लागवड, पशुपालन, गांडूळखत निर्मिती, व शेततळे अस्तरीकरण यांचा समावेश होतो."
      ],
      en: [
        "The Rainfed Area Development (RAD) scheme is implemented across all 34 rural districts of Maharashtra under PMRKVY. It promotes Integrated Farming Systems (IFS) to maximize income and climate resilience for rainfed farmers. Components include crop-based farming integrated with horticulture, livestock (dairy/goats), vermicomposting, silviculture, and farm pond lining."
      ],
      hi: [
        "वर्षा सिंचित क्षेत्र विकास (RAD) योजना महाराष्ट्र के सभी 34 जिलों में लागू की जाती है। इसका उद्देश्य वर्षा आधारित क्षेत्रों में एकीकृत कृषि प्रणाली (IFS) के माध्यम से किसानों की आय बढ़ाना है। इसमें फसलों के साथ बागवानी, पशुपालन, केंचुआ खाद और खेत तालाब शामिल हैं।"
      ],
      ahr: [
        "कोरडवाहू क्षेत्र विकास योजना एकात्मिक शेती पद्धतीला प्रोत्साहन देस. शेतीपिकांसोबत पशुपालन अन सेंद्रिय शेतीसाठी अनुदान मिळस."
      ],
      kok: [
        "कोरडवाहू क्षेत्र विकास येवजण एकात्मिक शेती पद्धतीक प्रोत्साहन दिता. शेती पिकां वांगडा पशुपालन आनी सेंद्रिय शेती खातीर आदार मेळटा."
      ]
    },
    benefits: {
      mr: [
        "१) एकात्मिक शेती पद्धतीसाठी (पिके + फळबाग/पशूधन) ५०% अनुदान (कमाल रु. ३०,००० मदत).",
        "२) गांडूळखत युनिट, सायलेज युनिट व सेंद्रिय शेतीसाठी रु. १०,००० मदत.",
        "३) शेततळे अस्तरीकरण व जल पुनर्भरण."
      ],
      en: [
        "1) 50% financial assistance (up to Rs. 30,000) for Integrated Farming Systems (Crops + Horticulture/Livestock).",
        "2) Rs. 10,000 grant for Vermicompost units, Silage units, and Organic Inputs.",
        "3) Subsidy for Farm Pond Plastic Lining and Water Harvesting structures."
      ],
      hi: [
        "1) एकीकृत कृषि प्रणाली (फसल + बागवानी/पशुपालन) के लिए 50% सब्सिडी (अधिकतम रु. 30,000)।",
        "2) केंचुआ खाद इकाई, साइलेज इकाई और जैविक आदानों के लिए रु. 10,000 की सहायता।",
        "3) खेत तालाब प्लास्टिक अस्तर और जल संचयन संरचनाओं के लिए सब्सिडी।"
      ],
      ahr: [
        "१) एकात्मिक शेती पद्धतीसाठी ५०% अनुदान (कमाल रु. ३०,०००).",
        "२) गांडूळखत युनिटसाठी रु. १०,००० मदत."
      ],
      kok: [
        "१) एकात्मिक शेती पद्धती खातीर ५०% अनुदान (कमाल रु. ३०,०००).",
        "२) गांडूळखत युनिट खातीर रु. १०,००० आदार."
      ]
    },
    eligibility: {
      mr: [
        "पावसावर आधारित शेती असणारे सर्व ७/१२ धारक शेतकरी.",
        "एकात्मिक शेती पद्धती (IFS) मधील किमान २ घटक राबवण्यास तयार असलेले शेतकरी.",
        "Agristack फार्मर आयडी असणे आवश्यक."
      ],
      en: [
        "All land-holding farmers in rainfed regions with valid 7/12 land extract.",
        "Farmers willing to adopt at least 2 components of Integrated Farming Systems (IFS).",
        "Valid AgriStack Farmer ID registration is required."
      ],
      hi: [
        "वर्षा सिंचित क्षेत्रों में 7/12 खसरा धारक सभी किसान।",
        "एकीकृत कृषि प्रणाली (IFS) के कम से कम 2 घटकों को अपनाने के लिए इच्छुक किसान।",
        "वैध एग्रीस्टैक किसान आईडी (AgriStack Farmer ID) होना आवश्यक है।"
      ],
      ahr: ["कोरडवाहू क्षेत्रातील ७/१२ धारक शेतकरी."],
      kok: ["कोरडवाहू क्षेत्रांतले ७/१२ धारक शेतकार."]
    },
    documents: {
      mr: ["७/१२ उतारा व ८-अ दाखला", "आधार कार्ड", "AgriStack फार्मर आयडी", "बँक पासबुक"],
      en: ["7/12 Land Extract and 8-A Record", "Aadhaar Card", "AgriStack Farmer ID", "Bank Passbook"],
      hi: ["7/12 भू-अभिलेख और 8-ए रिकॉर्ड", "आधार कार्ड", "एग्रीस्टैक किसान आईडी", "बैंक पासबुक"],
      ahr: ["७/१२ उतारा", "आधार कार्ड", "बँक पासबुक"],
      kok: ["७/१२ दाखलो", "आधार कार्ड", "बँक पासबुक"]
    },
    howToApply: {
      mr: ["महाडीबीटी कृषी पोर्टलवर ऑनलाईन अर्ज सादर करावा."],
      en: ["Apply online under 'Rainfed Area Development' component on MahaDBT Farmer Portal."],
      hi: ["महाडीबीटी पोर्टल पर 'वर्षा सिंचित क्षेत्र विकास' के तहत ऑनलाइन आवेदन करें।"],
      ahr: ["महाडीबीटी पोर्टलवर अर्ज करा."],
      kok: ["महाडीबीटी पोर्टलार अर्ज करात."]
    },
    faqs: {
      mr: [{ question: "RAD योजनेत किती अनुदान मिळते?", answer: "प्रति शेतकरी कुटुंब कमाल रु. ३०,००० पर्यंत ५०% अनुदान मिळते." }],
      en: [{ question: "How much subsidy is provided under RAD scheme?", answer: "Up to 50% subsidy with a maximum limit of Rs. 30,000 per farmer family." }],
      hi: [{ question: "RAD योजना में कितनी सब्सिडी मिलती है?", answer: "प्रति किसान परिवार अधिकतम रु. 30,000 तक 50% सब्सिडी मिलती है।" }],
      ahr: [{ question: "RAD योजनेत किती अनुदान मळस?", answer: "कमाल रु. ३०,००० पर्यंत अनुदान मळस." }],
      kok: [{ question: "RAD येवजणेंत कितलें अनुदान मेळटा?", answer: "कमाल रु. ३०,००० मेरेन अनुदान मेळटा." }]
    },
    contact: {
      mr: { phone: "020-25530012", email: "rad.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      en: { phone: "020-25530012", email: "rad.mah@gov.in", address: "Commissioner of Agriculture, Maharashtra State, Pune - 411005" },
      hi: { phone: "020-25530012", email: "rad.mah@gov.in", address: "कृषि आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      ahr: { phone: "020-25530012", email: "rad.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      kok: { phone: "020-25530012", email: "rad.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" }
    }
  },

  "chief-minister-sustainable-agriculture-irrigation-scheme": {
    title: {
      mr: "मुख्यमंत्री शाश्वत कृषि सिंचन योजना",
      en: "Chief Minister Sustainable Agriculture Irrigation Scheme",
      hi: "मुख्यमंत्री शाश्वत कृषि सिंचाई योजना",
      ahr: "मुख्यमंत्री शाश्वत कृषि सिंचन योजना",
      kok: "मुख्यमंत्री शाश्वत कृषि सिंचन येवजण"
    },
    description: {
      mr: "सूक्ष्म सिंचनावर २५% अतिरिक्त पूरक अनुदान (एकूण ७५% अनुदान सवलत) आणि वैयक्तिक शेततळ्यासाठी रु. ७५,००० मदत.",
      en: "Provides 25% additional top-up subsidy for micro-irrigation (total 75% assistance) and Rs. 75,000 grant for individual farm ponds.",
      hi: "सूक्ष्म सिंचाई पर 25% अतिरिक्त पूरक सब्सिडी (कुल 75% सहायता) और व्यक्तिगत खेत तालाब के लिए रु. 75,000 की सहायता।",
      ahr: "सूक्ष्म सिंचनावर २५% अतिरिक्त पूरक अनुदान अन शेततळ्यासाठी रु. ७५,००० मदत.",
      kok: "सूक्ष्म सिंचनार २५% अतिरिक्त पूरक अनुदान आनी शेततळ्या खातीर रु. ७५,००० आदार."
    },
    amount: {
      mr: "२५% अतिरिक्त सूक्ष्म सिंचन पूरक अनुदान | रु. ७५,००० वैयक्तिक शेततळे अनुदान",
      en: "25% Additional Top-up Subsidy | Rs. 75,000 Individual Farm Pond Grant",
      hi: "25% अतिरिक्त पूरक सब्सिडी | रु. 75,000 व्यक्तिगत खेत तालाब अनुदान",
      ahr: "२५% अतिरिक्त अनुदान | रु. ७५,००० शेततळे मदत",
      kok: "२५% अतिरिक्त अनुदान | रु. ७५,००० शेततळें आदार"
    },
    department: {
      mr: "कृषी विभाग",
      en: "Department of Agriculture",
      hi: "कृषि विभाग",
      ahr: "कृषी विभाग",
      kok: "कृषी विभाग"
    },
    overview: {
      mr: [
        "प्रधानमंत्री कृषि सिंचन योजनेअंतर्गत (PMKSY) मिळणाऱ्या ५५% अनुदानावर महाराष्ट्र राज्य शासनामार्फत अतिरिक्त २५% पूरक अनुदान दिले जाते, ज्यामुळे अल्प व अत्यल्प भूधारक शेतकऱ्यांना ७५% एकूण सवलत मिळते. तसेच वैयक्तिक शेततळे खोदाईसाठी रु. ७५,००० अनुदान दिले जाते."
      ],
      en: [
        "The Chief Minister Sustainable Agriculture Irrigation Scheme provides an additional 25% top-up subsidy on top of the 55% PMKSY grant for drip and sprinkler irrigation, giving small and marginal farmers up to 75% total subsidy. Additionally, it provides Rs. 75,000 financial assistance for digging individual farm ponds."
      ],
      hi: [
        "पीएमकेएसवाई योजना के तहत मिलने वाली 55% सब्सिडी पर महाराष्ट्र सरकार द्वारा 25% अतिरिक्त पूरक सब्सिडी दी जाती है, जिससे कुल सब्सिडी 75% हो जाती है। व्यक्तिगत खेत तालाब के लिए रु. 75,000 दिए जाते हैं।"
      ],
      ahr: [
        "PMKSY अनुदानावर २५% अतिरिक्त पूरक अनुदान दिले जास. वैयक्तिक शेततळ्यासाठी रु. ७५,००० मदत मळस."
      ],
      kok: [
        "PMKSY अनुदानावयर २५% अतिरिक्त पूरक अनुदान मेळटा. वैयक्तिक शेततळ्या खातीर रु. ७५,००० आदार मेळटा."
      ]
    },
    benefits: {
      mr: [
        "१) ठिबक व तुषार सिंचनावर २५% अतिरिक्त राज्य पूरक अनुदान (एकूण ७५% बचत).",
        "२) वैयक्तिक शेततळे खोदाईसाठी रु. ७५,००० सानुग्रह मदत.",
        "३) शेततळे प्लास्टिक अस्तरीकरण अनुदान."
      ],
      en: [
        "1) 25% additional state top-up subsidy for drip & sprinkler irrigation (total 75% saving).",
        "2) Rs. 75,000 grant for digging individual farm ponds.",
        "3) Plastic lining subsidy for farm ponds."
      ],
      hi: [
        "1) ड्रिप और स्प्रिंकलर सिंचाई पर 25% अतिरिक्त राज्य सब्सिडी (कुल 75% की बचत)।",
        "2) व्यक्तिगत खेत तालाब की खुदाई के लिए रु. 75,000 की सहायता।",
        "3) खेत तालाब प्लास्टिक अस्तर के लिए सब्सिडी।"
      ],
      ahr: [
        "१) २५% अतिरिक्त पूरक अनुदान.",
        "२) शेततळ्यासाठी रु. ७५,००० मदत."
      ],
      kok: [
        "१) २५% अतिरिक्त पूरक अनुदान.",
        "२) शेततळ्या खातीर रु. ७५,००० आदार."
      ]
    },
    eligibility: {
      mr: ["MahaDBT कृषी पोर्टलवर नोंदणीकृत ७/१२ धारक शेतकरी.", "PMKSY योजनेत ठिबक/तुषार सिंचनाचा लाभ घेतलेले शेतकरी."],
      en: ["Landholding farmer registered on MahaDBT Portal with valid 7/12 land extract.", "Farmers who have applied for PMKSY micro-irrigation."],
      hi: ["महाडीबीटी पोर्टल पर पंजीकृत 7/12 खसरा धारक किसान।", "पीएमकेएसवाई योजना में सूक्ष्म सिंचाई का लाभ लेने वाले किसान।"],
      ahr: ["MahaDBT पोर्टलवर नोंदणीकृत ७/१२ धारक शेतकरी."],
      kok: ["MahaDBT पोर्टलार नोंदणीकृत ७/१२ धारक शेतकार."]
    },
    documents: {
      mr: ["७/१२ उतारा व ८-अ दाखला", "आधार कार्ड", "पूर्वसंमती पत्र", "बँक पासबुक"],
      en: ["7/12 Land Extract and 8-A Record", "Aadhaar Card", "Prior Approval Letter", "Bank Passbook"],
      hi: ["7/12 भू-अभिलेख और 8-ए रिकॉर्ड", "आधार कार्ड", "पूर्व स्वीकृति पत्र", "बैंक पासबुक"],
      ahr: ["७/१२ उतारा", "आधार कार्ड", "पूर्वसंमती पत्र"],
      kok: ["७/१२ दाखलो", "आधार कार्ड", "पूर्वसंमती पत्र"]
    },
    howToApply: {
      mr: ["MahaDBT पोर्टलवर 'मुख्यमंत्री शाश्वत कृषि सिंचन योजना' घटकाखाली ऑनलाईन अर्ज करावा."],
      en: ["Apply online under 'CM Sustainable Agriculture Irrigation Scheme' on MahaDBT Farmer Portal."],
      hi: ["महाडीबीटी पोर्टल पर 'मुख्यमंत्री शाश्वत कृषि सिंचाई योजना' के तहत ऑनलाइन आवेदन करें।"],
      ahr: ["MahaDBT पोर्टलवर अर्ज करा."],
      kok: ["MahaDBT पोर्टलार अर्ज करात."]
    },
    faqs: {
      mr: [{ question: "एकूण किती टक्के सिंचन अनुदान मिळते?", answer: "PMKSY (५५%) + राज्य पूरक अनुदान (२५%) मिळून एकूण ७५% अनुदान मिळते." }],
      en: [{ question: "What is the total irrigation subsidy received?", answer: "Combining PMKSY (55%) + State Top-up (25%), farmers receive up to 75% total subsidy." }],
      hi: [{ question: "कुल कितनी सिंचाई सब्सिडी मिलती है?", answer: "पीएमकेएसवाई (55%) + राज्य पूरक सब्सिडी (25%) मिलाकर कुल 75% सब्सिडी मिलती है।" }],
      ahr: [{ question: "एकूण किती अनुदान मळस?", answer: "एकूण ७५% अनुदान मळस." }],
      kok: [{ question: "एकूण कितलें अनुदान मेळटा?", answer: "एकूण ७५% अनुदान मेळटा." }]
    },
    contact: {
      mr: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      en: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "Commissioner of Agriculture, Maharashtra State, Pune - 411005" },
      hi: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषि आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      ahr: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      kok: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" }
    }
  },

  "chief-minister-agro-food-processing-scheme": {
    title: {
      mr: "मुख्यमंत्री कृषि आणि अन्न प्रक्रिया योजना",
      en: "Chief Minister Agro & Food Processing Scheme",
      hi: "मुख्यमंत्री कृषि एवं खाद्य प्रसंस्करण योजना",
      ahr: "मुख्यमंत्री कृषि अन अन्न प्रक्रिया योजना",
      kok: "मुख्यमंत्री कृषि आनी अन्न प्रक्रिया येवजण"
    },
    description: {
      mr: "अन्न प्रक्रिया उद्योग, मूल्यवर्धन, कोल्ड स्टोअरेज व पॅक हाऊस उभारणीसाठी ५०% पर्यंत (कमाल रु. ५० लाख ते रु. १ कोटी) भांडवली अनुदान.",
      en: "Provides up to 50% capital subsidy (Max Rs. 50 Lakhs to Rs. 1 Crore) for setting up agro-processing units, cold storages, and pack houses.",
      hi: "कृषि-खाद्य प्रसंस्करण इकाइयों, कोल्ड स्टोरेज और पैक हाउस की स्थापना के लिए 50% तक पूंजीगत सब्सिडी (अधिकतम रु. 50 लाख से 1 करोड़)।",
      ahr: "अन्न प्रक्रिया उद्योग उभारणीसाठी ५०% भांडवली अनुदान.",
      kok: "अन्न प्रक्रिया उद्योगा खातीर ५०% भांडवली अनुदान."
    },
    amount: {
      mr: "३०% ते ५०% भांडवली अनुदान (कमाल रु. ५० लाख ते रु. १ कोटी मदत)",
      en: "30% to 50% Capital Subsidy (Max Grant Rs. 50 Lakh to Rs. 1 Crore)",
      hi: "30% से 50% पूंजीगत सब्सिडी (अधिकतम अनुदान रु. 50 लाख से 1 करोड़)",
      ahr: "५०% भांडवली अनुदान (कमाल रु. ५० लाख)",
      kok: "५०% भांडवली अनुदान (कमाल रु. ५० लाख)"
    },
    department: {
      mr: "कृषी विभाग",
      en: "Department of Agriculture",
      hi: "कृषि विभाग",
      ahr: "कृषी विभाग",
      kok: "कृषी विभाग"
    },
    overview: {
      mr: [
        "महाराष्ट्रात कृषी उत्पादनांवर प्रक्रिया करून मूल्यवर्धन करण्यासाठी, काढणीपश्चात होणारे नुकसान टाळण्यासाठी आणि शेतकरी उत्पादक कंपन्यांना (FPO) प्रोत्साहन देण्यासाठी मुख्यमंत्री कृषि आणि अन्न प्रक्रिया योजना राबवली जाते."
      ],
      en: [
        "The Chief Minister Agro & Food Processing Scheme promotes value addition of agricultural produce, reduces post-harvest losses, and supports Farmer Producer Organizations (FPOs) and entrepreneurs in setting up modern food processing industries across Maharashtra."
      ],
      hi: [
        "महाराष्ट्र में कृषि उत्पादों का मूल्य संवर्धन करने और किसान उत्पादक संगठनों (FPO) को बढ़ावा देने के लिए खाद्य प्रसंस्करण उद्योगों की स्थापना हेतु 50% तक पूंजीगत अनुदान दिया जाता है।"
      ],
      ahr: [
        "अन्न प्रक्रिया उद्योग उभारणीसाठी अन मूल्यवर्धनासाठी ५०% भांडवली अनुदान दिले जास."
      ],
      kok: [
        "अन्न प्रक्रिया उद्योग उभारणी खातीर ५०% भांडवली अनुदान मेळटा."
      ]
    },
    benefits: {
      mr: ["१) नवीन अन्न प्रक्रिया उद्योग उभारणीसाठी ५०% भांडवली अनुदान.", "२) कोल्ड स्टोअरेज, पॅक हाऊस व रायपनिंग चेंबरसाठी अनुदान."],
      en: ["1) 50% capital subsidy for establishing new agro-processing units.", "2) Subsidy for cold storage, pack houses, and ripening chambers."],
      hi: ["1) नई खाद्य प्रसंस्करण इकाइयों की स्थापना के लिए 50% पूंजीगत सब्सिडी।", "2) कोल्ड स्टोरेज, पैक हाउस और रिपनिंग चैंबर के लिए अनुदान।"],
      ahr: ["१) अन्न प्रक्रिया उद्योगासाठी ५०% अनुदान."],
      kok: ["१) अन्न प्रक्रिया उद्योगा खातीर ५०% अनुदान."]
    },
    eligibility: {
      mr: ["वैयक्तिक शेतकरी, FPO, महिला बचत गट, सहकारी संस्था व नवउद्योजक."],
      en: ["Individual Farmers, Farmer Producer Organizations (FPO), Women SHGs, Cooperatives, and Agri-Entrepreneurs."],
      hi: ["व्यक्तिगत किसान, किसान उत्पादक संगठन (FPO), महिला स्वयं सहायता समूह और उद्यमी।"],
      ahr: ["वैयक्तिक शेतकरी, FPO अन बचत गट."],
      kok: ["वैयक्तिक शेतकार, FPO आनी बचत गट."]
    },
    documents: {
      mr: ["DPR (सविस्तर प्रकल्प अहवाल)", "७/१२ उतारा व ८-अ दाखला", "बँक कर्ज मंजुरी पत्र", "आधार व पॅन कार्ड"],
      en: ["Detailed Project Report (DPR)", "7/12 Land Extract and 8-A Record", "Bank Loan Sanction Letter", "Aadhaar and PAN Card"],
      hi: ["विस्तृत परियोजना रिपोर्ट (DPR)", "7/12 और 8-ए भू-अभिलेख", "बैंक ऋण स्वीकृति पत्र", "आधार एवं पैन कार्ड"],
      ahr: ["DPR रिपोर्ट", "७/१२ उतारा", "बँक पत्र"],
      kok: ["DPR अहवाल", "७/१२ दाखलो", "बँक पत्र"]
    },
    howToApply: {
      mr: ["कृषी विभागाच्या अधिकृत पोर्टलवर DPR व बँक कर्जाच्या कागदपत्रांसह ऑनलाईन अर्ज करावा."],
      en: ["Apply online on Agriculture Department portal with DPR and bank sanction documents."],
      hi: ["कृषि विभाग के पोर्टल पर विस्तृत परियोजना रिपोर्ट (DPR) के साथ ऑनलाइन आवेदन करें।"],
      ahr: ["कृषी विभाग पोर्टलवर अर्ज करा."],
      kok: ["कृषी विभाग पोर्टलार अर्ज करात."]
    },
    faqs: {
      mr: [{ question: "कमाल किती अनुदान मिळते?", answer: "प्रकल्पाच्या ३०% ते ५०% (कमाल रु. ५० लाख ते १ कोटी) अनुदान मिळते." }],
      en: [{ question: "What is the maximum subsidy limit?", answer: "30% to 50% of the project cost with a maximum limit of Rs. 50 Lakhs to Rs. 1 Crore." }],
      hi: [{ question: "अधिकतम कितनी सब्सिडी मिलती है?", answer: "परियोजना लागत का 30% से 50% (अधिकतम रु. 50 लाख से 1 करोड़)।" }],
      ahr: [{ question: "कमाल किती अनुदान मळस?", answer: "कमाल रु. ५० लाख अनुदान मळस." }],
      kok: [{ question: "कमाल कितलें अनुदान मेळटा?", answer: "कमाल रु. ५० लाख अनुदान मेळटा." }]
    },
    contact: {
      mr: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      en: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "Commissioner of Agriculture, Maharashtra State, Pune - 411005" },
      hi: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषि आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      ahr: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" },
      kok: { phone: "020-25530012", email: "diragri.mah@gov.in", address: "कृषी आयुक्तालय, महाराष्ट्र राज्य, पुणे - ४११००५" }
    }
  }
};

const targetFile = path.join(__dirname, '../src/constants/schemeTranslations.json');
const existing = JSON.parse(fs.readFileSync(targetFile, 'utf8'));

Object.keys(remainingTranslations).forEach((key) => {
  existing[key] = remainingTranslations[key];
});

fs.writeFileSync(targetFile, JSON.stringify(existing, null, 2), 'utf8');
console.log("✅ Successfully updated all remaining target schemes with 100% pure multi-language translations!");
