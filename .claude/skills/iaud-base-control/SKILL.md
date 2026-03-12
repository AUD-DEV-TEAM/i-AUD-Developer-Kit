---
name: iaud-base-control
description: i-AUD BaseControl Add-in 컴포넌트 가이드. HTML과 CSS로 자유롭게 UI를 개발할 수 있는 사용자 정의 컨트롤입니다. "HTML 컨트롤", "BaseControl", "사용자 정의 UI", "커스텀 레이아웃", "HTML 패널", "UserComponent", "AddIn HTML" 등을 요청할 때 사용하세요.
---

# i-AUD BaseControl Add-in 컴포넌트 가이드

## 1. 개요

**BaseControl**은 i-AUD의 Add-in 컴포넌트로, **순수 HTML과 CSS**를 사용하여 완전히 자유로운 UI를 구현할 수 있는 사용자 정의 컨트롤입니다.

- i-AUD 보고서 안에서 **HTML/CSS/JavaScript**로 어떤 UI든 만들 수 있습니다
- 탭 바, 리사이저블 패널, 커스텀 네비게이션, 대시보드 레이아웃 등 자유도가 높습니다
- `addCSS()`, `addHTML()`, `clearHTML()` 3개 핵심 메소드로 DOM을 관리합니다
- 우클릭 컨텍스트 메뉴, 리사이즈 이벤트 등 i-AUD 플랫폼과 통합됩니다
- CSS는 `<head>`에 `<style>` 태그로 삽입되며, 컴포넌트 Dispose 시 자동 제거됩니다

### GridHtmlView와의 차이점

| 구분 | BaseControl | GridHtmlView |
|------|-------------|-------------|
| **목적** | 범용 HTML/CSS UI 제작 | DataGrid 데이터 템플릿 렌더링 |
| **데이터 바인딩** | 없음 (수동 DOM 조작) | AUD 디렉티브 자동 바인딩 |
| **CSS 격리** | 없음 (`<head>`에 삽입, 전역) | Shadow DOM (격리됨) |
| **자유도** | 최대 (모든 HTML/CSS/JS) | 템플릿 문법 범위 내 |
| **사용 사례** | 커스텀 레이아웃, 탭, 네비게이션 | 카드 리스트, 입력 폼, 마스터-디테일 |

> **선택 기준**: DataGrid 데이터를 보여주는 UI → `GridHtmlView`, 순수 HTML/CSS 커스텀 UI → `BaseControl`

---

## 2. MTSD 구성

BaseControl은 Add-in 타입 Element로 MTSD에 정의됩니다. `ComponentElement`는 빈 객체입니다.

```json
{
  "Type": "AddIn",
  "Id": "AddInF562F24C24369E8F3A0F6A4CD728CDD2",
  "Name": "MY_CONTROL",
  "ComponentType": "BaseControl",
  "ComponentElement": {},
  "Position": { "Left": 0, "Top": 0, "Width": 800, "Height": 600 },
  "Style": { "Type": 0, "BoxStyle": "" }
}
```

| 속성 | 설명 |
|------|------|
| `ComponentType` | `"BaseControl"` (고정) |
| `ComponentElement` | `{}` (빈 객체 — HTML/CSS는 스크립트에서 제어) |

### build_mtsd로 생성

```js
const doc = new MtsdBuilder("커스텀 UI 보고서");

// BaseControl AddIn
doc.addAddIn("MY_CONTROL", {
  dock: "fill",
  componentType: "BaseControl",
  componentElement: {}
});

return doc.build();
```

---

## 3. 클라이언트 스크립트 API

### 3.1 컨트롤 접근

```typescript
import { BaseControl } from "@AUD_CLIENT/ext/BaseControl";

let Matrix: Matrix;

// AddIn 컨트롤을 가져온 후 BaseControl 인스턴스 획득
let ctrl = Matrix.getObject("MY_CONTROL") as any;
let baseCtrl = ctrl.getScriptClass("BaseControl") as BaseControl;
```

> **`getScriptClass("BaseControl")`**: AddIn 컨트롤에서 BaseControl 인스턴스를 가져오는 메소드입니다. 컴포넌트 클래스가 아직 로드되지 않았으면 `null`을 반환할 수 있으므로, `OnComponentClassLoaded` 이벤트를 사용하여 안전하게 접근합니다.

### 3.2 안전한 초기화 패턴

