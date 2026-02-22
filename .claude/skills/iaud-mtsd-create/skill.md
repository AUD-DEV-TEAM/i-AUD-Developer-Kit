---
name: iaud-mtsd-create
description: i-AUD MTSD 문서 생성 가이드. 새 보고서의 .mtsd 파일을 처음부터 만들 때 사용합니다. build_mtsd(MtsdBuilder 스크립트)를 사용한 신규 문서 생성과 MCP 개별 도구를 사용한 기존 문서 수정을 포함합니다. "MTSD 만들기", "보고서 생성", "화면 만들기", "새 프로그램", "Element 추가" 등을 요청할 때 사용하세요.
---

# i-AUD MTSD 문서 생성 가이드

## 1. 개요

MTSD (.mtsd) 파일은 i-AUD 보고서의 화면 UI 배치, 데이터소스, 서비스를 정의하는 JSON 문서입니다.

### MTSD 생성 방식 선택

| 방식 | 도구 | 용도 | 권장 상황 |
|------|------|------|-----------|
| **빌더 스크립트** (1순위) | `build_mtsd` | JS 스크립트 1회 호출로 완전한 MTSD 생성 | **신규 보고서 생성** |
| **개별 MCP 도구** (2순위) | `generate_element` 등 | Element/DataSource를 하나씩 생성 | **기존 MTSD 부분 수정/추가** |

> **신규 문서는 `build_mtsd`를 우선 사용합니다.** 스크립트 1회 호출로 ID 자동 생성, 스키마 자동 준수, Group/DataGrid 중첩 처리가 모두 해결됩니다.

### MCP 도구 목록

| MCP 도구 | 용도 |
|----------|------|
| **`build_mtsd`** | **MtsdBuilder 스크립트를 실행하여 완전한 MTSD 문서 생성 (신규 보고서 1순위)** |
| `generate_element` | Element 1개 생성 (기존 문서에 추가할 때) |
| `generate_grid_column` | DataGrid의 GridColumn 배열 생성 |
| `generate_datasource` | DataSource 1개 생성 (기존 문서에 추가할 때) |
| `generate_uuid` | i-AUD 보고서용 UUID 생성 (prefix + 32자리 HEX) |
| `get_boxstyle_list` | BoxStyle 목록 조회 (Style.Type=1 사용 시 Name 키 확인) |
| `save_boxstyle` | BoxStyle 저장/수정 |
| `validate_mtsd` | 완성된 MTSD 문서 전체 검증 |
| `validate_part` | 부분 검증 (Element, DataSource 등 개별 검증) |
| `fix_mtsd` | MTSD 파일 자동 보정 (파일 경로 입력 → 읽고 수정 후 덮어쓰기) |

---

## 2. 신규 문서 생성 — build_mtsd (MtsdBuilder 스크립트)

### 2.1 아키텍처

```
AI → JS 스크립트 작성 (MtsdBuilder API 사용) → build_mtsd MCP 도구가 실행 → MTSD JSON 반환
```

- ID(ReportCode, DataSource Id, Element Id, Form Id) 모두 **자동 생성**
- Position, Style, Border, Font, Color 등 복잡한 스키마 객체 **내부 자동 처리**
- Group 내 Element의 `InGroup`/`ChildElements` **자동 설정**
- DataGrid 컬럼 **인라인 빌드** (addColumn 체이닝)
- SQL 파라미터 **자동 추출** (`@:PARAM`, `:PARAM`, `%:PARAM`)

### 2.2 기본 스크립트 예시

```js
const doc = new MtsdBuilder("판매실적 조회");

// DataSource
doc.addDataSource("DS_GRID", "AUD_SAMPLE_DB",
  "SELECT * FROM V_SALES WHERE YMD >= @:VS_YMD_FROM AND YMD <= @:VS_YMD_TO");

// 헤더 그룹
const header = doc.addGroup("GRP_HEADER", {
  dock: "left+right", height: 50, bg: "#F8F9FA",
  border: { thickness: "0,0,1,0", color: "#E0E0E0" }
});
header.addLabel("LBL_TITLE", "판매실적 조회", {
  left: 15, top: 10, width: 200, height: 30,
  font: { size: 16, bold: true, color: "#333333" }
});
header.addButton("BTN_SEARCH", "조회", {
  dock: "right", holdSize: true, width: 80, height: 30, top: 10,
  style: { type: 1, boxStyle: "BTN_DEFAULT" }
});

// 검색 조건 그룹
const search = doc.addGroup("GRP_SEARCH", {
  dock: "left+right", top: 50, height: 45
});
search.addLabel("LBL_FROM", "기간", { left: 15, top: 10, width: 40, height: 25 });
search.addCalendar("CAL_FROM", { left: 60, top: 10, width: 130, height: 25 });
search.addLabel("LBL_DASH", "~", { left: 195, top: 10, width: 20, height: 25, font: { align: "center" } });
search.addCalendar("CAL_TO", { left: 220, top: 10, width: 130, height: 25 });

// 그리드 (헤더+검색 아래 = top: 95)
const grid = doc.addDataGrid("GRD_MAIN", {
  dock: "left+right+bottom", top: 95, dataSource: "DS_GRID"
});
grid.addColumn("YMD", { header: "일자", width: 100, align: "center" });
grid.addColumn("PRODUCT_NAME", { header: "상품명", width: 150 });
grid.addColumn("QTY", { header: "수량", width: 80, format: "#,##0", align: "right" });
grid.addColumn("AMT", { header: "금액", width: 120, format: "#,##0", align: "right" });

return doc.build();
```

