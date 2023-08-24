const fs = require('fs');
const path = require('path');

const targetDir = './src/environments';
const targetPath = path.join(targetDir, 'environment.ts');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const envConfigFile = `export const environment = {
    production: ${process.env['PRODUCTION']},
    firebase: {
        projectId: '${process.env['FIREBASE_PROJECT_ID']}',
        appId: '${process.env['FIREBASE_APP_ID']}',
        storageBucket: '${process.env['FIREBASE_STORAGE_BUCKET']}',
        apiKey: '${process.env['FIREBASE_API_KEY']}',
        authDomain: '${process.env['FIREBASE_AUTH_DOMAIN']}',
        messagingSenderId: '${process.env['FIREBASE_MESSAGING_SENDER_ID']}',
    },
};`;
fs.writeFileSync(targetPath, envConfigFile, 'utf8');
console.log('Wrote variables to environment.ts');

const targetDir2 = './dist';
const targetPath2 = path.join(targetDir, '_redirects');

if (!fs.existsSync(targetDir2)) {
    fs.mkdirSync(targetDir2, { recursive: true });
}

const envConfigFile2 = `/*    /index.html   200`;

fs.writeFileSync(targetPath2, envConfigFile2, 'utf8');
console.log('Wrote variables to _redirects');
