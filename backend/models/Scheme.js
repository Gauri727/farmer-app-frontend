/**
 * Scheme Data Model — Krishi Mitra Backend
 * Database abstraction layer with Superadmin readiness.
 */

const schemeSources = require('../data/schemeSources');

// In-memory persistent data store (ready to swap with MongoDB / PostgreSQL)
let schemesStore = [...schemeSources];

const SCHEME_ALIASES = {
  "birsa-munda-krishi-kranti-tribal-sub-plan": "birsa-munda-krishi-kranti-yojana",
  "birsa-munda-krishi-kranti-outside-tribal-sub-plan": "birsa-munda-krishi-kranti-yojana",
  "bhau-saheb-fundkar-fruit-orchard": "bhausaheb-fundkar-falbag-lagvad-yojana",
  "bhausaheb-fundkar-falbag-lagvad": "bhausaheb-fundkar-falbag-lagvad-yojana",
  "pmksy-per-drop-more-crop": "pmksy-per-drop-more-crop-css",
  "pmksy-micro-irrigation": "pmksy-per-drop-more-crop-css",
  "krishi-yantrikikaran-sub-abhiyan": "sub-mission-on-agricultural-mechanization-css",
  "smam-css": "sub-mission-on-agricultural-mechanization-css",
  "nfsm-cotton-css": "national-food-security-mission",
  "nfsm-food-grains-css": "national-food-security-mission",
  "nfsm-oilseed-oilpalm-css": "national-food-security-mission",
  "nfsm-sugarcane-css": "national-food-security-mission",
  "dr-babasaheb-ambedkar-krishi-swavalamban": "dr-babasaheb-ambedkar-krushi-swavalamban-yojana",
  "ekatmik-falotpadan-vikas": "mission-for-integrated-development-of-horticulture",
  "midh-css": "mission-for-integrated-development-of-horticulture",
  "rajya-krishi-yantrikikaran": "state-sponsored-agriculture-mechanization",
  "shyamaprasad-mukherjee-jan-van-vikas": "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "dr-shyamaprasad-mukharji-jan-van-vikas-scheme": "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "rad-dryland-development": "pmrkvy-rainfed-area-development",
  "rainfed-area-development": "pmrkvy-rainfed-area-development",
  "gopinath-munde-farmer-accident": "gopinath-munde-shetkari-apghat-suraksha-yojana",
  "gopinath-munde-shetkari-apghat-suraksha-anudan-yojana": "gopinath-munde-shetkari-apghat-suraksha-yojana",
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