### 2.3 MtsdBuilder API 레퍼런스

#### MtsdBuilder (문서 레벨)

```
new MtsdBuilder(보고서명, opts?)
  ├── addDataSource(name, connection, sql, opts?)  → this
  ├── addVariable(name, value?, type?)             → this
  ├── setScript(text)                              → this
  ├── getReportCode()                              → string
  │
  │  ── Element 추가 메서드 (공통) ──
  ├── addGroup(name, opts?)        → GroupBuilder   (중첩 가능 컨테이너)
  ├── addDataGrid(name, opts?)     → DataGridBuilder (컬럼 체이닝)
  ├── addTreeGrid(name, opts?)     → DataGridBuilder
  ├── addCompactDataGrid(name, opts?) → DataGridBuilder
  ├── addLabel(name, text, opts?)  → this
  ├── addButton(name, text, opts?) → this
  ├── addTextBox(name, opts?)      → this
  ├── addNumberBox(name, opts?)    → this
  ├── addComboBox(name, opts?)     → this
  ├── addMultiComboBox(name, opts?) → this
  ├── addCheckBox(name, text, opts?) → this
  ├── addRadioButton(name, text, opts?) → this
  ├── addCalendar(name, opts?)     → this
  ├── addCalendarYear(name, opts?) → this
  ├── addCalendarYM(name, opts?)   → this
  ├── addChart(name, opts?)        → this
  ├── addPieChart(name, opts?)     → this
  ├── addScatterChart(name, opts?) → this
  ├── addPolygonChart(name, opts?) → this
  ├── addOlapGrid(name, opts?)     → this
  ├── addIGrid(name, opts?)        → this
  ├── addImage(name, opts?)        → this
  ├── addMaskTextBox(name, opts?)  → this
  ├── addRichTextBox(name, opts?)  → this
  ├── addPickList(name, opts?)     → this
  ├── addTree(name, opts?)         → this
  ├── addColorSelector(name, opts?) → this
  ├── addSlider(name, opts?)       → this
  ├── addFileUploadButton(name, text?, opts?) → this
  ├── addTab(name, opts?)          → this
  ├── addTableLayout(name, opts?)  → this
  ├── addUserComponent(name, opts?) → this
  ├── addWebContainer(name, opts?) → this
  ├── addDiagramControl(name, opts?) → this
  ├── addSlicer(name, opts?)       → this
  ├── addAddIn(name, opts?)        → this
  ├── addTreeView(name, opts?)     → this
  ├── addElement(type, name, opts?) → this   (범용)
  │
  ├── build()  → 완전한 MTSD JSON
  └── toJSON() → build() alias
```

#### GroupBuilder (그룹 컨테이너)

```
// addGroup()이 반환하는 빌더
GroupBuilder
  ├── addLabel / addButton / ... (MtsdBuilder와 동일한 Element 메서드)
  ├── addGroup(name, opts?) → GroupBuilder (중첩 그룹)
  ├── addDataGrid(name, opts?) → DataGridBuilder
  └── end() → 부모 반환 (체이닝 계속)
```

- 내부적으로 자식 Element에 `InGroup: 그룹ID` 자동 설정
- 그룹의 `ChildElements[]`에 자동 추가

#### DataGridBuilder (그리드 컬럼 빌더)

```
// addDataGrid() / addTreeGrid() / addCompactDataGrid()가 반환하는 빌더
DataGridBuilder
  ├── addColumn(name, opts?) → this
  └── end() → 부모 반환
```

**addColumn 옵션:**
| 옵션 | 설명 | 예시 |
|------|------|------|
| `header` | 표시명 (생략 시 name) | `"판매ID"` |
| `width` | 너비 (기본 100) | `150` |
| `type` | 컬럼 타입 | `"text"`, `"checkbox"`, `"combo"` |
| `align` | 텍스트 정렬 | `"left"`, `"center"`, `"right"` |
| `format` | 숫자 포맷 | `"#,##0"` |
| `editable` | 편집 가능 | `true` |
| `visible` | 표시 여부 | `false` |

### 2.4 공통 옵션 (모든 Element에 적용)

| 옵션 | 설명 | 예시 |
|------|------|------|
| `left, top, width, height` | 위치/크기 | `{ left: 10, top: 5, width: 200, height: 30 }` |
| `dock` | Docking 단축 표기 | `"left+right"`, `"fill"`, `"left+right+bottom"` |
| `margin` | Docking Margin | `"0,0,15,0"` |
| `holdSize` | HoldSize | `true` |
| `bg` | 배경색 (자동으로 Style.Type=2) | `"#F8F9FA"` |
| `border` | 테두리 | `{ thickness: "0,0,1,0", color: "#E0E0E0", radius: "4,4,4,4" }` |
| `font` | 폰트 | `{ size: 14, bold: true, color: "#333", align: "center" }` |
| `color` | 텍스트 색상 (font.color 단축) | `"#333333"` |
| `visible` | 표시 여부 | `false` |
| `style` | Style 직접 지정 | `{ type: 1, boxStyle: "BTN_DEFAULT" }` |
| `dataSource` | DataSource Name 바인딩 | `"DS_GRID"` |

