---
name: iaud-olapgrid-guide
description: i-AUD OlapGrid(OLAP 피벗 그리드) 개발 가이드. 필드 관리, 필터/정렬, Write-Back(CRUD), 이벤트, 멀티헤더, 디멘젼 그룹, 계층 그룹, 커스텀 디멘젼, 스타일링, 내보내기, 서버 스크립트 저장 등을 안내합니다. "OlapGrid", "피벗 그리드", "Write-Back", "CRUD 저장", "OlapGrid 필터", "OlapGrid 이벤트", "OlapGrid 필드", "멀티헤더", "디멘젼 그룹", "Hierarchy 그룹", "OlapGrid 내보내기", "OlapGrid 스타일", "OlapGrid 정렬", "OlapGrid API", "배분", "피벗", "OLAP 셀", "드릴" 등을 물어볼 때 사용하세요.
---

# i-AUD OlapGrid (OLAP 피벗 그리드) 개발 가이드

## 1. 개요

OlapGrid는 i-AUD 플랫폼의 다차원 데이터 분석 피벗 컨트롤이다. 필드를 Row/Column/Data/Filter 영역에 배치하여 집계 분석을 수행하며, Write-Back(데이터 수정 및 서버 저장) 기능을 지원한다.

**타입 정의**: `types/aud/control/OlapGrid.ts` 및 `types/aud/control/olap/` (21개 파일)

---

## 2. 핵심 개념

### 필드 영역 (enArea)

| 영역 | 값 | 설명 |
|------|-----|------|
| Hidden | 0 | 숨김 영역 |
| Row | 1 | 행 헤더 영역 (피벗 좌측) |
| Column | 2 | 열 헤더 영역 (피벗 상단) |
| Filter | 3 | 필터 영역 (전체 데이터에 조건 적용) |
| Data | 4 | 데이터(측정값) 영역 (피벗 중앙) |

### 필드 카테고리 (enCategory)

- **Default** (0): 기본
- **Dimension** (1): 차원 필드 (Row/Column/Filter에 배치)
- **Measure** (2): 측정값 필드 (Data 영역, 집계 대상)
- **Attribute** (3): 속성 필드
- **Period** (4): 기간 필드

### 집계 유형 (enSummaryType)

| 값 | 이름 | 값 | 이름 |
|----|------|----|------|
| 0 | None | 5 | Count |
| 1 | Sum | 9 | Calculate (수식) |
| 2 | Min | 13 | DistinctCount |
| 3 | Max | 14 | Text |
| 4 | Average | | |

---

## 3. 기본 사용법

### 컨트롤 참조

```typescript
import OlapGrid from "aud/control/OlapGrid";

const olapGrid: OlapGrid = Matrix.getObject("OlapGrid1") as OlapGrid;
```

### 필드 조회 및 조작

```typescript
// 전체 필드 목록
const fields = olapGrid.getFields();

// 특정 필드 조회
const fld = olapGrid.getField("PRODUCT");

// 필드 속성 변경
fld.Caption = "상품명";
fld.Area = 1;           // Row 영역으로 이동
fld.SummaryType = 1;    // Sum
fld.Format = "#,##0";
fld.Width = 120;
fld.Visible = true;
fld.SortType = 1;       // Asc

// 필드 추가/제거
olapGrid.AppendField("NEW_FIELD");
olapGrid.RemoveField("OLD_FIELD");
olapGrid.MoveField("FIELD_NAME", 0);  // 영역 내 위치 이동
olapGrid.ClearFields();

// 영역별 필드 이름 조회
olapGrid.getFieldNames(1);  // Row 필드 이름들
```

### 데이터 갱신

```typescript
olapGrid.Refresh();                    // 서버 쿼리 재실행
olapGrid.Calculate();                  // 로컬 재계산 (스크롤 유지)
olapGrid.Calculate(true);             // 스크롤 초기화하며 재계산
olapGrid.Update();                     // 화면 갱신
olapGrid.ScreenUpdate();              // 화면만 갱신 (재계산 없음)

// 배치 업데이트
olapGrid.BeginUpdate();
// ... 여러 변경 작업 ...
olapGrid.EndUpdate();
```

### 셀 접근

```typescript
const cell = olapGrid.getCell(0, 0);  // ScriptDataCell

cell.Text;              // 포맷된 텍스트
cell.Value;             // 원시 값 (number | string | null)
cell.Field;             // 데이터 필드 (OlapField)
cell.IsTotal;           // 소계 여부
cell.IsGrandTotal;      // 총계 여부
cell.RowHeader;         // 행 헤더 셀 (ScriptHeaderCell)
cell.ColumnHeader;      // 열 헤더 셀 (ScriptHeaderCell)

// 특정 필드의 헤더 값 조회
cell.getHeaderValue("품목코드");       // string
cell.getHeaderCell("필드키");          // ScriptHeaderCell
```

