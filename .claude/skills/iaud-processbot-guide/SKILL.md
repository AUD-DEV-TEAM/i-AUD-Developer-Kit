---
name: iaud-processbot-guide
description: i-AUD ProcessBot(WorkFlow) 가이드. 모듈을 flow 형태로 연결하여 실행하는 프로세스 봇 기능을 안내합니다. "프로세스 봇", "워크플로우", "ProcessBot", "WorkFlow", "모듈 연결", "이벤트 트리거", "분기 처리" 등을 물어볼 때 사용하세요.
---

# i-AUD ProcessBot(WorkFlow) 가이드

## 1. ProcessBot(WorkFlow)이란?

i-AUD **ProcessBot(WorkFlow)**은 모듈을 **flow 형태로 연결**하여 실행하는 자동화 기능입니다.
보고서 이벤트 또는 컨트롤 이벤트를 트리거로, 연결된 모듈들이 순차적으로 실행됩니다.

```
[Report 이벤트] → [모듈 A] → [모듈 B] → [Switch 분기] → [모듈 C]
                                              ↓ (실패)
                                         [모듈 D]
```

### 핵심 개념

- **노드(Node)**: 실행 단위 (Report, Control, Module, Switch)
- **링크(Link)**: 노드 간 연결 (Success/Fail 경로)
- **모듈(Module)**: 재사용 가능한 클라이언트 스크립트 단위 (`/iaud-module-create` 참조)
- **이벤트 트리거**: Report/Control 노드의 이벤트가 발생하면 연결된 모듈들이 실행

---

## 2. WORK_FLOW JSON 구조

MTSD 문서의 `WORK_FLOW` 속성에 JSON 형태로 저장됩니다.

```json
{
  "Version": 2,
  "UseEvent": true,
  "Nodes": [ ... ],
  "Links": [ ... ]
}
```

| 필드 | 타입 | 설명 |
|------|------|------|
| `Version` | number | 문서 버전 (현재 2) |
| `UseEvent` | boolean | `true`: 이벤트 기반 실행, `false`: 초기화 시 모든 모듈 순차 실행 |
| `Nodes` | array | 워크플로우 노드(Activity) 배열 |
| `Links` | array | 노드 간 연결(실행 흐름) 배열 |

---

## 3. 노드 타입 (4종)

### 3.1 Report 노드

보고서 레벨 이벤트를 트리거로 사용합니다. 보고서당 1개만 존재하며, ID는 `"_ROOT_"`입니다.

```json
{
  "ID": "_ROOT_",
  "Type": "Report",
  "ModuleCode": "",
  "Name": "Report",
  "Description": "",
  "Left": 10, "Top": 10, "Width": 200, "Height": 207,
  "ControlType": "Report",
  "Collapsed": true,
  "Parameters": [
    { "ID": "OnDocumentLoadComplete", "Name": "OnDocumentLoadComplete", "Value": null, "Description": "" },
    { "ID": "OnLoadComplete", "Name": "OnLoadComplete", "Value": null, "Description": "" },
    { "ID": "OnExecuteStart", "Name": "OnExecuteStart", "Value": null, "Description": "" },
    { "ID": "OnRefreshComplete", "Name": "OnRefreshComplete", "Value": null, "Description": "" },
    { "ID": "OnActiveSheetChange", "Name": "OnActiveSheetChange", "Value": null, "Description": "" },
    { "ID": "OnDestroy", "Name": "OnDestroy", "Value": null, "Description": "" },
    { "ID": "OnViewerSizeChanged", "Name": "OnViewerSizeChanged", "Value": null, "Description": "" }
  ]
}
```

**Report 이벤트 목록:**

| 이벤트 | 발생 시점 |
|--------|----------|
| `OnDocumentLoadComplete` | 문서 로딩 완료 (가장 많이 사용) |
| `OnLoadComplete` | 데이터 로딩 완료 |
| `OnExecuteStart` | 실행 시작 |
| `OnRefreshComplete` | 새로고침 완료 |
| `OnActiveSheetChange` | 활성 시트 변경 |
| `OnDestroy` | 문서 종료 |
| `OnViewerSizeChanged` | 뷰어 크기 변경 |

### 3.2 Control 노드

UI 컨트롤의 이벤트를 트리거로 사용합니다.

```json
{
  "ID": "btnSearch",
  "Type": "Control",
  "ModuleCode": "",
  "Name": "btnSearch",
  "Description": "",
  "Left": 300, "Top": 10, "Width": 200, "Height": 100,
  "ControlType": "Button",
  "Collapsed": false,
  "Parameters": [
    { "ID": "OnClick", "Name": "OnClick", "Value": null, "Description": "" }
  ]
}
```

**컨트롤별 WorkFlowEvents 목록:**

