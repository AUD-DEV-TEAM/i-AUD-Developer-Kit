---
name: iaud-boxstyle-guide
description: i-AUD BoxStyle 활용 가이드. BoxStyle은 CSS처럼 서버에서 공통 관리되는 스타일 세트입니다. 배경색, 테두리, 폰트를 하나의 키(Name)로 묶어 여러 보고서에서 일관된 디자인을 적용할 수 있습니다. "BoxStyle", "스타일 적용", "공통 스타일", "테마 스타일", "Style.Type", "버튼 스타일", "그리드 스타일", "OLAP 스타일" 등을 요청할 때 사용하세요.
---

# i-AUD BoxStyle 활용 가이드

## 1. 개요

BoxStyle은 i-AUD 플랫폼의 **공통 스타일 관리 시스템**입니다.
HTML/CSS에서 `.css` 파일로 스타일을 분리 관리하듯, BoxStyle은 배경색, 테두리, 폰트를 하나의 키(Name)로 묶어 서버에서 관리하며, 여러 보고서(프로그램)에서 동일한 디자인을 일관되게 적용할 수 있습니다.

### 핵심 개념

| 개념 | 설명 |
|------|------|
| **BoxStyle Name (Key)** | `BX` + 32자리 HEX UUID (예: `BXD42C71B0275149C4BB6B74FD68B7C8E4`) |
| **StyleName** | 사람이 읽을 수 있는 스타일 이름 (예: `Button Default`) |
| **Style.Type** | 스타일 적용 모드: `0`=Skin(테마), `1`=BoxStyle, `2`=Custom(직접 지정) |
| **저장 위치** | 서버의 `STUDIO_BOXSTYLE.xml` 파일 (JSON 형식) |

### Style.Type 모드 비교

| Type | 이름 | 설명 | 사용 시점 |
|------|------|------|-----------|
| `0` | Skin | 시스템 테마 기본 스타일 | 기본값, 테마에 따라 자동 적용 |
| `1` | BoxStyle | 사전 정의된 BoxStyle 적용 | 공통 스타일을 여러 컨트롤에 일괄 적용할 때 |
| `2` | Custom | 개별 속성 직접 지정 | 특정 컨트롤만 개별적으로 스타일 변경할 때 |

## 2. BoxStyle 데이터 모델

### 2.1 전체 구조

```json
{
    "Name": "BXD42C71B0275149C4BB6B74FD68B7C8E4",
    "StyleName": "Button Default",
    "Limit": false,
    "CreateUser": "admin",
    "Background": {
        "ColorR": 249, "ColorG": 249, "ColorB": 251, "ColorA": 1
    },
    "Border": {
        "ColorR": 194, "ColorG": 194, "ColorB": 197, "ColorA": 1,
        "CornerRadius": "4,4,4,4",
        "LineType": "solid",
        "Thickness": "1,1,1,1"
    },
    "Font": {
        "Bold": true,
        "ColorR": 48, "ColorG": 48, "ColorB": 49, "ColorA": 1,
        "Family": "inherit",
        "HorizontalAlignment": "center",
        "Italic": false,
        "Size": 12,
        "UnderLine": false,
        "VerticalAlignment": "middle"
    }
}
```

### 2.2 속성 상세

#### Background (배경색)

| 속성 | 타입 | 설명 | 범위 |
|------|------|------|------|
| `ColorR` | number | 빨강 | 0~255 |
| `ColorG` | number | 초록 | 0~255 |
| `ColorB` | number | 파랑 | 0~255 |
| `ColorA` | number | 투명도 | 0~1 |

#### Border (테두리)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `ColorR/G/B/A` | number | 테두리 색상 | 위 Background와 동일 |
| `CornerRadius` | string | 모서리 둥글기 (상,우,하,좌) | `"4,4,4,4"` |
| `LineType` | string | 선 유형 | `"none"`, `"solid"`, `"double"`, `"dotted"`, `"dashed"` |
| `Thickness` | string | 두께 (상,우,하,좌) | `"1,1,1,1"` |

#### Font (글꼴)

