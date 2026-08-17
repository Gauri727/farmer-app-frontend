const schemes = require('../data/schemeSources.js');

console.log("TOTAL SCHEMES IN DATASET:", schemes.length);
console.log("==========================================");

schemes.forEach((s, idx) => {
  console.log(`\nSCHEME #${idx + 1}: ${s.name} (${s.id})`);
  console.log(`- Overview Type: ${typeof s.overview} | IsArray: ${Array.isArray(s.overview)} | Length: ${Array.isArray(s.overview) ? s.overview.length : s.overview.length}`);
  console.log(`- Benefit Type: ${typeof s.benefit} | IsArray: ${Array.isArray(s.benefit)} | Count: ${Array.isArray(s.benefit) ? s.benefit.length : 1}`);
  console.log(`- Eligibility Count: ${Array.isArray(s.eligibility) ? s.eligibility.length : 0}`);
  console.log(`- Required Documents Count: ${Array.isArray(s.requiredDocuments) ? s.requiredDocuments.length : 0}`);
});