각 컨트롤은 소스 코드(`2.Sources/src/control/`)에 정의된 `WorkFlowEvents` 이벤트만 WorkFlow에서 사용 가능합니다.
MtsdBuilder의 `addWorkFlowControlNode()`에서 events 생략 시 아래 목록이 자동 적용됩니다.

| 컨트롤 | 이벤트 |
|--------|--------|
| **Button** | `OnClick` |
| **FileUploadButton** | `OnClick`, `OnUploadCompleted` |
| **TextBox** | `OnTextChange`, `OnTextKeydown`, `OnTextKeypress`, `OnTextKeyup` |
| **NumberBox** | `OnTextChange`, `OnTextKeydown`, `OnTextKeypress`, `OnTextKeyup` |
| **MaskTextBox** | `OnTextChange`, `OnTextKeydown`, `OnTextKeypress`, `OnTextKeyup` |
| **RichTextBox** | `OnTextChange`, `OnTextKeydown`, `OnTextKeypress`, `OnTextKeyup` |
| **CheckBox** | `OnValueChange` |
| **RadioButton** | `OnValueChange` |
| **ComboBox** | `OnDataBindEnd`, `OnValueChanged` |
| **MultiComboBox** | `OnExecuteStart`, `OnNodeClick`, `OnTextKeyup`, `OnValueChange`, `OnDataBindEnd` |
| **PickList** | `OnValueChange` |
| **Calendar** | `OnValueChanged` |
| **CalendarYear** | `OnValueChanged` |
| **CalendarYM** | `OnValueChanged` |
| **CalendarFromTo** | `OnValueChanged`, `OnFromValueChanged` |
| **Tree** | `OnDataBindEnd`, `OnNodeClick`, `OnNodeDbClick` |
| **Label** | `OnClick`, `OnMouseOut`, `OnMouseOver` |
| **Image** | `OnClick` |
| **DataGrid** | `OnCellClick`, `OnCellDoubleClick`, `OnCellTouch`, `OnCellDoubleTouch`, `OnScroll`, `OnStartEdit`, `OnEndEdit`, `OnDeletingRow`, `OnGridColumnHeaderClicked`, `OnGridColumnHeaderDoubleClicked`, `OnGridMultiHeaderClicked`, `OnGridMultiHeaderDoubleClicked`, `OnGridCheckBoxClicked`, `OnGridMultiHeaderCheckBoxClicked`, `OnCellLoaded`, `OnGridMultiHeaderCellLoaded`, `OnCurrentCellChanged`, `OnCurrentRowChanged`, `OnValidate`, `OnGridContextMenuOpening`, `OnGridExportStart`, `OnGridComboBoxChanged`, `OnMouseMove`, `OnDataBindEnd`, `OnStartClipBoardPaste`, `OnEndClipBoardPaste`, `OnGridFilterChanged`, `OnCreateNewRow`, `OnClick`, `OnCellKeyDown`, `OnSelectedCellsDeleted` |
| **TreeGrid** | DataGrid 전체 + `OnTreeCellClick` |
| **CompactDataGrid** | DataGrid와 동일 |
| **iGrid** | `OnDataBindEnd`, `OnCellDoubleClick`, `OnSelectionChange` |
| **OlapGrid** | `OnExportStart`, `OnDataCellDoubleClick`, `OnSelectionChanged`, `OnHeaderClicked`, `OnHeaderDoubleClicked`, `OnMultiHeaderClicked`, `OnMultiHeaderDoubleClicked`, `OnDataBindEnd` |
| **Chart** | `OnDataBindEnd`, `OnDataPointClick` |
| **PieChart** | `OnDataBindEnd`, `OnDataPointClick` |
| **ScatterChart** | `OnDataBindEnd`, `OnDataPointClick` |
| **PolygonChart** | `OnDataBindEnd`, `OnDataPointClick` |
| **Tab** | `OnActiveTabChanged` |
| **TableLayout** | `OnRowLineDragStart`, `OnRowLineDragEnd`, `OnColumnLineDragStart`, `OnColumnLineDragEnd`, `OnRowLineMouseOver`, `OnColumnLineMouseOver` |
| **ReportContainer** | `OnLoaded` |
| **Slider** | `OnStart`, `OnFinish`, `OnChange` |
| **ColorSelector** | `OnValueChange` |

### 3.3 Module 노드

서버에 등록된 모듈을 실행합니다. `/iaud-module-create` 스킬로 생성한 모듈의 코드를 지정합니다.

```json
{
  "ID": "MODULE_001",
  "Type": "Module",
  "ModuleCode": "SYS_REFRESH",
  "Name": "Refresh Data",
  "Description": "",
  "Left": 500, "Top": 10, "Width": 200, "Height": 100,
  "ControlType": "",
  "Collapsed": false,
  "Parameters": [
    {
      "ID": "P1",
      "Name": "P1",
      "Value": "DataGrid1,DataGrid2",
      "Description": "",
      "MODULE_CODE": "SYS_REFRESH",
      "DEFAULT_VALUE": "",
      "NULLABLE": "N",
      "PARAM_DESCRIPTION": "대상 컨트롤 목록",
      "PARAM_SEQ": "1",
      "PARAM_TYPE": "INP005",
      "ATTR1": "", "ATTR2": "", "ATTR3": ""
    }
  ]
}
```

