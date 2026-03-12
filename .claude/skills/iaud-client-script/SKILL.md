---
name: iaud-client-script
description: i-AUD 클라이언트 스크립트 개발 가이드. 브라우저에서 실행되는 TypeScript 스크립트 작성법을 안내합니다. "클라이언트 스크립트", "버튼 이벤트", "그리드 조작", "UI 컨트롤", "Matrix API", "화면 개발" 등을 물어볼 때 사용하세요.
---

# i-AUD 클라이언트 스크립트 개발 가이드

## 1. 개요

클라이언트 스크립트는 브라우저에서 실행되며, UI 컨트롤 조작, 이벤트 처리, 데이터 바인딩 등을 담당합니다.

**파일 위치**: `[보고서폴더]/[보고서명].script.ts` 또는 `[보고서폴더]/[보고서명].script.js`

---

## 2. 기본 구조

```typescript
// 필수 import 구문
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { Button } from "@AUD_CLIENT/control/Button";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { TextBox } from "@AUD_CLIENT/control/TextBox";
import { ComboBox } from "@AUD_CLIENT/control/ComboBox";
import { DataSet } from "@AUD_CLIENT/data/DataSet";

// Matrix 변수 선언 (필수)
let Matrix: Matrix;

// 컨트롤 변수 선언
let btnSearch: Button;
let grdData: DataGrid;
let txtKeyword: TextBox;

// 컨트롤 바인딩
btnSearch = Matrix.getObject("btnSearch") as Button;
grdData = Matrix.getObject("grdData") as DataGrid;
txtKeyword = Matrix.getObject("txtKeyword") as TextBox;

// 이벤트 등록
btnSearch.OnClick = btnSearchOnClick;

// 버튼 클릭 이벤트
const btnSearchOnClick = function(sender, args){

};
```

> VS Code에서 `AUD: Generate Starter Code` 명령을 사용하면 자동으로 생성됩니다.

### 2.1 초기화 이벤트

| 이벤트 | 설명 | 용도 |
|--------|------|------|
| `OnDocumentLoadComplete` | 문서 로드 완료 후 발생. 스크립트 최상위와 실행 시점 동일하므로 별도 사용 불필요 | - |
| `OnLoadComplete` | 모든 데이터 실행 완료 후 발생 | 일반 초기화 |
---

## 3. 핵심 API - Matrix 객체

Matrix는 i-AUD 클라이언트의 핵심 객체로, 모든 컨트롤 접근과 유틸리티 기능을 제공합니다.

### 3.1 컨트롤 접근

```typescript
// 일반 컨트롤 가져오기
let button = Matrix.getObject("Button1") as Button;
let grid = Matrix.getObject("DataGrid1") as DataGrid;
let textbox = Matrix.getObject("TextBox1") as TextBox;
```

### 3.1.1 AddIn 컴포넌트 접근 (BaseControl, GridHtmlView 등)

AddIn 타입 컨트롤(BaseControl, GridHtmlView 등)은 `Matrix.getObject()`가 **AddIn 래퍼**를 반환합니다.
컴포넌트는 비동기로 로딩되므로, `OnComponentClassLoaded` 이벤트 안에서 `getScriptClass()`를 호출해야 합니다.

```typescript
// [올바른 패턴] OnComponentClassLoaded 에서 getScriptClass()로 컴포넌트 접근
let addIn = Matrix.getObject("myCtrl") as AddIn;
addIn.OnComponentClassLoaded = function(sender, args) {
    let ctrl = addIn.getScriptClass() as BaseControl;
    ctrl.addCSS('.card { padding: 10px; }');
    ctrl.addHTML('<div class="card">내용</div>');
};

// GridHtmlView도 동일한 패턴
let addIn2 = Matrix.getObject("myView") as AddIn;
addIn2.OnComponentClassLoaded = function(sender, args) {
    let view = addIn2.getScriptClass() as GridHtmlView;
    view.DataGrid = Matrix.getObject("GRD") as DataGrid;
    view.HTML = '<div aud-for="ROWS"><span aud-bind="NAME"></span></div>';
};

// [잘못된 패턴] 직접 캐스팅은 동작하지 않음
// let ctrl = Matrix.getObject("myCtrl") as BaseControl; // X - AddIn 래퍼가 반환됨
// let ctrl = addIn.getScriptClass() as BaseControl;     // X - 비동기 로딩 전이면 null
```