```typescript
let ctrl = Matrix.getObject("MY_CONTROL") as any;
let baseCtrl = ctrl.getScriptClass("BaseControl") as BaseControl;

if (baseCtrl) {
    // 이미 로드됨 — 바로 초기화
    initUI(baseCtrl);
} else {
    // 아직 로드 안됨 — 로드 완료 후 초기화
    ctrl.OnComponentClassLoaded = function(sender, args) {
        baseCtrl = ctrl.getScriptClass("BaseControl") as BaseControl;
        initUI(baseCtrl);
    };
}

function initUI(bc: BaseControl) {
    bc.addCSS(CSS_TEXT);
    bc.clearHTML();
    bc.addHTML(HTML_TEXT);
    // DOM 조작 시작...
}
```

### 3.3 핵심 메소드

#### addCSS(css: string) — CSS 스타일 추가

`<style>` 태그를 생성하여 `<head>`에 삽입합니다. 컴포넌트 Dispose 시 자동 제거됩니다.

```typescript
baseCtrl.addCSS(`
    .my-panel { display: flex; gap: 10px; padding: 12px; }
    .my-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .my-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,.1); }
`);
```

> **주의**: CSS는 Shadow DOM이 아닌 `<head>`에 삽입되므로 **전역 범위**입니다. 클래스명 충돌을 방지하기 위해 고유한 접두사를 사용하세요. (예: `myctrl-header`, `epa-tab` 등)

#### addHTML(text: string, pNode?: HTMLElement) — HTML 추가

HTML 문자열을 DOMParser로 파싱하여 DOM에 삽입합니다.

```typescript
// 루트 Element에 HTML 추가
baseCtrl.addHTML(`
    <div class="my-panel">
        <div class="my-card">카드 1</div>
        <div class="my-card">카드 2</div>
    </div>
`);

// 특정 노드에 HTML 추가
let container = baseCtrl.Element.querySelector(".my-panel") as HTMLElement;
baseCtrl.addHTML('<div class="my-card">카드 3</div>', container);
```

#### clearHTML(pNode?: HTMLElement) — DOM 자식 제거

```typescript
// 루트 Element의 모든 자식 제거
baseCtrl.clearHTML();

// 특정 노드의 자식만 제거
let list = baseCtrl.Element.querySelector(".list-container") as HTMLElement;
baseCtrl.clearHTML(list);
```

### 3.4 프로퍼티

| 프로퍼티 | 타입 | 설명 |
|----------|------|------|
| `Element` | `HTMLDivElement` | 루트 HTML 엘리먼트. DOM 조작의 진입점 |

```typescript
// Element를 통한 직접 DOM 접근
let btn = baseCtrl.Element.querySelector(".my-btn") as HTMLButtonElement;
btn.addEventListener("click", function() { /* ... */ });

// 크기 확인
let width = baseCtrl.Element.offsetWidth;
let height = baseCtrl.Element.offsetHeight;
```

### 3.5 이벤트

| 이벤트 | 시그니처 | 설명 |
|--------|----------|------|
| `OnResize` | `(control, args: {Width, Height}) => void` | 컨트롤 크기 변경 시 |
| `OnUpdate` | `(control, args: {Width, Height}) => void` | 컨트롤 업데이트 시 |
| `OnBuildProperteis` | `(control, args: {Properties: any[]}) => void` | 속성 목록 빌드 시 (디자이너용) |
| `OnContextMenuOpening` | `(control, args: {Id, Menu}) => void` | 우클릭 컨텍스트 메뉴 열릴 때 |

```typescript
// 리사이즈 이벤트
baseCtrl.OnResize = function(sender, args) {
    console.log("새 크기:", args.Width, args.Height);
    // 내부 레이아웃 재조정
};

// 컨텍스트 메뉴
baseCtrl.OnContextMenuOpening = function(sender, args) {
    args.Menu.Clear();
    args.Menu.AddMenu("새로고침", function() {
        refreshContent();
    });
    args.Menu.AddMenu("초기화", function() {
        resetLayout();
    });
};
```

---

## 4. 개발 패턴

### 4.1 기본 패턴 — CSS + HTML 주입

가장 기본적인 사용 패턴입니다. CSS를 먼저 추가하고, HTML을 주입한 뒤, DOM을 조작합니다.