**Module 노드 특징:**
- `ModuleCode`: 서버에 등록된 모듈 코드 (빈 문자열이면 신규 모듈)
- `Name`: **`get_module_list`의 `MODULE_SUBJECT`** 값을 사용
- `Description`: **`get_module_list`의 `MODULE_DESCRIPTION`** 값을 사용
- `Parameters`: 모듈 파라미터 정보 — **`get_module_params`로 조회**하여 구성 (서버 모듈의 `MTX_MODULE_PARAMS` 구조와 동일)
- `Value`: 실제 전달되는 파라미터 값 (컨트롤 이름, 문자열 등)
- `IsEventActive`: EVENT_YN="Y"인 모듈에서 이벤트 활성화 여부
- `Deprecated`: 서버에서 삭제된 모듈인 경우 `true`

**EVENT_YN에 따른 연결 규칙:**

| EVENT_YN | 동작 | 링크 연결 |
|----------|------|----------|
| `Y` | 컨트롤/보고서 이벤트에 자유롭게 연결 가능 | 요구사항에 맞는 적절한 이벤트(Control/Report)에 `addWorkFlowLink`로 연결 |
| `N` | 문서 로드 시 무조건 실행 | Report 노드의 `OnDocumentLoadComplete`에 **자동 연결** (빌더가 자동 생성) |

- `eventYn: "N"` → `_ROOT_.OnDocumentLoadComplete → 해당 모듈` 링크가 빌더에서 자동 생성
- `eventYn: "Y"` → 빌더 자동 링크 없음. 요구사항에 따라 적절한 이벤트 트리거에 `addWorkFlowLink`로 연결해야 함

### 3.4 Switch 노드

조건 분기를 처리합니다. 서버에서 검색되지 않는 **예약된 내부 모듈**이며, 각 파라미터(케이스)를 **순서대로 평가**하여 **첫 번째로 참인 케이스**의 링크가 실행됩니다.

```json
{
  "ID": "SWITCH",
  "Type": "Switch",
  "ModuleCode": "",
  "Name": "Switch",
  "Description": "Switch",
  "Left": 23.5, "Top": 155.5, "Width": 200, "Height": 165,
  "ControlType": "",
  "Collapsed": false,
  "IsEventActive": true,
  "Deprecated": false,
  "Parameters": [
    {
      "ID": "CD6255FDE6349AD3E383C71A8CFEDB9925",
      "Name": "VS_CODE = A",
      "Value": { "Operand": "VS_CODE", "Operator": "=", "Value": "A" },
      "Description": ""
    },
    {
      "ID": "CDC8836DDE72D740956726BBE6DCED480B",
      "Name": "VS_CODE <> 100",
      "Value": { "Operand": "VS_CODE", "Operator": "<>", "Value": "100" },
      "Description": ""
    },
    {
      "ID": "CD44FE3FE6740F8372C14F20C4185BD307",
      "Name": "VS_CODE IS NULL ",
      "Value": { "Operand": "VS_CODE", "Operator": "IS NULL", "Value": "" },
      "Description": ""
    },
    {
      "ID": "CD93A9F459F1AA88AE7A22876DE1EEACB2",
      "Name": "VS_CODE CONTAIN a",
      "Value": { "Operand": "VS_CODE", "Operator": "CONTAIN", "Value": "a" },
      "Description": ""
    },
    {
      "ID": "DEFAULT",
      "Name": "Default",
      "Value": "DEFAULT",
      "Description": ""
    }
  ]
}
```

**Switch 실행 흐름** (`WorkFlowHelper.executeSwitch`):
1. Parameters 배열을 **순서대로** 평가
2. 각 케이스의 `Value.Operand`로 변수 값을 조회 (GlobalParam → Variables → Control 값 순)
3. `Value.Operator`와 `Value.Value`로 비교 → **첫 번째 참인 케이스**에서 멈추고 해당 링크 실행
4. 모든 조건이 거짓이면 **DEFAULT 케이스** 실행 (있을 경우)
5. DEFAULT가 없고 모든 조건이 거짓이면 아무 것도 실행하지 않음

**Switch Value 구조:**

```json
{ "Operand": "변수명", "Operator": "연산자", "Value": "비교값" }
```

- **Operand**: 비교 대상 변수명. `:` 접두사 **불필요** (예: `"VS_CODE"`, `"VS_STATUS"`)
  - GlobalParam, Variables, 컨트롤 값 순으로 자동 검색됨
