---
name: iaud-grid-html-view
description: i-AUD GridHtmlView Add-in 컴포넌트 가이드. DataGrid 데이터를 HTML/CSS 템플릿으로 렌더링하는 컴포넌트입니다. "카드 리스트", "HTML 뷰어", "입력 폼", "GridHtmlView 템플릿", "그리드 HTML", "카드형 레이아웃", "마스터 디테일" 등을 요청할 때 사용하세요.
---

# i-AUD GridHtmlView Add-in 컴포넌트 가이드

## 1. 개요

**GridHtmlView**는 DataGrid에 출력된 데이터를 HTML 템플릿과 CSS로 자유롭게 시각화하는 i-AUD Add-in 컴포넌트입니다.

- **카드형 리스트**, **마스터-디테일 폼**, **입력 폼**, **커스텀 테이블** 등 HTML/CSS로 표현 가능한 모든 UI를 만들 수 있습니다.
- Shadow DOM을 사용하여 CSS가 외부와 격리됩니다.
- 데이터 바인딩, 이벤트 연결, 양방향 바인딩(입력 → 그리드 데이터 업데이트)을 지원합니다.
- 페이징, 현재 행 추적(CURRENT_ROW), 조건부 렌더링 등 고급 기능을 제공합니다.

### 아키텍처

```
DataGrid 데이터 → GridHtmlRenderer (템플릿 엔진) → Shadow DOM (HTML + CSS 렌더링)
     ↕                                                    ↕
  셀 값 변경 ← aud-model 양방향 바인딩 ← input/checkbox 사용자 입력
```

---

## 2. MTSD 구성 (ComponentElement)

GridHtmlView는 Add-in 타입 Element로 MTSD에 정의됩니다.

```json
{
  "Type": "AddIn",
  "Id": "AddIn12D536A48D93A29DF35BB333274916A4",
  "Name": "GridViewer", 
  "ComponentType": "GridHtmlView",
  "ComponentElement": {
    "DataGridId": "DG_EMP_01",
    "HTML": "<div class=\"card-grid\">...</div>",
    "CSS": ".card-grid { display:flex; ... }"
  },
  "Position": { ... },
  "Style": { ... }
}
```

| 속성 | 설명 |
|------|------|
| `ComponentType` | `"GridHtmlView"` (고정) |
| `DataGridId` | 연결할 DataGrid의 Name 또는 Id |
| `HTML` | HTML 템플릿 문자열 (AUD 디렉티브 포함) |
| `CSS` | CSS 스타일시트 문자열 |

> **DataGridId**는 Name 또는 Id 모두 사용 가능합니다. 내부적으로 `findGridByNameOrId()`로 검색합니다.

### build_mtsd로 AddIn 생성

```js
const doc = new MtsdBuilder("판매 카드 뷰어");

const grid = doc.addDataGrid("GRD_SALES", {
  dock: "left+right+bottom", top: 0, dataSource: "DS_SALES"
});
grid.addColumn("SALES_ID", { header: "판매ID", width: 100 });
grid.addColumn("PROD_NAME", { header: "상품명", width: 150 });
// ...

// GridHtmlView AddIn
doc.addAddIn("GRID_VIEWER", {
  dock: "left+right+bottom", top: 0,
  componentType: "GridHtmlView",
  componentElement: {
    DataGridId: "GRD_SALES",
    HTML: TEMPLATE_HTML,
    CSS: TEMPLATE_CSS
  }
});

return doc.build();
```

---

## 3. 클라이언트 스크립트 API

### 3.1 기본 사용

```typescript
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix: Matrix;
let grid = Matrix.getObject("GRD_SALES") as DataGrid;
let viewer = Matrix.getObject("GridViewer") as any;  // AddIn 컴포넌트

// HTML/CSS는 MTSD의 ComponentElement에 설정되어 있으므로
// DataGrid 바인딩만 하면 자동으로 OnDataChanged, OnCurrentRowChanged에 연동됩니다.
```

### 3.2 스크립트에서 HTML/CSS 동적 변경

```typescript
// HTML 템플릿 동적 설정
viewer.HTML = '<div class="card" AUD-FOR="ROWS"><span AUD-BIND="PROD_NAME"></span></div>';
viewer.CSS = '.card { padding:10px; border:1px solid #ddd; }';

// DataGrid 변경 (자동으로 MTSD에 저장된 그리드에 연결됨)
viewer.DataGrid = Matrix.getObject("OTHER_GRID") as DataGrid;
```

