import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";
import { Label } from "@AUD_CLIENT/control/Label";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    let lblTitle = Matrix.getObject("lblTitle") as Label;
    lblTitle.Value = "Markdown Viewer - Light / Dark / GitHub Theme";

    // ── 샘플 마크다운 ──
    const sampleMd = [
        '# Markdown Viewer',
        '',
        '## Features',
        '',
        '- **GFM** (GitHub Flavored Markdown) 지원',
        '- 3가지 테마: Light, Dark, GitHub',
        '- XSS 방지 (HTML Sanitize)',
        '- `marked.js` 기반 렌더링',
        '',
        '## 코드 블록',
        '',
        '```javascript',
        'function greet(name) {',
        '    return "Hello, " + name + "!";',
        '}',
        'console.log(greet("World"));',
        '```',
        '',
        '## 테이블',
        '',
        '| 기능 | 설명 | 상태 |',
        '|------|------|------|',
        '| Light Theme | 밝은 배경 기본 테마 | ✅ |',
        '| Dark Theme | 어두운 배경 테마 | ✅ |',
        '| GitHub Theme | GitHub 스타일 | ✅ |',
        '',
        '## 인용문',
        '',
        '> Markdown은 텍스트 기반의 마크업 언어로,',
        '> 쉽게 읽고 쓸 수 있으며 HTML로 변환이 가능합니다.',
        '',
        '## 체크리스트',
        '',
        '- [x] 마크다운 파싱',
        '- [x] 테마 지원',
        '- [x] 코드 하이라이팅',
        '- [ ] PDF 내보내기',
        '',
        '## 링크 & 이미지',
        '',
        '[i-AUD Platform](https://www.bimatrix.co.kr) 에서 제공하는 컴포넌트입니다.',
        '',
        '---',
        '',
        '*이 문서는 MarkdownComponent 샘플입니다.*'
    ].join('\n');

    // ── 3개 테마에 동일한 마크다운 설정 ──
    let ecLight = Matrix.getObject("ecLight") as ExternalComponent;
    let ecDark = Matrix.getObject("ecDark") as ExternalComponent;
    let ecGitHub = Matrix.getObject("ecGitHub") as ExternalComponent;

    ecLight.OnComponentReady = function () {
        ecLight.SetValue([sampleMd]);
    };
    ecDark.OnComponentReady = function () {
        ecDark.SetValue([sampleMd]);
    };
    ecGitHub.OnComponentReady = function () {
        ecGitHub.SetValue([sampleMd]);
    };
};
