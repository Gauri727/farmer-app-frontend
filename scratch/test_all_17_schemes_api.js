const http = require('http');

http.get('http://localhost:8000/api/schemes', (res) => {
  let raw = '';
  res.on('data', chunk => raw += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(raw);
      console.log('API Total Count:', data.count || data.schemes?.length);
      if (data.schemes) {
        data.schemes.forEach((s, i) => {
          console.log(`[${i + 1}] ID: ${s.id.padEnd(52)} Name: ${s.name}`);
        });
      }
    } catch (e) {
      console.error('Failed to parse API:', e);
    }
  });
}).on('error', err => {
  console.error('API request error:', err.message);
});
