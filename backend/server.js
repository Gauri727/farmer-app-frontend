/**
 * Krishi Mitra Backend Server — Phase 1 Government Schemes Module
 * Powered by Express & Node.js
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const schemeRoutes = require('./routes/schemes');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for Expo / React Native frontend requests
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Krishi Mitra API is running"
  });
});

// Register Scheme REST API Routes
app.use('/api/schemes', schemeRoutes);

// Catch-all 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  🌾 Krishi Mitra API Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  Schemes List: http://localhost:${PORT}/api/schemes`);
  console.log(`==================================================`);
});