### 3.2 메시지 표시

```typescript
// 알림창
Matrix.Alert("저장되었습니다.");

// 확인 대화상자
Matrix.Confirm("삭제하시겠습니까?", "확인", function(ok) {
    if (ok) {
        // 확인 클릭 시 처리
    }
}, 0);  // 0: 예/아니오, 1: 확인/취소
```

### 3.3 서비스 호출 (서버 스크립트 실행)

```typescript
// 파라미터 리스트
let paramList ={"VS_CODE":"codevalue"
   	,"VS_NAME":"name value"
     };
//서비스 호출
Matrix.RunScriptEx(["gridName"], "ServerScriptName"
    , paramList
    ,function (p) {
        //call back
        if (p.Success == false) {
            Matrix.Alert(p.Message);
            return;
        }
        var ds = p.DataSet;
    });     
```

### 3.4 전역 파라미터

```typescript
// 전역 파라미터 설정
Matrix.AddGlobalParams("YEAR", "2025", enQueryParamType.String);

// 전역 파라미터 삭제
Matrix.ClearGlobalParams();
```

---

## 4. 주요 컨트롤 API

### 4.1 Button (버튼)

```typescript
let btn = Matrix.getObject("Button1") as Button;

// 속성
btn.Text = "검색";
btn.IsEnabled = false;  // 비활성화
btn.Visible = false;    // 숨김

// 이벤트
btn.OnClick = function(sender, args) {
    Matrix.Alert("버튼 클릭: " + args.Id);
};
```

### 4.2 TextBox (텍스트박스)

```typescript
let txt = Matrix.getObject("TextBox1") as TextBox;

// 속성
let value = txt.Text;     // 값 읽기
txt.Text = "새 값";       // 값 설정
txt.MaxLength = 100;      // 최대 길이

// 이벤트
txt.OnTextChange = function(sender : TextBox, args : {Id: string, Text: string}) {
    console.log("변경된 값:", args.Text);
};
```

### 4.3 ComboBox / MultiComboBox (콤보박스)

```typescript
let combo = Matrix.getObject("ComboBox1") as ComboBox;

// 속성
let selectedValue = combo.Value;
let selectedText = combo.Text;
combo.SelectedIndex = 0;  // 첫 번째 항목 선택

// 이벤트
combo.OnValueChanged = function(sender : ComboBox, args : {Id: string,Value: string,SelectedIndex: number}) {
    console.log("선택값:", args.Value);
};
```

#### InitType / InitValue (초기값 설정)

콤보박스의 초기 선택값을 지정하려면 **InitType과 InitValue를 함께 설정**해야 합니다.
`InitValue`만 설정하면 적용되지 않습니다.

| InitType 값 | 숫자 | 동작 |
|-------------|------|------|
| `CurrentValue` | 0 | 현재 선택값을 유지 (기본값) |
| `InitValue` | 1 | `InitValue` 속성의 값으로 초기화 |
| `None` | 2 | 초기값을 설정하지 않음 |

```typescript
// ComboBox 초기값 설정
let combo = Matrix.getObject("cboStatus") as ComboBox;
combo.InitType = 1;           // enInitType.InitValue (반드시 설정!)
combo.InitValue = "Y";        // 데이터 조회 후 "Y" 항목이 자동 선택됨

// MultiComboBox 초기값 설정
let mcb = Matrix.getObject("mcbDept") as MultiComboBox;
mcb.InitType = 1;             // enInitType.InitValue (반드시 설정!)
mcb.InitValue = "001,002";    // 데이터 조회 후 "001", "002" 항목이 자동 선택됨
```

> **주의**: MTSD 디자이너에서도 동일하게 `[InitType]`을 `InitValue`로 변경해야 `[InitValue]` 속성이 반영됩니다.

### 4.4 Calendar (달력)