### 헤더 셀 탐색

```typescript
const header: ScriptHeaderCell = cell.RowHeader;
header.Text;            // 표시 텍스트
header.Key;             // 키 값
header.Field;           // 연결 필드
header.Parent;          // 부모 헤더
header.Childrens;       // 자식 헤더 배열
header.Expanded;        // 펼침 상태 (읽기/쓰기)

header.Expand();        // 펼치기
header.Collapsed();     // 접기
```

### 선택 영역

```typescript
const sel = olapGrid.getSelection();
sel.IsEmpty();
sel.SelectAll();
sel.SelectDataArea(left, top, width, height);
sel.CopyClipBoard();
sel.Clear();

// 프로그래밍 방식 선택
olapGrid.setSelectionIndex(top, bottom, left, right);
```

---

## 4. 필터링

```typescript
// 차원 필터 (Dimension)
olapGrid.setDimensionFilterIn("REGION", ["서울", "부산"]);
olapGrid.setDimensionFilterNotIn("REGION", ["제주"]);
olapGrid.setDimensionFilterBetWeen("YEAR", "2020", "2024");

// 측정값 필터 (Measure)
olapGrid.setMeasureFilter("SALES", ">=", 1000);
olapGrid.setMeasureFilter("SALES", ">=", 1000, "<=", 5000, true);  // AND 조건

// 필터 제거
olapGrid.RemoveFilter("REGION");
olapGrid.ClearFilters();

// 필터 상태 확인
const filter = olapGrid.getField("REGION").FilterInfo;
if (filter && filter.HasFilter()) {
  console.log(filter.FilterType);  // 0=In, 1=NotIn, 4=Between
  console.log(filter.Values);      // 필터 값 배열
}

// Top N 필터
olapGrid.setTopFilter("PRODUCT", "SALES", 10, true);   // Top 10
olapGrid.setTopFilter("PRODUCT", "SALES", 5, false);    // Bottom 5
olapGrid.clearTopFilter();

// 사전 필터 (수식 기반)
olapGrid.addPreFilter(["YEAR"], "[SALES] > 1000");
olapGrid.clearPreFilter();

// 필터 적용 후 반드시 Refresh
olapGrid.Refresh();
```

---

## 5. 정렬

```typescript
// 열 정렬 (인덱스 기반)
olapGrid.setColumnSort(1, 0);       // 첫 번째 열 오름차순
olapGrid.setColumnSort(2, 0);       // 첫 번째 열 내림차순
olapGrid.clearColumnSort();

// 경로 기반 정렬 (다차원)
olapGrid.setColumnSort(1, {"YEAR": "2024", "MONTH": "01"});

// 필드 정렬
const fld = olapGrid.getField("PRODUCT");
fld.SortType = 1;  // 0=None, 1=Asc, 2=Desc

// 커스텀 정렬 순서
olapGrid.getField("GRADE").CustomSortList = ["S", "A", "B", "C"];
olapGrid.RemoveCustomSort("GRADE");
olapGrid.ClearCustomSort();
```

---

## 6. 펼침/접기

```typescript
olapGrid.ExpandAll();
olapGrid.CollapsedAll();

// 특정 항목만 펼치기/접기
olapGrid.Expand("REGION", "서울", true);               // 단일 항목
olapGrid.Expand("REGION", ["서울", "부산"], false);     // 복수 항목

// 특정 헤더 경로 숨기기
olapGrid.AddHiddenPaths("[2024][01][판매단가]");
olapGrid.ClearHiddenPaths();

olapGrid.Calculate();  // 펼침/접기 후 재계산
```

---

## 7. Write-Back (데이터 편집 및 CRUD 저장)

### 기본 설정

```typescript
olapGrid.Options.EnableWriteBack = true;        // 편집 활성화
olapGrid.Options.EnableCreateRecord = false;    // 빈 셀 자동 레코드 생성
olapGrid.Options.ManualUpdate = false;          // 수동 계산 모드
olapGrid.Options.WriteBackFetchAllRows = false; // 전체 행 접근 (true: 수정되지 않은 행도 전송)
olapGrid.Options.EnterDirection = 0;            // 0=아래, 1=오른쪽
```

### 필드별 배분 설정

```typescript
const fld = olapGrid.getField("SALES");

// 배분 방식: 0=편집 불가, 1=가중 배분, 2=균등 배분
fld.EditMethod = 1;
fld.EditPrecision = 0;              // 소수 자릿수
fld.EditMethodRef = "WEIGHT_FIELD"; // 가중 배분 참조 필드
```