| 속성 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `Bold` | boolean | 굵게 | `true` / `false` |
| `ColorR/G/B/A` | number | 글자 색상 | 위 Background와 동일 |
| `Family` | string | 글꼴 | `"inherit"`, `"맑은 고딕"`, `"Arial"` |
| `HorizontalAlignment` | string | 가로 정렬 | `"left"`, `"center"`, `"right"` |
| `Italic` | boolean | 기울임 | `true` / `false` |
| `Size` | number | 크기 (px) | `12` |
| `UnderLine` | boolean | 밑줄 | `true` / `false` |
| `VerticalAlignment` | string | 세로 정렬 | `"top"`, `"middle"`, `"bottom"` |

## 3. BoxStyle 지원 컨트롤 전체 목록

### 3.1 공통 (모든 컨트롤)

모든 컨트롤은 `Control` 인터페이스를 상속받으며, `Style` 속성을 통해 BoxStyle을 적용할 수 있습니다.

```typescript
// Control.Style 속성 (drawing/Style 인터페이스)
interface Style {
    Background: SolidColorBrush;    // 배경색
    Border: BorderInfo;              // 테두리
    Font: FontInfo;                  // 글꼴
    BoxStyle: string;                // BoxStyle 키
    Type: string;                    // "0"=Skin, "1"=BoxStyle, "2"=Custom

    SetBoxStyleKey(boxStyleKey: string): string;    // 키로 적용
    SetBoxStyleName(boxStyleName: string): string;  // 이름으로 적용
}
```

**적용 예시 (Label, TextBox, ComboBox 등 모든 컨트롤 공통)**:
```js
var ctrl = Matrix.getObject("컨트롤명");
// 방법 1: BoxStyle 이름으로 적용
ctrl.Style.SetBoxStyleName("Button Default");
ctrl.Update();

// 방법 2: BoxStyle 키로 적용
ctrl.Style.SetBoxStyleKey("BXD42C71B0275149C4BB6B74FD68B7C8E4");
ctrl.Update();
```

**주의**: `Style.SetBoxStyleKey()` 또는 `SetBoxStyleName()` 호출 후 반드시 컨트롤에 `Update()`를 호출해야 화면에 반영됩니다.

### 3.2 Button / FileUploadButton

버튼 계열 컨트롤은 **마우스 상태별 BoxStyle**을 추가로 지원합니다.

| 메서드 | 설명 |
|--------|------|
| `SetMouseOverBoxStyle(identifier)` | 마우스 오버 시 스타일 (Key 또는 Name) |
| `SetMouseDownBoxStyle(identifier)` | 마우스 누름 시 스타일 (Key 또는 Name) |

```js
// 버튼 상태별 스타일 적용
var btn = Matrix.getObject("btnAction");
btn.Style.SetBoxStyleName("Button Default");       // 기본 스타일
btn.SetMouseOverBoxStyle("Button Hover");            // 마우스 오버
btn.SetMouseDownBoxStyle("Button Pressed");          // 마우스 다운
btn.Cursor = "pointer";
btn.Update();
```

### 3.3 DataGrid / TreeGrid 컬럼 (DataGridColumn)

| 메서드 | 설명 |
|--------|------|
| `SetBoxStyle(BoxStyleCode)` | 데이터 영역 스타일 적용 |
| `SetHeaderBoxStyle(BoxStyleCode)` | 헤더 영역 스타일 적용 |
| `ClearBoxStyle()` | 적용된 스타일 제거 |

```js
var grid = Matrix.getObject("DataGrid");
var columns = grid.GetColumns();

// 특정 컬럼 데이터 영역에 BoxStyle 적용
columns[0].SetBoxStyle("BX...");

// 특정 컬럼 헤더에 BoxStyle 적용
columns[0].SetHeaderBoxStyle("BX...");

// 스타일 제거
columns[0].ClearBoxStyle();

grid.ReDraw();  // 반드시 ReDraw() 호출
```

### 3.4 DataGrid 멀티 헤더 (MultiHeaderCell)

| 속성/메서드 | 설명 |
|-------------|------|
| `CellStyle` | Style 객체 직접 접근 |
| `SetBoxStyleKey(key)` | 키로 적용 |
| `SetBoxStyleName(name)` | 이름으로 적용 |

