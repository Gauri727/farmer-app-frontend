/**
 * Scheme Controller — Krishi Mitra Backend
 * REST API Handlers for Government Schemes Module (Phase 1)
 */

const SchemeModel = require('../models/Scheme');

const schemeController = {
  // GET /api/schemes
  getSchemes: async (req, res) => {
    try {
      const { search } = req.query;
      const allSchemes = await SchemeModel.getAll(search);

      const schemesSummary = allSchemes.map(s => ({
        id: s.id,
        name: s.name,
        englishName: s.englishName,
        department: s.department,
        shortDescription: s.shortDescription,
        sourceUrl: s.source ? s.source.url : 'https://mahadbt2.maharashtra.gov.in/farmer'
      }));

      return res.status(200).json({
        success: true,
        count: schemesSummary.length,
        schemes: schemesSummary
      });
    } catch (error) {
      console.error('[schemeController.getSchemes] Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Unable to retrieve schemes. Please try again later.'
      });
    }
  },

  // GET /api/schemes/:id
  getSchemeById: async (req, res) => {
    try {
      const { id } = req.params;
      const scheme = await SchemeModel.getById(id);

      if (!scheme) {
        return res.status(404).json({
          success: false,
          message: 'Scheme not found'
        });
      }

      return res.status(200).json({
        success: true,
        scheme: scheme
      });
    } catch (error) {
      console.error('[schemeController.getSchemeById] Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error retrieving scheme details.'
      });
    }
  },

  // GET /api/schemes/:id/faqs
  getFaqs: async (req, res) => {
    try {
      const { id } = req.params;
      const faqs = await SchemeModel.getFaqs(id);

      if (faqs === null) {
        return res.status(404).json({
          success: false,
          message: 'Scheme not found'
        });
      }

      return res.status(200).json({
        success: true,
        faqs
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error retrieving scheme FAQs.'
      });
    }
  },

  // GET /api/schemes/:id/documents
  getDocuments: async (req, res) => {
    try {
      const { id } = req.params;
      const documents = await SchemeModel.getDocuments(id);

      if (documents === null) {
        return res.status(404).json({
          success: false,
          message: 'Scheme not found'
        });
      }

      return res.status(200).json({
        success: true,
        documents
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error retrieving scheme documents.'
      });
    }
  },

  // GET /api/schemes/:id/gr
  getGR: async (req, res) => {
    try {
      const { id } = req.params;
      const gr = await SchemeModel.getGR(id);

      if (gr === null) {
        return res.status(404).json({
          success: false,
          message: 'Scheme not found'
        });
      }

      return res.status(200).json({
        success: true,
        gr
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error retrieving Government Resolution information.'
      });
    }
  },

  // GET /api/schemes/:id/contact
  getContact: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await SchemeModel.getContact(id);

      if (contact === null) {
        return res.status(404).json({
          success: false,
          message: 'Scheme not found'
        });
      }

      return res.status(200).json({
        success: true,
        contact
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error retrieving contact information.'
      });
    }
  }
};

module.exports = schemeController;
