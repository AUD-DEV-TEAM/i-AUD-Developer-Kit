# i-AUD Developer Kit

> Claude Code를 위한 프로젝트 가이드

## 프로젝트 개요

**i-AUD Developer Kit**은 i-AUD Platform에서 보고서(프로그램)를 개발하기 위한 TypeScript 기반 개발 환경입니다.

- **AUD Platform**: 업무 시스템 화면 개발을 위한 통합 UI 개발 플랫폼
- **i-AUD**: WYSIWYG 방식의 웹 애플리케이션 개발 도구
- **i-AUD Developer Kit**: VS Code 확장을 통한 스크립트 개발 환경

### 핵심 특징

- TypeScript 단일 언어로 클라이언트/서버 스크립트 개발
- 클라이언트 스크립트: 브라우저에서 실행 (UI 제어, 이벤트 처리)
- 서버 스크립트: Rhino JavaScript 엔진에서 실행 (DB 조회, 파일 처리, 비즈니스 로직)
- VS Code 확장을 통한 보고서 다운로드/업로드/실행

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| **언어** | TypeScript, JavaScript |
| **클라이언트** | TypeScript (브라우저) |
| **서버** | TypeScript → JavaScript (Rhino Engine) |
| **빌드 도구** | TypeScript Compiler (tsc) |
| **개발 환경** | VS Code + i-AUD Developer Kit Extension |
| **버전 관리** | Git |

---

## 프로젝트 구조

```
i-AUD-Developer-Kit/
├── .vscode/
│   └── settings.json          # AUD 서버 연결 설정
├── .claude/
│   └── skills/                # Claude Skills (프로젝트 가이드)
│       ├── iaud-project-guide/        # 프로젝트 구조 가이드
│       ├── iaud-client-script/        # 클라이언트 스크립트 가이드
│       ├── iaud-server-script/        # 서버 스크립트 가이드
│       ├── iaud-report-structure/     # 보고서 구조 가이드
│       ├── iaud-mtsd-create/          # MTSD 보고서 화면 생성 가이드
│       ├── iaud-module-create/        # 모듈 생성 가이드
│       ├── iaud-sql-guide/            # DataSource SQL 작성 가이드
│       ├── iaud-olap-formula/         # OLAP 수식 작성 가이드
│       ├── iaud-formula/              # 계산수식(Formula) 작성 가이드
│       ├── iaud-mxgrid-guide/         # MX-GRID 개발 가이드
│       ├── iaud-boxstyle-guide/       # BoxStyle 공통 스타일 활용 가이드
│       └── iaud-ts-conversion/        # TypeScript 전환 가이드
├── types/                     # API 타입 정의
│   ├── aud/                   # 클라이언트 스크립트 API
│   │   ├── control/           # UI 컨트롤 (51개 파일 + 20개 하위 폴더)
│   │   │   ├── charts/        # 차트 타입 정의
│   │   │   ├── grids/         # DataGrid 셀/컬럼/행 컴포넌트
│   │   │   ├── igrids/        # iGrid(MX-GRID) 컴포넌트
│   │   │   ├── olap/          # OlapGrid 컴포넌트
│   │   │   ├── diagram/       # 다이어그램 컨트롤
│   │   │   ├── tabcontrol/    # 탭 컨트롤
│   │   │   ├── table/         # 테이블 레이아웃
│   │   │   └── treeview/      # 트리뷰 컴포넌트
│   │   ├── common/            # 공통 유틸리티
│   │   ├── data/              # DataSet, DataTable 등
│   │   ├── enums/             # 열거형 타입 (chart, grid, olap 등 12개 카테고리)
│   │   ├── ext/               # 확장 컨트롤 (GeoMap, ListView, Schedule 등)
│   │   ├── drawing/           # 드로잉 API
│   │   └── html/              # HTML 캔버스 지원
│   ├── com/                   # 서버 스크립트 API (Rhino)
│   │   └── matrix/
│   │       ├── script/        # 핵심 API (19개 파일: Matrix, Connection, RecordSet 등)
│   │       │   ├── io/        # 파일 I/O API
│   │       │   └── excel/     # Excel 처리 API (31개 파일)
│   │       ├── olap/          # OLAP API
│   │       ├── canvas/        # i-AUD 보고서 모델 접근 api
│   │       └── data/          # 데이터 처리 클래스
│   └── cfx/                   # Custom Extension Framework (Conflux)
│       ├── control/           # Conflux 환경 API
│       ├── data/              # Conflux 데이터 테이블
│       ├── enums/             # 데이터 타입 열거형
│       └── rpt/               # Conflux 노드/보고서
├── src/
│   └── reports/               # 보고서 개발 폴더
│       ├── samples/           # 샘플 보고서
│       │   ├── 기능별 샘플/    # 컨트롤별 샘플 (8개 카테고리)
│       │   └── 판매관리 시스템/ # 영업판매관리 E2E 데모 (14개 업무 모듈)
│       └── [Work]/           # 실제 개발 폴더
├── out/                       # TypeScript 빌드 출력
├── package.json
├── tsconfig.json
└── README.md
```

### 보고서 폴더 구조

각 보고서는 독립된 폴더로 구성됩니다:

```
[보고서명]/
├── .aud.json                   # 프로그램 메타 정보
├── [ReportCode].mtsd           # 화면 UI 정의 (JSON)
├── [보고서명].script.ts         # 클라이언트 스크립트 (우선 탐색)
├── [보고서명].script.js         # 클라이언트 스크립트 (대체)
├── DataSource/                 # 데이터 조회 SQL
│   └── *.sql
└── ServerScript/               # 서버 스크립트
    ├── *.ts                    # 일반 서비스
    ├── @*.ts                   # 공통 모듈 (@로 시작)
    └── *.sql                   # SQL 서비스
```

### MX-GRID 보고서 폴더 구조

MX-GRID(엑셀 기반 그리드) 보고서는 `MX_GRID/` 하위 폴더에 3파일 셋트를 포함합니다:

```
[보고서명]/
├── .aud.json                   # 프로그램 메타 정보
├── [ReportCode].mtsd           # 화면 UI 정의 (iGrid 컨트롤 포함)
├── [보고서명].script.ts         # 클라이언트 스크립트
├── MX_GRID/                    # ★ MX-GRID 전용 폴더
│   ├── {코드}.xlsx             # 원본 엑셀 파일 (디자이너에서 편집용)
│   ├── {코드}.json2            # 엑셀 템플릿 모델 (JSON)
│   └── {코드}.ds               # 데이터셋 바인딩 정보 (JSON)
├── DataSource/
│   └── *.sql
└── ServerScript/
    └── *.ts
```

- `.xlsx`: 원본 엑셀 파일. i-AUD Designer 또는 Excel에서 직접 편집
- `.json2`: 엑셀 구조(스타일, 셀값, 수식, 병합, 차트 등)를 JSON으로 표현한 템플릿
- `.ds`: 데이터바인딩 정보(SQL, 출력 셀 범위, 연결 코드 등)를 JSON으로 정의

---

## Skills 가이드

이 프로젝트는 Claude Code의 Skills 시스템을 활용합니다. 각 영역별로 전문 가이드를 제공합니다:

### 사용 가능한 Skills

| Skill 이름 | 설명 | 사용 시기 |
|-----------|------|----------|
| `/iaud-project-guide` | 프로젝트 구조, 폴더 설명, 개발 환경 설정 | 프로젝트 구조, 폴더 설명, VS Code 명령어를 알아야 할 때 |
| `/iaud-client-script` | 클라이언트 스크립트 개발 가이드 (브라우저) | UI 컨트롤 조작, 버튼 이벤트, 그리드 조작이 필요할 때 |
| `/iaud-server-script` | 서버 스크립트 개발 가이드 (Rhino) | DB 조회, 파일 처리, 비즈니스 로직 구현이 필요할 때 |
| `/iaud-report-structure` | 보고서 구조 가이드 (.aud.json, .mtsd) | 보고서 파일 구조, 데이터소스, 서비스 구성을 알아야 할 때 |
| `/iaud-module-create` | 모듈 생성 가이드 (.module.json) | 프로세스 봇 모듈을 만들어야 할 때 |
| `/iaud-sql-guide` | DataSource SQL 작성 가이드 | SQL 파라미터 바인딩, 변수 치환, Dynamic SQL 작성이 필요할 때 |
| `/iaud-olap-formula` | OLAP 수식 작성 가이드 | OlapGrid 계산 필드, ForAll/ForEach, 조건부 서식 수식 작성이 필요할 때 |
| `/iaud-formula` | 계산수식(Formula) 작성 가이드 | 컨트롤 수식, SUMIF, 그리드 컬럼 수식, 컨트롤 참조 연산이 필요할 때 |
| `/iaud-mxgrid-guide` | MX-GRID 개발 가이드 (엑셀 그리드) | MX-GRID 서버/클라이언트 스크립트, 예약어, AUD_xxx 함수, .ds 파일 수정이 필요할 때 |
| `/iaud-mtsd-create` | MTSD 보고서 화면 생성 (MCP 도구 활용) | 보고서 UI를 처음부터 만들거나, Element/DataSource 추가가 필요할 때 |
| `/iaud-boxstyle-guide` | BoxStyle 공통 스타일 활용 가이드 | BoxStyle 적용, 스타일 일괄 변경, Style.Type 설정, 컨트롤별 스타일 API가 필요할 때 |
| `/iaud-ts-conversion` | TypeScript 전환 가이드 (var→let/const, 타입) | 기존 .script.js를 .script.ts로 마이그레이션할 때 |

### 수식 Skill 구분 가이드

`/iaud-formula`와 `/iaud-olap-formula`는 **기본 함수(조건, 타입변환, 문자열, 수학, 날짜)가 공통**이지만 사용 컨텍스트가 다릅니다:

| 구분 | `/iaud-formula` (컨트롤 계산수식) | `/iaud-olap-formula` (OLAP 수식) |
|------|----------------------------------|----------------------------------|
| **적용 대상** | Label, TextBox, NumberBox, DataGrid 컬럼 | OlapGrid 계산 필드, 사용자 정의 항목, 조건부 서식 |
| **컨트롤 참조** | `:컨트롤명` (다른 UI 컨트롤 값) | `:변수명` (바인딩 변수) |
| **고유 함수** | SUMIF, AVERAGEIF, COUNTIF, MAXIF, MINIF, GETPIVOTDATA, SELECTEDFIELDVALUE, SUMCELLS, COUNTCELLS, AVGCELLS | ForAll, ForEach, Rank, RankIn, GetMembers, InList, Match, CellValueByOffset, IMG, DrawChart |
| **선언 문법** | JavaScript 모드 (`var`, `return`, `{}`) | `define` (동적 필드), `const` (상수) |
| **그리드 키워드** | IS_GRAND_TOTAL, IS_SUB_TOTAL | IsRowGrandTotal, IsColGrandTotal, IsRowTotal, IsColTotal, IsTotalOrGrandTotal |