### 3.3 이벤트 함수 등록

```typescript
// addFunction(함수명, 콜백) → 템플릿의 AUD-ON-{event}="함수명"과 연결
viewer.addFunction("SHOW_DETAIL", function(row, rowIndex, event) {
    Matrix.Alert("판매ID: " + row.SALES_ID + "\n상품: " + row.PROD_NAME);
});

viewer.addFunction("DELETE_ROW", function(row, rowIndex, event) {
    Matrix.Confirm("삭제하시겠습니까?", "확인", function(ok) {
        if (ok) {
            let grid = Matrix.getObject("GRD_SALES") as DataGrid;
            grid.RemoveRowAt(rowIndex, true);
            grid.Calculate();
        }
    }, 0);
});
```

### 3.4 이벤트

| 이벤트 | 설명 |
|--------|------|
| `OnResize` | 컴포넌트 크기 변경 시 |
| `OnUpdate` | 컴포넌트 업데이트 시 |
| `OnContextMenuOpening` | 우클릭 컨텍스트 메뉴 열릴 때 |

> DataGrid의 `OnDataChanged`와 `OnCurrentRowChanged`는 내부적으로 자동 바인딩됩니다.

---

## 4. 템플릿 디렉티브 레퍼런스

모든 디렉티브 속성명과 값은 **대/소문자를 구분하지 않습니다**.
템플릿 작성 시 가독성을 위해 **대문자**로 작성하는 것을 권장합니다.

> **참고**: HTML은 `DOMParser`로 파싱되므로 속성명이 자동으로 소문자 변환됩니다. 엔진 내부에서 모든 비교가 `.toLowerCase()`로 처리됩니다.

### 4.1 AUD-FOR — 반복 (Loop)

지정된 컬렉션을 반복하여 자식 요소를 복제합니다.

| 값 | 설명 | 컨텍스트 변수 |
|----|------|--------------|
| `ROWS` | 그리드의 모든 행 반복 | `row`, `rowIndex` |
| `COLUMNS` | 그리드의 모든 컬럼 반복 | `column`, `colIndex` |
| `PAGES` | 페이저의 페이지 번호 반복 | `page`, `pageIndex` |
| `CURRENT_ROW` | 현재 선택된 행 1건 (마스터-디테일용) | `row`, `rowIndex` |

```html
<!-- 행 반복 -->
<div class="card" AUD-FOR="ROWS">
  <span AUD-BIND="PROD_NAME"></span>
</div>

<!-- 컬럼 반복 (동적 테이블 헤더) -->
<th AUD-FOR="COLUMNS" AUD-BIND="HEADER"></th>

<!-- 페이지 번호 반복 -->
<button AUD-FOR="PAGES" AUD-BIND="NUM" AUD-ACTION="PAGE" AUD-CLASS="ACTIVE:active"></button>

<!-- 현재 행 (마스터-디테일 폼) -->
<div class="detail" AUD-FOR="CURRENT_ROW">
  <input type="text" AUD-MODEL="PROD_NAME" />
</div>
```

**ROWS 반복 시 자동 속성**: 각 복제 요소에 `data-aud-row-index="N"` 속성이 자동 추가됩니다.
**CURRENT_ROW 반복 시**: `data-aud-current-row` 속성이 자동 추가됩니다. 행 선택 변경 시 `updateCurrentRow()`가 이 섹션만 부분 교체합니다.

### 4.2 AUD-BIND — 텍스트 바인딩

요소의 `textContent`를 데이터 값으로 치환합니다.

| 값 | 설명 | 사용 가능 컨텍스트 |
|----|------|-------------------|
| `필드명` | 행 데이터의 해당 필드 값 | ROWS, CURRENT_ROW |
| `HEADER` | 컬럼의 표시명 (Caption) | COLUMNS |
| `FIELD` | 컬럼의 필드명 (Name) | COLUMNS |
| `VALUE` | 현재 행의 현재 컬럼 값 | COLUMNS (ROWS 내부) |
| `@INDEX` | 현재 인덱스 (0부터) | 모든 반복문 |
| `@ROWNUM` | 행 번호 (1부터) | ROWS |
| `NUM` | 페이지 번호 | PAGES |
| `ACTIVE` | 현재 행이면 "true", 아니면 "" | ROWS |
| `CURRENTPAGE` | 현재 페이지 번호 | 전역 (pager) |
| `LASTPAGE` | 마지막 페이지 번호 | 전역 (pager) |
| `TOTALCOUNT` | 전체 레코드 수 | 전역 (pager) |