> **스타일 자동 처리**: `bg`, `border`, `font`, `color` 중 하나라도 지정하면 자동으로 `Style.Type=2`(Custom)로 설정됩니다. `style: { type: 1, boxStyle: "..." }` 지정 시 BoxStyle 참조로 설정됩니다.

### 2.5 build_mtsd 호출 후 워크플로우

```
1. build_mtsd 호출 → MTSD JSON 반환
2. 반환된 JSON을 .mtsd 파일로 Write
3. fix_mtsd 실행 (자동 보정)
4. validate_part 또는 validate_mtsd로 검증
5. save_report → run_designer로 결과 확인
```

### 2.6 다양한 레이아웃 예시

#### 좌우 분할 레이아웃 (트리 + 그리드)

```js
const doc = new MtsdBuilder("조직별 실적 조회");

doc.addDataSource("DS_TREE", "AUD_SAMPLE_DB",
  "SELECT ORG_CODE, ORG_NAME, PARENT_CODE FROM CM_ORG");
doc.addDataSource("DS_GRID", "AUD_SAMPLE_DB",
  "SELECT * FROM V_PERFORMANCE WHERE ORG_CODE = @:VS_ORG_CODE");

// 좌측 트리 (고정 너비 250px)
doc.addTreeView("TRV_ORG", {
  dock: "left+right+bottom", width: 250, dataSource: "DS_TREE",
  margin: "0,0,0,0"
});

// 우측 그리드 (나머지 영역)
const grid = doc.addDataGrid("GRD_PERF", {
  dock: "left+right+bottom", dataSource: "DS_GRID",
  margin: "255,0,0,0"  // 좌측 트리 영역 피해서 배치
});
grid.addColumn("EMP_NAME", { header: "직원명", width: 100 });
grid.addColumn("SALES_AMT", { header: "매출액", format: "#,##0", align: "right" });

return doc.build();
```

#### 차트 + 그리드 대시보드

```js
const doc = new MtsdBuilder("매출 대시보드");

doc.addDataSource("DS_CHART", "AUD_SAMPLE_DB",
  "SELECT YM, SUM(AMT) AS TOTAL_AMT FROM V_SALES GROUP BY YM ORDER BY YM");
doc.addDataSource("DS_DETAIL", "AUD_SAMPLE_DB",
  "SELECT * FROM V_SALES WHERE YM = @:VS_YM");

// 상단 차트 영역
doc.addChart("CHT_TREND", {
  dock: "left+right", height: 300, dataSource: "DS_CHART"
});

// 하단 상세 그리드
const grid = doc.addDataGrid("GRD_DETAIL", {
  dock: "left+right+bottom", top: 305, dataSource: "DS_DETAIL"
});
grid.addColumn("YMD", { header: "일자", width: 100, align: "center" });
grid.addColumn("PRODUCT", { header: "상품", width: 150 });
grid.addColumn("AMT", { header: "금액", format: "#,##0", align: "right" });

return doc.build();
```

---

## 3. 기존 문서 부분 수정 — 개별 MCP 도구

기존 MTSD 파일에 Element나 DataSource를 추가할 때는 개별 MCP 도구를 사용합니다.

### 3.1 generate_element — Element 생성

간소화된 입력으로 스키마 준수 Element JSON을 생성합니다.

| 입력 | 설명 | 예시 |
|------|------|------|
| `type` | Element 타입 (필수) | `"Label"`, `"Button"`, `"DataGrid"` |
| `id` | Element ID (생략 시 자동) | `"LBL_TTL"` |
| `text` | 텍스트 (Label→Text, Button→Value) | `"판매실적 조회"` |
| `position` | 위치/크기 | `{ "left": 15, "top": 12, "width": 200, "height": 30 }` |
| `docking` | 도킹 단축 | `"left"`, `"left+right"`, `"fill"` |
| `font` | 폰트 단축 | `{ "size": 16, "bold": true, "color": "#333" }` |
| `background` | 배경색 | `"#F5F5F5"` |
| `border` | 테두리 | `"solid 1px #DDD"`, `"none"` |
| `color` | 텍스트 색상 | `"#333333"` |

**사용 예시:**
```
generate_element({
  type: "Label",
  id: "LBL_TTL",
  text: "판매실적 조회",
  position: { left: 15, top: 12, width: 200, height: 30 },
  font: { size: 16, bold: true, color: "#333333" },
  docking: "left"
})
```

### 3.2 generate_grid_column — GridColumn 배열 생성

```
generate_grid_column({
  columns: [
    { name: "CHK", header: "선택", type: "checkbox", width: 50 },
    { name: "SALES_ID", header: "판매ID", width: 100, align: "center" },
    { name: "CUST_NAME", header: "고객명", width: 150 },
    { name: "UNIT_PRICE", header: "단가", width: 100, format: "#,##0", align: "right" }
  ]
})
```

### 3.3 generate_datasource — DataSource 생성

```
generate_datasource({
  name: "GRD_SALES",
  connection: "AUD_SAMPLE_DB",
  sql: "SELECT SP.SALES_ID FROM SM_SALES_PERFORMANCE SP WHERE SP.SALES_DATE >= @:VS_YMD_FROM",
  columns: [
    { name: "SALES_ID", type: "string" },
    { name: "SALES_DATE", type: "string" }
  ]
})
```

