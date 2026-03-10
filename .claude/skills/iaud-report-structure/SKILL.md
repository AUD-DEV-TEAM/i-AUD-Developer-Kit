---
name: iaud-report-structure
description: i-AUD 보고서(프로그램) 구조 가이드. .design.json, .mtsd 파일 구조와 프로그램 구성 요소를 설명합니다. "보고서 구조", "프로그램 구성", ".mtsd", ".design.json", "폴더 구조", "데이터소스", "서비스" 등을 물어볼 때 사용하세요.
---

# i-AUD 보고서(프로그램) 구조 가이드

## 1. 개요

i-AUD의 보고서(프로그램)는 하나의 폴더로 구성되며, UI 배치, 데이터소스, 서버 스크립트, 클라이언트 스크립트 등이 포함됩니다.

---

## 2. 보고서 폴더 구조

```
[보고서명]/
├── .design.json                     # 개발용 화면 정의 (스크립트/SQL은 파일 경로 참조) ★ AI는 이 파일 사용
├── [ReportCode].mtsd                # 화면 정의 - 서버 원본 (인라인 콘텐츠 포함)
├── [보고서명].script.ts             # 클라이언트 스크립트 (TypeScript)
├── [보고서명].script.js             # 클라이언트 스크립트 (JavaScript)
├── DataSource/                      # 데이터 조회 SQL
│   ├── DataSource1.sql
│   └── DataSource2.sql
└── ServerScript/                    # 서버 스크립트
    ├── Service1.ts                  # 일반 서비스
    ├── @CommonModule.ts             # 공통 모듈 (@로 시작)
    └── Service2.sql                 # SQL 서비스
```

---

---

## 4. .design.json / .mtsd 파일 구조

화면 UI 배치, 데이터소스, 서비스가 정의된 JSON 문서입니다.

- **`.design.json`**: **간소화된(compact) 개발용 파일** — AI는 이 파일을 우선 사용합니다.
  - 각 컨트롤의 **기본값과 동일한 속성은 생략**됩니다 (`Visible: true`, `Enabled: true`, 기본 폰트/색상 등)
  - ScriptText/SQL이 **파일 경로 참조**(예: `"./ServerScript/@XX.ts"`, `"./DataSource/DS1.sql"`)로 대체됩니다
  - 변경된 속성만 명시하면 서버에서 `expandDesignJson()`으로 기본값을 자동 복원합니다
- **`.mtsd`**: 서버 원본 — 모든 기본값 + 인라인 콘텐츠 포함. 직접 수정하지 않습니다.
- `.design.json`이 없는 기존 보고서는 `save_report` 또는 `pull_report` 실행 시 자동 생성됩니다.

> **간소화 규칙**: `.design.json`을 수정할 때 기본값과 동일한 속성은 생략해도 됩니다.
> 예를 들어 버튼의 배경색만 변경하면 `Style.Background.Color`만 명시하면 됩니다.
> 서버의 `expandDesignJson()`이 `Visible`, `Enabled`, 기본 폰트 등을 자동으로 채웁니다.

### 4.1 전체 구조

```json
{
  "ReportInfo": { ... },           // 보고서 기본 정보
  "DataSources": { ... },          // 데이터소스 정의
  "ScriptText": "...",             // 클라이언트 스크립트
  "ServerScriptText": [ ... ],     // 서버 스크립트 목록
  "Forms": [ ... ],                // 폼 및 컨트롤 정의
  "MetaDataSources": { ... },      // 메타 데이터소스
  "EXECUTION_PLANS": [ ... ],      // 실행 계획
  "Variables": [ ... ],            // 변수 정의
  "Modules": [ ... ],              // 모듈
  "ResponsiveLayout": [ ... ],     // 반응형 레이아웃
  "Langs": [ ... ],                // 다국어
  "PersonalConditions": { ... }    // 개인 조건
}
```

### 4.2 ReportInfo (보고서 정보)

```json
{
  "ReportInfo": {
    "ReportCode": "DYNAMIC_SQL",
    "FolderCode": "FLD72470E8B43AE41C796541322C57190D2",
    "SavePath": "FLD.../DYNAMIC_SQL.mtsd",
    "ReportName": "DYNAMIC_SQL 샘플",
    "Writer": "yglee",
    "WriteDate": "2025-06-12 17:10:04",
    "Editor": "yglee",
    "EditDate": "2025-06-12 17:10:04",
    "TabPosition": 0,
    "UsePersonalConditions": true,
    "DocumentVersion": "3.0.0.0",
    "RefreshType": 0
  }
}
```

