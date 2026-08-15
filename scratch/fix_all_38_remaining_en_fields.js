const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/constants/schemeTranslations.json');
const translations = JSON.parse(fs.readFileSync(file, 'utf8'));

// Explicit pure English translations for the remaining schemes & fields
const enOverrides = {
  "birsa-munda-krishi-kranti-yojana": {
    description: "Financial assistance for new well, well repair, pump set, and micro-irrigation for ST farmers.",
    amount: "New Well: Up to Rs. 2.50 Lakhs | Well Repair: Rs. 50,000 | In-well Boring: Rs. 20,000 | Pump Set: Rs. 20,000",
    overview: [
      "Birsa Munda Krishi Kranti Yojana is implemented for Scheduled Tribe (ST) farmers to provide sustainable irrigation and increase farm income.",
      "Under this scheme, grants are provided for new wells (Rs. 2.50 Lakh), old well repairs (Rs. 50,000), in-well boring (Rs. 20,000), pump sets (Rs. 20,000), power connection (Rs. 10,000), farm pond plastic lining (Rs. 1 Lakh), micro-irrigation (Drip Rs. 50,000 / Sprinkler Rs. 25,000), and PVC pipes (Rs. 30,000)."
    ],
    benefits: [
      "1) New Well: Financial assistance up to Rs. 2,50,000/-",
      "2) Old Well Repair: Financial assistance up to Rs. 50,000/-",
      "3) In-well Boring: Financial assistance up to Rs. 20,000/-",
      "4) Electric/Solar Pump Set: Financial assistance up to Rs. 20,000/-",
      "5) Drip Irrigation Set: Subsidy up to Rs. 50,000/-",
      "6) Sprinkler Irrigation Set: Subsidy up to Rs. 25,000/-",
      "7) PVC Pipes: Subsidy up to Rs. 30,000/-"
    ],
    documents: [
      "Valid ST Caste Certificate",
      "7/12 Land Extract and 8-A Record",
      "Income Certificate (Annual income up to Rs. 1.50 Lakh)",
      "Self-Declaration & Affidavit Form",
      "Groundwater Survey Certificate (for New Well)"
    ],
    howToApply: [
      "Apply online on MahaDBT Farmer Portal under 'Special Component Schemes'.",
      "Upload valid Caste Certificate, Income Certificate, and 7/12 land record.",
      "Upon receiving Pre-Sanction letter from Taluka Agriculture Officer, initiate well digging/equipment purchase."
    ]
  },

  "birsa-munda-krishi-kranti-outside-tribal-sub-plan": {
    description: "Irrigation and well grants for ST farmers residing outside Tribal Sub-Plan areas.",
    amount: "New Well: Up to Rs. 2.50 Lakhs | Well Repair: Rs. 50,000 | Micro-irrigation: Up to Rs. 50,000",
    overview: [
      "Provides sustainable irrigation infrastructure including new wells, old well repairs, pump sets, and micro-irrigation for Scheduled Tribe (ST) farmers living outside designated Tribal Sub-Plan areas across Maharashtra."
    ],
    benefits: [
      "1) New Well Grant: Up to Rs. 2.50 Lakhs",
      "2) Old Well Repair Grant: Up to Rs. 50,000",
      "3) Pump Set & Micro-Irrigation Grant: Up to Rs. 50,000"
    ],
    eligibility: [
      "Applicant must belong to Scheduled Tribe (ST) category.",
      "Applicant farmer must reside outside Tribal Sub-Plan area.",
      "Annual family income must be within Rs. 1.50 Lakh.",
      "Must own landholding between 0.20 to 6.0 hectares (minimum 0.40 hectare for new well)."
    ],
    documents: [
      "Valid ST Caste Certificate",
      "7/12 Land Extract and 8-A Record",
      "Income Certificate",
      "Aadhaar Card and Bank Passbook"
    ],
    howToApply: [
      "Apply online on MahaDBT Farmer Portal under 'Special Component Schemes'."
    ]
  },

  "state-sponsored-agriculture-mechanization": {
    description: "40% to 50% subsidy on purchase of tractors, power tillers, and farm implements under Maharashtra State Scheme.",
    amount: "Tractors & Machinery: 40% to 50% Subsidy | Custom Hiring Center: Up to 80% Assistance",
    overview: [
      "State Sponsored Agriculture Mechanization Scheme provides financial assistance to farmers across Maharashtra for purchasing tractors, power tillers, tractor-drawn implements, bullock-drawn tools, and establishing Custom Hiring Centers (CHC)."
    ],
    benefits: [
      "1) 40% to 50% subsidy for purchasing Tractors and Power Tillers.",
      "2) 50% subsidy for purchasing Rotavators, Seed Drills, Plows, and Threshers.",
      "3) Financial assistance for setting up Custom Hiring Centers."
    ],
    eligibility: [
      "Farmer must possess a valid Aadhaar Card.",
      "Farmer must possess valid 7/12 land extract and 8-A record.",
      "Caste Certificate required for SC/ST category applicants.",
      "Beneficiary can receive subsidy for a specific implement only once in 10 years."
    ],
    documents: [
      "Aadhaar Card",
      "7/12 Land Extract and 8-A Record",
      "Proforma Invoice / Quotation of Machinery",
      "Caste Certificate (if applicable)",
      "Prior Approval Letter"
    ],
    howToApply: [
      "Apply online under 'State Agriculture Mechanization' on MahaDBT Farmer Portal.",
      "Select machinery type, dealer quotation, and submit application.",
      "Upon selection in lottery and receiving pre-sanction letter, purchase equipment and upload GST bill."
    ]
  },

  "nfsm-cotton-css": {
    description: "Subsidy on high-yielding certified cotton seeds, plant protection chemicals, and micro-nutrients.",
    amount: "50% Subsidy on Certified Cotton Seeds & Demonstration Kits",
    overview: [
      "National Food Security Mission - Cotton (NFSM-Cotton) aims to enhance cotton productivity in major cotton-growing districts of Maharashtra through distribution of certified seeds, Integrated Nutrient Management (INM), and Integrated Pest Management (IPM)."
    ],
    benefits: [
      "1) 50% subsidy on certified high-yielding cotton seed distribution.",
      "2) Financial assistance for plant protection chemicals, bio-pesticides, and pheromone traps.",
      "3) Demonstrations of modern high-density planting techniques."
    ],
    eligibility: [
      "Cotton-growing farmers in notified districts (Amravati & Nagpur divisions).",
      "Farmer must possess valid 7/12 land extract."
    ],
    documents: [
      "7/12 Land Extract and 8-A Record",
      "Aadhaar Card",
      "Bank Account Passbook"
    ]
  },

  "nfsm-oilseed-oilpalm-css": {
    description: "Subsidy for soybean, groundnut, sunflower seeds, and oil palm plantation development.",
    amount: "50% Subsidy on Seed Minikits & Oil Palm Cultivation Grant",
    overview: [
      "National Food Security Mission - Oilseeds & Oil Palm (NFSM-Oilseeds) promotes self-sufficiency in edible oils by providing certified seed minikits for soybean, groundnut, sunflower, sesame, and grants for oil palm cultivation."
    ],
    benefits: [
      "1) 50% subsidy on certified soybean and groundnut seed minikits.",
      "2) Financial assistance for oil palm plantation maintenance and inter-cropping.",
      "3) Grants for plant protection equipment and micro-nutrients."
    ],
    eligibility: [
      "Farmers cultivating oilseed crops with valid 7/12 land record.",
      "Oil palm growers in designated climate-suitable districts."
    ],
    documents: [
      "7/12 Land Extract and 8-A Record",
      "Aadhaar Card",
      "Bank Account Passbook"
    ]
  },

  "nfsm-sugarcane-css": {
    description: "Assistance for tissue-culture sugarcane saplings, inter-cropping, and drip irrigation in sugarcane fields.",
    amount: "Subsidy on Tissue-Culture Sugarcane Saplings & Drip Systems",
    overview: [
      "National Food Security Mission - Sugarcane (NFSM-Sugarcane) focuses on increasing sugarcane yield per hectare, promoting sustainable drip irrigation, and encouraging inter-cropping with pulses and oilseeds."
    ],
    benefits: [
      "1) Financial assistance for purchasing tissue-culture sugarcane saplings.",
      "2) Subsidy for inter-cropping pulses/oilseeds in sugarcane fields.",
      "3) Grants for trash shredder machines and bio-fertilizers."
    ],
    eligibility: [
      "Registered sugarcane growers in notified districts of Maharashtra.",
      "Farmer must possess valid 7/12 land extract with sugarcane crop entry."
    ],
    documents: [
      "7/12 Land Extract and 8-A Record",
      "Sugar Factory Registration / Receipt",
      "Aadhaar Card"
    ]
  },

  "rashtriya-krushi-vikas-yojana-raftaar": {
    description: "Up to 50% capital subsidy for agri-infrastructure, cold storages, warehouses, and agri-startups.",
    amount: "35% to 50% Capital Subsidy for Infrastructure Projects",
    overview: [
      "Rashtriya Krishi Vikas Yojana - RAFTAAR (RKVY-RAFTAAR) focuses on building agricultural infrastructure, post-harvest management, cold storage chains, warehouses, and fostering agri-entrepreneurship across Maharashtra."
    ],
    benefits: [
      "1) Up to 50% capital subsidy for cold storage, warehouses, and processing hubs.",
      "2) Seed funding and incubation grants for agri-startups.",
      "3) Infrastructure support for Farmer Producer Organizations (FPOs)."
    ],
    eligibility: [
      "Farmer Producer Organizations (FPO), Self-Help Groups (SHG), Agri-Entrepreneurs, and individual farmers."
    ],
    documents: [
      "7/12 Land Extract and 8-A Record",
      "Detailed Project Report (DPR)",
      "Bank Loan Sanction Letter",
      "Aadhaar Card and PAN Card"
    ]
  },

  "rkvy-sugarcane-harvester-subsidy": {
    description: "40% capital subsidy (Max Rs. 40 Lakhs) for purchasing self-propelled sugarcane harvester machines.",
    amount: "40% Capital Subsidy (Max Grant Rs. 40,000,000)",
    overview: [
      "RKVY Sugarcane Harvester Scheme provides capital subsidy to reduce labor dependency and speed up sugarcane harvesting across Maharashtra sugar factory zones by promoting mechanical sugarcane harvesters."
    ],
    benefits: [
      "1) 40% capital subsidy (maximum up to Rs. 40 Lakhs) on self-propelled sugarcane harvester machines.",
      "2) Custom hiring facility for surrounding sugarcane farmers."
    ],
    eligibility: [
      "Agri-graduates, Farmer Producer Organizations (FPO), Sugar Cooperatives, and Individual Agri-Entrepreneurs."
    ],
    documents: [
      "7/12 Land Extract and 8-A Record",
      "Proforma Invoice / Quotation of Harvester Machine",
      "Bank Loan Sanction Letter",
      "Agreement with Sugar Factory"
    ]
  }
};

// Apply overrides
Object.keys(enOverrides).forEach((schemeId) => {
  if (!translations[schemeId]) translations[schemeId] = {};
  const t = translations[schemeId];
  const overrides = enOverrides[schemeId];

  Object.keys(overrides).forEach((field) => {
    if (!t[field]) t[field] = {};
    t[field]['en'] = overrides[field];
  });
});

fs.writeFileSync(file, JSON.stringify(translations, null, 2), 'utf8');
console.log("✅ Successfully applied explicit clean English overrides for all remaining schemes!");