> 기본 함수(IF, CASE, AND, OR, ToString, ToNumber 등)는 양쪽 동일하므로, **어디에 수식을 적용할지**에 따라 적절한 스킬을 참조하세요.

### Skill 사용 예시

```
질문: "버튼 클릭 이벤트를 어떻게 처리하나요?"
→ /iaud-client-script 스킬 참조

질문: "데이터베이스에서 데이터를 어떻게 조회하나요?"
→ /iaud-server-script 스킬 참조

질문: ".aud.json 파일은 무엇인가요?"
→ /iaud-report-structure 스킬 참조

질문: "그리드를 꾸미는 모듈을 만들어줘"
→ /iaud-module-create 스킬 참조

질문: "SQL에서 파라미터 바인딩은 어떻게 하나요?"
→ /iaud-sql-guide 스킬 참조

질문: "OLAP 그리드에 계산 필드 수식을 어떻게 작성하나요?"
→ /iaud-olap-formula 스킬 참조

질문: "데이터그리드 컬럼에 수식을 넣고 싶어요" / "라벨에 그리드 합계를 표시하려면?"
→ /iaud-formula 스킬 참조

질문: "MX-GRID 서버 스크립트에서 셀 값을 어떻게 변경하나요?" / "MX-GRID 예약어 사용법 알려줘"
→ /iaud-mxgrid-guide 스킬 참조

질문: "보고서 화면을 처음부터 만들고 싶어요" / "MTSD에 Element 추가하려면?"
→ /iaud-mtsd-create 스킬 참조

질문: "기존 JavaScript 스크립트를 TypeScript로 변환하려면?" / "var를 let/const로 바꾸려면?"
→ /iaud-ts-conversion 스킬 참조

질문: "버튼에 BoxStyle을 적용하려면?" / "그리드 헤더 스타일을 일괄 변경하고 싶어요" / "Style.Type이 뭔가요?"
→ /iaud-boxstyle-guide 스킬 참조
```

---

## 개발 워크플로우

### 1. 새 보고서 개발

1. **i-AUD Designer**에서 보고서 생성 및 UI 배치
2. VS Code에서 `AUD: Download Report` 명령으로 다운로드
3. 스크립트 파일 확장자를 `.js` → `.ts`로 변경 (TypeScript 사용 시)
4. `AUD: Generate Starter Code`로 기본 구조 생성
5. 터미널에서 `tsc --w` 실행 (자동 빌드)
6. 스크립트 개발
7. `AUD: Publish Script` (Ctrl+Alt+S)로 배포
8. `AUD: Run Designer` (Ctrl+Alt+D)로 테스트

### 2. 기존 보고서 수정

1. VS Code에서 `AUD: Pull Report` 명령으로 최신 정보 동기화
2. 스크립트 수정
3. `AUD: Publish Script`로 배포
4. `AUD: Run Designer`로 테스트

### 3. 주요 VS Code 명령어

| 명령어 | 단축키 | 설명 |
|--------|--------|------|
| `AUD: Download Report` | - | 서버에서 보고서 다운로드 |
| `AUD: Pull Report` | - | 서버 최신 정보로 업데이트 |
| `AUD: Publish Script` | `Ctrl+Alt+S` | 스크립트만 서버에 배포 |
| `AUD: Deploy Report` | - | 디자인 포함 전체 배포 |
| `AUD: Run Designer` | `Ctrl+Alt+D` | 브라우저로 실행 |
| `AUD: Generate Starter Code` | - | TypeScript 기본 구조 생성 |
| `AUD: Execute Query` | `Ctrl+F5` | 선택한 SQL 실행 |
| `AUD: Generate Control Variables` | - | 컨트롤 변수 선언 생성 |

---

## 주요 규칙 및 컨벤션

### MTSD / SC 파일 수정 후 필수 작업

> `.mtsd` 또는 `.sc` 확장자를 가진 AUD 보고서 파일의 내용을 수정한 경우, **반드시** 아래 두 단계를 순서대로 실행해야 합니다.

1. **`fix_mtsd`** (자동 보정) — DataSource Name→Id 참조 보정, OlapGrid Fields 자동 생성, Enum/Range 값 범위 보정 등을 수행
2. **`validate_mtsd`** 또는 **`validate_part`** (스키마 검증) — 수정된 문서가 MTSD 스키마를 준수하는지 확인

```
# MCP 도구 호출 순서
1. fix_mtsd     { path: "<파일경로>" }
2. validate_part { partName: "Forms", data: <Forms 배열> }   ← Forms 파트 검증
   validate_part { partName: "DataSources", data: <DataSources> }  ← DataSources 검증
```

> **주의**: `validate_mtsd`(전체 검증)는 대용량 문서에서 AJV 성능 이슈로 타임아웃될 수 있습니다. 이 경우 `validate_part`로 파트별 검증을 권장합니다.

