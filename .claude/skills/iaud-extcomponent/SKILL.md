---
name: iaud-extcomponent
description: ExternalComponent 개발 가이드. 외부 JS 라이브러리(ECharts 등)를 래핑하여 i-AUD 보고서에서 사용할 수 있는 플러그인 컴포넌트를 만드는 방법을 안내합니다. "ExternalComponent 만들기", "차트 컴포넌트", "IComponentBridge", "컴포넌트 manifest", "extcomponent" 등을 물어볼 때 사용하세요.
---

# ExternalComponent 개발 가이드

> 외부 JS 라이브러리를 i-AUD 보고서 UI 컨트롤로 만드는 방법

---

## 1. 개요 및 라이프사이클

**ExternalComponent**는 i-AUD Platform의 플러그인 컴포넌트 시스템입니다.
개발자는 **3개 파일**(`.ts`, `.css`, `.manifest`)을 만들어 서버에 업로드하면 됩니다.

```
[보고서 로드]
  플랫폼이 manifest fetch → JS/CSS 로딩 (files.order 순)
  → CSS를 Shadow DOM에 주입
  → new AUD.{className}()
  → bridge.Create(container, options)
  → bridge.Resize(width, height)
  → OnComponentReady 이벤트 발생

[보고서 스크립트]
  ecComp.OnComponentReady → model = ecComp.getModel()
  → model.setGrid(grdData)      // DataGrid 바인딩
  → model.setConfig({ ... })    // 런타임 설정 변경

[데이터 흐름]
  DataGrid → OnDataChanged → 자동 렌더링
  DataSource → ApplyDataSource(DataSet) → 자동 렌더링
```

**참고 파일**:
- 인터페이스: `types/aud/extcomponent/IComponentBridge.d.ts`
- 기존 컴포넌트 소스: `src/reports/extcomponent/`
- 샘플 보고서: `src/reports/extcomponent_samples/`

---

## 2. 파일 구조 및 배포

### 개발 구조

```
src/reports/extcomponent/
├── _catalog.json                          # 컴포넌트 카탈로그
├── lib/                                   # 공유 라이브러리 (echarts.min.js 등)
└── {name}Component/
    ├── {name}Component.ts                 # 컴포넌트 구현
    ├── {name}Component.css                # Shadow DOM 스타일
    └── {name}Component.manifest           # 메타데이터 + 옵션

src/reports/extcomponent_samples/          # 샘플 보고서
└── {SampleName}/
    ├── .design.json
    ├── {SampleName}.script.ts
    └── DataSource/DS_{NAME}.sql
```

### 서버 배포 경로

개발된 파일을 `/extention/AUD/extcomponent/`에 **플랫하게** 업로드합니다:

```
/extention/AUD/extcomponent/
├── _catalog.json
├── lib/echarts.min.js, ...
├── {name}Component.manifest               ← 개발: {name}Component/{name}Component.manifest
├── {name}Component.js                     ← 개발: {name}Component/{name}Component.ts (tsc 빌드)
└── {name}Component.css                    ← 개발: {name}Component/{name}Component.css
```

### 배포 절차

1. `npx tsc --noEmit` — 빌드 오류 없음 확인
2. `.js`(빌드 결과), `.css`, `.manifest` → 서버 `/extention/AUD/extcomponent/`에 업로드
3. 의존 라이브러리(`lib/`)가 서버에 있는지 확인
4. `_catalog.json`에 새 컴포넌트 항목 추가
5. 기존 컴포넌트 수정 시 manifest `version` 번호 증가 (→ 브라우저 캐시 자동 무효화)

---

## 3. 컴포넌트 구현 (.ts + .css)

### 전체 템플릿 (주석으로 설명 포함)