### 잠긴 셀 수식

```typescript
// 수식 조건에 해당하는 셀은 편집 잠금, 하위 셀 편집 시 자동 합산
olapGrid.setLockCellFormula("[YEAR] == '합계' || [REGION] == '합계'");
```

### 저장 프로세스 (클라이언트)

```typescript
const btnSave: Button = Matrix.getObject("btnSave") as Button;

btnSave.OnClick = function () {
  // Step 1: 수정 여부 확인
  if (!olapGrid.IsModified()) {
    Matrix.Information("수정된 데이터가 없습니다.");
    return;
  }

  // Step 2: WriteBack 계산 (배분 로직 적용)
  if (olapGrid.CanCalculateWriteBack()) {
    olapGrid.CalculateWriteBack(function () {
      // Step 3: 서버로 전송
      Matrix.ServiceCall(
        "SaveService",       // 서버 스크립트 이름
        "OlapGrid1",         // 전송할 그리드 이름
        null,                // 추가 옵션
        function (result) {
          if (result.ErrorCode === 0) {
            Matrix.Information("저장 완료");
            olapGrid.Refresh();
          } else {
            Matrix.Error(result.ErrorMessage);
          }
        }
      );
    });
  }
};
```

### 편집 값 검증

```typescript
olapGrid.OnOlapDataCellEndEdit = function (sender, args) {
  // args: Cell, BeforeValue, AfterValue, LockedValue, Cancel

  // 음수 입력 거부
  if (args.AfterValue < 0) {
    args.Cancel = true;
    Matrix.Information("음수는 입력할 수 없습니다.");
    return;
  }

  // 잠긴 셀 값 초과 금지
  if (args.LockedValue > 0 && args.AfterValue > args.LockedValue) {
    args.Cancel = true;
    Matrix.Information("합계를 초과할 수 없습니다: " + args.LockedValue);
    return;
  }

  // 참조 필드 값 기반 검증
  const limitValue = parseFloat(args.Cell.getHeaderValue("BUDGET"));
  if (args.AfterValue > limitValue) {
    args.Cancel = true;
    Matrix.Information("예산(" + limitValue + ")을 초과할 수 없습니다.");
  }
};

// 참조 수식 결과값 접근
const refValue = args.Cell.Value2;  // 참조 수식 결과값
```

### 서버 스크립트에서 데이터 처리

서버 스크립트는 Java Rhino 엔진에서 실행되며, 클라이언트에서 전송된 DataTable을 처리한다.

```typescript
// ServerScript (e.g., SaveService.ts)
const table = DATASET.getTable("OlapGrid1");
const con = Matrix.getConnection("CONNECTION_CODE");

try {
  con.BeginTransaction();

  const stmtUpdate = con.prepareStatement(
    "UPDATE SALES_TABLE SET AMOUNT = ? WHERE PRODUCT = ? AND REGION = ? AND YEAR = ?"
  );
  const stmtInsert = con.prepareStatement(
    "INSERT INTO SALES_TABLE (ID, PRODUCT, REGION, YEAR, AMOUNT) VALUES (?, ?, ?, ?, ?)"
  );

  // 콜백 방식 행 처리 (대량 데이터에 권장)
  table.FetchRows(CALL_BACK(function (row) {
    const status = row.getRowStatus();  // "U"=수정, "N"=신규, "D"=삭제

    if (status === "U") {
      stmtUpdate.setDouble(1, row.getDouble("AMOUNT"));
      stmtUpdate.setString(2, row.getString("PRODUCT"));
      stmtUpdate.setString(3, row.getString("REGION"));
      stmtUpdate.setString(4, row.getString("YEAR"));
      stmtUpdate.addBatch();
    } else if (status === "N") {
      stmtInsert.setString(1, util.getUniqueKey("S"));
      stmtInsert.setString(2, row.getString("PRODUCT"));
      stmtInsert.setString(3, row.getString("REGION"));
      stmtInsert.setString(4, row.getString("YEAR"));
      stmtInsert.setDouble(5, row.getDouble("AMOUNT"));
      stmtInsert.addBatch();
    }
  }));

  stmtUpdate.executeBatch();
  stmtInsert.executeBatch();
  con.CommitTransaction();

} catch (e) {
  con.RollBackTransaction();
  throw e;
} finally {
  con.Close();
}
```

### 순차 처리 방식 (소량 데이터)

```typescript
for (let r = 0, len = table.getRowCount(); r < len; r++) {
  const row = table.getRow(r);
  const status = row.getRowStatus();
  // status에 따라 UPDATE/INSERT/DELETE 처리
}
```

### Row 객체 메서드