```typescript
// 1. CSS 추가
baseCtrl.addCSS(`
    .greeting { font-size: 20px; font-weight: bold; color: #1e293b; padding: 20px; }
    .greeting .highlight { color: #2563eb; }
`);

// 2. 기존 내용 제거 + HTML 추가
baseCtrl.clearHTML();
baseCtrl.addHTML(`
    <div class="greeting">
        안녕하세요, <span class="highlight">i-AUD</span>입니다.
    </div>
`);
```

> **호출 순서**: `addCSS()` → `clearHTML()` → `addHTML()` 순서를 권장합니다. CSS가 먼저 적용되어야 HTML 렌더링 시 깜빡임이 없습니다.

### 4.2 동적 콘텐츠 업데이트

데이터에 따라 HTML을 동적으로 생성하고 갱신하는 패턴입니다.

```typescript
function renderList(items: Array<{name: string, value: string}>) {
    let listEl = baseCtrl.Element.querySelector(".item-list") as HTMLElement;
    baseCtrl.clearHTML(listEl);

    let html = "";
    for (let i = 0; i < items.length; i++) {
        html += '<div class="item">'
              + '  <span class="name">' + items[i].name + '</span>'
              + '  <span class="value">' + items[i].value + '</span>'
              + '</div>';
    }
    baseCtrl.addHTML(html, listEl);
}
```

### 4.3 이벤트 바인딩 패턴

HTML 삽입 후 DOM 요소에 이벤트를 연결합니다.

```typescript
baseCtrl.clearHTML();
baseCtrl.addHTML(`
    <div class="toolbar">
        <button class="btn-refresh">새로고침</button>
        <button class="btn-export">내보내기</button>
    </div>
    <div class="content"></div>
`);

// DOM 요소 참조 후 이벤트 바인딩
let btnRefresh = baseCtrl.Element.querySelector(".btn-refresh") as HTMLButtonElement;
let btnExport = baseCtrl.Element.querySelector(".btn-export") as HTMLButtonElement;

btnRefresh.addEventListener("click", function() {
    Matrix.doRefresh("GRD_DATA");
});

btnExport.addEventListener("click", function() {
    let grid = Matrix.getObject("GRD_DATA") as DataGrid;
    grid.Export(0); // Excel 내보내기
});
```

### 4.4 클래스 기반 패턴

복잡한 UI는 클래스로 캡슐화하는 것을 권장합니다.

```typescript
class CustomTabBar {
    private baseCtrl: BaseControl;
    private tabContainer: HTMLElement;
    private onTabChange: ((tabName: string) => void) | null = null;

    constructor(ctrl: BaseControl) {
        this.baseCtrl = ctrl;
        this.init();
    }

    private init() {
        this.baseCtrl.addCSS(`
            .tab-bar { display:flex; border-bottom:2px solid #e2e8f0; }
            .tab-item { padding:8px 16px; cursor:pointer; font-size:13px;
              color:#64748b; border-bottom:2px solid transparent; margin-bottom:-2px; }
            .tab-item:hover { color:#1e293b; }
            .tab-item.active { color:#2563eb; border-bottom-color:#2563eb; font-weight:600; }
        `);

        this.baseCtrl.clearHTML();
        this.baseCtrl.addHTML('<div class="tab-bar"></div>');
        this.tabContainer = this.baseCtrl.Element.querySelector(".tab-bar") as HTMLElement;
    }

    addTab(name: string, label: string) {
        let div = document.createElement("div");
        div.className = "tab-item";
        div.textContent = label;
        div.setAttribute("data-tab", name);

        let self = this;
        div.addEventListener("click", function() {
            self.setActive(name);
            if (self.onTabChange) self.onTabChange(name);
        });

        this.tabContainer.appendChild(div);
    }

    setActive(name: string) {
        let tabs = this.tabContainer.querySelectorAll(".tab-item");
        for (let i = 0; i < tabs.length; i++) {
            let tab = tabs[i] as HTMLElement;
            if (tab.getAttribute("data-tab") === name) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        }
    }

    setOnTabChange(fn: (tabName: string) => void) {
        this.onTabChange = fn;
    }
}

// 사용
let baseCtrl = ctrl.getScriptClass("BaseControl") as BaseControl;
let tabBar = new CustomTabBar(baseCtrl);
tabBar.addTab("overview", "개요");
tabBar.addTab("detail", "상세");
tabBar.addTab("settings", "설정");
tabBar.setActive("overview");
tabBar.setOnTabChange(function(tabName) {
    console.log("탭 변경:", tabName);
});
```

### 4.5 다른 컨트롤 연동 패턴

BaseControl과 DataGrid, MX-GRID 등 다른 i-AUD 컨트롤을 연동하는 패턴입니다.

```typescript
// MX-GRID 시트 탭 연동 (EPA_SHEET_TAB 패턴)
let mxGrid = Matrix.getObject("MX_GRID") as any;

mxGrid.OnDataBindEnd = function(sender, args) {
    drawSheetTabs(mxGrid.WorkBook);
};

function drawSheetTabs(wb: any) {
    let tabRoot = baseCtrl.Element.querySelector(".tab-container") as HTMLElement;
    baseCtrl.clearHTML(tabRoot);

    for (let i = 0; i < wb.Tables.length; i++) {
        let ws = wb.Tables[i];
        if (ws.Visible) {
            let div = document.createElement("div");
            div.className = ws.Active ? "sheet-tab active" : "sheet-tab";
            div.textContent = ws.Name;
            div.addEventListener("click", function() {
                mxGrid.Viewer().setActiveWorkSheet(ws.Name);
                mxGrid.Viewer().Calculate();
                mxGrid.Viewer().Update();
            });
            tabRoot.appendChild(div);
        }
    }
}
```

---

## 5. CSS 작성 가이드

### 5.1 전역 CSS 주의사항

BaseControl의 `addCSS()`는 `<head>`에 `<style>` 태그를 삽입하므로 **전역 범위**입니다. CSS 클래스명이 다른 컨트롤이나 i-AUD 플랫폼의 스타일과 충돌하지 않도록 주의하세요.

**권장 규칙:**

```css
/* 고유 접두사 사용 */
.myctrl-header { ... }      /* O - 고유 접두사 */
.header { ... }              /* X - 너무 일반적, 충돌 위험 */

/* 루트 컨테이너로 스코핑 */
.my-app .title { ... }      /* O - .my-app 내부에서만 적용 */
.title { ... }               /* X - 전역 적용, 충돌 위험 */
```

### 5.2 자주 사용하는 레이아웃 패턴

#### Flexbox 가로 분할

```css
.split-h { display:flex; height:100%; }
.split-h .left { flex:0 0 300px; overflow-y:auto; border-right:1px solid #e2e8f0; }
.split-h .right { flex:1; overflow-y:auto; }
```

#### Flexbox 세로 분할

```css
.split-v { display:flex; flex-direction:column; height:100%; }
.split-v .top { flex:0 0 auto; border-bottom:1px solid #e2e8f0; }
.split-v .bottom { flex:1; overflow-y:auto; }
```

#### 리사이저 (드래그로 크기 조절)

```css
.resizer {
    flex:0 0 4px; background:#e2e8f0; cursor:col-resize;
    transition:background .15s;
}
.resizer:hover, .resizer.active { background:#94a3b8; }
```

#### 탭 바

```css
.tab-bar { display:flex; border-bottom:1px solid #e2e8f0; background:#f8fafc; }
.tab-item { padding:8px 16px; cursor:pointer; border-bottom:2px solid transparent;
  font-size:13px; color:#64748b; user-select:none; }
.tab-item:hover { color:#1e293b; background:#f1f5f9; }
.tab-item.active { color:#2563eb; border-bottom-color:#2563eb; font-weight:600; }
```

#### 툴바

```css
.toolbar { display:flex; align-items:center; gap:8px;
  padding:8px 12px; background:#f8fafc; border-bottom:1px solid #e2e8f0; }
.toolbar .btn { border:1px solid #e2e8f0; background:#fff; color:#334155;
  padding:6px 12px; border-radius:4px; cursor:pointer; font-size:12px; }
.toolbar .btn:hover { background:#f1f5f9; }
.toolbar .btn.primary { background:#2563eb; color:#fff; border-color:#2563eb; }
.toolbar .btn.primary:hover { background:#1d4ed8; }
```

---

## 6. 종합 샘플

### 6.1 시트 탭 바 (EPA_SHEET_TAB 패턴)

MX-GRID의 워크시트 탭을 BaseControl로 구현하는 실전 예시입니다.

```typescript
let mxGrid = Matrix.getObject("MX_GRID") as any;
let ctrl = Matrix.getObject("SHEET_TAB") as any;
let bc = ctrl.getScriptClass("BaseControl") as BaseControl;

// CSS
bc.addCSS(`
    .sheet-bar { display:flex; align-items:center;
      border-top:1px solid #ccc; background:#f3f3f3; height:32px; }
    .sheet-tabs { display:flex; flex:1; overflow-x:auto; scrollbar-width:none; }
    .sheet-tabs::-webkit-scrollbar { display:none; }
    .sheet-tab { padding:5px 14px; cursor:pointer; border-right:1px solid #fff;
      background:#e6e6e6; font-size:13px; user-select:none; white-space:nowrap; }
    .sheet-tab:hover { background:#efefef; }
    .sheet-tab.active { background:#fff; border-top:2px solid #0078d4; font-weight:bold; }
    .sheet-nav-btn { border:none; background:#ddd; padding:5px 10px;
      cursor:pointer; user-select:none; width:40px; }
    .sheet-nav-btn:hover { background:#bbb; }
`);

// HTML
bc.clearHTML();
bc.addHTML(`
    <div class="sheet-bar">
        <button class="sheet-nav-btn" data-dir="left">◀</button>
        <div class="sheet-tabs"></div>
        <button class="sheet-nav-btn" data-dir="right">▶</button>
        <button class="sheet-nav-btn" data-action="add">＋</button>
    </div>
`);

// DOM 참조
let tabRoot = bc.Element.querySelector(".sheet-tabs") as HTMLElement;

// 스크롤 버튼
bc.Element.querySelector('[data-dir="left"]').addEventListener("click", function() {
    tabRoot.scrollBy({ left: -100, behavior: "smooth" });
});
bc.Element.querySelector('[data-dir="right"]').addEventListener("click", function() {
    tabRoot.scrollBy({ left: 100, behavior: "smooth" });
});

// 마우스 휠 스크롤
tabRoot.addEventListener("wheel", function(e) {
    tabRoot.scrollBy({ left: e.deltaY < 0 ? -100 : 100, behavior: "smooth" });
});

// 시트 탭 그리기
function drawTabs() {
    bc.clearHTML(tabRoot);
    let wb = mxGrid.WorkBook;
    for (let i = 0; i < wb.Tables.length; i++) {
        let ws = wb.Tables[i];
        if (ws.Visible) {
            let div = document.createElement("div");
            div.className = ws.Active ? "sheet-tab active" : "sheet-tab";
            div.textContent = ws.Name;
            div.addEventListener("click", function() {
                mxGrid.Viewer().setActiveWorkSheet(ws.Name);
                mxGrid.Viewer().Calculate();
                mxGrid.Viewer().Update();
                drawTabs();
            });
            tabRoot.appendChild(div);
        }
    }
}

// MX-GRID 데이터 바인딩 완료 시 탭 그리기
mxGrid.OnDataBindEnd = function() { drawTabs(); };
```

### 6.2 리사이저블 멀티 패널 레이아웃

```typescript
let bc = ctrl.getScriptClass("BaseControl") as BaseControl;

bc.addCSS(`
    .layout-root { display:flex; height:100%; }
    .panel-left { flex:0 0 250px; overflow:auto; background:#fafafa; }
    .resizer-v { flex:0 0 4px; background:#e2e8f0; cursor:col-resize; }
    .resizer-v:hover, .resizer-v.dragging { background:#94a3b8; }
    .panel-right { flex:1; overflow:auto; }
    .panel-header { padding:12px 16px; font-weight:600; font-size:14px;
      border-bottom:1px solid #e2e8f0; color:#1e293b; }
    .panel-body { padding:12px 16px; }
`);

bc.clearHTML();
bc.addHTML(`
    <div class="layout-root">
        <div class="panel-left">
            <div class="panel-header">메뉴</div>
            <div class="panel-body" id="menu-area"></div>
        </div>
        <div class="resizer-v" id="resizer"></div>
        <div class="panel-right">
            <div class="panel-header">콘텐츠</div>
            <div class="panel-body" id="content-area"></div>
        </div>
    </div>
`);

// 리사이저 드래그
let resizer = bc.Element.querySelector("#resizer") as HTMLElement;
let leftPanel = bc.Element.querySelector(".panel-left") as HTMLElement;
let isDragging = false;

resizer.addEventListener("mousedown", function(e) {
    isDragging = true;
    resizer.classList.add("dragging");
    e.preventDefault();
});

document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;
    let rect = bc.Element.getBoundingClientRect();
    let newWidth = e.clientX - rect.left;
    if (newWidth >= 150 && newWidth <= 500) {
        leftPanel.style.flex = "0 0 " + newWidth + "px";
    }
});

document.addEventListener("mouseup", function() {
    isDragging = false;
    resizer.classList.remove("dragging");
});
```

### 6.3 커스텀 상태 카드 대시보드

```typescript
let bc = ctrl.getScriptClass("BaseControl") as BaseControl;

bc.addCSS(`
    .dash-root { padding:16px; }
    .dash-cards { display:flex; gap:16px; margin-bottom:20px; }
    .dash-stat { flex:1; padding:20px; border-radius:12px; background:#fff;
      border:1px solid #e2e8f0; }
    .dash-stat .label { font-size:12px; color:#64748b; margin-bottom:4px; }
    .dash-stat .value { font-size:28px; font-weight:700; color:#1e293b; }
    .dash-stat .change { font-size:12px; margin-top:4px; }
    .dash-stat .change.up { color:#16a34a; }
    .dash-stat .change.down { color:#dc2626; }
`);

function renderDashboard(stats: Array<{label: string, value: string, change: string, up: boolean}>) {
    bc.clearHTML();
    let html = '<div class="dash-root"><div class="dash-cards">';
    for (let i = 0; i < stats.length; i++) {
        let s = stats[i];
        html += '<div class="dash-stat">'
             +  '  <div class="label">' + s.label + '</div>'
             +  '  <div class="value">' + s.value + '</div>'
             +  '  <div class="change ' + (s.up ? 'up' : 'down') + '">' + s.change + '</div>'
             +  '</div>';
    }
    html += '</div></div>';
    bc.addHTML(html);
}

// DataGrid 바인딩 후 대시보드 업데이트
let grid = Matrix.getObject("GRD_SUMMARY") as DataGrid;
grid.OnDataBindEnd = function() {
    let row = grid.GetRow(0);
    renderDashboard([
        { label: "매출", value: row.GetValue("SALES_AMT"), change: "+12.5%", up: true },
        { label: "주문", value: row.GetValue("ORDER_CNT"), change: "+8.2%", up: true },
        { label: "반품", value: row.GetValue("RETURN_CNT"), change: "-3.1%", up: false },
        { label: "고객수", value: row.GetValue("CUST_CNT"), change: "+5.7%", up: true }
    ]);
};
```

---

## 7. 주의사항

1. **CSS 전역 범위**: `addCSS()`는 `<head>`에 삽입합니다. 클래스명 충돌 방지를 위해 고유 접두사를 사용하세요.
2. **CSS 자동 정리**: 컴포넌트 Dispose 시 `addCSS()`로 추가한 `<style>` 태그가 자동 제거됩니다 (`createon` 속성으로 식별).
3. **HTML 파싱**: `addHTML()`은 `DOMParser`를 사용하므로 올바른 HTML이어야 합니다. `<script>` 태그는 실행되지 않습니다.
4. **getScriptClass 시점**: 컴포넌트 클래스 로드가 비동기일 수 있으므로 `OnComponentClassLoaded` 이벤트를 사용하여 안전하게 접근하세요.
5. **이벤트 정리**: `document.addEventListener`로 등록한 전역 이벤트는 별도로 제거해야 합니다. BaseControl은 자신의 Element에 등록한 이벤트만 자동 정리합니다.
6. **XSS 주의**: 사용자 입력 데이터를 `addHTML()`에 직접 넣지 마세요. `textContent`를 사용하거나 이스케이프 처리하세요.
7. **GridHtmlView와 선택**: DataGrid 데이터 표현이 목적이면 `GridHtmlView`를 사용하세요. 순수 커스텀 UI가 목적이면 `BaseControl`을 사용하세요.
8. **input/textarea 키보드 이벤트**: `addHTML()`로 추가한 `<input>`, `<textarea>`에서 Backspace, Delete 등이 동작하지 않을 수 있습니다. i-AUD 프레임워크가 keydown을 전역으로 가로채기 때문입니다. 입력 요소에 `e.stopPropagation()`을 등록하세요: `input.addEventListener('keydown', function(e) { e.stopPropagation(); });`

---

## 8. 소스 및 예시 파일 위치

| 파일 | 설명 |
|------|------|
| `2.Sources/src/component/BaseControl/Model/BaseControl.ts` | 컴포넌트 구현체 |
| `2.Sources/src/component/BaseControl/index.ts` | 모듈 export |
| `2.Sources/src/component/Common/Interface/IComponentControl.ts` | 컴포넌트 인터페이스 |
| `5.reportSources/types/aud/ext/BaseControl.ts` | 클라이언트 스크립트 타입 정의 |
| `src/reports/ROOT/Projects/EPA_KERIS/EPA_SHEET_TAB/` | 시트 탭 바 예시 (MX-GRID 연동) |
| `src/reports/Work/aud_samples/UserComponent/Layout pannel #1/` | 리사이저블 레이아웃 예시 |
| `src/reports/Work/aud_samples/UserComponent/Layout pannel #2/` | 리사이저블 레이아웃 예시 |