### 스크립트 수정 후 필수 빌드 점검

> 클라이언트 스크립트(`.script.ts`) 또는 서버 스크립트(`ServerScript/*.ts`)를 수정한 경우, **반드시 `tsc`를 실행하여 빌드 오류가 없는지 점검**해야 합니다.

```bash
# 프로젝트 루트에서 실행
npx tsc --noEmit
```

- 빌드 오류가 발생하면 **반드시 해결한 후** 작업을 완료합니다.
- 타입 오류, import 경로 오류, 미사용 변수 등을 확인합니다.
- `tsc --w` (Watch 모드)가 실행 중이면 저장 시 자동으로 오류를 확인할 수 있습니다.

### 서버 스크립트 Rhino 제약사항

> 서버 스크립트(`ServerScript/*.ts`)는 **Rhino JavaScript 엔진**(Java 기반)에서 실행됩니다. TypeScript(`tsc`)는 이 제약을 감지하지 못하므로 개발자가 주의해야 합니다.

**Java 배열 ≠ JavaScript 배열**: `fso.getFiles()`, `fso.getFolders()` 등 i-AUD 서버 API가 반환하는 배열은 **Java String 배열**입니다. TypeScript 타입은 `string[]`이지만, 런타임에서 `.slice()`, `.sort()`, `.map()`, `.filter()` 등 JS Array 메서드를 사용할 수 없습니다.

```typescript
// ✗ 잘못된 코드 (런타임 오류 - Java 배열에 slice/sort 없음)
let files = fso.getFiles(folder);
let sorted = files.slice().sort();

// ✓ 올바른 코드 (Java 배열 → JS 배열 변환 후 사용)
let javaFiles = fso.getFiles(folder);
let files: string[] = [];
for(let i = 0; i < javaFiles.length; i++){ files.push(javaFiles[i]); }
files.sort();
```

**사용 불가한 ES2015+ 문법**: Rhino는 ES5 수준이므로 아래 문법은 서버 스크립트에서 사용하면 안 됩니다 (tsc가 ES5로 변환해주는 것만 안전):
- `Array.from()`, `Array.of()`, `Object.assign()`, `Object.entries()`
- `Map`, `Set`, `WeakMap`, `WeakSet`, `Symbol`, `Promise`
- Template literal (tsc가 변환), Arrow function (tsc가 변환) → 이 두 가지는 tsc 변환으로 안전

### MTSD Docking 주의사항

> MTSD 생성/수정 시 반드시 확인할 것. 상세 가이드는 `/iaud-mtsd-create` Skill 참조.

1. **Left/Right/Top/Bottom:true는 부모의 해당 가장자리(0)에 맞추는 것** — 컨트롤의 현재 위치를 유지하는 것이 아님
2. **좌우 분할 레이아웃**: 우측 패널에 `Left+Right` 도킹 시 반드시 `Margin: "{좌측패널Width},0,0,0"` 설정. 그렇지 않으면 좌측 패널을 덮음
3. **fill(모두 true)은 부모 전체를 덮음**: 위에 다른 요소(헤더 등)가 있으면 `Top:false`로 설정하여 상단 위치 유지
4. **Margin 형식**: `"Left,Top,Right,Bottom"` (픽셀 단위, 쉼표 구분 문자열). 도킹이 활성화된 방향에 대해 부모 가장자리와의 여백을 설정

### 파일 규칙

1. **클라이언트 스크립트 우선순위**: `.ts` 파일이 `.js` 파일보다 우선 탐색됨
2. **서버 스크립트 공통 모듈**: `@`로 시작하는 파일은 공통 모듈로 인식
3. **파일명 규칙**:
   - 클라이언트: `[보고서명].script.ts`
   - 서버 스크립트: `ServerScript/[서비스명].ts`
   - 데이터소스: `DataSource/[데이터소스명].sql`

### 코딩 규칙

#### 클라이언트 스크립트

```typescript
// 필수 import
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

// 필수 변수
let Matrix: Matrix;

// 초기화 이벤트 (권장)
Matrix.OnDocumentLoadComplete = function(sender, args) {
    // 컨트롤 바인딩
    let btn = Matrix.getObject("btnSearch") as Button;

    // 이벤트 등록
    btn.OnClick = btnSearchOnClick;
};

const btnSearchOnClick = function(sender, args) {
    // 버튼 클릭 로직
};
```

#### 서버 스크립트

```typescript
// 필수 import
import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";

// 필수 변수
let Matrix: Matrix;

// 핵심 객체
const req = Matrix.getRequest();
const res = Matrix.getResponse();
let con = Matrix.getConnection();

try {
    // 비즈니스 로직
} catch(e) {
    Matrix.ThrowException(e.message);
} finally {
    // 리소스 정리
    if (con != null) {
        con.DisConnect();
        con = null;
    }
}
```

### 샘플 코드 작성 규칙

1. **데이터베이스 연결 코드**: 샘플 코드에서 데이터베이스 연결 코드는 반드시 `"AUD_SAMPLE_DB"`를 사용합니다.
   ```typescript
   // 올바른 예
   con.Connect("AUD_SAMPLE_DB");
   res.addAsyncTable("T1", "AUD_SAMPLE_DB", sql);

   // 잘못된 예 (사용 금지)
   con.Connect("MTXRPTY");
   con.Connect("DBMS Code");
   con.Connect("DBMS_CODE");
   ```

