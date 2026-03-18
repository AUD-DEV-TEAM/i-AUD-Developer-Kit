---
name: iaud-grid-guide
description: i-AUD DataGrid, GroupGrid, TreeGrid 개발 가이드. 그리드 컨트롤의 데이터 바인딩, CRUD, 이벤트, 필터/정렬, 멀티헤더, 셀 스타일, 행 추가/삭제, 서버 데이터 전송, 자동 쿼리 생성 등을 안내합니다. "DataGrid", "GroupGrid", "TreeGrid", "그리드", "행 추가", "셀 값", "CRUD", "필터", "정렬", "멀티헤더", "셀 서식", "행 삭제", "페이징", "트리", "그룹", "소계", "병합", "고정 컬럼", "그리드 이벤트", "OnCellClick", "OnEndEdit", "GetCRUDJSON" 등을 물어볼 때 사용하세요.
---

# i-AUD Grid 컨트롤 개발 가이드 (DataGrid / GroupGrid / TreeGrid)

## 1. 개요

i-AUD의 그리드 컨트롤은 Canvas 기반 렌더링의 고성능 테이블 UI입니다.

```
Grid (base)
├── DataGrid         — 기본 테이블, 페이징, 셀 병합
│   └── GroupGrid    — 그룹핑 + 소계/합계
└── TreeGrid         — 계층형 트리 구조
```

**Canvas 렌더링**: DOM이 아닌 HTML5 Canvas에 직접 그리므로 대용량 데이터에서도 빠릅니다. 셀 스타일은 CSS가 아닌 **컴포넌트 API**로 제어합니다.

### 타입 정의 위치

| 구분 | 경로 |
|------|------|
| DataGrid | `types/aud/control/DataGrid.ts` |
| TreeGrid | `types/aud/control/TreeGrid.ts` |
| Grid (공통) | `types/aud/control/Grid.ts` |
| 셀/컬럼/행 | `types/aud/control/grids/DataGridCell.ts`, `DataGridColumn.ts`, `DataGridRow.ts` |
| TreeGridNode | `types/aud/control/grids/TreeGridNode.ts` |
| 멀티헤더 | `types/aud/control/grids/MultiHeader.ts`, `MultiHeaderCell.ts` |
| 스타일 옵션 | `types/aud/control/grids/StyleOption.ts`, `HeaderStyleOption.ts`, `RecordStyleOption.ts` |
| 필터 조건 | `types/aud/control/grids/FilterCondition.ts` |
| 고정 컬럼 | `types/aud/control/grids/FreezeColumnSetting.ts` |
| 트리 설정 | `types/aud/control/grids/TreeSetting.ts` |
| 병합 셀 | `types/aud/control/grids/MergeCell.ts` |
| 내보내기 | `types/aud/control/grids/ExportRowItem.ts` |
| Grid Enum | `types/aud/enums/grid/` |

---

## 2. 기본 사용법

### 2.1 컨트롤 바인딩

```typescript
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataGridCell } from "@AUD_CLIENT/control/grids/DataGridCell";
import { DataGridColumn } from "@AUD_CLIENT/control/grids/DataGridColumn";
import { DataSet } from "@AUD_CLIENT/data/DataSet";
import { DataTable } from "@AUD_CLIENT/data/DataTable";

let Matrix: Matrix;

let grd = Matrix.getObject("GRD_MAIN") as DataGrid;
```

### 2.2 데이터 바인딩 방식

#### 방식 1: DataSource (자동 바인딩)
MTSD/design.json에서 `DataSource` 속성에 DataSource 이름을 지정하면, 보고서 로드 시 자동으로 SQL 실행 후 데이터가 바인딩됩니다.

#### 방식 2: SetDataSet (직접 데이터 주입)
```typescript
// 서버 스크립트 호출 후 받은 DataSet 주입
Matrix.RunScriptEx([], "GetData", params, function(p) {
    if (p.Success) {
        let ds = p.getDataSet("GRD_MAIN") as DataSet;
        grd.SetDataSet(ds);
    }
});
```

#### 방식 3: RefreshData (데이터 갱신)
```typescript
// DataSource가 설정된 그리드의 데이터를 서버에서 다시 가져옴
grd.RefreshData();
```

---

## 3. 행(Row) 조작

### 3.1 행 추가/삽입/삭제

```typescript
// 행 추가 (맨 끝에)
let newRow = grd.AppendRow();
newRow.SetValue("EMP_NAME", "홍길동");
newRow.SetValue("DEPT_CODE", "D001");

// 행 삽입 (선택된 행 아래)
let insertedRow = grd.InsertRow();

// 행 삽입 (특정 인덱스에)
let insertedRow2 = grd.InsertRow(3);

// 행 삭제
grd.DeleteRow(0);  // 인덱스로 삭제

// 전체 데이터 삭제
grd.ClearData();

// 화면 갱신 (행 추가/삭제 후)
grd.Calculate();
```

### 3.2 행 조회

```typescript
// 현재 선택된 행
let currentRow = grd.GetCurrentRow();

// 인덱스로 행 가져오기 (필터링 후 보이는 행 기준)
let row = grd.GetRow(0);

// 인덱스로 행 가져오기 (전체 데이터 기준, 필터 무관)
let rowInTotal = grd.GetRowInTotalRows(0);

// 행 수 조회
let visibleCount = grd.GetRowCount();
let totalCount = grd.GetTotalRowCount();

// 선택된 행들
let selectedRows = grd.GetSelectedRows();
```

### 3.3 셀 값 읽기/쓰기

```typescript
// Row 객체에서 직접 접근 (권장)
let value = row.GetValue("FIELD_NAME");
row.SetValue("FIELD_NAME", "new value");

// Cell 객체를 통한 접근
let cell = row.GetCell("FIELD_NAME");
let cellValue = cell.Value;        // 원본 값
let displayText = cell.Text;       // 표시 텍스트 (readonly)
let displayValue = cell.DisplayValue;  // 서식 적용된 표시값 (readonly)

// Grid 메서드로 접근
let val = grd.getRowValue(0, "FIELD_NAME");      // 인덱스 + 필드명
grd.setRowValue(0, "FIELD_NAME", "new value");   // 인덱스 + 필드명
```

### 3.4 행 상태(RowState) 관리

CRUD에서 행의 변경 상태를 추적합니다:

