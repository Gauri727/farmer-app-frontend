const http = require('http');

const schemeIds = [
  "pmksy-per-drop-more-crop-css",
  "sub-mission-on-agricultural-mechanization-css",
  "national-food-security-mission",
  "birsa-munda-krishi-kranti-yojana",
  "dr-babasaheb-ambedkar-krushi-swavalamban-yojana",
  "mission-for-integrated-development-of-horticulture",
  "bhausaheb-fundkar-falbag-lagvad-yojana",
  "state-sponsored-agriculture-mechanization",
  "dr-shyamprasad-mukherjee-jan-van-vikas-scheme",
  "pmrkvy-rainfed-area-development",
  "gopinath-munde-shetkari-apghat-suraksha-yojana"
];

let completed = 0;

schemeIds.forEach(id => {
  http.get(`http://localhost:8000/api/schemes/${id}`, (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      completed++;
      try {
        const data = JSON.parse(raw);
        const s = data.scheme || data;
        console.log(`\n========================================`);
        console.log(`[${completed}/11] ID: ${id}`);
        console.log(`Name: ${s.name}`);
        console.log(`Overview lines: ${Array.isArray(s.overview) ? s.overview.length : typeof s.overview}`);
        console.log(`Eligibility items: ${Array.isArray(s.eligibility) ? s.eligibility.length : typeof s.eligibility}`);
        console.log(`Benefits items: ${Array.isArray(s.benefit || s.benefits) ? (s.benefit || s.benefits).length : typeof (s.benefit || s.benefits)}`);
        console.log(`Documents items: ${Array.isArray(s.requiredDocuments || s.documents) ? (s.requiredDocuments || s.documents).length : typeof (s.requiredDocuments || s.documents)}`);
      } catch (e) {
        console.error(`Failed parsing ${id}:`, e);
      }
    });
  }).on('error', err => {
    console.error(`Fetch error ${id}:`, err.message);
  });
});