### SQL 파라미터 바인딩

```sql
SELECT * FROM EMP
WHERE 1=1
  AND DEPT_CODE = :VS_DEPT_CODE          -- 문자열: 자동으로 '따옴표' 감싸짐
  AND AMOUNT > :VN_MIN_AMOUNT            -- 숫자: 따옴표 없이 값 그대로 치환
  AND USER_NAME = @:VS_USER_NAME         -- @: 빈 값이면 해당 라인 삭제
  AND SEARCH_NAME LIKE %:VS_KEYWORD%     -- %: LIKE 와일드카드 자동 포함
  AND USER_CODE = :VS_USER_CODE$         -- 파라미터명 뒤에 `$`를 붙이면 클라이언트 전달값 대신 서버 세션(인증) 값을 사용한다. 보안이 필요한 항목(사용자 코드, 조직 코드 등)에 사용한다.
```

> 상세 규칙(IN절, Dynamic SQL, 프로시저, JavaScript 혼합 작성)은 `/iaud-sql-guide` 스킬을 참조하세요.

---

## API 참조 위치

### 클라이언트 API

TypeScript 인터페이스 정의: `types/aud/`

- **컨트롤**: [types/aud/control/](types/aud/control/) (51개 파일 + 20개 하위 폴더)
  - [Matrix.ts](types/aud/control/Matrix.ts) - 핵심 Matrix API
  - [Button.ts](types/aud/control/Button.ts), [TextBox.ts](types/aud/control/TextBox.ts), [NumberBox.ts](types/aud/control/NumberBox.ts)
  - [ComboBox.ts](types/aud/control/ComboBox.ts), [CheckBox.ts](types/aud/control/CheckBox.ts), [RadioButton.ts](types/aud/control/RadioButton.ts)
  - [DataGrid.ts](types/aud/control/DataGrid.ts), [TreeGrid.ts](types/aud/control/TreeGrid.ts)
  - [iGrid.ts](types/aud/control/iGrid.ts) - MX-GRID 클라이언트
  - [OlapGrid.ts](types/aud/control/OlapGrid.ts) - OLAP 그리드
  - [Chart.ts](types/aud/control/Chart.ts), [PieChart.ts](types/aud/control/PieChart.ts), [ScatterChart.ts](types/aud/control/ScatterChart.ts)
  - [Calendar.ts](types/aud/control/Calendar.ts), [FileUploadButton.ts](types/aud/control/FileUploadButton.ts)
  - [Group.ts](types/aud/control/Group.ts), [Tab.ts](types/aud/control/Tab.ts), [TableLayout.ts](types/aud/control/TableLayout.ts)
  - 하위 폴더: `grids/` (DataGrid 컴포넌트), `igrids/` (iGrid 컴포넌트), `olap/` (OlapGrid 컴포넌트), `charts/`, `diagram/` 등
- **데이터**: [types/aud/data/](types/aud/data/)
  - [DataSet.ts](types/aud/data/DataSet.ts), [DataTable.ts](types/aud/data/DataTable.ts)
- **공통**: [types/aud/common/](types/aud/common/)
- **열거형**: [types/aud/enums/](types/aud/enums/) - 12개 카테고리 (`chart/`, `grid/`, `olap/`, `comm/`, `diagram/`, `label/`, `meta/`, `properties/`, `schedule/`, `slicer/`, `tab/`, `treeview/`)
- **확장 컨트롤**: [types/aud/ext/](types/aud/ext/) - GeoMap, ListView, Schedule, SmartEditor 등

### 서버 API

TypeScript 인터페이스 정의: `types/com/`

- **핵심 스크립트**: [types/com/matrix/script/](types/com/matrix/script/) (19개 파일)
  - [Matrix.ts](types/com/matrix/script/Matrix.ts) - 메인 Matrix API
  - [ScriptConnection.ts](types/com/matrix/script/ScriptConnection.ts) - DB 연결
  - [ScriptRecordSet.ts](types/com/matrix/script/ScriptRecordSet.ts) - 결과셋
  - [ScriptRequestPacket.ts](types/com/matrix/script/ScriptRequestPacket.ts) - 요청
  - [ScriptResponsePacket.ts](types/com/matrix/script/ScriptResponsePacket.ts) - 응답
  - [ScriptDataSet.ts](types/com/matrix/script/ScriptDataSet.ts) - 데이터셋
  - [ScriptDataTable.ts](types/com/matrix/script/ScriptDataTable.ts) - 데이터테이블
  - [ScriptHttpClient.ts](types/com/matrix/script/ScriptHttpClient.ts) - HTTP 요청
  - [ScriptFTP.ts](types/com/matrix/script/ScriptFTP.ts) - FTP/SFTP 파일 전송
  - [ScriptFileSystemObject.ts](types/com/matrix/script/ScriptFileSystemObject.ts) - 파일 시스템
  - [ScriptSession.ts](types/com/matrix/script/ScriptSession.ts) - 세션 관리
  - [ScriptPreparedStatement.ts](types/com/matrix/script/ScriptPreparedStatement.ts) - PreparedStatement
  - [ScriptUtility.ts](types/com/matrix/script/ScriptUtility.ts) - 유틸리티 함수
  - [ScriptQueryGenerator.ts](types/com/matrix/script/ScriptQueryGenerator.ts) - 쿼리 생성기