- `params` 생략 시 SQL에서 `@:PARAM`, `:PARAM`, `%:PARAM` 패턴 자동 추출
- Id는 `DS` + 32자리 HEX로 자동 생성

### 3.3.1 ID 생성 규칙 (개별 도구 사용 시)

개별 MCP 도구로 Element를 추가할 때 ID는 `{타입접두사} + 32자리 대문자 HEX` 형식입니다. `generate_uuid` 도구를 사용하세요.

```
# 여러 prefix 일괄 생성
generate_uuid { items: [
  { prefix: "DS", count: 2 },
  { prefix: "Label", count: 3 },
  { prefix: "Button", count: 1 }
]}
```

> **build_mtsd 사용 시에는 ID가 자동 생성**되므로 generate_uuid가 필요 없습니다.

---

## 4. Docking 레이아웃 패턴

### 4.1 Docking 동작 원리

Docking은 컨트롤의 가장자리를 **부모 컨트롤 영역의 가장자리에 맞추는** 자동 맞춤 기능입니다.

- `Left: true` → 컨트롤의 왼쪽 가장자리를 부모의 왼쪽에 맞춤
- `Right: true` → 컨트롤의 오른쪽 가장자리를 부모의 오른쪽에 맞춤
- `Top: true` → 컨트롤의 **상단을 부모의 상단(0)**에 맞춤
- `Bottom: true` → 컨트롤의 **하단을 부모의 하단**에 맞춤

> **주의**: `Top: true`는 컨트롤의 Top 위치를 유지하는 것이 아니라, **부모 영역의 Top(0)에 맞추는 것**입니다. 마찬가지로 `Bottom: true`는 부모의 Bottom에 맞춥니다. 따라서 `fill`(모두 true)을 사용하면 부모 영역 전체를 덮게 됩니다.

### 4.2 기본 패턴

| 도킹 | Left | Right | Top | Bottom | 용도 |
|------|------|-------|-----|--------|------|
| `"none"` | F | F | F | F | 고정 위치/크기 |
| `"left"` | T | F | F | F | 왼쪽 고정 |
| `"right"` | F | T | F | F | 오른쪽 고정 |
| `"left+right"` | T | T | F | F | 좌우 확장 (헤더, 검색바, 고정 높이 그룹) |
| `"left+right+bottom"` | T | T | F | T | 좌우 확장 + 하단 채움 (**그리드, 본문 영역**) |
| `"fill"` | T | T | T | T | 부모 영역 전체 채움 (단독 배치 시만 사용) |
| `"bottom"` | F | F | F | T | 하단 고정 |

### 4.3 일반적인 화면 레이아웃

```
┌─────────────────────────────────────────┐
│  GRP_HEADER (docking: "left+right")     │  고정 높이 55
│  ├─ LBL_TTL (제목)                       │  Top: false
│  └─ BTN_SEARCH, BTN_SAVE (버튼)          │  Bottom: false
├─────────────────────────────────────────┤
│  GRP_SEARCH (docking: "left+right")     │  고정 높이 60~80
│  ├─ LBL_FROM, CAL_FROM (조건 1)          │  Top: false
│  └─ LBL_TO, CAL_TO (조건 2)              │  Bottom: false
├─────────────────────────────────────────┤
│  GRD_MAIN (docking: "left+right+bottom")│  나머지 영역
│  DataGrid                               │  Top: false ← 상단 위치 유지
│                                         │  Bottom: true ← 하단으로 확장
└─────────────────────────────────────────┘
```

### 4.4 Docking 선택 가이드

| 배치 유형 | 올바른 Docking | 설명 |
|-----------|---------------|------|
| 상단 고정 높이 그룹 (헤더, 검색바) | Left+Right | 좌우만 확장, 높이/위치 고정 |
| 하단 고정 높이 그룹 (푸터, 버튼바) | Left+Right+Bottom | 좌우 확장 + 하단 고정, 높이 고정 |
| 그리드/본문 (위에 헤더 있음) | **Left+Right+Bottom** | 좌우 확장 + 하단까지 채움, Top은 false로 상단 위치 유지 |
| 그리드/본문 (단독 배치) | fill | 부모 전체 채움 (위에 다른 요소가 없을 때만) |
| 그룹 내 고정 위치 컨트롤 | none | Label, Button 등 고정 크기 컨트롤 |

> **흔한 실수**: 헤더/검색바 아래에 그리드를 배치할 때 `fill`(모두 true)을 사용하면 그리드가 부모 전체를 덮어 헤더를 가립니다. 반드시 `Top: false`로 설정하여 그리드의 상단 위치를 유지해야 합니다.

### 4.5 Docking 부속 속성

Docking 객체에는 방향(Left/Right/Top/Bottom) 외에 추가 속성이 있습니다.

#### Margin — 부모 영역 안쪽 여백

도킹이 활성화된 방향에 대해 부모 가장자리와 컨트롤 사이의 **안쪽 여백(padding)**을 설정합니다.

- **형식**: `"Left,Top,Right,Bottom"` (픽셀 단위, 쉼표 구분 문자열)
- **기본값**: `"0,0,0,0"` (여백 없음)

```
부모 영역
┌──────────────────────────────────┐
│  ← Left margin                  │
│  ┌────────────────────────────┐  │
│  │  컨트롤 (도킹 적용)        │  │ ↑ Top margin
│  │                            │  │
│  │                            │  │
│  └────────────────────────────┘  │ ↓ Bottom margin
│                   Right margin → │
└──────────────────────────────────┘
```

