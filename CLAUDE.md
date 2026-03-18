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
│       ├── iaud-ts-conversion/        # TypeScript 전환 가이드
│       ├── iaud-grid-html-view/       # GridHtmlView 템플릿 가이드
│       ├── iaud-base-control/        # BaseControl HTML/CSS 커스텀 UI 가이드
│       ├── iaud-grid-guide/          # DataGrid/GroupGrid/TreeGrid 개발 가이드
│       └── iaud-olapgrid-guide/      # OlapGrid(OLAP 피벗 그리드) 개발 가이드
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
├── .design.json                # 개발용 화면 정의 (스크립트/SQL은 파일 경로 참조) ★ AI는 이 파일 사용
├── [ReportCode].mtsd           # 화면 UI 정의 - 서버 원본 (인라인 콘텐츠 포함)
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
├── .design.json                # 개발용 화면 정의 (파일 경로 참조)
├── [ReportCode].mtsd           # 화면 UI 정의 - 서버 원본 (인라인 콘텐츠)
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
| `/iaud-report-structure` | 보고서 구조 가이드 (.design.json, .mtsd) | 보고서 파일 구조, 데이터소스, 서비스 구성을 알아야 할 때 |
| `/iaud-module-create` | 모듈 생성 가이드 (.module.json) | 프로세스 봇 모듈을 만들어야 할 때 |
| `/iaud-sql-guide` | DataSource SQL 작성 가이드 | SQL 파라미터 바인딩, 변수 치환, Dynamic SQL 작성이 필요할 때 |
| `/iaud-olap-formula` | OLAP 수식 작성 가이드 | OlapGrid 계산 필드, ForAll/ForEach, 조건부 서식 수식 작성이 필요할 때 |
| `/iaud-formula` | 계산수식(Formula) 작성 가이드 | 컨트롤 수식, SUMIF, 그리드 컬럼 수식, 컨트롤 참조 연산이 필요할 때 |
| `/iaud-mxgrid-guide` | MX-GRID 개발 가이드 (엑셀 그리드) | MX-GRID 서버/클라이언트 스크립트, 예약어, AUD_xxx 함수, .ds 파일 수정이 필요할 때 |
| `/iaud-mtsd-create` | MTSD 보고서 화면 생성 (MCP 도구 활용) | 보고서 UI를 처음부터 만들거나, Element/DataSource 추가가 필요할 때 |
| `/iaud-boxstyle-guide` | BoxStyle 공통 스타일 활용 가이드 | BoxStyle 적용, 스타일 일괄 변경, Style.Type 설정, 컨트롤별 스타일 API가 필요할 때 |
| `/iaud-ts-conversion` | TypeScript 전환 가이드 (var→let/const, 타입) | 기존 .script.js를 .script.ts로 마이그레이션할 때 |
| `/iaud-grid-html-view` | GridHtmlView Add-in 템플릿 가이드 (HTML/CSS) | DataGrid 데이터를 카드 리스트, 입력 폼, 마스터-디테일 등 HTML/CSS로 표현할 때 |
| `/iaud-base-control` | BaseControl Add-in 가이드 (순수 HTML/CSS UI) | HTML/CSS로 자유롭게 커스텀 UI 개발, 탭 바, 리사이저블 패널, 대시보드 레이아웃 등을 만들 때 |
| `/iaud-extcomponent` | ExternalComponent 개발 가이드 (외부 라이브러리 래핑) | ECharts/CodeMirror 등 외부 JS 라이브러리를 래핑한 플러그인 컴포넌트를 만들 때 |
| `/iaud-grid-guide` | DataGrid/GroupGrid/TreeGrid 개발 가이드 | 그리드 CRUD, 행 추가/삭제, 셀 값 접근, 필터/정렬, 멀티헤더, 셀 서식, 페이징, 트리, 그룹 소계, 서버 데이터 전송이 필요할 때 |
| `/iaud-olapgrid-guide` | OlapGrid(OLAP 피벗 그리드) 개발 가이드 | OlapGrid 필드 관리, 필터/정렬, Write-Back(CRUD 저장), 이벤트, 멀티헤더, 디멘젼 그룹, 계층 그룹, 커스텀 디멘젼, 스타일링, 내보내기, 서버 스크립트 데이터 처리가 필요할 때 |

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