```typescript
row.getRowStatus();          // "U"=Update, "N"=New, "D"=Delete
row.getString("COLUMN_NAME");
row.getDouble("COLUMN_NAME");
row.getInt("COLUMN_NAME");
row.getValue("COLUMN_NAME"); // Object 반환
```

### WriteBackFetchAllRows 옵션

| 옵션 | 서버 전송 범위 | 용도 |
|------|---------------|------|
| `false` (기본) | 수정된 행만 전송 | 일반적인 CRUD |
| `true` | 전체 행 전송 | 수정되지 않은 행도 읽어야 할 때 |

---

## 8. 이벤트

```typescript
// 데이터 셀 더블클릭
olapGrid.OnDataCellDoubleClick = function (sender, args) {
  const cell = args.DataCell;  // ScriptDataCell
  console.log(cell.Text, cell.Value);

  // 헤더 경로 탐색
  let header = cell.RowHeader;
  while (header) {
    console.log("[" + header.Field.Name + "] = " + header.Text);
    header = header.Parent;
  }
};

// 셀 편집 시작
olapGrid.OnOlapDataCellStartEdit = function (sender, args) {
  // args.Cancel = true;  // 편집 취소 가능
};

// 셀 편집 종료 (값 검증)
olapGrid.OnOlapDataCellEndEdit = function (sender, args) {
  // args: Cell, BeforeValue, AfterValue, LockedValue, Cancel
};

// 데이터 바인딩 완료
olapGrid.OnDataBindEnd = function (sender, args) {
  console.log("로드 건수:", args.RecordCount);
};

// 헤더 클릭
olapGrid.OnHeaderClicked = function (sender, args) {
  args.Handled = true;  // 기본 선택 동작 취소
};

// 필터 변경 / 레이아웃 변경 / 선택 변경 / 펼침접기 변경
olapGrid.OnFilterChanged = function (sender, args) { };
olapGrid.OnLayoutUpdated = function (sender, args) { };
olapGrid.OnSelectionChanged = function (sender, args) { };
olapGrid.OnExpandChanged = function (sender, args) { };

// 스크롤
olapGrid.OnScroll = function (sender, args) {
  // args.ScrollLeft, args.ScrollTop
};

// 내보내기 시작 (취소/설정 가능)
olapGrid.OnExportStart = function (sender, args) {
  args.ExportFileName = "MyReport";
  // args.Cancel = true;
};

// WriteBack 계산 완료
olapGrid.OnCalculateWriteBackEnd = function (sender, args) { };

// 컨텍스트 메뉴
olapGrid.OnContextMenuOpening = function (sender, args) {
  // args.HitInfo: ScriptHitTestResult, args.Menu, args.Cancel
  const area = args.HitInfo.getArea();
  if (area !== 4) args.Cancel = true;  // Data 영역 외 메뉴 숨김
};

// 정렬 변경 전
olapGrid.OnBeforeSortChange = function (sender, args) {
  // args.Canceled = true;  // 정렬 취소
};

// 멀티헤더 클릭/더블클릭
olapGrid.OnMultiHeaderClicked = function (sender, args) { };
olapGrid.OnMultiHeaderDoubleClicked = function (sender, args) { };
```

---

## 9. Options (주요 설정)

```typescript
const opt = olapGrid.Options;

// 소계/총계 표시
opt.DisplayRowSubTotal = true;
opt.DisplayRowGrandTotal = true;
opt.DisplayColumnSubTotal = true;
opt.DisplayColumnGrandTotal = true;
opt.RowTotalText = "소계";
opt.RowGrandTotalText = "합계";
opt.RowTotalLocation = 0;       // 0=Bottom, 1=Top, 2=Both
opt.ColumnTotalLocation = 0;

// 영역 표시/숨김
opt.ShowFilterArea = true;
opt.ShowRowArea = true;
opt.ShowColumnrArea = true;   // 주의: API에 오타 있으나 그대로 사용
opt.ShowDataArea = true;

// 영역 라벨 텍스트
opt.FilterAreaText = "필터";
opt.RowAreaText = "행";
opt.ColumnAreaText = "열";
opt.DataAreaText = "값";
opt.MeasuresText = "측정값";

// 뷰 타입
opt.ViewType = 0;  // 0=Default(피벗), 1=TreeView
opt.TreeHeaderWidth = 300;
opt.TreeIndentWidth = 20;

// 빈 셀/오류 표시
opt.EmptyCellText = "-";
opt.ErrorCellText = "ERR";
opt.NotAvaliableCellText = "N/A";
opt.ZeroDivisioinCellText = "DIV/0";
opt.HideEmptyMeasureColumns = false;
opt.HideEmptyMeasureRows = false;

// UI 옵션
opt.ShowExpandButtons = true;
opt.CanResizeCellWidth = true;
opt.EnterDirection = 0;  // 0=아래, 1=오른쪽

// 페이징
opt.PagerInfo.UsePaging = true;
opt.PagerInfo.PageSize = 100;
// opt.PagerInfo.CurrentPage (R), TotalPageCount (R), TotalRowCount (R)
olapGrid.MovePage(2);  // 페이지 이동

// 캐시
opt.CacheOption.ExpiredMinutes = 60;
opt.CacheOption.UpdateMinutes = 30;

// 특정 필드의 소계 숨김
olapGrid.getField("REGION").VisibleSubTotal = false;
```

