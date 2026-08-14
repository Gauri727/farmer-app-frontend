/**
 * Scheme Service
 * Endpoints: GET /schemes, GET /schemes/:id, GET /schemes/categories, GET /schemes/search
 */

import apiClient, { BASE_URL } from '../api/client';
import {
  ApiResponse,
  PaginatedResponse,
  Scheme,
  SchemeCategory,
  SchemeFilters,
} from '../types/api.types';

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: "bhausaheb-fundkar-falbag-lagvad-yojana",
    title: "भाऊसाहेब फुंडकर फळबाग लागवड योजना",
    name: "भाऊसाहेब फुंडकर फळबाग लागवड योजना",
    englishName: "Bhausaheb Fundkar Falbag Lagvad Yojana",
    category: "Horticulture",
    department: "कृषी विभाग",
    type: "State",
    amount: "५०% ते १००% अनुदान",
    shortDescription: "फळबाग लागवडीसाठी पहिल्या वर्षी ५०%, दुसऱ्या वर्षी ३०% आणि तिसऱ्या वर्षी २०% अनुदान.",
    description: "फळबाग लागवडीसाठी पहिल्या वर्षी ५०%, दुसऱ्या वर्षी ३०% आणि तिसऱ्या वर्षी २०% अनुदान.",
    eligibility_criteria: "फळबाग लागवडीसाठी ठिबक सिंचन संच बसविणे अनिवार्य. ०.१० ते १० हेक्टर जमीन धारक.",
    benefits: "ठिबक सिंचनासाठी १००% अनुदान व ३ वर्षात टप्प्याटप्प्याने फळबाग लागवड अनुदान.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
    is_featured: true,
  },
  {
    id: "pmksy-per-drop-more-crop-css",
    title: "प्रधानमंत्री कृषी सिंचन योजना - प्रती थेंब अधिक पिक (सूक्ष्म सिंचन घटक)",
    name: "प्रधानमंत्री कृषी सिंचन योजना - प्रती थेंब अधिक पिक (सूक्ष्म सिंचन घटक)",
    englishName: "Pradhan Mantri Krishi Sinchayee Yojana - Per Drop More Crop (PMKSY)",
    category: "Irrigation",
    department: "कृषी विभाग",
    type: "Central",
    amount: "५५% तर इतर शेतकऱ्यांना ४५% अनुदान",
    shortDescription: "पिकांच्या झाडाच्या मुळाशी लहानशा नळीद्वारे थेंबथेंब पाणी देण्याची आधुनिक पद्धत म्हणजे ठिबक सिंचन.",
    description: "पिकांच्या झाडाच्या मुळाशी लहानशा नळीद्वारे थेंबथेंब पाणी देण्याची आधुनिक पद्धत म्हणजे ठिबक सिंचन.",
    eligibility_criteria: "शेतकऱ्याकडे आधार कार्ड असावे; ७/१२ व ८-अ प्रमाणपत्र असणे आवश्यक आहे.",
    benefits: "अल्प व अत्यल्प भूधारक शेतकरी - ५५ %; इतर शेतकरी - ४५ %",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
    is_featured: true,
  },
  {
    id: "sub-mission-on-agricultural-mechanization-css",
    title: "कृषी यांत्रिकीकरण उप-अभियान",
    name: "कृषी यांत्रिकीकरण उप-अभियान",
    englishName: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Mechanization",
    department: "कृषी विभाग",
    type: "Central",
    amount: "५०% ते ८०% अनुदान",
    shortDescription: "ट्रॅक्टर, पॉवर टिलर, अवजारे खरेदीसाठी ५०% अनुदान व कस्टम हायरिंग केंद्रांसाठी ८०% सहाय्य.",
    description: "ट्रॅक्टर, पॉवर टिलर, अवजारे खरेदीसाठी ५०% अनुदान व कस्टम हायरिंग केंद्रांसाठी ८०% सहाय्य.",
    eligibility_criteria: "महाराष्ट्रातील ७/१२ धारक व आधार कार्ड असलेले शेतकरी.",
    benefits: "ट्रॅक्टर, पॉवर टिलर, अवजारे खरेदीवर ५०% अनुदान व अवजारे बँक केंद्रांसाठी ८०% सहाय्य.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
    is_featured: true,
  },
  {
    id: "national-food-security-mission",
    title: "राष्ट्रीय अन्न सुरक्षा अभियान : अन्नधान्य, तेलबिया, ऊस व कापूस",
    name: "राष्ट्रीय अन्न सुरक्षा अभियान : अन्नधान्य, तेलबिया, ऊस व कापूस",
    englishName: "National Food Security Mission (NFSM)",
    category: "Crop Development",
    department: "कृषी विभाग",
    type: "Central",
    amount: "५०% पर्यंत अनुदान",
    shortDescription: "अन्नधान्य, तेलबिया, ऊस व कापूस पिकांची उत्पादकता वाढवण्यासाठी बियाणे व प्रात्यक्षिके अनुदान.",
    description: "अन्नधान्य, तेलबिया, ऊस व कापूस पिकांची उत्पादकता वाढवण्यासाठी बियाणे व प्रात्यक्षिके अनुदान.",
    eligibility_criteria: "महाराष्ट्रातील अधिसूचित जिल्ह्यातील ७/१२ धारक शेतकरी.",
    benefits: "प्रमाणित बियाणे वितरणावर ५०% अनुदान व प्रात्यक्षिके सहाय्य.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
  },
  {
    id: "birsa-munda-krishi-kranti-yojana",
    title: "बिरसा मुंडा कृषी क्रांती योजना (आदिवासी उप योजना / आदिवासी उप योजना बाह्य)",
    name: "बिरसा मुंडा कृषी क्रांती योजना (आदिवासी उप योजना / आदिवासी उप योजना बाह्य)",
    englishName: "Birsa Munda Krishi Kranti Yojana (TSP & OTSP)",
    category: "Tribal Development",
    department: "कृषी विभाग",
    type: "State",
    amount: "रु. २.५० लाख पर्यंत अनुदान",
    shortDescription: "अनुसूचित जमाती (ST) शेतकऱ्यांसाठी नवीन विहीर, विहीर दुरुस्ती, पंप संच व ठिबक/तुषार सिंचन अनुदान.",
    description: "अनुसूचित जमाती (ST) शेतकऱ्यांसाठी नवीन विहीर, विहीर दुरुस्ती, पंप संच व ठिबक/तुषार सिंचन अनुदान.",
    eligibility_criteria: "अनुसूचित जमाती (ST) प्रवर्गातील ०.२० ते ६.०० हेक्टर जमीन असलेले शेतकरी.",
    benefits: "नवीन विहीर रु. २.५ लाख, विहीर दुरुस्ती रु. ५० हजार, पंप संच रु. २५ हजार, ठिबक रु. ५० हजार.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
    is_featured: true,
  },
  {
    id: "dr-babasaheb-ambedkar-krushi-swavalamban-yojana",
    title: "डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन योजना",
    name: "डॉ. बाबासाहेब आंबेडकर कृषी स्वावलंबन योजना",
    englishName: "Dr. Babasaheb Ambedkar Krushi Swavalamban Yojana",
    category: "Farmer Welfare",
    department: "कृषी विभाग",
    type: "State",
    amount: "रु. २.५० लाख पर्यंत अनुदान",
    shortDescription: "अनुसूचित जाती (SC) व नवबौद्ध शेतकऱ्यांसाठी विहीर, विहीर दुरुस्ती, पंप व सूक्ष्म सिंचन अनुदान.",
    description: "अनुसूचित जाती (SC) व नवबौद्ध शेतकऱ्यांसाठी विहीर, विहीर दुरुस्ती, पंप व सूक्ष्म सिंचन अनुदान.",
    eligibility_criteria: "अनुसूचित जाती (SC) किंवा नवबौद्ध प्रवर्गातील ०.२० ते ६ हेक्टर जमीन असलेले शेतकरी.",
    benefits: "नवीन विहीर रु. २.५ लाख, जुनी विहीर दुरुस्ती रु. ५० हजार, पंप संच रु. २५ हजार.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
  },
  {
    id: "mission-for-integrated-development-of-horticulture",
    title: "एकात्मिक फलोत्पादन विकास अभियान",
    name: "एकात्मिक फलोत्पादन विकास अभियान",
    englishName: "Mission for Integrated Development of Horticulture (MIDH)",
    category: "Horticulture",
    department: "कृषी विभाग",
    type: "Central",
    amount: "१९ घटकांवर अनुदान",
    shortDescription: "फळबाग लागवड, ग्रीनहाऊस, कांदाचाळ, शितगृह व काढणीपश्चात व्यवस्थापनासाठी १९ घटकांवर अनुदान.",
    description: "फळबाग लागवड, ग्रीनहाऊस, कांदाचाळ, शितगृह व काढणीपश्चात व्यवस्थापनासाठी १९ घटकांवर अनुदान.",
    eligibility_criteria: "वैयक्तिक शेतकरी, FPO, बचत गट व सहकारी संस्था.",
    benefits: "ग्रीनहाऊस, पॉलीहाऊस, कांदाचाळ, कोल्ड स्टोरेज, पॅक हाऊस व फळबाग विकास.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
    is_featured: true,
  },
  {
    id: "state-sponsored-agriculture-mechanization",
    title: "राज्य कृषी यांत्रिकीकरण योजना",
    name: "राज्य कृषी यांत्रिकीकरण योजना",
    englishName: "State Sponsored Agriculture Mechanization Scheme",
    category: "Mechanization",
    department: "कृषी विभाग",
    type: "State",
    amount: "४०% ते ५०% अनुदान",
    shortDescription: "राज्य शासनाकडून ट्रॅक्टर व कृषी अवजारे खरेदीसाठी ४०% ते ५०% अनुदान.",
    description: "राज्य शासनाकडून ट्रॅक्टर व कृषी अवजारे खरेदीसाठी ४०% ते ५०% अनुदान.",
    eligibility_criteria: "महाराष्ट्रातील ७/१२ धारक सर्व पात्र शेतकरी.",
    benefits: "ट्रॅक्टर खरेदीवर कमाल रु. १.२५ लाख व इतर अवजारांवर ५०% अनुदान.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
  },
  {
    id: "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
    title: "डॉ. श्यामाप्रसाद मुखर्जी जन वन विकास योजना",
    name: "डॉ. श्यामाप्रसाद मुखर्जी जन वन विकास योजना",
    englishName: "Dr. Syama Prasad Mookerjee Jan Van Vikas Yojana",
    category: "Tribal Development",
    department: "वन विभाग",
    type: "State",
    amount: "७५% वन विभाग अनुदान",
    shortDescription: "व्याघ्र प्रकल्प व अभयारण्य लगतच्या गावांमधील शेतकऱ्यांना एलपीजी, सौर कुंपण व शेतीपूरक व्यवसाय मदत.",
    description: "व्याघ्र प्रकल्प व अभयारण्य लगतच्या गावांमधील शेतकऱ्यांना एलपीजी, सौर कुंपण व शेतीपूरक व्यवसाय मदत.",
    eligibility_criteria: "अभयारण्य व व्याघ्र प्रकल्पांच्या बफर झोनमधील ग्रामस्त व शेतकरी.",
    benefits: "सौर ऊर्जा कुंपण ७५% अनुदान, घरगुती एलपीजी गॅस २५% शेतकरी वाटा व पशुपालन मदत.",
    application_url: "https://mahaforest.gov.in",
  },
  {
    id: "pmrkvy-rainfed-area-development",
    title: "प्रधानमंत्री राष्ट्रीय कृषी विकास योजने अंतर्गत कोरडवाहू क्षेत्र विकास (RAD) योजना",
    name: "प्रधानमंत्री राष्ट्रीय कृषी विकास योजने अंतर्गत कोरडवाहू क्षेत्र विकास (RAD) योजना",
    englishName: "Rainfed Area Development (RAD) under PMRKVY",
    category: "Rainfed Development",
    department: "कृषी विभाग",
    type: "Central",
    amount: "कमाल ₹३०,००० अनुदान",
    shortDescription: "कोरडवाहू क्षेत्रात एकात्मिक शेती पद्धती (IFS) व क्लस्टर विकासासाठी प्रति शेतकरी रु. ३०,००० मदत.",
    description: "कोरडवाहू क्षेत्रात एकात्मिक शेती पद्धती (IFS) व क्लस्टर विकासासाठी प्रति शेतकरी रु. ३०,००० मदत.",
    eligibility_criteria: "महाराष्ट्रातील ३४ ग्रामीण जिल्ह्यांमधील निवडक २० हेक्टर क्लस्टर क्षेत्रातील शेतकरी.",
    benefits: "एकात्मिक शेती पद्धतीसाठी प्रति कुटुंब रु. ३०,००० अनुदान.",
    application_url: "https://mahadbt2.maharashtra.gov.in/farmer",
  },
  {
    id: "gopinath-munde-shetkari-apghat-suraksha-yojana",
    title: "गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह अनुदान योजना",
    name: "गोपीनाथ मुंडे शेतकरी अपघात सुरक्षा सानुग्रह अनुदान योजना",
    englishName: "Gopinath Munde Shetkari Apghat Suraksha Sanugrah Anudan Yojana",
    category: "Safety & Welfare",
    department: "कृषी विभाग",
    type: "State",
    amount: "रु. २,००,०००/- पर्यंत",
    shortDescription: "शेतकऱ्याचा अपघाती मृत्यू किंवा अपंगत्व आल्यास रु. २ लाख पर्यंत सानुग्रह अनुदान.",
    description: "शेतकऱ्याचा अपघाती मृत्यू किंवा अपंगत्व आल्यास रु. २ लाख पर्यंत सानुग्रह अनुदान.",
    eligibility_criteria: "१० ते ७५ वयोगटातील ७/१२ धारक शेतकरी व त्यांच्या कुटुंबातील सदस्य.",
    benefits: "अपघाती मृत्यूवर रु. २ लाख व अपंगत्वावर रु. १ ते २ लाख सानुग्रह अनुदान.",
    application_url: "https://krishi.maharashtra.gov.in",
  },
];

