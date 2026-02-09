/**
 * 그리드 내보내기 시 상단에 추가할 행 항목의 정보를 나타냅니다.
 *
 * {@link Grid} OnGridExportStart 이벤트의 `ExportRows` 배열 요소로 사용됩니다.
 *
 * @example
 * ```ts
 * grid.OnGridExportStart = function(sender, args) {
 *     args.ExportRows = [
 *         { Range: "A1", ColSpan: 10, Value: "■ 보고서 명 : 매출현황" }
 *     ];
 * };
 * ```
 */
export interface ExportRowItem {

  /**
   * 엑셀 시트에서의 셀 위치 (예: `"A1"`)
   */
  Range: string;

  /**
   * 열 병합 수
   */
  ColSpan?: number;

  /**
   * 셀에 표시할 값
   */
  Value: string;

  /**
   * 셀 스타일 (예: `{Border: "border:Thin,#000000;", Font: "font-color:#000000"}`)
   */
  Style?: {
    /**
     * 테두리 스타일 (예: `"border:Thin,#000000;"`)
     */
    Border?: string;
    /**
     * 글자 스타일 (예: `"font-color:#000000"`)
     */
    Font?: string;
  };

}
