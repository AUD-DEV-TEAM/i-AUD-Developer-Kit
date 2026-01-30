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
│       └── iaud-module-create/        # 모듈 생성 가이드
├── src/
│   ├── com/                   # 서버 스크립트 API (Rhino)
│   │   └── matrix/
│   │       ├── script/        # Matrix, Connection, RecordSet 등
│   │       ├── olap/          # OLAP API
│   │       └── excel/         # Excel 처리 API
│   ├── aud/                   # 클라이언트 스크립트 API
│   │   ├── control/           # UI 컨트롤 (Button, Grid, Chart 등)
│   │   ├── common/            # 공통 유틸리티
│   │   ├── data/              # DataSet, DataTable 등
│   │   └── enums/             # 열거형 타입
│   └── reports/               # 보고서 개발 폴더
│       ├── samples/           # 샘플 보고서
│       │   ├── DataGrid/      # DataGrid 샘플들
│       │   ├── MXGrid/        # Excel 그리드 샘플들
│       │   ├── OlapGrid/      # OLAP 그리드 샘플들
│       │   └── Report/        # 기타 샘플들
│       └── [보고서폴더]/       # 실제 개발 보고서
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
7. `AUD: Save Script` (Ctrl+Alt+S)로 배포
8. `AUD: Run Designer` (Ctrl+Alt+D)로 테스트

### 2. 기존 보고서 수정

1. VS Code에서 `AUD: Import Report` 명령으로 최신 정보 동기화
2. 스크립트 수정
3. `AUD: Save Script`로 배포
4. `AUD: Run Designer`로 테스트

### 3. 주요 VS Code 명령어

| 명령어 | 단축키 | 설명 |
|--------|--------|------|
| `AUD: Download Report` | - | 서버에서 보고서 다운로드 |
| `AUD: Import Report` | - | 서버 최신 정보로 업데이트 |
| `AUD: Save Script` | `Ctrl+Alt+S` | 스크립트만 서버에 배포 |
| `AUD: Upload Report` | - | 디자인 포함 전체 배포 |
| `AUD: Run Designer` | `Ctrl+Alt+D` | 브라우저로 실행 |
| `AUD: Generate Starter Code` | - | TypeScript 기본 구조 생성 |
| `AUD: Execute Query` | `Ctrl+F5` | 선택한 SQL 실행 |
| `AUD: Generate Control Variables` | - | 컨트롤 변수 선언 생성 |

---

## 주요 규칙 및 컨벤션

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
let CALL_BACK: Function;
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

### SQL 파라미터 바인딩

```sql
SELECT * FROM TABLE
WHERE 1=1
    #[VS_KEYWORD]#        -- 문자열 파라미터
    ##[VS_AMOUNT]##       -- 숫자 파라미터
```

---

## API 참조 위치

### 클라이언트 API

TypeScript 인터페이스 정의: `src/aud/`

- **컨트롤**: [src/aud/control/](src/aud/control/)
  - [Matrix.ts](src/aud/control/Matrix.ts) - 핵심 Matrix API
  - [Button.ts](src/aud/control/Button.ts)
  - [DataGrid.ts](src/aud/control/DataGrid.ts)
  - [iGrid.ts](src/aud/control/iGrid.ts)
  - [OlapGrid.ts](src/aud/control/OlapGrid.ts)
  - [Chart.ts](src/aud/control/Chart.ts)
- **데이터**: [src/aud/data/](src/aud/data/)
  - [DataSet.ts](src/aud/data/DataSet.ts)
  - [DataTable.ts](src/aud/data/DataTable.ts)
- **공통**: [src/aud/common/](src/aud/common/)
- **열거형**: [src/aud/enums/](src/aud/enums/)

### 서버 API

TypeScript 인터페이스 정의: `src/com/`

- **핵심 스크립트**: [src/com/matrix/script/](src/com/matrix/script/)
  - [Matrix.ts](src/com/matrix/script/Matrix.ts) - 메인 Matrix API
  - [ScriptConnection.ts](src/com/matrix/script/ScriptConnection.ts) - DB 연결
  - [ScriptRecordSet.ts](src/com/matrix/script/ScriptRecordSet.ts) - 결과셋
  - [ScriptRequestPacket.ts](src/com/matrix/script/ScriptRequestPacket.ts) - 요청
  - [ScriptResponsePacket.ts](src/com/matrix/script/ScriptResponsePacket.ts) - 응답
- **파일 I/O**: [src/com/matrix/script/io/](src/com/matrix/script/io/)
- **Excel**: [src/com/matrix/script/excel/](src/com/matrix/script/excel/)
- **OLAP**: [src/com/matrix/olap/](src/com/matrix/olap/)

---

## 샘플 코드 위치

실제 구현 예제: [src/reports/samples/](src/reports/samples/)

### DataGrid 샘플
- [src/reports/samples/DataGrid/](src/reports/samples/DataGrid/)

### MXGrid (Excel 그리드) 샘플
- [src/reports/samples/MXGrid/](src/reports/samples/MXGrid/)

### OlapGrid (OLAP 그리드) 샘플
- [src/reports/samples/OlapGrid/](src/reports/samples/OlapGrid/)

### 기타 샘플
- [src/reports/samples/Report/](src/reports/samples/Report/)

---

## Claude Code 사용 시 참고 사항

### 1. 코드 작성 시

- **API 인터페이스 참조**: `src/aud/`, `src/com/` 폴더의 TypeScript 인터페이스를 참조
- **샘플 코드 참조**: `src/reports/samples/` 폴더의 실제 예제 참조
- **Skills 활용**: 각 영역별 전문 가이드(/iaud-client-script, /iaud-server-script 등) 참조

### 2. 파일 탐색 시

- **클라이언트 API**: `src/aud/control/`, `src/aud/data/`에서 컨트롤 및 데이터 API 확인
- **서버 API**: `src/com/matrix/script/`에서 서버 스크립트 API 확인
- **샘플**: `src/reports/samples/`에서 유사한 예제 검색

### 3. 질문 답변 시

- 프로젝트 구조 질문 → `/iaud-project-guide` 참조
- 클라이언트 개발 질문 → `/iaud-client-script` 참조
- 서버 개발 질문 → `/iaud-server-script` 참조
- 보고서 구조 질문 → `/iaud-report-structure` 참조

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

## 빌드 및 배포

### TypeScript 빌드

```bash
# 한 번만 빌드
npm run tsc

# Watch 모드 (자동 빌드)
tsc --w
```

### 서버 배포

- **스크립트만 배포**: `AUD: Save Script` (Ctrl+Alt+S)
- **전체 배포 (디자인 포함)**: `AUD: Upload Report`

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