```html
<span AUD-BIND="SALES_ID"></span>          <!-- 필드값 바인딩 -->
<span AUD-BIND="@ROWNUM"></span>           <!-- 1, 2, 3, ... -->
<span AUD-BIND="CURRENTPAGE"></span>       <!-- 현재 페이지 -->
<span AUD-BIND="TOTALCOUNT"></span>        <!-- 전체 건수 -->
```

### 4.3 AUD-IF — 조건부 렌더링

값이 falsy(빈 문자열, "0", "false")이면 요소를 제거합니다.

```html
<!-- 필드 값이 truthy일 때만 표시 -->
<div class="badge" AUD-IF="SALES_STATUS">완료</div>

<!-- 페이저 첫 페이지/마지막 페이지 표시 -->
<button AUD-IF="SHOWFIRSTPAGE" AUD-ACTION="FIRST">1</button>
<span AUD-IF="SHOWFIRSTELLIPSIS">…</span>
<span AUD-IF="SHOWLASTELLIPSIS">…</span>
<button AUD-IF="SHOWLASTPAGE" AUD-ACTION="LAST" AUD-BIND="LASTPAGE"></button>
```

**Pager 조건 변수:**

| 변수 | 설명 |
|------|------|
| `PREVDISABLED` | 이전 페이지 없음 (currentPage <= 1) |
| `NEXTDISABLED` | 다음 페이지 없음 (currentPage >= lastPage) |
| `SHOWFIRSTPAGE` | 첫 페이지 번호가 1이 아닐 때 |
| `SHOWLASTPAGE` | 마지막 페이지 번호가 표시되지 않을 때 |
| `SHOWFIRSTELLIPSIS` | 첫 페이지와 표시 블록 사이 생략부호 필요 시 |
| `SHOWLASTELLIPSIS` | 표시 블록과 마지막 페이지 사이 생략부호 필요 시 |

### 4.4 AUD-CLASS — 조건부 CSS 클래스

값이 truthy이면 지정된 CSS 클래스를 추가합니다.

```html
<!-- 형식: AUD-CLASS="조건:클래스명" -->
<div class="card" AUD-CLASS="ACTIVE:selected">...</div>
<div AUD-CLASS="SALES_STATUS:completed">...</div>
```

### 4.5 AUD-DISABLED — 조건부 비활성화

값이 truthy이면 `disabled` 속성을 설정합니다.

```html
<button AUD-ACTION="PREV" AUD-DISABLED="PREVDISABLED">‹</button>
<button AUD-ACTION="NEXT" AUD-DISABLED="NEXTDISABLED">›</button>
```

### 4.6 AUD-ACTION — 페이저 액션

클릭 시 DataGrid의 페이지 이동 메소드를 호출합니다.

| 값 | 동작 |
|----|------|
| `FIRST` | 첫 페이지로 이동 (`MovePage(1)`) |
| `PREV` | 이전 페이지 (`MovePrevPage()`) |
| `NEXT` | 다음 페이지 (`MoveNextPage()`) |
| `LAST` | 마지막 페이지 (`MovePage(lastPage)`) |
| `PAGE` | 해당 페이지 번호로 이동 (PAGES 반복문 내에서 사용) |

```html
<button AUD-ACTION="FIRST" AUD-DISABLED="PREVDISABLED">«</button>
<button AUD-ACTION="PREV" AUD-DISABLED="PREVDISABLED">‹</button>
<button AUD-FOR="PAGES" AUD-BIND="NUM" AUD-ACTION="PAGE" AUD-CLASS="ACTIVE:active"></button>
<button AUD-ACTION="NEXT" AUD-DISABLED="NEXTDISABLED">›</button>
<button AUD-ACTION="LAST" AUD-DISABLED="NEXTDISABLED">»</button>
```

### 4.7 AUD-ON-{event} — 범용 이벤트 바인딩

HTML DOM 이벤트를 `addFunction()`으로 등록한 함수와 연결합니다.
`{event}` 부분에 표준 DOM 이벤트명을 사용합니다.