```typescript
let cal = Matrix.getObject("Calendar1") as Calendar;

// 속성
let value = cal.Value;           // DataFormat 형식 값 (예: "20240115")
let text = cal.Text;             // ViewFormat 형식 값 (예: "2024-01-15")
let date = cal.Date;             // Date 객체
cal.DataFormat = "yyyyMMdd";     // 데이터 저장용 포맷
cal.ViewFormat = "yyyy-MM-dd";   // 화면 표시용 포맷
cal.IsReadOnly = true;           // 읽기 전용

// 이벤트
cal.OnValueChanged = function(sender : Calendar, args : {Id: string, Text: string, Date: Date}) {
    console.log("선택 날짜:", args.Text, args.Date);
};
```

#### 날짜 함수 표현식 (InitDate / MinDate / MaxDate)

`InitDate`, `MinDate`, `MaxDate` 속성에 **함수 형식 문자열**을 사용할 수 있습니다.
MTSD 디자이너 속성 또는 스크립트에서 동일하게 사용 가능합니다.

| 함수 | 설명 | 예시 결과 (오늘 2024-07-15 기준) |
|------|------|------|
| `NOW()` | 현재 날짜 | 2024-07-15 |
| `DATE(0, 0, 0)` | 오늘 | 2024-07-15 |
| `DATE(-1, 0, 0)` | 1년 전 | 2023-07-15 |
| `DATE(0, -3, 0)` | 3개월 전 | 2024-04-15 |
| `DATE(0, 0, -7)` | 7일 전 | 2024-07-08 |
| `DATE(0, 0, F)` | 이번 달 1일 | 2024-07-01 |
| `DATE(0, 0, L)` | 이번 달 말일 | 2024-07-31 |
| `DATE(0, F, F)` | 올해 1월 1일 | 2024-01-01 |
| `DATE(0, L, L)` | 올해 12월 31일 | 2024-12-31 |
| `DATE(F, F, F)` | 최소 날짜 (1900-01-01) | 1900-01-01 |
| `DATE(L, L, L)` | 최대 날짜 (2999-12-31) | 2999-12-31 |

**파라미터 규칙**: `DATE(Year, Month, Day)`
- **정수**: 현재 기준 상대 오프셋 (0=현재, -1=이전, +1=다음)
- **`F`**: First — 년도(1900), 월(1월), 일(1일)
- **`L`**: Last — 년도(2999), 월(12월), 일(해당 월 말일)

```typescript
// 스크립트에서 사용
cal.InitDate = "NOW()";             // 초기값: 오늘
cal.MinDate = "DATE(0, -6, 0)";    // 최소: 6개월 전
cal.MaxDate = "DATE(1, 0, 0)";     // 최대: 1년 후
```

### 4.5 DataGrid (데이터 그리드)

```typescript
let dataGrid = Matrix.getObject("DataGrid1") as DataGrid;

// 행 조회
let rowCount = dataGrid.GetRowCount();
let row = dataGrid.GetRow(0);  // 첫 번째 행

// 셀 값 읽기/쓰기
let cellValue = row.GetValue("ColumnName");
row.SetValue("ColumnName", "새 값");

// 행 추가/삭제
let newRow = dataGrid.AppendRow();
dataGrid.RemoveRowAt(0, true);

// 페이징
dataGrid.UsePaging = true;
dataGrid.PageSize = 20;
dataGrid.MovePage(2);  // 2페이지로 이동

// 이벤트
dataGrid.OnCellClick = function(sender : DataGrid, args : { Id: string,Row: DataGridRow,Cell: DataGridCell,Field: DataGridColumn,Handled: boolean}) {
    console.log("클릭한 셀:", args.Row.GetValue("fieldName"), args.Field.Name);
};
```

### 4.6 iGrid (Excel 형식 그리드)

```typescript
let igrid = Matrix.getObject("iGrid1") as iGrid;
//엑셀 저장 하기
igrid.ExportServiceCall(enExportType.Excel,
        function(p){
        //   
        //   p.FolderName = file path
        //   p.FileName = file name
        //   
        var newName = "MXGrid_" + Matrix.GetDateTime().ToString("yyyyMMddHHmmss") + ".xlsx";
        Matrix.DownloadFile(p.FolderName, p.FileName ,newName ,true);
} ); 
```