| 상태 | 값 | 설명 |
|------|-----|------|
| None | 0 | 변경 없음 (서버에 전송 안 됨) |
| Added | 1 | 새로 추가된 행 (INSERT) |
| Updated | 2 | 수정된 행 (UPDATE) |
| Deleted | 4 | 삭제된 행 (DELETE) |

```typescript
// 행 상태 조회
let status = grd.GetRowStatus(0);  // "None", "Insert", "Update", "Delete"

// 행 상태 수동 변경
grd.ChangeRowStateAt(0, "Update");

// 수정 여부 확인
let modified = grd.IsModified();  // 변경된 행이 있으면 true
```

---

## 4. 컬럼(Column) 설정

### 4.1 컬럼 속성

```typescript
import { DataGridColumn } from "@AUD_CLIENT/control/grids/DataGridColumn";

let col = grd.GetField("EMP_NAME") as DataGridColumn;

// 기본 속성
col.Caption = "사원명";           // 헤더 표시명
col.Width = 150;                  // 너비(px)
col.Visible = true;               // 표시 여부
col.Editable = true;              // 편집 가능 여부
col.Sortable = true;              // 정렬 가능 여부
col.Filterable = true;            // 필터 가능 여부
col.Resizable = true;             // 리사이즈 가능 여부
col.Mergeable = true;             // 병합 가능 여부

// 정렬
col.TextPosition = "center";      // "start" | "center" | "end"
col.HeaderPosition = "center";    // 헤더 정렬
col.VerticalAlign = enPropFontAlignV.Middle;  // 세로 정렬

// 데이터 타입
col.DataType = enDataType.String;  // String, Int, Float, Double, DateTime 등
col.Format = "#,##0";             // 숫자 서식
col.Format = "yyyy-MM-dd";        // 날짜 서식
col.InitValue = "";               // 새 행 추가 시 기본값
```

### 4.2 컬럼 타입(ColumnType)

컬럼의 UI 표현 방식을 결정합니다:

| ColumnType | 설명 | 주요 속성 |
|------------|------|-----------|
| Text | 일반 텍스트 (기본) | Format |
| ComboBox | 드롭다운 선택 | DefinedItems, DataSource, ValuePath, LabelPath |
| CheckBox | 체크박스 | CheckedValue, UnCheckedValue |
| RadioButton | 라디오 버튼 | DefinedItems |
| Button | 버튼 | Caption |
| Image | 이미지 | - |
| DateTime/Calendar | 날짜 선택 | Format |
| MultiLine | 여러 줄 텍스트 | - |
| Password | 비밀번호 | - |

#### ComboBox 컬럼 설정

```typescript
// 방법 1: DefinedItems (고정 목록)
col.ColumnType = enDataColumnType.ComboBox;
col.DefinedItems = "Y:사용,N:미사용";  // value:label 형식

// 방법 2: DataSource 연동 (동적 목록)
// MTSD에서 컬럼의 ComboBox DataSource를 설정
// ValuePath: 코드 필드, LabelPath: 표시 필드
```

#### CheckBox 컬럼 설정

```typescript
col.ColumnType = enDataColumnType.CheckBox;
col.CheckedValue = "Y";
col.UnCheckedValue = "N";
// IsCheckBoxAllSelected: 헤더 체크박스 전체 선택 상태
```

### 4.3 컬럼 스타일

```typescript
// BoxStyle 적용 (공통 스타일)
col.SetBoxStyle("STYLE_CODE");           // 데이터 영역
col.SetHeaderBoxStyle("HEADER_STYLE");   // 헤더 영역
col.ClearBoxStyle();                      // 스타일 제거

// 너비 설정
col.SetWidth(200);
let actualWidth = col.GetActualWidth();
```

### 4.4 컬럼 동적 추가/삭제

```typescript
// 컬럼 추가
grd.AddColumn("NEW_COL", false);  // false=문자, true=숫자

// 컬럼 삭제
grd.DeleteColumn("NEW_COL");

// 컬럼 이동
grd.MoveField("COL_NAME", 3);  // 3번째 위치로 이동

// 필드 정보 조회
let fields = grd.GetFields();         // 모든 컬럼 배열
let fieldNames = grd.GetFieldNames(); // 필드명 배열
let colCount = grd.GetColumnCount();  // 컬럼 수
let fieldIdx = grd.GetFieldIndex("COL_NAME");  // 필드 인덱스
```

### 4.5 CRUD용 컬럼 키 속성

서버로 데이터를 전송하여 자동 DML 생성할 때 사용됩니다:

| 속성 | 값 | 설명 |
|------|-----|------|
| KeyType | Primary | WHERE 절에 사용 (PK 컬럼) |
| KeyType | None | 일반 데이터 컬럼 |
| DataType | String/Numeric/DateTime/DateTimeNow/UserCode/UUID | 서버 DML 생성 시 타입 처리 |
| SaveMode | All | INSERT/UPDATE 모두 포함 |
| SaveMode | InsertOnly | INSERT에만 포함 |
| SaveMode | UpdateOnly | UPDATE에만 포함 |
| SaveMode | None | DML에서 제외 |

---

## 5. 이벤트

### 5.1 셀/행 이벤트

```typescript
// 셀 클릭
grd.OnCellClick = function(sender, args) {
    // args: { Id, Row: DataGridRow, Cell: DataGridCell, X, Y }
    let value = args.Row.GetValue("FIELD_NAME");
    let cellText = args.Cell.Text;
};

// 셀 더블클릭
grd.OnCellDoubleClick = function(sender, args) {
    // args: { Id, Row, Cell, X, Y }
};

// 현재 셀 변경
grd.OnCurrentCellChanged = function(sender, args) {
    // args: { Id }
};

// 현재 행 변경
grd.OnCurrentRowChanged = function(sender, args) {
    // args: { Id }
};

// 셀 렌더링 전 (조건부 서식)
grd.OnCellLoaded = function(sender, args) {
    // args: { Id, Row, Cell }
    // 셀이 화면에 그려지기 직전에 호출 — 셀 색상/폰트를 동적으로 변경
    if (args.Cell.Column.Name === "STATUS" && args.Cell.Value === "FAIL") {
        args.Cell.BackColor = "#FFCCCC";
        args.Cell.FontColor = "#FF0000";
        args.Cell.FontBold = true;
    }
};
```

