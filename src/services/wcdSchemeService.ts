/**
 * WCD Jalgaon Scheme Service
 * Data mirrors wcdjalgaon.com — Women & Child Development schemes for Jalgaon district
 * Sections: Overview, Eligibility, How to Apply, Documents, FAQs, GR, Contact
 */

export interface WCDScheme {
  id: string;
  title: string;
  titleMarathi: string;
  description: string;
  category: string;
  categoryIcon: string;
  badge?: 'New' | 'Popular' | 'Central' | 'State';
  overview: string;
  eligibility: string[];
  howToApply: string[];
  documents: string[];
  faqs: Array<{ question: string; answer: string }>;
  gr: Array<{ title: string; date: string; grNumber: string; url: string }>;
  contact: {
    office: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    timings: string;
  };
  amount?: string;
  deadline?: string;
  application_url?: string;
  is_featured?: boolean;
}

export const WCD_SCHEMES: WCDScheme[] = [
  // ─── 1. Ladki Bahin Yojana ────────────────────────────────────────────────
  {
    id: 'ladki-bahin',
    title: 'Mukhyamantri Majhi Ladki Bahin Yojana',
    titleMarathi: 'मुख्यमंत्री माझी लाडकी बहीण योजना',
    description: 'Monthly financial assistance of ₹1,500 to eligible women aged 21–65 for economic empowerment.',
    category: 'Women Welfare',
    categoryIcon: 'woman-outline',
    badge: 'Popular',
    amount: '₹1,500 / month',
    is_featured: true,
    application_url: 'https://ladakibahin.maharashtra.gov.in',
    overview:
      'Mukhyamantri Majhi Ladki Bahin Yojana is a flagship scheme of the Maharashtra Government aimed at providing direct financial assistance to women for their economic independence and empowerment. Under this scheme, eligible women aged 21 to 65 years receive ₹1,500 per month directly into their Aadhaar-linked bank accounts. The scheme aims to reduce financial dependence and improve the quality of life for women across Maharashtra, including Jalgaon district. WCD Jalgaon oversees registration, verification, and distribution at the district level.',
    eligibility: [
      'Permanent resident of Maharashtra (Jalgaon district)',
      'Age between 21 and 65 years',
      'Annual family income below ₹2.5 lakh',
      'Should not be a beneficiary of any other cash-transfer scheme paying ₹1,500 or more',
      'Should not be a government employee or income-tax payer',
      'Must have an Aadhaar-linked bank account (DBT enabled)',
      'Married, widowed, divorced, or abandoned women are eligible',
    ],
    howToApply: [
      'Visit the official portal: ladakibahin.maharashtra.gov.in',
      'Click on "नवीन अर्ज करा" (New Application)',
      'Enter your Aadhaar number and mobile number for OTP verification',
      'Fill in personal details: name, age, address, family income',
      'Upload required documents (see Documents tab)',
      'Submit the form and note the Application Reference Number',
      'Application will be verified by Anganwadi worker / CDPO office',
      'Upon approval, ₹1,500 is credited to your Aadhaar-linked bank account monthly',
    ],
    documents: [
      'Aadhaar Card (mandatory)',
      'Ration Card (for family income proof)',
      'Bank Passbook (Aadhaar-linked, DBT enabled)',
      'Domicile/Residence Certificate of Maharashtra',
      'Income Certificate (Annual income ≤ ₹2.5 lakh)',
      'Passport-size photograph',
      'Mobile number linked to Aadhaar',
      'Marriage Certificate (for married women) / Death Certificate of Husband (for widows)',
    ],
    faqs: [
      {
        question: 'Can unmarried women apply?',
        answer: 'Yes, unmarried women aged 21–65 who meet the income criteria are eligible to apply.',
      },
      {
        question: 'When is the money credited?',
        answer: 'Approved beneficiaries receive ₹1,500 directly into their Aadhaar-linked bank accounts on the 15th of each month.',
      },
      {
        question: 'What if my Aadhaar is not linked to my bank account?',
        answer: 'You must link your Aadhaar to your bank account before applying. Visit your bank branch or use the mAadhaar app to link.',
      },
      {
        question: 'Can I apply offline?',
        answer: 'Yes, offline applications can be submitted at your local Anganwadi Center or CDPO office.',
      },
      {
        question: 'Is there an age limit for this scheme?',
        answer: 'Women aged 21 to 65 years are eligible. Women above 65 may be covered under the Senior Citizen Pension scheme.',
      },
    ],
    gr: [
      {
        title: 'Mukhyamantri Majhi Ladki Bahin Yojana — GR dated 28 June 2024',
        date: '28 June 2024',
        grNumber: 'WCD-2024/P.No.146/KB-3',
        url: 'https://gr.maharashtra.gov.in/1145/Government-Resolution',
      },
      {
        title: 'Amendment: Income Criteria Revised — GR dated 15 Aug 2024',
        date: '15 August 2024',
        grNumber: 'WCD-2024/P.No.198/KB-3',
        url: 'https://gr.maharashtra.gov.in/1145/Government-Resolution',
      },
    ],
    contact: {
      office: 'जिल्हा महिला व बाल विकास कार्यालय, जळगाव',
      address: 'CDPO Office, Civil Lines, Jalgaon - 425001, Maharashtra',
      phone: '0257-2229631',
      email: 'cdpojalgaon@gmail.com',
      website: 'https://wcdjalgaon.com',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM (Except Public Holidays)',
    },
  },

  // ─── 2. Mahila Rajyagruh Yojana ──────────────────────────────────────────
  {
    id: 'mahila-rajyagruh',
    title: 'Mahila Rajyagruh Yojana',
    titleMarathi: 'महिला राज्यगृह योजना',
    description: 'Safe, affordable hostel accommodation for working women in urban areas.',
    category: 'Women Welfare',
    categoryIcon: 'home-outline',
    badge: 'State',
    application_url: 'https://mahadbt.maharashtra.gov.in',
    overview:
      'Mahila Rajyagruh Yojana (Women\'s Hostel Scheme) provides safe and affordable residential accommodation to unmarried working women, students, and women engaged in service or business in urban areas. The hostels are run by WCD Department with subsidized rent, mess facilities, and security. Jalgaon district operates state-run hostels under this scheme to support women who migrate for work or education.',
    eligibility: [
      'Unmarried women aged 18–45 years',
      'Must be employed or pursuing higher education',
      'Working in private/government sector or self-employed',
      'Annual income below ₹3.6 lakh',
      'Must be residing away from family for employment or education purposes',
      'Priority given to women from economically weaker sections (EWS)',
    ],
    howToApply: [
      'Obtain the application form from the nearest CDPO Office or Women\'s Hostel',
      'Fill in the form with personal, employment, and income details',
      'Attach all required documents (see Documents tab)',
      'Submit the complete application to the Hostel Superintendent or CDPO Office',
      'Allotment is done based on availability and priority criteria',
      'Confirmation letter is issued after approval',
      'Room allotment and key handover at the hostel',
    ],
    documents: [
      'Aadhaar Card',
      'Income Certificate (Annual income ≤ ₹3.6 lakh)',
      'Employment proof (Offer letter / Employment ID card)',
      'College ID (for students)',
      'Residential proof (original district / state)',
      'Character Certificate from previous residence',
      'Passport-size photographs (3 copies)',
      'Undertaking / Declaration form',
    ],
    faqs: [
      {
        question: 'What is the monthly rent at these hostels?',
        answer: 'Monthly rent is highly subsidized, typically ₹200–₹500 per month depending on room type and facilities available.',
      },
      {
        question: 'Are meals provided?',
        answer: 'Yes, mess/canteen facilities are available at nominal rates in most Mahila Rajyagruh hostels.',
      },
      {
        question: 'Can married women apply?',
        answer: 'No, this scheme is primarily for unmarried women. Widowed or divorced women may be considered on case-by-case basis by the CDPO.',
      },
      {
        question: 'How many seats are available in Jalgaon?',
        answer: 'Seat availability varies. Contact the CDPO Jalgaon office or the nearest Women\'s Hostel for current vacancy information.',
      },
    ],
    gr: [
      {
        title: 'Mahila Rajyagruh Yojana — Implementation GR',
        date: '12 March 2019',
        grNumber: 'WCD-2019/P.No.77/KB-5',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'Mahila Rajyagruh, Jalgaon',
      address: 'Near Civil Hospital, Jalgaon - 425001, Maharashtra',
      phone: '0257-2229631',
      email: 'cdpojalgaon@gmail.com',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM',
    },
  },

  // ─── 3. Anganwadi Poshan Scheme ──────────────────────────────────────────
  {
    id: 'anganwadi-poshan',
    title: 'Anganwadi Poshan Abhiyaan',
    titleMarathi: 'अंगणवाडी पोषण अभियान',
    description: 'Nutrition, health, and pre-school education for children 0–6 years and pregnant/lactating mothers.',
    category: 'Child Nutrition',
    categoryIcon: 'nutrition-outline',
    badge: 'Central',
    is_featured: true,
    application_url: 'https://icds-wcd.nic.in',
    overview:
      'Poshan Abhiyaan (National Nutrition Mission) is India\'s flagship programme to improve nutritional outcomes for children, pregnant women, and lactating mothers. Under ICDS (Integrated Child Development Services), Anganwadi Centers in Jalgaon district provide supplementary nutrition, immunization, health check-ups, referral services, pre-school non-formal education, and nutrition & health education. Jalgaon district has over 2,500 functional Anganwadi Centers covering all talukas.',
    eligibility: [
      'Children aged 0–6 years residing in the Anganwadi service area',
      'Pregnant women (at any stage of pregnancy)',
      'Lactating mothers (up to 6 months after delivery)',
      'Adolescent girls aged 11–14 years (out-of-school)',
      'Must be enrolled at the local Anganwadi Center',
      'No income restriction — open to all families',
    ],
    howToApply: [
      'Visit your nearest Anganwadi Center (AWC) in your village/ward',
      'Meet the Anganwadi Worker (AWW) and express interest',
      'Fill in the beneficiary registration form',
      'Provide basic details: name, age, Aadhaar number, address',
      'Pregnant women: Provide Mother & Child Protection Card',
      'Children: Provide birth certificate/birth date proof',
      'Enrollment is done on-site at the AWC — no online portal needed',
      'Services begin from the date of enrollment',
    ],
    documents: [
      'Aadhaar Card of the child/mother',
      'Birth Certificate (for child registration)',
      'Mother & Child Protection Card (for pregnant/lactating women)',
      'Proof of residence (for service area verification)',
      'Mobile number of mother/guardian',
    ],
    faqs: [
      {
        question: 'What services are provided at Anganwadi?',
        answer: 'Services include supplementary nutrition (Take Home Ration/Hot Cooked Meals), immunization, health check-ups, referral services, non-formal pre-school education, and nutrition counseling.',
      },
      {
        question: 'Is there any fee to enroll at Anganwadi?',
        answer: 'No. All Anganwadi services are completely free of charge.',
      },
      {
        question: 'What nutrition is provided to pregnant women?',
        answer: 'Pregnant and lactating women receive Take Home Ration (THR) containing approximately 600 calories and 18–20g protein per day.',
      },
      {
        question: 'How to find the nearest Anganwadi Center?',
        answer: 'Contact the CDPO office of your taluka or visit the Poshan Tracker app to locate your nearest Anganwadi Center.',
      },
      {
        question: 'What is Poshan Tracker?',
        answer: 'Poshan Tracker is a government mobile app to track nutrition services, beneficiary enrollment, and AWC activities.',
      },
    ],
    gr: [
      {
        title: 'Poshan Abhiyaan — National Nutrition Mission Launch GR',
        date: '18 March 2018',
        grNumber: 'WCD-2018/P.No.45/KB-2',
        url: 'https://gr.maharashtra.gov.in',
      },
      {
        title: 'ICDS — Supplementary Nutrition Programme Revised Guidelines',
        date: '05 January 2022',
        grNumber: 'WCD-2022/P.No.12/KB-2',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'जिल्हा कार्यक्रम अधिकारी, एकात्मिक बालविकास सेवा (ICDS), जळगाव',
      address: 'ICDS Office, Civil Lines, Jalgaon - 425001',
      phone: '0257-2229631',
      email: 'icds.jalgaon@gov.in',
      website: 'https://icds-wcd.nic.in',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM',
    },
  },

  // ─── 4. Bal Sangopan Yojana ──────────────────────────────────────────────
  {
    id: 'bal-sangopan',
    title: 'Bal Sangopan Yojana',
    titleMarathi: 'बाल संगोपन योजना',
    description: '₹1,125/month for children in difficult circumstances who need family-based foster care.',
    category: 'Child Welfare',
    categoryIcon: 'people-outline',
    badge: 'State',
    amount: '₹1,125 / month per child',
    application_url: 'https://mahadbt.maharashtra.gov.in',
    overview:
      'Bal Sangopan Yojana is a Maharashtra state scheme that provides financial assistance to families who voluntarily take care of children living in difficult circumstances — such as orphans, children of destitute parents, children of incarcerated parents, or those from disaster-affected families. The scheme aims to prevent institutionalization by keeping children within a family-based care environment. Eligible foster families receive ₹1,125 per month per child. The scheme is implemented by the District Child Protection Unit (DCPU) under WCD Jalgaon.',
    eligibility: [
      'Children aged 0–18 years in difficult circumstances (orphans, semi-orphans, abandoned)',
      'Children of parents with serious illness, imprisonment, or disability',
      'Children from disaster/riot-affected families',
      'Foster family must be willing and capable of providing care',
      'Foster family\'s annual income should not be too high (as per DCPU guidelines)',
      'Foster family must have a stable home environment',
    ],
    howToApply: [
      'Contact the District Child Protection Unit (DCPU), Jalgaon',
      'Obtain and fill the Bal Sangopan Application Form',
      'Submit application along with child\'s documents and family documents',
      'Home study by Child Welfare Officer will be conducted',
      'Case presented before Child Welfare Committee (CWC) for approval',
      'Upon CWC approval, financial assistance begins via DBT',
      'Case is reviewed every 6 months by DCPU',
    ],
    documents: [
      'Child\'s Birth Certificate',
      'Proof of child\'s difficult circumstances (death certificate, medical certificate, court orders)',
      'Aadhaar Card of child and foster parents',
      'Foster family\'s income certificate',
      'Residence proof of foster family',
      'Bank account details (Aadhaar-linked)',
      'Photographs of child and foster family',
      'Recommendation from local authority / Gram Panchayat',
    ],
    faqs: [
      {
        question: 'Who can be a foster family?',
        answer: 'Any willing and stable family in Maharashtra can apply to foster a child. The DCPU conducts a home study to verify the family\'s suitability.',
      },
      {
        question: 'How many children can one family foster?',
        answer: 'Generally, one family can foster up to 2 children at a time, subject to DCPU assessment and CWC approval.',
      },
      {
        question: 'Is adoption different from Bal Sangopan?',
        answer: 'Yes. Bal Sangopan is foster care with financial assistance. Adoption legally transfers parental rights. Both are different processes with separate procedures.',
      },
      {
        question: 'What happens when the child turns 18?',
        answer: 'Assistance under Bal Sangopan stops at 18 years. The child can then apply under other youth welfare schemes if eligible.',
      },
    ],
    gr: [
      {
        title: 'Bal Sangopan Yojana — Revised Assistance GR',
        date: '22 September 2021',
        grNumber: 'WCD-2021/P.No.112/KB-6',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'जिल्हा बाल संरक्षण कक्ष (DCPU), जळगाव',
      address: 'DCPU Office, Collector Compound, Jalgaon - 425001',
      phone: '0257-2229631',
      email: 'dcpu.jalgaon@gov.in',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM',
    },
  },

  // ─── 5. Swadhar Greh Yojana ──────────────────────────────────────────────
  {
    id: 'swadhar-greh',
    title: 'Swadhar Greh Yojana',
    titleMarathi: 'स्वाधार गृह योजना',
    description: 'Shelter, food, clothing, legal aid, and rehabilitation for women in difficult circumstances.',
    category: 'Women Welfare',
    categoryIcon: 'shield-outline',
    badge: 'Central',
    application_url: 'https://wcdjalgaon.com',
    overview:
      'Swadhar Greh Scheme provides institutional support to women in difficult circumstances — including survivors of domestic violence, trafficking, destitute women, women released from jail, and women rescued from conflict zones. The scheme offers temporary shelter, food, clothing, counseling, legal aid, medical facilities, vocational training, and rehabilitation. Swadhar Greh homes in Jalgaon district operate under the WCD Department and are funded by the Ministry of Women and Child Development, Government of India.',
    eligibility: [
      'Women and girls above 18 years in difficult circumstances',
      'Survivors of domestic violence, rape, trafficking, or exploitation',
      'Widows in distress without social/economic support',
      'Women with mental illness without family support',
      'Women released from jail who have no family or home',
      'Women and girls rescued from flesh trade',
      'Destitute women including elderly women with no support',
    ],
    howToApply: [
      'Any woman in need can approach a Swadhar Greh Home directly',
      'Police, NGOs, or courts can also refer victims to Swadhar Greh',
      'CDPO or One-Stop Centre (OSC) can facilitate admission',
      'No formal application form required — admission is based on need',
      'Intake interview conducted by Social Worker at the Greh',
      'Residential stay allowed up to 2 years (extendable in special cases)',
      'Rehabilitation plan prepared for each beneficiary',
    ],
    documents: [
      'Any identity proof (Aadhaar, Voter ID, Ration Card) — if available',
      'Medical certificate (for women with medical needs)',
      'FIR copy / Court order (for violence survivors — if available)',
      'Police referral letter (if referred by police)',
      'Note: Women in emergency can be admitted without documents initially',
    ],
    faqs: [
      {
        question: 'Is stay at Swadhar Greh free?',
        answer: 'Yes, shelter, food, clothing, and all basic services at Swadhar Greh are provided free of charge to beneficiaries.',
      },
      {
        question: 'How long can a woman stay at Swadhar Greh?',
        answer: 'The normal stay is up to 1 year, extendable up to 3 years in exceptional cases based on need and rehabilitation plan.',
      },
      {
        question: 'Can children accompany their mother to Swadhar Greh?',
        answer: 'Yes, children up to the age of 12 years (boys) and 18 years (girls) can stay with their mother at Swadhar Greh.',
      },
      {
        question: 'Is counseling provided?',
        answer: 'Yes, professional psychological counseling, legal aid, and vocational training are core services of Swadhar Greh.',
      },
    ],
    gr: [
      {
        title: 'Swadhar Greh — Revised Guidelines, Ministry of WCD',
        date: '09 August 2018',
        grNumber: 'WCD-2018/P.No.89/KB-4',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'Swadhar Greh, Jalgaon / WCD Jalgaon',
      address: 'Near Collector Office, Jalgaon - 425001',
      phone: '0257-2229631 | Helpline: 181',
      email: 'swadhar.jalgaon@gov.in',
      website: 'https://wcdjalgaon.com',
      timings: '24×7 (Emergency Helpline: 181)',
    },
  },

  // ─── 6. One-Stop Centre (Sakhi) ──────────────────────────────────────────
  {
    id: 'one-stop-centre-sakhi',
    title: 'One-Stop Centre (Sakhi)',
    titleMarathi: 'वन-स्टॉप सेंटर (सखी)',
    description: 'Integrated support for women affected by violence — shelter, police, legal, medical & counseling.',
    category: 'Women Safety',
    categoryIcon: 'heart-outline',
    badge: 'Central',
    is_featured: true,
    application_url: 'https://oscjalgaon.gov.in',
    overview:
      'One-Stop Centre (OSC), branded as "Sakhi", is a comprehensive support centre for women affected by violence — including domestic violence, sexual assault, acid attack, cyber crime, or any form of gender-based violence. OSCs are co-located with district hospitals for easy access. Jalgaon Sakhi Centre provides immediate medical assistance, police assistance, legal aid, counseling, temporary shelter (for up to 5 days), and case management — all under one roof. The scheme is funded by Nirbhaya Fund by the Ministry of WCD.',
    eligibility: [
      'Any woman affected by violence (age no bar — girls below 18 also covered)',
      'Survivors of domestic violence, sexual assault, trafficking, acid attack',
      'Women facing harassment at workplace or in public',
      'Women and girls in need of emergency shelter',
      'Girls below 18 years (linked with Child Welfare Committee)',
    ],
    howToApply: [
      'Walk in directly to the One-Stop Centre at District Hospital, Jalgaon',
      'Call Helpline 181 (24×7, toll-free) for immediate assistance',
      'Police can refer victims directly to OSC',
      'Hospital emergency department can facilitate OSC support',
      'Court / NGO can also refer victims to OSC',
      'No paperwork required to access emergency services',
      'Case manager assigned to guide through all support services',
    ],
    documents: [
      'Any identity proof (if available) — not mandatory for emergency access',
      'Medical reports (provided by hospital)',
      'FIR / police complaint (facilitated by OSC staff)',
      'Note: Services are accessible without documents in emergency situations',
    ],
    faqs: [
      {
        question: 'What is the helpline number for Sakhi OSC?',
        answer: 'Dial 181 (Women Helpline) — toll-free, available 24 hours, 7 days. Services in Marathi, Hindi, and English.',
      },
      {
        question: 'Can men seek help for female family members?',
        answer: 'Yes, family members can call 181 or visit OSC on behalf of the affected woman for referral and guidance.',
      },
      {
        question: 'Is temporary shelter available at OSC?',
        answer: 'Yes, OSC provides temporary shelter for up to 5 days. Women needing longer stay can be referred to Swadhar Greh.',
      },
      {
        question: 'Are OSC services free?',
        answer: 'Yes, all services at One-Stop Centre Sakhi are completely free of charge.',
      },
      {
        question: 'Where is Jalgaon OSC located?',
        answer: 'Jalgaon Sakhi OSC is located at District Civil Hospital campus, Jalgaon. Contact: 181 or 0257-2229631.',
      },
    ],
    gr: [
      {
        title: 'One-Stop Centre Scheme — Implementation Guidelines',
        date: '01 April 2015',
        grNumber: 'WCD-2015/P.No.34/KB-1',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'Sakhi One-Stop Centre, Jalgaon',
      address: 'District Civil Hospital Campus, Jalgaon - 425001',
      phone: '181 (Toll-Free, 24×7) | 0257-2222100',
      email: 'sakhi.jalgaon@gov.in',
      website: 'https://oscjalgaon.gov.in',
      timings: '24×7 (All days including holidays)',
    },
  },

  // ─── 7. Kishori Shakti Yojana ─────────────────────────────────────────────
  {
    id: 'kishori-shakti',
    title: 'Kishori Shakti Yojana (SABLA)',
    titleMarathi: 'किशोरी शक्ती योजना (SABLA)',
    description: 'Holistic empowerment of adolescent girls 11–18 years — health, nutrition, education & life skills.',
    category: 'Adolescent Girls',
    categoryIcon: 'sparkles-outline',
    badge: 'Central',
    application_url: 'https://wcdjalgaon.com',
    overview:
      'Kishori Shakti Yojana, now known as SABLA (Rajiv Gandhi Scheme for Empowerment of Adolescent Girls), aims at holistic development of adolescent girls aged 11–18 years. The scheme focuses on improving nutritional and health status, upgrading life skills and homemaking skills, mainstreaming out-of-school girls into formal education, and providing vocational training. Services are delivered through Anganwadi Centers across Jalgaon district. Girls receive nutrition supplements, health check-ups, life skills education, and guidance on reproductive health.',
    eligibility: [
      'Girls aged 11–18 years residing in the Anganwadi service area',
      'Priority to out-of-school girls aged 11–14 years',
      'No income restriction — open to all adolescent girls',
      'Must be enrolled at the local Anganwadi Center',
    ],
    howToApply: [
      'Visit the nearest Anganwadi Center (AWC)',
      'Contact the Anganwadi Worker (AWW) for SABLA enrollment',
      'Provide name, age proof, and Aadhaar',
      'Enrollment done at AWC level — no fees or complex paperwork',
      'Services begin from the date of enrollment',
    ],
    documents: [
      'Aadhaar Card of the girl',
      'Birth Certificate or age proof',
      'School enrollment certificate (for in-school girls)',
    ],
    faqs: [
      {
        question: 'What does SABLA provide?',
        answer: 'SABLA provides nutrition (600 calories/day), iron & folic acid supplements, health check-ups, life skills education, vocational training guidance, and legal literacy.',
      },
      {
        question: 'Is SABLA only for out-of-school girls?',
        answer: 'No. SABLA covers all adolescent girls aged 11–18 years, both in-school and out-of-school.',
      },
      {
        question: 'What life skills are taught?',
        answer: 'Life skills include personal hygiene, reproductive health, leadership, communication, financial literacy, and vocational guidance.',
      },
    ],
    gr: [
      {
        title: 'SABLA Scheme — Implementation Order',
        date: '15 October 2010',
        grNumber: 'WCD-2010/P.No.67/KB-2',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'CDPO Office / ICDS Jalgaon',
      address: 'Civil Lines, Jalgaon - 425001',
      phone: '0257-2229631',
      email: 'icds.jalgaon@gov.in',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM',
    },
  },

  // ─── 8. Pradhan Mantri Matru Vandana Yojana ──────────────────────────────
  {
    id: 'pmmvy',
    title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    titleMarathi: 'प्रधानमंत्री मातृ वंदना योजना',
    description: '₹5,000 maternity benefit for first live birth to compensate for wage loss during pregnancy.',
    category: 'Maternity',
    categoryIcon: 'fitness-outline',
    badge: 'Central',
    amount: '₹5,000 (in installments)',
    is_featured: true,
    application_url: 'https://pmmvy.wcd.gov.in',
    overview:
      'Pradhan Mantri Matru Vandana Yojana (PMMVY) is a maternity benefit programme that provides ₹5,000 cash incentive to pregnant and lactating mothers for their first live birth. The benefit is paid in three installments to partially compensate for wage loss and ensure proper rest and nutrition. The scheme encourages institutional delivery and early registration of pregnancy. All eligible women (except those already covered under the ESI Act) can benefit. Jalgaon district implements PMMVY through Anganwadi Centers and PHCs.',
    eligibility: [
      'All pregnant women and lactating mothers for the first live birth',
      'Age 19 years and above',
      'Should not be a beneficiary of similar central scheme (e.g., ESI Act)',
      'Must have an Aadhaar-linked bank account',
      'Registration must be done before 150 days of pregnancy (for Installment 1)',
    ],
    howToApply: [
      'Register at the nearest Anganwadi Center (AWC) or Health Facility (PHC/CHC)',
      '1st Installment (₹1,000): Register early pregnancy (before 150 days) at AWC/PHC',
      '2nd Installment (₹2,000): Received at least one ANC (Antenatal Checkup) after 6 months of pregnancy',
      '3rd Installment (₹2,000): After registration of birth and child completed 1st cycle of vaccination',
      'Fill Form 1A, 1B, 1C as per installment stage at AWC',
      'Amount is directly credited to Aadhaar-linked bank account',
    ],
    documents: [
      'Aadhaar Card of mother (mandatory)',
      'Aadhaar Card of husband',
      'Bank Passbook (Aadhaar-linked, DBT enabled)',
      'MCP Card (Mother & Child Protection Card)',
      'Proof of pregnancy (PHC/doctor certificate)',
      'Mobile number linked to Aadhaar',
    ],
    faqs: [
      {
        question: 'Is PMMVY applicable for the second child?',
        answer: 'PMMVY covers only the first live birth. However, if the second child is a girl, an additional ₹6,000 is provided under the scheme revision (2022).',
      },
      {
        question: 'When is the money credited?',
        answer: 'Each installment is credited within 30 days of approval at AWC. Bank account must be Aadhaar-linked for DBT.',
      },
      {
        question: 'Can I apply if I had a miscarriage before?',
        answer: 'Yes. PMMVY covers the first live birth, regardless of previous miscarriages. Please mention it in the registration form.',
      },
      {
        question: 'What if I missed registering within 150 days?',
        answer: 'Late registration is accepted but you may miss the 1st installment. Register as soon as possible to claim remaining installments.',
      },
    ],
    gr: [
      {
        title: 'PMMVY — Implementation Guidelines',
        date: '01 January 2017',
        grNumber: 'WCD-2017/P.No.01/KB-3',
        url: 'https://gr.maharashtra.gov.in',
      },
      {
        title: 'PMMVY 2.0 — Revised Scheme for Second Girl Child',
        date: '19 March 2022',
        grNumber: 'WCD-2022/P.No.55/KB-3',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'ICDS / Anganwadi Center / PHC, Jalgaon',
      address: 'Nearest AWC or Primary Health Centre in your taluka',
      phone: '0257-2229631',
      email: 'icds.jalgaon@gov.in',
      website: 'https://pmmvy.wcd.gov.in',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM',
    },
  },

  // ─── 9. Manav Vikas Mission ──────────────────────────────────────────────
  {
    id: 'manav-vikas-mission',
    title: 'Manav Vikas Mission',
    titleMarathi: 'मानव विकास मिशन',
    description: 'Integrated human development in backward talukas — health, education, nutrition & livelihood.',
    category: 'Human Development',
    categoryIcon: 'people-circle-outline',
    badge: 'State',
    application_url: 'https://mahadbt.maharashtra.gov.in',
    overview:
      'Manav Vikas Mission (MVM) is a Maharashtra government initiative targeting the most backward talukas in the state for integrated human development. In Jalgaon district, selected talukas receive intensified services in health, nutrition, education, skill development, and livelihood. WCD department coordinates nutrition and women empowerment components. The mission focuses on reducing maternal mortality, infant mortality, and malnutrition while improving literacy and livelihood opportunities for women and children in vulnerable communities.',
    eligibility: [
      'Residents of MVM-designated backward talukas in Jalgaon district',
      'Pregnant and lactating women',
      'Children aged 0–6 years with malnutrition or stunting',
      'Adolescent girls in backward areas',
      'Women from BPL / SC / ST / OBC categories prioritized',
    ],
    howToApply: [
      'Services are delivered directly through Anganwadi Centers, PHCs, and schools',
      'No separate application required for most MVM services',
      'Women can enroll at local AWC or contact CDPO for specific programmes',
      'Skill development components: contact District Skill Development Centre',
    ],
    documents: [
      'Aadhaar Card',
      'BPL/Ration Card (if applicable)',
      'Domicile proof of MVM taluka',
    ],
    faqs: [
      {
        question: 'Which talukas in Jalgaon are covered under MVM?',
        answer: 'Backward talukas as designated by GoM are covered. Contact CDPO Jalgaon for the current list of MVM talukas in the district.',
      },
      {
        question: 'What is the focus of MVM for women?',
        answer: 'MVM focuses on maternal health, nutrition, skill development, self-help group formation, and economic empowerment of women in backward areas.',
      },
    ],
    gr: [
      {
        title: 'Manav Vikas Mission — District Implementation GR',
        date: '05 February 2007',
        grNumber: 'WCD-2007/P.No.23/KB-5',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'Manav Vikas Mission Cell, Jalgaon',
      address: 'Collector Office Compound, Jalgaon - 425001',
      phone: '0257-2229631',
      email: 'mvm.jalgaon@gov.in',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM',
    },
  },

  // ─── 10. Widow Pension Scheme ─────────────────────────────────────────────
  {
    id: 'widow-pension',
    title: 'Sanjay Gandhi Niradhar Anudan Yojana (Widow)',
    titleMarathi: 'संजय गांधी निराधार अनुदान योजना (विधवा)',
    description: '₹1,000–₹1,500/month pension for destitute widows and women without support.',
    category: 'Women Welfare',
    categoryIcon: 'hand-left-outline',
    badge: 'State',
    amount: '₹1,000–₹1,500 / month',
    application_url: 'https://aaplesarkar.mahaonline.gov.in',
    overview:
      'Sanjay Gandhi Niradhar Anudan Yojana provides monthly pension to destitute persons including widows, abandoned women, and women with no source of income. Eligible widows receive ₹1,000 per month (or ₹1,500 if the household has 2 or more beneficiaries) directly through DBT. The scheme is implemented by the Social Justice Department but women\'s applications are often facilitated through WCD / CDPO offices. Jalgaon district processes thousands of applications annually.',
    eligibility: [
      'Widows aged 65 years and above (with no other pension)',
      'Abandoned/destitute women with no income source',
      'Annual family income below ₹21,000 (rural) / ₹21,000 (urban)',
      'Must be permanent resident of Maharashtra',
      'Should not be beneficiary of other pension schemes',
    ],
    howToApply: [
      'Visit Aaple Sarkar portal: aaplesarkar.mahaonline.gov.in',
      'Select "महिला व बाल विकास" department',
      'Choose "Sanjay Gandhi Niradhar Anudan" scheme',
      'Fill in personal, income, and bank details',
      'Upload required documents',
      'Offline: Visit Talathi / Gram Sevak / CDPO Office for application assistance',
      'Submit application and receive acknowledgment',
      'Verification done by Talathi and approved by Tehsildar/CDPO',
    ],
    documents: [
      'Aadhaar Card',
      'Husband\'s Death Certificate (for widows)',
      'Age Proof (Birth Certificate / School Certificate)',
      'Income Certificate (issued by Tehsildar)',
      'Bank Passbook (Aadhaar-linked)',
      'Domicile Certificate of Maharashtra',
      'Ration Card',
      'Passport-size photograph',
    ],
    faqs: [
      {
        question: 'Can a widow below 65 years apply?',
        answer: 'Widows below 65 years who are destitute and have no income source can apply under the general destitute category. Contact the CDPO office for guidance.',
      },
      {
        question: 'How is pension credited?',
        answer: 'Monthly pension is credited to the Aadhaar-linked bank account through Direct Benefit Transfer (DBT).',
      },
      {
        question: 'Is there a waiting list?',
        answer: 'Subject to budget allocation, there may be a waiting period. Contact the CDPO office for the current status in your taluka.',
      },
    ],
    gr: [
      {
        title: 'Sanjay Gandhi Niradhar Anudan Yojana — Revised Rates GR',
        date: '12 January 2019',
        grNumber: 'SJD-2019/P.No.44/KB-2',
        url: 'https://gr.maharashtra.gov.in',
      },
    ],
    contact: {
      office: 'CDPO Office / Talathi Office, Jalgaon',
      address: 'CDPO Office, Civil Lines, Jalgaon - 425001',
      phone: '0257-2229631',
      email: 'cdpojalgaon@gmail.com',
      timings: 'Monday – Saturday: 10:00 AM to 5:30 PM',
    },
  },
];

export const WCD_CATEGORIES = [
  { id: 'all', name: 'All', count: WCD_SCHEMES.length },
  { id: 'women-welfare', name: 'Women Welfare', count: WCD_SCHEMES.filter(s => s.category === 'Women Welfare').length },
  { id: 'child-welfare', name: 'Child Welfare', count: WCD_SCHEMES.filter(s => s.category === 'Child Welfare').length },
  { id: 'child-nutrition', name: 'Child Nutrition', count: WCD_SCHEMES.filter(s => s.category === 'Child Nutrition').length },
  { id: 'maternity', name: 'Maternity', count: WCD_SCHEMES.filter(s => s.category === 'Maternity').length },
  { id: 'women-safety', name: 'Women Safety', count: WCD_SCHEMES.filter(s => s.category === 'Women Safety').length },
  { id: 'adolescent-girls', name: 'Adolescent Girls', count: WCD_SCHEMES.filter(s => s.category === 'Adolescent Girls').length },
  { id: 'human-development', name: 'Human Development', count: WCD_SCHEMES.filter(s => s.category === 'Human Development').length },
];

export const getWCDSchemeById = (id: string): WCDScheme | undefined =>
  WCD_SCHEMES.find((s) => s.id === id);

export const getWCDSchemesByCategory = (category: string, search?: string): WCDScheme[] => {
  let schemes = category === 'All' ? [...WCD_SCHEMES] : WCD_SCHEMES.filter(s => s.category === category);
  if (search) {
    const q = search.toLowerCase();
    schemes = schemes.filter(
      s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }
  return schemes;
};