```html
<!-- 클릭 이벤트 -->
<div class="card" AUD-ON-CLICK="SHOW_DETAIL">...</div>

<!-- 더블클릭 이벤트 -->
<div class="row" AUD-ON-DBLCLICK="OPEN_EDIT">...</div>

<!-- 체크박스 변경 이벤트 -->
<input type="checkbox" AUD-ON-CHANGE="TOGGLE_CHECK" />

<!-- input 이벤트 (실시간 입력) -->
<input type="text" AUD-ON-INPUT="SEARCH_FILTER" />
```

**콜백 시그니처**: `function(row: Record<string, any>, rowIndex: number, event: Event)`

- `row`: 해당 행의 필드명-값 객체
- `rowIndex`: 행 인덱스 (0부터)
- `event`: 원본 DOM 이벤트

### 4.8 AUD-MODEL — 양방향 데이터 바인딩

`input`, `select`, `checkbox` 요소의 값을 DataGrid 셀과 양방향으로 바인딩합니다.

- 초기값: DataGrid 셀의 `DisplayValue`로 설정
- 변경 시: `change` 이벤트에서 `row.SetValue(field, value)` 호출 후 `grid.ReDraw()`

```html
<!-- 텍스트 입력 -->
<input type="text" AUD-MODEL="PROD_NAME" />

<!-- 숫자 입력 -->
<input type="number" AUD-MODEL="QTY" />

<!-- 체크박스 (CheckedValue/UnCheckedValue 사용) -->
<input type="checkbox" AUD-MODEL="SALES_STATUS" />

<!-- 셀렉트 박스 -->
<select AUD-MODEL="STATUS">
  <option value="진행">진행</option>
  <option value="완료">완료</option>
</select>
```

**체크박스 동작**:
- 그리드 컬럼의 `CheckedValue`/`UnCheckedValue` 속성 사용
- 속성이 없으면 기본값 `"Y"`/`"N"` 적용
- 컬럼의 CheckedValue를 스크립트에서 커스텀 설정 가능:

```typescript
let fields = grid.GetFields();
for (let i = 0; i < fields.length; i++) {
    if (fields[i].Name === "SALES_STATUS") {
        fields[i].CheckedValue = "완료";
        fields[i].UnCheckedValue = "";
        break;
    }
}
```

---

## 5. 데이터 모델 구조

`GridHtmlRenderer.getDataModel()`이 반환하는 데이터 구조:

```typescript
{
  columns: Array<{ field: string, header: string }>,  // 그리드 컬럼 정보
  rows: Array<Record<string, any>>,                    // 전체 행 데이터
  pager: {                                              // 페이징 (UsePaging=true일 때)
    currentPage: number,
    lastPage: number,
    totalCount: number,
    prevDisabled: boolean,
    nextDisabled: boolean,
    showFirstEllipsis: boolean,
    showLastEllipsis: boolean,
    showFirstPage: boolean,
    showLastPage: boolean,
    pages: Array<{ num: number, active: boolean }>
  } | null,
  currentRow: Record<string, any> | null,              // 현재 선택된 행 데이터
  currentRowIndex: number                               // 현재 선택된 행 인덱스 (-1 = 미선택)
}
```

---

## 6. HTML 템플릿 작성 가이드 (AI 자동 생성용)

### 6.1 템플릿 생성 프로세스

사용자가 GridHtmlView 템플릿 생성을 요청하면 다음 순서로 진행합니다:

1. **대상 DataGrid 컬럼 파악**: 그리드의 필드명(Name)과 표시명(Caption) 확인
2. **레이아웃 유형 결정**: 카드 리스트, 테이블, 폼, 마스터-디테일, 대시보드 등
3. **기능 요구사항 파악**: 페이징, 편집, 이벤트 처리, 현재행 표시 등
4. **HTML 템플릿 작성**: AUD 디렉티브를 사용하여 구조 정의
5. **CSS 스타일시트 작성**: Shadow DOM 내부용 CSS
6. **이벤트 함수 작성**: 클라이언트 스크립트의 `addFunction()` 호출 코드

### 6.2 레이아웃 패턴별 템플릿

#### 패턴 A: 카드 리스트 (기본)

```html
<div class="card-grid">
  <div class="card" AUD-FOR="ROWS" AUD-ON-CLICK="ON_CARD_CLICK">
    <div class="card-header" AUD-BIND="필드명1"></div>
    <div class="card-body" AUD-BIND="필드명2"></div>
    <div class="card-footer" AUD-BIND="필드명3"></div>
  </div>
</div>
```