const CATEGORY_ORDER = [
  'Horticulture',
  'Irrigation',
  'Mechanization',
  'Crop Development',
  'Tribal Development',
  'Farmer Welfare',
  'Rainfed Development',
  'Safety & Welfare',
];

const getFilteredSchemes = (filters?: SchemeFilters) => {
  const search = (filters?.search || '').trim().toLowerCase();

  return MOCK_SCHEMES.filter((scheme) => {
    const matchesCategory = !filters?.category || scheme.category === filters.category;
    const matchesSearch =
      !search ||
      [scheme.title, scheme.description, scheme.category, scheme.benefits, scheme.amount]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(search));

    return matchesCategory && matchesSearch;
  });
};

const getPagedSchemes = (filters?: SchemeFilters) => {
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const filtered = getFilteredSchemes(filters);
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return {
    items,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  };
};

const buildCategories = (): SchemeCategory[] => {
  const counts = MOCK_SCHEMES.reduce<Record<string, number>>((acc, scheme) => {
    acc[scheme.category] = (acc[scheme.category] || 0) + 1;
    return acc;
  }, {});

  return CATEGORY_ORDER.filter((name) => counts[name]).map((name, index) => ({
    id: String(index + 1),
    name,
    count: counts[name],
  }));
};

const MOCK_CATEGORIES = buildCategories();