- **파일 I/O**: [types/com/matrix/script/io/](types/com/matrix/script/io/)
- **Excel**: [types/com/matrix/script/excel/](types/com/matrix/script/excel/) (31개 파일 - WorkBook, WorkSheet, Cell, Style, Chart, Drawing 등)
- **OLAP**: [types/com/matrix/olap/](types/com/matrix/olap/)
- **CFX (Conflux)**: [types/cfx/](types/cfx/) - 외부 연동 프레임워크 (control/, data/, enums/, rpt/)

---

## 샘플 코드 위치

실제 구현 예제: [src/reports/samples/](src/reports/samples/)

### 기능별 샘플 (카테고리)

| 카테고리 | 경로 | 설명 |
|---------|------|------|
| **AddIn** | [samples/기능별 샘플/AddIn/](src/reports/samples/기능별%20샘플/AddIn/) | 사용자 추가 기능 (UserComponent, WebContainer 등) |
| **Chart** | [samples/기능별 샘플/Chart/](src/reports/samples/기능별%20샘플/Chart/) | 차트 컨트롤 (Bar, Line, Pie, Scatter 등) |
| **DataGrid** | [samples/기능별 샘플/DataGrid/](src/reports/samples/기능별%20샘플/DataGrid/) | 데이터그리드 (CRUD, 필터링, 서식, 이벤트 등) |
| **ETC** | [samples/기능별 샘플/ETC/](src/reports/samples/기능별%20샘플/ETC/) | 기타 컨트롤 (Calendar, ComboBox, Tab, Group 등) |
| **MX_GRID** | [samples/기능별 샘플/MX_GRID/](src/reports/samples/기능별%20샘플/MX_GRID/) | MX-GRID 엑셀 그리드 (17개+ 샘플: CRUD, 차트, 대시보드 등) |
| **OlapGrid** | [samples/기능별 샘플/OlapGrid/](src/reports/samples/기능별%20샘플/OlapGrid/) | OLAP 분석 그리드 (33개+ 샘플: 피벗, 수식, Write-Back 등) |
| **Report** | [samples/기능별 샘플/Report/](src/reports/samples/기능별%20샘플/Report/) | 일반 보고서 (레이아웃, 서비스 호출, 파일 처리 등) |
| **TreeGrid** | [samples/기능별 샘플/TreeGrid/](src/reports/samples/기능별%20샘플/TreeGrid/) | 트리 그리드 (계층 데이터 표현) |

### 판매관리 시스템 (E2E 업무 데모)

[src/reports/samples/판매관리 시스템/](src/reports/samples/판매관리%20시스템/) - 14개 업무 모듈로 구성된 종합 데모:
고객 관리, 공통 코드 관리, 대시보드, 매출 분석, 실적 분석, 영업 계획/관리/실적, 재고 관리, 제품 관리, 직원 관리 등

---

## Claude Code 사용 시 참고 사항

### 1. 코드 작성 시

- **API 인터페이스 참조**: `types/aud/`, `types/com/` 폴더의 TypeScript 인터페이스를 참조
- **샘플 코드 참조**: `src/reports/samples/` 폴더의 실제 예제 참조
- **Skills 활용**: 각 영역별 전문 가이드(/iaud-client-script, /iaud-server-script, /iaud-mxgrid-guide 등) 참조

### 2. 파일 탐색 시

- **클라이언트 API**: `types/aud/control/`, `types/aud/data/`에서 컨트롤 및 데이터 API 확인
- **서버 API**: `types/com/matrix/script/`에서 서버 스크립트 API 확인
- **샘플**: `src/reports/samples/`에서 유사한 예제 검색
- **MX-GRID API**: `types/com/matrix/script/excel/`(서버), `types/aud/control/iGrid.ts`(클라이언트)

### 3. 질문 답변 시

- 프로젝트 구조 질문 → `/iaud-project-guide` 참조
- 클라이언트 개발 질문 → `/iaud-client-script` 참조
- 서버 개발 질문 → `/iaud-server-script` 참조
- 보고서 구조 질문 → `/iaud-report-structure` 참조
- SQL 작성 질문 → `/iaud-sql-guide` 참조
- OLAP 수식 질문 → `/iaud-olap-formula` 참조
- 컨트롤 계산수식 질문 → `/iaud-formula` 참조
- MX-GRID 개발 질문 → `/iaud-mxgrid-guide` 참조
- MTSD 화면 생성 질문 → `/iaud-mtsd-create` 참조
- BoxStyle/공통 스타일 질문 → `/iaud-boxstyle-guide` 참조
- TypeScript 전환 질문 → `/iaud-ts-conversion` 참조

### 4. 일반적인 작업 패턴

#### 버튼 클릭 이벤트 처리
```typescript
// 클라이언트 스크립트
Matrix.OnDocumentLoadComplete = function(sender, args) {
    let btn = Matrix.getObject("btnSearch") as Button;
    btn.OnClick = function(sender, args) {
        // 버튼 클릭 로직
    };
};
```

#### 서버 스크립트 호출 (클라이언트에서)
```typescript
let params = { VS_KEYWORD: "검색어" };
Matrix.RunScriptEx(["gridName"], "ServiceName", params, function(p) {
    if (p.Success) {
        // 성공 처리
    }
});
```