### 4.3 DataSources (데이터소스)

```json
{
  "DataSources": {
    "Datas": [
      {
        "Id": "DS6CBDBEC3A3D74BC587F53426065035EF",
        "Name": "SAMPLE",
        "UseMeta": false,
        "UseCache": false,
        "ConnectionCode": "MTXRPTY",
        "Encrypted": "True",
        "DSType": 2,
        "SQL": "암호화된 SQL...",
        "Params": [],
        "Columns": []
      }
    ]
  }
}
```

| 필드 | 설명 |
|------|------|
| `Id` | 데이터소스 고유 ID |
| `Name` | 데이터소스 이름 |
| `ConnectionCode` | DB 연결 코드 |
| `DSType` | 데이터소스 유형 (0: SQL, 1: 서비스, 2: 스크립트) |
| `SQL` | 쿼리 (암호화됨) |
| `Params` | 파라미터 목록 |

### 4.4 ServerScriptText (서버 스크립트)

```json
{
  "ServerScriptText": [
    {
      "Name": "@DATA_MASTER",
      "Key": "DATA_MASTER",
      "Encrypted": true,
      "ScriptText": "암호화된 스크립트..."
    }
  ]
}
```

| 필드 | 설명 |
|------|------|
| `Name` | 스크립트 이름 (`@`로 시작하면 공통 모듈) |
| `Key` | 스크립트 키 |
| `Encrypted` | 암호화 여부 |
| `ScriptText` | 스크립트 내용 |

### 4.5 Forms (폼 및 컨트롤)

`.design.json`에서는 기본값이 생략된 간소화 형태로 저장됩니다:

```json
{
  "Forms": [
    {
      "Id": "FormC0C2A82A6DBFD5A92D650788A672B3BA",
      "Name": "Form1",
      "Activated": true,
      "Elements": [
        {
          "Type": "DataGrid",
          "Id": "DataGridF116CE7C4A9D3F1E3ED369B80D0F7D69",
          "Name": "DataGrid",
          "Position": {
            "Left": 10,
            "Top": 10,
            "Width": 2421,
            "Height": 924
          },
          "DataSource": "DS6CBDBEC3A3D74BC587F53426065035EF",
          "AutoRefresh": true
        }
      ]
    }
  ]
}
```

> **참고**: `Visible: true`, `Enabled: true`, `TabStop: true`, 기본 `Style`, `ZIndex: 0` 등 기본값은 생략 가능합니다.
> 기본값과 다른 속성만 명시하면 됩니다. 서버에서 `expandDesignJson()`이 자동으로 복원합니다.

**컨트롤 공통 속성:**

| 필드 | 설명 | 기본값 |
|------|------|--------|
| `Type` | 컨트롤 유형 (DataGrid, Button, TextBox 등) | (필수) |
| `Id` | 컨트롤 고유 ID | (필수) |
| `Name` | 컨트롤 이름 (스크립트에서 참조) | (필수) |
| `Visible` | 표시 여부 | `true` (생략 가능) |
| `Enabled` | 활성화 여부 | `true` (생략 가능) |
| `Position` | 위치 및 크기 | (필수) |
| `Style` | 스타일 정의 | 기본 스타일 (변경 시만 명시) |
| `DataSource` | 바인딩된 데이터소스 ID | `""` (생략 가능) |

---

## 5. 주요 컨트롤 유형

| Type | 설명 | 주요 속성 |
|------|------|----------|
| `DataGrid` | 데이터 그리드 | Columns, UsePaging, PageSize |
| `iGrid` | Excel 형식 그리드 | WorkSheets, Formulas |
| `OlapGrid` | OLAP 피벗 그리드 | Dimensions, Measures |
| `Chart` | 차트 | ChartType, Series |
| `Button` | 버튼 | Text, OnClick |
| `TextBox` | 텍스트 입력 | Text, MaxLength |
| `ComboBox` | 콤보박스 | Items, SelectedValue |
| `CheckBox` | 체크박스 | Checked |
| `Calendar` | 날짜 선택 | Value, Format |
| `Label` | 라벨 | Text |
| `Image` | 이미지 | Source |
| `Group` | 그룹 컨테이너 | Elements |
| `Tab` | 탭 컨트롤 | TabItems |

---

## 6. DataSource 폴더