**사용 예시:**

| Margin 값 | 의미 | 용도 |
|-----------|------|------|
| `"0,0,0,0"` | 여백 없음 | 기본값, 부모 가장자리에 딱 맞춤 |
| `"20,0,20,20"` | 좌·우·하 20px 여백 | 그리드에 좌우·하단 간격 부여 |
| `"20,75,20,20"` | 좌 20, 상 75, 우 20, 하 20 | 상단 헤더 영역(75px)을 피해 배치 |
| `"5,5,5,5"` | 전체 5px 여백 | 그룹 내부 컨트롤 균일 간격 |

#### HoldSize — 도킹 시 크기 유지 (위치만 이동)

- **타입**: `boolean` (기본값: `false`)
- `false`: 도킹 방향으로 컨트롤이 **늘어남** (기본 동작)
- `true`: 컨트롤의 원래 Width/Height를 **유지**하고, 도킹 방향의 가장자리에 **위치만 이동**

> **핵심**: `HoldSize: true`는 크기를 늘리지 않고 **위치만 조정**하는 것입니다. 예를 들어 버튼을 항상 화면 우측에 배치하고 싶을 때 `Right: true` + `HoldSize: true`를 사용하면, 화면 크기가 변해도 버튼이 오른쪽 가장자리에 맞춰 이동만 합니다.

**사용 예시:**

```
화면 너비 변경 시 HoldSize 동작 비교:

HoldSize: false (기본) — 크기가 늘어남
┌─────────────────────────────┐
│ [=========버튼=========]  ← │  Right: true → 우측에 맞추며 너비 확장
└─────────────────────────────┘

HoldSize: true — 위치만 이동
┌─────────────────────────────┐
│                    [버튼]  ← │  Right: true → 우측에 맞추되 원래 크기 유지
└─────────────────────────────┘
```

```json
// 버튼을 항상 우측에서 20px 떨어진 위치에 고정 (크기 변경 없이 이동만)
"Docking": { "Right": true, "HoldSize": true, "Margin": "0,0,20,0" }

// 패널을 우측에 도킹하되 원래 너비(460px) 유지
"Docking": { "Right": true, "Top": true, "Bottom": true, "HoldSize": true, "Margin": "20,75,20,20" }
```

**주요 활용 패턴:**

| 패턴 | 설정 | 용도 |
|------|------|------|
| 우측 고정 버튼 | `Right: true, HoldSize: true` | 조회/저장 버튼을 항상 화면 우측에 배치 |
| 우측 고정 패널 | `Right: true, Top: true, Bottom: true, HoldSize: true` | 상세 패널을 우측에 고정 너비로 배치 |
| 하단 고정 버튼 | `Bottom: true, HoldSize: true` | 버튼을 항상 하단에 배치 (높이 유지) |

#### MinWidth / MinHeight — 최소 크기

- **타입**: `number` (기본값: `0`)
- 도킹으로 크기가 줄어들 때 이 값 이하로는 줄어들지 않음
- 화면 축소 시 컨트롤이 너무 작아지는 것을 방지

---

## 5. Element 타입별 최소 패턴

### 5.1 Label

```json
{
  "Type": "Label", "Id": "LBL_TTL", "Name": "LBL_TTL",
  "Position": { "Left": 15, "Top": 12, "Width": 200, "Height": 30, "ZIndex": 1, "TabIndex": 0,
    "Docking": { "Left": false, "Right": false, "Top": false, "Bottom": false, "Margin": "0,0,0,0", "HoldSize": false, "MinWidth": 0, "MinHeight": 0 }
  },
  "Style": { "Type": 0, "BoxStyle": "", "Background": {}, "Border": { "CornerRadius": "0,0,0,0", "LineType": "none", "Thickness": "0,0,0,0" } },
  "LanguageCode": "", "Text": "제목", "Cursor": "default", "Formula": "",
  "UseTextOverflow": false, "UseAutoLineBreak": false, "LineSpacing": 1.2, "HasLineSpacing": true,
  "MxBinding": "", "MxBindingUseStyle": false
}
```

### 5.2 Button

```json
{
  "Type": "Button", "Id": "BTN_SEARCH", "Name": "BTN_SEARCH",
  "Position": { "Left": 10, "Top": 10, "Width": 80, "Height": 30, "ZIndex": 1, "TabIndex": 0,
    "Docking": { "Left": false, "Right": false, "Top": false, "Bottom": false, "Margin": "0,0,0,0", "HoldSize": false, "MinWidth": 0, "MinHeight": 0 }
  },
  "Style": { "Type": 0, "BoxStyle": "", "Background": {}, "Border": { "CornerRadius": "0,0,0,0", "LineType": "none", "Thickness": "0,0,0,0" } },
  "LanguageCode": "", "Value": "조회", "Cursor": "pointer", "HasNewRadius": true
}
```

### 5.3 DataGrid (최소)