### 4.7 Chart (차트)

```typescript
let chart = Matrix.getObject("Chart1") as Chart;

// 차트 옵션 접근
let options = chart.ChartOptions;

// 차트 다시 그리기
chart.Update();
```

### 4.8 OlapGrid (OLAP 그리드)

```typescript
let olap = Matrix.getObject("OlapGrid1") as OlapGrid;

// 필터 설정
olap.setDimensionFilterIn("DimensionName", ["Value1", "Value2"]);

// 데이터 새로고침
olap.Refresh();

// 이벤트
olap.OnDataCellDoubleClick = function(sender, args) {
    console.log("더블클릭:", args);
};
```

---

## 5. 공통 컨트롤 속성 (Control)

모든 컨트롤이 상속받는 기본 속성입니다.

```typescript
// 위치/크기 
control.Left = 100;
control.Top = 50;
control.Width = 200;
control.Height = 30;

// 표시 여부
control.Visible = true;
control.IsEnabled = true;

// 스타일
control.Tooltip = "도움말 텍스트";
control.ZIndex = 10;

// 메서드
control.Focus();      // 포커스 설정
control.Update();     // 화면 갱신
control.Resize();     // 크기 재계산

// 위치/크기 일괄 설정
control.setRect({Left: 100, Top: 50, Width: 200, Height: 30} as Rect);
control.Resize();
```

---

## 6. 데이터 관련 API

### 6.1 DataSet

```typescript
let ds: DataSet = Matrix.CreateDataSet("DataSetName");

// 테이블 접근
let table = ds.GetTable(0);  // 인덱스로
let table = ds.GetTable("TableName");  // 이름으로

// 테이블 생성
let newTable = ds.CreateTable("NewTable");
```

### 6.2 DataTable

```typescript
let table = ds.GetTable("Table1");
let rowCount = table.GetRowCount();

// 행 접근
let row = table.GetRow(0);

// 행 추가
let nIdx = table.AppendRow();
table.setRowValue(nIdx, "FIELD_NAME", "value")

// 컬럼 정보
let columnNames = table.GetColumnNames();
for(let i=0,i2=columnNames.length;i<i2; i++){
    table.setRowValue(nIdx, columnNames[i], "value...");
}
```

### 6.3 DataRow

```typescript
let row = table.GetRow(0);

// 값 읽기/쓰기
let value = row.GetValue("ColumnName");
row.SetValue("ColumnName", "새 값");

// 인덱스로 접근
let value = row.GetValue(0);
```

---

## 7. 유틸리티

### 7.1 날짜 유틸리티

```typescript

//날자로 변환
let date = Matrix.getDate("2025-12-12", "yyyy-MM-dd");
let addDay = date.AddDays(10).Day;
//현재일자
let nowdate = Matrix.getDate(); 
let text = nowdate.AddDays(-7).ToString("yyyy-MM-dd");

```

### 7.2 문자열 유틸리티

```typescript
let strUtil = Matrix.getStringUtility();
let formatted = strUtil.Format("{0}년 {1}월", "2025", "01");
```

### 7.3 사용자/보고서 정보

```typescript
// 사용자 정보
let userInfo = Matrix.getUserInfo();
let userId = userInfo.UserCode;
let userName = userInfo.UserName;

// 보고서 정보
let reportInfo = Matrix.getReportInfo();
let reportCode = reportInfo.ReportCode;
```

---

## 8. 이벤트 핸들러 패턴

```typescript
// 버튼 클릭 이벤트
let btnSearch = Matrix.getObject("btnSearch") as Button;
btnSearch.OnClick = function(sender, args) {
    // 검색 로직
    Matrix.ExecuteService("SearchService", function(result) {
        if (result.Success) {
            Matrix.Alert("조회 완료");
        }
    });
};

// 그리드 셀 변경 이벤트
let grid = Matrix.getObject("DataGrid1") as DataGrid;
grid.OnEndEdit = function(sender, args) {
    console.log("변경됨:", args.Row.GetValue("필드명"), args.AfterValue, args.BeforeValue, args.Field.Name);
    
};
```