`DataSource/` 폴더에는 데이터 조회용 SQL 파일들이 저장됩니다.

**파일명**: `DataSource/[DataSourceName].sql`

```sql
SELECT
    T1.D1 AS 제품명,
    T1.D2 AS 지점명,
    SUM(T1.M1) AS 판매수량
FROM MEX_USER_FILE_DATA T1
WHERE 1=1
    AND T1.META_FILE_CODE = 'RPT3048F89487B44C768239763DAC46B288'
    /* #[VS_KEYWORD]# */
GROUP BY T1.D1, T1.D2
```

**파라미터 바인딩:**
- `#[파라미터명]#` - 문자열 파라미터
- `##[파라미터명]##` - 숫자 파라미터

---

## 7. ServerScript 폴더

`ServerScript/` 폴더에는 서버 스크립트 파일들이 저장됩니다.

### 7.1 일반 서비스

**파일명**: `ServerScript/[ServiceName].ts`

각 파일이 하나의 서비스로 동작합니다.

### 7.2 공통 모듈

**파일명**: `ServerScript/@[ModuleName].ts`

`@`로 시작하는 파일은 공통 모듈로, 다른 스크립트에서 import하여 사용할 수 있습니다.

```typescript
// 다른 스크립트에서 사용
import { QueryRepository } from "../ServerScript/@DATA_MASTER";
//<%@include file="/REPORT_CODE/DATA_MASTER.jsx"%>
```

---

## 8. 클라이언트 스크립트 파일

**파일명**: `[보고서명].script.ts` 또는 `[보고서명].script.js`

- `.ts` 파일이 우선 탐색됩니다
- TypeScript로 작성 시 `.ts` 확장자 사용

---

## 9. 파일 간 관계

```
┌─────────────────────────────────────────────────────────────┐
│               .design.json / .mtsd (메인 문서)                 │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   DataSources   │  │ ServerScriptText │                  │
│  │   (데이터소스)   │  │   (서버스크립트)  │                  │
│  └────────┬────────┘  └────────┬────────┘                   │
│           │                    │                            │
│           ▼                    ▼                            │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │ DataSource/*.sql │  │ServerScript/*.ts│                  │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Forms (화면 정의)                    │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐             │   │
│  │  │ DataGrid │ │  Button  │ │ ComboBox │ ...         │   │
│  │  │(DataSource│ │(OnClick) │ │(Items)   │             │   │
│  │  │  바인딩)  │ │          │ │          │             │   │
│  │  └──────────┘ └──────────┘ └──────────┘             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              클라이언트 스크립트 참조                   │   │
│  │              [보고서명].script.ts                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

```

---

## 10. 개발 워크플로우

1. **i-AUD Designer**에서 보고서 생성/편집
2. **VS Code**에서 `AUD: Download Report`로 다운로드
3. **`pull_report` 실행** (서버 최신 상태 동기화)
4. 로컬에서 스크립트 수정 (.ts 파일)
5. `save_report`로 서버에 배포 (또는 `AUD: Publish Script` / `AUD: Deploy Report`)
6. `run_designer`로 브라우저에서 테스트 (또는 `AUD: Run Designer`)

---

## 11. 주의사항

### .design.json / .mtsd 파일
- AI는 **간소화된 `.design.json`**을 우선 사용 (기본값 생략 + 파일 경로 참조)
- `.design.json` 수정 시 기본값과 동일한 속성은 생략해도 됨 (서버에서 자동 복원)
- `.mtsd`는 서버 원본(모든 기본값 + 인라인 콘텐츠, 암호화됨) — 직접 수정하지 않음
- `.design.json`이 없으면 `save_report` 또는 `pull_report` 실행 시 자동 생성

### 스크립트 파일
- `DataSource/`, `ServerScript/` 폴더의 파일은 직접 편집 가능
- `save_report`로 서버에 배포 (또는 `AUD: Publish Script`)


---

## 12. 샘플 프로그램 위치

```
src/reports/samples/
├── MX_GRID/                    # Excel 형식 그리드 샘플
│   ├── (MX_GRID) Layout/
│   ├── (MX_GRID) Excel Import/
│   └── ...
├── OLAP/                       # OLAP 피벗 그리드 샘플
│   ├── (OlapGrid) 필터 제어하기/
│   └── ...
└── ETC/                        # 기타 샘플
    ├── AUD_Dynamic-SQL/
    ├── FTP Client/
    └── ...
```