---

## 10. 멀티헤더 (Multi-Header)

열 헤더 위에 사용자 정의 병합 헤더를 추가한다.

```typescript
// 멀티헤더 생성 (2행)
const mHeader = olapGrid.CreateMultiHeaders(2);
mHeader.UseMultiHeader = true;

for (let c = 0; c < mHeader.ColumnCount; c++) {
  const cell = mHeader.getCell(0, c);  // 첫 번째 행
  cell.Text = "상반기";
  cell.ColSpan = 6;       // 6열 병합
  cell.RowSpan = 1;
  cell.Align = 2;         // 0=Left, 1=Right, 2=Center
  cell.BackColor = "#E8F0FE";
}
olapGrid.Refresh();

// 기존 멀티헤더 조회/비활성화
const mh = olapGrid.getMultiHeader();
mh.UseMultiHeader = false;
olapGrid.Refresh();

// 다이얼로그
olapGrid.OpenDialogMultiHeader();
```

---

## 11. 필드 그룹, 계층 그룹, 디멘젼 그룹

### 필드 그룹 (FieldGroup) — 단순 합치기

```typescript
const fieldNames = ["CATEGORY", "SUBCATEGORY", "PRODUCT"];
for (const name of fieldNames) {
  const fld = olapGrid.getField(name);
  if (fld) fld.Area = 1;
}
olapGrid.ClearFieldGroup();
olapGrid.AddFieldGroup("GRP_PRODUCT", fieldNames);
olapGrid.Refresh();
```

### 계층 그룹 (HierarchyGroup) — 드릴다운

```typescript
olapGrid.ClearHierarchyGroup();
olapGrid.AddHierarchyGroupInfo(
  "HIER_REGION",                        // 그룹 ID
  "지역 계층",                            // 표시 캡션
  ["COUNTRY", "CITY", "DISTRICT"]        // 하위 필드 순서
);
olapGrid.Refresh();
```

| 구분 | FieldGroup | HierarchyGroup |
|------|-----------|----------------|
| 표시 방식 | 필드들을 나란히 표시 | 계층적 트리 형태 |
| 펼침/접기 | 불가 | 가능 |
| 용도 | 단순 그룹핑 | 드릴다운 분석 |

### 디멘젼 그룹 (DimensionGroup) — 멤버 재분류

```typescript
const newField = olapGrid.addDimensionGroup("PRODUCT", "상품 그룹");
const group = newField.DimensionGroupInfo;

let item = group.AddItem("1.전체");
item.ItemType = 2;  // 0=Normal, 1=Others, 2=All

item = group.AddItem("2.라떼류");
item.ItemType = 0;
item.Entries = ["그린티라떼", "카페라떼", "바닐라라떼"];

item = group.AddItem("3.기타");
item.ItemType = 1;  // Others (나머지)

newField.Area = 1;
olapGrid.MoveField(newField.Name, 0, false);
olapGrid.Refresh();
```

### 커스텀 디멘젼 (CustomDimension) — 수식 기반 가상 멤버

```typescript
const customDim = olapGrid.addCustomDimension("REGION", "수도권");
customDim.Caption = "수도권";
customDim.Formula = "[REGION] == '서울' || [REGION] == '경기' || [REGION] == '인천'";
customDim.DataCellFormula = "";  // 빈 문자열이면 기본 집계
customDim.Format = "#,##0";
customDim.DisplayBlankEntry = false;

// 수식 규칙: [FIELD_NAME], ==, !=, >, <, >=, <=, &&, ||, !
// 조회/제거
olapGrid.getCustomDimension("REGION");
olapGrid.RemoveCustomDimension("REGION");
olapGrid.ClearCustomDimensions();
```

---

## 12. 스타일링

### BoxStyle 적용

