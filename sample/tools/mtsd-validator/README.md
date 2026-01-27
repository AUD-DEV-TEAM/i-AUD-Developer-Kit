# MTSD File Validator

i-AUD Developer Kit의 MTSD 파일 구조 및 컨트롤 속성 Validation 도구입니다.

## 설치

```bash
cd tools/mtsd-validator
npm install
npm run build
```

## 사용법

### CLI 사용

```bash
# 단일 파일 검증
npm run start -- path/to/report.mtsd

# 여러 파일 검증
npm run start -- *.mtsd

# 디렉토리 내 모든 mtsd 파일 검증 (재귀적)
npm run start -- ./reports --recursive

# JSON 형식으로 출력
npm run start -- report.mtsd -f json -o results.json

# 마크다운 형식으로 출력
npm run start -- report.mtsd -f markdown -o report.md

# 한국어 메시지 사용
npm run start -- report.mtsd --korean

# 특정 규칙만 적용
npm run start -- report.mtsd --only missing-required-property,invalid-type

# 특정 규칙 무시
npm run start -- report.mtsd --ignore name-contains-space,control-too-small

# 특정 컨트롤 타입만 검증
npm run start -- report.mtsd --types DataGrid,OlapGrid
```

### 프로그래매틱 사용

```typescript
import { validateMtsdFile, formatReport } from 'mtsd-validator';

// 파일 검증
const report = validateMtsdFile('path/to/report.mtsd');

// 결과 출력
console.log(formatReport(report, { format: 'console', useKorean: true }));

// 유효성 확인
if (report.isValid) {
  console.log('Validation passed!');
} else {
  console.log(`Found ${report.summary.errorCount} errors`);
}
```

## CLI 옵션

| 옵션 | 설명 |
|------|------|
| `-o, --output <file>` | 출력 파일 경로 (기본: stdout) |
| `-f, --format <format>` | 출력 형식: console, json, markdown, csv |
| `-s, --strict` | 경고도 오류로 취급 |
| `--ignore <rules>` | 무시할 규칙 ID (쉼표로 구분) |
| `--only <rules>` | 적용할 규칙 ID만 (쉼표로 구분) |
| `--types <types>` | 검증할 컨트롤 타입만 (쉼표로 구분) |
| `--max-errors <n>` | 최대 오류 수 (기본: 1000) |
| `-k, --korean` | 한국어 메시지 사용 |
| `--no-colors` | 색상 출력 비활성화 |
| `-r, --recursive` | 디렉토리 내 재귀 검색 |
| `-v, --verbose` | 상세 출력 |
| `-h, --help` | 도움말 |

## 검증 규칙

### 구조 검증
- `missing-required-section`: 필수 섹션 누락
- `invalid-forms-type`: Forms가 배열이 아님
- `invalid-datasources-type`: DataSources.Datas가 배열이 아님

### ReportInfo 검증
- `missing-report-info-property`: 필수 속성 누락
- `invalid-report-code-format`: ReportCode 형식 오류

### DataSources 검증
- `missing-datasource-id`: DataSource ID 누락
- `missing-datasource-name`: DataSource 이름 누락
- `duplicate-datasource-id`: 중복 DataSource ID
- `duplicate-datasource-name`: 중복 DataSource 이름
- `duplicate-column-name`: 중복 컬럼명

### Variables 검증
- `missing-variable-name`: 변수명 누락
- `duplicate-variable-name`: 중복 변수명
- `invalid-variable-name-start`: 잘못된 변수명 시작 문자

### Forms 검증
- `missing-form-id`: Form ID 누락
- `missing-form-name`: Form 이름 누락
- `duplicate-form-name`: 중복 Form 이름
- `duplicate-control-name-across-forms`: 폼 간 중복 컨트롤 이름

### 컨트롤 공통 검증
- `unknown-control-type`: 알 수 없는 컨트롤 타입
- `missing-required-property`: 필수 속성 누락
- `invalid-type`: 잘못된 타입
- `value-below-minimum`: 최소값 미달
- `value-above-maximum`: 최대값 초과
- `invalid-enum-value`: 유효하지 않은 열거형 값
- `pattern-mismatch`: 패턴 불일치
- `invalid-datasource-reference`: 존재하지 않는 DataSource 참조
- `invalid-variable-reference`: 존재하지 않는 변수 참조

### DataGrid 검증
- `duplicate-column-name`: 중복 컬럼명
- `invalid-column-width`: 잘못된 컬럼 너비
- `empty-columns`: 컬럼 없음

### OlapGrid 검증
- `duplicate-field-key`: 중복 필드 키
- `invalid-dimension-in-data-area`: Data 영역의 디멘전 필드
- `no-measure-field`: Measure 필드 없음
- `cell-height-too-small`: 셀 높이가 너무 작음
- `tree-header-width-too-small`: 트리 헤더 너비가 너무 작음

### 이름 규칙 검증
- `name-contains-space`: 이름에 공백 포함
- `name-starts-with-number`: 숫자로 시작하는 이름
- `name-contains-special-chars`: 특수문자 포함

### 위치/크기 검증
- `control-too-small`: 컨트롤 크기가 너무 작음
- `negative-position`: 음수 위치

## 지원 컨트롤 타입

- Label
- Button
- TextBox
- RichTextBox
- ComboBox
- CheckBox
- DataGrid
- OlapGrid
- Chart
- Image
- Tab
- Group
- 기타 모든 컨트롤 (기본 검증 적용)

## 출력 예시

### Console 출력
```
══════════════════════════════════════════════════════════════════════
  MTSD File Validation Report
══════════════════════════════════════════════════════════════════════

  File: src/reports/samples/DataGrid/데이터 유효성/REPFF1D68EDEEA04CC7A04C018E9CCC1AFC.mtsd
  Report: 데이터 유효성
  Code: REPFF1D68EDEEA04CC7A04C018E9CCC1AFC
  Validated: 2024-01-14T12:00:00.000Z

──────────────────────────────────────────────────────────────────────
  Summary
──────────────────────────────────────────────────────────────────────

  Forms: 1
  Controls: 1
  DataSources: 2

  ✖ 0 errors  ⚠ 2 warnings  ℹ 1 info

══════════════════════════════════════════════════════════════════════
  ✓ Validation Passed
══════════════════════════════════════════════════════════════════════
```

## 라이센스

MIT
