import { DataRow } from "../../../com/matrix/olap/DataRow";
import { WriteBackDataCell } from "../../../com/matrix/olap/WriteBackDataCell";
import { OlapField } from "../../../com/matrix/olap/OlapField";
/**
* OLAP Write-Back 작업을 지원하는 객체들의 집합 입니다.
*/
export interface OlapScriptContext{

  /** 
   * 로그 출력 하기
   *
  * @param code 
  * @param message 
  */
  WriteLog(code: string, message: string): void;

  /** 
   * 수정된 셀 기준으로 Row를 추가한다.
   *
  * @param cell 수정된 셀 정보
  */
  addRow(cell: WriteBackDataCell): DataRow;

  /** 
   * 수정된 셀의 목록을 반환 합니다.
   *
  */
  getEditCells(): WriteBackDataCell[];

  /** 
   * 필드 정보를 반환 합니다.
   *
  * @param name 필드명
  */
  getField(name: string): OlapField;

  /** 
   * 수정된 셀의 상세 Row의 목록을 반환 합니다.
   *
  * @param cell 수정된 셀 객체
  */
  getRows(cell: WriteBackDataCell): DataRow[];

}