질문: "보고서 구조는 어떻게 되나요?"
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

질문: "보고서 화면을 처음부터 만들고 싶어요" / "새 MTSD 문서를 만들어줘"
→ /iaud-mtsd-create 스킬 참조 (build_mtsd 사용)

질문: "기존 MTSD에 버튼을 추가하려면?" / "DataSource를 하나 추가해줘"
→ /iaud-mtsd-create 스킬 참조 (개별 MCP 도구 사용)

질문: "기존 JavaScript 스크립트를 TypeScript로 변환하려면?" / "var를 let/const로 바꾸려면?"
→ /iaud-ts-conversion 스킬 참조

질문: "버튼에 BoxStyle을 적용하려면?" / "그리드 헤더 스타일을 일괄 변경하고 싶어요" / "Style.Type이 뭔가요?"
→ /iaud-boxstyle-guide 스킬 참조

질문: "그리드 데이터를 카드 형태로 보여주려면?" / "GridHtmlView 템플릿 만들어줘" / "마스터-디테일 폼 만들어줘"
→ /iaud-grid-html-view 스킬 참조

질문: "HTML로 커스텀 UI 만들고 싶어" / "BaseControl 사용법" / "탭 바 만들어줘" / "리사이저블 패널"
→ /iaud-base-control 스킬 참조

질문: "ECharts 차트 컴포넌트를 만들고 싶어" / "ExternalComponent 개발 방법" / "새 extcomponent 만들어줘"
→ /iaud-extcomponent 스킬 참조

질문: "그리드에 행을 추가하려면?" / "DataGrid CRUD 저장" / "TreeGrid 트리 펼치기" / "GroupGrid 소계" / "셀 색상 변경" / "그리드 필터" / "멀티헤더 설정"
→ /iaud-grid-guide 스킬 참조

질문: "OlapGrid 필터 설정" / "Write-Back 저장" / "OLAP 배분" / "피벗 필드 이동" / "디멘젼 그룹" / "OlapGrid 이벤트" / "OLAP 멀티헤더"
→ /iaud-olapgrid-guide 스킬 참조
```

---

## 개발 워크플로우

### ⚠️ 작업 전 반드시 Pull 먼저 실행

> **보고서 작업을 시작하기 전에 반드시 `pull_report`를 실행하여 서버의 최신 상태를 로컬에 동기화해야 합니다.**
> 다른 개발자나 Designer에서 변경한 내용이 서버에 있을 수 있으므로, Pull 없이 작업하면 서버의 최신 변경 사항을 덮어쓸 위험이 있습니다.
>
> - 서버에 해당 보고서가 아직 없는 경우(신규 보고서): `pull_report`가 "서버에 보고서가 없습니다 (새 보고서)" 메시지를 반환하며, 이는 정상입니다. 그대로 작업을 진행하면 됩니다.
> - 서버에 보고서가 있는 경우: MTSD, DataSource, ServerScript, JScript 등이 최신 상태로 갱신됩니다.

```
# AI(MCP)를 통한 Pull
pull_report { reportPath: "<보고서 폴더 경로>" }