- **ID**: 일반 케이스는 UUID 형식 (`CD` + 32자리 HEX), DEFAULT는 `"DEFAULT"`
- **Name**: 사용자 가독성 (예: `"VS_CODE = A"`, `"Default"`)
- **DEFAULT 케이스**: `Value`가 객체가 아닌 문자열 `"DEFAULT"`. 항상 배열 **마지막**에 배치

**지원 연산자:**

| 연산자 | 설명 | 비고 |
|--------|------|------|
| `=`, `==` | 같음 | |
| `<>`, `!=` | 다름 | |
| `>` | 크다 | 양쪽 모두 숫자면 숫자 비교, 아니면 문자열 비교 |
| `>=` | 크거나 같다 | 상동 |
| `<` | 작다 | 상동 |
| `<=` | 작거나 같다 | 상동 |
| `IS NULL` | Null/빈값 여부 | Value는 빈 문자열 |
| `IS NOT NULL` | Null/빈값이 아닌지 | Value는 빈 문자열 |
| `START WITH` | 시작 문자열 | |
| `END WITH` | 끝 문자열 | |
| `CONTAIN` | 포함 여부 | |
| `NOT CONTAIN` | 미포함 여부 | |

---

## 4. 링크 (Link)

노드 간 실행 흐름을 정의합니다.

| 필드 | 타입 | 설명 |
|------|------|------|
| `ID` | string | 링크 고유 ID (아래 네이밍 규칙 참조) |
| `From` | string | 출발 노드 ID |
| `To` | string | 도착 노드 ID |
| `Type` | number | `0`: Success (기본), `1`: Fail |
| `FromParam` | string | 출발 파라미터 (이벤트명 또는 케이스 ID). 모듈 간 연결 시 빈 문자열 |

### 4.1 링크 유형별 규칙

**Control/Report → 다른 노드**: `FromParam`에 **이벤트명** (Parameters의 ID)을 지정합니다. Type은 항상 `0`.

```json
{ "ID": "btnSearch.OnClick~SWITCH", "From": "btnSearch", "To": "SWITCH", "Type": 0, "FromParam": "OnClick" }
{ "ID": "_ROOT_.OnDocumentLoadComplete~MOD_INIT", "From": "_ROOT_", "To": "MOD_INIT", "Type": 0, "FromParam": "OnDocumentLoadComplete" }
```

**Module → Module (성공)**: `Type: 0`, `FromParam`은 빈 문자열. 모듈 실행 성공 시(`EXECUTE_NEXT()` 또는 `EXECUTE_NEXT(true)`) 다음 노드로 진행합니다.

```json
{ "ID": "MOD_INIT~MOD_REFRESH", "From": "MOD_INIT", "To": "MOD_REFRESH", "Type": 0, "FromParam": "" }
```

**Module → Module (실패)**: `Type: 1`, `FromParam`은 빈 문자열. 모듈 실행 실패 시(`EXECUTE_NEXT(false)`) 실패 경로로 진행합니다.

```json
{ "ID": "MOD_INIT~MOD_ERROR", "From": "MOD_INIT", "To": "MOD_ERROR", "Type": 1, "FromParam": "" }
```

**Switch → 다른 노드**: `FromParam`에 **케이스 ID** (Parameters의 ID)를 지정합니다. Type은 항상 `0`.
Switch는 조건 평가 후 매치된 케이스의 `FromParam`과 일치하는 링크만 실행합니다.

```json
{ "ID": "SWITCH.CD6255FDE6349AD3E383C71A8CFEDB9925~MOD_A", "From": "SWITCH", "To": "MOD_A", "Type": 0, "FromParam": "CD6255FDE6349AD3E383C71A8CFEDB9925" }
{ "ID": "SWITCH.DEFAULT~MOD_DEFAULT", "From": "SWITCH", "To": "MOD_DEFAULT", "Type": 0, "FromParam": "DEFAULT" }
```

### 4.2 링크 ID 네이밍 규칙

| 출발 노드 | ID 형식 | FromParam |
|-----------|---------|-----------|
| Report/Control | `{NodeID}.{EventName}~{ToNodeID}` | 이벤트명 (예: `OnClick`) |
| Switch | `{NodeID}.{CaseID}~{ToNodeID}` | 케이스 ID (예: `CD...` 또는 `DEFAULT`) |
| Module (성공) | `{NodeID}~{ToNodeID}` | `""` (빈 문자열) |
| Module (실패) | `{NodeID}~{ToNodeID}` | `""` (빈 문자열) |

### 4.3 EXECUTE_NEXT 실행 로직 (`WorkFlowHelper.EXECUTE_NEXT`)

모듈 실행 완료 후 `EXECUTE_NEXT()` 콜백이 호출되면:

1. 현재 모듈에서 나가는 링크들을 검사
2. **성공 시** (`EXECUTE_NEXT()` 또는 `EXECUTE_NEXT(true)`): `Type === 1` (Fail) 링크는 건너뜀
3. **실패 시** (`EXECUTE_NEXT(false)`): `Type !== 1` (Success) 링크는 건너뜀
4. **Switch 노드**인 경우: 매치된 케이스의 `ResultParam`과 링크의 `FromParam`이 일치하는 것만 실행
5. **동기화**: 대상 노드에 여러 입력 링크가 있으면, 모든 입력 링크가 완료된 후 실행

### 4.4 전체 Links 예시

```json
"Links": [
  {
    "ID": "btnSearch.OnClick~SWITCH",
    "From": "btnSearch",
    "To": "SWITCH",
    "Type": 0,
    "FromParam": "OnClick"
  },
  {
    "ID": "_ROOT_.OnDocumentLoadComplete~MOD_INIT",
    "From": "_ROOT_",
    "To": "MOD_INIT",
    "Type": 0,
    "FromParam": "OnDocumentLoadComplete"
  },
  {
    "ID": "MOD_INIT~MOD_REFRESH",
    "From": "MOD_INIT",
    "To": "MOD_REFRESH",
    "Type": 0,
    "FromParam": ""
  },
  {
    "ID": "MOD_INIT~MOD_ERROR",
    "From": "MOD_INIT",
    "To": "MOD_ERROR",
    "Type": 1,
    "FromParam": ""
  },
  {
    "ID": "SWITCH.CD6255FDE6349AD3E383C71A8CFEDB9925~MOD_A",
    "From": "SWITCH",
    "To": "MOD_A",
    "Type": 0,
    "FromParam": "CD6255FDE6349AD3E383C71A8CFEDB9925"
  },
  {
    "ID": "SWITCH.DEFAULT~MOD_DEFAULT",
    "From": "SWITCH",
    "To": "MOD_DEFAULT",
    "Type": 0,
    "FromParam": "DEFAULT"
  }
]
```

---

## 5. 실행 흐름

### 5.1 기본 실행 과정

1. **문서 로드** → WorkFlowHelper 생성 (`WORK_FLOW` JSON 파싱)
2. **모델 계산** (CalculateModel) → MAP_NODES, MAP_LINKS 구성, 링크 유효성 검증
3. **이벤트 등록** → Report/Control 노드의 이벤트에 핸들러 바인딩
4. **이벤트 발생** → 연결된 모듈들 순차 실행
5. **모듈 완료** → `EXECUTE_NEXT()` 콜백으로 다음 노드 실행
6. **Switch 평가** → 조건 충족 케이스의 링크로 분기

### 5.2 UseEvent에 따른 차이

- **`UseEvent: true`** (기본): 이벤트 기반 실행. Report/Control 이벤트가 발생할 때마다 연결된 모듈 체인 실행
- **`UseEvent: false`**: 초기화(Initialization) 시 이벤트 없이 모든 모듈이 순차 실행

### 5.3 동기화 및 중복 실행 방지

- **동기화**: 하나의 노드에 여러 입력 링크가 있으면, 모든 입력이 완료된 후 실행
- **중복 실행 방지**: `EVENT_YN="N"`인 모듈은 동일 코드+파라미터 조합에 대해 **1회만 실행** (Matrix._EXECUTED_MODULES_ 로 관리)
- **EXECUTE_NEXT()**: 모듈 스크립트 내에서 비동기 작업 완료 후 호출하여 다음 노드 진행

---

## 6. MTSD 내 WORK_FLOW 전체 예시

아래는 "문서 로드 시 초기화 모듈→새로고침 모듈 체이닝, 버튼 클릭 시 상태 분기 후 처리"하는 예시입니다.
모든 링크 패턴(Report→Module, Module→Module 성공/실패, Control→Switch, Switch→Module)이 포함되어 있습니다.

```
흐름:
[Report.OnDocumentLoadComplete] → [MOD_INIT] ─성공→ [MOD_REFRESH]
                                              └실패→ [MOD_ERROR]
[btnSearch.OnClick] → [SWITCH_STATUS] ─VS_STATUS=Y→ [MOD_APPROVE]
                                      └DEFAULT→     [MOD_DEFAULT]
```