export const schemeService = {
  getSchemes: async (filters?: SchemeFilters): Promise<PaginatedResponse<Scheme>> => {
    console.log('🔎 Fetching schemes list with filters:', filters);
    console.log('🌐 API URL:', `${BASE_URL}/schemes`);
    try {
      const response = await apiClient.get('/schemes', { params: filters });
      console.log('✅ Schemes list response:', response.data);
      const rawData = response.data;
      if (rawData.schemes) {
        const items: Scheme[] = rawData.schemes.map((s: any) => ({
          id: s.id,
          title: s.name || s.title || s.englishName,
          name: s.name || s.title || s.englishName,
          englishName: s.englishName || '',
          description: s.shortDescription || s.description || s.overview,
          overview: s.overview || s.shortDescription || s.description,
          category: s.department || s.category || 'General',
          department: s.department || s.category || '',
          type: s.type || (s.name?.includes('केंद्र') ? 'Central' : 'State'),
          amount: s.amount || 'शासकीय अनुदान उपलब्ध',
          eligibility_criteria: Array.isArray(s.eligibility) ? s.eligibility.join('; ') : s.eligibility_criteria,
          benefits: Array.isArray(s.benefits) ? s.benefits.join('; ') : s.benefits,
          application_url: s.sourceUrl || 'https://mahadbt2.maharashtra.gov.in/farmer',
          ...s,
        }));
        return {
          success: true,
          data: {
            items,
            total: rawData.count || items.length,
            page: 1,
            limit: items.length,
            totalPages: 1,
          },
        };
      }
      return rawData;
    } catch (error: any) {
      console.error('❌ Schemes list API failed:', error);
      console.error('❌ Status:', error?.response?.status);
      console.error('❌ Response:', error?.response?.data);
      const paged = getPagedSchemes(filters);

      return {
        success: true,
        data: {
          items: paged.items,
          total: paged.total,
          page: paged.page,
          limit: paged.limit,
          totalPages: paged.totalPages,
        },
      };
    }
  },

  getSchemeById: async (id: string): Promise<ApiResponse<Scheme>> => {
    const encodedId = encodeURIComponent(id);
    const endpoint = `/schemes/${encodedId}`;
    console.log("=================================");
    console.log("SCHEME API REQUEST");
    console.log("BASE URL:", BASE_URL);
    console.log("SCHEME ID:", id);
    console.log("FULL URL:", `${BASE_URL}${endpoint}`);
    console.log("=================================");

    try {
      const response = await apiClient.get(endpoint);
      console.log("SCHEME RAW RESPONSE:", response.data);

      const rawData = response.data;
      const s = rawData.scheme || rawData.data || rawData;
      if (s && typeof s === 'object' && (s.id || s.name || s.title || s.englishName)) {
        const normalized: Scheme = {
          ...s,
          id: s.id || id,
          title: s.name || s.title || s.englishName || 'Scheme Details',
          name: s.name || s.title || s.englishName || '',
          englishName: s.englishName || '',
          department: s.department || s.category || 'कृषी विभाग',
          overview: s.overview || s.shortDescription || s.description || '',
          benefit: s.benefit || s.benefits || '',
          eligibility: s.eligibility || [],
          requiredDocuments: s.requiredDocuments || s.documents || [],
          benefits: s.benefit || s.benefits || [],
          documents: s.requiredDocuments || s.documents || [],
        };
        console.log("SCHEME NORMALIZED RESULT:", normalized);
        return { success: true, data: normalized };
      }
      throw new Error('Invalid scheme payload returned by API.');
    } catch (error: any) {
      console.error("SCHEME API ERROR:", error);
      console.error("STATUS:", error?.response?.status);
      console.error("DATA:", error?.response?.data);
      console.error("URL:", error?.config?.url);
      throw error;
    }
  },

  getCategories: async (): Promise<SchemeCategory[]> => {
    try {
      const response = await apiClient.get('/schemes/categories');
      return response.data;
    } catch {
      return MOCK_CATEGORIES;
    }
  },

  searchSchemes: async (query: string): Promise<ApiResponse<Scheme[]>> => {
    try {
      const response = await apiClient.get('/schemes/search', {
        params: { q: query },
      });
      return response.data;
    } catch {
      const normalizedQuery = query.toLowerCase();
      const filtered = MOCK_SCHEMES.filter(
        (s) =>
          s.title.toLowerCase().includes(normalizedQuery) ||
          s.description.toLowerCase().includes(normalizedQuery) ||
          s.category.toLowerCase().includes(normalizedQuery)
      );
      return { success: true, data: filtered };
    }
  },

  getSchemeFaqs: async (id: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await apiClient.get(`/schemes/${encodeURIComponent(id)}/faqs`);
      return response.data;
    } catch {
      return { success: true, data: [] };
    }
  },

  getSchemeDocuments: async (id: string): Promise<ApiResponse<string[]>> => {
    try {
      const response = await apiClient.get(`/schemes/${encodeURIComponent(id)}/documents`);
      return response.data;
    } catch {
      return { success: true, data: [] };
    }
  },

  getSchemeGR: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(`/schemes/${encodeURIComponent(id)}/gr`);
      return response.data;
    } catch {
      return { success: true, data: null };
    }
  },

  getSchemeContact: async (id: string): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.get(`/schemes/${encodeURIComponent(id)}/contact`);
      return response.data;
    } catch {
      return { success: true, data: null };
    }
  },
};