```typescript
// Options 레벨 (전체 영역)
olapGrid.Options.setBoxStyle("DataCell", "MyDataCellStyle");
olapGrid.Options.setBoxStyle("RowHeaderCell", "MyRowHeaderStyle");
olapGrid.Options.setBoxStyle("ColumnHeaderCell", "MyColumnHeaderStyle");
olapGrid.Options.setBoxStyle("TotalDataCell", "MyTotalStyle");
olapGrid.Options.setBoxStyle("GrandTotalDataCell", "MyGrandTotalStyle");
olapGrid.Options.setBoxStyle("Selection", "MySelectionStyle");
olapGrid.Options.setBoxStyle("LockedStyle", "MyLockedStyle");
olapGrid.Options.setBoxStyle("EditedStyle", "MyEditedStyle");
olapGrid.Options.setBoxStyle("ModifiedStyle", "MyModifiedStyle");

// 필드 레벨 (특정 필드만)
const fld = olapGrid.getField("SALES");
fld.setBoxStyle("HeaderCellStyle", "SalesHeaderStyle");
fld.setBoxStyle("DataCellStyle", "SalesDataStyle");
fld.setBoxStyle("TotalDataCellStyle", "SalesTotalStyle");
fld.setBoxStyle("GrandTotalDataCellStyle", "SalesGrandTotalStyle");
```

### 전역 스타일 속성

```typescript
const style = olapGrid.Options.Style;
style.BackgroundColor = "#FFFFFF";
style.FontName = "Malgun Gothic";
style.FontSize = 11;
style.LineColor = "#D0D0D0";
style.FilterIConColor = "#666666";
style.FilteredIConColor = "#0078D4";
style.ColumnHeaderVerticalAlignment = 1;  // 0=Top, 1=Middle, 2=Bottom
style.RowHeaderVerticalAlignment = 1;
```

### 필드 정렬 속성

```typescript
fld.HeaderAlignment = 2;  // 0=Left, 1=Right, 2=Center
fld.TextAlignment = 1;    // 데이터 셀 정렬
```

---

## 13. 내보내기 & Drill-to-Detail

### 내보내기

```typescript
olapGrid.ExportExcel();
olapGrid.ExportCSV();
olapGrid.ExportText();

// Base64 이미지
olapGrid.getBase64Image(function (base64Str) {
  // base64 문자열 활용
});
```

### Drill-to-Detail (상세 드릴)

```typescript
olapGrid.OnDataCellDoubleClick = function (sender, args) {
  const xml = sender.getDrillToDetailXml(args.DataCell);
  if (xml) {
    Matrix.DrillToDetail(sender, xml, "DataGrid1");
  }
};

// 직접 실행
olapGrid.ExecuteDrillToDetail(dataCell, "DataGrid1");

// 피벗 데이터 조회 (Excel GETPIVOTDATA 유사)
const val = olapGrid.getPivotData("SALES", "[REGION]='서울'");
```

### 차트 데이터 연동

```typescript
olapGrid.UseChartSourceTotal = false;
olapGrid.UseChartSourceGrandTotal = false;
olapGrid.UseChartSourceReverse = false;
olapGrid.getField("RATIO").UseChartSource = false;

// 선택 영역 → DataTable
const chartTable = olapGrid.getSelection().getChartTable(2, false, false, false);
```

---

## 14. 스크롤 제어

```typescript
olapGrid.ScrollLeft = 100;
olapGrid.ScrollTop = 200;
olapGrid.Update();

// 두 OlapGrid 스크롤 동기화
olapGrid1.OnScroll = function (sender, args) {
  olapGrid2.ScrollLeft = args.ScrollLeft;
  olapGrid2.ScrollTop = args.ScrollTop;
  olapGrid2.Update();
};
```

---

## 15. 컨텍스트 메뉴 제어

```typescript
const menu = olapGrid.getMenuOption();
menu.ExportExcel = true;
menu.ExportCSV = true;
menu.ExportText = true;
menu.ExpandAll = true;
menu.CollapsedAll = true;
menu.Sort = true;
menu.ClearFilter = true;
menu.AxisChange = true;        // 행/열 전환
menu.LayoutManager = true;
menu.FormulaEdit = true;
menu.CustomDimension = true;
menu.MultiHeader = true;
menu.FieldGroup = true;
menu.FilterManager = true;
menu.VisibleTotal = true;
menu.Format = true;
```

---

## 16. 다이얼로그

```typescript
olapGrid.OpenDialogFilter("REGION");             // 필터 편집
olapGrid.OpenDialogFilterManager();              // 필터 관리자
olapGrid.OpenDialogLayout();                     // 레이아웃 편집
olapGrid.OpenDialogProperties();                 // 속성
olapGrid.OpenDialogFormatting();                 // 서식
olapGrid.OpenDialogFormulaEditor("CALC_FIELD");  // 수식 편집
olapGrid.OpenDialogCalculatorField();            // 계산 필드
olapGrid.OpenDialogCustomDimension("REGION");    // 커스텀 디멘젼
olapGrid.OpenDialogCustomSort("PRODUCT");        // 커스텀 정렬
olapGrid.OpenDialogDimensionGroup("PRODUCT");    // 디멘젼 그룹
olapGrid.OpenDialogMultiHeader();                // 멀티헤더
olapGrid.OpenDialogAnalysisItemsSettings();      // i-META 분석 항목
```