```typescript
(function () {
    const global = (typeof window !== 'undefined' ? window : {}) as any;
    const echarts = global.echarts;  // manifest files에서 먼저 로딩된 라이브러리

    class MyComponent {
        private container: HTMLDivElement | null = null;
        private chart: any = null;
        private config: any = {};
        private grid: any = null;
        private lastDataSet: any = null;

        // 커스텀 이벤트 — 보고서 스크립트에서 model.OnItemClick = function(args){...} 로 사용
        OnItemClick: ((args: { name: string; value: number }) => void) | null = null;

        // ── 플랫폼 호출: 컴포넌트 생성 ──
        // container: Shadow DOM 내부 div, config: manifest options 값
        Create(container: HTMLDivElement, config: any): void {
            this.container = container;
            this.config = config || {};
            this.chart = echarts.init(container);
            // 테마: echarts.init(container, 'dark')

            var _this = this;
            this.chart.on('click', function (params: any) {
                if (_this.OnItemClick && params.data) {
                    _this.OnItemClick({ name: params.name, value: params.data.value || 0 });
                }
            });
        }

        // ── 플랫폼 호출: 크기 변경 ──
        Resize(width: number, height: number): void {
            if (this.chart) this.chart.resize({ width: width, height: height });
        }

        // ── 플랫폼 호출: 리소스 정리 ──
        Dispose(): void {
            if (this.chart) { this.chart.dispose(); this.chart = null; }
            this.container = null;
            this.grid = null;
            this.lastDataSet = null;
        }

        // ── 플랫폼 호출: DataSource 바인딩 ──
        // ExternalComponent에 DataSource가 설정되어 있으면 조회 결과가 전달됨
        ApplyDataSource(ds: any): void {
            if (!ds) return;
            this.lastDataSet = ds;
            var dt = ds.GetTable ? ds.GetTable(0) : null;
            if (dt && dt.GetRowCount() > 0) this._processData(dt);
        }

        // ── 스크립트 호출: DataGrid 바인딩 ──
        // OnDataChanged 자동 연결 + 기존 데이터 있으면 즉시 로드
        setGrid(grid: any): void {
            this.grid = grid;
            var _this = this;
            var origHandler = grid.OnDataChanged;  // 기존 핸들러 보존
            grid.OnDataChanged = function (sender: any, args: any) {
                if (origHandler) origHandler(sender, args);
                if (!_this.grid || sender.Name !== _this.grid.Name) return;
                _this._loadFromGrid();
            };
            var ds = grid.GetDataSet ? grid.GetDataSet() : null;
            if (ds) {
                var dt = ds.GetTable(0);
                if (dt && dt.GetRowCount() > 0) this._loadFromGrid();
            }
        }

        // ── 스크립트 호출: 설정 변경 + 재렌더링 ──
        setConfig(overrides: any): void {
            for (var k in overrides) {
                if (overrides.hasOwnProperty(k)) this.config[k] = overrides[k];
            }
        }
        getConfig(): any { return this.config; }
        Update(): void {
            if (this.grid) this._loadFromGrid();
            else if (this.lastDataSet) this.ApplyDataSource(this.lastDataSet);
        }

        // ── 선택: 값 읽기/쓰기 (에디터 계열) ──
        GetValue(): any { return null; }
        SetValue(value: any): void { }

        // ── 선택: 직렬화/복원 ──
        Serialize(): string { return JSON.stringify(this.config); }
        Deserialize(data: string): void {
            try { this.config = JSON.parse(data); } catch (e) { }
        }

        // ── 선택: ECharts 전용 ──
        getEChartsInstance(): any { return this.chart; }
        exportImage(): void {
            if (!this.chart) return;
            var url = this.chart.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: '#fff' });
            var win = window.open('', '_blank');
            if (win) {
                win.document.write('<img src="' + url + '" style="max-width:100%"/>');
            }
        }

        // ── private ──

        private _loadFromGrid(): void {
            if (!this.grid) return;
            var ds = this.grid.GetDataSet ? this.grid.GetDataSet() : null;
            if (!ds) return;
            var dt = ds.GetTable(0);
            if (!dt || dt.GetRowCount() === 0) return;
            this._processData(dt);
        }

        // DataTable API: dt.GetRowCount(), dt.GetColumnCount(),
        //                dt.GetColumnName(index), dt.getData(rowIndex, columnName)
        private _processData(dt: any): void {
            var fieldName = this.config.FieldName || 'NAME';
            var valueName = this.config.ValueField || 'VALUE';
            var rowCount = dt.GetRowCount();

            var categories: string[] = [];
            var values: number[] = [];
            for (var r = 0; r < rowCount; r++) {
                categories.push(String(dt.getData(r, fieldName) || ''));
                values.push(Number(dt.getData(r, valueName)) || 0);
            }

            if (!this.chart) return;
            this.chart.setOption({
                xAxis: { type: 'category', data: categories },
                yAxis: { type: 'value' },
                series: [{ type: 'bar', data: values }]
            }, true);  // true = 기존 옵션 완전 교체
        }
    }

    // ★ 전역 등록 (필수) — manifest의 className과 일치해야 함
    if (!global.AUD) global.AUD = {};
    global.AUD.MyComponent = MyComponent;
})();
```