# VS Code 명령
AUD: Pull Report
```

### 1. 새 보고서 개발

1. **i-AUD Designer**에서 보고서 생성 및 UI 배치
2. VS Code에서 `AUD: Download Report` 명령으로 다운로드
3. **`pull_report` 실행** (서버 최신 상태 동기화)
4. 스크립트 파일 확장자를 `.js` → `.ts`로 변경 (TypeScript 사용 시)
5. `AUD: Generate Starter Code`로 기본 구조 생성
6. 터미널에서 `tsc --w` 실행 (자동 빌드)
7. 스크립트 개발
8. `save_report`로 서버에 배포 (또는 `AUD: Publish Script` Ctrl+Alt+S)
9. `run_designer`로 브라우저에서 테스트 (또는 `AUD: Run Designer` Ctrl+Alt+D)

### 2. 기존 보고서 수정

1. **`pull_report` 실행** (서버 최신 상태 동기화 — 필수!)
2. 스크립트 수정
3. `save_report`로 서버에 배포 (또는 `AUD: Publish Script`)
4. `run_designer`로 브라우저에서 테스트 (또는 `AUD: Run Designer`)

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

### MTSD 신규 생성 시 build_mtsd 우선 사용

> 신규 MTSD 문서를 처음부터 만들 때는 **`build_mtsd`**(MtsdBuilder 스크립트)를 1순위로 사용합니다.
> MtsdBuilder는 ID 자동 생성, 스키마 자동 준수, Group/InGroup 자동 처리, DataGrid 컬럼 인라인 빌드 등을 지원합니다.
> 기존 MTSD에 Element/DataSource를 추가할 때는 `generate_element`, `generate_datasource` 등 개별 MCP 도구를 사용합니다.
> 상세 가이드는 `/iaud-mtsd-create` Skill 참조.

### .design.json vs .mtsd

> **`.design.json`**은 **간소화된(compact)** 보고서 디자인 파일입니다.
> `.mtsd`와 동일한 JSON 구조를 기반으로 하지만, 다음 두 가지 최적화가 적용됩니다:
>
> 1. **기본값 생략**: 각 컨트롤 타입의 기본값과 동일한 속성은 제거됩니다 (예: `Visible: true`, `Enabled: true`, 기본 폰트/색상 등)
> 2. **파일 경로 참조**: ScriptText/ServerScriptText/DataSource.SQL이 인라인 콘텐츠 대신 파일 경로(예: `"./ServerScript/@XX.ts"`, `"./DataSource/DS1.sql"`)로 대체됩니다
>
> **AI가 `.design.json`을 읽거나 수정할 때는 간소화된 형태를 유지합니다.**
> 기본값과 동일한 속성은 생략해도 서버에서 자동으로 복원(`expandDesignJson`)합니다.
> 즉, AI는 변경된 속성만 명시하면 되므로 파일이 훨씬 작고 가독성이 높습니다.
>
> `.mtsd`는 서버 원본(모든 기본값 + 인라인 콘텐츠 포함)을 그대로 유지하며, 직접 수정하지 않습니다.
>
> **`.design.json`이 없는 기존 보고서**: `save_report` 또는 `pull_report`를 한 번 실행하면 간소화된 `.design.json`이 자동 생성됩니다.
> 보고서 디자인 작업(UI 배치, 컨트롤 추가 등)이 필요한데 `.design.json`이 없으면, 먼저 `save_report` 또는 `pull_report` 실행을 안내하세요.
>
> **간소화/복원 흐름**:
> ```
> [서버 .mtsd (완전한 모델)]
>   ↓ compactDesignJson() — 기본값 제거
> [.design.json (간소화 + 파일 경로 참조)] ← AI가 읽고 수정하는 파일
>   ↓ expandDesignJson() — 기본값 복원
> [서버 .mtsd (완전한 모델)] — save_report 시 서버에서 자동 복원
> ```

### .design.json 수정 시 간소화 규칙

> `.design.json`을 수정할 때는 **간소화된 형태를 유지**합니다:
>
> - **기본값과 동일한 속성은 생략** — `Visible: true`, `Enabled: true`, `TabStop: true`, 기본 폰트(`"맑은 고딕"`, 9pt), 기본 색상(`"#000000"`) 등은 쓰지 않아도 됩니다
> - **변경된 속성만 명시** — 예를 들어 버튼의 배경색을 파란색으로 변경하면 `Style.Background.Color`만 작성
> - **서버가 기본값을 자동 복원** — `save_report` 시 서버의 `expandDesignJson()`이 누락된 기본값을 자동으로 채움
> - **파일 경로 참조 유지** — ScriptText, SQL, ServerScriptText는 인라인 콘텐츠 대신 파일 경로(`"./DataSource/DS1.sql"`) 사용
> - **GridHtmlView HTML/CSS는 `string[]`** — AddIn(GridHtmlView)의 `ComponentElement.HTML`과 `ComponentElement.CSS`는 줄 단위 배열(`string[]`)로 저장됩니다. 서버 저장 시 `expandDesignJson()`이 자동으로 단일 string으로 복원합니다. AI가 HTML/CSS를 수정할 때는 배열 형태를 유지합니다
> - **RichTextBox Value는 `string[]`** — RichTextBox의 `Value` 속성이 멀티라인 문자열인 경우 줄 단위 배열(`string[]`)로 저장됩니다. 서버 저장 시 `expandDesignJson()`이 자동으로 단일 string으로 복원합니다
>
> ```jsonc
> // ✗ 불필요한 기본값 포함 (비효율적)
> { "Type": "Button", "Name": "btn1", "Visible": true, "Enabled": true, "TabStop": true,
>   "Style": { "Font": { "Name": "맑은 고딕", "Size": 9, "Bold": false }, "Background": { "Color": "#1a73e8" } } }
>
> // ✓ 간소화 (기본값 생략, 변경된 것만 명시)
> { "Type": "Button", "Name": "btn1", "Style": { "Background": { "Color": "#1a73e8" } } }
> ```

### MTSD / SC / design.json 파일 수정 후 필수 작업

> `.design.json`, `.mtsd` 또는 `.sc` 확장자를 가진 AUD 보고서 파일의 내용을 수정한 경우, **반드시** 아래 두 단계를 순서대로 실행해야 합니다.

1. **`fix_mtsd`** (자동 보정) — DataSource Name→Id 참조 보정, OlapGrid Fields 자동 생성, Enum/Range 값 범위 보정, Style.Type 자동 보정 등을 수행
2. **`validate_mtsd`** 또는 **`validate_part`** (스키마 검증) — 수정된 문서가 MTSD 스키마를 준수하는지 확인

```
# MCP 도구 호출 순서
1. fix_mtsd     { path: "<파일경로>" }
2. validate_part { partName: "Forms", data: <Forms 배열> }   ← Forms 파트 검증
   validate_part { partName: "DataSources", data: <DataSources> }  ← DataSources 검증

