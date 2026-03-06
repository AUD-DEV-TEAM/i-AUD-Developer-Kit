import { Grid } from "../../aud/control/Grid";
import { enVerticalPositionType } from "../../aud/enums/comm/enVerticalPositionType";
import { DataGridRow } from "../../aud/control/grids/DataGridRow";
/**
 * 데이터를 표 형태로 표현하는 그리드 컨트롤입니다.
 *
 * 페이징, 행 삽입, 그룹핑 등 {@link Grid}를 확장한 기능을 제공합니다.
 *
 * @example
 * ```js
 * // DataGrid 컨트롤을 가져와 데이터를 조회합니다.
 * var grid = Matrix.getObject("DataGrid");
 *
 * // 서버 스크립트를 호출하여 데이터를 바인딩합니다.
 * Matrix.RunScript("DataGrid", "SearchService", function(p) {
 *     if (p.Success == false) {
 *         Matrix.Alert(p.Message);
 *         return;
 *     }
 * });
 *
 * // 행을 추가하고 값을 설정합니다.
 * var row = grid.AppendRow();
 * row.SetValue("NAME", "홍길동");
 * row.SetValue("AGE", "30");
 * ```
*/
export interface DataGrid extends Grid{

  /**
   * 값이 NaN인 셀에 표시할 텍스트를 가져오거나 설정합니다.
  */
  NaNCellText: string;

  /**
   * 현재 페이지 번호를 가져오거나 설정합니다.
  */
  PageIndex: number;

  /**
   * 한 페이지에 표시할 레코드 수를 가져오거나 설정합니다.
  */
  PageSize: number;

  /**
   * 페이징 바의 표시 위치를 가져오거나 설정합니다.
  */
  PagingPosition: enVerticalPositionType;

  /**
   * 내보내기 시 세로 병합(MergeRule)과 가로 병합(필드 별 병합용 참조 필드)을 모두 해제할지 여부를 가져오거나 설정합니다.
  */
  UseExportDisableMergeRule: boolean;

  /**
   * 페이징 사용 여부를 가져오거나 설정합니다.
   *
  */
  UsePaging: boolean;

  /**
   * 마지막 페이지의 인덱스를 반환합니다. Record 개수 표시 옵션이 `false`일 경우 0을 반환합니다.
   *
  */
  GetLastPageIndex(): number;

  /**
   * 지정한 위치의 레코드(행)를 반환합니다.
   *
  * @param idx 행 위치
  */
  GetRow(idx: number): DataGridRow;

  /**
   * 전체 레코드(페이지를 사용하지 않을 경우 필터로 인해 숨은 레코드 포함)에서 지정한 위치의 레코드(행)를 반환합니다.
   *
  * @param idx 행 위치
  */
  GetRowInTotalRows(idx: number): DataGridRow;

  /**
   * 전체 레코드(필터 적용)의 수를 반환합니다.
   *
  */
  GetTotalPageRowCount(): number;

  /**
   * 데이터 그리드를 지정한 필드 목록으로 그룹핑합니다.
   *
  * @param Fields 그룹핑할 필드 이름 목록
  */
  GroupGrid(Fields: string[]): void;

  /**
   * 현재 선택된 행의 다음 위치에 행을 삽입하고, 삽입된 행을 반환합니다.
   *
   * @example
   * ```js
   * var grid = Matrix.getObject("DataGrid");
   * var newRow = grid.InsertRow();
   * newRow.SetValue("NAME", "신규");
   * ```
  */
  InsertRow(): DataGridRow;

  /**
   * 지정한 위치에 행을 삽입하고, 삽입된 행을 반환합니다.
   *
  * @param idx 삽입할 행 인덱스
  */
  InsertRow(idx: number): DataGridRow;

  /**
   * 다음 페이지로 이동합니다. 페이징이 활성화된 경우에만 동작합니다.
   *
  */
  MoveNextPage(): void;

  /**
   * 지정한 페이지로 이동합니다. Record 개수 표시 옵션이 `true`로 설정되어 있어야 합니다.
   *
  * @param PageIndex 이동할 페이지 번호 (1부터 시작)
  */
  MovePage(PageIndex: number): void;

  /**
   * 이전 페이지로 이동합니다. 페이징이 활성화된 경우에만 동작합니다.
   *
  */
  MovePrevPage(): void;

  /**
   * @event
   *
   * 데이터그리드의 데이터 모델이 변경된 후 발생합니다.
   * ApplyDataSource(데이터 조회하여 데이터 바인딩 후), SetDataSet(스크립트 데이터 설정),
   * Calculate(레코드 수정 후 강제 업데이트) 완료 시 발생합니다.
   *
   * @param sender 이벤트가 발생한 데이터그리드 컨트롤
   * @param args 이벤트 인자
   *
   * Target : {@link DataGrid}
   *
   * @example
   * ```js
   * var grid = Matrix.getObject("DataGrid");
   * grid.OnDataChanged = function(sender, args) {
   *     // 데이터 변경 원인에 따라 분기 처리
   *     console.log("변경 원인: " + args.Source + ", 행 수: " + args.RecordCount);
   * };
   * ```
  */
  OnDataChanged : (sender : DataGrid
  , args : {
    /**
     * 컨트롤 이름
    */
    Id: string
    /**
     * 데이터셋의 레코드 수량
    */
    RecordCount: number
    /**
     * 데이터 변경 원인 ("ApplyDataSource" | "SetDataSet" | "Calculate")
    */
    Source: string
  }
  ) => void;

}
