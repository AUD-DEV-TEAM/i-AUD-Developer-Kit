import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Label } from "@AUD_CLIENT/control/Label";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    // ── 라벨 텍스트 설정 ──
    let lblTitle = Matrix.getObject("lblTitle") as Label;
    let lblJS = Matrix.getObject("lblJavaScript") as Label;
    let lblSQL = Matrix.getObject("lblSQL") as Label;
    let lblJSON = Matrix.getObject("lblJSON") as Label;
    let lblPy = Matrix.getObject("lblPython") as Label;
    let lblTxt = Matrix.getObject("lblText") as Label;

    lblTitle.Value = "Code Editor Gallery - Syntax Highlighting Languages";
    lblJS.Value = "JavaScript / TypeScript";
    lblSQL.Value = "SQL";
    lblJSON.Value = "JSON";
    lblPy.Value = "Python";
    lblTxt.Value = "Plain Text";

    // ── JavaScript 샘플 ──
    const jsCode = [
        'function fibonacci(n) {',
        '    if (n <= 1) return n;',
        '    let a = 0, b = 1;',
        '    for (let i = 2; i <= n; i++) {',
        '        const temp = a + b;',
        '        a = b;',
        '        b = temp;',
        '    }',
        '    return b;',
        '}',
        '',
        '// 결과 출력',
        'const result = fibonacci(10);',
        'console.log("Fibonacci(10) =", result); // 55',
        '',
        'const items = ["apple", "banana", "cherry"];',
        'items.forEach(function(item, idx) {',
        '    console.log(idx + ": " + item);',
        '});'
    ].join('\n');

    // ── SQL 샘플 ──
    const sqlCode = [
        'SELECT',
        '    E.EMP_NAME,',
        '    D.DEPT_NAME,',
        '    E.SALARY,',
        '    E.HIRE_DATE',
        'FROM EMPLOYEES E',
        'INNER JOIN DEPARTMENTS D',
        '    ON E.DEPT_CODE = D.DEPT_CODE',
        'WHERE E.SALARY > 50000',
        '  AND D.DEPT_NAME IS NOT NULL',
        'ORDER BY E.SALARY DESC',
        'LIMIT 100;',
        '',
        '-- 부서별 급여 통계',
        'SELECT',
        '    DEPT_CODE,',
        '    COUNT(*) AS CNT,',
        '    AVG(SALARY) AS AVG_SAL,',
        '    MAX(SALARY) AS MAX_SAL',
        'FROM EMPLOYEES',
        'GROUP BY DEPT_CODE',
        'HAVING COUNT(*) >= 5;'
    ].join('\n');

    // ── JSON 샘플 ──
    const jsonCode = [
        '{',
        '    "name": "Code Editor Component",',
        '    "version": "1.0.0",',
        '    "description": "Syntax highlighting editor",',
        '    "options": {',
        '        "theme": "dark",',
        '        "fontSize": 13,',
        '        "showLineNumbers": true,',
        '        "readOnly": false',
        '    },',
        '    "languages": [',
        '        "javascript",',
        '        "typescript",',
        '        "sql",',
        '        "json",',
        '        "python"',
        '    ],',
        '    "stats": {',
        '        "downloads": 1024,',
        '        "stars": 256,',
        '        "active": true',
        '    }',
        '}'
    ].join('\n');

    // ── Python 샘플 ──
    const pyCode = [
        'class DataProcessor:',
        '    """데이터 처리 클래스"""',
        '',
        '    def __init__(self, name):',
        '        self.name = name',
        '        self.data = []',
        '',
        '    def load(self, filepath):',
        '        with open(filepath) as f:',
        '            for line in f:',
        '                self.data.append(line.strip())',
        '        return len(self.data)',
        '',
        '    def transform(self, func):',
        '        self.data = [func(item) for item in self.data]',
        '',
        '# 사용 예시',
        'proc = DataProcessor("sample")',
        'count = proc.load("input.csv")',
        'print(f"Loaded {count} records")',
        'proc.transform(lambda x: x.upper())'
    ].join('\n');

    // ── Plain Text 샘플 ──
    const textCode = [
        'CodeEditorComponent 사용 가이드',
        '================================',
        '',
        '지원 언어:',
        '  - JavaScript / TypeScript',
        '  - SQL',
        '  - JSON',
        '  - Python',
        '  - Plain Text (구문 강조 없음)',
        '',
        '주요 기능:',
        '  1. 구문 강조 (Syntax Highlighting)',
        '  2. 줄 번호 표시',
        '  3. Dark / Light 테마',
        '  4. 읽기 전용 모드',
        '  5. 자동 줄바꿈',
        '  6. Tab 키 지원 (스페이스 삽입)',
        '',
        '브릿지 메서드:',
        '  SetValue([code])  - 코드 설정',
        '  GetValue()        - 코드 반환',
        '  SetData(data)     - 데이터 바인딩'
    ].join('\n');

    // ── 각 컴포넌트에 샘플 코드 설정 (비동기 로딩 완료 후) ──
    let ecJS = Matrix.getObject("ecJavaScript") as ExternalComponent;
    let ecSQL = Matrix.getObject("ecSQL") as ExternalComponent;
    let ecJSON = Matrix.getObject("ecJSON") as ExternalComponent;
    let ecPython = Matrix.getObject("ecPython") as ExternalComponent;
    let ecText = Matrix.getObject("ecText") as ExternalComponent;

    ecJS.OnComponentReady = function () { ecJS.SetValue([jsCode]); };
    ecSQL.OnComponentReady = function () { ecSQL.SetValue([sqlCode]); };
    ecJSON.OnComponentReady = function () { ecJSON.SetValue([jsonCode]); };
    ecPython.OnComponentReady = function () { ecPython.SetValue([pyCode]); };
    ecText.OnComponentReady = function () { ecText.SetValue([textCode]); };
};