```css
.card-grid { display:flex; flex-wrap:wrap; gap:12px; padding:8px; }
.card { width:220px; padding:16px; border-radius:10px;
  background:#fff; border:1px solid #e2e8f0; cursor:pointer;
  transition:box-shadow .2s,transform .2s; }
.card:hover { box-shadow:0 4px 12px rgba(0,0,0,.1); transform:translateY(-2px); }
```

#### 패턴 B: 마스터-디테일 (좌: 목록, 우: 상세 폼)

```html
<div class="layout">
  <!-- 마스터: 카드 목록 -->
  <div class="master">
    <div class="list">
      <div class="item" AUD-FOR="ROWS" AUD-CLASS="ACTIVE:selected">
        <div class="title" AUD-BIND="필드명1"></div>
        <div class="sub" AUD-BIND="필드명2"></div>
      </div>
    </div>
    <!-- 페이저 (선택) -->
    <div class="pager">
      <button AUD-ACTION="PREV" AUD-DISABLED="PREVDISABLED">&lsaquo;</button>
      <button AUD-FOR="PAGES" AUD-BIND="NUM" AUD-ACTION="PAGE" AUD-CLASS="ACTIVE:active"></button>
      <button AUD-ACTION="NEXT" AUD-DISABLED="NEXTDISABLED">&rsaquo;</button>
    </div>
  </div>

  <!-- 디테일: 선택 행 폼 -->
  <div class="detail" AUD-FOR="CURRENT_ROW">
    <h3>상세 정보</h3>
    <div class="field">
      <label>필드1</label>
      <input type="text" AUD-MODEL="필드명1" />
    </div>
    <div class="field">
      <label>필드2</label>
      <span AUD-BIND="필드명2"></span>
    </div>
  </div>
</div>
```

```css
.layout { display:flex; gap:20px; padding:8px; height:100%; }
.master { flex:0 0 280px; display:flex; flex-direction:column; }
.list { flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; }
.item { padding:12px; border-radius:8px; background:#fff;
  border:1px solid #e2e8f0; cursor:pointer; }
.item:hover { background:#f8fafc; }
.item.selected { border-color:#2563eb; background:#eff6ff; }
.detail { flex:1; padding:24px; border-radius:12px;
  background:#fff; border:1px solid #e2e8f0; overflow-y:auto; }
.field { display:flex; align-items:center; margin-bottom:12px; }
.field label { flex:0 0 80px; font-size:12px; font-weight:600; color:#64748b; }
.field input { flex:1; padding:8px 10px; border:1px solid #e2e8f0;
  border-radius:6px; font-size:13px; outline:none; }
.field input:focus { border-color:#2563eb; box-shadow:0 0 0 2px rgba(37,99,235,.12); }
```

#### 패턴 C: 테이블 (동적 컬럼)

```html
<table class="data-table">
  <thead>
    <tr>
      <th AUD-FOR="COLUMNS" AUD-BIND="HEADER"></th>
    </tr>
  </thead>
  <tbody>
    <tr AUD-FOR="ROWS">
      <td AUD-FOR="COLUMNS" AUD-BIND="VALUE"></td>
    </tr>
  </tbody>
</table>
```

```css
.data-table { width:100%; border-collapse:collapse; font-size:13px; }
.data-table th { background:#f8fafc; font-weight:600; color:#475569;
  padding:10px 12px; border-bottom:2px solid #e2e8f0; text-align:left; }
.data-table td { padding:8px 12px; border-bottom:1px solid #f1f5f9; color:#1e293b; }
.data-table tr:hover td { background:#f8fafc; }
```

#### 패턴 D: 입력 폼 (현재 행 편집)

```html
<div class="form-panel" AUD-FOR="CURRENT_ROW">
  <div class="form-header">
    <h3>데이터 수정</h3>
  </div>
  <div class="form-body">
    <div class="form-group">
      <label>상품명</label>
      <input type="text" AUD-MODEL="PROD_NAME" />
    </div>
    <div class="form-group">
      <label>수량</label>
      <input type="number" AUD-MODEL="QTY" />
    </div>
    <div class="form-group">
      <label>상태</label>
      <select AUD-MODEL="STATUS">
        <option value="진행">진행</option>
        <option value="완료">완료</option>
      </select>
    </div>
    <div class="form-group">
      <label>완료여부</label>
      <label class="check"><input type="checkbox" AUD-MODEL="IS_DONE" /> 완료</label>
    </div>
  </div>
</div>
```