```json
{
  "Version": 2,
  "UseEvent": true,
  "Nodes": [
    {
      "ID": "_ROOT_",
      "Type": "Report",
      "ModuleCode": "",
      "Name": "Report",
      "Description": "",
      "Left": 10, "Top": 10, "Width": 200, "Height": 207,
      "ControlType": "Report",
      "Collapsed": true,
      "Parameters": [
        { "ID": "OnDocumentLoadComplete", "Name": "OnDocumentLoadComplete", "Value": null, "Description": "" },
        { "ID": "OnLoadComplete", "Name": "OnLoadComplete", "Value": null, "Description": "" },
        { "ID": "OnExecuteStart", "Name": "OnExecuteStart", "Value": null, "Description": "" },
        { "ID": "OnRefreshComplete", "Name": "OnRefreshComplete", "Value": null, "Description": "" },
        { "ID": "OnActiveSheetChange", "Name": "OnActiveSheetChange", "Value": null, "Description": "" },
        { "ID": "OnDestroy", "Name": "OnDestroy", "Value": null, "Description": "" },
        { "ID": "OnViewerSizeChanged", "Name": "OnViewerSizeChanged", "Value": null, "Description": "" }
      ]
    },
    {
      "ID": "btnSearch",
      "Type": "Control",
      "ModuleCode": "",
      "Name": "btnSearch",
      "Description": "",
      "Left": 10, "Top": 250, "Width": 200, "Height": 80,
      "ControlType": "Button",
      "Collapsed": false,
      "Parameters": [
        { "ID": "OnClick", "Name": "OnClick", "Value": null, "Description": "" }
      ]
    },
    {
      "ID": "MOD_INIT",
      "Type": "Module",
      "ModuleCode": "SYS_SET_VARIABLE",
      "Name": "Init Variables",
      "Description": "",
      "Left": 300, "Top": 10, "Width": 200, "Height": 80,
      "ControlType": "",
      "Collapsed": false,
      "Parameters": [
        {
          "ID": "P1", "Name": "P1", "Value": "VS_STATUS=Y",
          "Description": "",
          "MODULE_CODE": "SYS_SET_VARIABLE",
          "PARAM_SEQ": "1", "PARAM_TYPE": "INP001",
          "NULLABLE": "N", "PARAM_DESCRIPTION": "변수 설정",
          "DEFAULT_VALUE": "", "ATTR1": "", "ATTR2": "", "ATTR3": ""
        }
      ]
    },
    {
      "ID": "MOD_REFRESH",
      "Type": "Module",
      "ModuleCode": "SYS_REFRESH",
      "Name": "Refresh DataGrid",
      "Description": "",
      "Left": 600, "Top": 10, "Width": 200, "Height": 80,
      "ControlType": "",
      "Collapsed": false,
      "Parameters": [
        {
          "ID": "P1", "Name": "P1", "Value": "DataGrid1",
          "Description": "",
          "MODULE_CODE": "SYS_REFRESH",
          "PARAM_SEQ": "1", "PARAM_TYPE": "INP005",
          "NULLABLE": "N", "PARAM_DESCRIPTION": "대상 컨트롤 목록",
          "DEFAULT_VALUE": "", "ATTR1": "", "ATTR2": "", "ATTR3": ""
        }
      ]
    },
    {
      "ID": "MOD_ERROR",
      "Type": "Module",
      "ModuleCode": "SYS_ALERT",
      "Name": "Error Alert",
      "Description": "",
      "Left": 600, "Top": 120, "Width": 200, "Height": 80,
      "ControlType": "",
      "Collapsed": false,
      "Parameters": [
        {
          "ID": "P1", "Name": "P1", "Value": "초기화 실패",
          "Description": "",
          "MODULE_CODE": "SYS_ALERT",
          "PARAM_SEQ": "1", "PARAM_TYPE": "INP001",
          "NULLABLE": "N", "PARAM_DESCRIPTION": "메시지",
          "DEFAULT_VALUE": "", "ATTR1": "", "ATTR2": "", "ATTR3": ""
        }
      ]
    },
    {
      "ID": "SWITCH_STATUS",
      "Type": "Switch",
      "ModuleCode": "",
      "Name": "Check Status",
      "Description": "",
      "Left": 300, "Top": 250, "Width": 200, "Height": 165,
      "ControlType": "",
      "Collapsed": false,
      "IsEventActive": true,
      "Deprecated": false,
      "Parameters": [
        {
          "ID": "CD6255FDE6349AD3E383C71A8CFEDB9925",
          "Name": "VS_STATUS = Y",
          "Value": { "Operand": "VS_STATUS", "Operator": "=", "Value": "Y" },
          "Description": "승인 상태"
        },
        {
          "ID": "DEFAULT",
          "Name": "Default",
          "Value": "DEFAULT",
          "Description": ""
        }
      ]
    },
    {
      "ID": "MOD_APPROVE",
      "Type": "Module",
      "ModuleCode": "SYS_REFRESH",
      "Name": "Refresh Approved",
      "Description": "",
      "Left": 600, "Top": 250, "Width": 200, "Height": 80,
      "ControlType": "",
      "Collapsed": false,
      "Parameters": [
        {
          "ID": "P1", "Name": "P1", "Value": "DataGrid1",
          "Description": "",
          "MODULE_CODE": "SYS_REFRESH",
          "PARAM_SEQ": "1", "PARAM_TYPE": "INP005",
          "NULLABLE": "N", "PARAM_DESCRIPTION": "대상 컨트롤 목록",
          "DEFAULT_VALUE": "", "ATTR1": "", "ATTR2": "", "ATTR3": ""
        }
      ]
    },
    {
      "ID": "MOD_DEFAULT",
      "Type": "Module",
      "ModuleCode": "SYS_ALERT",
      "Name": "Default Handler",
      "Description": "",
      "Left": 600, "Top": 360, "Width": 200, "Height": 80,
      "ControlType": "",
      "Collapsed": false,
      "Parameters": [
        {
          "ID": "P1", "Name": "P1", "Value": "기본 처리",
          "Description": "",
          "MODULE_CODE": "SYS_ALERT",
          "PARAM_SEQ": "1", "PARAM_TYPE": "INP001",
          "NULLABLE": "N", "PARAM_DESCRIPTION": "메시지",
          "DEFAULT_VALUE": "", "ATTR1": "", "ATTR2": "", "ATTR3": ""
        }
      ]
    }
  ],
  "Links": [
    {
      "ID": "_ROOT_.OnDocumentLoadComplete~MOD_INIT",
      "From": "_ROOT_",
      "To": "MOD_INIT",
      "Type": 0,
      "FromParam": "OnDocumentLoadComplete"
    },
    {
      "ID": "MOD_INIT~MOD_REFRESH",
      "From": "MOD_INIT",
      "To": "MOD_REFRESH",
      "Type": 0,
      "FromParam": ""
    },
    {
      "ID": "MOD_INIT~MOD_ERROR",
      "From": "MOD_INIT",
      "To": "MOD_ERROR",
      "Type": 1,
      "FromParam": ""
    },
    {
      "ID": "btnSearch.OnClick~SWITCH_STATUS",
      "From": "btnSearch",
      "To": "SWITCH_STATUS",
      "Type": 0,
      "FromParam": "OnClick"
    },
    {
      "ID": "SWITCH_STATUS.CD6255FDE6349AD3E383C71A8CFEDB9925~MOD_APPROVE",
      "From": "SWITCH_STATUS",
      "To": "MOD_APPROVE",
      "Type": 0,
      "FromParam": "CD6255FDE6349AD3E383C71A8CFEDB9925"
    },
    {
      "ID": "SWITCH_STATUS.DEFAULT~MOD_DEFAULT",
      "From": "SWITCH_STATUS",
      "To": "MOD_DEFAULT",
      "Type": 0,
      "FromParam": "DEFAULT"
    }
  ]
}
```

