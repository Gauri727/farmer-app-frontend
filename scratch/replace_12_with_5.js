const fs = require('fs');
const path = require('path');

// 1. Update i18n.ts
const i18nPath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
let i18n = fs.readFileSync(i18nPath, 'utf8');

// Replace 12 with 5 in language counts
i18n = i18n
  .replace(/१२ भाषा/g, '५ भाषा')
  .replace(/१२ भासो/g, '५ भासो')
  .replace(/12 भाषाएं/g, '5 भाषाएं')
  .replace(/12 Languages/g, '5 Languages')
  .replace(/12 regional languages/g, '5 regional languages')
  .replace(/१२ प्रादेशिक भाषांमध्ये/g, '५ प्रादेशिक भाषांमध्ये')
  .replace(/12 क्षेत्रीय भाषाओं में/g, '5 क्षेत्रीय भाषाओं में')
  .replace(/१२ भाषांमध्ये/g, '५ भाषांमध्ये')
  .replace(/१२ भाषांनी/g, '५ भासांनी');

fs.writeFileSync(i18nPath, i18n, 'utf8');
console.log('✅ Updated src/utils/i18n.ts (replaced 12 languages with 5 languages)');

// 2. Update HomeScreen.tsx
const homePath = path.join(__dirname, '..', 'src', 'screens', 'home', 'HomeScreen.tsx');
let home = fs.readFileSync(homePath, 'utf8');

home = home
  .replace(/१२ भाषा/g, '५ भाषा')
  .replace(/12 Languages/g, '5 Languages')
  .replace(/१२ प्रादेशिक भाषांमध्ये/g, '५ प्रादेशिक भाषांमध्ये')
  .replace(/12 regional languages/g, '5 regional languages');

fs.writeFileSync(homePath, home, 'utf8');
console.log('✅ Updated src/screens/home/HomeScreen.tsx (replaced 12 languages with 5 languages)');

// 3. Update HelpScreen.tsx
const helpPath = path.join(__dirname, '..', 'src', 'screens', 'support', 'HelpScreen.tsx');
if (fs.existsSync(helpPath)) {
  let help = fs.readFileSync(helpPath, 'utf8');
  help = help.replace(/12 regional languages including Hindi, Marathi, Tamil, Telugu, and more/g, '5 regional languages: English, Marathi, Hindi, Ahirani, and Konkani');
  fs.writeFileSync(helpPath, help, 'utf8');
  console.log('✅ Updated HelpScreen.tsx');
}