# .design.json 파일 검증 시 format: "design" 사용
1. fix_mtsd     { path: "<.design.json 경로>" }
2. validate_part { partName: "Forms", data: <Forms 배열>, format: "design" }
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
- `'key' in obj` — `obj.key !== undefined` 또는 `obj.hasOwnProperty('key')` 사용
- Template literal (tsc가 변환), Arrow function (tsc가 변환) → 이 두 가지는 tsc 변환으로 안전

### MTSD Docking 주의사항

> MTSD 생성/수정 시 반드시 확인할 것. 상세 가이드는 `/iaud-mtsd-create` Skill 참조.

1. **Left/Right/Top/Bottom:true는 부모의 해당 가장자리(0)에 맞추는 것** — 컨트롤의 현재 위치를 유지하는 것이 아님
2. **좌우 분할 레이아웃**: 우측 패널에 `Left+Right` 도킹 시 반드시 `Margin: "{좌측패널Width},0,0,0"` 설정. 그렇지 않으면 좌측 패널을 덮음
3. **fill(모두 true)은 부모 전체를 덮음**: 위에 다른 요소(헤더 등)가 있으면 `Top:false`로 설정하여 상단 위치 유지
4. **Margin 형식**: `"Left,Top,Right,Bottom"` (픽셀 단위, 쉼표 구분 문자열). 도킹이 활성화된 방향에 대해 부모 가장자리와의 여백을 설정
5. **HoldSize는 Right/Bottom 도킹 전용**: HoldSize는 Right 또는 Bottom 기준으로 도킹하면서 Width/Height를 고정할 때만 사용. Left/Top 도킹에서는 HoldSize 불필요 (Left/Top은 자연스럽게 위치가 고정됨). 잘못된 예: `Top:true + HoldSize:true` → HoldSize 제거 필요

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

// 필수 변수 — 반드시 대문자 Matrix (런타임 자동 주입 변수, 소문자 matrix 사용 금지)
let Matrix: Matrix;

// 컨트롤 바인딩
let btn = Matrix.getObject("btnSearch") as Button;

// 이벤트 등록
btn.OnClick = btnSearchOnClick;