```js
var grid = Matrix.getObject("DataGrid");
var mHeaders = grid.GetMultiHeader();

// 멀티 헤더 전체 일괄 스타일 적용
for (var r = 0; r < mHeaders.MaxRow; r++) {
    for (var c = 0; c < mHeaders.MaxColumn; c++) {
        var cell = mHeaders.GetCell(r, c);
        cell.SetBoxStyleName("Header Title Active");
    }
}
grid.ReDraw();
```

### 3.5 DataGrid/TreeGrid 스타일 옵션 (StyleOption)

`grid.getStyleOption()`으로 접근하며, 그리드 영역별 BoxStyle 키를 설정합니다.

| 영역 | 속성 경로 | 설명 |
|------|-----------|------|
| 컬럼 헤더 | `HeaderStyle.ColumnHeaderStyle` | 컬럼 헤더 BoxStyle 키 |
| 행 헤더 | `HeaderStyle.RowHeaderStyle` | 행 헤더 BoxStyle 키 |
| 고정행 상단 | `FixedRowStyle.TopRowStyle` | 상단 고정행 BoxStyle 키 |
| 고정행 하단 | `FixedRowStyle.BottomRowStyle` | 하단 고정행 BoxStyle 키 |

```js
var grid = Matrix.getObject("DataGrid");
var styleOpt = grid.getStyleOption();

// 헤더 스타일 변경
styleOpt.HeaderStyle.ColumnHeaderStyle = "BX...";
styleOpt.HeaderStyle.RowHeaderStyle = "BX...";

// 고정행 스타일 변경
styleOpt.FixedRowStyle.TopRowStyle = "BX...";
styleOpt.FixedRowStyle.BottomRowStyle = "BX...";

grid.ReDraw();
```

### 3.6 OlapGrid 영역별 스타일

#### Options.setBoxStyle (전체 영역)

```js
var olap = Matrix.getObject("OlapGrid");
var opts = olap.GetOptions();

// 데이터 셀 영역
opts.setBoxStyle("DataCell", "BX...");
opts.setBoxStyle("TotalDataCell", "BX...");
opts.setBoxStyle("GrandTotalDataCell", "BX...");

// 행 헤더 영역
opts.setBoxStyle("RowHeaderCell", "BX...");
opts.setBoxStyle("RowTotalHeaderCell", "BX...");
opts.setBoxStyle("RowGrandTotalHeaderCell", "BX...");

// 열 헤더 영역
opts.setBoxStyle("ColumnHeaderCell", "BX...");
opts.setBoxStyle("ColumnTotalHeaderCell", "BX...");
opts.setBoxStyle("ColumnGrandTotalHeaderCell", "BX...");

// 특수 영역
opts.setBoxStyle("Selection", "BX...");
opts.setBoxStyle("LockedStyle", "BX...");
opts.setBoxStyle("EditedStyle", "BX...");
opts.setBoxStyle("ModifiedStyle", "BX...");
```

**OlapGrid 전체 스타일 영역 (enOptionStyle)**:

| 카테고리 | 스타일명 | 설명 |
|----------|---------|------|
| 데이터 셀 | `DataCell` | 일반 데이터 셀 |
| | `TotalDataCell` | 소계 데이터 셀 |
| | `GrandTotalDataCell` | 총계 데이터 셀 |
| 행 헤더 | `RowHeaderCell` | 행 헤더 셀 |
| | `RowTotalHeaderCell` | 행 소계 헤더 |
| | `RowGrandTotalHeaderCell` | 행 총계 헤더 |
| 열 헤더 | `ColumnHeaderCell` | 열 헤더 셀 |
| | `ColumnTotalHeaderCell` | 열 소계 헤더 |
| | `ColumnGrandTotalHeaderCell` | 열 총계 헤더 |
| 필드 | `DimensionField` | 차원 필드 |
| | `MeasureField` | 측정값 필드 |
| | `AttributeField` | 속성 필드 |
| | `PeriodField` | 기간 필드 |
| | `DatasField` | 데이터 필드 |
| 필드 영역 | `FilterFieldArea` | 필터 필드 영역 |
| | `DataFieldArea` | 데이터 필드 영역 |
| | `ColumnFieldArea` | 열 필드 영역 |
| | `RowFieldArea` | 행 필드 영역 |
| 상태 | `Selection` | 선택 상태 |
| | `LockedStyle` | 잠금 상태 |
| | `EditedStyle` | 편집 상태 |
| | `ModifiedStyle` | 수정 상태 |