### CSS (.css)

```css
:host {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
```

Shadow DOM 내부이므로 외부 CSS와 충돌 없음. `:host`로 컨테이너 크기를 반드시 잡아야 합니다.

### 핵심 규칙

| 규칙 | 이유 |
|------|------|
| IIFE `(function() { ... })();` 래핑 | 전역 오염 방지 |
| `global.AUD.{ClassName}` 등록 | 플랫폼이 이 이름으로 인스턴스 생성 |
| 메서드 내부 `var` 사용 | IIFE 컨텍스트 + tsc 변환 안전성 |
| `var _this = this;` 패턴 | 이벤트 콜백에서 this 참조 (arrow function 대신) |
| setGrid에서 기존 핸들러 보존 | `origHandler` 체이닝 |
| setGrid에서 즉시 로드 | 그리드에 이미 데이터가 있는 경우 대응 |

---

## 4. Manifest 작성 (.manifest)

```json
{
    "name": "My Chart",
    "icon": ["<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect fill='#1565c0' width='24' height='24' rx='4'/></svg>"],
    "version": 1,
    "category": "Chart",
    "description": "샘플 차트. 데이터: NAME, VALUE 컬럼.",
    "className": "MyComponent",
    "files": [
        { "type": "js", "url": "lib/echarts.min.js", "order": 1 },
        { "type": "js", "url": "myComponent.js", "order": 2 },
        { "type": "css", "url": "myComponent.css" }
    ],
    "options": [
        { "name": "FieldName", "type": "Text", "group": "Data", "default": "NAME", "description": "카테고리 필드" },
        { "name": "ValueField", "type": "Text", "group": "Data", "default": "VALUE", "description": "값 필드" },
        { "name": "ShowLabel", "type": "ComboBox", "group": "Style", "default": "true",
          "items": ["true", "false"], "description": "라벨 표시" }
    ],
    "sample": [
        "ecMyComp.OnComponentReady = function () {",
        "    let model = ecMyComp.getModel();",
        "    model.setGrid(grdData);",
        "};"
    ]
}
```

| 필드 | 설명 |
|------|------|
| `className` | `global.AUD.{className}`과 일치 |
| `version` | 리소스 URL에 `?v={version}` 자동 추가. **수정 시 반드시 증가** |
| `category` | `Chart` / `Editor` / `Board` / `Tree` |
| `files` | `order`로 로딩 순서 보장 (같은 order는 병렬). `lib/` 접두사 = 공유 라이브러리 |
| `options` | `Create(container, config)`의 config로 전달. type: `Text` 또는 `ComboBox`(+`items`) |

### _catalog.json 등록

```json
{ "id": "myComponent", "name": "My Chart", "category": "Chart", "icon": "<svg>...</svg>" }
```

`id`는 manifest 파일명 접두사 = 배포 경로의 파일명 접두사입니다.

---

## 5. 보고서에서 사용하기

### .design.json — ExternalComponent 배치

```json
{
    "Type": "ExternalComponent",
    "Id": "ec_my_001",
    "Name": "ecMyComp",
    "Position": { "Left": 10, "Top": 90, "Width": 1100, "Height": 700 },
    "ComponentSetting": {
        "ComponentId": "myComponent",
        "ClassName": "MyComponent",
        "Files": [
            { "type": "js", "url": "lib/echarts.min.js", "order": 1 },
            { "type": "js", "url": "myComponent.js", "order": 2 },
            { "type": "css", "url": "myComponent.css" }
        ],
        "Options": { "FieldName": "NAME", "ValueField": "VALUE" }
    }
}
```