---

## 9. 샘플 코드 위치

실제 구현 예제는 다음 폴더를 참조하세요:

- `src/reports/samples/MX_GRID/` - MX-GRID 관련 샘플
- `src/reports/samples/OLAP/` - OLAP 그리드 샘플
- `src/reports/samples/ETC/` - 기타 기능 샘플

---

## 10. JavaScript 호환성 주의사항

클라이언트 스크립트는 ES5/ES6 환경에서 실행되므로, **ES2017+ 메서드는 사용할 수 없습니다**.

### 사용 불가 메서드 및 대체 패턴

| 사용 불가 (ES2017+) | 대체 방법 |
|---------------------|-----------|
| `String.padStart()` | `lpad()` 헬퍼 함수 사용 |
| `String.padEnd()` | `rpad()` 헬퍼 함수 사용 |
| `Object.entries()` | `Object.keys()` + 인덱스 접근 |
| `Object.values()` | `Object.keys()` + map |
| `Array.includes()` | `Array.indexOf() >= 0` |
| `async/await` | 콜백 또는 Promise.then() |

### 헬퍼 함수 예시

```typescript
// padStart 대체
function lpad(val: number | string, len: number, ch?: string): string {
    let s = String(val);
    let pad = ch || '0';
    while (s.length < len) s = pad + s;
    return s;
}

// padEnd 대체
function rpad(val: number | string, len: number, ch?: string): string {
    let s = String(val);
    let pad = ch || ' ';
    while (s.length < len) s = s + pad;
    return s;
}

// 사용 예
lpad(5, 3);          // "005"
lpad(12, 4);         // "0012"
lpad("AB", 5, '_');  // "___AB"
```

---

## 11. 키보드 이벤트 주의사항 (input/textarea)

i-AUD 프레임워크는 **keydown 이벤트를 전역으로 가로챕니다** (단축키 처리, 셀 이동 등). 이로 인해 HTML `<input>`, `<textarea>` 요소에서 **Backspace, Delete, 방향키** 등이 동작하지 않을 수 있습니다.

**특히 영향받는 경우:**
- AddIn 컴포넌트(GridHtmlView, BaseControl) 내부의 `<input>` / `<textarea>`
- Shadow DOM 내부의 입력 요소
- `addHTML()`로 동적 생성한 입력 요소

**해결:** 입력 요소에 `keydown` 이벤트의 `stopPropagation()`을 등록하여 프레임워크로의 이벤트 전파를 차단합니다.

```typescript
let input = element.querySelector("input") as HTMLInputElement;
input.addEventListener('keydown', function(e) {
    e.stopPropagation();  // i-AUD 프레임워크의 키 가로채기 방지
});
```

> **주의**: `preventDefault()`는 사용하지 마세요 — 입력 자체가 차단됩니다. `stopPropagation()`만 사용합니다.

---

## 12. enum 사용 시 주의사항

클라이언트 스크립트에서 `types/aud/enums/` 의 enum을 **import하면 안 됩니다**.
`import` 구문으로 타입 파일을 참조하면 런타임에 모듈을 찾을 수 없어 오류가 발생합니다.

enum 값이 필요하면 **스크립트 파일 안에 직접 복사**하여 사용하세요.

```typescript
// ✗ 잘못된 패턴 — import 금지
import { enDataType } from "@AUD_CLIENT/enums/comm/enDataType";

// ✓ 올바른 패턴 — 스크립트 내에 직접 선언
enum enDataType { Numeric = 0, String = 1, DateTime8 = 2, DateTimeNow = 3, UserCode = 4 }
```

> `types/aud/enums/` 파일을 열어 값을 확인한 뒤, 필요한 항목만 복사하세요.

---

## 13. API 인터페이스 위치

상세 API 정의는 `types/aud/` 폴더를 참조하세요:

- `types/aud/control/` - UI 컨트롤 인터페이스
- `types/aud/data/` - 데이터 관련 인터페이스
- `types/aud/common/` - 공통 유틸리티
- `types/aud/enums/` - 열거형 타입
