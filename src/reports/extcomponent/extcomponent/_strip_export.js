/**
 * 빌드된 .js 파일에서 TypeScript가 추가한 "export {};" 를 제거합니다.
 * import type 사용 시 module: "ESNext" 설정에서 자동 추가되는 코드입니다.
 *
 * Usage: node _strip_export.js <directory>
 */
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
if (!dir) {
    console.error('  Usage: node _strip_export.js <directory>');
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(function (f) { return f.endsWith('.js'); });
let count = 0;

for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dir, files[i]);
    const content = fs.readFileSync(filePath, 'utf8');
    // "export {};" 또는 "export {};\n" 제거 (파일 끝)
    const cleaned = content.replace(/\nexport \{\};\s*$/, '\n');
    if (cleaned !== content) {
        fs.writeFileSync(filePath, cleaned, 'utf8');
        console.log('  Stripped export {} from ' + files[i]);
        count++;
    }
}

console.log('  ' + count + ' file(s) cleaned.');