### 5.2 편집 이벤트

```typescript
// 편집 시작 전
grd.OnCellBeginEdit = function(sender, args) {
    // args: { Id, Cell, Cancel, MergeColumn, LOVList }
    // Cancel = true로 설정하면 편집 취소
    if (args.Cell.Column.Name === "READONLY_COL") {
        args.Cancel = true;  // 특정 컬럼 편집 방지
    }
};

// 편집 완료 후
grd.OnCellEndEdit = function(sender, args) {
    // args: { Id, getCells(), Cancel }
    let cells = args.getCells();  // 편집된 셀 목록
    // Cancel = true로 설정하면 편집 내용 취소
};

// 새 행 생성 시
grd.OnRowAppended = function(sender, args) {
    // args: { Id, Row }
    args.Row.SetValue("CREATE_DATE", new Date().toISOString().slice(0, 10));
};
```

### 5.3 데이터 이벤트

```typescript
// 데이터 바인딩 완료
grd.OnDataBindEnd = function(sender, args) {
    // args: { Id, RecordCount }
    // 데이터 로딩 후 초기 처리
};

// 데이터 변경 (ApplyDataSource, SetDataSet, Calculate 후)
grd.OnDataChanged = function(sender, args) {
    // args: { Id, RecordCount, Source }
    // Source: "ApplyDataSource" | "SetDataSet" | "Calculate"
};
```

### 5.4 헤더 이벤트

```typescript
// 컬럼 헤더 클릭 (정렬 등)
grd.OnGridColumnHeaderClicked = function(sender, args) {
    // args: { Id, Column }
};

// 멀티헤더 클릭
grd.OnGridMultiHeaderClicked = function(sender, args) {
    // args: { Id, Cell }
};

// 멀티헤더 체크박스 클릭
grd.OnGridMultiHeaderCheckBoxClicked = function(sender, args) {
    // args: { Id, Cell, Checked }
};
```

### 5.5 기타 이벤트

```typescript
// 행 선택 변경
grd.OnSelectionChange = function(sender, args) {
    // args: { Id, Cells }
};

// 컨텍스트 메뉴 열기 전
grd.OnContextMenuOpening = function(sender, args) {
    // args: { Id, Cell, Menu, Cancel }
    args.Cancel = true;  // 기본 메뉴 표시 방지
};

// 스크롤
grd.OnScroll = function(sender, args) {
    // args: { ScrollLeft, ScrollTop }
};

// 필터 변경
grd.OnFilterChanged = function(sender, args) {
    // args: { Id }
};

// 행 삭제 전
grd.OnDeletingRow = function(sender, args) {
    // args: { Id, Row, Cancel }
    // Cancel = true 로 삭제 방지
};

// 유효성 검증
grd.OnValidate = function(sender, args) {
    // args: { Id }
};

// 클립보드 붙여넣기
grd.OnStartClipBoardPaste = function(sender, args) {
    // 붙여넣기 시작 전
};
grd.OnEndClipBoardPaste = function(sender, args) {
    // 붙여넣기 완료 후
};

// 그리드 CheckBox 클릭 (컬럼타입=CheckBox)
grd.OnGridCheckBoxClicked = function(sender, args) {
    // args: { Id, Cell, Checked }
};

// 그리드 ComboBox 변경 (컬럼타입=ComboBox)
grd.OnGridComboBoxChanged = function(sender, args) {
    // args: { Id, Cell }
};

// 내보내기 시작
grd.OnGridExportStart = function(sender, args) {
    // 엑셀/CSV 내보내기 커스터마이징
};
```

---

## 6. 필터 / 정렬

### 6.1 필터

```typescript
// 차원 필터 (Dimension) — 특정 값 포함/제외
grd.setDimensionFilterIn("DEPT_CODE", ["D001", "D002"]);       // 포함
grd.setDimensionFilterNotIn("STATUS", ["CLOSED"]);              // 제외
grd.setDimensionFilterBetween("DATE", "2024-01-01", "2024-12-31");  // 범위

// 측정값 필터 (Measure) — 숫자 조건
grd.setMeasureFilter("AMOUNT", ">=", 10000);

// 컬럼 단위 필터
let col = grd.GetField("STATUS") as DataGridColumn;
col.AddFilter(0, "In", ["ACTIVE", "PENDING"], true);  // type:0=Dimension, isAnd:true

// 필터 해제
col.ClearFilter();
grd.ClearFilter();        // 모든 필터 해제
grd.ClearFilters(["DEPT_CODE", "STATUS"]);  // 특정 필드만 해제
```

### 6.2 정렬

```typescript
// 정렬 추가
grd.AddSort("DEPT_CODE", "ASC");
grd.AddSort("EMP_NAME", "DESC", true);  // 세 번째 인수 true: 화면 갱신 안 함

// 정렬 표현식으로 실행
grd.ExecuteSort("DEPT_CODE ASC, AMOUNT DESC");

// 정렬 해제
grd.ClearSort();
```

---

## 7. 셀 선택(Selection) / 고정 컬럼(Freeze) / 병합(Merge)

### 7.1 선택

```typescript
// 선택 규칙 (MTSD/design.json에서 설정)
// SelectRule: SingleRow, MultiRow, SingleRange, SingleCell

// 특정 셀 선택
grd.SelectCell(0, "EMP_NAME");

// 특정 행 선택
grd.SelectRow(0);
grd.SelectRowRange(0, 5);  // 범위 선택

// 선택 해제
grd.ClearSelect();

// 현재 선택 정보
let currentCell = grd.GetCurrentCell();
let selectedCells = grd.GetSelectedCells();
let selectedRows = grd.GetSelectedRows();
```

### 7.2 고정 컬럼 (Freeze)

```typescript
import { FreezeColumnSetting } from "@AUD_CLIENT/control/grids/FreezeColumnSetting";

// FreezeColumn 설정 (MTSD/design.json에서 주로 설정)
// FreezeColumn: { Left: 2, Right: 0, Type: 0 }
// → 왼쪽 2개 컬럼 고정
```

### 7.3 셀 병합 (Merge)