const btnSearchOnClick = function(sender, args) {
    // 버튼 클릭 로직
};
```

> **이벤트 핸들러 작성 시 반드시 `types/aud/control/` 타입 정의에서 args 구조를 확인한 후 사용합니다.**
> args에서 전달되는 객체(Row, Cell, Field 등)의 속성/메서드를 우선 사용하고, DataTable을 별도로 가져와 인덱스로 접근하는 간접 패턴은 지양합니다.
>
> ```typescript
> // ✗ 잘못된 코드 — args에 RowIndex가 없음, DataTable 간접 접근
> grd.OnCellClick = function(sender, args) {
>     let dt = grd.GetDataTable(0) as DataTable;
>     let value = dt.Rows[args.RowIndex].GetValue("COL");  // args.RowIndex 존재하지 않음
> };
>
> // ✓ 올바른 코드 — args.Row(DataGridRow)의 GetValue() 직접 사용
> grd.OnCellClick = function(sender, args) {
>     let value = args.Row.GetValue("COL");  // 이벤트가 전달한 Row 객체 직접 사용
> };
> ```

> **컨트롤 스타일 변경 시 반드시 컴포넌트 API를 우선 사용합니다.**
> `Control.Element`(HTMLDivElement)에 대한 직접 접근(`el.style.xxx`)은 최대한 금지합니다.
> 컴포넌트 API가 제공되지 않는 경우에만 Element 직접 접근을 허용합니다.
>
> ```typescript
> // ✗ 잘못된 코드 (Element DOM 직접 제어)
> let el = btn.Element;
> el.style.backgroundColor = '#1a73e8';
> el.style.color = '#fff';
>
> // ✓ 올바른 코드 (컴포넌트 Style API 사용)
> btn.Style.Background.Color.SetColor('#1a73e8');
> btn.Style.Font.Color.SetColor('#ffffff');
> btn.Style.Font.Bold = true;
> btn.Style.Border.Color.SetColor('#1a73e8');
> btn.Style.Border.Thickness = '0,0,2,0';
> btn.Update();  // 스타일 변경 후 반드시 Update() 호출
> ```

> **클라이언트 스크립트는 별도 iframe에서 실행됩니다.**
> `document`는 iframe 내부 document이므로, 전역 이벤트(mousemove, mouseup 등)를 걸려면 `parent.document`를 사용해야 합니다.
> ```typescript
> // ✗ 잘못된 코드 — iframe 내부 document, 마우스가 iframe 밖으로 나가면 이벤트 수신 불가
> document.addEventListener('mousemove', handler);
>
> // ✓ 올바른 코드 — 부모 document에 이벤트 등록
> parent.document.addEventListener('mousemove', handler);
> ```

> **AddIn/ExternalComponent 컴포넌트는 비동기 로딩 — 반드시 `OnComponentClassLoaded` 안에서 접근**
> AddIn(BaseControl, GridHtmlView)과 ExternalComponent는 비동기로 로딩됩니다.
> `getScriptClass()`, `SetValue()`, `GetValue()` 등 컴포넌트 내부 객체는 반드시 `OnComponentClassLoaded` 이벤트 안에서 접근해야 합니다.
> 이벤트 밖에서 호출하면 컴포넌트가 아직 로딩되지 않아 null이거나 동작하지 않습니다.
>
> ```typescript
> // ✗ 잘못된 코드 — 로딩 전 접근, null 반환
> let addIn = Matrix.getObject("myCtrl") as AddIn;
> let ctrl = addIn.getScriptClass() as BaseControl;  // null!
> ctrl.addHTML('<div>내용</div>');  // 오류
>
> // ✓ 올바른 코드 — OnComponentClassLoaded 안에서 접근
> let addIn = Matrix.getObject("myCtrl") as AddIn;
> addIn.OnComponentClassLoaded = function(sender, args) {
>     let ctrl = addIn.getScriptClass() as BaseControl;
>     ctrl.addCSS('.card { padding: 10px; }');
>     ctrl.addHTML('<div class="card">내용</div>');
> };
>
> // ExternalComponent도 동일 패턴
> let ec = Matrix.getObject("ecEditor") as any;  // ExternalComponent 타입 정의 없음, any 허용
> ec.OnComponentClassLoaded = function(sender, args) {
>     ec.SetValue(["코드 내용"]);
> };
> ```

> **API 타입 정의를 반드시 확인한 후 코드 작성 — `as any` 사용 금지**
> 클라이언트 스크립트에서 `Matrix.getObject()`로 가져온 컨트롤은 반드시 **구체적 타입으로 캐스트**합니다.
> 코드 작성 전에 `types/aud/control/`, `types/aud/ext/`, `types/aud/extcomponent/`에서 해당 컨트롤의 인터페이스를 읽어 사용 가능한 속성/메서드를 확인합니다.
> `as any`는 타입 오류를 감지 못하게 만들므로 금지합니다.
>
> | 컨트롤 | import 경로 | 캐스트 |
> |--------|------------|--------|
> | DataGrid | `@AUD_CLIENT/control/DataGrid` | `as DataGrid` |
> | Button, Label 등 | `@AUD_CLIENT/control/Button` | `as Button` |
> | ExternalComponent | `@AUD_CLIENT/extcomponent/ExternalComponent` | `as ExternalComponent` |
> | AddIn | `@AUD_CLIENT/ext/BaseControl` | `as AddIn` |
>
> ```typescript
> // ✗ 잘못된 코드 — any 타입, 존재하지 않는 메서드 호출해도 tsc가 잡지 못함
> let grid = Matrix.getObject("GRD") as any;
> grid.doSomethingWrong();  // 컴파일 통과하지만 런타임 오류
>
> // ✓ 올바른 코드 — 구체적 타입 캐스트, API 자동완성 + 오류 감지
> import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
> let grid = Matrix.getObject("GRD") as DataGrid;
> grid.Refresh();  // 타입 검증됨
>
> // ✓ ExternalComponent도 타입 캐스트
> import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";
> let ec = Matrix.getObject("ecEditor") as ExternalComponent;
> ec.OnComponentReady = function(sender, args) {
>     ec.SetValue(["코드 내용"]);
> };
> ```

> **기간(날짜 범위) 선택 시 CalendarFromTo 계열 컨트롤 사용 — Calendar 2개 배치 금지**
> 시작일~종료일 기간을 선택해야 하는 경우 전용 기간 달력 컨트롤을 사용합니다.
> Calendar 2개 + Label("~")을 배치하는 패턴은 사용하지 않습니다.
>
> | 용도 | 컨트롤 타입 | Builder 메서드 |
> |------|------------|---------------|
> | 일별 기간 | CalendarFromTo | `addCalendarFromTo()` |
> | 월별 기간 | CalendarYMFromTo | (MCP 개별 도구 사용) |
> | 주간 기간 | CalendarWeeklyFromTo | `addCalendarWeeklyFromTo()` |
> | 연도 기간 | CalendarYearFromTo | (MCP 개별 도구 사용) |
>
> ```typescript
> // ✗ 잘못된 패턴 — Calendar 2개 + Label 배치
> search.addLabel("LBL_FROM", "기간", { left: 15, top: 10, width: 40, height: 25 });
> search.addCalendar("CAL_FROM", { left: 60, top: 10, width: 130, height: 25 });
> search.addLabel("LBL_DASH", "~", { left: 195, top: 10, width: 20, height: 25 });
> search.addCalendar("CAL_TO", { left: 220, top: 10, width: 130, height: 25 });
>
> // ✓ 올바른 패턴 — CalendarFromTo 1개 사용
> search.addLabel("LBL_PERIOD", "기간", { left: 15, top: 10, width: 40, height: 25 });
> search.addCalendarFromTo("CAL_PERIOD", { left: 60, top: 10, width: 280, height: 25 });
> ```

#### 서버 스크립트

```typescript
// 필수 import
import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";

