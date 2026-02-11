import { ContextMenu } from "../../aud/control/ContextMenu";

/**
 * Base 컨트롤 - HTML과 CSS로 제작 가능한 사용자 정의 컨트롤입니다.
 *
 * MTSD에서 BaseControl 타입으로 정의된 컨트롤의 인스턴스이며,
 * HTML/CSS를 직접 주입하여 자유로운 UI를 구현할 수 있습니다.
 *
 * @example
 * ```ts
 * // 클라이언트 스크립트에서 BaseControl 가져오기
 * let ctrl = Matrix.getObject("myCtrl") as BaseControl;
 *
 * // CSS 추가
 * ctrl.addCSS(`
 *   .my-card { border: 1px solid #ccc; padding: 10px; border-radius: 4px; }
 *   .my-card h3 { margin: 0 0 8px 0; }
 * `);
 *
 * // HTML 추가
 * ctrl.addHTML(`
 *   <div class="my-card">
 *     <h3>제목</h3>
 *     <p>내용</p>
 *   </div>
 * `);
 * ```
 */
export interface BaseControl {

  /** 컨트롤의 루트 HTML 엘리먼트 */
  Element: HTMLDivElement;
 

  /**
   * 컨트롤의 크기가 변경될 때 호출되는 이벤트입니다.
   *
   * @example
   * ```ts
   * let ctrl = Matrix.getObject("myCtrl") as BaseControl;
   * ctrl.OnResize = function(sender, args) {
   *     console.log("크기 변경:", args.Width, args.Height);
   * };
   * ```
   */
  OnResize: ((control: BaseControl, args: { Width: number; Height: number }) => void) | null;

  /**
   * 컨트롤이 업데이트(새로고침)될 때 호출되는 이벤트입니다.
   *
   * @example
   * ```ts
   * let ctrl = Matrix.getObject("myCtrl") as BaseControl;
   * ctrl.OnUpdate = function(sender, args) {
   *     // 데이터 갱신 처리
   * };
   * ```
   */
  OnUpdate: ((control: BaseControl, args: { Width: number; Height: number }) => void) | null;

  /**
   * 속성 목록을 빌드할 때 호출되는 이벤트입니다.
   *
   * @example
   * ```ts
   * let ctrl = Matrix.getObject("myCtrl") as BaseControl;
   * ctrl.OnBuildProperteis = function(sender, args) {
   *     args.Properties.push({ Name: "옵션1", Value: "값1" });
   * };
   * ```
   */
  OnBuildProperteis: ((control: BaseControl, args: { Properties: any[] }) => void) | null;

  /**
   * 우클릭 시 컨텍스트 메뉴를 구성할 때 호출되는 이벤트입니다.
   *
   * @example
   * ```ts
   * let ctrl = Matrix.getObject("myCtrl") as BaseControl;
   * ctrl.OnContextMenuOpening = function(sender, args) {
   *     args.Menu.Clear();
   *     args.Menu.AddMenu("새로고침", function() {
   *         // 새로고침 처리
   *     });
   * };
   * ```
   */
  OnContextMenuOpening: ((control: BaseControl, args: { Id: string; Menu: ContextMenu }) => void) | null;

  /**
   * 컨트롤의 크기를 재조정합니다. Width, Height 속성 변경 후 호출하면 반영됩니다.
   *
   * @example
   * ```ts
   * ctrl.Width = 500;
   * ctrl.Height = 300;
   * ctrl.Resize();
   * ```
   */
  Resize(): void;

  /**
   * 컨트롤을 업데이트(새로고침)합니다.
   *
   * @param opt 옵션 파라미터
   */
  Update(opt?: any): void;

  /**
   * 컨트롤의 속성 목록을 반환합니다.
   */
  GetProperties(): any[] | null;

  /**
   * 컨트롤 내부의 모든 자식 DOM 엘리먼트를 제거합니다.
   *
   * @example
   * ```ts
   * // 루트 엘리먼트의 모든 자식 제거
   * ctrl.clearHTML();
   *
   * // 특정 노드의 자식만 제거
   * let container = ctrl.Element.querySelector(".content") as HTMLElement;
   * ctrl.clearHTML(container);
   * ```
   * @param pNode 자식을 제거할 대상 노드. 생략 시 루트 Element의 자식을 모두 제거합니다.
   */
  clearHTML(pNode?: HTMLElement): void;

  /**
   * 컨트롤에 CSS 스타일을 추가합니다.
   * {@code <style>} 태그를 생성하여 {@code <head>}에 삽입하며, 컨트롤 Dispose 시 자동 제거됩니다.
   *
   * @example
   * ```ts
   * ctrl.addCSS(`
   *   .my-table { width: 100%; border-collapse: collapse; }
   *   .my-table td { border: 1px solid #ddd; padding: 8px; }
   * `);
   * ```
   * @param css CSS 문자열
   */
  addCSS(css: string): void;

  /**
   * 컨트롤에 HTML을 추가합니다.
   * HTML 문자열을 파싱하여 DOM에 삽입합니다.
   *
   * @example
   * ```ts
   * // 루트 엘리먼트에 HTML 추가
   * ctrl.addHTML('<div class="header">제목</div>');
   *
   * // 특정 노드에 HTML 추가
   * let body = ctrl.Element.querySelector(".body") as HTMLElement;
   * ctrl.addHTML('<p>내용</p>', body);
   * ```
   * @param text HTML 문자열
   * @param pNode HTML을 삽입할 대상 노드. 생략 시 루트 Element에 삽입합니다.
   */
  addHTML(text: string, pNode?: HTMLElement): void;

 
}