#### OlapField.setBoxStyle (개별 필드)

```js
var olap = Matrix.getObject("OlapGrid");
var field = olap.GetField("매출액");

// 필드별 개별 스타일 적용
field.setBoxStyle("HeaderCellStyle", "BX...");
field.setBoxStyle("DataCellStyle", "BX...");
field.setBoxStyle("TotalDataCellStyle", "BX...");
field.setBoxStyle("GrandTotalDataCellStyle", "BX...");
field.setBoxStyle("HeaderTotalCellStyle", "BX...");
```

#### OptionStyle (OLAP 옵션 스타일 관리)

```js
var olap = Matrix.getObject("OlapGrid");
var optStyle = olap.GetOptionStyle();

// BoxStyle 조회
var key = optStyle.GetBoxStyleKey("DataCell");

// BoxStyle 설정
optStyle.SetBoxStyleKey("DataCell", "BX...");
```

### 3.7 BoxStyle 컨트롤 (ext/BoxStyle)

디자이너에서 배치하는 BoxStyle 선택 UI 컨트롤입니다.

```js
var bsCtrl = Matrix.getObject("BoxStyleControl");

// 읽기 전용 속성
var code = bsCtrl.BoxStyleCode;  // 선택된 BoxStyle 코드
var name = bsCtrl.BoxStyleName;  // 선택된 BoxStyle 이름

// BoxStyle 적용
bsCtrl.SetBoxStyleKey("BX...");
bsCtrl.Update();

// 이벤트: BoxStyle 선택 시
bsCtrl.OnBoxStyleSelected = function(sender, args) {
    // args.Id: 컨트롤 이름
    // args.BoxStyleKey: 선택된 BoxStyle 키
    var targetCtrl = Matrix.getObject("Label1");
    targetCtrl.Style.SetBoxStyleKey(args.BoxStyleKey);
    targetCtrl.Update();
};

// 이벤트: 체크박스 변경 시
bsCtrl.OnBoxStyleCheckValueChange = function(sender, args) {
    // args.Id: 컨트롤 이름
    // args.IsChecked: 체크 상태
};
```

## 4. BoxStyle 관리 API (Matrix 전역 객체)

### 4.1 BoxStyleList 조회/관리

```js
// BoxStyleList 가져오기
var bsList = Matrix.GetBoxStyleList();

// 키로 BoxStyle 가져오기
var bs = bsList.Get("BXD42C71B0275149C4BB6B74FD68B7C8E4");

// 이름으로 BoxStyle 가져오기
var bs = bsList.GetItemByStyleName("Button Default");

// 새 BoxStyle 생성 (기본값)
var newBs = bsList.New();

// BoxStyle 삭제
bsList.Remove("BXD42C71B0275149C4BB6B74FD68B7C8E4");
```

### 4.2 BoxStyle 단건 조회

```js
// 이름으로 BoxStyle 가져오기
var bs = Matrix.getBoxStyle("Button Default");
var style = bs.Style;  // Style 객체
var name = bs.StyleName;  // 스타일명
```

### 4.3 BoxStyle 서버 업로드

```js
// 변경된 BoxStyleList를 서버에 업로드
var bsList = Matrix.GetBoxStyleList();
// ... bsList 수정 작업 ...
Matrix.UploadBoxStyleList(bsList, function(result) {
    Matrix.Alert("BoxStyle 업로드 완료");
});
```

## 5. MTSD에서 BoxStyle 적용 (정적 설정)

### 5.1 Element Style에 BoxStyle 적용

MTSD 파일에서 컨트롤의 `Style` 속성에 `Type: 1`과 `BoxStyle` 키를 설정합니다.

```json
{
    "Type": "Label",
    "Name": "lblTitle",
    "Style": {
        "Type": 1,
        "BoxStyle": "BXD42C71B0275149C4BB6B74FD68B7C8E4"
    },
    "Text": "제목"
}
```

### 5.2 Style.Type별 MTSD 설정 예시

**Type=0 (Skin/테마 기본)**:
```json
"Style": {
    "Type": 0
}
```

**Type=1 (BoxStyle 적용)**:
```json
"Style": {
    "Type": 1,
    "BoxStyle": "BXD42C71B0275149C4BB6B74FD68B7C8E4"
}
```

