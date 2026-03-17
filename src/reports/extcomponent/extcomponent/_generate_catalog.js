/**
 * _generate_catalog.js
 *
 * 서브폴더에서 .manifest 파일들을 읽어 _catalog.json을 생성합니다.
 * manifest의 icon/sample이 string[]인 경우 단일 string으로 join합니다.
 *
 * Usage: node _generate_catalog.js [sourceDir] [outputPath]
 *   sourceDir  — 컴포넌트 서브폴더가 있는 루트 폴더 (기본: 현재 디렉토리)
 *   outputPath — 출력 파일 경로 (기본: sourceDir/_catalog.json)
 */
var fs = require('fs');
var path = require('path');

var sourceDir = process.argv[2] || __dirname;
var outputPath = process.argv[3] || path.join(sourceDir, '_catalog.json');

var components = [];

// 서브폴더 순회하여 .manifest 파일 검색
var entries = fs.readdirSync(sourceDir);
for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var entryPath = path.join(sourceDir, entry);
    var stat = fs.statSync(entryPath);
    if (!stat.isDirectory()) continue;

    // 폴더 내 .manifest 파일 찾기
    var subFiles = fs.readdirSync(entryPath);
    for (var j = 0; j < subFiles.length; j++) {
        var file = subFiles[j];
        if (!file.endsWith('.manifest') || file.includes('.sample.')) continue;

        var filePath = path.join(entryPath, file);
        try {
            var content = fs.readFileSync(filePath, 'utf8');
            var manifest = JSON.parse(content);

            // id: 파일명에서 .manifest 제거
            var id = file.replace('.manifest', '');

            // icon: string[] → string (join with '')
            var icon = manifest.icon;
            if (Array.isArray(icon)) {
                icon = icon.join('');
            }

            components.push({
                id: id,
                name: manifest.name || id,
                category: manifest.category || 'ETC',
                icon: icon || ''
            });

            console.log('  [OK] ' + entry + '/' + file + ' -> ' + manifest.name);
        } catch (e) {
            console.error('  [ERROR] ' + entry + '/' + file + ': ' + e.message);
        }
    }
}

// 이름순 정렬
components.sort(function(a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });

// _catalog.json 출력
var catalog = {
    components: components
};

fs.writeFileSync(outputPath, JSON.stringify(catalog, null, 4), 'utf8');
console.log('\n_catalog.json generated: ' + components.length + ' components');
console.log('  -> ' + outputPath);