// 필수 변수 — 반드시 대문자 Matrix (런타임 자동 주입 변수, 소문자 matrix 사용 금지)
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
- GridHtmlView/카드 리스트/HTML 템플릿 질문 → `/iaud-grid-html-view` 참조
- BaseControl/커스텀 HTML UI/탭/패널 질문 → `/iaud-base-control` 참조
- ExternalComponent/외부 라이브러리 차트/컴포넌트 개발 질문 → `/iaud-extcomponent` 참조
- DataGrid/GroupGrid/TreeGrid 그리드 CRUD/이벤트/필터/정렬/셀 서식 질문 → `/iaud-grid-guide` 참조
- OlapGrid 필드/필터/정렬/Write-Back/이벤트/멀티헤더/디멘젼 그룹/스타일 질문 → `/iaud-olapgrid-guide` 참조

### 4. 일반적인 작업 패턴

#### 버튼 클릭 이벤트 처리
```typescript
// 클라이언트 스크립트
let btn = Matrix.getObject("btnSearch") as Button;
btn.OnClick = function(sender, args) {
    // 버튼 클릭 로직
};
```

#### 서버 스크립트 호출 (클라이언트에서)

> **RunScript/RunScriptEx 데이터 바인딩 필수 패턴:**
> - **서버**는 `res.CreateTable()` 또는 `res.WriteResponseText()`로 데이터를 출력만 담당한다.
> - **클라이언트**는 콜백의 `p.DataSet`을 받아 컨트롤에 직접 바인딩해야 한다.
> - RunScript 첫 번째 파라미터(gridNames)에 그리드명을 넣어도 **자동 바인딩되지 않는다**. 반드시 콜백에서 명시적으로 바인딩한다.
>
> **`p.DataSet`의 타입은 서버 출력 방식에 따라 달라진다:**
>
> | 서버 출력 방식 | `p.DataSet` 타입 | 클라이언트 사용법 |
> |---|---|---|
> | `res.CreateTable(name, dbms, sql)` | DataSet 객체 | `grid.SetDataSet(p.DataSet)` |
> | `res.WriteResponseText(JSON.stringify({...}))` | 파싱된 JSON 객체 | `let obj = p.DataSet;` 직접 속성 접근 |

