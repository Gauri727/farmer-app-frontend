const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/constants/schemeTranslations.json');
const translations = JSON.parse(fs.readFileSync(file, 'utf8'));

const extraOverrides = {
  "national-food-security-mission": {
    description: "Subsidy for seeds, integrated nutrient management, pest control, farm ponds, pumps, and implements for rice, wheat, pulses, sugarcane, and cotton.",
    amount: "50% Subsidy on Certified Seeds, Nutrient Management, Pumps, and Implements",
    overview: [
      "The National Food Security Mission (NFSM) has been implemented in Maharashtra since 2007-08 to enhance the productivity of food grains (rice, wheat, pulses, coarse cereals), sugarcane, and cotton.",
      "The scheme provides financial assistance for seed distribution, Integrated Nutrient Management (INM), Integrated Pest Management (IPM), farm ponds, water pumps, pipes, and agricultural machinery."
    ],
    benefits: [
      "1) Distribution of certified high-yielding seeds at 50% subsidy.",
      "2) Assistance for micro-nutrients, bio-pesticides, and weedicides.",
      "3) Grants for individual farm ponds, water pumps, and PVC pipes.",
      "4) Financial assistance for farm implements and crop demonstrations."
    ],
    eligibility: [
      "Farmers residing in notified districts selected for specific crops (Rice, Wheat, Pulses, Coarse Cereals, Cotton, Sugarcane).",
      "Must possess valid 7/12 land extract and 8-A record with target crop entries.",
      "Caste Certificate required for SC/ST category applicants."
    ],
    documents: [
      "7/12 Land Extract and 8-A Record",
      "Quotation / Bill for Farm Implements, Pumps, or Pipes",
      "Test Certificate for Water Pump Component",
      "Caste Certificate (if applicable)",
      "Prior Approval Letter"
    ],
    howToApply: [
      "Register online on MahaDBT Farmer Portal under 'National Food Security Mission'.",
      "Select crop component (Seeds / Demonstration / Implements) and submit application.",
      "Upon receiving pre-sanction letter, purchase items from registered suppliers and upload bills."
    ]
  }
};

Object.keys(extraOverrides).forEach((schemeId) => {
  if (!translations[schemeId]) translations[schemeId] = {};
  const t = translations[schemeId];
  const overrides = extraOverrides[schemeId];

  Object.keys(overrides).forEach((field) => {
    if (!t[field]) t[field] = {};
    t[field]['en'] = overrides[field];
  });
});

fs.writeFileSync(file, JSON.stringify(translations, null, 2), 'utf8');
console.log("✅ Successfully applied extra overrides for national-food-security-mission!");
