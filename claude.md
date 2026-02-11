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
│       ├── iaud-module-create/        # 모듈 생성 가이드
│       ├── iaud-sql-guide/            # DataSource SQL 작성 가이드
│       ├── iaud-olap-formula/         # OLAP 수식 작성 가이드
│       └── iaud-formula/              # 계산수식(Formula) 작성 가이드
├── types/                     # API 타입 정의
│   ├── aud/                   # 클라이언트 스크립트 API
│   │   ├── control/           # UI 컨트롤 (Button, Grid, Chart 등)
│   │   ├── common/            # 공통 유틸리티
│   │   ├── data/              # DataSet, DataTable 등
│   │   └── enums/             # 열거형 타입
│   ├── com/                   # 서버 스크립트 API (Rhino)
│   │   └── matrix/
│   │       ├── script/        # Matrix, Connection, RecordSet 등
│   │       ├── olap/          # OLAP API
│   │       └── excel/         # Excel 처리 API
│   └── cfx/                   # Custom Extension Framework
├── src/
│   └── reports/               # 보고서 개발 폴더
│       ├── samples/           # 샘플 보고서
│       │   ├── 기능별샘플/     # 각 컨트롤 사용방법 샘플들
│       │   ├── 판매관리시스템/  # 영업판매관리 시스템 샘플
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

- **컨트롤**: [types/aud/control/](types/aud/control/)
  - [Matrix.ts](types/aud/control/Matrix.ts) - 핵심 Matrix API
  - [Button.ts](types/aud/control/Button.ts)
  - [DataGrid.ts](types/aud/control/DataGrid.ts)
  - [iGrid.ts](types/aud/control/iGrid.ts)
  - [OlapGrid.ts](types/aud/control/OlapGrid.ts)
  - [Chart.ts](types/aud/control/Chart.ts)
- **데이터**: [types/aud/data/](types/aud/data/)
  - [DataSet.ts](types/aud/data/DataSet.ts)
  - [DataTable.ts](types/aud/data/DataTable.ts)
- **공통**: [types/aud/common/](types/aud/common/)
- **열거형**: [types/aud/enums/](types/aud/enums/)

### 서버 API

TypeScript 인터페이스 정의: `types/com/`

- **핵심 스크립트**: [types/com/matrix/script/](types/com/matrix/script/)
  - [Matrix.ts](types/com/matrix/script/Matrix.ts) - 메인 Matrix API
  - [ScriptConnection.ts](types/com/matrix/script/ScriptConnection.ts) - DB 연결
  - [ScriptRecordSet.ts](types/com/matrix/script/ScriptRecordSet.ts) - 결과셋
  - [ScriptRequestPacket.ts](types/com/matrix/script/ScriptRequestPacket.ts) - 요청
  - [ScriptResponsePacket.ts](types/com/matrix/script/ScriptResponsePacket.ts) - 응답
- **파일 I/O**: [types/com/matrix/script/io/](types/com/matrix/script/io/)
- **Excel**: [types/com/matrix/script/excel/](types/com/matrix/script/excel/)
- **OLAP**: [types/com/matrix/olap/](types/com/matrix/olap/)

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

- **API 인터페이스 참조**: `types/aud/`, `types/com/` 폴더의 TypeScript 인터페이스를 참조
- **샘플 코드 참조**: `src/reports/samples/` 폴더의 실제 예제 참조
- **Skills 활용**: 각 영역별 전문 가이드(/iaud-client-script, /iaud-server-script 등) 참조

### 2. 파일 탐색 시

- **클라이언트 API**: `types/aud/control/`, `types/aud/data/`에서 컨트롤 및 데이터 API 확인
- **서버 API**: `types/com/matrix/script/`에서 서버 스크립트 API 확인
- **샘플**: `src/reports/samples/`에서 유사한 예제 검색

### 3. 질문 답변 시

- 프로젝트 구조 질문 → `/iaud-project-guide` 참조
- 클라이언트 개발 질문 → `/iaud-client-script` 참조
- 서버 개발 질문 → `/iaud-server-script` 참조
- 보고서 구조 질문 → `/iaud-report-structure` 참조
- SQL 작성 질문 → `/iaud-sql-guide` 참조
- OLAP 수식 질문 → `/iaud-olap-formula` 참조
- 컨트롤 계산수식 질문 → `/iaud-formula` 참조

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

#### 데이터베이스 쿼리 도구 (i-AUD 서버 프록시)

| 도구 | 설명 | 주요 파라미터 |
|------|------|--------------|
| `execute_query` | SQL 쿼리 실행 및 결과 반환 | `connectionCode`, `sql`, `limitRows`(기본100, 최대1000) |
| `get_table_list` | 메타 테이블에서 테이블/뷰 목록 조회 | `connectionCode`, `filter`(선택), `limitRows`(기본500) |
| `get_table_columns` | 특정 테이블의 컬럼 상세 정보 조회 | `connectionCode`, `tableId`(get_table_list의 TABLE_ID) |

### 쿼리 도구 사용 흐름

```
1. get_table_list로 테이블 검색 → TABLE_ID 획득
2. get_table_columns로 컬럼 구조 확인
3. execute_query로 SQL 실행
```

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