```typescript
// 패턴 1: DataSet 반환 → 그리드 바인딩
// 서버
res.CreateTable("GRD_RESULT", "AUD_SAMPLE_DB", sql);
// 클라이언트
Matrix.RunScriptEx("", "ServiceName", params, function(p) {
    if (!p.Success) { Matrix.Alert(p.Message); return; }
    let grid = Matrix.getObject("GRD_RESULT") as DataGrid;
    grid.SetDataSet(p.DataSet);
});
```

```typescript
// 패턴 2: JSON 직접 출력 → 객체로 수신
// 서버
Matrix.getResponse().WriteResponseText(
    JSON.stringify({ "CODE": "code123", "NAME": "json" })
);
// 클라이언트
Matrix.RunScriptEx("", "ServiceName", params, function(p) {
    if (!p.Success) { Matrix.Alert(p.Message); return; }
    let result = p.DataSet;  // { CODE: "code123", NAME: "json" }
    Matrix.Alert(result.CODE);
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
- **MCP를 통한 배포**: `save_report` 도구 사용 (AI가 직접 보고서를 서버에 배포)
- **MCP를 통한 Pull**: `pull_report` 도구 사용 (AI가 서버에서 최신 보고서를 로컬로 동기화)
- **MCP를 통한 Designer 실행**: `run_designer` 도구 사용 (AI가 브라우저에서 Designer를 열어 결과 확인)

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
| **`build_mtsd`** | **MtsdBuilder 스크립트를 실행하여 완전한 MTSD 문서 생성. 신규 보고서 생성 시 1순위 도구** |
| `validate_mtsd` | MTSD 또는 .design.json 문서 전체 스키마 검증. `format: "design"` 지정 시 간소화 스키마(기본값 생략 허용)로 검증 |
| `validate_part` | MTSD 또는 .design.json 문서의 특정 부분만 검증. `format: "design"` 지정 시 간소화 스키마로 검증 |
| `validate_module` | 모듈 JSON (.module.json) 스키마 검증 |
| `get_schema_info` | 특정 타입의 스키마 정보 조회 (필수/선택 속성, 설명) |
| `get_element_types` | 사용 가능한 Element 타입 목록 |
| `get_root_structure` | MTSD 루트 구조 조회 |
| `generate_element` | 간소화 입력으로 Element JSON 생성. `compact: true`로 .design.json용 간소화 출력 |
| `generate_grid_column` | 간소화 입력으로 GridColumn 배열 생성. `compact: true`로 .design.json용 간소화 출력 |
| `generate_datasource` | 간소화 입력으로 DataSource JSON 생성. `compact: true`로 .design.json용 간소화 출력 |
| `fix_mtsd` | MTSD 파일 자동 보정 (Name→Id 참조, Params, Columns 등) |
| `get_control_info` | MTSD 파일에서 컨트롤 Name↔Type 매핑 추출 |
| `generate_uuid` | i-AUD 보고서용 UUID 생성 (prefix + 32자리 HEX). 단일/다수/일괄 생성 지원 |

```
# build_mtsd 사용 흐름 (신규 MTSD 생성)
1. AI가 MtsdBuilder API를 사용하는 JS 스크립트 작성
2. build_mtsd { script: "const doc = new MtsdBuilder('보고서명'); ... return doc.build();" }
3. 반환된 MTSD JSON을 .design.json 파일로 Write (없으면 .mtsd)
4. fix_mtsd → validate_part로 보정 및 검증
5. save_report → run_designer로 결과 확인