#### 패턴 E: 카드 + 요약 정보

```html
<div class="summary-bar">
  <span>전체 <strong AUD-BIND="TOTALCOUNT"></strong>건</span>
  <span>페이지 <strong AUD-BIND="CURRENTPAGE"></strong> / <strong AUD-BIND="LASTPAGE"></strong></span>
</div>
<div class="card-grid">
  <div class="card" AUD-FOR="ROWS">
    <span class="num" AUD-BIND="@ROWNUM"></span>
    <span class="name" AUD-BIND="PROD_NAME"></span>
  </div>
</div>
```

### 6.3 페이저 패턴

#### 심플 페이저 (« ‹ 1 2 3 4 5 › »)

```html
<div class="pager">
  <button AUD-ACTION="FIRST" AUD-DISABLED="PREVDISABLED">&laquo;</button>
  <button AUD-ACTION="PREV" AUD-DISABLED="PREVDISABLED">&lsaquo;</button>
  <button AUD-FOR="PAGES" AUD-BIND="NUM" AUD-ACTION="PAGE" AUD-CLASS="ACTIVE:active"></button>
  <button AUD-ACTION="NEXT" AUD-DISABLED="NEXTDISABLED">&rsaquo;</button>
  <button AUD-ACTION="LAST" AUD-DISABLED="NEXTDISABLED">&raquo;</button>
</div>
```

#### 풀 페이저 (◀ [1] … 22 23 24 … [50] ▶  25/50)

```html
<div class="pager">
  <button AUD-ACTION="PREV" AUD-DISABLED="PREVDISABLED">&#9664;</button>
  <button AUD-IF="SHOWFIRSTPAGE" AUD-ACTION="FIRST">1</button>
  <span class="dots" AUD-IF="SHOWFIRSTELLIPSIS">&hellip;</span>
  <button AUD-FOR="PAGES" AUD-BIND="NUM" AUD-ACTION="PAGE" AUD-CLASS="ACTIVE:active"></button>
  <span class="dots" AUD-IF="SHOWLASTELLIPSIS">&hellip;</span>
  <button AUD-IF="SHOWLASTPAGE" AUD-ACTION="LAST" AUD-BIND="LASTPAGE"></button>
  <button AUD-ACTION="NEXT" AUD-DISABLED="NEXTDISABLED">&#9654;</button>
  <span class="page-info">
    <span AUD-BIND="CURRENTPAGE"></span> / <span AUD-BIND="LASTPAGE"></span>
  </span>
</div>
```

#### 페이저 기본 CSS

```css
.pager { display:flex; align-items:center; justify-content:center;
  gap:3px; padding:8px 0; font-size:12px; }
.pager button { border:1px solid #e2e8f0; background:#fff; color:#334155;
  padding:4px 8px; border-radius:5px; cursor:pointer; min-width:28px;
  line-height:1.2; transition:background .15s; }
.pager button:hover:not(:disabled):not(.active) { background:#f1f5f9; }
.pager button.active { background:#2563eb; color:#fff; border-color:#2563eb;
  pointer-events:none; }
.pager button:disabled { opacity:.35; cursor:default; }
.pager .dots { color:#94a3b8; padding:0 2px; user-select:none; }
.page-info { color:#64748b; margin-left:12px; }
```

### 6.4 CSS 작성 가이드

**Shadow DOM 규칙:**
- 모든 CSS는 Shadow DOM 내부에서만 적용됩니다 (외부 스타일과 격리)
- 외부 CSS 프레임워크(Bootstrap, Tailwind 등)는 사용할 수 없습니다
- 모든 스타일을 직접 정의해야 합니다

**권장 색상 팔레트 (Modern Blue):**

| 용도 | 색상 |
|------|------|
| 배경 (기본) | `#fff` |
| 배경 (호버) | `#f8fafc` |
| 배경 (선택) | `#eff6ff` |
| 테두리 | `#e2e8f0` |
| 텍스트 (주) | `#1e293b` |
| 텍스트 (부) | `#64748b` |
| 텍스트 (약) | `#94a3b8` |
| 포인트 | `#2563eb` |
| 포인트 (연) | `#dbeafe` |
| 성공 | `#16a34a` |
| 경고 | `#f59e0b` |
| 위험 | `#dc2626` |