> i-AUD Designer에서 컴포넌트를 선택하면 `ComponentSetting`이 자동으로 채워집니다.

### .script.ts — 스크립트에서 사용

```typescript
import { Matrix } from "@AUD_CLIENT/control/Matrix";
import { ExternalComponent } from "@AUD_CLIENT/extcomponent/ExternalComponent";
import { DataGrid } from "@AUD_CLIENT/control/DataGrid";
import { Label } from "@AUD_CLIENT/control/Label";

let Matrix: Matrix;

Matrix.OnDocumentLoadComplete = function (sender, args) {

    let ecMyComp = Matrix.getObject("ecMyComp") as ExternalComponent;
    let grdData = Matrix.getObject("grdData") as DataGrid;
    let lblStatus = Matrix.getObject("lblStatus") as Label;

    // ★ 반드시 OnComponentReady 안에서 getModel() — 밖에서 호출하면 null
    ecMyComp.OnComponentReady = function () {
        let model = ecMyComp.getModel();
        if (!model) return;

        model.setConfig({ Title: "My Chart" });  // 설정 변경
        model.setGrid(grdData);                   // 그리드 바인딩

        model.OnItemClick = function (args: { name: string; value: number }) {
            lblStatus.Value = "  " + args.name + ": " + args.value;
        };
    };

    // 설정 변경 후 재렌더링: model.setConfig({...}); model.Update();
};
```

### 이벤트명 주의

```typescript
cmbType.AddItem("bar", "bar");     // AddItem(value, displayText) — 2개 인자 필수
cmbType.OnValueChanged = ...;      // ComboBox
chkLabel.OnValueChange = ...;      // CheckBox, RadioButton (Changed 아님!)
```

---

## 6. 데이터 구조별 설계 및 기존 컴포넌트

| 데이터 구조 | 컬럼 형태 | 기존 컴포넌트 | 참고 포인트 |
|------------|----------|-------------|-----------|
| 카테고리 + 숫자 | `CAT, VAL1, VAL2` | echartsComponent | 범용 차트, 다중 타입 |
| 3차원 매트릭스 | `ROW, COL, VALUE` | heatmapComponent | 3차원 데이터 매핑 |
| 노드-링크 | `SRC, TGT, VALUE` | sankeyComponent, graphComponent | 관계 시각화 |
| 계층 (ID-Parent) | `ID, PID, NAME` | orgChartComponent, radialTreeComponent, sunburstComponent | 트리 변환 로직 |
| 단일 값 | 숫자 1개 | gaugeComponent | 가장 단순한 구조 |
| 텍스트 + 빈도 | `WORD, COUNT` | wordCloudComponent | 외부 플러그인 추가 |
| 카드/보드 | 커스텀 | kanbanComponent, timelineComponent | 라이브러리 없이 순수 HTML/CSS |
| 코드/텍스트 | 문자열 | codeEditorComponent, markdownComponent | GetValue/SetValue 패턴 |

---

## 7. 체크리스트

### 새 컴포넌트 생성

- [ ] `extcomponent/{name}Component/` 폴더 + `.ts`, `.css`, `.manifest` 3개 파일
- [ ] `.ts`: IIFE 래핑, Create/Dispose/Resize 구현, `global.AUD.{ClassName}` 등록
- [ ] `.manifest`: className이 `.ts`의 등록명과 일치, version 설정
- [ ] `_catalog.json`에 항목 추가
- [ ] `tsc --noEmit` 빌드 확인

### 서버 배포

- [ ] `.js`(빌드), `.css`, `.manifest` → `/extention/AUD/extcomponent/`에 플랫 업로드
- [ ] 의존 라이브러리(`lib/`)가 서버에 있는지 확인
- [ ] `_catalog.json` 갱신
- [ ] 수정 시 manifest `version` 증가
