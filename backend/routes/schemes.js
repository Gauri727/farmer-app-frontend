/**
 * Scheme Router — Krishi Mitra Backend
 * REST API Routes for /api/schemes
 */

const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');

// GET /api/schemes — List all 20 schemes (with optional ?search= query)
router.get('/', schemeController.getSchemes);

// GET /api/schemes/:id — Complete details of a specific scheme
router.get('/:id', schemeController.getSchemeById);

// GET /api/schemes/:id/faqs — FAQs for a specific scheme
router.get('/:id/faqs', schemeController.getFaqs);

// GET /api/schemes/:id/documents — Required documents for a specific scheme
router.get('/:id/documents', schemeController.getDocuments);

// GET /api/schemes/:id/gr — Government Resolution for a specific scheme
router.get('/:id/gr', schemeController.getGR);

// GET /api/schemes/:id/contact — Contact information for a specific scheme
router.get('/:id/contact', schemeController.getContact);

module.exports = router;