**반응형 고려:**
- 카드 너비는 고정 `px` 또는 `flex` 기반으로 설정
- `flex-wrap:wrap`으로 자동 줄바꿈
- 마스터-디테일은 `flex` 레이아웃에 `flex:0 0 Npx`(고정)과 `flex:1`(가변) 조합
- `overflow-y:auto`로 스크롤 영역 설정

**자주 사용하는 CSS 패턴:**

```css
/* 카드 호버 효과 */
.card { transition:box-shadow .2s,transform .2s; }
.card:hover { box-shadow:0 4px 12px rgba(0,0,0,.1); transform:translateY(-2px); }

/* 선택 상태 */
.card.selected { border-color:#2563eb; background:#eff6ff; }

/* 뱃지 */
.badge { font-size:10px; font-weight:600; padding:2px 6px;
  border-radius:8px; background:#dbeafe; color:#2563eb; }

/* 입력 필드 포커스 */
input:focus { border-color:#2563eb; box-shadow:0 0 0 2px rgba(37,99,235,.12); outline:none; }

/* 구분선 */
.divider { border-bottom:1px solid #e2e8f0; margin:12px 0; }
```

---

## 7. 종합 샘플

### 7.1 마스터-디테일 (카드 목록 + 입력 폼)

**스크립트:**

```typescript
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let Matrix: Matrix;

const grid = Matrix.getObject("GRD_SALES") as DataGrid;
const viewer = Matrix.getObject("GridViewer") as any;

// 이벤트 함수 등록
viewer.addFunction("SHOW_DETAIL", function(row, rowIndex, event) {
    Matrix.Alert("판매ID: " + row.SALES_ID);
});

// 체크박스 CheckedValue 설정
let fields = grid.GetFields();
for (let i = 0; i < fields.length; i++) {
    if (fields[i].Name === "SALES_STATUS") {
        fields[i].CheckedValue = "완료";
        fields[i].UnCheckedValue = "";
        break;
    }
}
```

**HTML 템플릿:** (MTSD ComponentElement.HTML에 설정)

```html
<div class="layout">
  <div class="master">
    <div class="card-list">
      <div class="card" AUD-FOR="ROWS" AUD-CLASS="ACTIVE:selected" AUD-ON-CLICK="SHOW_DETAIL">
        <div class="badge" AUD-BIND="SALES_STATUS"></div>
        <div class="id" AUD-BIND="SALES_ID"></div>
        <div class="prod" AUD-BIND="PROD_NAME"></div>
        <div class="meta">
          <span AUD-BIND="CUST_NAME"></span>
          <span class="sep">/</span>
          <span AUD-BIND="EMP_NAME"></span>
        </div>
        <div class="amount" AUD-BIND="COST_AMOUNT"></div>
      </div>
    </div>
    <div class="pager">
      <button AUD-ACTION="FIRST" AUD-DISABLED="PREVDISABLED">&laquo;</button>
      <button AUD-ACTION="PREV" AUD-DISABLED="PREVDISABLED">&lsaquo;</button>
      <button AUD-FOR="PAGES" AUD-BIND="NUM" AUD-ACTION="PAGE" AUD-CLASS="ACTIVE:active"></button>
      <button AUD-ACTION="NEXT" AUD-DISABLED="NEXTDISABLED">&rsaquo;</button>
      <button AUD-ACTION="LAST" AUD-DISABLED="NEXTDISABLED">&raquo;</button>
    </div>
  </div>
  <div class="detail-form" AUD-FOR="CURRENT_ROW">
    <h3 class="form-title">상세 정보</h3>
    <div class="form-row">
      <label>판매ID</label>
      <span AUD-BIND="SALES_ID"></span>
    </div>
    <div class="form-row">
      <label>상품명</label>
      <input type="text" AUD-MODEL="PROD_NAME" />
    </div>
    <div class="form-row">
      <label>고객명</label>
      <input type="text" AUD-MODEL="CUST_NAME" />
    </div>
    <div class="form-row">
      <label>금액</label>
      <span class="amount" AUD-BIND="COST_AMOUNT"></span>
    </div>
    <div class="form-row">
      <label>상태</label>
      <label class="check-label">
        <input type="checkbox" AUD-MODEL="SALES_STATUS" /> 완료
      </label>
    </div>
  </div>
</div>
```

### 7.2 카드 그리드 + 풀 페이저

**HTML 템플릿:**

