const db = require('./database');
const fs = require('fs');
const path = require('path');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

// better-sqlite3 no ejecuta múltiples statements con .exec directo,
// así que separamos por ";" y ejecutamos uno por uno
const statements = schema
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0);

for (const statement of statements) {
  db.prepare(statement).run();
}

console.log('✅ BS INICIALIZADA');