```typescript
// MergeRule 설정 (MTSD/design.json에서 주로 설정)
// MergeRule: 0=None, 1=Vertical, 2=VerticalHierarchy

// Vertical: 같은 컬럼에서 연속된 동일 값 셀을 병합
// VerticalHierarchy: 부모 그룹 범위 내에서만 병합

// 개별 컬럼의 병합 가능 여부
let col = grd.GetField("DEPT_CODE") as DataGridColumn;
col.Mergeable = true;   // 이 컬럼 병합 허용
col.FieldForMerge = "DEPT_CODE";  // 병합 기준 필드 (다른 필드의 값으로 병합 판단)
```

---

## 8. 멀티헤더 (Multi-Header)

복수 행의 컬럼 헤더를 구성합니다:

```typescript
import { MultiHeader } from "@AUD_CLIENT/control/grids/MultiHeader";
import { MultiHeaderCell } from "@AUD_CLIENT/control/grids/MultiHeaderCell";

// 멀티헤더 생성 (2행 구조)
let mh = grd.CreateMultiHeaderLayout(2);

// 셀 병합
let cell = grd.GetMultiHeaderCell(0, 0);  // (행, 열)
cell.Merge(0, 0, 3, 1);  // (colIndex, rowIndex, colSpan, rowSpan)

// 멀티헤더 셀에 텍스트 설정
cell.Caption = "인사 정보";

// 멀티헤더 셀 스타일
cell.SetBoxStyleKey("HEADER_BLUE");

// 멀티헤더에 컨트롤 넣기 (체크박스 등)
let ctrl = grd.GetMultiHeaderControl("CTRL_NAME");
```

---

## 9. 화면 갱신 메서드

| 메서드 | 설명 | 사용 시점 |
|--------|------|-----------|
| `Update()` | 화면만 다시 그리기 (스크롤/정렬 유지) | 셀 색상 변경 후 |
| `ReDraw()` | 스크롤/정렬 유지하며 재그리기 | 데이터 변경 후 |
| `Calculate()` | 계산 + 재그리기 | 행 추가/삭제, 수식 재계산 |
| `Refresh()` | 측정 단계 포함 전체 갱신 | 컬럼 구조 변경 후 |
| `RefreshData()` | 서버 SQL 재실행 | 파라미터 변경 후 데이터 리로드 |
| `SetAutoFit(columns, includeHeader)` | 컬럼 너비 자동 조절 | 데이터 바인딩 후 |

```typescript
// 사용 예
grd.Calculate();       // 행 추가/삭제 후
grd.Update();          // 셀 스타일 변경 후
grd.RefreshData();     // 서버에서 데이터 다시 가져오기
grd.SetAutoFit(null, true);  // 모든 컬럼 자동 맞춤 (헤더 포함)
```

---

## 10. 셀 스타일 (조건부 서식)

Canvas 기반이므로 CSS가 아닌 셀 프로퍼티로 스타일을 지정합니다. `OnCellLoaded` 이벤트에서 동적으로 적용합니다.

```typescript
grd.OnCellLoaded = function(sender, args) {
    let cell = args.Cell;
    let row = args.Row;

    // 특정 컬럼에 색상 적용
    if (cell.Column.Name === "AMOUNT") {
        let amount = Number(cell.Value);
        if (amount < 0) {
            cell.FontColor = "#FF0000";
            cell.FontBold = true;
        } else if (amount > 100000) {
            cell.BackColor = "#E8F5E9";
        }
    }

    // 행 전체에 색상 적용
    if (row.GetValue("STATUS") === "CLOSED") {
        cell.BackColor = "#F5F5F5";
        cell.FontColor = "#999999";
    }
};
```

**셀 스타일 프로퍼티:**
- `cell.BackColor` — 배경색 (`"#RRGGBB"` 또는 `"rgba(r,g,b,a)"`)
- `cell.FontColor` — 글자색
- `cell.FontBold` — 굵게 (boolean)
- `cell.FontItalic` — 기울임 (boolean)

---

## 11. DataGrid 전용: 페이징

```typescript
// 페이징 활성화 (MTSD/design.json에서 설정 또는 스크립트에서 설정)
grd.UsePaging = true;
grd.PageSize = 20;

// 페이지 이동
grd.MoveNextPage();
grd.MovePrevPage();
grd.MovePage(3);  // 특정 페이지로 이동

// 현재 페이지 정보
let pageIdx = grd.PageIndex;         // 현재 페이지 (0-based)
let lastPage = grd.GetLastPageIndex();
let totalRows = grd.GetTotalPageRowCount();
```

---

## 12. GroupGrid 전용: 그룹핑 + 소계

GroupGrid는 DataGrid를 상속하며, 특정 필드 기준으로 데이터를 그룹핑하고 소계/합계 행을 자동 생성합니다.

```typescript
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";

let grd = Matrix.getObject("GRD_GROUP") as DataGrid;  // GroupGrid는 DataGrid 타입 사용

// 그룹핑 실행 (필드명 배열)
grd.GroupGrid(["DEPT_CODE"]);           // 1단계 그룹
grd.GroupGrid(["DEPT_CODE", "TEAM"]);   // 2단계 그룹 (부서 > 팀)

// 그룹핑 후 데이터가 재배열되고 SubTotal/GrandTotal 행이 자동 삽입됨
```

### 소계 집계 함수 설정

컬럼별로 소계 행에 표시할 집계 함수를 지정합니다 (MTSD/design.json에서 설정):

| CalcSubTotalType | 설명 |
|------------------|------|
| Sum | 합계 |
| Average | 평균 |
| Count | 건수 |
| Min | 최소값 |
| Max | 최대값 |
| None | 표시 안 함 |

### GroupGrid 이벤트

```typescript
// 그룹 데이터 바인딩 완료
grd.OnGroupDataBindEnd = function(sender, args) {
    // 그룹핑 처리 완료 후 호출
};
```

### SubTotal/GrandTotal 행 구분

```typescript
grd.OnCellLoaded = function(sender, args) {
    // 소계행/합계행 구분하여 스타일 적용
    if (args.Row.RowType === 1) {  // SubTotal
        args.Cell.BackColor = "#E3F2FD";
        args.Cell.FontBold = true;
    } else if (args.Row.RowType === 2) {  // GrandTotal
        args.Cell.BackColor = "#BBDEFB";
        args.Cell.FontBold = true;
    }
};
```

---

## 13. TreeGrid 전용: 계층 데이터

TreeGrid는 부모-자식 관계의 계층 데이터를 트리 형태로 표현합니다.

