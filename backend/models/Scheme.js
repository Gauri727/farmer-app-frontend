/**
 * Scheme Data Model — Krishi Mitra Backend
 * Database abstraction layer with Superadmin readiness.
 */

const schemeSources = require('../data/schemeSources');

// In-memory persistent data store (ready to swap with MongoDB / PostgreSQL)
let schemesStore = [...schemeSources];

const SCHEME_ALIASES = {
  "bhausaheb-fundkar-falbag-lagvad-yojana": "bhausaheb-fundkar-falbag-lagvad-yojana",
  "bhau-saheb-fundkar-fruit-orchard": "bhausaheb-fundkar-falbag-lagvad-yojana",
  "bhausaheb-fundkar-falbag-lagvad": "bhausaheb-fundkar-falbag-lagvad-yojana",
  "bhausaheb-fundkar-phalbaag-lagvad-yojana": "bhausaheb-fundkar-falbag-lagvad-yojana",
  "birsa-munda-krishi-kranti-outside-tribal-sub-plan": "birsa-munda-krishi-kranti-outside-tribal-sub-plan",
  "birsa-munda-krishi-kranti-tribal-sub-plan": "birsa-munda-krishi-kranti-tribal-sub-plan",
  "birsa-munda-krishi-kranti-yojana": "birsa-munda-krishi-kranti-tribal-sub-plan",
  "chief-minister-agro-food-processing-scheme": "chief-minister-agro-food-processing-scheme",
  "mukhyamantri-agro-and-food-processing": "chief-minister-agro-food-processing-scheme",
  "chief-minister-sustainable-agriculture-irrigation-scheme": "chief-minister-sustainable-agriculture-irrigation-scheme",
  "mukhyamantri-shashwat-krishi-sinchan": "chief-minister-sustainable-agriculture-irrigation-scheme",
  "dr-babasaheb-ambedkar-krushi-swavalamban-yojana": "dr-babasaheb-ambedkar-krushi-swavalamban-yojana",
  "dr-babasaheb-ambedkar-krishi-swavalamban": "dr-babasaheb-ambedkar-krushi-swavalamban-yojana",
  "dr-shyamprasad-mukherjee-jan-van-vikas-scheme": "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "shyamaprasad-mukherjee-jan-van-vikas": "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "gopinath-munde-shetkari-apghat-suraksha-yojana": "gopinath-munde-shetkari-apghat-suraksha-yojana",
  "gopinath-munde-farmer-accident": "gopinath-munde-shetkari-apghat-suraksha-yojana",
  "kaju-kalma-vatap-scheme": "kaju-kalma-vatap-scheme",
  "kaju-kalam-vatap-yojana": "kaju-kalma-vatap-scheme",
  "mission-for-integrated-development-of-horticulture": "mission-for-integrated-development-of-horticulture",
  "midh-css": "mission-for-integrated-development-of-horticulture",
  "ekatmik-falotpadan-vikas": "mission-for-integrated-development-of-horticulture",
  "nfsm-cotton-css": "nfsm-cotton-css",
  "nfsm-food-grains-css": "nfsm-food-grains-css",
  "national-food-security-mission": "nfsm-food-grains-css",
  "nfsm-oilseed-oilpalm-css": "nfsm-oilseed-oilpalm-css",
  "nfsm-sugarcane-css": "nfsm-sugarcane-css",
  "pmksy-per-drop-more-crop-css": "pmksy-per-drop-more-crop-css",
  "pmksy-micro-irrigation": "pmksy-per-drop-more-crop-css",
  "pmrkvy-rainfed-area-development": "pmrkvy-rainfed-area-development",
  "rad-dryland-development": "pmrkvy-rainfed-area-development",
  "rashtriya-krushi-vikas-yojana-raftaar": "rashtriya-krushi-vikas-yojana-raftaar",
  "rkvy-sugarcane-harvester-subsidy": "rkvy-sugarcane-harvester-subsidy",
  "state-sponsored-agriculture-mechanization": "state-sponsored-agriculture-mechanization",
  "rajya-krishi-yantrikikaran": "state-sponsored-agriculture-mechanization",
  "sub-mission-on-agricultural-mechanization-css": "sub-mission-on-agricultural-mechanization-css",
  "smam-css": "sub-mission-on-agricultural-mechanization-css"
};

class SchemeModel {
  static async getAll(searchQuery) {
    if (!searchQuery) {
      return schemesStore;
    }
    const q = searchQuery.toLowerCase().trim();
    return schemesStore.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.englishName.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q) ||
      s.shortDescription.toLowerCase().includes(q)
    );
  }

  static async getById(id) {
    if (!id) return null;
    const normId = String(id).toLowerCase().trim();
    const resolvedId = SCHEME_ALIASES[normId] || normId;
    return schemesStore.find(s => s.id === resolvedId || s.id === normId) || null;
  }

  static async getFaqs(id) {
    const scheme = await this.getById(id);
    return scheme ? scheme.faqs || [] : null;
  }

  static async getDocuments(id) {
    const scheme = await this.getById(id);
    return scheme ? (scheme.requiredDocuments || scheme.documents || []) : null;
  }

  static async getGR(id) {
    const scheme = await this.getById(id);
    return scheme ? scheme.gr || null : null;
  }

  static async getContact(id) {
    const scheme = await this.getById(id);
    return scheme ? scheme.contact || null : null;
  }

  // Superadmin CRUD readiness
  static async create(schemeData) {
    schemesStore.push(schemeData);
    return schemeData;
  }

  static async update(id, updatedFields) {
    const idx = schemesStore.findIndex(s => s.id === id);
    if (idx === -1) return null;
    schemesStore[idx] = { ...schemesStore[idx], ...updatedFields, lastUpdated: new Date().toISOString().split('T')[0] };
    return schemesStore[idx];
  }

  static async delete(id) {
    const idx = schemesStore.findIndex(s => s.id === id);
    if (idx === -1) return false;
    schemesStore.splice(idx, 1);
    return true;
  }
}

module.exports = SchemeModel;