```json
{
  "Type": "DataGrid", "Id": "GRD_MAIN", "Name": "GRD_MAIN",
  "Position": { "Left": 0, "Top": 100, "Width": 800, "Height": 400, "ZIndex": 1, "TabIndex": 0,
    "Docking": { "Left": true, "Right": true, "Top": false, "Bottom": true, "Margin": "0,0,0,0", "HoldSize": false, "MinWidth": 0, "MinHeight": 0 }
  },
  "Style": { "Type": 0, "BoxStyle": "", "Background": {}, "Border": { "CornerRadius": "0,0,0,0", "LineType": "none", "Thickness": "0,0,0,0" } },
  "CellMargin": "5,5,5,5", "Columns": [],
  "AutoRefresh": false, "DoRefresh": true, "DoExport": true,
  "ColumnHeaderHeight": 28, "RowHeight": 24, "ShowHeader": 3, "SelectRule": 2,
  "FontFamily": "inherit", "FontSize": 12
}
```

### 5.4 Group (컨테이너)

```json
{
  "Type": "Group", "Id": "GRP_HEADER", "Name": "GRP_HEADER",
  "Position": { "Left": 0, "Top": 0, "Width": 800, "Height": 55, "ZIndex": 1, "TabIndex": 0,
    "Docking": { "Left": true, "Right": true, "Top": false, "Bottom": false, "Margin": "0,0,0,0", "HoldSize": false, "MinWidth": 0, "MinHeight": 0 }
  },
  "Style": { "Type": 0, "BoxStyle": "", "Background": {}, "Border": { "CornerRadius": "0,0,0,0", "LineType": "none", "Thickness": "0,0,0,0" } },
  "ChildElements": []
}
```

### 5.5 ComboBox

```json
{
  "Type": "ComboBox", "Id": "CMB_STATUS", "Name": "CMB_STATUS",
  "Position": { "Left": 100, "Top": 10, "Width": 150, "Height": 25, "ZIndex": 1, "TabIndex": 0,
    "Docking": { "Left": false, "Right": false, "Top": false, "Bottom": false, "Margin": "0,0,0,0", "HoldSize": false, "MinWidth": 0, "MinHeight": 0 }
  },
  "Style": { "Type": 0, "BoxStyle": "", "Background": {}, "Border": { "CornerRadius": "0,0,0,0", "LineType": "none", "Thickness": "0,0,0,0" } },
  "DataSource": "", "Value": "", "Text": "", "InitType": 0, "RefreshType": 1,
  "IsReadOnly": false, "SortType": 0, "AutoRefresh": false, "DoRefresh": false, "AfterRefresh": "",
  "UseAllItems": false, "UseAllItemsText": "", "DisplayType": 0,
  "DataSourceInfo": { "LabelField": "", "ValueField": "" }, "InitValue": ""
}
```

---

## 6. 전체 생성 워크플로우

> **필수 규칙**: `.mtsd` 또는 `.sc` 파일을 생성하거나 수정할 때마다 반드시 **`fix_mtsd` → `validate_part`(또는 `validate_mtsd`)** 순서로 실행합니다. 속성 타입 오류(예: array를 string으로 기입)나 필수 속성 누락은 MCP 검증으로만 확인할 수 있습니다.

### 워크플로우 A: 신규 문서 — build_mtsd (권장)

```
Step 1: build_mtsd 호출 (MtsdBuilder 스크립트 전달)
         → 완전한 MTSD JSON 반환 (ID, 스키마 자동 처리)
Step 2: 반환된 JSON을 .mtsd 파일로 Write
Step 3: fix_mtsd 실행 (DataSource Name→Id 참조 보정 등)
Step 4: validate_part로 파트별 검증 (Forms, DataSources)
Step 5: save_report → run_designer로 결과 확인
```

### 워크플로우 B: 기존 문서 부분 수정 — 개별 MCP 도구

```
Step 1: 기존 .mtsd 파일 Read
Step 2: generate_element / generate_datasource / generate_grid_column으로 추가할 요소 생성
Step 3: 기존 JSON에 병합하여 Edit/Write
Step 4: fix_mtsd 실행 (자동 보정)
Step 5: validate_part로 파트별 검증 → 오류 발견 시 수정
```

### fix_mtsd 상세

```
fix_mtsd({ path: "D:/reports/sample/REPXXXXXXXX.mtsd" })
```

- **입력**: MTSD 파일의 **전체 경로** (디스크에 저장된 파일 대상)
- **동작**: 파일을 읽어 보정 규칙을 적용한 뒤 **파일을 덮어씁니다**
- **보정 규칙**:
  - DataSource Name→Id 참조 보정
  - OlapGrid DataSource 기반 Fields 자동 생성
  - Enum/Range 값 범위 초과 보정
  - Style.Type 자동 보정 (커스텀 색상인데 Type=0이면 Type=2로 변경)
- **반환값**: `{ fixed: boolean, fixCount: number, fixes: string[], errors: string[] }`

> **중요**: `fix_mtsd`는 파일을 직접 수정하므로 반드시 Write/Edit 이후에 실행하세요.

> **주의**: `validate_mtsd`(전체 검증)는 대용량 문서에서 AJV 성능 이슈로 타임아웃될 수 있습니다. 이 경우 `validate_part`로 파트별 검증을 권장합니다.

---

## 7. DataSource SQL 패턴

> SQL 파라미터 바인딩의 상세 규칙(변수 접두사, 특수 지시자, IN절, Dynamic SQL 등)은 **`/iaud-sql-guide`** 스킬을 참조하세요.

### 주요 바인딩 요약