**Type=2 (직접 지정)**:
```json
"Style": {
    "Type": 2,
    "Background": { "Color": { "R": 255, "G": 255, "B": 255, "A": 255 } },
    "Border": {
        "Color": { "R": 200, "G": 200, "B": 200, "A": 255 },
        "CornerRadius": "0,0,0,0",
        "LineType": "solid",
        "Thickness": "1,1,1,1"
    },
    "Font": {
        "Bold": false,
        "Color": { "R": 0, "G": 0, "B": 0, "A": 255 },
        "Family": "맑은 고딕",
        "HorizontalAlignment": "left",
        "Italic": false,
        "Size": "12",
        "UnderLine": false,
        "VerticalAlignment": "middle"
    }
}
```

## 6. MCP 도구 활용

### 6.1 사용 가능한 MCP 도구

| 도구 | 설명 |
|------|------|
| `get_boxstyle_list` | 서버에 등록된 전체 BoxStyle 목록 조회 |
| `save_boxstyle` | 새 BoxStyle 저장 또는 기존 BoxStyle 수정 |
| `generate_uuid` | BoxStyle Name용 UUID 생성 (`BX` 접두사) |

### 6.2 새 BoxStyle 생성 워크플로우

```
1단계: UUID 생성
   → generate_uuid { prefix: "BX" }
   → 결과: "BX7A3F1E2B904D5C6A8B1E3F7D9A2C4B5E"

2단계: BoxStyle 저장
   → save_boxstyle {
       Name: "BX7A3F1E2B904D5C6A8B1E3F7D9A2C4B5E",
       StyleName: "Primary Button",
       Background: { ColorR: 59, ColorG: 130, ColorB: 246, ColorA: 1 },
       Border: { ColorR: 59, ColorG: 130, ColorB: 246, ColorA: 1,
                 CornerRadius: "6,6,6,6", LineType: "solid", Thickness: "1,1,1,1" },
       Font: { Bold: true, ColorR: 255, ColorG: 255, ColorB: 255, ColorA: 1,
               Family: "inherit", HorizontalAlignment: "center", Italic: false,
               Size: 14, UnderLine: false, VerticalAlignment: "middle" }
     }

3단계: 컨트롤에 적용 (MTSD)
   → "Style": { "Type": 1, "BoxStyle": "BX7A3F1E2B904D5C6A8B1E3F7D9A2C4B5E" }

3단계 (대안): 클라이언트 스크립트로 적용
   → ctrl.Style.SetBoxStyleName("Primary Button");
   → ctrl.Update();
```

### 6.3 기존 BoxStyle 조회 후 활용

```
1단계: 목록 조회
   → get_boxstyle_list
   → 결과에서 원하는 스타일의 Name(Key) 확인

2단계: MTSD 또는 스크립트에서 사용
   → "Style": { "Type": 1, "BoxStyle": "조회된 Name 키" }
```

## 7. 실전 활용 패턴

### 7.1 버튼 그룹 일괄 스타일 적용

```js
// 문서 로드 시 버튼 그룹에 일관된 스타일 적용
Matrix.OnDocumentLoadComplete = function(sender, args) {
    var buttons = ["btnSearch", "btnSave", "btnDelete", "btnExport"];

    for (var i = 0; i < buttons.length; i++) {
        var btn = Matrix.getObject(buttons[i]);
        btn.Style.SetBoxStyleName("Button Default");
        btn.SetMouseOverBoxStyle("Button Hover");
        btn.SetMouseDownBoxStyle("Button Pressed");
        btn.Cursor = "pointer";
        btn.Update();
    }
};
```

### 7.2 조건별 동적 스타일 변경

```js
// 상태에 따라 스타일 변경
function updateStatus(status) {
    var lblStatus = Matrix.getObject("lblStatus");

    switch (status) {
        case "success":
            lblStatus.Style.SetBoxStyleName("Status Success");
            lblStatus.Text = "완료";
            break;
        case "error":
            lblStatus.Style.SetBoxStyleName("Status Error");
            lblStatus.Text = "오류";
            break;
        case "pending":
            lblStatus.Style.SetBoxStyleName("Status Pending");
            lblStatus.Text = "대기중";
            break;
    }
    lblStatus.Update();
}
```

