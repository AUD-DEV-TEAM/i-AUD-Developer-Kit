import { DataRow } from "../../../com/matrix/olap/DataRow";
import { WriteBackDataCell } from "../../../com/matrix/olap/WriteBackDataCell";
import { OlapField } from "../../../com/matrix/olap/OlapField";
/**
* OLAP Write-Back 작업을 지원하는 객체들의 집합입니다.
* `Matrix.getOlapScriptContext()`로 획득하며, OLAP Write-Back 서버 스크립트에서만 사용할 수 있습니다.
*
* @example
* ```js
* // OLAP Write-Back 서버 스크립트에서 OlapScriptContext 사용
* var OLAPContext = Matrix.getOlapScriptContext();
*
* //----------------------------------------------
* // 패턴1: 수정된 셀 값을 균등 배분
* //----------------------------------------------
* var editCells = OLAPContext.getEditCells(); // 수정된 셀 목록
* for (var c = 0; c < editCells.length; c++) {
*     var dataCell  = editCells[c];                        // 수정된 셀
*     var rows      = OLAPContext.getRows(dataCell);        // 셀을 구성하는 상세 Row 목록
*     var dataField = OLAPContext.getField(dataCell.Field); // 필드 정보
*     var colIdx    = dataField.DataColumnIndex;            // 데이터 컬럼 인덱스
*
*     OLAPContext.WriteLog("WRITE_BACK",
*         "필드: " + dataField.Name
*         + ", 수정 전: " + dataCell.Before
*         + ", 수정 후: " + dataCell.After);
*
*     if (dataCell.Before == dataCell.After) continue; // 값 변경 없으면 건너뜀
*
*     // Lock이 아닌 Row만 추출
*     var unLockedRows = [];
*     var lockedSum = 0;
*     for (var r = 0; r < rows.length; r++) {
*         var row = rows[r];
*         var val = row.getNumber(colIdx);
*         if (isNaN(val)) val = 0;
*         if (row.IsLockColumn(colIdx)) {
*             lockedSum += val;
*         } else {
*             unLockedRows.push({ row: row, value: val });
*         }
*     }
*     // 균등 배분
*     var diff = dataCell.After - dataCell.Before;
*     var share = diff / unLockedRows.length;
*     for (var i = 0; i < unLockedRows.length; i++) {
*         unLockedRows[i].row.setNumber(colIdx, unLockedRows[i].value + share);
*     }
* }
*
* //----------------------------------------------
* // 패턴2: 수정된 셀 기준으로 Row 추가
* //----------------------------------------------
* var editCells = OLAPContext.getEditCells();
* for (var c = 0; c < editCells.length; c++) {
*     var dataCell  = editCells[c];
*     var dataField = OLAPContext.getField(dataCell.Field);
*
*     // 수정된 셀 기준으로 새 Row 추가
*     var newRow = OLAPContext.addRow(dataCell);
*     // Dimension 필드 값 설정 (필드명 또는 DataColumnIndex 사용)
*     var dimField = OLAPContext.getField("D7");
*     newRow.setString(dimField.DataColumnIndex, "신규항목");
*     // Measure 필드 값 설정
*     newRow.setNumber(dataField.DataColumnIndex, 100);
* }
* ```
*/
export interface OlapScriptContext{

  /**
   * 서버 로그를 출력합니다.
   *
  * @param code 로그 구분 코드
  * @param message 로그 메시지
  */
  WriteLog(code: string, message: string): void;

  /**
   * 수정된 셀 기준으로 새로운 Row를 추가합니다.
   *
  * @param cell 수정된 셀 정보
  */
  addRow(cell: WriteBackDataCell): DataRow;

  /**
   * 수정된 셀의 목록을 반환합니다.
   *
  */
  getEditCells(): WriteBackDataCell[];

  /**
   * 필드 정보를 반환합니다.
   *
  * @param name 필드명
  */
  getField(name: string): OlapField;

  /**
   * 수정된 셀의 상세 Row 목록을 반환합니다.
   *
  * @param cell 수정된 셀 객체
  */
  getRows(cell: WriteBackDataCell): DataRow[];

}
