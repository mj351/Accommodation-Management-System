const fs = require('fs');
const path = require('path');

// Load environment variables from server/.env before any tests run
const envPath = path.join(__dirname, '..', 'server', '.env');
const envFile = fs.readFileSync(envPath, 'utf8');

envFile.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...rest] = trimmed.split('=');
  if (key && rest.length) {
    process.env[key.trim()] = rest.join('=').trim();
  }
});
