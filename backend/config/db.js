
// config => db.js

const fs = require('fs');
const path = require('path');
require('dotenv').config();``

// Construct absolute path to certificate (go up one level from Config to Node)
const caPath = path.resolve(__dirname, '../certs/isrgrootx1.pem');

// DEBUG: Verify paths
console.log('Current directory:', __dirname);
console.log('Resolved CA path:', caPath);
console.log('File exists:', fs.existsSync(caPath));

// Verify file exists
if (!fs.existsSync(caPath)) {
  throw new Error(`CA certificate file not found at: ${caPath}\n` +
    `Please verify:\n` +
    `1. The certs folder exists in your project root (Node/certs)\n` +
    `2. The isrgrootx1.pem file is inside that folder\n` +
    `3. The path is correct (should be ../certs from Config folder)`);
}


const mysql = require('mysql2/promise');

const mySqlPool = mysql.createPool({
  host: "gateway01.us-west-2.prod.aws.tidbcloud.com",
  port: 4000,
  user: "2FJgVCdWpXR9aKE.root",
  password: "D4xOTiUIKAv4gXC4",
  database: "test",
  ssl: {
    ca: fs.readFileSync(caPath)
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

exports.mySqlPool = mySqlPool;
