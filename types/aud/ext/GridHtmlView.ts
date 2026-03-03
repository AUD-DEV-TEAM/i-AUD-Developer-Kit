import { ContextMenu } from "../../aud/control/ContextMenu";
import { DataGrid } from "../../aud/control/DataGrid";
/**
 * DataGrid 데이터를 HTML 템플릿으로 렌더링하는 컨트롤입니다.
 *
 * HTML 템플릿에 aud-for, aud-bind, aud-model 등의 디렉티브를 사용하여
 * 카드형 목록, 입력 폼 등 자유로운 레이아웃을 구성할 수 있습니다.
 *
 * **주의**: `Matrix.getObject()`는 AddIn 래퍼를 반환합니다.
 * AddIn 컴포넌트는 비동기로 로딩되므로, `OnComponentClassLoaded` 이벤트 안에서
 * `getScriptClass()`를 호출하여 GridHtmlView에 접근하세요.
 *
 * 템플릿 문법 (대/소문자 무관):
 * - 반복: `aud-for="ROWS|COLUMNS|PAGES|CURRENT_ROW"`
 * - 바인딩: `aud-bind="필드명|VALUE|HEADER|FIELD|NUM|@INDEX|@ROWNUM|CURRENTPAGE|LASTPAGE|TOTALCOUNT"`
 * - 조건부: `aud-if="field"` | `aud-class="field:className"` | `aud-disabled="field"`
 * - 액션: `aud-action="PREV|NEXT|FIRST|LAST|PAGE"`
 * - 이벤트: `aud-on-{event}="함수명"` — addFunction()으로 등록한 함수를 (row, rowIndex, event) 인자로 호출
 * - 양방향: `aud-model="필드명"` — input/select/checkbox 값 ↔ DataGrid 셀 값 양방향 바인딩
 *
 * @example
 * ```ts
 * import { AddIn } from "@AUD_CLIENT/control/AddIn";
 * import { GridHtmlView } from "@AUD_CLIENT/ext/GridHtmlView";
 *
 * let addIn = Matrix.getObject("myView") as AddIn;
 * addIn.OnComponentClassLoaded = function(sender, args) {
 *     let view = addIn.getScriptClass() as GridHtmlView;
 *     let grid = Matrix.getObject("GRD") as DataGrid;
 *
 *     view.DataGrid = grid;
 *     view.CSS = '.card { padding:12px; border:1px solid #e2e8f0; }';
 *     view.HTML = '<div class="card" aud-for="ROWS"><span aud-bind="NAME"></span></div>';
 * };
 * ```
 */
export interface GridHtmlView {

  /** 컨트롤의 루트 HTML 엘리먼트 */
  Element: HTMLDivElement;

  /**
   * 데이터를 표시할 DataGrid를 설정합니다.
   *
   * DataGrid를 설정하면 OnDataChanged, OnCurrentRowChanged 이벤트가 자동으로 연결되어
   * 데이터 변경 시 HTML 템플릿이 자동으로 다시 렌더링되고,
   * 현재 행 변경 시 CURRENT_ROW 섹션이 효율적으로 갱신됩니다.
   *
   * @example
   * ```ts
   * let view = (Matrix.getObject("myView") as AddIn).getScriptClass() as GridHtmlView;
   * let grid = Matrix.getObject("GRD") as DataGrid;
   * view.DataGrid = grid;
   * ```
   */
  DataGrid: DataGrid;

  /**
   * HTML 템플릿을 가져오거나 설정합니다.
   *
   * 템플릿 디렉티브를 사용하여 DataGrid 데이터를 원하는 레이아웃으로 표현할 수 있습니다.
   * HTML이 설정되고 DataGrid에 데이터가 로드되면 자동으로 렌더링됩니다.
   *
   * @example
   * ```ts
   * view.HTML = [
   *   '<div aud-for="ROWS">',
   *   '  <span aud-bind="NAME"></span>',
   *   '  <input type="text" aud-model="VALUE" />',
   *   '</div>',
   *   '<div aud-for="CURRENT_ROW">',
   *   '  <h3 aud-bind="NAME"></h3>',
   *   '</div>'
   * ].join('\\n');
   * ```
   */
  HTML: string;

  /**
   * CSS 스타일시트를 가져오거나 설정합니다.
   *
   * ShadowDOM 내부에 적용되므로 외부 스타일과 충돌하지 않습니다.
   *
   * @example
   * ```ts
   * view.CSS = '.card { padding:12px; border:1px solid #e2e8f0; border-radius:8px; }';
   * ```
   */
  CSS: string;

  /**
   * 컨트롤의 크기가 변경될 때 호출되는 이벤트입니다.
   *
   * @example
   * ```ts
   * view.OnResize = function(sender, args) {
   *     console.log("크기 변경:", args.Width, args.Height);
   * };
   * ```
   */
  OnResize: ((sender: GridHtmlView, args: { Width: number; Height: number }) => void) | null;

  /**
   * 컨트롤이 업데이트(새로고침)될 때 호출되는 이벤트입니다.
   *
   * @example
   * ```ts
   * view.OnUpdate = function(sender, args) {
   *     // 데이터 갱신 처리
   * };
   * ```
   */
  OnUpdate: ((sender: GridHtmlView, args: { Width: number; Height: number }) => void) | null;

  /**
   * 우클릭 시 컨텍스트 메뉴를 구성할 때 호출되는 이벤트입니다.
   *
   * @example
   * ```ts
   * view.OnContextMenuOpening = function(sender, args) {
   *     args.Menu.Clear();
   *     args.Menu.AddMenu("새로고침", function() {
   *         // 새로고침 처리
   *     });
   * };
   * ```
   */
  OnContextMenuOpening: ((sender: GridHtmlView, args: { Id: string; Menu: ContextMenu }) => void) | null;

  /**
   * HTML 템플릿의 `aud-on-{event}="함수명"` 디렉티브에서 호출할 함수를 등록합니다.
   *
   * 등록한 함수는 해당 이벤트 발생 시 `(row, rowIndex, event)` 인자로 호출됩니다.
   *
   * @param name 함수 이름 (aud-on-click="함수명" 에서 사용한 이름)
   * @param fn 이벤트 핸들러 함수
   *
   * @example
   * ```ts
   * let view = (Matrix.getObject("myView") as AddIn).getScriptClass() as GridHtmlView;
   *
   * // 함수 등록
   * view.addFunction("onRowClick", function(row, rowIndex, event) {
   *     console.log("클릭한 행:", rowIndex, row);
   * });
   *
   * view.addFunction("onDelete", function(row, rowIndex, event) {
   *     if (confirm(row.NAME + " 을(를) 삭제하시겠습니까?")) {
   *         // 삭제 처리
   *     }
   * });
   *
   * // HTML 템플릿에서 사용
   * view.HTML = [
   *   '<div aud-for="ROWS" aud-on-click="onRowClick">',
   *   '  <span aud-bind="NAME"></span>',
   *   '  <button aud-on-click="onDelete">삭제</button>',
   *   '</div>'
   * ].join('\n');
   * ```
   */
  addFunction(name: string, fn: (row: Record<string, any>, rowIndex: number, event: Event) => void): void;

  /**
   * 컨트롤의 크기를 재조정합니다.
   */
  Resize(): void;

  /**
   * 컨트롤을 업데이트(새로고침)합니다.
   *
   * @param opt 옵션 파라미터
   */
  Update(opt?: any): void;


  /**
   * Template Html Dom객체를 제거합니다.
   */
  Clear():void;

}