### 7.3 그리드 컬럼별 차등 스타일

```js
var grid = Matrix.getObject("DataGrid");
var columns = grid.GetColumns();

for (var i = 0; i < columns.length; i++) {
    var col = columns[i];

    // 숫자 컬럼은 다른 스타일 적용
    if (col.DataType === 1) { // Number
        col.SetBoxStyle("BX_NUMBER_CELL");
        col.SetHeaderBoxStyle("BX_NUMBER_HEADER");
    } else {
        col.SetBoxStyle("BX_TEXT_CELL");
        col.SetHeaderBoxStyle("BX_TEXT_HEADER");
    }
}
grid.ReDraw();
```

### 7.4 OlapGrid 전체 테마 일괄 변경

```js
function applyOlapTheme(themeName) {
    var olap = Matrix.getObject("OlapGrid");
    var opts = olap.GetOptions();

    // 데이터 영역
    opts.setBoxStyle("DataCell", themeName + "_Data");
    opts.setBoxStyle("TotalDataCell", themeName + "_Total");
    opts.setBoxStyle("GrandTotalDataCell", themeName + "_GrandTotal");

    // 헤더 영역
    opts.setBoxStyle("RowHeaderCell", themeName + "_RowHeader");
    opts.setBoxStyle("ColumnHeaderCell", themeName + "_ColHeader");

    // 상태 영역
    opts.setBoxStyle("Selection", themeName + "_Selection");
    opts.setBoxStyle("EditedStyle", themeName + "_Edited");
}

// 사용 예
applyOlapTheme("Dark");
```

### 7.5 클라이언트에서 BoxStyle 동적 생성 및 업로드

```js
// 새 BoxStyle을 클라이언트에서 생성하여 서버에 업로드
var bsList = Matrix.GetBoxStyleList();
var newBs = bsList.New();

// 스타일 설정
newBs.StyleName = "Custom Highlight";
var style = newBs.Style;
style.Background.Color.SetRGBA(255, 243, 205, 255);
style.Border.Color.SetRGBA(255, 193, 7, 255);
style.Border.LineType = "solid";
style.Border.Thickness = "2,2,2,2";
style.Border.CornerRadius = "4,4,4,4";
style.Font.Color.SetRGBA(133, 100, 4, 255);
style.Font.Size = "13";
style.Font.Bold = true;

// 서버에 업로드
Matrix.UploadBoxStyleList(bsList, function(result) {
    Matrix.Alert("BoxStyle이 등록되었습니다.");
    // 업로드 후 컨트롤에 적용
    var label = Matrix.getObject("lblHighlight");
    label.Style.SetBoxStyleName("Custom Highlight");
    label.Update();
});
```

## 8. 주의사항

1. **Update() / ReDraw() 호출 필수**: BoxStyle 적용 후 반드시 해당 메서드를 호출해야 화면에 반영됩니다.
   - 일반 컨트롤: `ctrl.Update()`
   - 그리드 계열: `grid.ReDraw()`

2. **Style.Type 확인**: BoxStyle을 적용하려면 `Style.Type`이 `1`이어야 합니다. `SetBoxStyleKey()`/`SetBoxStyleName()` 호출 시 자동으로 Type이 변경됩니다.

3. **Key vs Name**: 대부분의 메서드는 BoxStyle Key(`BX...`) 또는 StyleName 모두 사용 가능합니다. Key는 고유하지만 가독성이 떨어지고, Name은 읽기 쉽지만 중복 가능성이 있습니다.

4. **존재하지 않는 BoxStyle**: 존재하지 않는 Key나 Name을 지정하면 스타일이 적용되지 않습니다. `get_boxstyle_list` MCP 도구로 미리 확인하세요.

5. **서버 저장**: 클라이언트에서 `BoxStyleList.New()`로 생성한 BoxStyle은 `Matrix.UploadBoxStyleList()`를 호출해야 서버에 영구 저장됩니다. MCP 도구 `save_boxstyle`을 사용하면 서버에 직접 저장됩니다.

6. **Limit/CreateUser**: BoxStyle에 `Limit: true`가 설정되면 `CreateUser`와 동일한 사용자만 수정할 수 있습니다.