```html
<div class="card-grid">
  <div class="card" AUD-FOR="ROWS">
    <div class="badge" AUD-BIND="SALES_STATUS"></div>
    <div class="id" AUD-BIND="SALES_ID"></div>
    <div class="prod" AUD-BIND="PROD_NAME"></div>
    <div class="meta">
      <span AUD-BIND="CUST_NAME"></span>
      <span class="sep">/</span>
      <span AUD-BIND="EMP_NAME"></span>
    </div>
    <div class="amount" AUD-BIND="COST_AMOUNT"></div>
  </div>
</div>
<div class="pager">
  <button AUD-ACTION="PREV" AUD-DISABLED="PREVDISABLED">&#9664;</button>
  <button AUD-IF="SHOWFIRSTPAGE" AUD-ACTION="FIRST">1</button>
  <span class="dots" AUD-IF="SHOWFIRSTELLIPSIS">&hellip;</span>
  <button AUD-FOR="PAGES" AUD-BIND="NUM" AUD-ACTION="PAGE" AUD-CLASS="ACTIVE:active"></button>
  <span class="dots" AUD-IF="SHOWLASTELLIPSIS">&hellip;</span>
  <button AUD-IF="SHOWLASTPAGE" AUD-ACTION="LAST" AUD-BIND="LASTPAGE"></button>
  <button AUD-ACTION="NEXT" AUD-DISABLED="NEXTDISABLED">&#9654;</button>
  <span class="page-info">
    <span AUD-BIND="CURRENTPAGE"></span> / <span AUD-BIND="LASTPAGE"></span>
  </span>
</div>
```

---

## 8. 주의사항

1. **HTML 속성명은 자동 소문자 변환**: DOMParser가 `text/html` 모드에서 모든 속성명을 소문자로 변환합니다. 템플릿에서 `AUD-FOR`로 작성해도 내부적으로 `aud-for`로 처리됩니다.
2. **필드명 대/소문자 무관**: `AUD-BIND="prod_name"`과 `AUD-BIND="PROD_NAME"` 모두 동작합니다. 내부적으로 case-insensitive 매칭을 수행합니다.
3. **Shadow DOM CSS 격리**: 외부 CSS가 적용되지 않으므로 모든 스타일을 CSS에 직접 정의해야 합니다.
4. **CURRENT_ROW 부분 업데이트**: `OnCurrentRowChanged` 이벤트에서 `updateCurrentRow()`가 호출되어 CURRENT_ROW 섹션만 부분 교체합니다 (전체 리렌더링 없음).
5. **AUD-MODEL + checkbox**: 체크박스의 양방향 바인딩은 컬럼의 `CheckedValue`/`UnCheckedValue`를 사용합니다. 기본값은 `"Y"`/`"N"`입니다.
6. **AUD-FOR 중첩**: ROWS 내부에 COLUMNS를 중첩하여 동적 테이블을 만들 수 있습니다.
7. **페이저는 UsePaging=true일 때만**: DataGrid의 `UsePaging` 속성이 `true`여야 pager 모델이 생성됩니다.
8. **maxVisiblePages**: 기본값 7. 블록 단위 페이징으로 동작합니다 (예: 1~7, 8~14, ...).
9. **이벤트 함수는 ROWS/CURRENT_ROW 컨텍스트에서만**: `AUD-ON-{event}`는 행 데이터(row, rowIndex)를 전달하므로 ROWS 또는 CURRENT_ROW 반복문 내에서 사용해야 의미있습니다.
10. **ReDraw 호출**: `AUD-MODEL`에서 값 변경 시 자동으로 `grid.ReDraw()`가 호출되어 그리드 UI가 갱신됩니다.

---

## 9. 실제 구현 소스 위치

| 파일 | 설명 |
|------|------|
| `2.Sources/src/component/GridHtmlView/Model/GridHtmlView.ts` | Add-in 컴포넌트 클래스 |
| `2.Sources/src/component/GridHtmlView/Model/GridHtmlRendrer.ts` | 템플릿 렌더링 엔진 |
| `2.Sources/src/component/GridHtmlView/index.ts` | 모듈 export |
| `5.reportSources/src/reports/데이터그리드_htmlViewer/` | 개발 테스트 보고서 |
| `5.reportSources/types/aud/control/grids/DataGridColumn.ts` | DataGridColumn 인터페이스 (CheckedValue/UnCheckedValue) |