# MtsdBuilder의 이점
- ID 자동 생성 (ReportCode, DataSource Id, Element Id, Form Id)
- Group/InGroup 자동 설정, DataGrid 컬럼 인라인 빌드
- Position, Style, Border, Font, Color 등 스키마 복잡성 내부 처리
- SQL 파라미터 자동 추출
- 36개 전체 Element 타입 지원
```

#### OLAP 도구

| 도구 | 설명 |
|------|------|
| `generate_olap_fields` | OlapGrid의 iOLAPView.Fields 배열 생성. 컬럼 정의를 입력하면 Dimension/Measure 자동 분류, Area 자동 배치, SummaryType 설정 완료된 OlapField 배열 반환. `compact: true`로 간소화 출력 |

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

#### 보고서 배포/동기화 도구

| 도구 | 설명 |
|------|------|
| `save_report` | 보고서를 i-AUD 서버에 저장(Publish). 로컬 → 서버 방향 |
| `pull_report` | i-AUD 서버에서 보고서의 최신 내용을 가져옴. 서버 → 로컬 방향 |
| `run_designer` | i-AUD Designer를 브라우저에서 실행. save_report 후 결과 확인용 |

```
# save_report 사용 흐름 (로컬 → 서버)
1. reportPath: .design.json 또는 .mtsd 파일이 있는 보고서 폴더 경로 지정
2. build: true로 설정하면 서버 전송 전 tsc 빌드 실행 (선택, 기본 false)
3. 서버 저장 성공 시 .mtsd 및 .design.json 파일이 갱신되고, 새 DataSource/ServerScript 파일이 생성됨

# save_report 파라미터
- reportPath (필수): 보고서 폴더 경로 (예: "D:/project/src/reports/Work/MY_REPORT")
- build (선택): TypeScript 빌드 실행 여부 (기본: false)

# save_report 동작 순서
1. .design.json(없으면 .mtsd/.sc) 파일에서 ReportInfo.ReportCode, ReportName 읽기
2. 같은 파일에서 ReportModel(화면 UI 정의) 읽기
3. DataSource/ 폴더에서 .sql/.js/.ts 파일 수집
4. ServerScript/ 폴더에서 .ts(빌드된 .js)/.js/.json 파일 수집
5. .script.ts → 빌드된 .script.js 또는 .script.js 에서 클라이언트 스크립트 수집
6. .out 폴더와 비교하여 삭제된 DataSource/ServerScript 감지
7. 서버에 전송
8. 서버 응답으로 .mtsd 및 .design.json 파일 갱신, 새 파일 생성
```

```
# pull_report 사용 흐름 (서버 → 로컬)
1. reportPath: .design.json 또는 .mtsd 파일이 있는 보고서 폴더 경로 지정
2. .design.json(없으면 .mtsd/.sc)에서 ReportInfo.ReportCode를 읽어 서버에 요청
3. 서버 응답으로 로컬 파일 갱신:
   - .mtsd 및 .design.json 파일 갱신 (없으면 생성)
   - DataSource/ 폴더에 새 .sql 파일 생성 (이미 존재하면 skip)
   - ServerScript/ 폴더에 새 .js 파일 생성 (이미 존재하면 skip)
   - .script.ts/.script.js가 없으면 서버의 JScript로 .script.js 생성

# pull_report 파라미터
- reportPath (필수): 보고서 폴더 경로 (예: "D:/project/src/reports/Work/MY_REPORT")
```

```
# run_designer 사용 흐름
1. reportPath: .design.json 또는 .mtsd 파일이 있는 보고서 폴더 경로 지정
2. .design.json(없으면 .mtsd/.sc)에서 ReportInfo.ReportCode를 읽고, 서버 설정에서 ServiceURL을 가져옴
3. {ServiceURL}/AUD/designer.jsp?id={ReportCode} URL로 브라우저 실행
4. Chrome 우선 실행, 실패 시 Edge로 fallback

# run_designer 파라미터
- reportPath (필수): 보고서 폴더 경로 (예: "D:/project/src/reports/Work/MY_REPORT")

# 일반적인 사용 순서
1. pull_report  → 서버 최신 상태 동기화
2. (코드 수정)
3. save_report  → 서버에 저장
4. run_designer → 브라우저에서 결과 확인
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