```sql
SELECT * FROM TABLE
WHERE STATUS = :VS_STATUS              -- 문자열 바인딩 (자동 따옴표 처리)
  AND AMOUNT > :VN_MIN_AMT             -- 숫자 바인딩 (따옴표 없이 값 그대로)
  AND YMD >= @:VS_YMD_FROM             -- @: 빈 값이면 해당 라인 삭제
  AND NAME LIKE %:VS_KEYWORD%          -- %: LIKE 와일드카드 자동 포함
  AND USER_CODE = :VS_USER_CODE$       -- $: 서버 세션(인증) 값 사용
```

| 접두사/지시자 | 설명 |
|-------------|------|
| `:VS_` | 문자열 변수 (자동 따옴표 `'` 감싸짐) |
| `:VN_` | 숫자 변수 (따옴표 없이 값 그대로 치환) |
| `@:` | 빈 값이면 해당 **라인 전체를 삭제** (선택적 조건) |
| `%:` | LIKE 검색 와일드카드 자동 포함 |
| `$` (접미사) | 클라이언트 값 대신 **서버 세션 값** 사용 |

---

## 8. Style.Type과 커스텀 색상 규칙

### Style.Type 값과 동작

| Type | 이름 | 동작 |
|------|------|------|
| `0` | **Skin** | 스킨/테마 스타일 적용. **Background/Border/Font의 커스텀 색상이 무시됨** |
| `1` | **BoxStyle** | `Style.BoxStyle`에 지정한 박스스타일 적용 |
| `2` | **Custom** | Background/Border/Font의 **개별 색상값이 화면에 적용됨** |

### 핵심 규칙

> **배경색, 테두리, 폰트 색상을 커스텀할 때 반드시 `Style.Type`을 `2`(Custom)으로 설정해야 합니다.**
> Type이 `0`(Skin)이면 Background/Border/Font에 어떤 값을 설정해도 화면에 반영되지 않습니다.

### 올바른 예시 — 배경색을 파란색으로 변경

```json
"Style": {
  "Type": 2,
  "BoxStyle": "",
  "Background": { "Color": { "R": 0, "G": 100, "B": 200, "A": 255 } },
  "Border": { "CornerRadius": "0,0,0,0", "LineType": "none", "Thickness": "0,0,0,0" },
  "Font": {
    "Color": { "R": 255, "G": 255, "B": 255, "A": 255 },
    "Size": 12, "Family": "맑은 고딕", "Bold": false, "Italic": false,
    "UnderLine": false, "HorizontalAlignment": "center", "VerticalAlignment": "middle"
  }
}
```

### 잘못된 예시 — Type이 0이면 색상 무시됨

```json
"Style": {
  "Type": 0,
  "Background": { "Color": { "R": 0, "G": 100, "B": 200, "A": 255 } }
}
```
이 경우 배경색이 파란색으로 설정되어 있지만, Type이 `0`(Skin)이므로 실제 화면에는 스킨 기본 색상이 표시됩니다.

> **자동 보정**: `fix_mtsd`는 Background/Border/Font에 커스텀 색상이 설정되어 있는데 Type이 `0`(Skin)이면 자동으로 `2`(Custom)으로 보정합니다.

### BoxStyle (Type=1) 사용법

**BoxStyle**은 CSS 파일처럼 **서버에서 공통으로 관리되는 스타일 세트**입니다.
배경색, 테두리(색상/두께/라운드), 폰트(크기/굵기/색상/정렬)를 하나의 키(Name)로 묶어 관리하며, 여러 보고서에서 동일한 디자인을 일관되게 적용할 수 있습니다.
사용자가 서버 관리 화면에서 기존 BoxStyle을 수정하거나 새로운 BoxStyle을 추가할 수 있으므로, **반드시 `get_boxstyle_list` MCP 도구로 현재 서버의 BoxStyle 목록을 조회**하여 Name 키를 확인한 뒤 사용하세요.

**기본 BoxStyle 목록과 시각적 속성**:

| StyleName | 용도 | 배경 | 테두리 | 폰트 |
|-----------|------|------|--------|------|
| **Button Default** | 버튼 기본 | 밝은 회색(249,249,251) | 회색 solid 1px, 둥근모서리 4px | Bold 12px, 검정(48,48,49), 중앙정렬 |
| **Button Hover** | 버튼 마우스오버 | 연보라(238,238,243) | 회색 solid 1px, 둥근모서리 4px | Bold 12px, 검정, 중앙정렬 |
| **Button Disabled** | 버튼 비활성 | 진회색(218,218,222) | 회색 solid 1px, 둥근모서리 4px | Bold 13px, 연회색(170,170,172), 중앙정렬 |
| **Tab Default** | 탭 기본 | 투명 | 투명, 하단 3px | 13px, 회색(115,115,119), 중앙정렬 |
| **Tab Hover** | 탭 마우스오버 | 투명 | 파란색(66,97,242) 하단 1px | 13px, 회색, 중앙정렬 |
| **Tab Active** | 탭 활성 | 투명 | 파란색(66,97,242) 하단 3px | Bold 13px, 검정, 중앙정렬 |
| **Label Default** | 레이블 기본 | 투명 | 없음 | 12px, 검정(48,48,49), 중앙정렬 |
| **Textbox Default** | 텍스트박스 기본 | 흰색 | 회색 solid 1px, 둥근모서리 2px | 12px, 검정, 좌측정렬 |
| **Textbox Disabled** | 텍스트박스 비활성 | 연회색(230,230,234) | 회색 solid 1px, 둥근모서리 2px | 12px, 연회색(170,170,172), 좌측정렬 |
| **Infomation** | 정보 표시 영역 | 흰색 | 파란색(126,155,246) solid 1px | 12px, 회색(115,115,119), 중앙정렬 |
| **Header Title Active** | 헤더 타이틀 | 밝은 회색(249,249,251) | 회색 하단 1px | Bold 14px, 검정, 좌측정렬 |
| **Dialog Header** | 다이얼로그 헤더 | 어두운 회색(96,96,98) | 없음, 상단 둥근모서리 4px | Bold 14px, 흰색, 좌측정렬 |