#### 데이터베이스 조회 (서버 스크립트)
```typescript
let con = Matrix.getConnection();
con.Connect("DBMS_CODE");
let rs = con.ExecuteRecordSet("SELECT * FROM TABLE");
while (rs.next()) {
    let value = rs.getString("COLUMN_NAME");
}
con.DisConnect();
```

---

## MX-GRID (엑셀 기반 그리드)

MX-GRID는 엑셀을 웹에서 표현하는 스프레드시트 컨트롤입니다.

### 아키텍처

```
[엑셀 파일(.xlsx)]
     │  (서버 변환)
[템플릿 모델(.json2)] ── 스타일, 셀, 수식, 차트, 이미지, 조건부서식
     │
[서버 WorkBook 객체] ◄── [데이터셋(.ds)] ── SQL 실행 → 셀 영역에 바인딩
     │  (수식 계산 후 직렬화)
[클라이언트 iGrid] → 브라우저에서 MX-GRID 렌더링
```

### AI가 수정 가능한 영역

| 영역 | 효과 | 설명 |
|------|------|------|
| **서버 스크립트** | 높음 | WorkBook API로 셀 값 조작, 데이터 바인딩, CRUD 처리 |
| **클라이언트 스크립트** | 높음 | iGrid 이벤트 처리, 내보내기, 서버 호출 |
| **DataSource SQL** | 높음 | MX-GRID에 바인딩할 SQL 쿼리 작성/수정 |
| **.ds 파일 수정** | 중간 | 데이터바인딩 정보(SQL, 출력 범위) 변경 |
| **.json2 부분 수정** | 중간 | 셀 값, 스타일, 조건부서식, Named Range 수정 |
| **.xlsx 생성/편집** | 불가 | i-AUD Designer 또는 Excel에서 직접 수행 |
| **.json2 전체 생성** | 불가 | 엑셀 → 서버 변환 파이프라인을 통해 생성 |

### 주요 API

- **서버**: `Matrix.getWorkBook()` → [ScriptWorkBook.ts](types/com/matrix/script/excel/ScriptWorkBook.ts), [ScriptWorkSheet.ts](types/com/matrix/script/excel/ScriptWorkSheet.ts)
- **클라이언트**: `Matrix.getObject("MXGrid") as iGrid` → [iGrid.ts](types/aud/control/iGrid.ts)
- **상세 가이드**: `/iaud-mxgrid-guide` 스킬 참조


주요 카테고리:
- **기본 조회**: (MX-GRID) Play ground
- **CRUD**: MX-GRID_CRUD 샘플, MX-GRID CRUD 실행계획
- **차트**: MX-GRID 차트 생성
- **대시보드**: (MX-GRID) Dash Board, MX-GRID_SIMPLE_DASHBOARD
- **이미지**: MX-GRID 이미지 로드 함수(AUD_IMAGE)
- **행열 숨김**: MX-GRID 행열 숨김 함수(AUD_HIDE_COLUMNS, AUD_HIDE_ROWS)
- **드릴다운/필터링**: MX-GRID&데이터 그리드 필터링

---

## 빌드 및 배포

### TypeScript 빌드

```bash
# 한 번만 빌드
npm run tsc

# Watch 모드 (자동 빌드)
tsc --w
```

### 서버 배포

- **스크립트만 배포**: `AUD: Publish Script` (Ctrl+Alt+S)
- **전체 배포 (디자인 포함)**: `AUD: Deploy Report`

---

## MCP Server (aud_mcp_server)

`@bimatrix-aud-platform/aud_mcp_server`는 Claude Code 및 MCP 호환 클라이언트에서 i-AUD 보고서 개발을 지원하는 MCP 서버입니다.

### 설치 및 실행

```bash
# npx로 바로 실행 (최신 버전)
npx @bimatrix-aud-platform/aud_mcp_server@latest
```

### 설정 (자동 탐색)

별도 설정 없이 `.vscode/settings.json`의 `aud.config`를 자동으로 찾아 읽습니다.

**탐색 우선순위:**
1. MCP 클라이언트의 `roots/list` (워크스페이스 경로 자동 수신)
2. 환경변수 (`AUD_SERVICE_URL`, `AUD_API_KEY`, `AUD_USER_NAME`)
3. CWD → 상위 디렉토리 순회
4. 스크립트 경로 → 상위 디렉토리 순회

`.vscode/settings.json`에 아래 설정이 있으면 추가 설정 불필요:

```json
{
  "aud.config": {
    "ServiceURL": "http://localhost:8080",
    "UserName": "admin",
    "ApiKey": "your-api-key"
  }
}
```

### MCP 도구 목록

#### MTSD 문서 도구 (보고서 생성/검증)