```typescript
import { TreeGrid } from "@AUD_CLIENT/control/TreeGrid";
import { TreeGridNode } from "@AUD_CLIENT/control/grids/TreeGridNode";

let tree = Matrix.getObject("TRG_ORG") as TreeGrid;
```

### 13.1 트리 설정 (TreeSetting)

MTSD/design.json에서 `TreeInfo`를 설정합니다:

```json
{
  "TreeInfo": {
    "ParentField": "PARENT_CODE",   // 부모 키 필드
    "ChildField": "CODE",           // 자식 키 필드
    "CheckField": "",               // 체크박스 필드 (선택)
    "ImageField": ""                // 아이콘 필드 (선택)
  }
}
```

데이터 예시:
| CODE | PARENT_CODE | NAME |
|------|------------|------|
| ROOT | | 최상위 |
| D001 | ROOT | 개발부 |
| D002 | ROOT | 영업부 |
| T001 | D001 | 웹팀 |
| T002 | D001 | 앱팀 |

### 13.2 트리 조작

```typescript
// 펼치기/접기
tree.ExpandAll();
tree.CollapseAll();
tree.ExpandToLevel(2);  // 2단계까지만 펼치기

// 체크 관련 (TreeInfo.CheckField가 설정된 경우)
let checkedRows = tree.GetCheckedRows();   // 체크된 노드 배열
tree.ClearCheckedRows();                    // 전체 체크 해제

// 노드 접근
let node = tree.GetRow(0) as TreeGridNode;
let parentNode = node.ParentNode;
let children = node.GetChildNodeList();
let childCount = node.GetChildNodeCount();
let level = node.Level;                     // 깊이 (0부터)
let isExpanded = node.IsExpand;

// 노드 값 접근
let nodeValue = node.GetValue("CODE");
node.SetValue("NAME", "변경된 이름");
```

### 13.3 트리 이벤트

```typescript
// 트리 셀 클릭 (Area로 클릭 위치 구분)
tree.OnTreeCellClick = function(sender, args) {
    // args: { Id, Row: TreeGridNode, Cell, Area }
    // Area: 확장/축소 버튼, 트리 아이콘, 셀 영역 구분
};

// 일반 셀 클릭도 동일하게 사용 가능
tree.OnCellClick = function(sender, args) {
    let node = args.Row as TreeGridNode;
    let level = node.Level;
};
```

---

## 14. CRUD: 서버로 데이터 전송

### 14.1 자동 CRUD (DMLType 설정)

그리드에 CRUD 관련 속성을 설정하면, 서버에서 자동으로 INSERT/UPDATE/DELETE SQL을 생성합니다.

**필수 설정:**
1. **CRUDTableName**: 대상 테이블명 (MTSD에서 설정)
2. **컬럼 KeyType**: Primary 키 컬럼 지정
3. **컬럼 DataType**: 서버 DML 생성 시 타입 매핑
4. **컬럼 SaveMode**: DML에 포함할 범위

### 14.2 데이터 전송 흐름

```
[클라이언트]                              [서버]
1. 사용자가 그리드에서 데이터 수정
2. 행 추가(AppendRow), 수정(SetValue),
   삭제(DeleteRow) → RowState 자동 추적

3. Matrix.RunScriptEx(["GRD"], "Save",    4. Packet.parsePacket()
   params, callback)                         → DataTable으로 역직렬화
   → 내부적으로 GetCRUDJSON() 호출
   → MafPacket 형식으로 전송              5. QueryGenerator.getDMLCommand()
                                             → RowState별 INSERT/UPDATE/DELETE 자동 생성

                                          6. SQL 실행
```

### 14.3 GetCRUDJSON 데이터 구조

`GetCRUDJSON()`은 그리드의 변경된 데이터를 서버 전송용 JSON으로 직렬화합니다:

```json
{
  "Name": "GRD_MAIN",
  "TableName": "TB_EMP",
  "DMLType": 0,
  "Columns": [
    { "Name": "EMP_CODE", "Caption": "사원코드", "KeyType": 1, "DataType": "String", "SaveMode": 0 },
    { "Name": "EMP_NAME", "Caption": "사원명", "KeyType": 0, "DataType": "String", "SaveMode": 0 },
    { "Name": "AMOUNT", "Caption": "금액", "KeyType": 0, "DataType": "Numeric", "SaveMode": 0 }
  ],
  "Rows": [
    { "Index": 0, "RowState": 1, "Datas": [{"Value": "E001"}, {"Value": "홍길동"}, {"Value": 50000}] },
    { "Index": 3, "RowState": 2, "Datas": [{"Value": "E004"}, {"Value": "수정됨"}, {"Value": 70000}] },
    { "Index": 5, "RowState": 4, "Datas": [{"Value": "E006"}, {"IsNull": true}, {"IsNull": true}] }
  ],
  "ConnectionCode": "AUD_SAMPLE_DB",
  "DBType": 1
}
```

- **RowState 1** (Added) → INSERT 생성
- **RowState 2** (Updated) → UPDATE 생성 (KeyType=Primary 컬럼이 WHERE 조건)
- **RowState 4** (Deleted) → DELETE 생성 (KeyType=Primary 컬럼이 WHERE 조건)
- RowState 0 (None)인 행은 전송되지 않음

### 14.4 서버에서 CRUD 처리

#### 자동 CRUD (ScriptQueryGenerator)

서버 스크립트에서 `ScriptQueryGenerator`를 사용하면 그리드 데이터로부터 INSERT/UPDATE/DELETE SQL을 자동 생성합니다:

```typescript
// 서버 스크립트 (ServerScript/*.ts)
import { Matrix } from "@AUD_SERVER/matrix/script/Matrix";
import { ScriptConnection } from "@AUD_SERVER/matrix/script/ScriptConnection";
import { ScriptDataSet } from "@AUD_SERVER/matrix/script/ScriptDataSet";
import { ScriptDataTable } from "@AUD_SERVER/matrix/script/ScriptDataTable";
import { ScriptQueryGenerator } from "@AUD_SERVER/matrix/script/ScriptQueryGenerator";

let Matrix: Matrix;

const req = Matrix.getRequest();
const res = Matrix.getResponse();
let con = Matrix.getConnection();

try {
    con.Connect("AUD_SAMPLE_DB");

    // 클라이언트에서 전송된 DataSet 가져오기
    let ds = req.getDataSet() as ScriptDataSet;
    let dt = ds.getTable("GRD_MAIN") as ScriptDataTable;

    // QueryGenerator로 자동 DML 생성
    let qg = new ScriptQueryGenerator();

    for (let i = 0; i < dt.getRowCount(); i++) {
        let rowState = dt.getRowState(i);

        if (rowState !== 0) {  // 변경된 행만 처리
            // getDMLCommand(table, rowIndex, tableName, dbType)
            let sql = qg.getDMLCommand(dt, i, "TB_EMP", 1);
            con.Execute(sql);
        }
    }

    con.Commit();
    res.setMessage("저장 완료");

} catch(e) {
    con.Rollback();
    Matrix.ThrowException(e.message);
} finally {
    if (con != null) {
        con.DisConnect();
        con = null;
    }
}
```