---

## 7. MtsdBuilder로 WorkFlow 구성

MCP `build_mtsd` 도구에서 MtsdBuilder API로 WorkFlow를 구성할 수 있습니다.

```javascript
const doc = new MtsdBuilder("워크플로우 보고서");

// 컨트롤 추가
doc.addButton("btnSearch", "조회", { left: 10, top: 10, width: 80, height: 30 });
doc.addDataGrid("DataGrid1", { left: 10, top: 50, width: 800, height: 400, dataSource: "DS_MAIN" }).end();

// WorkFlow 설정
doc.setWorkFlow(true);  // UseEvent: true

// Report 노드 (자동으로 7개 이벤트 포함)
doc.addWorkFlowReportNode();

// Control 노드 (events 생략 시 controlType에 맞는 기본 이벤트 자동 적용)
doc.addWorkFlowControlNode("btnSearch", "Button");  // → ["OnClick"] 자동

// Module 노드 (EVENT_YN="N" → _ROOT_.OnDocumentLoadComplete에 자동 링크)
doc.addWorkFlowModuleNode("MOD_INIT", "Init Variables", "SYS_SET_VARIABLE", [
  { id: "P1", name: "P1", value: "VS_STATUS=Y", paramType: "INP001", paramDescription: "변수 설정" }
], { eventYn: "N" });  // → _ROOT_.OnDocumentLoadComplete~MOD_INIT 자동 생성
doc.addWorkFlowModuleNode("MOD_REFRESH", "Refresh", "SYS_REFRESH", [
  { id: "P1", name: "P1", value: "DataGrid1", paramType: "INP005", paramDescription: "대상 컨트롤" }
]);
doc.addWorkFlowModuleNode("MOD_ERROR", "Error Alert", "SYS_ALERT", [
  { id: "P1", name: "P1", value: "초기화 실패", paramType: "INP001", paramDescription: "메시지" }
]);

// Switch 노드 (id, name 생략 시 자동 생성. operand에 : 접두사 불필요)
doc.addWorkFlowSwitchNode("SW_CHECK", "Check Status", [
  { operand: "VS_STATUS", operator: "=", value: "Y", description: "승인" },
  { default: true }   // DEFAULT 케이스 (항상 마지막)
]);

// Module 노드 (Switch 분기 대상)
doc.addWorkFlowModuleNode("MOD_APPROVE", "Refresh Approved", "SYS_REFRESH", [
  { id: "P1", name: "P1", value: "DataGrid1", paramType: "INP005", paramDescription: "대상 컨트롤" }
]);
doc.addWorkFlowModuleNode("MOD_DEFAULT", "Default Handler", "SYS_ALERT", [
  { id: "P1", name: "P1", value: "기본 처리", paramType: "INP001", paramDescription: "메시지" }
]);

// 링크 연결
// ※ MOD_INIT은 eventYn:"N"이므로 _ROOT_.OnDocumentLoadComplete 링크가 이미 자동 생성됨
// Module → Module (성공): type 생략 (기본 0), fromParam 불필요
doc.addWorkFlowLink("MOD_INIT", "MOD_REFRESH");
// Module → Module (실패): type: 1, fromParam 불필요
doc.addWorkFlowLink("MOD_INIT", "MOD_ERROR", { type: 1 });
// Control → Switch: fromParam에 이벤트명
doc.addWorkFlowLink("btnSearch", "SW_CHECK", { fromParam: "OnClick" });
// Switch → Module: fromParam에 케이스 ID (빌드 후 자동 생성된 ID 또는 직접 지정한 ID)
// ※ Switch 케이스 ID를 직접 지정하려면 cases에서 id를 명시적으로 설정
doc.addWorkFlowLink("SW_CHECK", "MOD_APPROVE", { fromParam: "CD_CASE_1" });
doc.addWorkFlowLink("SW_CHECK", "MOD_DEFAULT", { fromParam: "DEFAULT" });

return doc.build();
```