| 도구 | 설명 |
|------|------|
| `validate_mtsd` | MTSD 문서 전체 스키마 검증 |
| `validate_part` | MTSD 문서의 특정 부분만 검증 (Form, Element, DataSource 등) |
| `validate_module` | 모듈 JSON (.module.json) 스키마 검증 |
| `get_schema_info` | 특정 타입의 스키마 정보 조회 (필수/선택 속성, 설명) |
| `get_element_types` | 사용 가능한 Element 타입 목록 |
| `get_root_structure` | MTSD 루트 구조 조회 |
| `generate_element` | 간소화 입력으로 Element JSON 생성 |
| `generate_grid_column` | 간소화 입력으로 GridColumn 배열 생성 |
| `generate_datasource` | 간소화 입력으로 DataSource JSON 생성 (SQL에서 파라미터 자동 추출) |
| `fix_mtsd` | MTSD 파일 자동 보정 (Name→Id 참조, Params, Columns 등) |
| `get_control_info` | MTSD 파일에서 컨트롤 Name↔Type 매핑 추출 |
| `generate_uuid` | i-AUD 보고서용 UUID 생성 (prefix + 32자리 HEX). 단일/다수/일괄 생성 지원 |

#### OLAP 도구

| 도구 | 설명 |
|------|------|
| `generate_olap_fields` | OlapGrid의 iOLAPView.Fields 배열 생성. 컬럼 정의를 입력하면 Dimension/Measure 자동 분류, Area 자동 배치, SummaryType 설정 완료된 OlapField 배열 반환 |

#### MX-GRID 검증 도구

| 도구 | 설명 |
|------|------|
| `validate_mxgrid` | MX-GRID 템플릿(.json2) 및 데이터셋(.ds) 파일 스키마 검증. 파일 경로 또는 JSON 문서를 입력하면 확장자로 자동 감지하여 검증. 비즈니스 로직 경고(미정의 스타일 참조, 중복 ID, 빈 SQL 등) 포함 |

#### BoxStyle 도구 (공통 스타일 관리)

BoxStyle은 CSS처럼 서버에서 공통으로 관리되는 스타일 세트입니다. 배경색, 테두리, 폰트를 하나의 키(Name)로 묶어 여러 보고서에서 공유합니다.

| 도구 | 설명 |
|------|------|
| `get_boxstyle_list` | 서버에 등록된 BoxStyle 목록 조회. Name(키), StyleName(표시명), Background, Border, Font 정보 반환 |
| `save_boxstyle` | BoxStyle 저장(생성/수정). BoxStyle 객체 또는 배열을 전달하면 서버에 저장. Name이 기존에 존재하면 수정, 없으면 새로 생성. 여러 개를 한 번에 저장하려면 배열로 전달 |

```
# BoxStyle 사용 흐름
1. get_boxstyle_list로 기존 BoxStyle 목록 확인
2. 원하는 BoxStyle이 없으면 save_boxstyle로 새로 생성 (단일 객체 또는 배열)
   - Name은 StyleName 기반의 식별자 (영문, 숫자, _ 조합, 예: BTN_DEFAULT, HEADER_BLUE)
3. MTSD Element에서 Style.Type=1, Style.BoxStyle="{Name}" 으로 적용
```

#### 데이터베이스 쿼리 도구 (i-AUD 서버 프록시)

| 도구 | 설명 | 주요 파라미터 |
|------|------|--------------|
| `get_dbms_list` | 현재 사용자에게 권한이 있는 DB 연결(DBMS) 목록 조회 | 없음 (로그인 사용자 기준 자동 조회) |
| `execute_query` | SQL 쿼리 실행 및 결과 반환 | `connectionCode`, `sql`, `limitRows`(기본100, 최대1000) |
| `get_table_list` | 메타 테이블에서 테이블/뷰 목록 조회 | `connectionCode`, `filter`(선택), `limitRows`(기본500) |
| `get_table_columns` | 특정 테이블의 컬럼 상세 정보 조회 | `connectionCode`, `tableId`(get_table_list의 TABLE_ID) |

### 쿼리 도구 사용 흐름

```
1. get_dbms_list로 사용 가능한 DB 연결 목록 확인 → connectionCode 획득
2. get_table_list로 테이블 검색 → TABLE_ID 획득
3. get_table_columns로 컬럼 구조 확인
4. execute_query로 SQL 실행
```

> **connectionCode 찾는 방법**: `get_dbms_list` 외에도 프로젝트의 `.mtsd` 파일에서
> `DataSources.Datas.ConnectionCode` 값을 참조하면 해당 보고서가 사용하는 DB 연결코드를 확인할 수 있습니다.

### Claude Code MCP 설정 예시

`.mcp.json` (프로젝트 루트):

```json
{
  "mcpServers": {
    "aud_mcp_server": {
      "command": "npx",
      "args": ["-y", "@bimatrix-aud-platform/aud_mcp_server@latest"]
    }
  }
}
```

> `.vscode/settings.json`에 `aud.config`가 있으면 `env` 설정 없이 자동으로 동작합니다.

---

## 추가 리소스

- **GitHub**: https://github.com/AUD-DEV-TEAM/i-AUD-Developer-Kit
- **README**: [README.md](README.md)
- **VS Code 설정**: [.vscode/settings.json](.vscode/settings.json)

---

## 문제 해결

### TypeScript 빌드 오류
- `tsconfig.json` 확인
- `node_modules` 재설치: `npm install`

### 서버 연결 오류
- `.vscode/settings.json`의 `aud.config` 설정 확인
- `ServiceURL`, `UserName`, `ApiKey` 확인

### 스크립트 배포 오류
- `tsc --w`로 빌드가 정상적으로 되고 있는지 확인
- `out/` 폴더에 `.js` 파일이 생성되었는지 확인
