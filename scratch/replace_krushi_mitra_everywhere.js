const fs = require('fs');
const path = require('path');

// 1. Update src/utils/i18n.ts
const i18nPath = path.join(__dirname, '..', 'src', 'utils', 'i18n.ts');
let i18n = fs.readFileSync(i18nPath, 'utf8');

// Replace all occurrences of Krishi Mitra, Krushi Mitra, Agri Mitra in strings with 'Farmer AI'
i18n = i18n
  .replace(/agriMitraTab:\s*['"`][^'"`]+['"`]/g, "agriMitraTab: 'Farmer AI'")
  .replace(/krishiMitra:\s*['"`][^'"`]+['"`]/g, "krishiMitra: 'Farmer AI'")
  .replace(/How can Krishi Mitra help you today\?/g, "How can Farmer AI help you today?")
  .replace(/Ask Krishi Mitra/g, "Ask Farmer AI")
  .replace(/Talk to Krishi Mitra/g, "Talk to Farmer AI")
  .replace(/Krishi Mitra is thinking\.\.\./g, "Farmer AI is thinking...")
  .replace(/आज कृषी मित्र तुम्हाला कशी मदत करू शकते\?/g, "आज Farmer AI तुम्हाला कशी मदत करू शकते?")
  .replace(/कृषी मित्राला विचारा/g, "Farmer AI ला विचारा")
  .replace(/कृषी मित्राशी बोला/g, "Farmer AI शी बोला")
  .replace(/कृषी मित्र विचार करत आहे\.\.\./g, "Farmer AI विचार करत आहे...")
  .replace(/कृषि मित्र/g, "Farmer AI")
  .replace(/कृषी मित्र/g, "Farmer AI")
  .replace(/Ask Agri Mitra About Disease/g, "Ask Farmer AI About Disease")
  .replace(/Consult Agri Mitra About Loan/g, "Consult Farmer AI About Loan")
  .replace(/Ask Agri Mitra/g, "Ask Farmer AI");

fs.writeFileSync(i18nPath, i18n, 'utf8');
console.log('✅ Updated src/utils/i18n.ts: replaced Krushi Mitra / Krishi Mitra / Agri Mitra with Farmer AI!');

// 2. Update src/screens/auth/SplashScreen.tsx
const splashPath = path.join(__dirname, '..', 'src', 'screens', 'auth', 'SplashScreen.tsx');
if (fs.existsSync(splashPath)) {
  let content = fs.readFileSync(splashPath, 'utf8');
  content = content.replace(/Krishi Mitra/g, 'Farmer AI');
  content = content.replace(/Krushi Mitra/g, 'Farmer AI');
  fs.writeFileSync(splashPath, content, 'utf8');
  console.log('✅ Updated SplashScreen.tsx');
}

// 3. Update src/screens/auth/LoginScreen.tsx
const loginPath = path.join(__dirname, '..', 'src', 'screens', 'auth', 'LoginScreen.tsx');
if (fs.existsSync(loginPath)) {
  let content = fs.readFileSync(loginPath, 'utf8');
  content = content.replace(/Krishi Mitra/g, 'Farmer AI');
  content = content.replace(/Krushi Mitra/g, 'Farmer AI');
  fs.writeFileSync(loginPath, content, 'utf8');
  console.log('✅ Updated LoginScreen.tsx');
}

// 4. Update src/screens/auth/OTPLoginScreen.tsx
const otpPath = path.join(__dirname, '..', 'src', 'screens', 'auth', 'OTPLoginScreen.tsx');
if (fs.existsSync(otpPath)) {
  let content = fs.readFileSync(otpPath, 'utf8');
  content = content.replace(/Krishi Mitra/g, 'Farmer AI');
  content = content.replace(/Krushi Mitra/g, 'Farmer AI');
  fs.writeFileSync(otpPath, content, 'utf8');
  console.log('✅ Updated OTPLoginScreen.tsx');
}

// 5. Update backend/server.js
const serverPath = path.join(__dirname, '..', 'backend', 'server.js');
if (fs.existsSync(serverPath)) {
  let content = fs.readFileSync(serverPath, 'utf8');
  content = content.replace(/Krishi Mitra/g, 'Farmer AI');
  content = content.replace(/Krushi Mitra/g, 'Farmer AI');
  fs.writeFileSync(serverPath, content, 'utf8');
  console.log('✅ Updated backend/server.js');
}

// 6. Update backend/package.json
const pkgPath = path.join(__dirname, '..', 'backend', 'package.json');
if (fs.existsSync(pkgPath)) {
  let content = fs.readFileSync(pkgPath, 'utf8');
  content = content.replace(/Krishi Mitra/g, 'Farmer AI');
  content = content.replace(/Krushi Mitra/g, 'Farmer AI');
  fs.writeFileSync(pkgPath, content, 'utf8');
  console.log('✅ Updated backend/package.json');
}