#### 수동 CRUD (직접 SQL 작성)

```typescript
// 서버 스크립트 — 직접 SQL 작성
let ds = req.getDataSet() as ScriptDataSet;
let dt = ds.getTable("GRD_MAIN") as ScriptDataTable;

for (let i = 0; i < dt.getRowCount(); i++) {
    let rowState = dt.getRowState(i);
    let empCode = dt.getData(i, "EMP_CODE");
    let empName = dt.getData(i, "EMP_NAME");
    let amount = dt.getData(i, "AMOUNT");

    if (rowState === 1) {  // Added
        con.Execute(`INSERT INTO TB_EMP(EMP_CODE, EMP_NAME, AMOUNT) VALUES('${empCode}', '${empName}', ${amount})`);
    } else if (rowState === 2) {  // Updated
        con.Execute(`UPDATE TB_EMP SET EMP_NAME='${empName}', AMOUNT=${amount} WHERE EMP_CODE='${empCode}'`);
    } else if (rowState === 4) {  // Deleted
        con.Execute(`DELETE FROM TB_EMP WHERE EMP_CODE='${empCode}'`);
    }
}
```

> **주의**: 수동 SQL 작성 시 SQL injection 방지를 위해 `ScriptPreparedStatement` 사용을 권장합니다.

### 14.5 클라이언트에서 저장 호출

```typescript
// 저장 버튼 클릭 이벤트
const btnSaveOnClick = function(sender, args) {
    // 유효성 검증
    if (!grd.IsModified()) {
        Matrix.Alert("변경된 데이터가 없습니다.");
        return;
    }

    // 유효성 검사 (Validate 설정된 컬럼 체크)
    if (!grd.ValidateEx()) {
        return;
    }

    // 서버로 전송 — 첫 번째 인수에 그리드 이름 배열 전달
    Matrix.RunScriptEx(
        ["GRD_MAIN"],        // CRUD 데이터를 전송할 그리드 이름 배열
        "SaveData",           // 서버 스크립트 서비스명
        {},                   // 추가 파라미터
        function(p) {
            if (p.Success) {
                Matrix.Alert("저장 완료");
                grd.RefreshData();  // 데이터 새로고침
            } else {
                Matrix.Alert("저장 실패: " + p.Message);
            }
        }
    );
};
```

> **`Matrix.RunScriptEx`의 첫 번째 인수**: 그리드 이름(`string[]`)을 전달하면 해당 그리드들의 CRUD 데이터가 자동으로 MafPacket에 포함됩니다.

---

## 15. 서버의 자동 DML 생성 규칙

서버의 `QueryGenerator`는 컬럼 메타데이터를 기반으로 SQL을 자동 생성합니다:

### INSERT (RowState = 1, Added)

```sql
INSERT INTO TB_EMP (EMP_CODE, EMP_NAME, CREATE_DATE, CREATE_USER)
VALUES ('E001', '홍길동', GETDATE(), 'admin')
```

- `SaveMode.UpdateOnly` 컬럼은 제외
- `DataType.DateTimeNow` → 서버 날짜 함수 (Oracle: `SYSDATE`, MSSQL: `GETDATE()`)
- `DataType.UserCode` → 로그인 사용자 코드 자동 삽입
- `DataType.UUID` → 고유 키 자동 생성

### UPDATE (RowState = 2, Updated)

```sql
UPDATE TB_EMP
SET EMP_NAME = '수정됨', AMOUNT = 70000, UPDATE_DATE = GETDATE()
WHERE EMP_CODE = 'E004'
```

- `SaveMode.InsertOnly` 컬럼은 제외
- `KeyType.Primary` 컬럼이 WHERE 조건 (원래 값 사용)

### DELETE (RowState = 4, Deleted)

```sql
DELETE FROM TB_EMP WHERE EMP_CODE = 'E006'
```

- `KeyType.Primary` 컬럼만 WHERE 조건에 사용

### MERGE (Oracle/MSSQL 지원)

```sql
-- Oracle
MERGE INTO TB_EMP T
USING DUAL ON (T.EMP_CODE = 'E001')
WHEN MATCHED THEN UPDATE SET EMP_NAME = '홍길동'
WHEN NOT MATCHED THEN INSERT (EMP_CODE, EMP_NAME) VALUES ('E001', '홍길동')

-- MSSQL
MERGE TB_EMP AS TT
USING (SELECT 'E001' AS EMP_CODE) AS ST ON TT.EMP_CODE = ST.EMP_CODE
WHEN MATCHED THEN UPDATE SET EMP_NAME = '홍길동'
WHEN NOT MATCHED BY TARGET THEN INSERT (EMP_CODE, EMP_NAME) VALUES ('E001', '홍길동');
```

### 특수 DataType

| DataType | 설명 | INSERT 시 | UPDATE 시 |
|----------|------|-----------|-----------|
| String | 문자열 | 값 그대로 | 값 그대로 |
| Numeric | 숫자 | 값 그대로 (따옴표 없음) | 값 그대로 |
| DateTime | 날짜 | 값 그대로 | 값 그대로 |
| DateTimeNow | 서버 현재 시간 | SYSDATE/GETDATE() | SYSDATE/GETDATE() |
| UserCode | 로그인 사용자 | 세션 사용자코드 | 세션 사용자코드 |
| UUID | 고유 키 | 자동 생성 | 자동 생성 |
| DateTime8 | 8자리 날짜 | YYYYMMDD (하이픈 제거) | YYYYMMDD |

---

## 16. 내보내기 (Export)

