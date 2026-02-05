/**
 * 컨트롤을 통해서 출력되는 컨텍스트 메뉴 객체입니다.
 *
 * @example
 * ```js
 * // 그리드 우클릭 시 컨텍스트 메뉴 표시
 * var grid = Matrix.getObject("grdData");
 * grid.OnContextMenuOpen = function(sender, args) {
 *     var menu = args.Menu;
 *     menu.Clear();
 *     menu.AddMenu("행 추가", function() {
 *         grid.AddRow();
 *     });
 *     menu.AddMenu("행 삭제", function() {
 *         grid.DeleteRow(args.RowIndex);
 *     });
 *     menu.AddLine();
 *     menu.AddMenu("엑셀 내보내기", function() {
 *         grid.ExportToExcel("export.xlsx");
 *     });
 * };
 * ```
 */
export interface ContextMenu{

  /**
   * 컨텍스트 메뉴에 구분선을 추가합니다.
   *
   * @example
   * ```js
   * menu.AddMenu("복사", copyFunc);
   * menu.AddLine(); // 구분선 추가
   * menu.AddMenu("삭제", deleteFunc);
   * ```
   */
  AddLine(): void;

  /**
   * 컨텍스트 메뉴에 아이템을 추가합니다.
   *
   * @example
   * ```js
   * menu.AddMenu("새로고침", function() {
   *     Matrix.doRefresh("grdData");
   * });
   * ```
   * @param Name 아이템의 표시 텍스트
   * @param Event 아이템 클릭 시 실행할 이벤트 함수
   */
  AddMenu(Name: string, Event: Function): void;

  /**
   * 컨텍스트 메뉴의 아이템을 모두 삭제합니다.
   */
  Clear(): void;

}