---

## 17. API 레퍼런스

### 타입 Import

```typescript
import OlapGrid from "aud/control/OlapGrid";
import type { OlapField } from "aud/control/olap/OlapField";
import type { ScriptDataCell } from "aud/control/olap/ScriptDataCell";
import type { ScriptHeaderCell } from "aud/control/olap/ScriptHeaderCell";
import type { ScriptSelection } from "aud/control/olap/ScriptSelection";
import type { ScriptMultiHeader, IMultiHeaderCell } from "aud/control/olap/ScriptMultiHeader";
import type { OlapFilter } from "aud/control/olap/OlapFilter";
import type { DimensionGroup, DimensionGroupItem } from "aud/control/olap/DimensionGroup";
import type { FieldGroup } from "aud/control/olap/FieldGroup";
import type { ScriptCustomDimension } from "aud/control/olap/ScriptCustomDimension";
import type { ScriptMenuOption } from "aud/control/olap/ScriptMenuOption";
```

### IOlapGrid 속성

| 속성 | 타입 | R/W | 설명 |
|------|------|-----|------|
| `Caption` | `string` | RW | 컨트롤 캡션 |
| `ColumnCount` | `number` | R | 데이터 영역 열 수 |
| `RowCount` | `number` | R | 데이터 영역 행 수 |
| `ScrollLeft` | `number` | RW | 가로 스크롤 위치 |
| `ScrollTop` | `number` | RW | 세로 스크롤 위치 |
| `Selection` | `ScriptSelection` | R | 선택 영역 |
| `SubOlapGrid` | `OlapGrid` | RW | 하위 OlapGrid |
| `AutoRefresh` | `boolean` | RW | 보고서 열 때 자동 쿼리 |
| `AutoBindingRefresh` | `boolean` | RW | 콤보 필터 변경 시 자동 쿼리 |
| `DataSourceKey` | `string` | RW | 데이터소스 키 |
| `Fields` | `OlapField[]` | R | 필드 배열 |
| `Options` | `Options` | R | 옵션 설정 |
| `DoRefresh` | `boolean` | RW | 새로고침 대상 포함 여부 |
| `DoExport` | `boolean` | RW | 내보내기 대상 포함 여부 |
| `DisableClipBoard` | `boolean` | RW | 클립보드 비활성화 |
| `UseChartSourceTotal` | `boolean` | RW | 차트 소스에 소계 포함 |
| `UseChartSourceGrandTotal` | `boolean` | RW | 차트 소스에 총계 포함 |
| `UseChartSourceReverse` | `boolean` | RW | 차트 데이터 행/열 반전 |

### OlapField 주요 속성

| 속성 | 타입 | R/W | 설명 |
|------|------|-----|------|
| `Name` | `string` | R | 필드 이름 |
| `Caption` | `string` | RW | 표시 이름 |
| `Category` | `enCategory` | RW | 0=Default, 1=Dimension, 2=Measure, 3=Attribute, 4=Period |
| `Area` | `enArea` | RW | 0=Hidden, 1=Row, 2=Column, 3=Filter, 4=Data |
| `AreaIndex` | `number` | RW | 영역 내 순서 |
| `Visible` | `boolean` | RW | 표시 여부 |
| `Width` | `number` | RW | 열 너비 |
| `SummaryType` | `enSummaryType` | RW | 집계 유형 |
| `TotalSummaryType` | `enTotalSummaryType` | RW | 소계 집계 유형 |
| `Format` | `string` | RW | 표시 형식 ("#,##0.00") |
| `Formula` | `string` | RW | 계산 수식 |
| `Unit` | `number` | RW | 표시 단위 |
| `SortType` | `enSortType` | RW | 0=None, 1=Asc, 2=Desc |
| `FilterInfo` | `OlapFilter` | R | 현재 필터 상태 |
| `EditMethod` | `number` | RW | 0=편집불가, 1=가중배분, 2=균등배분 |
| `EditPrecision` | `number` | RW | 소수 자릿수 |
| `VisibleSubTotal` | `boolean` | RW | 소계 표시 여부 |
| `CreateType` | `enOlapFieldCreateType` | R | 0=Default, 1=Measures, 2=DimensionGroup, 3=HierarchyGroup, 4=CalcTemp |

### ScriptDataCell