```typescript
// 엑셀 내보내기
grd.ExportExcel();

// CSV 내보내기
grd.ExportCSV();

// 내보내기 커스터마이징
grd.OnGridExportStart = function(sender, args) {
    // args.ExportRows: 내보내기 데이터 커스터마이징
    // args.ExportFileName: 파일명 변경
};

// CSV 업로드 (엑셀 데이터 가져오기)
grd.UploadCSV(function(result) {
    // 업로드 완료 콜백
});
```

### 컬럼별 내보내기 제외

```typescript
let col = grd.GetField("INTERNAL_CODE") as DataGridColumn;
col.UseExport = false;  // 내보내기에서 제외
```

---

## 17. 유효성 검증 (Validation)

```typescript
// 전체 유효성 검사
let isValid = grd.ValidateEx();         // 기본 검증
let isValid2 = grd.ValidateEx(false);   // 모든 행 검증 (삭제행 포함)
let isValid3 = grd.ValidateEx(false, true);  // InputSetting 검증 포함

// 유효성 검증 이벤트
grd.OnCellValidatorMessage = function(sender, args) {
    // args: { Id, Cell, Validator, Type, Title, Message, Cancel }
    // Cancel = true로 설정하면 기본 알림 표시 안 함
    // 커스텀 메시지 표시 가능
};
```

---

## 18. 실전 예제

### 18.1 기본 CRUD 화면

```typescript
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { DataGridRow } from "@AUD_CLIENT/control/grids/DataGridRow";
import { DataGridCell } from "@AUD_CLIENT/control/grids/DataGridCell";

let Matrix: Matrix;

let grd = Matrix.getObject("GRD_MAIN") as DataGrid;
let btnSearch = Matrix.getObject("btnSearch") as Button;
let btnAdd = Matrix.getObject("btnAdd") as Button;
let btnDelete = Matrix.getObject("btnDelete") as Button;
let btnSave = Matrix.getObject("btnSave") as Button;

// 조회
btnSearch.OnClick = function(sender, args) {
    grd.RefreshData();
};

// 행 추가
btnAdd.OnClick = function(sender, args) {
    let newRow = grd.AppendRow();
    newRow.SetValue("STATUS", "NEW");
    grd.Calculate();
};

// 행 삭제
btnDelete.OnClick = function(sender, args) {
    let currentRow = grd.GetCurrentRow();
    if (currentRow == null) {
        Matrix.Alert("삭제할 행을 선택하세요.");
        return;
    }
    let rowIdx = currentRow.RowIndex;
    grd.DeleteRow(rowIdx);
    grd.Calculate();
};

// 저장
btnSave.OnClick = function(sender, args) {
    if (!grd.IsModified()) {
        Matrix.Alert("변경된 데이터가 없습니다.");
        return;
    }
    if (!grd.ValidateEx()) return;

    Matrix.RunScriptEx(["GRD_MAIN"], "SaveData", {}, function(p) {
        if (p.Success) {
            Matrix.Alert("저장 완료");
            grd.RefreshData();
        }
    });
};

// 조건부 서식
grd.OnCellLoaded = function(sender, args) {
    if (args.Cell.Column.Name === "AMOUNT") {
        let val = Number(args.Cell.Value);
        if (val < 0) {
            args.Cell.FontColor = "#FF0000";
        }
    }
};

// 데이터 바인딩 완료 후 처리
grd.OnDataBindEnd = function(sender, args) {
    // 총 건수 표시 등
};
```

### 18.2 마스터-디테일 (그리드 2개 연동)

```typescript
let grdMaster = Matrix.getObject("GRD_MASTER") as DataGrid;
let grdDetail = Matrix.getObject("GRD_DETAIL") as DataGrid;

// 마스터 행 선택 시 디테일 데이터 로드
grdMaster.OnCurrentRowChanged = function(sender, args) {
    let currentRow = grdMaster.GetCurrentRow();
    if (currentRow == null) return;

    let masterCode = currentRow.GetValue("MASTER_CODE");

    // 방법 1: 파라미터로 디테일 DataSource 실행
    Matrix.SetVariableValue("VS_MASTER_CODE", masterCode);
    grdDetail.RefreshData();

    // 방법 2: 서버 스크립트 호출
    // Matrix.RunScriptEx(["GRD_DETAIL"], "GetDetail",
    //     { VS_MASTER_CODE: masterCode }, function(p) { ... });
};
```

### 18.3 TreeGrid 조직도

```typescript
let tree = Matrix.getObject("TRG_ORG") as TreeGrid;

// 데이터 로드 후 2단계까지 펼치기
tree.OnDataBindEnd = function(sender, args) {
    tree.ExpandToLevel(2);
};

// 체크된 노드 가져오기
const getCheckedNodes = function() {
    let checkedRows = tree.GetCheckedRows();
    let codes: string[] = [];
    for (let i = 0; i < checkedRows.length; i++) {
        codes.push(checkedRows[i].GetValue("CODE") as string);
    }
    return codes;
};

// 트리 노드 클릭
tree.OnCellClick = function(sender, args) {
    let node = args.Row as TreeGridNode;
    let level = node.Level;
    let hasChildren = node.GetChildNodeCount() > 0;
};
```

---

## 19. 샘플 보고서 위치

실제 구현 예제는 아래 폴더에서 확인할 수 있습니다:

| 카테고리 | 경로 |
|---------|------|
| DataGrid 샘플 | `src/reports/samples/기능별 샘플/DataGrid/` |
| TreeGrid 샘플 | `src/reports/samples/기능별 샘플/TreeGrid/` |
| 판매관리 CRUD 예제 | `src/reports/samples/판매관리 시스템/` |

---

## 20. 서버 데이터 전송 상세 (MafPacket)

### 클라이언트 → 서버 패킷 구조

`Matrix.RunScriptEx(["GRD_MAIN"], "ServiceName", params, callback)` 호출 시 내부적으로 `Document.GetDataSetMafPacket()`이 호출되어 아래 JSON 구조가 생성됩니다:

```json
{
  "PacketKey": "...",
  "AuthInfo": { "UserCode": "admin" },
  "ExecuteInfo": { "ReportCode": "RPT001", "ReportPath": "/reports/..." },
  "ParamSet": [
    { "Key": "VS_KEYWORD", "Value": "검색어" },
    { "Key": "VN_AMOUNT", "Value": "10000" }
  ],
  "DataSet": {
    "DataTables": [
      {
        "Name": "GRD_MAIN",
        "TableName": "TB_EMP",
        "Columns": [...],
        "Rows": [...]
      }
    ]
  }
}
```