> **주의**: 위 목록은 기본 제공되는 BoxStyle이며, Name(키) 값은 서버 환경마다 다를 수 있습니다. 사용자가 추가한 커스텀 BoxStyle도 있을 수 있으므로, 반드시 `get_boxstyle_list`로 조회한 Name을 사용하세요.

**BoxStyle 적용 예시**:

```json
"Style": {
  "Type": 1,
  "BoxStyle": "BTN_DEFAULT"
}
```

**새 BoxStyle 생성 (save_boxstyle)**:

기존 BoxStyle에 원하는 스타일이 없으면 `save_boxstyle`로 새로 만들 수 있습니다. 단일 객체 또는 배열로 여러 개를 한 번에 저장할 수 있습니다. Name은 StyleName 기반의 식별자(영문, 숫자, `_` 조합)로 지정합니다.

```
# 1. Name 결정 (StyleName 기반, UNIQUE)
StyleName "Card Header Blue" → Name: "CARD_HEADER_BLUE"

# 2. BoxStyle 저장
save_boxstyle {
  boxStyle: {
    "Name": "CARD_HEADER_BLUE",
    "StyleName": "Card Header Blue",
    "Background": { "ColorR": 66, "ColorG": 97, "ColorB": 242, "ColorA": 1 },
    "Border": {
      "ColorR": 50, "ColorG": 80, "ColorB": 220, "ColorA": 1,
      "CornerRadius": "4,4,0,0", "LineType": "solid", "Thickness": "0,0,0,0"
    },
    "Font": {
      "Bold": true, "ColorR": 255, "ColorG": 255, "ColorB": 255, "ColorA": 1,
      "Family": "inherit", "HorizontalAlignment": "left",
      "Italic": false, "Size": 14, "UnderLine": false, "VerticalAlignment": "middle"
    }
  }
}

# 3. Element에 적용
"Style": { "Type": 1, "BoxStyle": "CARD_HEADER_BLUE" }
```

> 기존 BoxStyle을 수정하려면 `get_boxstyle_list`로 조회한 Name을 그대로 사용하여 `save_boxstyle`을 호출하면 됩니다.

**사용 시점 판단**:
- 기본 컨트롤 스타일(버튼, 탭, 텍스트박스 등) → **Type=1 (BoxStyle)** 권장 (서버 공통 디자인 일관성)
- 사용자가 특정 색상을 직접 지정 → **Type=2 (Custom)** 사용
- 여러 보고서에서 재사용할 커스텀 스타일 → `save_boxstyle`로 새 BoxStyle 생성 후 **Type=1** 적용

---

## 9. 주의사항

1. **신규 문서는 build_mtsd 우선**: 신규 MTSD를 처음부터 만들 때는 `build_mtsd`(MtsdBuilder 스크립트)를 1순위로 사용합니다. ID 자동 생성, Group/InGroup 자동 처리, 스키마 자동 준수 등의 이점이 있습니다.
2. **ID/Name 규칙**: Id는 `{타입접두사}` + 32자리 UUID HEX. Name은 `{타입약어}_{용도}` 형식의 의미 있는 이름 (예: `LBL_TTL`, `BTN_SEARCH`, `GRD_MAIN`). **build_mtsd 사용 시 ID는 자동 생성**됩니다.
3. **Group 내 Element**: `build_mtsd` 사용 시 GroupBuilder가 `InGroup`/`ChildElements` 자동 처리. 개별 MCP 도구 사용 시에는 수동으로 Group의 `ChildElements[]`에 넣고, 자식 Element에 `"InGroup": "그룹ID"` 설정.
4. **DataGrid.DataSource**: DataSource의 `Id` 값이 아닌 `Name` 값을 사용
5. **MCP 검증 + 자동 보정 필수**: MTSD 파일을 **생성 또는 수정할 때마다** `fix_mtsd` → `validate_part`(또는 `validate_mtsd`) 순서로 실행합니다.
6. **속성 타입 확인**: 속성 타입이 불확실할 때는 `get_schema_info`로 정확한 타입을 확인한 후 값을 설정합니다.
7. **WriteDate/EditDate 패턴**: `YYYY-MM-DD HH:MM:SS` 형식이어야 하며, 빈 문자열은 허용되지 않음. **build_mtsd는 자동으로 현재 시간을 설정**합니다.
8. **Style.Type 필수 확인**: Background/Border/Font 색상을 변경할 때 반드시 `Style.Type`을 `2`(Custom)으로 설정 (섹션 8 참조). **build_mtsd에서 `bg`, `border`, `font`, `color` 옵션 사용 시 자동으로 Type=2 설정**됩니다.