---

## 8. MCP 도구

### 8.1 get_module_list

서버에 등록된 모듈 목록을 조회합니다. WorkFlow에서 사용할 모듈의 `MODULE_CODE`를 확인할 때 사용합니다.

```
MCP 도구: get_module_list
파라미터:
  - filter: (선택) 모듈명/설명 검색어
  - limitRows: (선택) 최대 반환 행 수 (기본: 500)
반환: MODULE_CODE, MODULE_SUBJECT, MODULE_DESCRIPTION, EVENT_YN
```

### 8.2 get_module_params

특정 모듈의 파라미터 목록을 조회합니다. `get_module_list`에서 확인한 `MODULE_CODE`로 모듈의 파라미터 정보를 가져옵니다.
WorkFlow Module 노드의 `Parameters` 구성 시 필요합니다.

```
MCP 도구: get_module_params
파라미터:
  - moduleCode: (필수) 모듈 코드 (get_module_list로 조회)
반환: MODULE_CODE, PARAM_SEQ, PARAM_TYPE, NULLABLE, PARAM_DESCRIPTION, ATTR1, ATTR2, ATTR3, DEFAULT_VALUE
```

### 8.3 build_mtsd

MtsdBuilder 스크립트로 WorkFlow가 포함된 MTSD 문서를 생성합니다.
`setWorkFlow()`, `addWorkFlowXxxNode()`, `addWorkFlowLink()` 메서드를 사용합니다.

### WorkFlow 구성 시 MCP 도구 활용 흐름

```
1. get_module_list (filter: "검색어")
   → MODULE_CODE, MODULE_SUBJECT, MODULE_DESCRIPTION, EVENT_YN 확인
2. get_module_params (moduleCode: "...")
   → PARAM_SEQ, PARAM_TYPE, NULLABLE, PARAM_DESCRIPTION, ATTR1, ATTR2, ATTR3, DEFAULT_VALUE 확인
3. build_mtsd  → MtsdBuilder로 WorkFlow 포함 MTSD 문서 생성
   └─ addWorkFlowModuleNode(id, MODULE_SUBJECT, moduleCode, params)
      - name에 MODULE_SUBJECT, description에 MODULE_DESCRIPTION 사용
      - params에 get_module_params 결과의 각 파라미터 정보 반영
```

---

## 9. 모듈 참조

WorkFlow에서 사용하는 모듈은 `/iaud-module-create` 스킬로 생성합니다.

- 모듈 생성: `/iaud-module-create` 스킬 참조
- 모듈 목록 조회: `get_module_list` MCP 도구 사용
- 모듈 파라미터 조회: `get_module_params` MCP 도구 사용
- 파라미터 타입: INP001(텍스트), INP003(그리드), INP004(컨트롤), INP005(다중 컨트롤), INP999(선택 목록) 등

---

## 10. 체크리스트

WorkFlow 구성 시 아래 항목을 확인합니다:

- [ ] Report 노드가 있는가? (ID: `_ROOT_`, 7개 이벤트 포함)
- [ ] 모든 이벤트 트리거에 대한 링크가 연결되어 있는가?
- [ ] Module 노드의 `ModuleCode`가 실제 서버에 등록된 코드인가?
- [ ] Module 파라미터의 `Value`에 적절한 값이 설정되어 있는가?
- [ ] Switch 노드의 각 케이스에 올바른 연산자와 비교값이 있는가?
- [ ] 링크의 `Type`이 올바른가? (0:Success, 1:Fail)
- [ ] 링크의 `FromParam`이 올바른 이벤트명 또는 케이스 ID인가?
- [ ] `UseEvent` 설정이 의도와 일치하는가?