### 서버에서 DataTable 접근 (ScriptDataTable)

```typescript
// 서버 스크립트
let ds = req.getDataSet() as ScriptDataSet;
let dt = ds.getTable("GRD_MAIN") as ScriptDataTable;

// 행/열 수
let rowCount = dt.getRowCount();
let colCount = dt.getColumnCount();

// 셀 값 접근
let value = dt.getData(rowIndex, "FIELD_NAME");

// 행 상태
let state = dt.getRowState(rowIndex);  // 0:None, 1:Added, 2:Updated, 4:Deleted

// 새 행 추가 (서버에서)
dt.AppendRow();
dt.setData(newRowIdx, "FIELD_NAME", "value");

// 컬럼 추가 (서버에서)
dt.AddColumn("NEW_COL", 0, "String", 0);  // (name, keyType, dataType, saveMode)
```

---

## 21. MTSD/design.json에서의 그리드 설정

### DataGrid 기본 구조 (.design.json)

```json
{
  "Type": "DataGrid",
  "Id": "DataGrid1234...",
  "Name": "GRD_MAIN",
  "DataSource": "DS_MAIN",
  "Position": { "Left": 0, "Top": 40, "Width": 800, "Height": 400 },
  "Editable": true,
  "SelectRule": 0,
  "MergeRule": 0,
  "FreezeColumn": { "Left": 2, "Right": 0 },
  "Columns": [
    {
      "Name": "EMP_CODE",
      "Caption": "사원코드",
      "Width": 100,
      "KeyType": 1,
      "DataType": "String",
      "Editable": false
    },
    {
      "Name": "EMP_NAME",
      "Caption": "사원명",
      "Width": 150,
      "Editable": true
    },
    {
      "Name": "DEPT_CODE",
      "Caption": "부서",
      "Width": 120,
      "ColumnType": 1,
      "DefinedItems": "D001:개발부,D002:영업부,D003:인사부"
    },
    {
      "Name": "AMOUNT",
      "Caption": "금액",
      "Width": 100,
      "DataType": "Numeric",
      "Format": "#,##0",
      "TextPosition": "end",
      "CalcSubTotalType": 1
    },
    {
      "Name": "USE_YN",
      "Caption": "사용여부",
      "Width": 70,
      "ColumnType": 2,
      "CheckedValue": "Y",
      "UnCheckedValue": "N"
    }
  ]
}
```

### TreeGrid 기본 구조

```json
{
  "Type": "TreeGrid",
  "Id": "TreeGrid1234...",
  "Name": "TRG_ORG",
  "DataSource": "DS_ORG",
  "Position": { "Left": 0, "Top": 0, "Width": 400, "Height": 500 },
  "TreeInfo": {
    "ParentField": "PARENT_CODE",
    "ChildField": "CODE",
    "CheckField": "",
    "ImageField": ""
  },
  "Columns": [
    { "Name": "CODE", "Caption": "코드", "Width": 150 },
    { "Name": "NAME", "Caption": "명칭", "Width": 200 },
    { "Name": "PARENT_CODE", "Caption": "상위코드", "Width": 100, "Visible": false }
  ]
}
```

### 주요 SelectRule 값

| 값 | 이름 | 설명 |
|----|------|------|
| 0 | SingleRow | 단일 행 선택 (기본) |
| 1 | MultiRow | 다중 행 선택 |
| 2 | SingleRange | 단일 범위 선택 |
| 3 | SingleCell | 단일 셀 선택 |

### 주요 ColumnType 값

| 값 | 이름 | 설명 |
|----|------|------|
| 0 | Text | 일반 텍스트 (기본) |
| 1 | ComboBox | 드롭다운 목록 |
| 2 | CheckBox | 체크박스 |
| 3 | RadioButton | 라디오버튼 |
| 4 | Button | 버튼 |
| 5 | Image | 이미지 |
| 6 | DateTime | 날짜/시간 |
| 7 | Calendar | 캘린더 |
| 8 | MultiLine | 여러 줄 텍스트 |
| 9 | Password | 비밀번호 |

---

## 22. 자주 묻는 질문 (FAQ)

### Q: 그리드 데이터를 읽기 전용으로 만들려면?
```typescript
grd.Editable = false;  // 전체 읽기 전용
// 또는 특정 컬럼만
col.Editable = false;
```

### Q: 특정 행만 편집 불가로 만들려면?
```typescript
grd.OnCellBeginEdit = function(sender, args) {
    if (args.Cell.Row.GetValue("STATUS") === "CONFIRMED") {
        args.Cancel = true;
    }
};
```

### Q: 행 추가 후 자동으로 편집 모드 진입?
```typescript
let newRow = grd.AppendRow();
grd.Calculate();
grd.SelectCell(newRow.RowIndex, "EMP_NAME");
// 자동으로 편집 모드 진입됨
```

### Q: 그리드 데이터를 DataTable로 접근하려면?
```typescript
let dt = grd.GetDataTable(0) as DataTable;  // 0: 기본 데이터
let rowCount = dt.Rows.length;
for (let i = 0; i < rowCount; i++) {
    let val = dt.Rows[i].GetValue("FIELD");
}
```

### Q: 그리드 높이를 데이터 건수에 맞추려면?
해당 기능은 그리드 자체에서 지원하지 않습니다. 그리드의 Position.Height를 직접 계산하여 설정합니다.

### Q: 여러 그리드의 CRUD를 한 번에 저장하려면?
```typescript
// RunScriptEx 첫 번째 인수에 여러 그리드 이름 전달
Matrix.RunScriptEx(
    ["GRD_MASTER", "GRD_DETAIL"],  // 두 그리드의 CRUD 데이터 모두 전송
    "SaveAll",
    {},
    function(p) { ... }
);
```

### Q: ComboBox 컬럼의 표시값이 코드로 나올 때?
ComboBox 컬럼의 `ValuePath`(코드)와 `LabelPath`(표시명)가 올바르게 설정되었는지 확인합니다. `DefinedItems`를 사용할 경우 `"코드:표시명"` 형식이 맞는지 확인합니다.