| 속성/메서드 | 타입 | 설명 |
|-------------|------|------|
| `Text` | `string` (R) | 포맷된 텍스트 |
| `Value` | `string \| number \| null` (R) | 원시 값 |
| `Value2` | `string \| number \| undefined` (R) | 참조 값 |
| `Field` | `OlapField` (R) | 데이터 필드 |
| `RowHeader` | `ScriptHeaderCell` (R) | 행 헤더 |
| `ColumnHeader` | `ScriptHeaderCell` (R) | 열 헤더 |
| `IsTotal` | `boolean` (R) | 소계 여부 |
| `IsGrandTotal` | `boolean` (R) | 총계 여부 |
| `updateValue(newValue)` | `void` | 셀 값 업데이트 |
| `getHeaderValue(fieldName)` | `string` | 특정 필드의 헤더 값 |
| `getHeaderCell(fieldName)` | `ScriptHeaderCell` | 특정 필드의 헤더 셀 |

### ScriptHeaderCell

| 속성/메서드 | 타입 | 설명 |
|-------------|------|------|
| `Text` | `string` (R) | 표시 텍스트 |
| `Key` | `string` (R) | 키 값 |
| `Field` | `OlapField` (R) | 연결 필드 |
| `Parent` | `ScriptHeaderCell` (R) | 부모 헤더 |
| `Childrens` | `ScriptHeaderCell[]` (R) | 자식 헤더 |
| `IsTotal` / `IsGrandTotal` | `boolean` (R) | 소계/총계 여부 |
| `Expanded` | `boolean` (RW) | 펼침 상태 |
| `Expand()` / `Collapsed()` | `void` | 펼치기/접기 |

### 이벤트 목록

| 이벤트 | Args | 설명 |
|--------|------|------|
| `OnClick` | `{Id}` | 컨트롤 클릭 |
| `OnDataCellDoubleClick` | `{Id, DataCell}` | 데이터 셀 더블클릭 |
| `OnHeaderClicked` | `{Handled}` | 헤더 클릭 |
| `OnHeaderDoubleClicked` | `{}` | 헤더 더블클릭 |
| `OnMultiHeaderClicked` | `{}` | 멀티헤더 클릭 |
| `OnOlapDataCellStartEdit` | `{Cancel}` | 편집 시작 |
| `OnOlapDataCellEndEdit` | `{Cell, BeforeValue, AfterValue, LockedValue, Cancel}` | 편집 종료 |
| `OnDataBindEnd` | `{RecordCount}` | 데이터 바인딩 완료 |
| `OnSelectionChanged` | `{}` | 선택 변경 |
| `OnFilterChanged` | `{}` | 필터 변경 |
| `OnLayoutUpdated` | `{}` | 레이아웃 변경 |
| `OnExpandChanged` | `{}` | 펼침/접기 변경 |
| `OnUpdated` | `{}` | 화면 갱신 |
| `OnScroll` | `{ScrollLeft, ScrollTop}` | 스크롤 |
| `OnCellResized` | `{}` | 셀 크기 변경 |
| `OnCalculateWriteBackEnd` | `{}` | WriteBack 완료 |
| `OnExportStart` | `{ExportType, ExportFileName, Cancel, ...}` | 내보내기 시작 |
| `OnContextMenuOpening` | `{HitInfo, Menu, Cancel}` | 컨텍스트 메뉴 |
| `OnMouseMove` | `{HitInfo}` | 마우스 이동 |
| `OnBeforeSortChange` | `{Canceled}` | 정렬 변경 전 |

### Enum 레퍼런스

| Enum | 값 |
|------|----|
| enArea | Hidden(0), Row(1), Column(2), Filter(3), Data(4) |
| enSummaryType | None(0), Sum(1), Min(2), Max(3), Average(4), Count(5), Calculate(9), DistinctCount(13), Text(14) |
| enSortType | None(0), Asc(1), Desc(2), Custom(3), MeasureAsc(4), MeasureDesc(5) |
| enOlapFilterType | In(0), NotIn(1), BetWeen(4) |
| enOlapMeasureFilterType | Equals(0), Greater(1), GreaterOrEquals(2), Less(3), LessOrEquals(4), NotEquals(5) |
| enOlapViewType | Default(0), TreeView(1) |
| enOlapFieldCreateType | Default(0), Measures(1), DimensionGroup(2), HierarchyGroup(3), CalcTemp(4) |
| enHorizonAlign | Left(0), Right(1), Center(2) |
| enVerticalAlign | Top(0), Middle(1), Bottom(2) |
| enDimensionGroupItemType | Normal(0), Others(1), All(2) |
| enRowTotalLocation / enColumnTotalLocation | Bottom(0), Top(1), Both(2) |
